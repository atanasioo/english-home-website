import React from 'react'
import { Link } from 'react-router-dom'
import { SlHeart }  from "react-icons/sl"
import { FiUser }  from "react-icons/fi"
import { BsCart3 }  from "react-icons/bs"
import DesktopMenu from './DesktopMenu'

function Header() {
  return (
    <div className='relative'>
        <section className='h-10 bg-dgrey1'>
            <div className='container '>
                <div className='row'>
                    <div className='topbar__links float-right'>
                        <Link className='text-dblack2 text-d12 ml-5 leading-10 font-bold hover:underline' >Easy Returns</Link>
                        <Link className='text-dblack2 text-d12 ml-5 leading-10 font-bold hover:underline'>Campaigns</Link>
                        <Link className='text-dblack2 text-d12 ml-5 leading-10 font-bold hover:underline'>Order Tracking</Link>
                        <Link className='text-dblack2 text-d12 ml-5 leading-10 font-bold hover:underline'>Mails</Link>
                    </div>
                </div>
            </div>
        </section>
        <div className='header__action pt-6 bg-dwhite1' style={{height: "85px"}}>
            <div className='container header__action-container relative'>
                <div className='back-bar hidden'></div>
                <div className='header__logo float-left'>
                    <div></div>
                    <Link to={"/"} className=" text-d30 ">
                        <span className='icon-logo text-4xl font-serif'>ENGLISH HOME</span>
                    </Link>
                </div>
                <div className='header__icons float-right flex ml-2'>
                    <Link className='cursor-pointer'>
                        <div className='h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 flex justify-center items-center mb-1'> 
                            <SlHeart className='h-6 w-6 ' />
                        </div>
                        <span className='header__icons-text whitespace-nowrap mt-1.5 text-d11'>
                            <p>Favorites</p>
                        </span>
                    </Link>
                    <div className='header__user inline-block relative cursor-pointer ml-2'>
                        <Link className='header__user__auth__link'>
                            <div className='h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 flex justify-center items-center mb-1'> 
                                <FiUser className='h-6 w-6 ' />
                            </div>
                            <span className='header__icons-text whitespace-nowrap mt-1.5 text-d11'>
                                <p>Profile</p>
                            </span>
                        </Link>
                        <div></div>
                    </div>
                    <div className='header__icons-basket float-right cursor-pointer ml-2'>
                        <div className='relative'>
                            <Link className='relative'>
                                <div>
                                    <div className='h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 flex justify-center items-center mb-1'>
                                        <span className='absolute -top-2 -left-1.5 w-4 h-4 leading-4 bg-dblue1 text-dwhite1 text-center rounded-full text-d11 font-bold '>0</span>
                                        <BsCart3 className='h-6 w-6'/>
                                    </div>
                                    <div className=' text-d11 whitespace-nowrap'>my cart</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='clearfix hidden'></div>
                <div className='header__search search-wrapper'></div>
            </div>
        </div>                  
        <DesktopMenu />
        <div className='mobile-header-menu hidden'></div>
    </div>
  )
}

export default Header