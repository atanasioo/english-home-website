import React from 'react'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
        <div>Home page</div>
        <Link to="product" className='text-blue-500'>product page</Link>
        <Link to="cart" className='text-blue-500'>cart page</Link>
        <Link to="category" className='text-blue-500'>category page</Link>
        
    </div>
  )
}

export default Home