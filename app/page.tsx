import { allBlogs } from '@/.contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Main from './Main'

export default function Home() {
  const sortedBlogs = sortPosts(allBlogs)
  const blogs = allCoreContent(sortedBlogs)
  return (
    <>
      <Main blogs={blogs} />
    </>
  )
}
