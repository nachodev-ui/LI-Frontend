import dynamic from 'next/dynamic'
import Ceo from '@/components/Ceo'

// Import Cart dinámicamente para deshabilitar el SSR
const DynamicCart = dynamic(() => import('@/components/Cart'), { ssr: false })

const cart = () => {
  return (
    <>
      <Ceo page="Mi carro" />
      <DynamicCart />
    </>
  )
}

export default cart
