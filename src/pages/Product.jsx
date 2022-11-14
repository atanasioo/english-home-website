import React, { useEffect, useState, useContext } from "react";
import _axios from "../axios";
import buildLink from "../urls";
import { useParams, Link, useLocation } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Slider from "react-slick";
import NewZoom from "../components/NewZoom";
import SingleProducts from "../components/SingleProduct";
import CustomArrows from "../components/CustomArrows";
import { CartContext } from "../contexts/CartContext";

function Product() {
  const [state, dispatch] = useContext(CartContext);
  const [productData, setProductData] = useState();
  const [images, setImages] = useState();
  const [infomenu, setInfomenu] = useState(true);
  const [returnmenu, setReturnmenu] = useState(false);
  const [deliverymenu, setDeliverymenu] = useState(false);
  const [paymentmenu, setPaymentmenu] = useState(false);
  const [storemenu, setStoremenu] = useState(false);
  const [returnPolicy, setReturnPolicy] = useState([]);
  const [activeImageOption, setImageActiveOption] = useState({});
  const [successAdded, setSuccessAdded] = useState(false);
  const [hasOption, setHasOption] = useState(false);
  const [hasAddToCartError, setHasAddToCartError] = useState(false);
  const [AddToCartError, setAddToCartError] = useState("");
  const [countDownPointer, setCountDonwPointer] = useState();
  const [addingToCart, setAddingToCart] = useState(false);
  const [optionParent, setOptionParent] = useState("");
  const [countDown, setCountDown] = useState();
  const [activeOption, setActiveOption] = useState({});
  const [activeImage, setActiveImage] = useState({});
  const width = window.innerWidth;
  const location = useLocation();
  let product_id = useParams().id;
  const [quantity, setQuantity] = useState(1);

  const productSetting = {
    speed: 200,
    slidesToShow: 4.5,
    slidesToScroll: 4.5,
    infinite: false,
    prevArrow: <CustomArrows direction={"l"} />,
    nextArrow: <CustomArrows direction={"r"} />,
  };

  const productMobile = {
    dots: false,
    speed: 200,
    slidesToShow: 2.5,
    swipeToSlide: true,
    infinite: false,
    arrows: false,
    lazyLoad: true,
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });

    _axios
      .get(buildLink("product", undefined, undefined) + product_id)
      .then((response) => {
        const data = response?.data?.data;
        setProductData(data);
        data?.images.unshift({
          popup: data.popup,
          thumb: data.thumb,
        });

        setImages(data?.images);
        setHasOption(data?.options?.length > 0);
        data.options.length > 0 &&
          setOptionParent(data.options[0]["product_option_id"]);
      });
  }, [location]);

  function incrementQuantity(quantity) {
    const newquantity = quantity + 1;
    setQuantity(newquantity);
  }
  function decrementQuantity(quantity) {
    if (quantity == 1) {
      setQuantity(1);
    } else {
      const newquantity = quantity - 1;
      setQuantity(newquantity);
    }
  }

  function addToCart(bundle) {
    setCountDonwPointer(true);

    setHasAddToCartError(false);
    setAddingToCart(true);
    let obj = {
      product_id,
      quantity,
    };
    if (hasOption) {
      let o = {};
      const op = optionParent.toString();
      o[op] = activeOption["product_option_value_id"];
      obj["option"] = o;
      console.log(o);
    }
    let error = "";
    _axios
      .post(
        buildLink("cart", undefined, window.innerWidth),
        bundle === undefined ? obj : bundle
      )
      .then((response) => {
        const data = response.data;
        if (data.success !== true) {
          // There is an error
          setHasAddToCartError(true);
          if (!hasOption) {
            error = data.errors;
          } else {
            error = data.errors[0].errorMsg;
          }
          setAddToCartError(error);
          setAddingToCart(false);
        } else {
          setCountDown(true);
          setCountDonwPointer(true);
          setTimeout(() => {
            setCountDonwPointer(false);
          }, 1000);
          setTimeout(() => {
            setCountDown(false);
          }, 3000);
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

          setTimeout(() => {
            // setCountDown(false)
            setAddingToCart(false);
          }, 3000);
        }
      });
  }

  function setOption(option) {
    const option_id = option["product_option_value_id"];

    var count = 0;
    var i = 0;
    while (i < images.length) {
      if (images[i]?.product_option_value_id > 0) {
        count++;
      }

      i++;
    }

    if (
      images[1]?.product_option_value_id > 0 ||
      productData?.options[0].option_value.length === count
    ) {
      for (const key in images) {
        if (Object.hasOwnProperty.call(images, key)) {
          const element = images[key];
          if (element["product_option_value_id"] === option_id) {
            setActiveOption(option);
            setImageActiveOption(option);
            setActiveImage({
              popup: element["popup"],
              thumb: element["thumb"],
            });
          }
        }
      }
    }
    setActiveOption(option);

    // setImageActiveOption(option);
  }

  function handleReturnPolicy() {
    _axios
      .get(
        buildLink("information", undefined, window.innerWidth) +
          "&information_id=10"
      )
      .then((response) => {
        const data = response.data.data;
        // console.log(data);
        setReturnPolicy(data);
      });
  }

  function unescapeHTML(str) {
    if (!str) {
      return;
    }
    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
      var match;

      if (entityCode in htmlEntities) {
        return htmlEntities[entityCode];
        /*eslint no-cond-assign: 0*/
      } else if ((match = entityCode.match(/^#x([\da-fA-F]+)$/))) {
        return String.fromCharCode(parseInt(match[1], 16));
        /*eslint no-cond-assign: 0*/
      } else if ((match = entityCode.match(/^#(\d+)$/))) {
        return String.fromCharCode(~~match[1]);
      } else {
        return entity;
      }
    });
  }

  var htmlEntities = {
    nbsp: " ",
    cent: "¢",
    pound: "£",
    yen: "¥",
    euro: "€",
    copy: "©",
    reg: "®",
    lt: "<",
    gt: ">",
    quot: '"',
    amp: "&",
    apos: "'",
  };

  return (
    <div className="bg-dgrey10">
      <div className="container py-5 ">
        <div className="text-d12 my-2.5 text-dgrey11 text-left flex items-center">
          <Link to={"/"}>{productData?.breadcrumbs?.text_home}</Link>
          <BsChevronRight className="mx-2 mt-0.5" />
          {productData?.breadcrumbs?.category.map((breadcrumb, index) => (
            <div className="flex items-center" key={breadcrumb.category_id}>
              <Link
                to={`/category/${breadcrumb.category_id}`}
                className={` ${
                  index == productData?.breadcrumbs?.category.length - 1
                    ? "text-dblack2 font-semibold"
                    : ""
                }`}
              >
                {breadcrumb.name}
              </Link>
              <BsChevronRight
                className={`mx-2 mt-0.5 ${
                  index == productData?.breadcrumbs?.category.length - 1
                    ? "hidden"
                    : "block"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mr-4 relative" style={{ width: "57%" }}>
            {images?.length > 0 && (
              <NewZoom
                // activeOption={activeImageOption.product_option_value_id}
                images={images}
                index={"zzzzz"}
              />
            )}
          </div>

          <div className="w-5/12 p-1 ">
            <div className="wrapper">
              <div className="flex my-3">
                <div
                  className="font-mono md:font-mono font-semibold text-left	text-dborderblack2 text-d20 w-8/12"
                  dangerouslySetInnerHTML={{
                    __html: productData?.heading_title,
                  }}
                ></div>
                <div className="align-right w-8 mt-1 text-d25  ml-6 	text-dborderblack2 font-black	">
                  <FiShare />
                </div>
                <div className="align-right w-12 mt-1 text-d25 ml-2 	text-dborderblack2">
                  <AiOutlineHeart />
                </div>
              </div>
              <div className="flex my-3">
                <div className="rounded-full bg-dborderblack2 text-white w-16 h-16 text-d11 align-middle pt-4">
                  DiSCOUNT IN CART
                </div>

                <div className="pl-5 flex-nowrap text-d20  text-left align-middle my-1">
                  <div className="font-light"> {productData?.price}</div>
                  <div className="font-bold text-d25 leading-5">
                    {" "}
                    {productData?.special}
                  </div>
                </div>
              </div>

              {productData?.options && productData?.options?.length > 0 && (
                <div className="my-4">
                  <div className="text-left my-2">
                    {productData?.["options"]["0"]?.name} :
                  </div>
                  <div className="flex flex-wrap w-full">
                    {productData["options"]["0"]["option_value"]?.map(
                      (option) => (
                        <div className="mr-3" key={option.image}>
                          {/* <p className="text-xs text-center">
                                {option["name"]}
                              </p> */}
                          <div
                            key={option.image}
                            className={`p-1  mr-2 my-2 cursor-pointer w-10 md:w-14 md:h-10 relative `}
                            onClick={() => {
                              setOption(option);
                            }}
                          >
                            {option.quantity === "0" && (
                              <div className=" bg-dgrey bg-opacity-50 w-full h-full absolute top-0 left-0 flex items-center justify-center cursor-not-allowed">
                                <div className=" text-dblack text-4xl font-bold">
                                  X
                                </div>
                              </div>
                            )}
                            <img
                              src={option["image"]}
                              className={`border  w-14 h-10 mr-4 text-center 
                              ${
                                option.product_option_value_id ===
                                activeOption.product_option_value_id
                                  ? "border-2 border-dblack2"
                                  : ""
                              }
                              `}
                              alt={option?.name}
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              <div className="flex  my-3">
                <div className="w-3/12 flex flex-wrap align-middle text-center pt-3 text-d22 font-bold text-dborderblack2 pr-3 items-center">
                  <button onClick={() => decrementQuantity(quantity)}>
                    <span className="w-3/12">-</span>
                  </button>
                  <span className="w-6/12 text-center ">{quantity}</span>
                  <button onClick={() => incrementQuantity(quantity)}>
                    <span className="w-3/12">+</span>
                  </button>
                </div>
                <button
                  className="bg-dborderblack2 font-black	 text-white  py-4 w-8/12 text-d16"
                  onClick={() =>
                    productData["quantity"] === "0"
                      ? console.log("yep no")
                      : addToCart()
                  }
                >
                  <span>
                    {productData?.quantity === "0" ? (
                      "Out Of Stock"
                    ) : (
                      <div>
                        <p
                          className={`absolute  transition duration-100 ease-in left-5 md:left-14 top-3 text-white ${
                            successAdded && countDown && !countDownPointer
                              ? "translate-x-0 "
                              : "translate-x-full invisible"
                          } `}
                        >
                          <span className="bg-white  px-2 rounded-full text-dblue">
                            1
                          </span>{" "}
                          item Added to the Cart
                        </p>
                        <span className="">ADD TO BASKET </span>
                      </div>
                    )}
                  </span>{" "}
                </button>
              </div>
              {hasAddToCartError && (
                <div className=" bg-dred4 text-white text-center h-11 rounded bg-opacity-80 capitalize relative flex items-center justify-center mr-10">
                  <span className="px-8">{AddToCartError}</span>
                  <span
                    onClick={() => setHasAddToCartError(false)}
                    className=" rounded absolute top-0 right-0 cursor-pointer w-11 h-11 flex items-center justify-center hover:bg-white hover:text-dred4 border border-dred4 border-l-0"
                  >
                    <span className="text-xl">X</span>
                  </span>
                </div>
              )}
              <div className="flex justify-end items-start">
                <div className="">
                  <p className="w-full px-1 text-d12 text-dborderblack2 text-right">
                    At the latest on Friday, November 18, Cargo
                  </p>
                </div>
                <img
                  src="https://akn-eh.b-cdn.net/static_omnishop/eh591/assets/img/saat_icon.png"
                  alt="clock-icon"
                />
              </div>
              <div className="w-full flex my-3">
                <div className="text-dborderblack2 w-1/4 mr-1 p-3.5 text-d12 flex flex-col justify-center text-center font-bold items-center">
                  <img
                    src="https://akn-eh.b-cdn.net/cms/2021/02/08/08907807-82d0-41ca-b167-40f5f3a794ae.png"
                    alt=""
                    width={27}
                    height={27}
                  />
                  <p>150 TL and Over Free Shipping</p>
                </div>
                <div className="text-dborderblack2 w-1/4 mr-1 p-3.5 text-d12 flex flex-col justify-center text-center font-bold items-center">
                  <img
                    src="https://akn-eh.b-cdn.net/cms/2021/02/08/da3fd01a-66e9-450b-a09c-b9201ee4bd7c.png"
                    alt=""
                    width={27}
                    height={27}
                  />
                  <p>Shipping in 6 Days</p>
                </div>
                <div className="text-dborderblack2 w-1/4 mr-1 p-3.5 text-d12 flex flex-col justify-center text-center font-bold items-center">
                  <img
                    src="https://akn-eh.b-cdn.net/cms/2021/02/08/4ca462a2-a7e6-4cdb-b855-3648443b360c.png"
                    alt=""
                    width={27}
                    height={27}
                  />
                  <p>30 Days Return Guarantee</p>
                </div>
                <div className="text-dborderblack2 w-1/4 mr-1 p-3.5 text-d12 flex flex-col justify-center text-center font-bold items-center">
                  <img
                    src="https://akn-eh.b-cdn.net/cms/2021/02/08/3fe79e3b-6c64-4a39-85c7-f6321596a7b5.png"
                    alt=""
                    width={27}
                    height={27}
                  />
                  <p>Store Returns</p>
                </div>
              </div>
              <div className="flex justify-around mt-2.5">
                <Link className="text-d12 border border-dgrey2 p-3 w-1/2 mr-1 text-center flex items-center">
                  <p>All </p>{" "}
                  <span className="font-bold"> Decorative Cushion </span>{" "}
                  <p className="flex items-center">
                    {" "}
                    Products <BsChevronRight />
                  </p>
                </Link>
                <Link className="text-d12 border border-dgrey2 p-3 w-1/2 mr-1 text-center flex items-center">
                  <p>All </p> <span className="font-bold"> Rabbit Grid </span>{" "}
                  <p className="flex items-center">
                    {" "}
                    Products <BsChevronRight />
                  </p>
                </Link>
              </div>
              <div className="add-to-basket-wrapper flex-xs w-full h-14 fixed z-30 bottom-0 bg-dwhite1 hidden"></div>
              <div className="error js-error-price-down text-d13 text-left mt-2.5 text-dred4"></div>
              <div className="desktop-product-infos md:hidden"></div>
            </div>
            <div className="hidden "></div>
            <div className="product-share-popup hidden fixed bottom-0 left-0 z-40 w-screen"></div>
          </div>
        </div>
        <div className="product-info-mobile md:hidden"></div>
        <div>
          <div className="product-info-wrapper hidden md:block w-full mt-7">
            <div className="">
              <ul className="w-full flex justify-center">
                <li
                  className={`border border-dgrey5 flex justify-center items-center text-d14 text-dborderblack2 text-center p-5  cursor-pointer
                 ${
                   infomenu
                     ? "border-r-0 border-b-0 pr-5 bg-dwhite1 -translate-y-1"
                     : ""
                 }
                `}
                  onClick={() => {
                    setInfomenu(true);
                    setReturnmenu(false);
                    setDeliverymenu(false);
                    setPaymentmenu(false);
                    setStoremenu(false);
                  }}
                >
                  PRODUCT INFORMATION
                </li>
                <li
                  className={`border border-dgrey5 flex justify-center items-center text-d14 text-dborderblack2 text-center p-5  cursor-pointer
                 ${
                   returnmenu
                     ? "border-r-0 border-b-0 pr-5 bg-dwhite1 -translate-y-1"
                     : ""
                 }
                `}
                  onClick={() => {
                    handleReturnPolicy();
                    setReturnmenu(true);
                    setInfomenu(false);
                    setDeliverymenu(false);
                    setPaymentmenu(false);
                    setStoremenu(false);
                  }}
                >
                  RETURN AND EXCHANGE CONDITIONS
                </li>
                <li
                  className={`border border-dgrey5 flex justify-center items-center text-d14 text-dborderblack2 text-center p-5  cursor-pointer
                 ${
                   deliverymenu
                     ? "border-r-0 border-b-0 pr-5 bg-dwhite1 -translate-y-1"
                     : ""
                 }
                `}
                  onClick={() => {
                    setInfomenu(false);
                    setReturnmenu(false);
                    setDeliverymenu(true);
                    setPaymentmenu(false);
                    setStoremenu(false);
                  }}
                >
                  DELIVERY
                </li>
                <li
                  className={`border border-dgrey5 flex justify-center items-center text-d14 text-dborderblack2 text-center p-5  cursor-pointer flex-1
                 ${
                   paymentmenu
                     ? "border-r-0 border-b-0 pr-5 bg-dwhite1 -translate-y-1"
                     : ""
                 }
                `}
                  onClick={() => {
                    setInfomenu(false);
                    setReturnmenu(false);
                    setDeliverymenu(false);
                    setPaymentmenu(true);
                    setStoremenu(false);
                  }}
                >
                  PAYMENT OPTIONS
                </li>
                <li
                  className={`border border-dgrey5 flex justify-center items-center text-d14 text-dborderblack2 text-center p-5  cursor-pointer
                 ${
                   storemenu
                     ? "border-r-0 border-b-0 pr-5 bg-dwhite1 -translate-y-1"
                     : ""
                 }
                `}
                  onClick={() => {
                    setInfomenu(false);
                    setReturnmenu(false);
                    setDeliverymenu(false);
                    setPaymentmenu(false);
                    setStoremenu(true);
                  }}
                >
                  IN WHICH STORE IS IT AVAILABLE?
                </li>
              </ul>
            </div>
            <div className="w-full p-6 border border-dgrey5 border-t-0 -mb-1">
              <div
                className={`text-dborderblack4 ${
                  infomenu ? "block" : "hidden"
                }`}
              >
                <div className="-mx-1 flex flex-col-reverse md:flex-row">
                  <div className="w-1/2">
                    <div className="product-information-conten text-left">
                      <div className="content-titles text-d22 font-bold mb-5">
                        DESCRIPTIONS
                      </div>
                      <ul>
                        <li className="text-d14 mb-6">
                          <span className="text-d16 font-bold mb-2.5">
                            Usage
                          </span>
                          <p>Hand washing with warm water is recommended.</p>
                        </li>
                        <li className="text-d14 mb-6">
                          <span className="text-d16 font-bold mb-2.5">
                            Care
                          </span>
                          <ul className="flex flex-wrap">
                            <li className="flex items-center w-1/2 mb-5 text-d14 capitalize">
                              No Ironing
                            </li>
                            <li className="flex items-center w-1/2 mb-5 text-d14 capitalize">
                              No Dry Cleaning
                            </li>
                            <li className="flex items-center w-1/2 mb-5 text-d14 capitalize">
                              Hand washable
                            </li>
                            <li className="flex items-center w-1/2 mb-5 text-d14 capitalize">
                              Not machine washable
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-1/2 text-left">
                    <div>
                      <div className="text-d22 font-bold mb-5">FEATURES</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productData?.description,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`text-dborderblack4 text-left ${
                  returnmenu ? "block" : "hidden"
                }`}
              >
                <div className="flex">
                  <div
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: unescapeHTML(returnPolicy?.description),
                    }}
                  ></div>
                  {/* <div className="w-1/2"></div> */}
                </div>
              </div>
              <div
                className={`text-dborderblack4 text-left ${
                  deliverymenu ? "block" : "hidden"
                }`}
              >
                <div className="delivery-info">
                  <div>
                    <p className="mb-5">
                      Your orders will be delivered to cargo in 6 working days.
                    </p>
                    <p className="mb-5">
                      After your products are delivered to our cargo company,
                      they are delivered to you within an average of 2 business
                      days for Istanbul and 4 business days for outside
                      Istanbul.
                    </p>
                    <p className="mb-5">
                      The cargo company delivers your order to your address
                      during working hours.
                      <br />
                      When your product is delivered to the cargo, information
                      is sent to you via SMS.
                      <br />
                      You can instantly track the status of your order by
                      clicking the "Order Detail" field in the "My Orders"
                      section on the "My Account" page
                      <Link>Click</Link>
                      <br />
                      for detailed information about delivery and product supply
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`text-dborderblack4 text-left ${
                  paymentmenu ? "block" : "hidden"
                }`}
              >
                <div></div>
                <div className="">
                  <div className="pr-3.5 inline-block">
                    <img
                      src="https://akn-eh.b-cdn.net/card_types/2019/01/08/3d816947-a81b-45eb-af7b-9029650a583d.jpg"
                      alt=""
                      height={62}
                      width={62}
                    />
                  </div>
                  <div className="pr-3.5 inline-block">
                    <img
                      src="https://akn-eh.b-cdn.net/card_types/2019/01/08/3d816947-a81b-45eb-af7b-9029650a583d.jpg"
                      alt=""
                      height={62}
                      width={62}
                    />
                  </div>
                  <div className="pr-3.5 inline-block">
                    <img
                      src="https://akn-eh.b-cdn.net/card_types/2019/01/08/3d816947-a81b-45eb-af7b-9029650a583d.jpg"
                      alt=""
                      height={62}
                      width={62}
                    />
                  </div>
                  <div className="pr-3.5 inline-block">
                    <img
                      src="https://akn-eh.b-cdn.net/card_types/2019/01/08/3d816947-a81b-45eb-af7b-9029650a583d.jpg"
                      alt=""
                      height={62}
                      width={62}
                    />
                  </div>
                  <div className="pr-3.5 inline-block">
                    <img
                      src="https://akn-eh.b-cdn.net/card_types/2019/01/08/3d816947-a81b-45eb-af7b-9029650a583d.jpg"
                      alt=""
                      height={62}
                      width={62}
                    />
                  </div>
                  <div className="pr-3.5 inline-block">
                    <img
                      src="https://akn-eh.b-cdn.net/card_types/2019/01/08/3d816947-a81b-45eb-af7b-9029650a583d.jpg"
                      alt=""
                      height={62}
                      width={62}
                    />
                  </div>
                  <div className="hidden"></div>
                  <div className="hidden"></div>
                  <div className="hidden"></div>
                  <div className="" style={{ minHeight: "220px" }}>
                    <table className="w-8/12 text-dblack1 font-mono text-d20">
                      <tbody>
                        <tr>
                          <th className="text-left py-2">Installment</th>
                          <th className="text-left py-2">Monthly Amount</th>
                          <th className="text-left py-2">Total amount</th>
                        </tr>
                        <tr className="text-dblue1 text-semibold">
                          <td className="py-1">in advance</td>
                          <td className="py-1">99.99</td>
                          <td className="py-1">99.99</td>
                        </tr>
                        <tr>
                          <td className="py-1">2 Installments</td>
                          <td className="py-1">2 x 55.00</td>
                          <td className="py-1"> 109.99</td>
                        </tr>
                        <tr>
                          <td className="py-1">2 Installments</td>
                          <td className="py-1">2 x 55.00</td>
                          <td className="py-1"> 109.99</td>
                        </tr>
                        <tr>
                          <td className="py-1">2 Installments</td>
                          <td className="py-1">2 x 55.00</td>
                          <td className="py-1"> 109.99</td>
                        </tr>
                        <tr>
                          <td className="py-1">2 Installments</td>
                          <td className="py-1">2 x 55.00</td>
                          <td className="py-1"> 109.99</td>
                        </tr>
                        <tr>
                          <td className="py-1">2 Installments</td>
                          <td className="py-1">2 x 55.00</td>
                          <td className="py-1"> 109.99</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="hidden"></div>
                  <div className="hidden"></div>
                </div>
              </div>
              <div
                className={`text-dborderblack4 ${
                  storemenu ? "block" : "hidden"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Related Product */}
        {productData?.product_related &&
          productData?.product_related.length > 0 && (
            <div
              className={`mb-2 mt-4  ${
                width > 1920 && "mt-10"
              } md:mb-8 container`}
            >
              <h2 className="font-semibold text-xl  text-dblack2 mb-1 md:mb-4 text-left">
                Related products
              </h2>
              {width < 650 ? (
                <Slider {...productMobile}>
                  {productData?.product_related?.map((item, index) => {
                    return (
                      <div className="pr-2" key={item.product_id}>
                        <SingleProducts item={item} />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <Slider {...productSetting}>
                  {productData?.product_related?.map((item) => (
                    <div className="pr-2" key={item.product_id}>
                      <SingleProducts item={item} />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          )}
        {/*End  Related Product */}

        {/* recenty viewed */}

        <div>
          {productData?.product_recentlyViewed &&
            productData?.product_recentlyViewed?.length > 0 && (
              <div className="my-1 md:my-8 container">
                <h2 className="font-semibold text-xl py-2 text-dblack mb-1 md:mb-4">
                  Recently Viewed
                </h2>
                {width < 650 ? (
                  <Slider {...productMobile}>
                    {productData?.product_recentlyViewed?.map((item) => {
                      return (
                        <div className="pr-2" key={item.product_id}>
                          <SingleProducts item={item} />
                        </div>
                      );
                    })}
                  </Slider>
                ) : (
                  <Slider {...productSetting}>
                    {productData?.product_recentlyViewed?.map((item) => {
                      return (
                        <div className="pr-2" key={item.product_id}>
                          <SingleProducts item={item} />
                        </div>
                      );
                    })}
                  </Slider>
                )}
              </div>
            )}
        </div>
        {/* end recenty viewed */}
      </div>
    </div>
  );
}

export default Product;
