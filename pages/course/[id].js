import { NextSeo } from 'next-seo';
import Breadcrumbs from '../../components/Breadcrumbs';
import CourseContent from '../../components/CourseContent';
import HeroImage from '../../components/HeroImage';
import Layout from '../../components/Layout';
import QuickNavigation from '../../components/QuickNavigation';
import { get } from '../../lib/api';
import { getStructuredFolders } from '../../lib/folders';
import { mapCourseContentToEnv } from '../../lib/mapCourseContentToEnv';
import cache from 'memory-cache';

const Page = ({ item, content, folders }) => {
  return (
    <Layout headerShadow={!Boolean(content.heroImageUrl)}>
      <NextSeo title={item.name} />
      {content.heroImageUrl && <HeroImage url={content.heroImageUrl} />}
      <Breadcrumbs
        items={[
          {
            name: 'Study',
            href: '/',
          },
          {
            name: 'Undergraduate study',
            href: '/',
          },
          {
            name: 'Course directory',
            href: '/',
          },
          {
            name: item.name,
            href: `/course/${item.id}`,
          },
        ]}
      />

      <div className="container px-4 xl:px-20 2xl:px-40 mx-auto lg:grid lg:grid-cols-12 gap-16 py-8">
        <div className="col-span-3 hidden lg:block">
          <QuickNavigation folders={folders} currentFolder={item.folder_uuid} />
        </div>
        <div className="col-span-9 xl:col-start-4 xl:pl-2 2xl:pl-8">
          <h1 className="text-6xl mb-4 font-medium">{item.name}</h1>
          <CourseContent content={content} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  const projectId = process.env.GATHERCONTENT_PROJECT_ID;

  const cachedData = () => cache.get(`course-${params.id}`);

  if (!cachedData()) {
    const [item, folders] = await Promise.all([
      get(`/items/${params.id}`),
      get(`/projects/${projectId}/folders`).then(getStructuredFolders),
    ]);

    const content = mapCourseContentToEnv(item.content);
    cache.put(`course-${params.id}`, { item, content, folders });
  }

  return {
    props: cachedData(),
  };
}

export async function getStaticPaths() {
  const projectId = process.env.GATHERCONTENT_PROJECT_ID;

  const cachedData = () => cache.get('itemPaths');

  if (!cachedData()) {
    const items = await get(`/projects/${projectId}/items`);
    const mappedPaths = items.map((item) => ({
      params: { id: String(item.id) },
    }));
    cache.put('itemPaths', mappedPaths);
  }

  return {
    paths: cachedData(),
    fallback: false,
  };
}
