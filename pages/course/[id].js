import { NextSeo } from 'next-seo';
import Breadcrumbs from '../../components/Breadcrumbs';
import CourseContent from '../../components/CourseContent';
import HeroImage from '../../components/HeroImage';
import Layout from '../../components/Layout';
import QuickNavigation from '../../components/QuickNavigation';
import { get } from '../../lib/api';
import { getStructuredFolders } from '../../lib/folders';
import { mapCourseContentToEnv } from '../../lib/mapCourseContentToEnv';

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
  const item = await get(`/items/${params.id}`);
  const rawFolders = await get(`/projects/${projectId}/folders`);
  const folders = getStructuredFolders(rawFolders);

  const content = mapCourseContentToEnv(item.content);

  return {
    props: { item, content, folders },
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
