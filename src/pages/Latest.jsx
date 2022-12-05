import { useContext, useEffect, useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate, useLocation } from "react-router-dom";
import _axios from "../axios";
import queryString from "query-string";
import buildLink, { path } from "../urls";
import { AccountContext } from "../contexts/AccountContext";
import SingleProductCategory from "../components/SingleProductCategory";
import Cookies from "js-cookie";
import { GiSquare } from "react-icons/gi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import Loader from "../components/Loader";
import TopCart from "../components/TopCart";

function Latest() {
  const width = window.innerWidth;
  const [state] = useContext(AccountContext);
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [view, setView] = useState(4);
  const [display, setDisplay] = useState("grid");
  const [page, setPage] = useState(0);
  const [empty, setEmpty] = useState(false);
  const parsedQueryString = queryString.parse(location.search);
  const [loading, setLaoding] = useState(true);
  const [showLimit, setShowLimit] = useState(false);
  const [mobileSort, showMobileSort] = useState(false);
  const [limit, setLimit] = useState(48);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [showCartmenu, setShowCartmenu] = useState(false);
  const [hoveredCart, setHoveredCart] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const wrapperRef = useRef(null);

  function showCart() {
    setShowCartmenu(true);
    setOverlay(true);
    setTimeout(() => {
      setShowCartmenu(false);
      setOverlay(false);
    }, 3000);
  }

  useEffect(() => {
    var url1 = new URL(window.location);

    var p = url1.searchParams.get("page");
    if (p > 0) {
      setPage(p);
    } else {
      setPage(1);
    }
  }, [location]);

  useEffect(() => {
    setLaoding(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    _axios
      .get(
        buildLink("latest", undefined, window.innerWidth) +
          `&page=${page}&limit=${limit}&sort=Default`
      )
      .then((response) => {
        if (response?.status === 200 && response?.data?.success) {
          setData(response.data);
          setProducts(response?.data?.data?.products);
          setTotal(response?.data?.data?.total);
          setLaoding(false);
        }
      });
    if (page > 1 || limit > 48) {
      //   history.push({
      //     pathname: "/latest",
      //     search: `&page=${page}&limit=${limit}`,
      //   });
      navigate("/latest?page=" + page + "&limit=" + limit);
    }

    //  window.location.reload()
  }, [page, limit]);

  function pageSetter(page) {
    setPage(page["selected"] + 1);
  }


  return (
    <div className="w-full bg-dgrey10">
      {/* mobile display popup */}
      {width < 650 && showLimit && (
        <div>
          <div className="bg-dblackOverlay2 fixed z-20 w-full h-full top-0 left-0"></div>
          <div className="w-3/4 bg-dwhite1 h-2/5 fixed z-30 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-mono tracking-tight">
            <GrClose
              className="fixed right-0 m-3"
              onClick={() => setShowLimit(false)}
            />
            <div className="p-4 mt-3">
              <div className="w-full font-bold ">Display per page:</div>

              <div className="flex flex-col mt-8">
                <button
                  onClick={() => {
                    setLimit(48);
                    setShowLimit(false);
                  }}
                  className="bg-dblue1 border border-dblue1 text-dwhite1 mb-3 leading-8"
                >
                  48 per page
                </button>
                <button
                  onClick={() => {
                    setLimit(96);
                    setShowLimit(false);
                  }}
                  className="bg-dblue1 border border-dblue1 text-dwhite1  mb-3 leading-8"
                >
                  96 per page
                </button>
                <button
                  onClick={() => {
                    setLimit(144);
                    setShowLimit(false);
                  }}
                  className="bg-dblue1 border border-dblue1 text-dwhite1 leading-8"
                >
                  144 per page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="container">
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
          <div className="w-full ">
            <div className="border-b border-dgrey3 h-14 hidden md:block ">
              <div className="w-full container py-2">
                <div className="content__actions__select-box hidden mr-8 md:flex md:items-center md:justify-between">
                  <div className="flex items-center">
                    <div className="list-content__actions__sub--title text-d16 pr-3.5 relative  inline-block">
                      VIEW
                    </div>
                    {/* <div
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
                </div> */}
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
                    <div
                      className={`list__grid flex mr-2.5 text-center align-middle
                           ${
                             view === 5
                               ? "text-d18  text-dborderblack1"
                               : "ml-3 text-d14 text-dbordergrey"
                           }`}
                      onClick={() => setView(5)}
                    >
                      <GiSquare />
                      <GiSquare
                        className={view === 5 ? "-mx-0.5" : "-mx-0.5"}
                      />
                      <GiSquare
                        className={view === 5 ? "-mr-0.5" : "-mr-0.5"}
                      />
                      <GiSquare
                        className={view === 5 ? "-mr-0.5" : "-mr-0.5"}
                      />
                      <GiSquare />
                    </div>
                  </div>
                  <div className="content__actions__select-box hidden md:flex md:items-center mr-8">
                    <div className="text-d16 pr-3.5 relative top-1">
                      Display:
                    </div>
                    <div className="relative">
                      <div
                        onClick={() => setShowLimit(!showLimit)}
                        className="py-1 w-36 text-sm ml-10 bg-dwhite1 mt-1.5 cursor-pointer  flex items-center justify-center"
                      >
                        <div className=" bg-dwhite1">{limit} Per Page</div>
                        <FiChevronDown className="w-4 h-4 ml-2 mt-0.5" />
                      </div>
                      {showLimit && (
                        <div className="absolute z-20 top-9 right-0 bg-dwhite1 w-36 capitalize font-light text-sm cursor-pointer">
                          <div
                            onClick={() => {
                              setLimit(48);
                              setShowLimit(false);
                            }}
                            className="hover:bg-dblue1 hover:text-dwhite1 w-full leading-7"
                          >
                            48 per page
                          </div>
                          <div
                            onClick={() => {
                              setLimit(96);
                              setShowLimit(false);
                            }}
                            className="hover:bg-dblue1 hover:text-dwhite1 w-full leading-7"
                          >
                            96 per page
                          </div>
                          <div
                            onClick={() => {
                              setLimit(144);
                              setShowLimit(false);
                            }}
                            className="hover:bg-dblue1 hover:text-dwhite1 w-full leading-7"
                          >
                            144 per page
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* mobile display */}
            <div className="md:hidden w-full h-20 bg-dbeige flex flex-col justify-center font-mono tracking-tight">
              <div className="flex items-center justify-center">
                <div
                  className="underline underline-offset-2 mr-2"
                  onClick={() => setShowLimit(true)}
                >
                  Display:
                </div>
                <div className="no-underline">{limit} per page</div>
              </div>
            </div>
            {width > 650 ? (
              <div className="w-full">
                <div className="page-count hidden">4</div>
                <div className="page-count hidden"></div>
                <div className="page-count hidden"></div>
                <div className="list-content">
                  <div className="product-container">
                    <div
                      className={`list-row grid ${
                        view === 5
                          ? "grid-cols-5"
                          : view === 4
                          ? "grid-cols-4"
                          : "grid-cols-3"
                      } `}
                    >
                      {data?.data?.products?.map((product) => (
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
                {/* Pagination */}
                {Math.ceil(total / limit) > 1 && (
                  <ReactPaginate
                    pageCount={Math.ceil(total / limit)}
                    containerClassName={"pagination"}
                    onPageChange={pageSetter}
                    pageRangeDisplayed={width > 650 ? 2 : 1}
                    marginPagesDisplayed={width > 650 ? 1 : 1}
                    previousLabel={"<"}
                    previousLinkClassName={"arrowLink"}
                    nextLinkClassName={"arrowLink"}
                    nextLabel={">"}
                    activeClassName={"active-pagination"}
                    forcePage={
                      parsedQueryString.page
                        ? parseInt(parsedQueryString.page) - 1
                        : 0
                    }
                  ></ReactPaginate>
                )}
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
                      {data?.data?.products?.map((product) => (
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
                <ReactPaginate
                  pageCount={Math.ceil(total / limit)}
                  containerClassName={"pagination"}
                  onPageChange={pageSetter}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={1}
                  previousLabel={"<"}
                  nextLabel={">"}
                  activeClassName={"active-pagination"}
                  forcePage={
                    parsedQueryString.page
                      ? parseInt(parsedQueryString.page) - 1
                      : 0
                  }
                ></ReactPaginate>
              </div>
            )}

            <div className="showmore_wrap text-center"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Latest;
