import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import buildLink, { path } from "../urls";

export default function SingleProduct(props) {
  const [hovered, isHovered] = useState(false);
  const [hovered1, isHovered1] = useState(false);

  function onMouseLeave() {
    isHovered(false);
    isHovered1(false);
  }

  return (
    <Link 
    to={`${path}/${props.item.name.replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
    .replace(/\s+/g, "-")
    .replace("..", "")
    .replace("/", "-")
    .replace("---", "-")
    .replace("--", "-")
    .replace("/", "")}/p=${props.item.product_id}`}
      className="relative w-full m-3"
      onMouseEnter={() => isHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <img
        className="w-full p-3"
        src={props.item.thumb}
        alt={props.item.name}
      />
  
{window.innerWidth > 650 &&

<> <button
        className={`place-content-center py-3  text-dblue1 bottom-0 ${
          hovered && !hovered1
            ? "flex -translate-y-24 absolute inset-x-0 h-16 opacity-70 text-d25 bg-dgreyTransp2 w-full ease-in duration-300 visible delay-100"
            : "flex absolute -translate-y-16  invisible text-d25"
        } " "`}
        onMouseEnter={() => isHovered1(true)}
      >
        {" "}
        <HiOutlineShoppingBag className="mt-1" />{" "}
        <span className="ml-1 ">add to Basket</span>
      </button>
      {hovered1 && (
        <button
          className="place-content-center flex absolute -translate-y-24 inset-x-0 bottom-0 opacity-70 text-d25 h-16 bg-black  w-full  text-white py-3 delay-500"
          onMouseEnter={() => isHovered1(true)}
          onMouseLeave={() => isHovered1(false)}
        >
          {" "}
          <HiOutlineShoppingBag className="mt-1" />{" "}
          <span className="ml-1 ">add to Basket</span>
        </button>
      )}</>

}
     
      <div className="flex flex-col md:mt-12 text-dh3">
        <span
          className={`text-left font-normal h-14 capitalize ${ window.innerWidth > 650 ?  'text-dh3' :  'text-d14'  } `}
          dangerouslySetInnerHTML={{
            __html: props.item.name
          }}
        ></span>
        {window.innerWidth > 650 ? 
        <div className="flex flex-row">
          <span  className="text-left  pt-3 flex-auto text-dh3">   {props.item.special !=="0" ? props.item.special : props.item.price}</span>
          <span  ></span>

          <button className="border-gray-200 border-2 p-3 flex-auto text-dh3 ">in the basket <span className="font-bold">{props.item.price}</span></button>
        </div>
        :   
        <div className="flex flex-col text-d14 ">
        <span  className="text-left  pt-3 flex-auto ">   {props.item.special !=="0" ? props.item.special : props.item.price}</span>
     

        <button className="flex border border-black p-1  flex-auto text-d14 "><span className="w-1/2">in the basket</span> <span className="font-bold ml-2 text-center pt-3 w-1/2">{props.item.price}</span></button>
        <button
        className={`py-3  text-dblue1 bottom-0  flex p-1 text-d16 bg-dgrey1   w-full  "`}

      >
        {" "}
        <HiOutlineShoppingBag className="mt-1" />{" "}
        <span className="ml-1 ">add to Basket</span>
      </button>
      </div>


}
      </div>
    </Link>
  );
}
