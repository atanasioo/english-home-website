import { React, useContext, useEffect, useState, useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigationType
} from "react-router-dom";
import { GiSquare } from "react-icons/gi";
import queryString from "query-string";
import _axios from "../axios";
import buildLink from "../urls";

import { AccountContext } from "../contexts/AccountContext";
import SingleProductCategory from "../components/SingleProductCategory";
import { GoPlus } from "react-icons/go";
import { AiOutlineMinus } from "react-icons/ai";
import Loader from "../components/Loader";
import TopCart from "../components/TopCart";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [state] = useContext(AccountContext);
  const [data, setData] = useState({});
  const [noData, setNoData] = useState("");
  const [filters, setFilters] = useState([]);
  const [view, setView] = useState(4);
  const [loading, setLoading] = useState(true);
  const parsedQueryString = queryString.parse(location.search);
  let brand = parsedQueryString.brand || 0;
  let seller = parsedQueryString.seller || 0;
  let category = parsedQueryString.category || 0;
  const page = parsedQueryString.page ? parsedQueryString.page : 0;
  const keyword = parsedQueryString?.keyword?.toUpperCase();
  const encodedKeyword = encodeURIComponent(keyword);
  const [mobileFilter, setShowMobileFilter] = useState(false);
  const [filterMobile, setFilterMobile] = useState([]);
  const [baseURL, setBaseURL] = useState(location?.search);
  const [showCartmenu, setShowCartmenu] = useState(false);
  const [hoveredCart, setHoveredCart] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const wrapperRef = useRef(null);
  const navType = useNavigationType();
  const width = window.innerWidth;

  function showCart() {
    setShowCartmenu(true);
    setOverlay(true);
    setTimeout(() => {
      setShowCartmenu(false);
      setOverlay(false);
    }, 3000);
  }

  console.log(filterMobile);

  useEffect(() => {
    setBaseURL(location?.search); //after ?
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setShowMobileFilter(false);
    let link =
      buildLink("alg", undefined, window.innerWidth) +
      encodedKeyword +
      "&limit=50&page=" +
      Number(page);

    if (navType === "POP") {
    } else {
      if (brand !== 0) {
        link += "&brand=" + brand;
      }
      if (seller !== 0) {
        link += "&seller=" + seller;
      }
      if (category !== 0) {
        link += "&category=" + category;
      }
    }

    // console.log(navType);

    _axios.get(link).then((response) => {
      const data = response?.data;
      if (data?.data?.redirect === "1") {
        if (navType === "POP") {
          navigate(-1);
        } else if (state.Admin) {
          navigate("/" + data.data.type + "/" + data.data.type_id);
        } else {
          navigate(
            "/" +
              encodedKeyword +
              "/" +
              data.data.type.slice(0, 1) +
              "=" +
              data.data.type_id
          );
        }
      }

      if (data?.data?.nbHits === 0 || data?.success === false) {
        setNoData(true);
        setLoading(false);
      } else {
        setData(!data?.errors && data?.data);
        if (data?.data?.facets?.length > 0) {
          setFilters(data?.data?.facets);
          setLoading(false);
          // console.log(data?.data); // brand, seller, category
        }
      }
    });
    return () => {
      setData({});
      setNoData(false);
    };
  }, [location, page]);

  //Filters

  function handleFilter(type, name) {
    const Name = encodeURIComponent(name);
    if (location.search.indexOf(Name) > 0) {
      const srch = baseURL.replace("&" + type + "=" + Name, "");
      navigate("/search" + srch);
    } else {
      navigate("/search" + baseURL + "&" + type + "=" + Name);
      setBaseURL(location.search);
    }
  }

  function removeFilters() {
    const urll = location.search;
    if (urll.indexOf("&") > 0) {
      const arr = urll.split("&");
      arr.pop();
      console.log(arr[0]);

      navigate("/search" + arr[0]);
    }
  }

  //pagination
  function pageSetter(page) {
    const new_page = parseInt(page["selected"]);
    navigate("/search?" + "keyword=" + encodedKeyword + "&page=" + new_page);
  }

  //toggle filters

  //check filters
  function checkFilter(type, name, filter) {
    location.state = {
      oldFilters: data && data.filters
    };

    var url = new URL(window.location);

    var c = url.searchParams.get(type);

    let array = Array("");
    array[type] = c?.split(",");

    if (name === "Color" || name === "Light Color") {
      if (c !== null && array[type].includes(filter["id"]) === true) {
        return "rounded-full border border-dblue";
      } else {
        return "rounded-full border relative border-dgreyRate cursor-pointer hover:shadow";
      }
    } else if (
      name === "Shoes Size" ||
      name === "Size by Age" ||
      name === "jeans Size" ||
      name === "Socks"
    ) {
      if (c !== null && array[type].includes(filter["id"]) === true) {
        return "border rounded text-dblue border-dblue p-2";
      } else {
        return "border rounded relative border-dgreyRate cursor-pointer hover:shadow p-2";
      }
    } else {
      if (c !== null && array[type].includes(filter["id"]) === true) {
        return "icon-ok-squared text-dblue";
      } else {
        return "icon-check-empty";
      }
    }
  }

  return (
    <div className="bg-dgrey10 overflow-hidden">
      {/* mobile filter popup */}
      {mobileFilter &&
        1 !==
          1(
            <div className="relative">
              <div
                className="fixed z-20 top-0 left-0 bg-dblackOverlay2 w-full h-full"
                onClick={() => setShowMobileFilter(false)}
              ></div>
              <div className="popup fixed  bg-dwhite1 top-1/2 h-2/3 w-4/5 z-30 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll">
                {/* <div className="text-left text-d18 bg-dbeige h-11 py-1.5 pl-2 font-bold">
                  Filter{" "}
                </div> */}
                <div className="filter_container p-4">
                  {filters?.map((filter) => (
                    <div className="text-d14 text-left p-3.5 bg-dhwite1 border border-dgrey5 font-mono text-dblack2 mb-3.5 relative uppercase">
                      <div
                        className="flex justify-between items-center"
                        onClick={() => {
                          !filterMobile.includes(filter?.value)
                            ? setFilterMobile((filterMobile) => [
                                ...filterMobile,
                                filter?.value
                              ])
                            : setFilterMobile((filterMobile) =>
                                filterMobile.filter(
                                  (filterMobile) =>
                                    filterMobile !== filter?.value
                                )
                              );
                        }}
                      >
                        <p>{filter["new_items"].length > 0 && filter.name}</p>
                        {filterMobile.includes(filter?.value) ? (
                          <AiOutlineMinus className="w-3 h-3" />
                        ) : (
                          <GoPlus className="w-3 h-3" />
                        )}
                      </div>
                      {/* {mobileFilter && ( */}
                      <div>
                        {filter?.new_items.length > 0 &&
                        filter.name === "Color" ? (
                          <div
                            className={` my-5 ${
                              filter?.items.length > 6 &&
                              !filterMobile.includes(filter.value) &&
                              " overflow-y-auto h-36 px-2"
                            }  ${
                              !filterMobile.includes(filter.value)
                                ? "hidden"
                                : ""
                            }}`}
                          >
                            <div className="grid grid-cols-4 w-3/4 ">
                              {filter?.new_items.map((fil) => (
                                <div
                                  className="text-left w-full my-1 cursor-pointer"
                                  key={fil.name}
                                >
                                  <img
                                    src={fil.image}
                                    alt={fil.name}
                                    className={`rounded-full w-8   ${checkFilter(
                                      filter[fil].id,
                                      filter[fil].name,
                                      fil
                                    )}`}
                                    onClick={() => {
                                      handleFilter(filter.name, fil.name);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div
                            className={`my-5 ${
                              filter?.items.length > 6 &&
                              "overflow-y-auto h-36 px-2"
                            }  ${
                              !filterMobile.includes(filter.value)
                                ? "hidden"
                                : ""
                            }`}
                          >
                            {filter?.new_items?.map((fil) =>
                              filter[fil]?.name === "DIMENSIONS" ||
                              filter[fil]?.name === "Size" ? (
                                <div
                                  className={`w-full border cursor-pointer bg-white my-1 text-dborderblack0 text-d15 py-1 ${checkFilter(
                                    filter[fil]?.id,
                                    filter[fil]?.name,
                                    fil
                                  )}`}
                                  onClick={() => {
                                    handleFilter(filter.name, fil.name);
                                  }}
                                  key={fil?.name}
                                >
                                  {fil?.name}
                                </div>
                              ) : (
                                <div
                                  className={`text-left w-full cursor-pointer  hover:underline underline-offset-4 text-dborderblack0 text-d15 pointer-events-auto ${checkFilter(
                                    filter[fil]?.id,
                                    fil?.name,
                                    fil
                                  )}`}
                                  onClick={() => {
                                    handleFilter(filter.name, fil.name);
                                  }}
                                >
                                  {fil?.name}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                      {/* )} */}
                    </div>
                  ))}
                </div>
              </div>
              <div className="popup-footer fixed w-full overflow-x-hidden bottom-0 left-0 z-30 bg-dbeige h-16 flex justify-around items-center">
                <button
                  className="bg-dwhite1 border-dgrey5 text-dblack1 mr-1 h-auto relative py-2.5 w-5/12"
                  onClick={() => setShowMobileFilter(false)}
                >
                  GIVE UP
                </button>
                <button
                  className="bg-dblack1 border-dgrey5 text-dwhite1 mr-1 h-auto relative py-2.5 w-5/12"
                  onClick={() => setShowMobileFilter(false)}
                >
                  APPLY
                </button>
              </div>
            </div>
          )}
      {!loading ? (
        <Loader />
      ) : noData ? (
        <div className="flex items-center justify-center mt-20 flex-col h-96">
          {/* <img src={notFound} className=" w-2/12" alt="Not Found" /> */}
          <h2 className="text-2xl mt-4">Sorry, there is nothing here!</h2>
          <Link to="/" className="bg-dblue text-white px-10 py-3 rounded mt-4">
            START SHOPPING
          </Link>
        </div>
      ) : (
        <div className="list">
          {showCartmenu && (
            <div ref={wrapperRef} onMouseEnter={() => setHoveredCart(true)}>
              <TopCart cartmenu={showCartmenu} />
            </div>
          )}
          {hoveredCart && (
            <>
              <div
                onMouseEnter={() => {
                  setHoveredCart(true);
                }}
                onMouseLeave={() => {
                  setHoveredCart(false);
                }}
              >
                <TopCart cartmenu={hoveredCart} />
              </div>
              {/* <div
                className={`fixed h-full w-full min-h-full z-10 ${
                  showCartmenu ? "bg-transparent" : "bg-dblackOverlay2"
                }  top-0 left-0`}
              ></div> */}
            </>
          )}
          {overlay && (
            <div
              className="fixed h-full w-full min-h-full z-10 bg-dblackOverlay2 top-0 left-0"
              onClick={() => {
                setOverlay(false);
                setShowCartmenu(false);
              }}
            ></div>
          )}
          <div className="md:container">
            <div className="flex flex-col">
              <div
                className="border-b border-dgrey3 pt-2.5 mt-1 bg-dwhite1 md:bg-transparent"
                style={{ minHeight: "50px" }}
              >
                <div
                  className="breadcrumb text-left pr-2.5 inline-block align-middle"
                  style={{ minWidth: "25%" }}
                ></div>
                <div className="wrapper align-middle flex  items-center justify-center font-mono">
                  <div className="list-info-text text-dblack2 text-d15 flex flex-col md:flex-row w-full md:w-unset ">
                    <div className="list-info-product-count bg-dbeige md:bg-transparent  pb-5 md:pb-0">
                      <button className="md:hidden"></button>
                      <p className="md:hidden"></p>
                      <span className="search-total-count">
                        Showing {data?.result?.nbHits}{" "}
                      </span>
                      <span className="search-total-count-text">products.</span>
                    </div>
                    <div className="list-info-mobile-filters block md:hidden py-3">
                      <div className="list__info__mobile-filters__line relative mb-1 flex justify-between items-center">
                        <div
                          className="filter-btn w-1/2 font-mono text-d14 text-dblack2 px-2.5 text-center border-r border-dgrey3"
                          onClick={() => setShowMobileFilter(true)}
                        >
                        {/* omar */}
                          {/* <p>Filter</p> */}
                          <p></p>
                        </div>
                        {/* <div
                          onClick={() => removeFilters()}
                          className="text-d13  text-center w-1/2  whitespace-nowrap  underline text-dborderblack0 cursor-pointer"
                        >
                          Remove All Filters
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden"></div>
                  <div className="text-left text-dblack2 text-d15 hidden md:block">
                    <div className="selected__filters__wrapper p-2.5">
                      <span>Filters :</span>
                      <span className="list__info__filter pl-3.5">
                        {/* <input
                            type="checkbox"
                            name="search_text"
                            id=""
                            value=""
                          /> */}
                        <span className="inline-block cursor-pointer  text-d15 text-dblack2">
                          {keyword}
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* <div
                    onClick={() => removeFilters()}
                    className="hidden md:block border border-dgrey5 bg-dwhite1 text-d15 py-1 px-5 text-center ml-2.5 -mr-1 rounded-3xl uppercase text-dborderblack0 cursor-pointer"
                  >
                    Remove Filters
                  </div> */}
                  <Link className="hidden border border-dgrey5 bg-dwhite1 text-d15 py-1 px-5 text-center ml-2.5 -mr-1 rounded-3xl uppercase text-dborderblack0"></Link>
                  <div className="hidden"></div>
                </div>
              </div>
            </div>
            <div className="pb-6 -mx-1 mt-3 flex justify-between">
              {(width > 650 && 1 !== 1 )&& (
                <div className="inline-block ">
                  <div className="pb-12 w-48">
                    <div className="category-tree">
                      <div className="category-big-title h-10 relative border-b border-dgrey9 text-dborderblack0 w-full text-left">
                        <div className="text-d16 text-dborderblack5 uppercase">
                          CATEGORIES
                        </div>
                      </div>
                      <div className="filter-wrapper py-5"></div>
                      <div className="category-big-title h-10 relative border-b border-dgrey9 text-dborderblack0 w-full">
                        <div className="text-d16 text-dborderblack5 uppercase text-left">
                          FILTERS
                        </div>
                      </div>
                      {filters?.map((filter) => (
                        <div className="w-full" key={filter.value}>
                          <div className="filter-sub-title text-left text-d14 text-dblack2 pt-8 uppercase mb-2.5 block w-full">
                            {filter["new_items"].length > 0 && filter.name}
                          </div>
                          <div
                            className="sidebar-filter inline-block overflow-y-scroll overflow-x-hidden min-w-full"
                            style={{ maxHeight: "210px" }}
                          >
                            {filter?.new_items.length > 0 &&
                            filter.name === "Color" ? (
                              <div
                                className={`${
                                  filter?.new_items.length > 6 &&
                                  "h-36 overflow-y-auto"
                                }`}
                              >
                                <div className="grid grid-cols-4 w-3/4 ">
                                  {filter?.new_items.map((fil) => (
                                    <div
                                      className="text-left w-full my-1 cursor-pointer"
                                      key={fil.name}
                                    >
                                      <img
                                        src={fil.image}
                                        alt={fil.name}
                                        className={`rounded-full w-8   ${checkFilter(
                                          filter[fil].id,
                                          filter[fil].name,
                                          fil
                                        )}`}
                                        onClick={() => {
                                          handleFilter(filter.name, fil.name);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div
                                className={`${
                                  filter?.new_items.length > 6 &&
                                  "h-36 overflow-y-auto"
                                }`}
                              >
                                {filter?.new_items?.map((fil) =>
                                  filter[fil]?.name === "DIMENSIONS" ||
                                  filter[fil]?.name === "Size" ? (
                                    <div
                                      className={`w-full border cursor-pointer bg-white my-1 text-dborderblack0 text-d15 py-1 ${checkFilter(
                                        filter[fil]?.id,
                                        filter[fil]?.name,
                                        fil
                                      )}`}
                                      onClick={() => {
                                        handleFilter(filter.name, fil.name);
                                      }}
                                      key={fil?.name}
                                    >
                                      {fil?.name}
                                    </div>
                                  ) : (
                                    <div
                                      className={`text-left w-full cursor-pointer  hover:underline underline-offset-4 text-dborderblack0 text-d15 pointer-events-auto ${checkFilter(
                                        filter[fil]?.id,
                                        fil?.name,
                                        fil
                                      )}`}
                                      onClick={() => {
                                        handleFilter(filter.name, fil.name);
                                      }}
                                    >
                                      {fil?.name}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                          <div className="clear"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full md:w-full">
                <div className="border-b border-dgrey3 h-10 hidden md:block">
                  <div className="w-full container ">
                    <div className="content__actions__select-box hidden mr-8 md:flex md:items-center md:justify-between">
                      <div className="flex items-center">
                        <div className="list-content__actions__sub--title text-d16 pr-3.5 relative  inline-block">
                          VIEW
                        </div>
                        <div
                          className={`list__grid flex  mr-2.5 text-center align-middle
                           ${
                             view === 2
                               ? "text-d18  text-dborderblack1"
                               : "ml-3 text-d14 text-dbordergrey"
                           }`}
                          onClick={() => setView(2)}
                        >
                          <GiSquare />
                          <GiSquare
                            className={`${view === 2 ? "-ml-0.5" : "-ml-0.5"}`}
                          />
                        </div>
                        <div
                          className={`list__grid flex mr-2.5 text-center align-middle 
                          ${
                            view === 3
                              ? "text-d18  text-dborderblack1"
                              : "ml-3 text-d14 text-dbordergrey"
                          }`}
                          onClick={() => setView(3)}
                        >
                          <GiSquare />
                          <GiSquare
                            className={`${view === 3 ? "-mx-0.5" : "-mx-0.5"}`}
                          />
                          <GiSquare />
                        </div>
                        <div
                          className={`list__grid flex mr-2.5 text-center align-middle
                           ${
                             view === 4
                               ? "text-d18  text-dborderblack1"
                               : "ml-3 text-d14 text-dbordergrey"
                           }`}
                          onClick={() => setView(4)}
                        >
                          <GiSquare />
                          <GiSquare
                            className={view === 4 ? "-mx-0.5" : "-mx-0.5"}
                          />
                          <GiSquare
                            className={view === 4 ? "-mr-0.5" : "-mr-0.5"}
                          />
                          <GiSquare />
                        </div>
                      </div>
                      {/* <div className="content__actions__select-box hidden md:flex md:items-center mr-8">
                          <div className="text-d16 pr-3.5 relative top-1">
                            SORT:
                          </div>
  
                          <div className="py-1 w-36 text-sm ml-10 bg-dwhite1 mt-1.5 cursor-pointer  flex flex-col">
                            <div>{sort}</div>
  
                            <div className=" bg-dwhite1 ">
                              hii
                            </div>
                          </div>
                        </div> */}
                    </div>
                  </div>
                </div>
                {width > 650 ? (
                  <div className="w-full">
                    <div className="page-count hidden">4</div>
                    <div className="page-count hidden"></div>
                    <div className="page-count hidden"></div>
                    <div className="list-content">
                      <span className="hidden"></span>
                      <div className="product-container">
                        <div
                          className={`list-row grid ${
                            view === 2
                              ? "grid-cols-2"
                              : view === 4
                              ? "grid-cols-4"
                              : "grid-cols-3"
                          } `}
                        >
                          {data?.products?.map((product) => (
                            <div className="" key={product.product_id}>
                              <SingleProductCategory
                                item={product}
                                showCartmenu={showCart}
                              ></SingleProductCategory>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="flex flex-col justify-around opacity-0 items-center fixed bottom-16 right-6 z-30 w-20 h-11 text-d12 font-bold text-center cursor-pointer transition-all text-dwhite1 bg-dborderblack1 py-1"></div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="page-count hidden">4</div>
                    <div className="page-count hidden"></div>
                    <div className="page-count hidden"></div>
                    <div className="list-content">
                      <span className="hidden"></span>
                      <div className="product-container">
                        <div className={`list-row grid grid-cols-2`}>
                          {data?.products?.map((product) => (
                            <div className="" key={product.product_id}>
                              <SingleProductCategory
                                item={product}
                              ></SingleProductCategory>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="clearfix"></div>
                    </div>
                    <div className="flex flex-col justify-around opacity-0 items-center fixed bottom-16 right-6 z-30 w-20 h-11 text-d12 font-bold text-center cursor-pointer transition-all text-dwhite1 bg-dborderblack1 py-1"></div>
                  </div>
                )}

                <div className="showmore_wrap text-center"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
