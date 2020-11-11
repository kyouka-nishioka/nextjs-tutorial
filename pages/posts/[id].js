// Pages that begin with [ and 
// end with ] are dynamic routes in Next.js.

import Layout from '../../components/layout';

import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head';

import Date from '../../components/date';

import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
      <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.data} />
        </div>
        <div dagerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  // `params` contains `id`(because the file name is `[id].js`) 
  // Fetch necessary data for the blog post using params.id
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}