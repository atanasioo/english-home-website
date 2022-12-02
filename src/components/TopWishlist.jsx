import React from "react";
import { Link } from "react-router-dom";
import { SlHeart } from "react-icons/sl";
import { useContext, useEffect } from "react";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { AccountContext } from "../contexts/AccountContext";
import { WishlistContext } from "../contexts/WishlistContext";

function TopWishlist() {
  const [state, dispatch] = useContext(WishlistContext);
  const [accountState] = useContext(AccountContext);

  useEffect(() => {
    dispatch({
      type: "loading",
      payload: true,
    });

    _axios
      .get(buildLink("wishlist", undefined, window.innerWidth))
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "setProducts",
            payload: response.data.data.products,
          });
          dispatch({
            type: "setTotals",
            payload: response.data.data.totals,
          });
          const ids = response.data.data.products.map((p) => p.product_id);
          dispatch({
            type: "setProductIds",
            payload: ids,
          });
          dispatch({
            type: "loading",
            payload: false,
          });
        }
      });
  }, [dispatch]);

  return (
    <div>
      <Link 
      to={"/account/wishlist"}
      className="cursor-pointer">
        <div className="h-9 w-6 md:w-10 leading-8 mx-auto lg:border lg:border-dblue1 text-dbasenavy lg:text-dblue1 hover:text-dwhite1 hover:bg-dblue1 flex justify-center items-center mb-1">
          <SlHeart className="h-5 w-5 md:h-6 md:w-6 " />
        </div>
        <span className="header__icons-text whitespace-nowrap hidden md:block mt-1.5 text-d11">
          <p>Favorites</p>
        </span>
      </Link>
    </div>
  );
}

export default TopWishlist;
