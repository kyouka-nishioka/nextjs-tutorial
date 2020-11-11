import Link from 'next/link'
import Date from '../components/date';
import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from '../lib/posts';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      Hello World.{' '}
      <Link href="/about">
        <a>About</a>
      </Link>
      Read <Link href="/posts/first-post"><a>this page!</a></Link>
    </Layout>
  )
}

// Static Generation with data 
// for more details, -> https://nextjs.org/docs/basic-features/pages#static-generation-with-data
export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc. 
  const allPostsData = getSortedPostsData();
  // The value of the `props` key will be 
  // passed to the `home` component 
  return {
    props: {
      allPostsData
    }
  }
}
