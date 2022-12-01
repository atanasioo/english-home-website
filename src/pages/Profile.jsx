import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import VerticalNav from "../components/VerticalNav";
import _axios from "../axios";
import buildLink from "../urls";
import { FaDigitalTachograph } from "react-icons/fa";
import PhoneHandler from "../components/PhoneHandler";
import ChangePassword from "./ChangePassword";
export default function Profile() {
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const [isvalid, setIsValid] = useState();

  const fnameRef = useRef("");
  const lnameRef = useRef("");
  const phoneRef = useRef("");

  useEffect(() => {
    _axios
      .get(buildLink("get_account", undefined, window.innerWidth))
      .then((response) => {
        if (!response.data.success) {
        } else {
          setData(response?.data?.data);
        }
      });
  }, [window.location.href]);

  const phoneHanlder = (childData, isValid) => {
    if (isValid === true) {
      phoneRef.current.value = childData;
    } else {
      phoneRef.current.value = childData;
    }

    setIsValid(isValid);
  };

  console.log(data);

  function saveDetails(event) {
    event.preventDefault();

    var obj = {
      firstname: fnameRef.current.value,
      lastname: lnameRef.current.value,
      telephone: phoneRef.current.value,
      email: data.email
    };

    _axios
      .put(buildLink("save_account", undefined, window.innerWidth), obj)
      .then((response) => {
        if (!response.data.success) {
          setError(response?.data?.errors[0]);
        } else {
          setError("");
        }
      });
  }
  return (
    <div>
    <div className={`relative -top-2 bg-dgrey10 pt-5  ${window.innerWidth < 650 ? 'px-0' : 'px-12'}`}>
      <div className={`flex py-5 bg-dyellow2 my-5  ${window.innerWidth < 650 ? 'mx-0' : 'mx-12'}`}>
        <div  className={`flex py-5 bg-dyellow2 my-5  ${window.innerWidth < 650 ? 'hidden' : 'w-1/3'}`}></div>
        <div className="flex flex-col w-full items-center">
          <span className="text-d14 font-light">MY ACCOUNT</span>{" "}
          <span className="mt-1">hello {stateAccount.username}</span>
          <div className="xs:block w-full  mt-2">
          {" "}
          <Link to="/" className="text-d14 underline underline-offset-1">
            continue to Shopping{" "}
          </Link>
        </div>

        </div>
        {window.innerWidth > 650 && (
        <div className="w-1/3 xs:hidden mt-3">
          {" "}
          <Link to="/" className="text-d14 underline underline-offset-1">
            continue to Shopping{" "}
          </Link>
        </div>
          )}
      </div>
      <div className="flex">
        {window.innerWidth > 650 && (
          <div className="">
            <VerticalNav />
          </div>
      
      )}
        <div className={` p-10 border ${window.innerWidth < 650 ? 'w-full' : 'w-8/12'}`}>
          <form onSubmit={(e) => saveDetails(e)}>
            <div classname="flex text-left	text-d12 border border-1 ">
              <div className="text-d18 w-full text-left py-2">my profile</div>
              <div className="text-d12 w-full text-left pt-3 pb-1">Name </div>
              <div className="text-d12 w-full text-left">
                <input
                  type="text"
                  className={` bg-white text-left p-2  border ${window.innerWidth < 650 ? 'w-full' : 'w-5/12'}`}
                  ref={fnameRef}
                  defaultValue={data?.firstname}
                />{" "}
                <div classname="text-dred2">
                  {error?.errorCode === "firstname" && error.errorMsg}
                </div>
              </div>

              <div className="text-d12 text-left pt-3 pb-1">Surname </div>

              <div className="text-d12 w-full text-left">
                <input
                  className={` bg-white text-left p-2  border ${window.innerWidth < 650 ? 'w-full' : 'w-5/12'}`}
                  ref={lnameRef}
                  defaultValue={data?.lastname}
                />{" "}
                <div className="text-dred2">
                  {error?.errorCode === "lastname" && error.errorMsg}
                </div>
              </div>
              <div className="text-d12 text-left pt-3 pb-1">Telephone</div>
              <div className={` text-left  text-d12  ${window.innerWidth < 650 ? 'w-full' : 'w-5/12'}`}
>
                {/* <input className="bg-white text-left w-5/12 p-2  border" ref={phoneRef} defaultValue={data?.telephone} /> */}
                <PhoneHandler
                  phone={phoneRef}
                  nb={data?.telephone ? data?.telephone : ""}
                  phoneHanlder={phoneHanlder}
                />{" "}
                <div classname="text-dred2">
                  {error?.errorCode === "telephone" && error.errorMsg}
                </div>
              </div>
              {/* <div className="text-d12 text-left py-2" >Date of birth</div>
            <div className="text-d12 w-full text-left" ><input className="bg-white text-left w-5/12 p-2 border" /> </div>
            <div className="text-d12 text-left p-2 border bg-white w-1/4" ><input type="radio" /> I do not want to specify</div>
            <div className="flex text-d12 text-left py-3 h-12" > Gender   <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div>women <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div> men <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div> I do Not Want To Specify</div> */}
              <div className="text-d12 text-left py-2">
                <button className="bg-black text-white px-10 py-2 text-d15 mt-1">
                  SEND
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

     {window.innerWidth < 650 && 
     
     <ChangePassword />
     }

    </div>
  );
}
