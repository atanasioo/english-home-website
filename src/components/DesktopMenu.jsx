import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _axios from "../axios";
import buildLink, { path } from "../urls";

function DesktopMenu() {
  const [selectedTopCategory, setSelectedTopCategory] = useState({});
  const [menuCategories2, setMenuCategories2] = useState([]);
  const [selectedMenuCategory2, setSelectedMenuCategory2] = useState();
  const [viewMenuCategories2, setViewMenuCategories2] = useState(true);
  const width = window.innerWidth;

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
    <div className="hidden lg:block relative">
      <nav className="header-menu border-b border-dborderblack1 mt-2.5 h-17 xl:h-7.5">
        <div className="container">
          <div className="flex flex-col xl:flex-row justify-center items-center mx-auto">
            <ul className="navigation relative text-center  flex  justify-center">
              <li className="inline-block">
                <Link to={"/latest"} className="bg-dwhite1 text-dblack2 text-d12 p-2.5">
                  NEW PRODUCTS
                </Link>
              </li>
              <div
                className="whitespace-nowrap"
                onMouseEnter={() => {
                  setViewMenuCategories2(true);
                }}
                onMouseLeave={() => {
                  setViewMenuCategories2(false);
                }}
              >
                {menuCategories2?.length > 0 &&
                  menuCategories2?.map((category) => (
                    <li className="inline-block" key={Math.random()}>
                      <Link
                        to={`${path}/${category["title"].title
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replace(/'/g, "")}/c=${
                          category["title"].mobile_type_id
                        }`}
                        className="bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3 uppercase"
                        dangerouslySetInnerHTML={{
                          __html: category["title"].title,
                        }}
                        onMouseEnter={() => {
                          setSelectedMenuCategory2(category);
                        }}
                      ></Link>
                    </li>
                  ))}
              </div>

              {/* <li className='inline-block'>
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
                    </li> */}
            </ul>
            <div className="inline-block mt-4 xl:mt-0 ml-1">
              <Link className="bg-dred1 text-dwhite1 text-d12 p-2.5 whitespace-nowrap">
                OPPRTUNITY PRODUCTS
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Menu Categories */}
      {viewMenuCategories2 && selectedMenuCategory2 && (
        <div
          className="navigation-submenu bg-dgrey3 pl-4 w-3/4 left-0 right-0 absolute top-full text-dblack1
                        z-50 text-left container "
          onMouseEnter={() => {
            setViewMenuCategories2(true);
          }}
          onMouseLeave={() => {
            setViewMenuCategories2(false);
          }}
        >
          <div className="flex">
            <div className="w-3/4 relative pt-7 bg-dgrey3 ">
              <div className="navigation-submenu-item  left-3 top-7 pb-7 pr-2.5 pl-3.5 w-52 border-r border-dgrey5 ">
                <div className="text-d13 font-bold mb-1.5">
                  <Link
                    to={`${path}/${selectedMenuCategory2["top-category"].name
                      ?.replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                      ?.replace(/\s+/g, "-")}/c=${
                      selectedMenuCategory2["top-category"].category_id
                    }`}
                    className="uppercase"
                    dangerouslySetInnerHTML={{
                      __html: selectedMenuCategory2["title"].title,
                    }}
                  ></Link>
                </div>
                <ul>
                  {selectedMenuCategory2["sub-categories"]?.map(
                    (subcategory) => (
                      <li key={subcategory.category_id}>
                        <Link
                          to={`${path}/${subcategory.name
                            .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                            .replace(/\s+/g, "-")}/c=${
                            subcategory.category_id
                          }`}
                          className="cursor-pointer hover:underline text-xs capitalize"
                          dangerouslySetInnerHTML={{
                            __html: subcategory.name,
                          }}
                          key={subcategory.category_id}
                        ></Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="w-7/12 flex pt-7 ">
              <div className="dropdown-extra-content">
              {selectedMenuCategory2["partitions"]?.map((category) => (
                category.banners?.map((banner) => (
                <Link classname="grid grid-flow-col ">
                  <img
                    src={`${window.config['site-url'] +'/image/'+ banner.image}`}
                    alt={selectedMenuCategory2["top-category"].name}
                  />
                </Link>
                ))
              ))}
                {/* <p className="title"></p>
                <p className="subtitle"></p>
                <Link></Link> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DesktopMenu;
