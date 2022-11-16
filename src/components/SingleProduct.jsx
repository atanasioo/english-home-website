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
      to={`${path}/${props.item.name
        .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
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
      <div className="relative m-2.5">
        <img
          className="w-full "
          src={props.item.thumb}
          alt={props.item.name}
        />

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
              <HiOutlineShoppingBag  />{" "}
              <span className="ml-1 whitespace-nowrap uppercase font-mono">add to Basket</span>
            </button>
            {/* {hovered1 && (
              <button
                className="place-content-center flex absolute -translate-y-3 inset-x-0 bottom-0 opacity-70 text-d16 h-12 bg-black  w-full  text-white py-3 delay-500"
                onMouseEnter={() => isHovered1(true)}
                onMouseLeave={() => isHovered1(false)}
              >
                {" "}
                <HiOutlineShoppingBag className="mt-1" />{" "}
                <span className="ml-1 whitespace-nowrap uppercase font-mono">add to Basket</span>
              </button>
            )} */}
          </>
        )}
      </div>

      <div className="flex flex-col md:mt-12 text-d17 font-mono">
        <span
          className={`text-left font-normal h-12 capitalize max-h-12  ${
            window.innerWidth > 650 ? "text-d15" : "text-d14"
          } `}
          dangerouslySetInnerHTML={{
            __html: props.item.name,
          }}
        ></span>
        {window.innerWidth > 650 ? (
          <div className="flex flex-row">
            <span className="text-left  pt-3 flex-auto ">
              {" "}
              {props.item.special !== "0"
                ? props.item.special
                : props.item.price}
            </span>
            <span></span>

            <button className="border-gray-200 border-2 p-3 flex-auto  ">
              in the basket{" "}
              <span className="font-bold">{props.item.price}</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col text-d14 ">
            <span className="text-left  pt-1 flex-auto bg-gray-100 mt-1">
              {" "}
              {props.item.special !== "0"
                ? props.item.special
                : props.item.price}
            </span>

            <button className="flex border border-black p-1  flex-auto text-d14 ">
              <span className="w-1/2">in the basket</span>{" "}
              <span className="font-bold ml-2 text-center pt-3 w-1/2">
                {props.item.price}
              </span>
            </button>
            <button
              className={`py-3  text-dblue1 bottom-0  flex p-1 text-d12 bg-dgrey3   w-full  "`}
            >
              {" "}
              {/* <HiOutlineShoppingBag className="mt-1" />{" "} */}
              <span className="ml-1 whitespace-nowrap uppercase">add to Basket</span>
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}
