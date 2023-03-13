import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import buildLink, { path } from "../urls";
import { CartContext } from "../contexts/CartContext";
import _axios from "../axios";

export default function SingleProducCategory(props) {
  const [hovered, isHovered] = useState(false);
  const [state, dispatch] = useContext(CartContext);
  const [hasAddToCartError, setHasAddToCartError] = useState(false);
  const [AddToCartError, setAddToCartError] = useState("")
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [popupC, setPopupC] = useState(false);
  const [successAdded, setSuccessAdded] = useState(false);
  const width = window.innerWidth;
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
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
              onClick={(e) => addToCart(e, props.item.product_id)}
              className={`place-content-center text-dblue1 -bottom-2.5 flex items-center absolute h-12 ${
                hovered
                  ? "  bottom-0.5  inset-x-0  opacity-100 text-d16 bg-dgreyTransp2 hover:bg-black hover:opacity-70 hover:text-white w-full  duration-300 delay-100"
                  : "  -bottom-2.5 inset-x-0  opacity-0 text-d16 transition-all  duration-500 "
              } " "`}
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
              <span className="w-full line-through">{props.item.price}</span>
              <span className="w-full text-bold ">{props.item.special}</span>
            </span>

            <button className="border px-1 flex-auto text-dblue1 border-dblue1 text-d13 w-1/2">
              <span className="">{props.item.saving}% Discount</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-row text-d14 pt-5">
            <span className="flex flex-col text-left w-1/2 ">
              <span className="w-full text-dgrey12 -mt-2 mb-2 line-through">{props.item.price}</span>
              <span className="w-full font-bold text-d18 -mb-2 text-dblue2">{props.item.special}</span>
            </span>

       
         
              <span className=" text-dblue1 flex  text-d11  w-1/2  border border-dblue1">{props.item.saving}% Discount</span>
          </div>
        )}
      </div>
    </Link>
  );
}
