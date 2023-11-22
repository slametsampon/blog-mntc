import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import authorData from 'app/author-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const authorCounts = authorData as Record<string, number>
  const authorKeys = Object.keys(authorCounts)
  const paths = authorKeys.map((author) => ({
    author: author,
  }))
  return paths
}

export default function AuthorPage({ params }: { params: { detail: string } }) {
  const detail = decodeURI(params.detail)
  // Capitalize first letter and convert space to dash
  const title = detail[0].toUpperCase() + detail.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter((post) => post.authors && post.authors.map((t) => slug(t)).includes(detail))
    )
  )
  return <ListLayout posts={filteredPosts} title={title} />
}
