import React, { useEffect, useState, useContext, useRef } from "react";
import _axios from "../axios";
import buildLink, { pixelID } from "../urls";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineMail } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import Slider from "react-slick";
import NewZoom from "../components/NewZoom";
import SingleProducts from "../components/SingleProduct";
import CustomArrows from "../components/CustomArrows";
import { CartContext } from "../contexts/CartContext";
import { AccountContext } from "../contexts/AccountContext";
import { WishlistContext } from "../contexts/WishlistContext";
import TopCart from "../components/TopCart";
import Overlay from "../components/Overlay";
import { path } from "../urls";
import { FaWhatsappSquare, FaTwitterSquare, FaWhatsapp } from "react-icons/fa";
import ReactPixel from "react-facebook-pixel";
import { ImFacebook2 } from "react-icons/im";
import product_image from "../assets/images/product.png";
import Timer from "../components/Timer";

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import Cookies from "js-cookie";
import CartmenuMobile from "../components/CartmenuMobile";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductNewZoom from "../components/ProductNewZoom";

function Product() {
  const [state, dispatch] = useContext(CartContext);
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [stateW, dispatchW] = useContext(WishlistContext);
  const [productData, setProductData] = useState();
  const [images, setImages] = useState();
  const [infomenu, setInfomenu] = useState(true);
  const [returnmenu, setReturnmenu] = useState(false);
  const [returnmenuMob, setReturnmenuMob] = useState(false);
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
  const [cartmenu, setCartmenu] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [fulloverlay, setFulloverlay] = useState(false);
  const [share, setShare] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [popupW, setPopupW] = useState(false);
  const [popupC, setPopupC] = useState(false);
  const [showCartmenu, setShowCartmenu] = useState(false);
  const [showCartmenuMob, setShowCartmenuMob] = useState(false);
  const [hoveredCart, setHoveredCart] = useState(false);
  const [viewSeriesVal, setViewSeriesVal] = useState();
  const [seriesOpSelected, setSeriesOpSelected] = useState();
  const [productZoomModal, setProductZoomModal] = useState(false);

  const width = window.innerWidth;
  const location = useLocation();
  let product_id = useParams().id;
  const navigate = useNavigate();
  // const [quantity, setQuantity] = useState(1);
  const wrapperRef = useRef(null);
  const quantityRef = useRef();

  useOutsideAlerter(wrapperRef);

  const productSetting = {
    speed: 200,
    slidesToShow: 4.5,
    slidesToScroll: 4.5,
    infinite: false,
    prevArrow: <CustomArrows direction={"l"} />,
    nextArrow: <CustomArrows direction={"r"} />
  };

  const productMobile = {
    dots: false,
    speed: 200,
    slidesToShow: 2.5,
    swipeToSlide: true,
    infinite: false,
    arrows: false,
    lazyLoad: true
  };
  const moreSettings = {
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    prevArrow: <CustomArrows direction={"l"} />,
    nextArrow: <CustomArrows direction={"r"} />
  };

  function handleHoveredSeries(key, name) {
    const seriesOp_name = document.getElementById(key);
    setViewSeriesVal(key);
    seriesOp_name.textContent = name;
  }
  function handleLeavedSeries(key) {
    const seriesOp_name = document.getElementById(key);
    setViewSeriesVal("");
    seriesOp_name.textContent = "";
  }

  console.log(location);

  useEffect(() => {
    // setQuantity(1)
    quantityRef.current.value = 1;
    window.scrollTo(
      {
        top: 0
        // behavior: "smooth",
      },
      []
    );
    _axios
      .get(buildLink("product", undefined, undefined) + product_id?.replace("p=","") +`&source_id=1${stateAccount.admin ? "&employer=true" : ""}`) 
      .then((response) => {
        const data = response?.data?.data;
        setProductData(data);
        const includesImage = data?.images.some((image) => {
          return image.popup === data.popup && image.thumb === data.thumb;
        });
        console.log(includesImage);
        if (!includesImage) {
          data?.images.unshift({
            popup: data.popup,
            thumb: data.thumb
          });
        }

        setImages(data?.images);
        setHasOption(data?.options?.length > 0);
        data.options.length > 0 &&
          setOptionParent(data.options[0]["product_option_id"]);
        // // ---> Facebook PIXEL <---
        if (!stateAccount.admin) {
          const advancedMatching = {
            em: data?.social_data?.email,
            fn: data?.social_data?.firstname,
            ln: data?.social_data?.lastname,
            external_id: data?.social_data?.external_id,
            country: data?.social_data?.country_code,
            fbp: Cookies.get("_fbp")
          };
          ReactPixel.init(pixelID, advancedMatching, {
            debug: true,
            autoConfig: false
          });
          ReactPixel.pageView();
          ReactPixel.fbq("track", "PageView");

          // ReactPixel.track("ViewContent", {
          //   content_type: "product",
          //   content_ids: [product_id],
          //   content_name: data?.data?.social_data?.name,
          //   value: data?.data?.social_data?.value,
          // //  event_id: data?.data?.social_data?.event_id,
          //   currency: data?.data?.social_data?.currency,
          //   // country: data?.data?.social_data?.country_code,

          // }, {eventID: data?.data?.social_data?.event_id} );

          window.fbq('track', 'ViewContent', {
            content_type: "product",
            content_ids: [product_id],
            content_name: data?.social_data?.name,
            value: data?.social_data?.value,
            currency: data?.social_data?.currency,
           
          }, {eventID:  data?.social_data?.event_id});

          var dataSocial = data.social_data;
          dataSocial["fbp"] = Cookies.get("_fbp");
          dataSocial["fbc"] = Cookies.get("_fbc");
          dataSocial["ttp"] = Cookies.get("_ttp");
          dataSocial["link"] = window.location.href;

          _axios
          .post(buildLink("pixel", undefined, window.innerWidth), dataSocial)
          .then((response) => {
            const data = response.data;
            if (data.success === true) {
            }
          });

          
          
        }
      });
  }, [location, stateAccount.admin]);

  function incrementQuantity(quantity) {
    // const newquantity = quantity + 1;
    if(parseInt(quantityRef.current.value) < parseInt(productData.quantity)){
      quantityRef.current.value = parseInt(quantityRef.current.value) + 1;
    }
    // setQuantity(newquantity);
  }
  function decrementQuantity(quantity) {
    if (quantityRef.current.value <= 1) {
      quantityRef.current.value = 1;
    } else {
      quantityRef.current.value = parseInt(quantityRef.current.value) - 1;

      // setQuantity(newquantity);
    }
  }

  function handleQuantity(e){
    console.log(quantityRef.current.value);
    if(parseInt(quantityRef.current.value) > parseInt(productData.quantity)){
      quantityRef.current.value = parseInt(productData.quantity)
    }
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */

      if (cartmenu) {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
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

  function addToCart(bundle) {
    setCountDonwPointer(true);

    setHasAddToCartError(false);
    setAddingToCart(true);
    const quantity = quantityRef?.current?.value;
    let obj = {
      product_id,
      quantity
    };
    if (hasOption) {
      let o = {};
      const op = optionParent.toString();
      o[op] = activeOption["product_option_value_id"];
      obj["option"] = o;
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
            payload: true
          });
          _axios
            .get(buildLink("cart", undefined, window.innerWidth))
            .then((response) => {
              dispatch({
                type: "setProducts",
                payload: response.data.data.products
              });

              dispatch({
                type: "setProductsCount",
                payload: response.data.data.total_product_count
              });
              dispatch({
                type: "setTotals",
                payload: response.data.data.totals
              });
              dispatch({
                type: "loading",
                payload: false
              });
            });
          // ---> Facebook PIXEL <---
          const advancedMatching = {
            em: data?.data?.social_data?.email,
            fn: data?.data?.social_data?.firstname,
            ln: data?.data?.social_data?.lastname,
            external_id: data?.data?.social_data?.external_id,
            country: data?.data?.social_data?.country_code,
            fbp: Cookies.get("_fbp")
          };
          ReactPixel.init(pixelID, advancedMatching, {
            debug: true,
            autoConfig: false
          });
          ReactPixel.pageView();
          ReactPixel.fbq("track", "PageView");

          window.fbq(
            "track",
            "AddToCart",
            {
              content_type: "product",
              content_ids: data?.data.social_data?.content_ids,
              content_name: data?.data.social_data?.name,
              value: data?.data.social_data?.value,
              content_category: productData?.product_categories[0]?.name,
              currency: data?.data.social_data?.currency,
              fbp: Cookies.get("_fbp"),
       
            },
            { eventID: data?.event_id }
          );

          var dataSocial = productData.social_data;
          dataSocial["link"] = window.location.href;
          dataSocial["fbp"] = Cookies.get("_fbp");
          dataSocial["fbc"] = Cookies.get("_fbc");
          dataSocial["ttp"] = Cookies.get("_ttp");

          _axios
            .post(buildLink("pixel", undefined, window.innerWidth), dataSocial)
            .then((response) => {
              const data = response.data;
              if (data.success === true) {
              }
            });

          // }
          setSuccessAdded(true);
          if (width > 650) {
            setCartmenu(true);
            setOverlay(true);
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

  function showCart() {
    if (width > 650) {
      setCartmenu(true);
      setOverlay(true);
      setTimeout(() => {
        setCartmenu(false);
        setOverlay(false);
      }, 3000);
    } else {
      setShowCartmenuMob(true);
      setOverlay(true);
    }
  }

  function closeCartMobMenu() {
    setShowCartmenuMob(false);
    setOverlay(false);
  }

  useEffect(() => {
    handleWishlist(0);
  }, [product_id]);

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
              thumb: element["thumb"]
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
        setReturnPolicy(data);
      });
  }

  function togglereturnmenuMob() {
    setReturnmenuMob(!returnmenuMob);
  }

  function hideFixedCartMenu(bool) {
    setProductZoomModal(bool);
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

  function handleWishlist(counter) {
    if (counter < 1) {
      if (stateW.pIds.indexOf(product_id) > -1) {
        setIsWishlist(true);
        counter++;
      } else {
        setIsWishlist(false);
      }
    } else {
    }
  }

  function addToWishlist() {
    if (!stateAccount.loged) {
      navigate("/login");
    } else {
      if (stateW.pIds.indexOf(product_id) > -1) {
        _axios
          .delete(
            buildLink("wishlist", undefined, window.innerWidth) +
              "&id=" +
              product_id
          )
          .then(() => {
            _axios
              .get(buildLink("wishlistCount", undefined, window.innerWidth))
              .then((response) => {
                if (response.data.success) {
                  dispatchW({
                    type: "setProductsCount",
                    payload: response.data.data.total
                  });
                }
              });
          });

        _axios
          .get(buildLink("wishlist", undefined, window.innerWidth))
          .then((response) => {
            if (response.data.success) {
              dispatchW({
                type: "setProducts",
                payload: response.data.data.products
              });
              // dispatchW({
              //   type: "setProductsCount",
              //   payload: response.data.total_product_count,
              // });
              dispatchW({
                type: "setTotals",
                payload: response.data.data.totals
              });
              const ids = response.data.data.products.map((p) => p.product_id);
              dispatchW({
                type: "setProductIds",
                payload: ids
              });
              dispatchW({
                type: "loading",
                payload: false
              });
              setIsWishlist(false);
            } else {
              dispatch({
                type: "setProductsCount",
                payload: 0
              });

              dispatch({
                type: "loading",
                payload: false
              });
            }
          });
      } else {
        dispatchW({
          type: "setProductIds",
          payload: [...stateW.pIds, product_id]
        });

        _axios
          .post(
            buildLink("wishlist", undefined, window.innerWidth) +
              "&id=" +
              product_id
          )
          .then(() => {
            _axios
              .get(buildLink("wishlistCount", undefined, window.innerWidth))
              .then((response) => {
                if (response.data.success) {
                  dispatchW({
                    type: "setProductsCount",
                    payload: response.data.data.total
                  });
                  setIsWishlist(true);
                  setPopupW(true);
                }
              });
          });
      }
    }
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
    apos: "'"
  };

  return (
    <div className={`bg-dgrey10 ${width > 650 ? "px-6" : ""}`}>
      {cartmenu && width > 650 && (
        <div ref={wrapperRef} onMouseEnter={() => setHoveredCart(true)}>
          <TopCart cartmenu={cartmenu} />
        </div>
      )}
      {hoveredCart && (
        <>
          <div
            onMouseEnter={() => {
              setHoveredCart(true);
            }}
            onMouseLeave={() => {
              setHoveredCart(false);
            }}
          >
            <TopCart cartmenu={hoveredCart} />
          </div>
          {/* <div
                className={`fixed h-full w-full min-h-full z-10 ${
                  showCartmenu ? "bg-transparent" : "bg-dblackOverlay2"
                }  top-0 left-0`}
              ></div> */}
        </>
      )}
      {showCartmenuMob && (
        <div>
          <CartmenuMobile closemenu={closeCartMobMenu} />
        </div>
      )}
      {overlay && (
        <div
        // ref={wrapperRef}
        // onClick={() => {
        //   setOverlay(false);
        //   setCartmenu(false);
        // }}
        >
          <Overlay />
        </div>
      )}
      {fulloverlay && (
        <div
          className="fixed h-full w-full min-h-full z-20 bg-dblackOverlay top-0 left-0"
          onClick={() => {
            setShare(false);
            setFulloverlay(false);
          }}
        ></div>
      )}
      {/* wishlist success popup */}
      {popupW && (
        <div
          className="fixed bg-dblackOverlay top-0 lef-0 w-full h-full z-40 overflow-hidden"
          onClick={() => {
            setPopupW(false);
          }}
        >
          <div className="text-center absolute w-full h-full left-0 top-0 px-2 box-border">
            <div
              className="cursor-auto w-80 md:w-96 bg-clip-padding py-2.5 px-7 my-10 mx-auto bg-dwhite1 box-border relative top-1/4 inline-block align-middle text-left z-50 rounded-lg"
              style={{ minWidth: "290px" }}
            >
              <div className="block relative pt-6 md:pt-8 h-72 text-center">
                <div className="icon-wrapper text-center mb-9 flex justify-center">
                  <AiFillHeart className="text-black2 w-14 h-14" />
                </div>
                <div className="text-d15 font-bold text-center text-dblack2 font-mono">
                  FAVORITE PRODUCT
                </div>
                <p className="text-d16 mt-2.5 text-center text-dblack2">
                  You have added the product to your favorite list. You can view
                  your entire list of favorite items by clicking the heart in
                  the menu.
                </p>
                <button
                  className="text-dblack2 font-bold h-14 text-d16 w-full underline"
                  onClick={() => {
                    setPopupW(false);
                  }}
                >
                  close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* add to cart success popup on mobile */}
      {popupC && width < 650 && (
        <div className="fixed bg-dblackOverlay top-0 lef-0 w-full h-full z-30 overflow-hidden">
          <div className="text-center absolute w-full h-full left-0 top-0 box-border">
            <div
              className="cursor-auto w-full md:w-96 bg-clip-padding py-2.5 px-7 my-10 mx-auto bg-dwhite1 box-border relative top-1/4 inline-block align-middle text-left z-40"
              style={{ minWidth: "290px" }}
            >
              <div
                className="icon-close h-5 w-5 absolute top2.5 right-2.5 cursor-pointer opacity-60 text-center leading-5 z-50"
                onClick={() => {
                  setPopupC(false);
                }}
              >
                <GrFormClose className="w-6 h-6" />
              </div>
              <div className="block relative py-4 md:pt-8 h-68 text-center">
                <div className="text-d20 font-semibold text-center text-dblack2 font-mono py-5">
                  Basket
                </div>
                <p className="text-d13 mt-2.5 text-center text-dblack2 h-9">
                  The product has been added to the cart.
                </p>
                <div className="buttons-wrapper flex flex-col items-center justify-center w-64 text-center mx-auto font-mono">
                  <button
                    className="text-dblue1 border border-dblue1 bg-dwhite1 h-10 text-d16 w-3/4 m-auto mb-2.5"
                    onClick={() => {
                      setPopupC(false);
                    }}
                  >
                    CONTINUE SHOPPING
                  </button>
                  <Link
                    to={"/cart"}
                    className="text-dwhite1 border border-dblue1 bg-dblue1 h-10 text-d16 w-3/4 m-auto  mb-2.5 pt-1.5"
                  >
                    GO TO CART
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* share button for social media */}
      {share && (
        <div className="fixed z-30 bottom-0 left-0 w-full">
          <div className="left-0 md:left-1/2 bg-dwhite1 w-full md:w-2/5 relative z-30 rounded-t-md py-4 px-8 flex justify-between items-center md:-translate-x-1/2">
            <div className="whatsapp items-center justify-center">
              <a
                href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                className="md:pl-1 flex flex-col items-center"
              >
                <FaWhatsapp className="w-10 h-10  bg-dwhatsapp text-white" />
                <span className="leading-9">Whatsapp</span>
              </a>
            </div>
            <div className="facebook items-center justify-center">
              <FacebookShareButton url={window.location.href}>
                <div className="pl-1 flex flex-col items-center">
                  <ImFacebook2 className="w-10 h-10  text-dfacebook" />
                  <span className="leading-9"> Facebook</span>
                </div>
              </FacebookShareButton>
            </div>
            <div className="twitter items-center justify-center">
              <TwitterShareButton url={window.location.href}>
                <div className="pl-1 flex flex-col items-center">
                  <FaTwitterSquare className="w-11 h-11  text-dtwitter" />
                  <span className="leading-9">Twitter</span>
                </div>
              </TwitterShareButton>
            </div>
            <div className="email items-center justify-center">
              <EmailShareButton url={window.location.href}>
                <div className="pl-1 flex flex-col items-center justify-center">
                  <AiOutlineMail className="w-11 h-11 " />
                  <span className="leading-9">Email</span>
                </div>
              </EmailShareButton>
            </div>
          </div>
        </div>
      )}

      <div className={`py-5 ${width > 650 ? "container" : "px-2"}`}>
        <div className="text-d12 my-2.5 text-dgrey11 text-left flex flex-wrap items-center">
          <Link to={"/"}>{productData?.breadcrumbs?.text_home}</Link>
          <BsChevronRight className="mx-2 mt-0.5" />
          {productData?.breadcrumbs?.category.map((breadcrumb, index) => (
            <div className="flex items-center" key={breadcrumb.category_id}>
              <Link
                // to={`/category/${breadcrumb.category_id}`}
                to={
                  path +
                  "/" +
                  breadcrumb?.name
                    .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                    .replace(/\s+/g, "-")
                    .replace("/", "-")
                    .replace("%", "") +
                  "/c=" +
                  breadcrumb.category_id
                }
                className={` ${
                  index === productData?.breadcrumbs?.category.length - 1
                    ? "text-dblack2 font-semibold"
                    : "hidden"
                }`}
                dangerouslySetInnerHTML={{
                  __html: breadcrumb?.name
                }}
              ></Link>
              <BsChevronRight
                className={`mx-2 mt-0.5 ${
                  index == productData?.breadcrumbs?.category.length - 1
                    ? "hidden"
                    : "hidden"
                }`}
              />
            </div>
          ))}
        </div>
        <div className={`${width > 650 && "overflow-hidden"} ${
                stateAccount.admin && productData?.status === "0"
                  ? "bg-dPink"
                  : "bg-white"
              } flex flex-col md:flex-row`}>
          <div className="mr-4 relative w-full md:w-577">
            {images?.length > 0 ? (
              // <NewZoom
              //   // activeOption={activeImageOption.product_option_value_id}
              //   images={images}
              //   index={"zzzzz"}
              // />
              <ProductNewZoom
                images={images}
                hideFixedCartMenu={hideFixedCartMenu}
                productData={productData}
              />
            ) : (
              <img
                className="w-full md:w-11/12"
                src={product_image}
                alt="product_image_placeholder"
              />
            )}
          </div>

          <div className="w-full md:w-5/12 p-1 ">
            <div className="wrapper">
              <div className="flex my-3">
                <div
                  className="font-mono md:font-mono font-semibold text-left	text-dborderblack2 text-d17 md:text-d20 w-8/12"
                  dangerouslySetInnerHTML={{
                    __html: productData?.heading_title
                  }}
                ></div>
                <div
                  className="align-right w-8 mt-1 text-d25  ml-6 text-dborderblack2 cursor-pointer"
                  onClick={() => {
                    setShare(true);
                    setFulloverlay(true);
                  }}
                >
                  <FiShare />
                </div>
                <div
                  className="align-right w-12 mt-1 text-d25 ml-2 	text-dborderblack2 cursor-pointer"
                  onClick={() => addToWishlist()}
                >
                  {stateW?.pIds.indexOf(product_id) > -1 ? (
                    <AiFillHeart className="text-dborderblack2" />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </div>
              </div>
              <div className="flex my-3">
                <div className=" bg-dborderblack2 text-white w-16 h-16 font-black align-middle pt-4 text-d20">
                  {/* DiSCOUNT IN CART */}
                  {productData?.saving && productData?.saving + "%"}
                </div>

                <div className="pl-5 flex-nowrap text-d20  text-left align-middle my-1">
                  <div className="font-light line-through">
                    {" "}
                    {productData?.price}
                  </div>
                  <div className="font-bold text-d25 leading-5">
                    {" "}
                    {productData?.special}
                  </div>
                </div>
              </div>
              <div className="flex font-light text-d11 pl-2 py-3">
                Model Number : {productData?.sku}
              </div>

              {stateAccount.admin && (
                <div className="flex  text-d14 pl-2 py-1">
                  {" "}
                  Quantity: {productData?.quantity}{" "}
                </div>
              )}

              {/* series options */}

              {productData?.series_options &&
                productData?.series_options?.map(
                  (series_option, key) =>
                    series_option?.series_option_id !== null && (
                      <div className="my-2 md:my-4">
                        <div className="flex justify-between">
                          <div className="flex justify-between items-center">
                            <h3
                              className="text-sm"
                              style={{ color: "rgb(126, 133, 155)" }}
                            >
                              {`${series_option.series_option_name} ${":"}`}
                            </h3>
                            {
                              // series_option?.options?.map(
                              //   (op_val) =>
                              //     op_val.product_id === product_id &&
                              viewSeriesVal !== key && (
                                <span className="flex ml-1 font-semibold text-sm w-28">
                                  {" "}
                                  {series_option?.options[0]?.name}
                                </span>
                                // )
                              )
                            }
                            <span
                              id={key}
                              className={`${
                                viewSeriesVal === key ? "block" : "hidden"
                              } ml-1 font-semibold text-sm w-28`}
                            >
                              {" "}
                            </span>
                          </div>
                        </div>
                        <div className="flex fkex-wrap">
                          {series_option?.options?.map((option_val) => (
                            <Link
                              key={option_val?.product_id}
                              to={{
                                pathname:
                                  `${path}/product/` + option_val?.product_id
                              }}
                              className={`flex justify-center items-center w-20 mr-5 mb-5  border-2 hover:shadow cursor-pointer p-1 rounded-md
                            ${
                              option_val.product_id === product_id &&
                              option_val.product_id !== ""
                                ? "border-dblue1"
                                : "border-dgrey"
                            }
                          `}
                              onClick={() =>
                                setSeriesOpSelected(option_val.name)
                              }
                              onMouseOver={() => {
                                handleHoveredSeries(key, option_val.name);
                              }}
                              onMouseLeave={() => handleLeavedSeries(key)}
                            >
                              {/* {option_val.product_id }  + {product_id} */}
                              <LazyLoadImage
                                src={option_val?.image}
                                alt={option_val?.name}
                                className="w-full"
                                width={80}
                                height={80}
                                PlaceholderSrc={product_image}
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                )}
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
                            className={`p-1  mr-2 my-2 cursor-pointer w-14 md:h-10 relative `}
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

              {width > 650 ? (
                <div className="flex  my-3">
                  <div className="w-3/12 flex flex-wrap align-middle text-center pt-3 text-d22 font-bold text-dborderblack2 pr-3 items-center">
                    <button onClick={() => decrementQuantity()}>
                      <span className="w-3/12">-</span>
                    </button>
                    <input
                      className="w-6/12 text-center mx-2"
                      ref={quantityRef}
                      onChange={(e)=> handleQuantity(e)}
                    />
                    {/* <span className="w-6/12 text-center ">{quantity}</span> */}
                    <button onClick={() => incrementQuantity()}>
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
                          <span className="">ADD TO BASKET </span>
                        </div>
                      )}
                    </span>{" "}
                  </button>
                </div>
              ) : (
                <div
                  className={`w-full fixed -bottom-1 left-0 text-center z-10 flex items-center overflow-x-hidden ${
                    productZoomModal ? "hidden" : ""
                  } `}
                >
                  <div className="w-1/3 flex  align-middle text-center py-3 mb-1 text-d22 font-bold text-dborderblack2 px-3 items-center bg-dwhite1 justify-center">
                    <button onClick={() => decrementQuantity()}>
                      <span className="w-3/12">-</span>
                    </button>
                    <input
                      className="w-6/12 text-center mx-2"
                      ref={quantityRef}
                    />

                    <button onClick={() => incrementQuantity()}>
                      <span className="w-3/12">+</span>
                    </button>
                  </div>
                  <button
                    className="bg-dborderblack2 font-black text-white py-4 w-8/12 text-d16"
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
                          <span className="">ADD TO BASKET </span>
                        </div>
                      )}
                    </span>{" "}
                  </button>
                </div>
              )}

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
              <div className="my-4 align-center mr-12">
                <a
                  className="flex justify-start text-center "
                  href={`https://api.whatsapp.com/send?phone=${
                    window.config["countryCode"] + "76400008"
                  }&text=Hi%20there%20i%27m%20interested%20in%20${
                    window.config["site-url"]
                  }/product/${product_id}`}
                >
                  <div className={`  flex justify-center items-center bg-dwhatsapp  rounded py-2 px-6 text-white${width < 650 ? "w-full" : "text-d18 w-auto"}`}>
                    <FaWhatsapp className="w-7 h-7   text-white mr-2 text-d9" />
                    <span className=" text-white ">Whatsapp Support</span>
                  </div>
                </a>
              </div>

              <div className="pt-1">
                {productData?.product_categories &&
                  productData?.product_categories?.length > 0 && (
                    <div className=" w-full  ">
                      <div className=" ">
                        <div className="flex justify-around mt-2.5">
                          {productData?.product_categories?.map(
                            (category, Key) =>
                              Key < 2 && (
                                <Link
                                  key={category.category_id}
                                  to={`${path}/${category.name
                                    .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                                    .replace(/\s+/g, "-")
                                    .replace("/", "-")
                                    .replace("%", "")}/c=${
                                    category.category_id
                                  }`}
                                  className="text-d10 border border-dgrey2 p-3 w-1/2 text-center flex justify-center items-center ml-2"
                                >
                                  All
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: category.name
                                    }}
                                    className="text-center px-0.5 font-bold text-d11 lowercase"
                                  ></span>
                                  Products
                                  <BsChevronRight className="ml-1" />
                                </Link>
                              )
                          )}
                        </div>
                        {/* )} */}
                      </div>
                    </div>
                  )}
              </div>
              {productData?.special_end !== 0 &&
                    
                      <Timer
                        date={ productData?.special_end || "2023-06-26"}
                      />
                      }

              <div className="add-to-basket-wrapper flex-xs w-full h-14 fixed z-30 bottom-0 bg-dwhite1 hidden"></div>
              <div className="error js-error-price-down text-d13 text-left mt-2.5 text-dred4"></div>
              <div className="desktop-product-infos md:hidden"></div>
            </div>
            <div className="hidden "></div>
            <div className="product-share-popup hidden fixed bottom-0 left-0 z-40 w-screen"></div>
          </div>
        </div>
        <div className="product-info-mobile md:hidden">
          <div className="product-infos py-2.5 px-7 mt-5 bg-dgrey1">
            <div className="text-dblack1 text-d14">
              <div className="title text-d15 font-bold py-3.5 text-dborderblack2 text-left">
                PRODUCT INFORMATION
              </div>
              <div className="mx-1 flex flex-col md:flex-row">
                <div className="flex flex-row text-left pt-1">
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: productData?.description
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <table className=" border  border-dgrey1 w-full text-left  font-mono leading-tight text-xs">
                    <tbody>
                      {productData?.attribute_groups?.map((grp) => (
                        <tr>
                          <td className="font-bold whitespace-nowrap">
                            {grp.name}
                          </td>
                          {grp?.attribute?.map((attr) => (
                            <>
                              <td className="p-2.5">{attr.name}</td>
                            </>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="product-info-wrapper hidden md:block w-full mt-7">
            <div className="">
              <ul className="w-full flex border-b">
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
              </ul>
            </div>
            <div className="w-full p-6 border border-dgrey5 border-t -mb-1">
              <div
                className={`text-dborderblack4 ${
                  infomenu ? "block" : "hidden"
                }`}
              >
                <div className="-mx-1 flex flex-col-reverse md:flex-row">
                  <div className="w-full text-left flex justify-around">
                    <div className="w-1/2 mr-10">
                      <div className="text-d22 font-bold my-5">
                        DESCRIPTIONS
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: productData?.description
                        }}
                      ></div>
                    </div>
                    <div className="w-1/2">
                      <table className=" border  border-dgrey1 w-full text-left ml-3 font-mono leading-tight text-xs">
                        <thead className="p-6 border-b border-dgrey1 text-left">
                          <tr className="my-4 ">
                            <th className="border-r border-dgrey1 py-4  text-d22">
                              FEATURES
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData?.attribute_groups?.map((grp) => (
                            <tr>
                              <td className="font-bold whitespace-nowrap">
                                {grp.name}
                              </td>
                              {grp?.attribute?.map((attr) => (
                                <>
                                  <td className="p-2.5">{attr.name}</td>
                                </>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`text-dborderblack4 text-left ${
                  returnmenu ? "block" : "hidden"
                }`}
                style={{ minHeight: "380px" }}
              >
                <div className="flex">
                  <div
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: unescapeHTML(returnPolicy?.description)
                    }}
                  ></div>
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
            </div>
          </div>
        </div>

        {/* / 10 products */}
        {productData?.smallest_cat_products &&
          productData?.smallest_cat_products?.length > 0 && (
            <div className=" w-full pt-8">
              <div className=" pb-2 md:pb-8">
                <h2 className="font-semibold text-xl text-dblack text-left">
                  {productData.product_categories[0].name}
                </h2>
                {width < 650 ? (
                  <Slider {...productMobile}>
                    {productData.smallest_cat_products.map((item) => (
                      <div>
                        {" "}
                        <SingleProducts
                          item={item}
                          showCartmenuMob={showCart}
                        ></SingleProducts>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div>
                    <Slider {...moreSettings}>
                      {productData.smallest_cat_products.map((item) => (
                        <div className="px-1.5">
                          {" "}
                          <SingleProducts
                            item={item}
                            showCartmenu={showCart}
                          ></SingleProducts>
                        </div>
                      ))}
                    </Slider>
                  </div>
                )}
              </div>
            </div>
          )}
        {/* Related Product */}
        {productData?.product_related &&
          productData?.product_related.length > 0 && (
            <div className={`mb-2 mt-4  ${width > 1920 && "mt-10"} `}>
              <h2 className="font-semibold text-xl  text-dblack2  text-left font-mono uppercase">
                Related products
              </h2>
              {width < 650 ? (
                <Slider {...productMobile}>
                  {productData?.product_related?.map((item, index) => {
                    return (
                      <div className="pr-2" key={item.product_id}>
                        <SingleProducts
                          item={item}
                          showCartmenuMob={showCart}
                        />
                      </div>
                    );
                  })}
                </Slider>
              ) : (
                <Slider {...productSetting}>
                  {productData?.product_related?.map((item) => (
                    <div className="pr-2" key={item.product_id}>
                      <SingleProducts item={item} showCartmenu={showCart} />
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
                          <SingleProducts
                            item={item}
                            showCartmenuMob={showCart}
                          />
                        </div>
                      );
                    })}
                  </Slider>
                ) : (
                  <Slider {...productSetting}>
                    {productData?.product_recentlyViewed?.map((item) => {
                      return (
                        <div className="pr-2" key={item.product_id}>
                          <SingleProducts item={item} showCartmenu={showCart} />
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
