import React from 'react'
import { GrClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'

function CartmenuMobile({closemenu}) {
  return (
    <div className='fixed bg-dwhite1 w-11/12 h-2/5 z-30 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
        <GrClose className='fixed right-0 m-3' onClick={()=> closemenu()}/>
        <div className='p-3'>
            <div className='text-d18 font-semibold my-5'>Basket</div>
            <div className='text-sm'>The product has been added to the cart</div>
            <div className='flex flex-col items-center  justify-center  uppercase my-6'>
                <button 
                onClick={()=> closemenu()}
                className='bg-dwhite1 border border-dblue1  text-dblue1 mb-3 leading-9 w-3/4 uppercase'>continue shopping</button>
                <Link to={"/cart"} className='bg-dblue1 border border-dblue1  text-dwhite1 leading-9 w-3/4'>go to cart</Link>
            </div>
        </div>
    </div>
  )
}

export default CartmenuMobile