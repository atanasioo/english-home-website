import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _axios from "../axios";
import buildLink, { path } from "../urls";
import { MdDoubleArrow } from "react-icons/md";
function DesktopMenu() {
  const [selectedTopCategory, setSelectedTopCategory] = useState({});
  const [menuCategories2, setMenuCategories2] = useState([]);
  const [selectedMenuCategory2, setSelectedMenuCategory2] = useState();
  const [viewMenuCategories2, setViewMenuCategories2] = useState(true);
  const width = window.innerWidth;

  console.log(path);
  //

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
          console.log(data)
          setMenuCategories2(data.data);
          setSelectedMenuCategory2(data[0]);
        });
    }
  }, []);

  return (
    <div className="hidden lg:block relative">
      <nav className="header-menu border-b border-dborderblack1 mt-6 h-17 xl:h-7.5">
        
        <div className="container">
          
          <div className="flex flex-col xl:flex-row justify-center items-center mx-auto">
            
            <ul className="navigation relative text-center  flex  justify-center">
              <div
                className=" flex flex-row "
                onMouseEnter={() => {
                  setViewMenuCategories2(true);
                }}
                onMouseLeave={() => {
                  setViewMenuCategories2(false);
                }}
              >
                {menuCategories2?.length > 0 &&
                  menuCategories2?.map((category) => (
                    <li className="" key={Math.random()}>
                      <Link
                        to={`${path}/${category["title"].title
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replace(/'/g, "")}/c=${
                          category["title"].mobile_type_id
                        }`}
                        className="bg-dwhite1 text-dblack2 text-d12 p-2.5 hover:bg-dgrey3 uppercase"
                        dangerouslySetInnerHTML={{
                          __html: category["title"].title
                        }}
                        onMouseEnter={() => {
                          setSelectedMenuCategory2(category);
                        }}
                      ></Link>
                    </li>
                  ))}
              </div>
            </ul>
            <div className="px-4 hover:text-dbase cursor-pointer">
<Link
 to={`${path}/latest`}
 className=""
>
 <span className=" font-thin ">NEW ARRIVALS</span>
</Link>
</div>
<div className="px-4 hover:text-dbase cursor-pointer">
<Link
 to={`${path}/buy_one_get_one/c=441`}
 className=""
>
 <span className=" font-thin ">BUY ONE GET ONE</span>
</Link>
</div>
            {/* <div className="inline-block mt-4 xl:mt-0 ml-1">
              <Link
                to={`${path}/latest`}
                className="bg-dred1 text-dwhite1 text-d12 p-2.5 whitespace-nowrap"
              >
                NEW PRODUCTS
              </Link>
            </div> */}
          </div>
        </div>
      </nav>
      {/* Menu Categories */}
      {viewMenuCategories2 && selectedMenuCategory2 && (
        <div
          className="navigation-submenu bg-dgrey3 pl-4 w-11/12 left-0 right-0 absolute top-full text-dblack1
                        z-50 text-left container "
          onMouseEnter={() => {
            setViewMenuCategories2(true);
          }}
          onMouseLeave={() => {
            setViewMenuCategories2(false);
          }}
        >
          <div className="flex">
            <div className="relative pt-7 bg-dgrey3 w-3/4">
              <div className="navigation-submenu-item  left-3 top-7 pb-7 pr-2.5 pl-3.5  border-r border-dgrey5 ">
                <div className="text-d13 font-bold mb-1.5">
                  <Link
                    to={`${path}/${selectedMenuCategory2["top-category"]?.name
                      ?.replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                      ?.replace(/\s+/g, "-")}/c=${
                      selectedMenuCategory2["top-category"].category_id
                    }`}
                    className="uppercase"
                    dangerouslySetInnerHTML={{
                      __html: selectedMenuCategory2["title"].title
                    }}
                  ></Link>
                </div>
                <div className="inline-block w-full">
                  {selectedMenuCategory2["sub-categories-level1"]?.map(
                    (subcategory, key) => (
                      <ul
                        className={`	 ${
                          key <= 1 ||
                          key === 5 ||
                          key === 0 ||
                          key === 2 ||
                          key === 9
                            ? "w-1/4 float-left"
                            : "w-1/4 float-right"
                        }`}
                      >
                        <li key={subcategory.category_id} className="">
                          <div className="flex pr-5">
                            <Link
                              to={`${path}/${subcategory.name
                                .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                                .replace(/\s+/g, "-")}/c=${
                                subcategory.category_id
                              }`}
                              className="cursor-pointer hover:underline text-xs capitalize font-bold "
                              dangerouslySetInnerHTML={{
                                __html: subcategory.name
                              }}
                              key={subcategory.category_id}
                            ></Link>
                            <MdDoubleArrow className="text-d10 mt-1" />
                          </div>
                        </li>
                        {subcategory.categories?.map((subcategory) => (
                          <li key={subcategory.category_id}>
                            <Link
                              to={`${path}/${subcategory.name
                                .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                                .replace(/\s+/g, "-")}/c=${
                                subcategory.category_id
                              }`}
                              className="cursor-pointer hover:underline text-xs capitalize"
                              dangerouslySetInnerHTML={{
                                __html: subcategory.name
                              }}
                              key={subcategory.category_id}
                            ></Link>
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="w-3/12 flex py-7 px-3">
              <div className="dropdown-extra-content">
                {selectedMenuCategory2["partitions"]?.map(
                  (category) =>
                    category?.banners > 0 &&
                    category?.banners?.map((banner) => (
                      <Link
                        classname="grid grid-flow-col "
                        key={banner.banner_id}
                      >
                        <img
                          src={`${
                            window.config["site-url"] +
                            "/image/" +
                            banner?.image
                          }`}
                          alt={selectedMenuCategory2["top-category"]?.name}
                        />
                      </Link>
                    ))
                )}
                 {selectedMenuCategory2["top-category"].top_images && selectedMenuCategory2["top-category"]?.top_images?.map(
                  (image) =>
                 
              
                      <div
                        classname="  mx-5"
                        key={image.src}
                      >
                        <img
                        className="w-full"
                    
                          src={`${
                            window.config["site-url"] +
                            "/image/" +
                            image?.src
                          }`}
                          alt={image.alt}
                        />
                      </div>
                
                )}
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
