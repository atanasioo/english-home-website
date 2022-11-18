import React from "react";
import { useEffect, useState, useContext } from "react";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { CartContext } from "../contexts/CartContext";
import { AccountContext } from "../contexts/AccountContext";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "../assets/css/index.css";

function Cart() {
  const [count, setCount] = useState(null);
  const [cart, setCart] = useState([]);
  const [info, setInfo] = useState([]);
  const [opacity, setOpacity] = useState(false);
  const [state, dispatch] = useContext(CartContext);

  const getProductCount = async () => {
    _axios
      .get(buildLink("cartCount", undefined, window.innerWidth))
      .then((response) => {
        const data = response.data;
        setCount(data);
        console.log(data);
      });
  };

  const getCart = async () => {
    _axios
      .get(buildLink("cart", undefined, window.innerWidth))
      .then((response) => {
        const cart = response.data.data;
        const info = response.data;
        setCart(cart);
        setInfo(info);
        console.log(cart);
      });
  };

  useEffect(() => {
    getProductCount();
    getCart();
  }, []);

  function handleChangeQuantity(e, key, i) {
    if (document.getElementById("p-quantity" + i)) {
      document.getElementById("p-quantity" + i).value = e.target.value;
      document.getElementById("p-quantitym" + i).value = e.target.value;
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

  return (
    <div>
      <div className="checkout-viewport bg-dgrey10">
        <div className="hidden"></div>
        <div className="hidden"></div>
        <div className="basket-upsell-wrapper"></div>
        <div className="basket pb-24 ">
          <div className="container">
            <div className="basket-empty hidden py-24 text-center"></div>
            <div className="w-full pt-6 flex ">
              {/* product list */}
              <div className="w-2/3 mr-6">
                <div className="mt-10 w-full text-left text-dblack2 mb-5 flex items-center">
                  <p className="inline-block font-mono text-d18 font-bold uppercase">
                    MY CART
                  </p>
                  <p className="font-mono text-d18 font-bold"></p>
                  <p className="font-mono text-d15 ml-2.5"></p>
                  <p className="font-mono text-d15 ml-2.5">
                    {" "}
                    {count?.data?.nb_of_products} Products
                  </p>
                </div>
                <div className="border border-dgrey5 py-5 px-7">
                  <div className="basket-items">
                    {cart?.products?.map((product, i) => (
                      <div className={`pb-5 flex justify-between items-center ${ i!==0 ? "border-t border-dgrey5 pt-5" : ""}`}>
                        <div className="product-image flex-shrink-0 border border-dgrey4 mb-10 overflow-hidden">
                          <Link>
                            <img src={product?.thumb} alt="" />
                          </Link>
                        </div>
                        <div className="product-info flex-1 flex items-center text-d14 text-dblue2">
                          <div className="details px-4 w-60 text-left">
                            <div className="product-price hidden sm:block"></div>
                            <p>{product?.name}</p>
                            {product?.option.map((op) => (
                              <p>
                                <span className="mr-3">{op?.name}:</span>
                                <span>{op?.value}</span>
                              </p>
                            ))}
                            <Link className="mt-4 mb-1 flex items-center">
                              <AiOutlineHeart className="w-5 h-5 mr-1" />
                              <p>Store product</p>
                            </Link>
                          </div>
                          <div className="quantity flex text-dblue2 mr-5 items-center">
                            <button className="w-9 h-9 pb-1 border border-dblue2 text-d20 flex justify-center items-center rounded-full">
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
                            <button className="w-9 h-9 pb-1 ml-0.5 border border-dblue2 text-d20 flex justify-center items-center rounded-full">
                              +
                            </button>
                          </div>
                        </div>
                        <div className="product-actions flex">
                          <div>
                            <span className="old-price font-light text-d18 text-dblue2 line-through text-center"></span>
                            <span className="old-price font-bold text-d25 text-dblue2 text-center">${product?.net_price}</span>
                          </div>
                          <button className="ml-7 pr-5 bg-transparent">
                            <AiOutlineClose className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full"></div>
              </div>
              {/* end product list */}
              {/* order summary div */}
              <div className="w-1/3">
                <div>
                  <div className="w-full text-left mt-10 text-dblack2 mb-5 flex items-center justify-between">
                    <p className="font-mono text-d20 text-bold inline-block text-left">ORDER SUMMARY</p>
                    <Link className="font-mono text-d14 inline-block text-right text-dblack1">continue shopping</Link>
                  </div>
                  <div className="bg-dyellow2 w-full p-7">
                    <div className="w-full pb-2.5 border-b border-dgrey4"></div>
                    <div className="w-full "></div>
                    <div className="mt-3.5 mb-7 text-d17 tracking-wide inline-block bg-dblue1 font-bold"></div>
                  </div>
                </div>
                <div className="w-full rounded-lg mt-3.5"></div>
              </div>
              {/* end order summary div */}
            </div>
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
