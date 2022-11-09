import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
export default function SingleProduct(props) {
  const [hovered, isHovered] = useState(false);
  const [hovered1, isHovered1] = useState(false);

  function onMouseLeave() {
    isHovered(false);
    isHovered1(false);
  }

  return (
    <div
      className="relative w-full m-1"
      onMouseEnter={() => isHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <img
        className="w-full p-3"
        src={props.item.thumb}
        alt={props.item.name}
      />
      <button
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
      )}
      <div className="flex flex-col mt-12 text-dh3">
        <span
          className="text-left"
          dangerouslySetInnerHTML={{
            __html: props.item.name
          }}
        ></span>

        <div className="flex flex-row">
          <span  className="text-left  pt-3 flex-auto text-dh3">   {props.item.special !=="0" ? props.item.special : props.item.price}</span>
          <span  ></span>

          <button className="border-gray-200 border-2 p-3 flex-auto text-dh3 ">in the basket <span className="font-bold">{props.item.price}</span></button>
        </div>
      </div>
    </div>
  );
}
