import cache from 'memory-cache';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import HeroImage from '../components/HeroImage';
import Layout from '../components/Layout';
import QuickNavigation from '../components/QuickNavigation';

import { get } from '../lib/api';
import { getStructuredFolders } from '../lib/folders';
import { mapCourseContentToEnv } from '../lib/mapCourseContentToEnv';

const Home = ({ courses, folders }) => {
  return (
    <Layout>
      <NextSeo title="Course directory" />
      <HeroImage url="https://images.unsplash.com/photo-1503676382389-4809596d5290?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80" />
      <Breadcrumbs
        items={[
          {
            name: 'Study',
            href: '/#',
          },
          {
            name: 'Undergraduate study',
            href: '/#',
          },
          {
            name: 'Course directory',
            href: '/',
          },
        ]}
      />
      <div className="container mx-auto lg:grid lg:grid-cols-12 gap-16 py-8 px-4 xl:px-20 2xl:px-40">
        <div className="col-span-3 hidden lg:block">
          <QuickNavigation folders={folders} />
        </div>
        <div className="col-span-9 xl:col-start-4 xl:pl-2 2xl:pl-8">
          <h1 className="text-4xl lg:text-6xl mb-4 font-medium">
            Course directory
          </h1>
          <p className="text-xl lg:text-2xl mb-6 text-base-1">
            Join some of the best students from around the globe at one of the
            world's top universities. We’ve got the perfect course just for you.
          </p>
          {folders.children.map((item) => (
            <div key={item.uuid}>
              <h2
                className="text-3xl lg:text-4xl mb-3 font-medium id-header"
                id={item.uuid}
              >
                {item.name}
              </h2>
              {item?.children?.map((child) => (
                <div key={child.uuid}>
                  <h3
                    className="text-3xl lg:text-4xl mb-6 id-header"
                    id={child.uuid}
                  >
                    {child.name}
                  </h3>
                  <div>
                    <div className="grid grid-cols-12 text-left font-medium px-4 uppercase text-base-1">
                      <div className="col-span-6 text-xs">Course Name</div>
                      <div className="col-span-2 text-xs">Credits</div>
                      <div className="col-span-2 text-xs">Hours</div>
                      <div className="col-span-2 text-xs">Weeks</div>
                    </div>
                    <ul className="mb-8">
                      {courses
                        .filter((course) => course.folder_uuid === child.uuid)
                        .filter((course) => !!course.hours)
                        .map((course) => (
                          <li key={course.id} className="">
                            <Link href={`/course/${course.id}`}>
                              <a className="grid grid-cols-12 border my-2 py-3 px-4 rounded-lg transition-shadow hover:shadow-md">
                                <div className="col-span-6 truncate pr-4">
                                  {course.name}
                                </div>
                                <div className="col-span-2 text-base-1">
                                  {course.credits}
                                </div>
                                <div className="col-span-2 text-base-1">
                                  {course.hours.replace(' hours', '')}
                                </div>
                                <div className="col-span-2 text-base-1 truncate">
                                  {course.weeks}
                                </div>
                              </a>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .id-header {
          scroll-margin-top: 1.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const projectId = process.env.GATHERCONTENT_PROJECT_ID;

  const getCachedData = () => cache.get('index');

  if (!getCachedData()) {
    const mapItemToCourse = ({ name, id, folder_uuid, content }) => ({
      name,
      id,
      folder_uuid,
      ...mapCourseContentToEnv(content),
    });

    const fetchItemsAsCourses = (items) =>
      Promise.all(
        items.map(({ id }) => get(`/items/${id}`).then(mapItemToCourse))
      );

    const [folders, courses] = await Promise.all([
      get(`/projects/${projectId}/folders`).then(getStructuredFolders),
      get(`/projects/${projectId}/items`).then(fetchItemsAsCourses),
    ]);

    cache.put('index', { courses, folders });
  }

  return {
    props: getCachedData(),
  };
}
