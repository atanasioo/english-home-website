import React from 'react'
import { Link } from 'react-router-dom'

function Checkout() {
  return (
    <div>
        <div className='checkout-header overflow-hidden'>
            <div className='container '>
                <div className='fix-header border-b border-dgrey3 mb-7 pb-7  w-full z-10 bg-dwhite1 flex items-center justify-between'>
                    <Link 
                    to={"/cart"}
                    className='mt-5 mr-10 text-d30 text-dborderblack2 font-serif'>ENGLISH HOME</Link>
                    <div className='checkout-header-tel pt-5'>
                       <p className='text-d18 font-light text-dborderblack0'> tel nb </p> 
                    </div>
                </div>
            </div>
        </div>
        <div className='checkout-viewport -mt-9 bg-dgrey10'>
            <div className='container overflow-hidden'>
                <div className='mt-7 -mx-1'>
                    <div className='w-full notify'></div>
                    <div className='w-2/3'>
                        <div className=''>
                            <div className='checkout-tabs flex justify-between bg-dwhite1 cursor-pointer'>
                                <div className='bg-dblue1 text-dwhite1 pt-3.5 pr-12 pb-14 pl-3.5 relative w-1/2'>
                                    <div className='text-d16 font-mono tracking-wide mb-2.5 uppercase flex items-center'>
                                        <span className='text-dblack2 bg-dwhite1 font-semibold text-d13 border border-dblack2 py-1 px-2 rounded-full mr-2'>1</span>
                                        <p>ADDRESS & CARGO INFORMATION</p>
                                    </div>
                                    <div className='text-left text-sm'>Please select a delivery address.</div>
                                </div>
                                <div className='pt-3.5 pr-12 pb-14 pl-3.5 relative w-1/2' style={{minWidth: "120px"}}>
                                    <div className='text-d16 font-mono mb-2.5 uppercase flex items-center'>
                                        <span className='text-dblack2 bg-dwhite1 font-semibold text-d13 border border-dblack2 py-1 px-2 rounded-full mr-2'>2</span>
                                        <p>payment options</p>
                                    </div>
                                    <div className='text-left text-sm'>You can safely make your payment by bank or credit card.</div>
                                </div>
                            </div>
                            <div className='checkout-tabs-content bg-dwhite1'>
                                <div className='checkout-tab-address border border-dgrey3'>
                                    <div className='address-delivery-tab'>
                                        <div className='address-content flex'>
                                            <div className='bg-dwhite1 w-2/3'>
                                                <div className='text-d16 py-3.5 px-7 text-dblack2 border-b border-dgrey3 flex items-center justify-between'>
                                                    <div className='uppercase'>Delivery address</div>
                                                    <div className='text-dblack2 text-d14'>
                                                        <label htmlFor="">
                                                            <input type="checkbox" name="" id="" checked/>
                                                            <span className='align-baseline ml-1'>Same as my billing address</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='checkout-address px-5'>
                                                    <div className='my-6 mx-1 flex justify-between items-center'>Please select a delivery address.</div>
                                                    <div className='-mx-1'>
                                                        <div></div>
                                                        <div className='w-1/2'>
                                                            <div className='bg-dwhite1 border border-dgrey3 p-5 h-44 mb-4 relative transition ease-in hover:border-2 hover:border-dblue1 hover:p2.5 hover:shadow-lg'>
                                                                <div className='absolute top1/2 right-5 left-20 tran'></div>
                                                            </div>
                                                        </div>
                                                        <div className='w1/2 hidden'></div>
                                                    </div>
                                                    <div className='hidden'></div>
                                                </div>
                                            </div>
                                            <div className='bg-dwhite1 w-1/3 border-l border-dgrey3'></div>
                                        </div>
                                    </div>
                                    <div className='shop-delivery-tab'></div>
                                </div>
                                <div className='checkout-tab-payment'></div>
                                <div className='checkout-contract py-5 bg-dgrey3'>
                                    <div className='bg-dwhite1 border border-dgrey3 p-3.5 flex flex-col items-center'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3'></div>
                </div>
            </div>
            <div className='container'></div>
            <div></div>
        </div>
    </div>
  )
}

export default Checkout