import React from 'react'
import { Link } from 'react-router-dom'
import { SlHeart }  from "react-icons/sl"
import { FiUser }  from "react-icons/fi"
import { BsCart3 }  from "react-icons/bs"

function Header() {
  return (
    <div className='relative'>
        <section className='h-10 bg-dgrey1'>
            <div className='container'>
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
        <div className='header__action pt-6 bg-dwhite1'>
            <div className='container header__action-container relative'>
                <div className='back-bar hidden'></div>
                <div className='header__logo float-left'>
                    <div></div>
                    <Link to={"/"} className=" text-d30 ">
                        <span className='icon-logo text-xl '>ENGLISH HOME</span>
                    </Link>
                </div>
                <div className='header__icons float-right flex '>
                    <Link>
                        <div className='h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 flex justify-center items-center '> 
                            <SlHeart className='h-6 w-6 ' />
                        </div>
                        <span className='header__icons-text whitespace-nowrap mt-1.5 text-d11'>
                            <p>Favorites</p>
                        </span>
                    </Link>
                    <div className='header__user inline-block relative'>
                        <Link className='header__user__auth__link'>
                            <div className='h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 flex justify-center items-center '> 
                                <FiUser className='h-6 w-6 ' />
                            </div>
                            <span className='header__icons-text whitespace-nowrap mt-1.5 text-d11'>
                                <p>Profile</p>
                            </span>
                        </Link>
                        <div></div>
                    </div>
                    <div className='header__icons-basket float-right'>
                        <div className='relative'>
                            <Link className='relative'>
                                <div>
                                    <div className='h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 flex justify-center items-center '>
                                        <span className='absolute -top-1.5 left-4 w-4 h-4 leading-4 bg-dblue1 text-dwhite1 text-center rounded-full text-d11 font-bold '>0</span>
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
        <nav className='header-menu border-b border-dborderblack1 mt-2.5'>
            <div className='container'>
                <ul className='navigation relative text-center mx-auto'>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>NEW PRODUCTS</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>BEDROOM</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>KITCHEN</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>TABLE</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>BATHROOM</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>DECORATION</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>CARPET&RUG</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>BABY&KIDS</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>CLOTHES</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>PERSONAL CARE & COSMETICS</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>OPPRTUNITY PRODUCTS</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <div className='mobile-header-menu hidden'></div>
    </div>
  )
}

export default Header