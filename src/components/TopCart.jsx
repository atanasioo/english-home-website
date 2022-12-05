import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart3, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { CartContext } from "../contexts/CartContext";
import { AccountContext } from "../contexts/AccountContext";
import Slider from "react-slick";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import "../assets/css/index.css";

function TopCart(props) {
  const [state, dispatch] = useContext(CartContext);
  const [accountState] = useContext(AccountContext);
  const [showmenu, setShowmenu] = useState(false);
  const location = useLocation();
  const width= window.innerWidth

  const upArrow = (
    <div className="absolute z-50 top-0  cursor-pointer">
      <BsChevronUp className="w-8 h-7 text-dgrey6 absolute z-50 top-0 cursor-pointer" />
    </div>
  );

  const downArrow = (
    <div className="absolute z-50 bottom-0 left-1/2 cursor-pointer ">
      <BsChevronDown className="w-8 h-7 text-dgrey6  absolute z-50 bottom-0 cursor-pointer" />
    </div>
  );

  const setting = {
    speed: 100,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    arrows: true,
    prevArrow: upArrow,
    nextArrow: downArrow,
  };

  useEffect(() => {
    dispatch({
      type: "loading",
      payload: true,
    });
    _axios
      .get(buildLink("cartCount", undefined, window.innerWidth))
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "setProductsCount",
            payload: response.data.data.nb_of_products,
          });

          dispatch({
            type: "loading",
            payload: false,
          });
        } else {
          dispatch({
            type: "setProductsCount",
            payload: 0,
          });
          dispatch({
            type: "loading",
            payload: false,
          });
        }
      });
  }, [dispatch]);

  function getCart() {
    _axios
      .get(buildLink("cart", undefined, window.innerWidth))
      .then((response) => {
        // console.log("response"+response.data.success)

        if (response.data.success) {
          dispatch({
            type: "setProducts",
            payload: response.data.data.products,
          });

          dispatch({
            type: "setProductsCount",
            payload: response.data.data.total_product_count,
          });
          dispatch({
            type: "setTotals",
            payload: response.data.data.totals,
          });
          dispatch({
            type: "loading",
            payload: false,
          });
        }
      });
  }

  function updateQuantity(key, quantity) {
    const obj = { key, quantity };
    dispatch({
      type: "loading",
      payload: true,
    });
    _axios
      .put(buildLink("cart", undefined, window.innerWidth), obj)
      .then(() => {
        _axios
          .get(buildLink("cart", undefined, window.innerWidth))
          .then((response) => {
            dispatch({
              type: "setProducts",
              payload:
                response.data?.data?.products?.length > 0
                  ? response.data.data.products
                  : [],
            });
            dispatch({
              type: "setTotals",
              payload:
                response.data?.data?.totals?.length > 0
                  ? response.data.data.totals
                  : 0,
            });
            dispatch({
              type: "setProductsCount",
              payload:
                response.data?.data?.total_product_count > 0
                  ? response.data.data.total_product_count
                  : 0,
            });
            dispatch({
              type: "loading",
              payload: false,
            });
            // if (quantity === 0) {
            //   window.location.reload();
            // }
          });
      });
  }

  return (
    <div>
      {!props.cartmenu ? (
        <div className="relative">
          <Link
            to={"/cart"}
            className="relative"
            onMouseEnter={() => {
              getCart();
              setShowmenu(true);
            }}
            onMouseLeave={() => setShowmenu(false)}
          >
            <div>
              <div className="h-9 w-6 md:w-10 leading-8 mx-auto lg:border lg:border-dblue1 text-dbasenavy lg:text-dblue1 lg:hover:text-dwhite1 lg:hover:bg-dblue1 flex justify-center items-center mb-1">
                <span className="absolute -top-0.5 md:-top-1 lg:-top-2 -left-1.5 w-4 h-4 leading-4 bg-dbasenavy md:bg-dblue1 text-dwhite1 text-center rounded-full text-d11 font-bold ">
                  {state?.productsCount}
                </span>
                <BsCart3 className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className=" text-d11 whitespace-nowrap hidden md:block">
                My cart
              </div>
            </div>
          </Link>
          {showmenu && accountState.loged && (
            <div
              className="hidden md:block absolute z-20 w-80 top-full -mt-2 -right-4 bg-dwhite1 shadow-lg"
              onMouseEnter={() => setShowmenu(true)}
              onMouseLeave={() => setShowmenu(false)}
            >
              <div className="absolute -top-3.5 right-5 border-b border-dbordergrey2 "></div>
              <div className="text-d16 border-b border-dbordergrey3 py-2.5 pr-2.5 pl-6 text-dblack2 bg-dbordergrey2 text-left">
                You have {state?.productsCount} items in your cart
              </div>
              {/* <div>
        <div>
          <div className="border border-dbordergrey4 bg-dbordergrey2 h-10">
            <Link></Link>
          </div>
        </div>
      </div> */}
              <div
                className="overflow-x-hidden overflow-y-hidden "
                style={{ maxHeight: "270px", maxWidth: "320px" }}
              >
                <div className="table w-full p-4">
                  <div className="table-row-group cart_slider">
                    {/* needs map */}
                    <Slider {...setting}>
                      {state?.products?.map((product) => (
                        <div
                          className="header__basket__item flex relative mb-4"
                          key={product?.product_id}
                        >
                          <div className="table-cell align-top w-16">
                            <Link className="header__basket__item__img">
                              <img src={product?.thumb} alt="" />
                            </Link>
                          </div>
                          <Link
                            className="flex flex-col justify-between pl-2.5 text-left font-mono w-full"
                            style={{ maxWidth: "200px" }}
                          >
                            <p className="header__basket__item__text__product__name text-sm line-clamp-3" 
                            dangerouslySetInnerHTML={{__html: product?.name}}>
                            </p>
                            <div className="product-quantity-area text-sm">
                              Quantity: {product?.quantity}
                            </div>
                            <div className="header__basket__item__price -mr-2.5 ">
                              <div className="product-price-area leading-7 text-left text-d20 flex justify-end items-end">
                                {/* <span className="product-old-price text-d14 relative leading-5 -top0.5 line-through">
                                150
                              </span> */}
                                <span className="product-new-price text-d22 text-dred3 font-bold ml-3">
                                  ${product?.unit_price}
                                </span>
                              </div>
                            </div>
                          </Link>
                          <div
                            className="absolute top-3 right-2 block w-2.5 h-2.5 text-d20 text-dblack2 cursor-pointer"
                            onClick={() => updateQuantity(product?.cart_id, 0)}
                          >
                            <GrClose />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
              <div className="text-right border-t border-dgrey5">
                <div className="header__basket--total mx-4 font-sans">
                  {/* <div className="text-left mt-1 text-d16 text-dblack2 ">
                    Total
                  </div>
                  <div className="flex">
                    <div className="mt-1 mr-6 text-dblack2 line-through opacity-50">
                      150
                    </div>
                    <div className="mt-1 text-dblue1"> 100</div>
                  </div> */}
                  {state?.totals?.map((total, index) => (
                    <div
                      className={`${
                        index === state?.totals.length - 1 ? "block" : "hidden"
                      } flex justify-between items-center`}
                    >
                      <div> {total.title} </div>
                      <div>{total.text}</div>
                    </div>
                  ))}
                </div>
                <div className="clear"></div>
              </div>
              <div>
                <div className="header__basket__buttons flex my-5 mr-2.5 h-10">
                  <Link
                    to={"/cart"}
                    className="mx-2 text-d12 p-2.5 text-center  w-full bg-dwhite1 text-dblue1 border border-dblue1 uppercase"
                  >
                    View cart
                  </Link>
                  <Link
                    to={"/checkout"}
                    className="text-d12 p-2.5 text-center  w-full bg-dblue1 hover:bg-dblack2 transition-all ease-in-out text-dwhite1 tracking-tighter z-20 uppercase"
                  >
                    Complete shopping
                  </Link>
                </div>
                <div className="clear"></div>
                <div className="header__basket__upsells text-d text-center capitalize"></div>
                <div className="header__basket-discounts h-auto p-2.5">
                  <div className="mb-2.5 text-center text-d17">
                    <div className="header__basket-discount-name h-auto bg-dgrey8 text-dblue1 p-2.5">
                      *Additional 10% Discount on All Discounts
                    </div>
                  </div>
                  <div className="mb-2.5 text-center text-d17">
                    <div className="header__basket-discount-name h-auto bg-dgrey8 text-dblue1 p-2.5">
                      150 TL and Over Free Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="absolute z-20 w-80 top-36 -mt-2 right-16 bg-dwhite1 shadow-lg"
          ref={props.wrapper}
        >
          <div className="text-d16 border-b border-dbordergrey3 py-2.5 pr-2.5 pl-6 text-dblack2 bg-dbordergrey2 text-left">
            You have {state?.productsCount} items in your cart
          </div>
          <div
            className="overflow-x-hidden overflow-y-hidden -mr-2"
            style={{ maxHeight: "270px", maxWidth: "320px" }}
          >
            <div className="table w-full p-4">
              <div className="table-row-group cart_slider">
                <Slider {...setting}>
                  {state?.products?.map((product) => (
                    <div
                      className="header__basket__item flex relative mb-4"
                      key={product?.product_id}
                    >
                      <div className="table-cell align-top w-16">
                        <Link className="header__basket__item__img">
                          <img src={product?.thumb} alt="" />
                        </Link>
                      </div>
                      <Link
                        className="flex flex-col justify-between pl-2.5 text-left font-mono w-full"
                        style={{ maxWidth: "200px" }}
                      >
                        <p className="header__basket__item__text__product__name text-sm line-clamp-3">
                          {product?.name}
                        </p>
                        <div className="product-quantity-area text-sm">
                          Quantity: {product?.quantity}
                        </div>
                        <div className="header__basket__item__price -mr-2.5 ">
                          <div className="product-price-area leading-7 text-left text-d20 flex justify-end items-end">
                            {/* <span className="product-old-price text-d14 relative leading-5 -top0.5 line-through">
                        150
                      </span> */}
                            <span className="product-new-price text-d22 text-dred3 font-bold ml-3">
                              ${product?.unit_price}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div
                        className="absolute top-3 right-2 block w-2.5 h-2.5 text-d20 text-dblack2 cursor-pointer"
                        onClick={() => updateQuantity(product?.cart_id, 0)}
                      >
                        <GrClose />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          <div className="text-right border-t border-dgrey5">
            <div className="header__basket--total flex justify-between mx-4 font-sans">
              <div className="text-left mt-1 text-d16 text-dblack2 ">Total</div>
              <div className="flex">
                <div className="mt-1 mr-6 text-dblack2 line-through opacity-50">
                  150
                </div>
                <div className="mt-1 text-dblue1">
                  {state?.totals["0"]?.text}{" "}
                </div>
              </div>
            </div>
            <div className="clear"></div>
          </div>
          <div>
            <div className="header__basket__buttons flex my-5 mr-2.5 h-10">
              <Link
                to={"/cart"}
                className="mx-2 text-d12 p-2.5 text-center  w-full bg-dwhite1 text-dblue1 border border-dblue1 uppercase"
              >
                View cart
              </Link>
              <Link
                to={"/checkout"}
                className="text-d12 p-2.5 text-center  w-full bg-dblue1 hover:bg-dblack2 transition-all ease-in-out text-dwhite1 tracking-tighter z-20 uppercase"
              >
                Complete shopping
              </Link>
            </div>
            <div className="clear"></div>
            <div className="header__basket__upsells text-d text-center capitalize"></div>
            <div className="header__basket-discounts h-auto p-2.5">
              <div className="mb-2.5 text-center text-d17">
                <div className="header__basket-discount-name h-auto bg-dgrey8 text-dblue1 p-2.5">
                  *Additional 10% Discount on All Discounts
                </div>
              </div>
              <div className="mb-2.5 text-center text-d17">
                <div className="header__basket-discount-name h-auto bg-dgrey8 text-dblue1 p-2.5">
                  150 TL and Over Free Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
        // <div className="bg-dred4">
        //   hiiiiiiiiiii
        // </div>
      )}
    </div>
  );
}

export default TopCart;
