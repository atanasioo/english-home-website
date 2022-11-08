import React from "react";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { CartContext } from "../contexts/CartContext";
import { AccountContext } from "../contexts/AccountContext";

function TopCart() {
  const [state, dispatch] = useContext(CartContext);
  const [accountState] = useContext(AccountContext);
  console.log(state);
  return (
    <div className="relative">
      <Link className="relative">
        <div>
          <div className="h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 hover:text-dwhite1 hover:bg-dblue1 flex justify-center items-center mb-1">
            <span className="absolute -top-2 -left-1.5 w-4 h-4 leading-4 bg-dblue1 text-dwhite1 text-center rounded-full text-d11 font-bold ">
              0
            </span>
            <BsCart3 className="h-6 w-6" />
          </div>
          <div className=" text-d11 whitespace-nowrap">My cart</div>
        </div>
      </Link>
      <div className="absolute z-10 w-80 top-full -right-4 bg-dwhite1 shadow-lg">
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
          className="overflow-x-hidden overflow-y-hidden -mr-2"
          style={{ maxHeight: "245px", maxWidth: "300px" }}
        >
          <div className="table w-full p-4">
            <div className="table-row-group ">
              {/* needs map */}
              <div className="header__basket__item flex relative mb-4 ">
                <div className="table-cell align-top w-16">
                  <Link className="header__basket__item__img"></Link>
                </div>
                <Link className="flex flex-col justify-between pl-2.5 text-left font-mono w-full" style={{maxWidth: "200px"}}>
                  <p className="header__basket__item__text__product__name text-sm">Product name</p>
                  <div className="product-quantity-area text-sm">Quantity: 2</div>
                  <div className="header__basket__item__price -mr-2.5 ">
                    <div className="product-price-area leading-7 text-left text-d20 flex justify-end items-end">
                      <span className="product-old-price text-d14 relative leading-5 -top0.5 line-through">150</span>
                      <span className="product-new-price text-d22 text-dred3 font-bold ml-3">100</span>
                    </div>
                  </div>
                </Link>
                <Link className="absolute top-3 -right-1 block w-2.5 h-2.5 text-d20 text-dblack2">
                  <GrClose />
                </Link>

              </div>
              <div className="header__basket__item flex relative  mb-4">
                <div className="table-cell align-top w-16">
                  <Link className="header__basket__item__img"></Link>
                </div>
                <Link className="flex flex-col justify-between pl-2.5 text-left font-mono w-full" style={{maxWidth: "200px"}}>
                  <p className="header__basket__item__text__product__name text-sm">Product name</p>
                  <div className="product-quantity-area text-sm">Quantity: 2</div>
                  <div className="header__basket__item__price -mr-2.5 ">
                    <div className="product-price-area leading-7 text-left text-d20 flex justify-end items-end">
                      <span className="product-old-price text-d14 relative leading-5 -top0.5 line-through">150</span>
                      <span className="product-new-price text-d22 text-dred3 font-bold ml-3">100</span>
                    </div>
                  </div>
                </Link>
                <Link className="absolute top-3 -right-1 block w-2.5 h-2.5 text-d20 text-dblack2">
                  <GrClose />
                </Link>

              </div>

            </div>
          </div>
        </div>
        <div className="text-right border-t border-dgrey5">
          <div className="header__basket--total flex justify-between mx-4 font-sans">
            <div className="text-left mt-1 text-d16 text-dblack2 ">Total</div>
            <div className="flex">
              <div className="mt-1 mr-6 text-dblack2 line-through opacity-50">150</div>
              <div className="mt-1 text-dblue1">{state.totals} 100</div>
            </div>  
          </div>
          <div className="clear"></div>
        </div>
        <div>
          {/* <div className="js-basket-arrow-down-container">
            <div className="header__basker--dividers__down ">
              <div className="header__basket--divider border border-dbordergrey4 bg-dbordergrey2 h-10">
                <Link></Link>
              </div>
            </div>
          </div> */}
          <div className="header__basket__buttons flex my-5 mr-2.5 h-10">
          <Link className="mx-2 text-d12 p-2.5 text-center  w-full bg-dwhite1 text-dblue1 border border-dblue1 uppercase">View cart</Link>
          <Link className="text-d12 p-2.5 text-center  w-full bg-dblue1 hover:bg-dblack2 transition-all ease-in-out text-dwhite1 tracking-tighter z-20 uppercase">
            Complete shopping
          </Link>
          </div>
          <div className="clear"></div>
          <div className="header__basket__upsells text-d text-center capitalize"></div>
          <div className="header__basket-discounts h-auto p-2.5">
            <div className="mb-2.5 text-center text-d17">
              <div className="header__basket-discount-name h-auto bg-dgrey8 text-dblue1 p-2.5">*Additional 10% Discount on All Discounts</div>
            </div>
            <div className="mb-2.5 text-center text-d17">
              <div className="header__basket-discount-name h-auto bg-dgrey8 text-dblue1 p-2.5">150 TL and Over Free Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCart;
