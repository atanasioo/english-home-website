import React from "react";
import { useEffect, useState, useContext } from "react";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { CartContext } from "../contexts/CartContext";
import { AccountContext } from "../contexts/AccountContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../assets/css/index.css";

function Cart() {
  const [count, setCount] = useState(null);
  const [cart, setCart] = useState();
  const [info, setInfo] = useState([]);
  const [opacity, setOpacity] = useState(false);

  const [error, setError] = useState([]);

  const [state, dispatch] = useContext(CartContext);
  const [stateW, dispatchW] = useContext(WishlistContext);
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const navigate = useNavigate();
  const width = window.innerWidth;

  const getProductCount = async () => {
    _axios
      .get(buildLink("cartCount", undefined, window.innerWidth))
      .then((response) => {
        const data = response.data;
        setCount(data);
        //   console.log(data);
      });
  };

  useEffect(() => {
    function getCart() {
      Cookies.set("change", false);
      _axios
        .get(buildLink("cart", undefined, window.innerWidth))
        .then((response) => {
          // console.log("response"+response.data.success)
          if (response.data.success) {
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
          }
          // console.log("response"+response.data.success)
          setError(response?.data?.errors[0]);
          //setLoading(false);
        });
    }
    getCart();
  }, [window.location]);

  useEffect(() => {
    getProductCount();
  }, []);

  // Remove wishlist
  // function remove(product_id) {
  //   _axios
  //     .delete(
  //       buildLink("wishlist", undefined, window.innerWidth) +
  //         "/&id=" +
  //         product_id
  //     )
  //     .then(() => {
  //       _axios
  //         .get(buildLink("wishlist", undefined, window.innerWidth))
  //         .then((response) => {
  //           const data = response.data.data.products;
  //           setProducts(data);
  //           dispatchWishlist({
  //             type: "setProductsCount",
  //             payload: response.data.data.total,
  //           });
  //         });
  //          window.location.reload();
  //     });

  // }

  function handleChangeQuantity(e, key, i) {
    if (document.getElementById("p-quantity" + i)) {
      document.getElementById("p-quantity" + i).value = e.target.value;
      // document.getElementById("p-quantitym" + i).value = e.target.value;
    }
    if (e.keyCode === 13) {
      let quantity = e.target.value;
      const obj = { key, quantity };
      setOpacity(true);
      dispatch({
        type: "loading",
        payload: true,
      });
      _axios
        .put(buildLink("cart", undefined, window.innerWidth), obj)
        .then(() => {
          _axios
            .get(buildLink("cart", undefined, window.innerWidth))
            .then((response) => {
              setOpacity(false)
            
             if(!response?.data?.error == null  ||!response?.data?.error == undefined ){
  setError(response?.data?.errors[0]);
             }
              dispatch({
                type: "setProducts",
                payload:
                  response.data?.data?.products?.length > 0
                    ? response.data.data.products
                    : [],
              });
              dispatch({
                type: "setTotals",
                payload:
                  response.data?.data?.totals?.length > 0
                    ? response.data.data.totals
                    : 0,
              });
              dispatch({
                type: "setProductsCount",
                payload:
                  response.data.total_product_count > 0
                    ? response.data.total_product_count
                    : 0,
              });
              dispatch({
                type: "loading",
                payload: false,
              });
            });

          e.target.blur();
          setOpacity(false);
        });
    }
  }

  function updateQuantity(key, quantity, i, type) {
    if (type === "d") {
      if (document.getElementById("p-quantity" + i)) {
        document.getElementById("p-quantity" + i).value = quantity;
        //  document.getElementById("p-quantitym" + i).value = quantity;
      }
    } else {
      // console.log(document.getElementById("p-quantity" + i));
      if (document.getElementById("p-quantitym" + i)) {
        document.getElementById("p-quantitym" + i).value = quantity;
        document.getElementById("p-quantity" + i).value = quantity;
      }
    }
    const obj = { key, quantity };
    setOpacity(true);
    dispatch({
      type: "loading",
      payload: true,
    });
    _axios
      .put(buildLink("cart", undefined, window.innerWidth), obj)
      .then(() => {
        _axios
          .get(buildLink("cart", undefined, window.innerWidth))
          .then((response) => {
            // console.log(response?.data?.errors[0])
            if (response?.data?.errors) {
              setError(response?.data?.errors[0]);
            }

            dispatch({
              type: "setProducts",
              payload:
                response.data?.data?.products?.length > 0
                  ? response.data.data.products
                  : [],
            });
            dispatch({
              type: "setTotals",
              payload:
                response.data?.data?.totals?.length > 0
                  ? response.data.data.totals
                  : 0,
            });
            dispatch({
              type: "setProductsCount",
              payload:
                response.data?.data?.total_product_count > 0
                  ? response.data.data.total_product_count
                  : 0,
            });
            dispatch({
              type: "loading",
              payload: false,
            });
            console.log("omar");
            // if (quantity === 0) {
            //   window.location.reload();
            // }
          });
        setOpacity(false);
      });
  }

  function addToWishlist(product_id) {
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
                  console.log("delete");
                  dispatchW({
                    type: "setProductsCount",
                    payload: response.data.data.total,
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
                payload: response.data.data.products,
              });
              // dispatchW({
              //   type: "setProductsCount",
              //   payload: response.data.total_product_count,
              // });
              dispatchW({
                type: "setTotals",
                payload: response.data.data.totals,
              });
              const ids = response.data.data.products.map((p) => p.product_id);
              dispatchW({
                type: "setProductIds",
                payload: ids,
              });
              dispatchW({
                type: "loading",
                payload: false,
              });
              //setIsWishlist(false);
            } else {
              dispatch({
                type: "setProductsCount",
                payload: 0,
              });

              dispatch({
                type: "loading",
                payload: false,
              });
            }
          });
      } else {
        dispatchW({
          type: "setProductIds",
          payload: [...stateW.pIds, product_id],
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
                  console.log("hii");
                  dispatchW({
                    type: "setProductsCount",
                    payload: response.data.data.total,
                  });
                  // setIsWishlist(true);
                }
              });
          });
      }
    }
  }

  return (
    <div>
      <div
        className={` checkout-viewport bg-dgrey10 ${
          width > 650 && "container"
        }`}
        style={{ minHeight: "700px" }}
      >
        <div className="hidden"></div>
        <div className="hidden"></div>
        <div className="basket-upsell-wrapper"></div>
        <div className="basket pb-24 ">
          <div className="">
            <div></div>
            {state?.products?.length > 0 ? (
              <div className="w-full pt-6 flex flex-col md:flex-row">
                {/* product list */}
                {state.loading}
                <div
                  className={`w-full md:w-2/3 mr-6 ${
                    state.loading && "pointer-events-none opacity-50"
                  }`}
                >
                  <div className="mt-10 w-full text-center justify-center md:justify-start md:text-left text-dblack2 mb-5 flex items-center ">
                    <p className="inline-block font-mono text-d18 font-bold uppercase">
                      MY CART
                    </p>
                    <p className="font-mono text-d18 font-bold"></p>
                    <p className="font-mono text-d15 ml-2.5"></p>
                    <p className="font-mono text-d15 ml-2.5">
                      {" "}
                      {state?.productsCount} Products
                    </p>
                  </div>
                  <div className="border border-dgrey5 py-5 px-2">
                    <div>{error.errorMsg}</div>
                    <div className="basket-items">
                      {state?.products?.map((product, i) => (
                        <div
                          className={`p-4 ${
                            product?.stock_qty < product.quantity && "bg-dred5"
                          }`}
                        >
                          <div
                            className={` flex flex-col xs:flex-row justify-between items-center  ${
                              i !== 0 ? "border-t border-dgrey5 " : ""
                            }  `}
                            key={product?.product_id}
                          >
                            {/* <div> */}
                            <div
                              className={`product-image w-24 flex-shrink-0 border border-dgrey4 mb- overflow-hidden `}
                            >
                              <Link
                                to={`${path}/${product?.name
                                  .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                                  .replace(/\s+/g, "-")
                                  .replace("..", "")
                                  .replace("/", "-")
                                  .replace("---", "-")
                                  .replace("--", "-")
                                  .replace("/", "")}/p=${product?.product_id}`}
                              >
                                <img src={product?.thumb} alt="" />
                              </Link>
                            </div>
                            <div className="product-info flex-1 flex flex-col lg:flex-row items-start md:items-center text-d14 text-dblue2">
                              <div className="details px-4 w-52 md:w-60 text-left ">
                                <div className="flex justify-between items-center">
                                  <div className="product-price block md:hidden font-bold text-d17 text-dblue2 ">
                                    ${product?.net_price}
                                  </div>
                                  <button
                                    className="ml-7 pr-5 bg-transparent md:hidden"
                                    onClick={() =>
                                      updateQuantity(product.cart_id, 0)
                                    }
                                  >
                                    <AiOutlineClose className="w-4 h-4" />
                                  </button>
                                </div>

                                <p
                                  className="text-d14 text-dgrey12 md:text-dblue2"
                                  dangerouslySetInnerHTML={{
                                    __html: product?.name,
                                  }}
                                ></p>
                                {product?.option.map((op) => (
                                  <p key={op.product_option_value_id}>
                                    <span className="mr-3">{op?.name}:</span>
                                    <span>{op?.value}</span>
                                  </p>
                                ))}
                                <Link
                                  onClick={() =>
                                    addToWishlist(product.product_id)
                                  }
                                  className="mt-4 mb-1 flex items-center"
                                >
                                  {stateW?.pIds.indexOf(product?.product_id) >
                                  -1 ? (
                                    <AiFillHeart className="text-dborderblack2 w-5 h-5 mr-0.5" />
                                  ) : (
                                    <AiOutlineHeart className="w-5 h-5 mr-0.5" />
                                  )}
                                  <p>Store product</p>
                                </Link>
                              </div>
                              <div className="quantity flex text-dblue2 md:mr-5 items-center px-4 md:px-0">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      product.cart_id,
                                      Number(product.quantity) - 1,
                                      i,
                                      "d"
                                    )
                                  }
                                  className="w-7 h-7 md:w-9 md:h-9 pb-1 mr-1.5 md:mr-0 border border-dgrey13 md:border-dblue2 text-d18 md:text-d20 flex justify-center items-center rounded-full font-bold md:font-normal"
                                >
                                  -
                                </button>
                                <div className="w-20 text-d16 flex items-center text-center px-0.5">
                                  <div className="">Piece</div>
                                  <div className="flex justify-center items-center ml-1">
                                    <span>[</span>
                                    <input
                                      type="number"
                                      className="bg-transparent w-6 h-10 text-center border-r-0 border-l-0 outline-none"
                                      id={"p-quantity" + i}
                                      onKeyDown={(e) =>
                                        handleChangeQuantity(
                                          e,
                                          product.cart_id,
                                          i,
                                          "d"
                                        )
                                      }
                                      defaultValue={product.quantity}
                                    />
                                    <span>]</span>
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      product.cart_id,
                                      Number(product.quantity) + 1,
                                      i,
                                      "d"
                                    )
                                  }
                                  className="w-7 h-7 md:w-9 md:h-9 pb-1 ml-1.5 md:ml-0.5 border border-dgrey13 md:border-dblue2 text-d18 md:text-d20 flex justify-center items-center rounded-full font-bold md:font-normal"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="product-actions hidden md:flex">
                              <div className="">
                                <span className="old-price font-light text-d18 text-dblue2 line-through text-center"></span>
                                <span className="old-price font-bold text-d25 text-dblue2 text-center">
                                  ${product?.net_price}
                                </span>
                              </div>
                              <button
                                className="ml-7 pr-5 bg-transparent"
                                onClick={() =>
                                  updateQuantity(product.cart_id, 0)
                                }
                              >
                                <AiOutlineClose className="w-6 h-6" />
                              </button>
                            </div>
                            {/* </div> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full"></div>
                </div>
                {/* end product list */}
                {/* order summary div */}
                <div className="w-full md:w-1/3">
                  <div>
                    <div className="w-full text-left mt-10 text-dblack2 mb-5 flex items-center justify-between px-4">
                      <p className="font-mono text-d20 text-bold inline-block text-left">
                        ORDER SUMMARY
                      </p>
                      <Link
                        to={"/"}
                        className="font-mono text-d14 inline-block text-right text-dblack1"
                      >
                        continue shopping
                      </Link>
                    </div>
                    <div className="bg-dyellow2 w-full p-7">
                      <div className="w-full pb-2.5 border-b border-dgrey4">
                        <div className="w-full pb-3.5 font-mono flex justify-between items-center">
                          <span className="text-d15 text-dblack2 inline-block">
                            Total of {count?.data?.nb_of_products} Items
                          </span>
                          <span></span>
                          <span className="text-d15 text-dblack2 inline-block">
                            {/* {state?.totals["1"]?.text} */}
                          </span>
                        </div>
                        <div className="w-full pb-3.5">
                          <div className="">
                            <span className="campaign text-18 font-semibold text-dblue1"></span>
                            <span className="discount text-18 font-semibold text-dblue1"></span>
                          </div>
                          <div>
                            <span className="campaign text-18 font-semibold text-dblue1"></span>
                            <span className="discount text-18 font-semibold text-dblue1"></span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3.5 mb-7">
                        {/* <span className="font-mono text-d20 font-bold text-dblack2 text-left">Total</span>
                      <span className="font-mono text-d20 font-bold text-dblack2 text-left"></span>
                      <span className="font-mono text-d20 font-bold text-dblack2 text-left">{}</span> */}
                        {state?.totals?.map((total) => (
                          <div
                            className="flex items-center justify-between font-mono text-d18 font-bold text-dblack2 text-left"
                            key={Math.random()}
                          >
                            <span>{total.title}</span>
                            <span>{total.text}</span>
                          </div>
                        ))}
                      </div>
                      {window.location.href.split("/")[3] === "store_one" ? (
                        <>
                          {width < 650 ? (
                            <Link
                              to={"/store_one/checkout"}
                              className="fixed z-30 bottom-0 
                          left-0 md:block py-2 text-d17 tracking-wide inline-block bg-dblue1 font-bold uppercase text-dwhite1 text-center w-full h-14 md:h-10 bg-clip-padding pt-3.5 md:pt-1.5"
                            >
                              Confirm cart
                            </Link>
                          ) : (
                            <Link
                              to={"/store_one/checkout"}
                              className="py-2 text-d17 tracking-wide inline-block bg-dblue1 font-bold uppercase text-dwhite1 text-center w-full h-12 md:h-10 bg-clip-padding md:pt-1.5"
                            >
                              Confirm cart
                            </Link>
                          )}
                        </>
                      ) : window.location.href.split("/")[3] === "store_two" ? (
                        <>
                          {width < 650 ? (
                            <Link
                              to={"/store_two/checkout"}
                              className="fixed z-30 bottom-0 
                          left-0 md:block py-2 text-d17 tracking-wide inline-block bg-dblue1 font-bold uppercase text-dwhite1 text-center w-full h-14 md:h-10 bg-clip-padding pt-3.5 md:pt-1.5"
                            >
                              Confirm cart
                            </Link>
                          ) : (
                            <Link
                              to={"/store_two/checkout"}
                              className="py-2 text-d17 tracking-wide inline-block bg-dblue1 font-bold uppercase text-dwhite1 text-center w-full h-12 md:h-10 bg-clip-padding md:pt-1.5"
                            >
                              Confirm cart
                            </Link>
                          )}
                        </>
                      ) : (
                        <>
                          {width < 650 ? (
                            <Link
                              to={"/checkout"}
                              className="fixed z-30 bottom-0 
                          left-0 md:block py-2 text-d17 tracking-wide inline-block bg-dblue1 font-bold uppercase text-dwhite1 text-center w-full h-14 md:h-10 bg-clip-padding pt-3.5 md:pt-1.5"
                            >
                              Confirm cart
                            </Link>
                          ) : (
                            <Link
                              to={"/checkout"}
                              className="py-2 text-d17 tracking-wide inline-block bg-dblue1 font-bold uppercase text-dwhite1 text-center w-full h-12 md:h-10 bg-clip-padding md:pt-1.5"
                            >
                              Confirm cart
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-full rounded-lg mt-3.5"></div>
                </div>
                {/* end order summary div */}
              </div>
            ) : (
              <div className="basket-empty py-28 text-center w-full">
                <div className="mb-6 text-dborderblack2 text-d30 font-bold md:leading-4">
                  Your Shopping Bag is Empty!
                </div>
                <Link
                  to={"/"}
                  className="inline-block py-2.5 px-5 text-dwhite1 bg-dborderblack2 text-center"
                >
                  Go to Homepage
                </Link>
              </div>
            )}

            {/* carousel */}
            <div className="my-7 "></div>
            <div className="my-7 "></div>
            <div className="my-7 "></div>
            {/* end carousel */}
          </div>
        </div>
        <div className="delete-add-favorite-modal hidden relative pt-4 h-64 text-center"></div>
      </div>
    </div>
  );
}

export default Cart;
