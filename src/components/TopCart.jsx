import React from "react";
import { Link } from 'react-router-dom';
import { BsCart3 }  from "react-icons/bs";

function TopCart() {
  return (
    <div>
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
    </div>
  );
}

export default TopCart;
