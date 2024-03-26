import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import DesktopMenu from "./DesktopMenu";
import TopWishlist from "./TopWishlist";
import TopAccount from "./TopAccount";
import TopCart from "./TopCart";
import TopSearch from "./TopSearch";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import _axios from "../axios";
import buildLink, { path } from "../urls";
import { AccountContext } from "../contexts/AccountContext";
import { InformationContext } from "../contexts/InformationContext";
import Cookies from "js-cookie";
import SitesHeader from "./SitesHeader";
import logo_edit from "../assets/images/logo_edit.png";

function Header() {
  const width = window.innerWidth;
  const [menuCategories2, setMenuCategories2] = useState([]);
  const [selectedMenuCategory2, setSelectedMenuCategory2] = useState();
  const [viewmenu, setViewMenu] = useState(false);
  const [viewMenuCategories2, setViewMenuCategories2] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const [viewLevel2, setViewLevel2] = useState(false);
  const [state, dispatch] = useContext(AccountContext);
  const infoState = useContext(InformationContext);
  const [infoActive, setInfoActive] = useState(false);
  const location = useLocation();
  const [token, setToken] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [local, setLocal] = useState(false);

  useEffect(() => {
    if (
      window.location.host === "localhost:3000" ||
      window.location.host === "localhost:3001"
    ) {
      setLocal(true);
    }

    if (width < 1000) {
      _axios
        .get(buildLink("all_categories", undefined, window.innerWidth))
        .then((response) => {
          try {
            const data = response.data.data;
            setCategories(data);
          } catch (error) {}
        });
      _axios
        .get(buildLink("headerv2", undefined, window.innerWidth))
        .then((response) => {
          const data = response?.data;
          setMenuCategories2(data.data);
          // setSelectedMenuCategory2(data[0]);
        });
    }

    function checkCookies() {
      const adminToken = Cookies.get("ATDetails");
      if (typeof adminToken != "undefined") {
        setToken(adminToken);
      }
      // else {
      //   !state.admin && history.push({
      //     pathname: "/"
      //   })

      // }
    }
    checkCookies();
  }, []);

  //used infoContext instead
  // async function getInfo() {
  //   _axios
  //     .get(buildLink("information", undefined, window.innerWidth))
  //     .then((response) => {
  //       try {
  //         const data = response.data.data.informations;
  //         setInfo(data);
  //       } catch (e) {}
  //     });
  // }

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowMessage(true);
  };

  const remove = () => {
    return setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  // useEffect(() => {
  //   getInfo();
  // }, []);

  return (
    <div className="relative ">
      {/* Sites Header */}
      {/* {local && <SitesHeader />} */}

      {/* Admin Top Bar */}
      <div
        className={
          !state.admin ? "hidden" : `h-12 px-10 text-white flex items-center`
        }
        style={{ background: "#555" }}
      >
        <div className="container flex justify-between  items-center">
          {(location?.pathname === "/pos" ||
            location?.pathname === "/orders") && (
            <Link
              to={"/cart"}
              className="md:mr-10 text-d22 text-dwhite  font-serif"
            >
              ENGLISH HOME
            </Link>
          )}
          <div className="flex space-x-10">
            <div className="space-x-10 flex ">
              <a
                target="_blank"
                className="px-2"
                rel="noreferrer"
                href={`${path}/pos`}
              >
                Pos
              </a>
              <a
                target="_blank"
                className="px-2"
                rel="noreferrer"
                href={`${path}/posorders`}
              >
                orders list
              </a>
            </div>
            {/* ) : ( */}
            {location?.pathname !== "/pos" &&
              location?.pathname !== "/orders" && (
                <>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={window.config["admin-products-url"] + token}
                  >
                    Products
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={window.config["admin-orders-url"] + token}
                  >
                    Orders
                  </a>

                  <div> {showMessage && remove() && "Link COPIED"}</div>
                  <div className=" cursor-pointer">
                    <p onClick={copy}>Copy Link</p>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>

      <div className="hidden">
        <TopAccount />
      </div>
      {
        //state?.admin &&
        location?.pathname !== "/checkout" &&
        location?.pathname !== "/pos" &&
        location?.pathname !== "/orders" ? (
          <>
            <section className="hidden md:block h-10 bg-dgrey1">
              <div className="container">
                <div className="row">
                  <div className="topbar__links float-right">
                    <Link
                      className="text-dblack2 text-d12 ml-5 leading-10 font-bold hover:underline border-r border-dgrey9 pr-4"
                      to={`/storeLocator`}
                    >
                      Store Locator
                    </Link>
                    {infoState?.informations?.map(
                      (i) =>
                        i.status === "1" && (
                          <Link
                            key={i.id}
                            className="text-dblack2 text-d12 ml-5 leading-10 font-bold hover:underline"
                            to={`/information/${i.id}`}
                          >
                            {i.title}
                          </Link>
                        )
                    )}
                    <Link
                      className="text-dblack2 text-d12 ml-5 leading-10 font-bold hover:underline"
                      to={`/contact`}
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <div
              className="header__action  md:pt-6 bg-dwhite1 lg:container"
              style={{ height: "85px" }}
            >
              <div className="md:container header__action-container relative mt-2.5 ">
                <div className="back-bar hidden"></div>
                {width > 767 ? (
                  <>
                    <div className="header__logo float-left md:flex md:items-center lg:block">
                      <div className="md:block lg:hidden m-menu-opener-wrapper">
                        <Link
                          className="m-menu-opener float-left relative  h-4 ml-4 mr-1.5"
                          onClick={() => setViewMenu(true)}
                        >
                          <IoMdMenu className="w-6 h-6" />
                        </Link>
                        <Link className=""></Link>
                      </div>
                      <Link to={`${path}/`} className="md:text-d30 ">
                        {/* <span className="icon-logo text-xl md:text-2xl lg:text-4xl font-serif text-dbasenavy md:text-dblack1 whitespace-nowrap">
                          ENGLISH HOME
                        </span> */}
                        <img
                          className=" w-72"
                          src={logo_edit}
                          alt="Logo"
                        />
                      </Link>
                    </div>
                    <div className="header__icons float-right flex ml-2">
                      <TopWishlist />
                      <div className="header__user inline-block relative cursor-pointer ml-0.5 lg:ml-2">
                        <TopAccount />
                      </div>
                      <div className="header__icons-basket float-right cursor-pointer ml-0.5 mt-0.5 lg:mt-0 lg:ml-2">
                        <div className="relative">
                          <TopCart />
                        </div>
                      </div>
                    </div>
                    <div className="clearfix hidden"></div>
                    <div className="header__search search-wrapper xl:float-left ml-16">
                      <TopSearch />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <div className="header__logo flex items-center">
                        <div className="m-menu-opener-wrapper">
                          <Link
                            className="m-menu-opener float-left relative  h-4 ml-4 mr-1.5"
                            onClick={() => setViewMenu(true)}
                          >
                            <IoMdMenu className="w-6 h-6" />
                          </Link>
                          <Link className=""></Link>
                        </div>
                        <Link to={`${path}/`} className="">
                          {/* <span className="icon-logo text-d16 xs:text-xl md:text-4xl font-serif whitespace-nowrap">
                            ENGLISH HOME
                          </span> */}
                          <img
                          className="w-72" 
                          src={logo_edit}
                          alt="Logo"
                        />
                        </Link>
                      </div>
                      <div className="header__icons  flex ml-2">
                        <TopWishlist />
                        <div className="header__user inline-block relative cursor-pointer ml-2">
                          <TopAccount />
                        </div>
                        <div className="header__icons-basket  cursor-pointer ml-2">
                          <div className="relative">
                            <TopCart />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="clearfix hidden"></div>
                    <div className="header__search search-wrapper md:float-left ">
                      <TopSearch />
                    </div>
                  </>
                )}
              </div>
            </div>
            <DesktopMenu />
            <div
              className={`mobile-header-menu ${
                viewmenu ? "right-0" : "right-full"
              } right-0 h-full w-full fixed top-0 shadow-md z-40 transition-all bg-dblackOverlay`}
            >
              {width < 1000 && (
                <>
                  <div className="menu-link h-11 flex items-center text-dbasenavy border-b border-dbordergrey bg-dgrey2 justify-between">
                    <Link
                      to={"/"}
                      className="header__logo-wrapper inline-block text-left text-d22 text-dbasenavy ml-5 mr-3 font-serif whitespace-nowrap"
                    >
                      ENGLISH HOME
                    </Link>
                    <div className="menu-link-area w-60 flex justify-end items-center mr-4">
                      <div className="h-11 flex items-center text-dbasenavy border-b border-dbordergrey bg-dgrey2 justify-between">
                        <span className="font-bold  w-full text-left">
                          <IoMdClose
                            className="w-5 h-5"
                            onClick={() => {
                              setViewMenu(false);
                              setViewLevel2(false);
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="menu-items bg-dwhite1 w-5/6 h-full">
                    <div className="menu-item">
                      <div className="menu-item--col h-11 border-b border-dbordergrey">
                        <div className="menu-item--box flex items-center justify-between px-5 h-full ">
                          <div className="special-nav-item-mobile-parent flex items-center relative w-full">
                            <li
                              className="navigation-item w-full h-full"
                              style={{ listStyle: "none" }}
                            >
                              <Link
                                onClick={() => {
                                  setViewMenu(false);
                                }}
                                to={`${path}/latest`}
                                className="special-item bg-transparent flex justify-between items-center  h-11"
                              >
                                <span className="align-middle p-0.5 flex justify-center items-center text-d16 font-bold text-dbasenavy uppercase font-mono">
                                  New products
                                </span>
                                {/* <img
                                  src="https://akn-eh.b-cdn.net/cms/2022/08/16/e3349520-4cc6-41a0-91db-0a03cafc4a15.png"
                                  alt=""
                                  className="w-8 h-8"
                                /> */}
                              </Link>
                            </li>
                          </div>
                        </div>
                      </div>
                      {menuCategories2?.map((category) => (
                        <div
                          className="menu-item--col h-11 border-b border-dbordergrey"
                          key={category?.category_id}
                        >
                          <div className="menu-item--box flex items-center justify-between px-5 h-full ">
                            <Link
                              to={`${path}/${category["title"].title
                                .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                                .replace(/\s+/g, "-")
                                .replace(/'/g, "")}/c=${
                                category["title"].mobile_type_id
                              }`}
                              onClick={() => {
                                setViewMenu(false);
                              }}
                              className="menu-item--title relative flex items-center uppercase text-d16 font-bold text-dbasenavy text-left font-mono"
                              dangerouslySetInnerHTML={{
                                __html: category["title"].title,
                              }}
                            ></Link>
                            {/* <img
                              src="https://akn-eh.b-cdn.net/cms/2022/08/16/e3349520-4cc6-41a0-91db-0a03cafc4a15.png"
                              alt=""
                              className="w-8 h-8"
                            /> */}

                            <BsChevronRight
                              onClick={() => {
                                setActiveCategory(category);
                                setViewLevel2(true);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      {/* informations */}
                      <div className="menu-item--col h-11 border-b border-dbordergrey">
                        <div className="menu-item--box flex items-center justify-between px-5 h-full ">
                          <div
                            onClick={() => {
                              setInfoActive(true);
                            }}
                            className="menu-item--title relative flex items-center uppercase text-d16 font-bold text-dbasenavy text-left font-mono"
                          >
                            informations
                          </div>

                          <BsChevronRight
                            onClick={() => {
                              setInfoActive(true);
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className={`menu-subitem bg-dwhite1 right-0 text-dbasenavy fixed top-11 ${
                          viewLevel2 ? "left-0" : "left-full"
                        } w-full h-full z-50 transition-all overflow-x-hidden text-left`}
                      >
                        <Link className="menu-subitem--title bg-dgrey4 text-dbasenavy w-full text-d16 font-bold py-5 px-7 block uppercase">
                          <div className="flex items-center">
                            <BsChevronLeft
                              className="w-5 h-5 mr-2"
                              onClick={() => setViewLevel2(false)}
                            />
                            {/* <p
                              dangerouslySetInnerHTML={{
                                __html: activeCategory?.name
                              }}
                            ></p> */}
                          </div>
                        </Link>
                        <Link className="menu-subitem--all block py-4  pr-4 pl-8 font-bold">
                          {" "}
                          See all
                        </Link>
                        <div className="menu-subitem--list pb-5 pr-3.5 pl-5 overflow-y-scroll h-full">
                          {activeCategory["sub-categories-level1"]?.length >
                            0 &&
                            activeCategory["sub-categories-level1"]?.map(
                              (subcategory) => (
                                <div
                                  className="font-d16 p-4 border-t border-dbordergrey4 flex items-center"
                                  key={subcategory?.category_id}
                                >
                                  <Link
                                    to={`${
                                      subcategory.name.length > 0
                                        ? "/" +
                                          subcategory.name
                                            .replace(
                                              /\s+&amp;\s+|\s+&gt;\s+/g,
                                              "-"
                                            )
                                            .replace(/\s+/g, "-") +
                                          "/c=" +
                                          subcategory.category_id
                                        : "cat/c=" + subcategory.category_id
                                    }`}
                                    onClick={() => {
                                      setViewMenu(false);
                                      setViewLevel2(false);
                                    }}
                                    className="menu-subitem--link flex items-center"
                                  >
                                    <span
                                      className="js-menu-subitem--link-text mr-2 uppercase"
                                      dangerouslySetInnerHTML={{
                                        __html: subcategory?.name,
                                      }}
                                    ></span>
                                  </Link>
                                </div>
                              )
                            )}
                        </div>
                      </div>
                      {/* information level2 */}
                      <div
                        className={`menu-subitem bg-dwhite1 right-0 text-dbasenavy fixed top-11 ${
                          infoActive ? "left-0" : "left-full"
                        } w-full h-full z-50 transition-all overflow-x-hidden text-left`}
                      >
                        <Link className="menu-subitem--title bg-dgrey4 text-dbasenavy w-full text-d16 font-bold py-5 px-7 block uppercase">
                          <div className="flex items-center">
                            <BsChevronLeft
                              className="w-5 h-5 mr-2"
                              onClick={() => setInfoActive(false)}
                            />
                            <p>Informations</p>
                          </div>
                        </Link>
                        <div className="menu-subitem--list pb-5 pr-3.5 pl-5 overflow-y-scroll h-full">
                          {infoState?.informations?.map((i) => (
                            <div
                              className="font-d16 p-4 border-t border-dbordergrey4 flex items-center"
                              key={i.id}
                            >
                              <Link
                                to={`/information/${i.id}`}
                                onClick={() => {
                                  setViewMenu(false);
                                  setInfoActive(false);
                                }}
                                className="menu-subitem--link flex items-center"
                              >
                                <span className="js-menu-subitem--link-text mr-2 uppercase">
                                  {" "}
                                  {i.title}
                                </span>
                              </Link>
                            </div>
                          ))}
                          <div className="font-d16 p-4 border-t border-dbordergrey4 flex items-center">
                            <Link
                              to={`/contact`}
                              onClick={() => {
                                setViewMenu(false);
                                setInfoActive(false);
                              }}
                              className="menu-subitem--link flex items-center"
                            >
                              <span className="js-menu-subitem--link-text mr-2 uppercase">
                                {" "}
                                Contact us
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="menu-campaigns"></div>
                  <div className="menu-collapse js-menu-collapse hidden-xs"></div>
                  <div className="menu-copy hidden-xs text-d14 text-center py-4 px-8 text-dblack1"></div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="checkout-header overflow-hidden">
            {location?.pathname !== "/pos" &&
              location?.pathname !== "/orders" && (
                <div className="container">
                  <div className="fix-header border-b border-dgrey3 mb-9 pb-7  w-full z-10 bg-dwhite1 flex items-center justify-center md:justify-between">
                    <Link
                      to={"/cart"}
                      className="mt-5 md:mr-10 text-d30 text-dborderblack2 font-serif"
                    >
                      <img
                          className=" w-72"
                          src={logo_edit}
                          alt="Logo"
                        />
                    </Link>
                  </div>
                </div>
              )}
          </div>
        )
      }
    </div>
  );
}

export default Header;
