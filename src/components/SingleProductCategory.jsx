import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import buildLink, { path } from "../urls";

export default function SingleProducCategory(props) {
  const [hovered, isHovered] = useState(false);
  //   const [hovered1, isHovered1] = useState(false);

  function onMouseLeave() {
    isHovered(false);
    // isHovered1(false);
  }
  function ToSeoUrl(url) {
        
    // make the url lowercase         
    var encodedUrl = url.toString().toLowerCase(); 
  
    // replace & with and           
    encodedUrl = encodedUrl.split(/\&+/).join("-and-")
  
    // remove invalid characters 
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       
  
    // remove duplicates 
    encodedUrl = encodedUrl.split(/-+/).join("-");
  
    // trim leading & trailing characters 
    encodedUrl = encodedUrl.trim('-'); 
  
    return encodedUrl; 
  }
  return (
    <Link
      to={`${path}/${ToSeoUrl(props.item.name)}/p=${props.item.product_id}`}
      className="relative w-full "
      onMouseEnter={() => isHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative m-2.5">
        <img className="w-full " src={props.item.thumb} alt={props.item.name} />

        {window.innerWidth > 650 && (
          <>
            {" "}
            <button
              className={`place-content-center text-dblue1 -bottom-2.5 flex items-center absolute h-12 ${
                hovered
                  ? "  bottom-0.5  inset-x-0  opacity-100 text-d16 bg-dgreyTransp2 hover:bg-black hover:opacity-70 hover:text-white w-full  duration-300 delay-100"
                  : "  -bottom-2.5 inset-x-0  opacity-0 text-d16 transition-all  duration-500 "
              } " "`}
              // onMouseEnter={() => isHovered1(true)}
            >
              {" "}
              <HiOutlineShoppingBag />{" "}
              <span className="ml-1 whitespace-nowrap uppercase font-mono">
                add to Basket
              </span>
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col md:mt-2 text-d17 font-mono px-4">
        <span
          className={`text-left font-normal h-14 capitalize ${
            window.innerWidth > 650 ? "text-d15" : "text-d14"
          } `}
          dangerouslySetInnerHTML={{
            __html: props.item.name
          }}
        ></span>
        {window.innerWidth > 650 ? (
          <div className="flex flex-row">
            <span className="flex flex-col text-left   w-1/2">
              <span className="w-full">{props.item.price}</span>
              <span className="w-full text-bold ">{props.item.special}</span>
            </span>

            <button className="border px-1 flex-auto text-dblue1 border-dblue1 text-d13 w-1/2">
              <span className="">{props.item.saving}% Discount in Cart</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-row text-d14 pt-5">
            <span className="flex flex-col text-left w-1/2 ">
              <span className="w-full text-dgrey12 -mt-2 mb-2 ">{props.item.price}</span>
              <span className="w-full font-bold text-d18 -mb-2 text-dblue2">{props.item.special}</span>
            </span>

       
         
              <span className=" text-dblue1 flex  text-d11  w-1/2  border border-dblue1">{props.item.saving}% Discount in Cart</span>
          </div>
        )}
      </div>
    </Link>
  );
}
