import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

interface IProduct {
  id: string
  title: string
}

interface HomeProps {
  recommendedProducts: IProduct[]
}

const Home: FC<HomeProps> = ({ recommendedProducts }) => {

  async function handleSum() {
    console.log(process.env.NEXT_PUBLIC_API_URL)

    const math = (await import('@/lib/math')).default

    alert(math.sum(2, 5))
  }

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
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
        
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  const recommendedProducts = await response.json()

  return {
    props: { recommendedProducts }
  }
}