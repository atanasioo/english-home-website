import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import { BsPlusCircleFill } from "react-icons/bs";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { GrClose } from "react-icons/gr";
import HandlePhoneModel from "../components/PhoneHandler";
import PhoneHandler from "../components/PhoneHandler";
import VerticalNav from "../components/VerticalNav";
import Loader from "../components/Loader";
import AccountHeader from "../components/AccountHeader";
import AddressCard from "../components/addressCard";

function Addresses() {
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState([]);
  const [addressmenu, setAddressmenu] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [activeAddress, setActiveAddress] = useState({});
  const [deletemenu, setDeletemenu] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [phoneValidate, setphoneValidate] = useState("");
  const [err, setErr] = useState(false);
  const [zones, setZones] = useState([]);
  const [accountData, setAccountData] = useState([]);

  const navigate = useNavigate();

  //user details
  const firstname = useRef("");
  const lastname = useRef("");
  const address_1 = useRef("");
  const address_2 = useRef("");
  const telephone = useRef("");
  const coupon = useRef("");
  const zone_id = useRef("");

  const country_id = window.config["zone"];
  const city = "";
  const postcode = "";
async function getAdresses(){
  _axios
  .get(buildLink("address", undefined, window.innerWidth))
  .then((response) => {
    if (response.data.success) {
      setAddresses(response.data.data);
      setLoading(false);
    } else {
      dispatchAccount({ type: "setLoading", payload: false });
      if (!stateAccount.loading && !stateAccount.loged) {
        navigate("/");
      }
    }
  });
}
  useEffect(() => {
  getAdresses();

    _axios
      .get(buildLink("get_account", undefined, window.innerWidth))
      .then((response) => {
        if (response.data.success) {
          setAccountData(response?.data?.data);
        }
      });
  }, [dispatchAccount, stateAccount.loged]);

  console.log(addresses);

  function addAddress(e) {
    e.preventDefault();
    console.log(window.config["zone"])
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
    if (editAddress) {
      _axios
        .put(
          buildLink("address", undefined, window.innerWidth) +
            "&address_id=" +
            activeAddress.address_id,
          obj
        )
        .then((response) => {
          if (response.data.success) {
            setAddressmenu(false);
            setEditAddress(false);
            window.location.reload();
          }
        });
    } else {
      _axios
        .post(buildLink("address", undefined, window.innerWidth), obj)
        .then((response) => {
          if (response.data.success) {
            setAddressmenu(false);
            window.location.reload();
            // setMessage(
            //   "Address Added Successfully, you will be redirected to addresses page."
            // );
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
          //window.location.reload();
        });
    }
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

  function getZones() {
    _axios
      .get(buildLink("zone", undefined, window.innerWidth) + "118")
      .then((response) => {
        setZones(response?.data?.data?.zones);
      });
  }

  return (
    <div>
      {/* address modal  */}
      {addressmenu && (
        <div className="orders-modal-container">
          <div className="address-modal block z-30 relative -top-16">
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
              className="fixed md:absolute address-modal mt-5 left-0 right-0  w-11/12 md:w-5000 max-w-full py-3.5 px-5 my-24 mx-auto bg-dwhite1 z-50 text-sm text-left"
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
                    defaultValue={`${
                      editAddress
                        ? activeAddress.firstname
                        : stateAccount?.username
                    }`}
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
                    defaultValue={`${
                      editAddress
                        ? activeAddress.lastname
                        : stateAccount?.username
                    }`}
                  />
                </div>
              </div>
              <div className="phone-nb mt-2">
                <label htmlFor="phone" className="w-full top-2.5">
                  Mobile phone *
                </label>
                <br />
                <div className="flex items-center">
                  <input
                    type="text"
                    name=""
                    id=""
                    value={"+961"}
                    disabled
                    className="bg-transparent w-1/6 md:w-1/12 mt-1 "
                  />
                  <PhoneHandler
                    phone={telephone}
                    nb={`${
                      editAddress ? activeAddress?.telephone.substring(3) : ""
                    }`}
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
      {/* {addresses.length === 0 ? (
        <Loader />
      ) : ( */}
        <div className="bg-dgrey10">
          <div className="container py-5">
            {/* <div className="header-container -mx-1">
              <div className="w-full">
                <div className="account-header text-center h-24 py-5 bg-dbeige">
                  <p className="text-d14">MY ACCOUNT</p>
                  <p className="capitalize text-d20">
                    Hello {stateAccount?.username}
                  </p>
                  <Link
                    to={"/"}
                    className="text-sm underline  md:float-right p-1 px-6 -mt-10"
                  >
                    continue shopping
                  </Link>
                </div>
              </div>
            </div> */}
            <AccountHeader stateAccount = {stateAccount} />
            <div className="-mx-1 flex flex-col md:flex-row">
              <div className="hidden md:block w-full md:w-1/4 mt-6  text-left font-mono text-xs">
                <VerticalNav />
              </div>
              <div className="w-full md:w-3/4 mt-7 md:mt-0">
                <div className="account-address mt-8">
                  <div className="hidden"></div>
                  <div className="w-full md:w-1/3 px-2.5">
                        <div className="account-container-box mb-8 h-72 border border-dgrey5 bg-clip-padding">
                          <div className="add-button-wrapper relative">
                            <div className="absolute -top-6 m-auto left-1/2 -translate-x-1/2 text-dgrey6">
                              <BsPlusCircleFill className="w-11 h-11 " />
                            </div>
                          </div>
                          <div className="container-box-desc text-center pt-36 pb-24">
                            <u
                              onClick={() => {
                                getZones();
                                setAddressmenu(true);
                              }}
                              className="text-dgreen text-sm cursor-pointer"
                            >
                              Add a new address
                            </u>
                          </div>
                        </div>
                      </div>
                  <div className="account-address-context">
                    <div className="-m-1 flex  flex-wrap">
                      {addresses?.map((address, index) => (
                        <AddressCard getAddresses={getAdresses} address={address} index={index} setActiveAddress={setActiveAddress} setAddressmenu={setAddressmenu} getZones={getZones} setEditAddress={setEditAddress} setDeletemenu={setDeletemenu} />
                      ))}
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default Addresses;

