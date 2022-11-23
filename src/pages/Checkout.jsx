import React, { useContext, useEffect, useState, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AccountContext } from "../contexts/AccountContext";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import Cookies from "js-cookie";
import HandlePhoneModel from "../components/phoneHandler";

function Checkout() {
  const [state, dispatch] = useContext(CartContext);
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [addressmenu, setAddressmenu] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [activeAddress, setActiveAddress] = useState({});
  const [zones, setZones] = useState([]);
  const [phoneValidate, setphoneValidate] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [err, setErr] = useState(false);
  const [deletemenu, setDeletemenu] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  //user details
  const firstname = useRef("");
  const lastname = useRef("");
  const address_1 = useRef("");
  const address_2 = useRef("");
  const telephone = useRef("");
  const zone_id = useRef("");

  const country_id = window.config["zone"];
  const city = "";
  const postcode = "";

  const zone = useRef({
    id: window.config["initial-zone"].id,
    name: window.config["initial-zone"].name,
  });

  //get addresses
  useEffect(() => {
    _axios
      .get(buildLink("address", undefined, window.innerWidth))
      .then((response) => {
        if (response.status) {
          if (response.data.success) {
            setAddresses(response.data.data);
            setActiveAddress(response.data.data[0]);
          }
        } else {
          dispatchAccount({ type: "setLoading", payload: false });
          if (!stateAccount.loged) {
            navigate("/");
          }
        }
      });
  }, [dispatchAccount, stateAccount.loged]);
  console.log(addresses);

  // Add Address
  function addAddress(e) {
    e.preventDefault();
    const obj = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      address_1: address_1.current.value,
      address_2: address_2.current.value,
      telephone: window.config["countryCode"] + telephone.current.value,
      zone_id: zone_id.current.value,
      town_id: 0,

      country_id,
      city,
      postcode,
    };
    setphoneValidate("");
    if (window.config["zone"] === "82" && telephone.current.value.length < 11) {
      setphoneValidate("must be 9 numbers");
      return;
    }
    // if (isEdit) {
    //   _axios
    //     .put(
    //       buildLink("address", undefined, window.innerWidth) +
    //         "&address_id=" +
    //         address_id,
    //       obj
    //     )
    //     .then((response) => {
    //       if (response.data.success) {
    //         if (fromCheckout) {
    //           history.push({
    //             pathname: "/checkout"
    //           });
    //         } else {
    //           setMessage(
    //             "Address Edited Successfully, you will be redirected to addresses page."
    //           );
    //           setTimeout(() => {
    //             history.push({
    //               pathname: "/account/addresses"
    //             });
    //           }, 3000);
    //         }
    //       }
    //     });
    // }
    else {
      _axios
        .post(buildLink("address", undefined, window.innerWidth), obj)
        .then((response) => {
          if (response.data.success) {
            setAddressmenu(false);
            // setMessage(
            //   "Address Added Successfully, you will be redirected to addresses page."
            // );
            // if (fromCheckout) {
            // //   history.push({
            // //     pathname: "/checkout"
            // //   });
            // } else {
            // //   setTimeout(() => {
            // //     history.push({
            // //       pathname: "/account/addresses"
            // //     });
            // //   }, 3000);
            // }
          }
        });
    }
  }

  //delete address
  function deleteAddress(address, address_id) {
    setActiveAddress(address);
    if (addresses.length !== 1) {
      _axios
        .delete(
          buildLink("address", undefined, window.innerWidth) +
            "&address_id=" +
            address_id
        )
        .then((response) => {
          setAddresses(addresses.filter((a) => a.address_id !== address_id));
        });
    }
  }

  useEffect(() => {
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
      });
  }, []);

  useEffect(() => {
    dispatchAccount({ type: "setAdminLoading", payload: true });
    // 70 91 1870

    var adminToken = Cookies.get("ATDetails");

    // if (
    //   window.location.host === "localhost:3000" ||
    //   window.location.host === "localhost:3001"
    // ) {
    //   adminToken = "eab4e66ebc6f424bf03d9b4c712a74ce";
    // }

    if (typeof adminToken != typeof undefined) {
      dispatchAccount({ type: "setAdminToken", payload: adminToken });
      dispatchAccount({ type: "setAdmin", payload: true });
      dispatchAccount({ type: "setAdminLoading", payload: false });
    } else {
      dispatchAccount({ type: "setAdmin", payload: false });
      dispatchAccount({ type: "setAdminLoading", payload: false });
    }
    dispatchAccount({ type: "setLoading", payload: true });
    _axios
      .get(buildLink("login", undefined, window.innerWidth))
      .then((response) => {
        const data = response.data;

        dispatchAccount({ type: "setShowOver", payload: false });
        if (data.customer_id > 0) {
          dispatchAccount({ type: "setLoged", payload: true });
          dispatchAccount({ type: "setUsername", payload: data.username });
          dispatchAccount({ type: "setUserId", payload: data.customer_id });
        } else {
          dispatchAccount({ type: "setLoged", payload: false });
        }
        dispatchAccount({ type: "setLoading", payload: false });
        if (
          data.seller_logged !== "0" &&
          data.seller_logged !== null &&
          data.seller_logged !== undefined
        ) {
          dispatchAccount({ type: "setSeller", payload: true });
          Cookies.set("seller_id", data.seller_logged);
        }
      });
  }, [dispatchAccount]);

  function getZones() {
    _axios
      .get(buildLink("zone", undefined, window.innerWidth) + "118")
      .then((response) => {
        setZones(response?.data?.data?.zones);
      });
  }

  const phoneHanlder = (childData, isValid) => {
    if (isValid === true) {
      telephone.current.value = childData;
      setErr("");
    } else {
      telephone.current.value = childData;
    }

    setIsValid(isValid);
  };

  // set active address from address list
  function changeAddress(address, index) {
    setActiveAddress(address);
    // const radio = document.getElementById("chosen-address"+address.address_id);
    // if(activeAddress.address_id === address.address_id){
    //   radio.setAttribute("checked", true);
    // }else{
    //   radio.setAttribute("checked", false);
    // }

    //console.log(radio)
    const obj = {
      name: address.zone,
      value: address.zone_id,
    };
    zone.current.name = address.zone;
    zone.current.id = address.zone_id;
    // if (_manual) {
    //   setTimeout(() => {
    //     manual(
    //       manualCart,
    //       obj,
    //       activePaymentMethod,
    //       false,
    //       coupon.current.value
    //     );
    //   }, 500);
    // }
  }

  return (
    <div>
      {/* address modal  */}
      {addressmenu && (
        <div className="orders-modal-container">
          <div className="address-modal block z-30 relative ">
            <div
              className="fixed top-0 left-0  bg-dblackOverlay2 w-full h-full z-40"
              onClick={() => {
                setAddressmenu(false);
                setEditAddress(false);
              }}
            >
              <GrClose className="w-8 h-8 absolute top-2.5 right-6 cursor-pointer" />
            </div>
            <form
              onSubmit={(e) => addAddress(e)}
              className="absolute address-modal mt-5 left-0 right-0  w-5000 max-w-full py-3.5 px-5 my-24 mx-auto bg-dwhite1 z-50 text-sm text-left"
            >
              <div className="address-modal__title py-2.5 px-5 -mx-5 text-d16 border-b border-dgrey3 flex justify-between items-center">
                <p>Address Update</p>
                <div className="py-1 text-d12">
                  <label htmlFor="" className="ml-2">
                    <input type="radio" name="" id="" defaultChecked />
                    <span className="ml-1">Individual</span>
                  </label>
                  <label htmlFor="" className="ml-2">
                    <input type="radio" name="" id="" />
                    <span className="ml-1">Institutional</span>
                  </label>
                </div>
              </div>
              <div className="-mx-5 border border-b border-dgrey3"></div>
              <input type="text" name="" id="" />
              <div className="title flex flex-col items-start">
                <label htmlFor="title" className="w-full mt-2.5">
                  Address *
                </label>
                <input
                  type="text"
                  name="title"
                  ref={address_1}
                  defaultValue={editAddress ? activeAddress.address_1 : ""}
                  id=""
                  placeholder="eg: home, work..."
                  className="address-modal__input"
                  style={{ maxWidth: "225px" }}
                />
              </div>
              <div className="fn-ln flex mt-2">
                <div className="w-488 mr-4 ">
                  <label htmlFor="" className="w-full top-2.5 ">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    ref={firstname}
                    id=""
                    required
                    className="address-modal__input"
                    defaultValue={stateAccount?.username}
                  />
                </div>
                <div className="w-488">
                  <label htmlFor="" className="w-full top-2.5 ">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    ref={lastname}
                    required
                    id=""
                    className="address-modal__input"
                    defaultValue={stateAccount?.username}
                  />
                </div>
              </div>
              <div className="phone-nb mt-2">
                <label htmlFor="phone" className="w-full top-2.5">
                  Mobile phone *
                </label>
                <br />
                <div className="flex">
                  <input
                    type="text"
                    name=""
                    id=""
                    value={"+961"}
                    disabled
                    className="bg-transparent w-1/12"
                  />
                  <HandlePhoneModel
                    phone={telephone}
                    phoneHanlder={phoneHanlder}
                  />
                </div>
              </div>
              <div className="zone mt-2">
                <div className="zone ">
                  <label htmlFor="" className="w-full mt-2.5">
                    Zone *
                  </label>
                  <select
                    name="zone"
                    ref={zone_id}
                    id=""
                    className="address-modal__input border border-dgrey6"
                  >
                    {zones?.map((zone) => (
                      <option
                        value={zone.zone_id}
                        key={zone.zone_id}
                        selected={`${
                          editAddress && activeAddress.zone_id === zone.zone_id
                            ? "selected"
                            : ""
                        }`}
                      >
                        {zone.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="address mt-2 flex flex-col pb-1">
                <label htmlFor="address">More Address Details *</label>
                <textarea
                  name="address_details"
                  id=""
                  cols="30"
                  rows="10"
                  ref={address_2}
                  maxLength={256}
                  defaultValue={editAddress ? activeAddress.address_2 : ""}
                  className="address-modal__input h-24 p-2.5"
                  placeholder={
                    "Please enter your other address information such as neighborhood, street, apartment name and number."
                  }
                ></textarea>
              </div>
              <div className="-mx-5 mt-3 border-b border-dgrey3"></div>
              <div className="address-modal-button mt-5 mb-1 text-center">
                <button
                  type="submit"
                  className="bg-dblack1 hover:bg-dblue1  w-72 mx-auto text-center h-10 bg-clip-padding text-dwhite1 text-d16 uppercase transition ease-in duration-300"
                >
                  save and continue
                </button>
              </div>
            </form>
          </div>
          <div className="modal-information text-d12"></div>
          <div className="modal-sales z-49"></div>
        </div>
      )}
      {/* end address modal */}

      {/* delete confirmation modal */}
      {deletemenu && (
        <div className="orders-modal-container">
          <div className="address-modal block z-30 relative ">
            <div
              className="fixed top-0 left-0  bg-dblackOverlay2 w-full h-full z-40"
              onClick={() => setDeletemenu(false)}
            >
              <div className="py-10 ">
                <div className="container">
                  <div className="w-80 top-36 h-auto bg-dwhite1 relative overflow-hidden mx-auto z-50 ">
                    <GrClose
                      className="w-4 h-4 absolute top-2.5 right-2.5 cursor-pointer"
                      onClick={() => setDeletemenu(false)}
                    />
                    <div className="border-b border-dgrey7 py-5 mb-7 leading-5">
                      <span className="title inline-block align-middle text-center w-full text-lg font-semibold">
                        WARNING
                      </span>
                    </div>
                    <div className="h-auto inline-block w-full relative overflow-x-hidden">
                      <div
                        className="mb-3.5 text-center px-5 text-sm"
                        style={{ minHeight: "35px" }}
                      >
                        Are you sure you want to delete the address?
                      </div>
                    </div>
                    <div className="flex mx-auto text-center uppercase items-center justify-between mb-4">
                      <button
                        className="w-1/3 m-auto py-1 px-3 mb-2.5 text-center h-10 bg-clip-padding bg-dblue1 text-dwhite1 text-d15 uppercase hover:bg-dblack2 transition duration-300 ease-in"
                        onClick={() =>
                          deleteAddress(
                            activeAddress,
                            activeAddress?.address_id
                          )
                        }
                      >
                        delete
                      </button>
                      <button
                        className="w-1/3 m-auto py-1 px-3 mb-2.5 bg-dwhite1 h-10 border border-dblue1 text-dblack2 uppercase"
                        onClick={() => setDeletemenu(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* end delete confirmation modal */}

      <div className="checkout-viewport -mt-9 bg-dgrey10">
        <div className="container overflow-hidden">
          <div className="mt-7 -mx-1 flex flex-col md:flex-row">
            {/* <div className='w-full notify'></div> */}
            <div className="w-2/3 mr-5">
              <div className="">
                <div className="checkout-tabs flex justify-between bg-dwhite1 cursor-pointer">
                  <div className="bg-dblue1 text-dwhite1 pt-3.5 pr-12 pb-14 pl-3.5 relative w-1/2">
                    <div className="text-d16 font-mono tracking-wide mb-2.5 uppercase flex items-center">
                      <span className="text-dblack2 bg-dwhite1 font-semibold text-d13 border border-dblack2 py-1 px-2 rounded-full mr-2">
                        1
                      </span>
                      <p>ADDRESS & CARGO INFORMATION</p>
                    </div>

                    {addresses.length < 1 ? (
                      <div className="text-left text-sm">
                        Please select a delivery address.
                      </div>
                    ) : (
                      <div className="text-left">
                        <div className="checkout-address-line-desc line-clamp-3 text-sm">
                          <p>
                            {activeAddress?.address_2} {activeAddress?.zone}{" "}
                            {activeAddress?.postcode}
                          </p>
                        </div>
                        <div className="text-sm">
                          <p>Tel: {activeAddress?.telephone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className="pt-3.5 pr-12 pb-14 pl-3.5 relative w-1/2"
                    style={{ minWidth: "120px" }}
                  >
                    <div className="text-d16 font-mono mb-2.5 uppercase flex items-center">
                      <span className="text-dblack2 bg-dwhite1 font-semibold text-d13 border border-dblack2 py-1 px-2 rounded-full mr-2">
                        2
                      </span>
                      <p>payment options</p>
                    </div>
                    <div className="text-left text-sm">
                      You can safely make your payment by bank or credit card.
                    </div>
                  </div>
                </div>
                <div className="checkout-tabs-content bg-dwhite1">
                  <div className="checkout-tab-address border border-dgrey3">
                    <div className="address-delivery-tab">
                      <div className="address-content flex">
                        <div className="bg-dwhite1 w-2/3">
                          <div className="text-d16 py-3.5 px-7 text-dblack2 border-b border-dgrey3 flex items-center justify-between">
                            <div className="uppercase">Delivery address</div>
                            <div className="text-dblack2 text-d14">
                              <label htmlFor="">
                                <input
                                  type="checkbox"
                                  name=""
                                  id=""
                                  defaultChecked
                                />
                                <span className="align-baseline ml-1">
                                  Same as my billing address
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="checkout-address px-5">
                            <div className="my-6 mx-1 flex justify-between items-center text-sm">
                              Please select a delivery address.
                            </div>
                            <div className="-mx-1">
                              <div></div>
                              <div className="flex flex-wrap">
                                {addresses?.map((addr, index) => (
                                  <div className="w-488 mr-2.5">
                                    <div
                                      className={`bg-dwhite1  p-5 h-44 mb-4 relative transition ease-in duration-200 hover:border-2 hover:border-dblue1 hover:shadow-lg cursor-pointer overflow-hidden
                                      ${
                                        activeAddress === addr
                                          ? "border-2 border-dblue1"
                                          : "border border-dgrey3 opacity-50"
                                      }`}
                                      onClick={() => {
                                        changeAddress(addr, index);
                                      }}
                                    >
                                      <input
                                        type="radio"
                                        name="chosen-address"
                                        id={`chosen-address${addr.address_id}`}
                                        checked={`${
                                          activeAddress === addr
                                            ? "checked"
                                            : ""
                                        }`}
                                      />
                                      <span className="uppercase ml-2.5 leading-6 text-d16">
                                        ADDRESS YOU CHOOSE
                                      </span>
                                      <div className="checkout-address-text text-dblack1 mt-2.5 text-ellipsis overflow-hidden text-left">
                                        <p className="font-bold">
                                          {addr?.firstname}
                                        </p>
                                        <div className="checkout-address-line-desc line-clamp-3 text-sm">
                                          <p>
                                            {addr?.address_2} {addr?.zone}{" "}
                                            {addr?.postcode}
                                          </p>
                                        </div>
                                        <div className="text-sm">
                                          <p>Tel: {addr?.telephone}</p>
                                        </div>
                                      </div>
                                      <div className="text-right text-xs">
                                        <u
                                          className="mr-4"
                                          onClick={() => setDeletemenu(true)}
                                        >
                                          delete
                                        </u>
                                        <span>|</span>
                                        <u
                                          onClick={() => {
                                            getZones();
                                            setAddressmenu(true);
                                            setEditAddress(true);
                                          }}
                                          className="inline-block mt-2.5 text-dblue1 ml-4"
                                        >
                                          edit
                                        </u>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <div className="w-488">
                                  <div
                                    className="bg-dwhite1 border border-dgrey3 p-5 h-44 mb-4 relative transition ease-in duration-200 hover:border-2 hover:border-dblue1 hover:p-2.5 hover:shadow-lg cursor-pointer"
                                    onClick={() => {
                                      getZones();
                                      setAddressmenu(true);
                                    }}
                                  >
                                    <div className="absolute top-1/2 right-5 left-16 -translate-y-1/2 text-d14 text-center text-dblack2 flex items-center">
                                      <GoPlus className="w-4 h-4 mr-1" />
                                      <p>create new address</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="w1/2 hidden px-2 ">
                                <Link>
                                  <input
                                    type="radio"
                                    name=""
                                    id=""
                                    defaultChecked
                                  />
                                  <div className="text-dblack2 relative left-0 top-12 -translate-y-1/2 font-bold text-d14"></div>
                                </Link>
                              </div>
                            </div>
                            <div className="hidden"></div>
                          </div>
                        </div>
                        <div className="bg-dwhite1 w-1/3 border-l border-dgrey3">
                          <form className="opacity-30">
                            <div className="text-d16 py-3.5 px-7 text-dblack2 uppercase borer-b border-dgrey3">
                              {" "}
                              Cargo company
                            </div>
                            <div className="px-5"></div>
                            <div className="checkout-error text-left whitespace-nowrap mb-2.5 px-5 mt-1 text-dred4 text-d12"></div>
                            <div className="py-2.5 px-3.5 mb-5">
                              <button
                                className="text-d14 tracking-tight uppercase mt-3.5 h-11 text-center w-full bg-dblue1 text-dwhite1 flex items-center justify-center hover:bg-dblack1 transition ease in duration-300"
                                disabled
                              >
                                <span>SAVE AND CONTINUE</span>
                                <BsChevronRight className="w-3 h-3 ml-0.5" />
                              </button>
                            </div>
                          </form>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <div className="shop-delivery-tab"></div>
                  </div>
                  <div className="checkout-tab-payment hidden"></div>
                  <div className="checkout-contract py-5 bg-dgrey3">
                    <div className="bg-dwhite1 border border-dgrey3 p-3.5 flex flex-col items-center hidden"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div>
                <div className="analytics-data hidden"></div>
                <div className="checkout-summary border border-dgrey3 bg-dwhite1">
                  <div className="summary-wrapper py-3.5 px-6 relative bg-dwhite1">
                    <div className="checkout-sum">
                      <div className="summary-title text-d16 text-dblack1 border-b-0 flex items-center">
                        <p>ORDER SUMMARY</p>
                        <span className="text-d14 font-light mx-1">
                          {state?.productsCount} Items
                        </span>
                      </div>
                      <div className="checkout-summary-items table w-full">
                        <div className="summary-items-wrapper h-48 overflow-y-auto mt-5">
                          <div className="summary-items">
                            {state?.products?.map((product) => (
                              <div
                                className="summary-product-item flex items-center mb-2.5"
                                key={product?.product_id}
                              >
                                <div className="summary-product-item-image w-20 mb-2.5 table-cell align-top pr-1">
                                  <img
                                    src={product?.thumb}
                                    alt={product?.name}
                                  />
                                </div>
                                <div className="summary-product-item-info text-d12 table-cell align-top pr-1">
                                  <div className="text-left">
                                    <Link to={``}>{product?.name}</Link>
                                  </div>
                                  <div className="summary-product-item-count hidden"></div>
                                </div>
                                <div className="summary-product-item-price hidden text-right text-d14 align-top pr-1"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="summary-list table w-full py-5">
                          <div className="summary-item flex justify-between font-mono text-d15 text-dblack2">
                            <div>Total of {state?.productsCount} Items</div>
                            <div>{state?.totals["1"]?.text}</div>
                          </div>
                          <div className="hidden"></div>
                          <div className="discount flex justify-between text-dblue2">
                            <div className="table-cell text-sm text-dblue1 font-mono">
                              Free Shipping for 200 TL and Over
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="total-area border-t border-dgrey3 pt-6 inline-block w-full">
                        <p className="text-d14 text-dblack1 flex justify-between font-mono">
                          <span>Amount to be paid</span>
                          <span>{state?.totals["1"]?.text}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden mx-6 bg-dwhite1 border-t border-dgrey3"></div>
                </div>
              </div>
              <div
                className="hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dwhite1 border border-dgrey3 z-10"
                style={{ width: "490px" }}
              >
                <div className="gift-form-title h-14 bg-dwhite1 text-d14 font-semibold text-left text-dborderblack2 relative border-b border-dgrey4 pl-7 leading-10"></div>
                <div className="gift-form-body"></div>
              </div>
              <div className="gift-form"></div>
            </div>
          </div>
        </div>
        <div className="container"></div>
        <div></div>
      </div>
    </div>
  );
}

export default Checkout;
