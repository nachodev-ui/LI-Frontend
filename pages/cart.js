import dynamic from 'next/dynamic'

// Import Cart component dynamically and disable SSR
const DynamicCart = dynamic(() => import('@/components/Cart'), { ssr: false })

const cart = () => {
  return <DynamicCart />
}

export default cart
