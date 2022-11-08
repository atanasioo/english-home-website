import React from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from './DesktopMenu';
import TopWishlist from './TopWishlist';
import TopAccount from './TopAccount';
import TopCart from './TopCart';
import TopSearch from './TopSearch';

function Header() {

const width =window.innerWidth;

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
            <div className='container header__action-container relative '>
                <div className='back-bar hidden'></div>
                <div className='header__logo float-left'>
                    <div></div>
                    <Link to={"/"} className=" text-d30 ">
                        <span className='icon-logo text-4xl font-serif'>ENGLISH HOME</span>
                    </Link>
                </div>
                <div className='header__icons float-right flex ml-2'>
                    <TopWishlist/>
                    <div className='header__user inline-block relative cursor-pointer ml-2'>
                        <TopAccount/>  
                    </div>
                    <div className='header__icons-basket float-right cursor-pointer ml-2'>
                        <div className='relative'>
                            <TopCart/>
                        </div>
                    </div>
                </div>
                <div className='clearfix hidden'></div>
                <div className='header__search search-wrapper float-left ml-16'>
                    <TopSearch/>
                </div>
            </div>
        </div>                  
        <DesktopMenu />
        <div className='mobile-header-menu hidden'></div>
    </div>
  )
}

export default Header