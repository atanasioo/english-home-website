import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import buildLink, { path } from "../urls";
import { CartContext } from "../contexts/CartContext";
import _axios from "../axios";
import TopCart from "./TopCart";

export default function SingleProduct(props) {
  const [hovered, isHovered] = useState(false);
  const [hovered1, isHovered1] = useState(false);
  const [state, dispatch] = useContext(CartContext);
  const [hasOption, setHasOption] = useState(false);
  const [hasAddToCartError, setHasAddToCartError] = useState(false);
  const [AddToCartError, setAddToCartError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartmenu, setCartmenu] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [popupC, setPopupC] = useState(false);
  const [optionParent, setOptionParent] = useState("");
  const [activeOption, setActiveOption] = useState({});
  const [successAdded, setSuccessAdded] = useState(false);
  const width = window.innerWidth;
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function onMouseLeave() {
    isHovered(false);
    isHovered1(false);
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */

      if (cartmenu) {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            console.log(ref.current.contains(event.target));
            setTimeout(() => setCartmenu(false), 200);
            setTimeout(() => setOverlay(false), 200);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [ref, cartmenu]);
  }


  function addToCart(e, product_id) {
    e.preventDefault();
    setHasAddToCartError(false);
    setAddingToCart(true);
    let obj = {
      product_id,
      quantity,
    };
   
    // if (hasOption) {
    //   let o = {};
    //   const op = optionParent.toString();
    //   o[op] = activeOption["product_option_value_id"];
    //   obj["option"] = o;
    //   console.log(o);
    // }
    let error = "";
    _axios
      .post(buildLink("cart", undefined, window.innerWidth), obj)
      .then((response) => {
        const data = response.data;
        if (data.success !== true) {
          // There is an error
          setHasAddToCartError(true);
          // if (!hasOption) {
          //   error = data.errors;
          // } else {
          //   error = data.errors[0].errorMsg;
          // }
          navigate(
            `${path}/${props.item.name
              .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
              .replace(/\s+/g, "-")
              .replace("..", "")
              .replace("/", "-")
              .replace("---", "-")
              .replace("--", "-")
              .replace("/", "")}/p=${props.item.product_id}`
          );
          setAddToCartError(error);
          setAddingToCart(false);
        } else {
          console.log("hello");
          dispatch({
            type: "loading",
            payload: true,
          });
          _axios
            .get(buildLink("cart", undefined, window.innerWidth))
            .then((response) => {
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
            });
            

          setSuccessAdded(true);
          if (width > 650) {
           // setCartmenu(true);
           props.showCartmenu();
            setOverlay(true);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          } else {
            setPopupC(true);
          }

          setTimeout(() => {
            // setCountDown(false)
            setAddingToCart(false);
          }, 3000);
        }
      });
  }

  return (
    <>
      {/* {cartmenu && width > 650 && (
        <div>
          <div ref={wrapperRef}>
            <TopCart cartmenu={cartmenu} />
          </div>
        </div>
      )} */}

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
                onClick={(e) => addToCart(e, props.item.product_id)} 
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
                className={`py-3  text-dblue1 bottom-0  flex p-1 text-d12 bg-dgrey3 w-full"`}
                onClick={() => addToCart(props.item.product_id)}
              >
                {" "}
                {/* <HiOutlineShoppingBag className="mt-1" />{" "} */}
                <span className="ml-1 whitespace-nowrap uppercase">
                  add to Basket
                </span>
              </button>
            </div>
          )}
        </div>
      </Link>
    </>
  );
}
