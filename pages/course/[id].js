import { NextSeo } from "next-seo";
import Breadcrumbs from "../../components/Breadcrumbs";
import CourseContent from "../../components/CourseContent";
import HeroImage from "../../components/HeroImage";
import Layout from "../../components/Layout";
import QuickNavigation from "../../components/QuickNavigation";

import { get } from "../../lib/api";
import { getParentFolderId, getStructuredFolders } from "../../lib/folders";

const Page = ({ data, structure, folders, parentFolder }) => {
  const { content } = data;
  const heroImageUrl =
    (content["8db36dbc-07d1-4564-9323-910bd91ce50c"] &&
      content["8db36dbc-07d1-4564-9323-910bd91ce50c"][0]?.url) ||
    null;

  return (
    <Layout headerShadow={!Boolean(heroImageUrl)}>
      <NextSeo title={data.name} />
      {heroImageUrl && <HeroImage url={heroImageUrl} />}
      <Breadcrumbs
        items={[
          {
            name: "Study",
            href: "#",
          },
          {
            name: "Undergraduate study",
            href: "#",
          },
          {
            name: "Course directory",
            href: "/",
          },
          {
            name: data.name,
            href: `/course/${data.id}`,
          },
        ]}
      />

      <div className="container px-4 xl:px-20 2xl:px-40 mx-auto lg:grid lg:grid-cols-12 gap-16 py-8">
        <div className="col-span-3 hidden lg:block">
          <QuickNavigation folders={folders} currentFolder={parentFolder} />
        </div>
        <div className="col-span-9 xl:col-start-4 xl:pl-2 2xl:pl-8">
          <h1 className="text-6xl mb-4 font-medium">{data.name}</h1>
          <CourseContent content={content} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  const projectId = process.env.GATHERCONTENT_PROJECT_ID;
  const data = await get(`/items/${params.id}`);
  const structure = await get(`/structures/${data.structure_uuid}`);
  const rawFolders = await get(`/projects/${projectId}/folders`);

  const folders = getStructuredFolders({ folders: rawFolders });
  const parentFolder = getParentFolderId({
    folders: rawFolders,
    folderId: data.folder_uuid,
  });

  return {
    props: { data, structure, folders, parentFolder },
  };
}

export async function getStaticPaths() {
  const projectId = process.env.GATHERCONTENT_PROJECT_ID;
  const items = await get(`/projects/${projectId}/items`);

  return {
    paths: items.map((item) => ({ params: { id: String(item.id) } })),
    fallback: false,
  };
}
