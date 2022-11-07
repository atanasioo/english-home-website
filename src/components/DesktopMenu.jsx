import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _axios from "../axios";
import buildLink, { path } from "../urls";

function DesktopMenu() {
    const [selectedTopCategory, setSelectedTopCategory] = useState({});
    const [menuCategories2, setMenuCategories2] = useState([]);
    const [selectedMenuCategory2, setSelectedMenuCategory2] = useState();
    const width= window.innerWidth;

    useEffect(() => {
        if (width > 650) {
          _axios
            .get(buildLink("all_categories", undefined, window.innerWidth))
            .then((response) => {
              try {
                const data = response.data.data;
                setSelectedTopCategory(data[0]);
              } catch (error) {}
            });
          _axios
            .get(buildLink("headerv2", undefined, window.innerWidth))
            .then((response) => {
              const data = response?.data;
              setMenuCategories2(data.data);
              setSelectedMenuCategory2(data[0]);
            });
        }
      }, []);

  return (
    <div className='hidden lg:block'>
        <nav className='header-menu border-b border-dborderblack1 mt-2.5 h-17 xl:h-7.5'>
            <div className='container'>
                <ul className='navigation relative text-center mx-auto '>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5'>NEW PRODUCTS</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'
                        //onMouseEnter={()=> }
                        >BEDROOM</Link>
                        <div className='navigation-submenu hidden bg-dgrey3 pl-4 w-full absolute top-full left-0 text-dblack1
                        z-50 text-left mt-0.5'>

                        </div>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'>KITCHEN</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'>TABLE</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'>BATHROOM</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'>DECORATION</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'>CARPET&RUG</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'>BABY&KIDS</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'>CLOTHES</Link>
                    </li>
                    <li className='inline-block'>
                        <Link className='bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3'>PERSONAL CARE & COSMETICS</Link>
                    </li>
                    
                    <li className='inline-block mt-4 xl:mt-0'>
                        <Link className='bg-dred1 text-dwhite1 text-d12 p-2.5 ml-1'>OPPRTUNITY PRODUCTS</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default DesktopMenu