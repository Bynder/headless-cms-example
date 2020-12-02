const Note = ({ content }) => (
  <div className="bg-gray-100 border p-5 my-10 rounded-md">
    <h3 className="text-xl font-medium mb-2">Note</h3>
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="prose lg:prose-xl"
    />
  </div>
);

const Content = ({ content }) => (
  <>
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="prose lg:prose-xl"
    />
    <style jsx>{`
      .content :global(p) {
        margin-bottom: 1rem;
        font-size: 1.125rem;
        color: #29333d;
      }
    `}</style>
  </>
);

const CourseData = ({ content }) => (
  <div className="my-8 border rounded-md shadow-xl text-center grid grid-cols-5 justify-around">
    <div className="p-4 border-r py-8">
      <p className="uppercase text-base-1 text-xs">Credits</p>
      <p className="text-2xl">
        {content["779f2d45-1008-4f98-991d-81fe1ace5136"]}
      </p>
    </div>
    <div className="p-4 border-r py-8">
      <p className="uppercase text-base-1 text-xs">Hours /week</p>
      <p className="text-2xl">
        {content["1e60ff41-ceb2-40c0-a60f-63559756d471"]?.replace(" hours", "")}
      </p>
    </div>
    <div className="p-4 border-r py-8">
      <p className="uppercase text-base-1 text-xs">Weeks</p>
      <p className="text-2xl">
        {content["b732347b-a440-410d-aa29-6fca14d21958"]?.replace(" weeks", "")}
      </p>
    </div>
    <div className="p-4 border-r py-8">
      <p className="uppercase text-base-1 text-xs">Seats</p>
      <p className="text-2xl">
        {content["eb2fa542-86c0-49c2-be51-73cd36fe69c5"]?.replace(" seats", "")}
      </p>
    </div>
    <div className="p-4  py-8">
      <p className="uppercase text-base-1 text-xs">Course code</p>
      <p className="text-2xl">
        {content["465eef55-4986-4b4e-b216-b198e1606058"]}
      </p>
    </div>
  </div>
);
const CourseContent = ({ content }) => (
  <>
    <CourseData content={content} />
    <h2 className="text-4xl mt-10 mb-4">Prerequisites</h2>
    <Content content={content["8eba834e-d758-494d-a820-57bf25e975b3"]} />
    <h2 className="text-4xl mt-10 mb-4">Core requisites</h2>
    <Content content={content["5fa79ac2-4b5d-4878-a2f8-d59d93201401"]} />
    <h2 className="text-4xl mt-10 mb-4">Course summary</h2>
    <Content content={content["af16d9b4-eeff-48ff-a726-161ee7d20279"]} />
    <Note content={content["422ecfce-71d0-476b-81ce-2d062bde5ed3"]} />
    <h2 className="text-4xl mt-10 mb-4">Taught by</h2>
    <Content content={content["edb9fd49-fba7-4918-a761-244a077653b0"]} />
  </>
);

export default CourseContent;
