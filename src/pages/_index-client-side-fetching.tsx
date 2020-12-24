import { useEffect, useState } from 'react'
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string
  title: string
}

const Home = () => {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/recommended')
      .then(response => {
        response.json().then(data => {
          setRecommendedProducts(data)
        })
      })
  }, [])

  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
        
      </section>
    </div>
  )
}

export default Home