import { GetStaticProps } from "next"
import { FC } from "react"

interface IProduct {
  id: string
  title: string
}

interface Top10Props {
  products: IProduct[]
}

const Top10: FC<Top10Props> = ({ products }) => {
  return (
    <div>
      <h1>Top 10</h1>

      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>

    </div>
  )
}

export default Top10

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products')
  const products = await response.json()

  return {
    props: { products },
    revalidate: 5,
  }
}