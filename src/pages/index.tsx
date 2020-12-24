import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Prismic from 'prismic-javascript'
import { FC } from 'react'
import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO'
import { client } from '@/lib/prismic'
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'
interface HomeProps {
  recommendedProducts: Document[]
}

const Home: FC<HomeProps> = ({ recommendedProducts }) => {

  return (
    <div>
      <SEO 
        title="DevCommerce, your best e-commerce!"
        shouldExcludeTitleSuffix
        image='avatar.png'
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        
      </section>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: { 
      recommendedProducts: recommendedProducts.results 
    }
  }
}