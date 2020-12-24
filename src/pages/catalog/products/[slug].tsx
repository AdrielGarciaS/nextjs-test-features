import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useState } from "react"
import PrismicDOM from 'prismic-dom'
import { Document } from 'prismic-javascript/types/documents'
import { client } from '@/lib/prismic'

const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

interface IProductProps {
  product: Document
}

const Product = ({ product }: IProductProps) => {
  const router = useRouter()
  const [isAddCartModalVisible, setIsAddCartModalVisible] = useState(false)

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  function handleAddToCart() {
    setIsAddCartModalVisible(true)
  }

  return (
    <div>
      <h1>
        {PrismicDOM.RichText.asText(product.data.title)}
      </h1>

      <img src={product.data.thumbnail.url} width="300" />

      <div 
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description)
        }} 
      />

      <p>Price: ${product.data.price}</p>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddCartModalVisible && <AddToCartModal />}

    </div>
  )
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<IProductProps> = async (context) => {
  const { slug } = context.params

  const product = await client().getByUID('product', String(slug), {})

  return {
    props: { product },
    revalidate: 10,
  }
}