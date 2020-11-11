import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

// path to the directory `posts`
const postsDirectory = path.join(process.cwd(), 'posts');

// pre-rendering   : where the PAGE CONTENT depends on external data.
export function getSortedPostsData() {
  // Get file names under /posts 
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // remove ".md" from file name to get id 
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string 
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section 
    const matterResult = matter(fileContents);

    // COmbine the data with the id 
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date 
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  })
}

// return the list of file names excluding `.md` 
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

// return the post data based on id
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}




/* https://nextjs.org/learn/basics/data-fetching/getstaticprops-details

// **FETCH EXTERNAL API 

export async function getSortedPostsData() {
  // Instead of the file system ,
  // fetch post data from an external API endpoint 
  const res = await fetch('..')
  return res.json();
} */

/*
// QUERY DATABASE

import someDatabaseSDK from 'someDatabaseSDK

const databaseClieknt = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  return databaseClient.query('SELECT posts...')
}
 */

// ---------------------------------------------

// Server-side rendering 
/**
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
 */

//  --------------------------

// SWR   https://swr.vercel.app/
// import useSWR from 'swr';

// function Profile() {
//   cont { data, error} = useSWR('/api/user', fetch);

//   if (error) return <div>Failed to load </div>
//   if (!data) return <div>loading...</div>
//   return <div>hello {data.name}!</div>
// }