import React from 'react'

const CartDetail = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4">
            <h1 className="text-3xl font-semibold mb-4">Page Detail</h1>
            <p className="text-gray-700 mb-6">
              This is a professional page detail created with React and Tailwind
              CSS.
            </p>
            <img
              src="https://example.com/image.jpg"
              alt="Page Image"
              className="w-full mb-6 rounded-lg"
            />
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut
              elit ultricies, mollis ante at, scelerisque turpis. Vestibulum eu
              lacus ac nunc scelerisque aliquam. Vestibulum vehicula mauris at
              luctus aliquet. Nulla luctus nulla et nunc tempus aliquam. Vivamus
              dictum imperdiet rutrum.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDetail
