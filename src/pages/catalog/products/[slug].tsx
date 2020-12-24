import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  { loading: () => <p>Carregando...</p>, ssr: false }
)

const Product = () => {
  const router = useRouter()
  const [isAddCartModalVisible, setIsAddCartModalVisible] = useState(false)

  function handleAddToCart() {
    setIsAddCartModalVisible(true)
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddCartModalVisible && <AddToCartModal />}
    </div>
  )
}

export default Product