import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import buildLink, { path } from "../urls";
import { CartContext } from "../contexts/CartContext";
import _axios from "../axios";
import { AccountContext } from "../contexts/AccountContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import product_image from "../assets/images/singleProduct.png";
import ImageFilter from "react-image-filter/lib/ImageFilter";

export default function SingleProducCategory(props) {
  const [hovered, isHovered] = useState(false);
  const [state, dispatch] = useContext(CartContext);
  const [hasAddToCartError, setHasAddToCartError] = useState(false);
  const [AddToCartError, setAddToCartError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const [popupC, setPopupC] = useState(false);
  const [successAdded, setSuccessAdded] = useState(false);
  const width = window.innerWidth;
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  //   const [hovered1, isHovered1] = useState(false);
  const [accountContext] = useContext(AccountContext);

  function onMouseLeave() {
    isHovered(false);
    // isHovered1(false);
  }
  function ToSeoUrl(url) {
    // make the url lowercase
    var encodedUrl = url.toString().toLowerCase();

    // replace & with and
    encodedUrl = encodedUrl.split(/\&+/).join("-and-");

    // remove invalid characters
    encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");

    // remove duplicates
    encodedUrl = encodedUrl.split(/-+/).join("-");

    // trim leading & trailing characters
    encodedUrl = encodedUrl.trim("-");

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
        <div>
          {props.item.quantity === "0" && (
            <div
              className={
                window.innerWidth > 650
                  ? "absolute z-20 text-red-700 text-d18 font-mono font-semibold w-full text-center  bottom-0"
                  : "absolute z-20 text-red-700  w-full text-center  bottom-0 "
              }
            >
              Out Of Stock
            </div>
          )}
          {window.innerWidth < 650 ? (
            props.item.quantity === "0" ? (
              <ImageFilter
                image={props.item.thumb}
                filter={"duotone"} // see docs beneath
                colorOne={[96, 96, 96]}
                colorTwo={[255, 255, 255]}
              />
            ) : (
              <LazyLoadImage
                className="mr-1.5"
                style={{ height: "105px" }}
                src={props.item.thumb}
                alt={props.item.name}
                placeholderSrc={product_image}
              />
            )
          ) : props.item.quantity === "0" ? (
            <ImageFilter
              image={props.item.thumb}
              filter={"duotone"} // see docs beneath
              colorOne={[96, 96, 96]}
              colorTwo={[255, 255, 255]}
            />
          ) : (
            <LazyLoadImage
              style={{ height: "212px" }}
              src={props.item.thumb}
              alt={props.item.name}
              placeholderSrc={product_image}
            />
          )}
        </div>

        {window.innerWidth > 650 && props.item.quantity !== "0" && (
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

      <div className={`flex flex-col md:mt-2 text-d17 font-mono px-4 ${props.item.quantity === "0" && "opacity-50"} `}>
        <span
          className={`text-left font-normal h-14 capitalize ${
            window.innerWidth > 650 ? "text-d15" : "text-d14"
          } `}
          dangerouslySetInnerHTML={{
            __html: props.item.name,
          }}
        ></span>
        {window.innerWidth > 650 ? (
          <div className="flex flex-row">
            <span className="flex flex-col text-left   w-1/2">
              <span className="w-full line-through">{props.item.price}</span>
              <span className="w-full text-bold text-blue-600">{props.item.special}</span>
              {accountContext.admin && (
                <div className=" font-bold text-d14 -mb-2 w-full">
                  {" "}
                  {props.item.quantity}
                </div>
              )}
            </span>

            <button className="border px-1 flex-auto border-dred1 text-red-500 text-d13 w-1/2">
              <span className="">{props.item.saving}% Discount</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-row text-d14 pt-5">
            <span className="flex flex-col text-left w-1/2 ">
              <span className="w-full text-dgrey12 -mt-2 mb-2 line-through">
                {props.item.price}
              </span>
              <span className="w-full font-bold text-d18 -mb-2 text-blue-600">
                {props.item.special}
              </span>
              {accountContext.admin && (
                <span className=" font-bold text-d14 -mb-2  w-full ">
                  {" "}
                  {props.item.quantity}
                </span>
              )}
            </span>

            <span className=" border-dred1 text-red-500 flex  text-d11  w-1/2  border">
              {props.item.saving}% Discount
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
