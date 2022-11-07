import React from "react";
import { Link } from 'react-router-dom';
import { SlHeart }  from "react-icons/sl";

function TopWishlist() {
  return (
    <div>
      <Link className="cursor-pointer">
        <div className="h-9 w-10 leading-8 mx-auto border border-dblue1 text-dblue1 hover:text-dwhite1 hover:bg-dblue1 flex justify-center items-center mb-1">
          <SlHeart className="h-6 w-6 " />
        </div>
        <span className="header__icons-text whitespace-nowrap mt-1.5 text-d11">
          <p>Favorites</p>
        </span>
      </Link>
    </div>
  );
}

export default TopWishlist;
