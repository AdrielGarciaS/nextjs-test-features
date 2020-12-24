import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'
import { client } from '@/lib/prismic'
interface CategoryProps {
  category: Document
  products: Document[]
}

const Category: FC<CategoryProps> = ({ category, products }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>
        {PrismicDOM.RichText.asText(category.data.title)}
      </h1>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/catalog/products/${product.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(product.data.title)}
                </a>
              </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Category

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ])

  const paths = categories.results.map(category => ({
    params: { slug: category.uid }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params

  const category = await client().getByUID('category', String(slug), {})

  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.category', category.id)
  ])

  return {
    props: { 
      products: products.results,
      category: category
    },
    revalidate: 60,
  }
}