import React from 'react'
import { Link } from 'react-router-dom'

function DesktopMenu() {
  return (
    <div>
        <nav className='header-menu border-b border-dborderblack1 mt-2.5 h-10'>
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
    </div>
  )
}

export default DesktopMenu