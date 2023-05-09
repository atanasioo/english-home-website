import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import VerticalNav from "../components/VerticalNav";
import _axios from "../axios";
import buildLink from "../urls";
import { FaDigitalTachograph } from "react-icons/fa";
import PhoneHandler from "../components/PhoneHandler";
import ChangePassword from "./ChangePassword";
import Loader from "../components/Loader";
import AccountHeader from "../components/AccountHeader";
export default function Profile() {
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const [isvalid, setIsValid] = useState();

  const fnameRef = useRef("");
  const lnameRef = useRef("");
  const phoneRef = useRef("");

  const navigate = useNavigate();

  console.log(stateAccount.loged);

  useEffect(() => {
    _axios
      .get(buildLink("get_account", undefined, window.innerWidth))
      .then((response) => {
        if (!response.data.success) {
          dispatchAccount({ type: "setLoading", payload: false });
          if (!stateAccount.loading && !stateAccount.loged) {
            navigate("/");
          }
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

  function saveDetails(event) {
    event.preventDefault();

    var obj = {
      firstname: fnameRef.current.value,
      lastname: lnameRef.current.value,
      telephone: phoneRef.current.value,
      email: data.email,
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

  function disabledAccount(e) {
    e.preventDefault();
    _axios
      .post(buildLink("disabledAccount", undefined, window.innerWidth))
      .then((response) => {
        if (response.data.success) {
          logout();
          window.location.href = "/";
        }
      });
  }

  function logout() {
    _axios.post(buildLink("logout")).then(() => {});
  }


  return (
    <div>
      {!data ? (
        <Loader />
      ) : (
        <>
          <div
            className={` bg-dgrey10 pt-5  ${
              window.innerWidth < 650 ? "px-0" : "px-12"
            }`}
          >
            
            <AccountHeader stateAccount={stateAccount} />
            <div className="flex mt-2">
              {window.innerWidth > 650 && (
                <div className="">
                  <VerticalNav />
                </div>
              )}
              <div
                className={`  ${
                  window.innerWidth < 650 ? "w-full" : "w-full"
                }`}
              >
                <form onSubmit={(e) => saveDetails(e)}>
                  <div className="flex flex-col md:flex-row  p-10 text-d12 border border-1 w-full">
                    <div className="profile-div md:w-1/2 text-left">
                      <div className="text-d20 w-full text-left py-2 capitalize">
                        my profile
                      </div>
                      <div className="text-d14 w-full text-left pt-3 pb-1">
                        First Name{" "}
                      </div>
                      <div className="text-d12 w-full text-left">
                        <input
                          type="text"
                          className={` bg-white text-left p-2  border ${
                            window.innerWidth < 650 ? "w-full" : "w-3/5"
                          }`}
                          ref={fnameRef}
                          defaultValue={data?.firstname}
                        />{" "}
                        <div classname="text-dred2">
                          {error?.errorCode === "firstname" && error.errorMsg}
                        </div>
                      </div>

                      <div className="text-d14 text-left pt-3 pb-1">
                        Last Name{" "}
                      </div>

                      <div className="text-d12 w-full text-left">
                        <input
                          className={` bg-white text-left p-2  border ${
                            window.innerWidth < 650 ? "w-full" : "w-3/5"
                          }`}
                          ref={lnameRef}
                          defaultValue={data?.lastname}
                        />{" "}
                        <div className="text-dred2">
                          {error?.errorCode === "lastname" && error.errorMsg}
                        </div>
                      </div>
                      <div className="text-d14 text-left pt-3 pb-1">
                        Telephone
                      </div>
                      <div
                        className={` text-left  text-d12  ${
                          window.innerWidth < 650 ? "w-full" : "w-3/5"
                        }`}
                      >
                        <PhoneHandler
                          phone={phoneRef}
                          nb={data?.telephone ? data?.telephone : ""}
                          phoneHanlder={phoneHanlder}
                        />{" "}
                        <div classname="text-dred2">
                          {error?.errorCode === "telephone" && error.errorMsg}
                        </div>
                      </div>
                      <div className="text-d12 text-center md:text-left py-2 mt-4">
                        <button className="bg-black text-white px-10 py-2 text-d15 mt-1">
                          SEND
                        </button>
                      </div>
                    </div>
                    <div className="delete-account-div mt-3 md:mt-0 flex flex-col md:flex-row md:w-1/2 text-center md:border-l">
                      <div className="text-d20 w-full py-2 capitalize"  >
                        Account Deletion 
                      </div>
                      <div>
                        <button className="bg-black text-white px-10 py-2 text-d14 mt-1 whitespace-nowrap" onClick={(e) => disabledAccount(e)}>DELETE MY ACCOUNT</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
