import React from 'react'
import { Link } from 'react-router-dom'

export default function VerticalNav() {
  return (
    <div className="flex flex-col w-full px-12 text-left text-d12">
        <div className="font-semibold py-3 text-d14"> my orders </div>
        <Link className='pb-2' to="">Order Tracking</Link>
        <Link className='pb-2' to="">All My Orders</Link>

        <div className="font-semibold py-3 text-d14"> My Profile / Personal Information </div>
        <Link className='pb-2' to="account/profile/">my profile</Link>
        <Link className='pb-2' to="account/addresses/">Address book</Link>
        <Link className='pb-2' to="account/change-email/">Change  Email</Link>
        <Link className='pb-2' to="account/change-password/">Change  Password</Link>



        <div className="font-semibold py-3 text-d14"> my deals </div>
        <Link className='pb-2' to="">Discount Coupons</Link>

        <div className="font-semibold py-3 text-d14"> Frequently Asked Questions </div>
        <Link className='pb-2' to="">Contact us</Link>
        <Link className='pb-2' to="">Log out</Link>
        
    </div>
  )
}
