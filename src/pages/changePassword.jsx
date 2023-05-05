import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import VerticalNav from "../components/VerticalNav";
import _axios from "../axios";
import buildLink from "../urls";
import { FaDigitalTachograph } from "react-icons/fa";
export default function ChangePassword() {
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [data, setData] = useState();
  const [error, setError] = useState({});

  const oldPasswordRef = useRef("");
  const newPasswordRef = useRef("");
  const confirmPasswordRef = useRef("");

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

  function saveDetails(event) {
    event.preventDefault();
    if (newPasswordRef.current.value === "") {
      setError({ new: "New Password is required" });
      return;
    }
    if (confirmPasswordRef.current.value === "") {
      setError({ confirm: "Repeat Password is required" });
      return;
    }

    if (oldPasswordRef.current.value === "") {
      setError({ old: "Old Password is required" });
      return;
    }
    console.log(
      confirmPasswordRef?.current?.value,
      newPasswordRef?.current?.value
    );
    if (confirmPasswordRef?.current?.value !== newPasswordRef?.current?.value) {
      setError({ repeat: "is not same New Password" });
      return;
    }
    var obj = {
      old_password: oldPasswordRef.current.value,
      new_password: newPasswordRef.current.value,
      confirm: confirmPasswordRef.current.value
    };
    setError({});
    _axios
      .put(buildLink("change_password", undefined, window.innerWidth), obj)
      .then((response) => {
        if (response.data.success) {
          oldPasswordRef.current.value = "";
          newPasswordRef.current.value = "";
          confirmPasswordRef.current.value = "";
        } else {
          setError(response.data.errors[0]);
        }
      });
  }
  return (
    <div
      className={`relative -top-2 bg-dgrey10 pt-5  ${
        window.innerWidth < 650 ? "px-0" : "px-12"
      }`}
    >
      <div
        className={`flex py-5 bg-dyellow2 my-5  ${
          window.innerWidth < 650 ? "mx-0" : "mx-12"
        }`}
      >
        <div
          className={`flex py-5 bg-dyellow2 my-5  ${
            window.innerWidth < 650 ? "hidden" : "w-1/3"
          }`}
        ></div>
        <div className="flex flex-col w-full items-center">
          <span className="text-d14 font-light">MY ACCOUNT</span>{" "}
          <span className="mt-1">hello {stateAccount.username}</span>
          {window.innerWidth <= 650 && (
            <Link to="/" className="text-d14 underline underline-offset-1">
              continue to Shopping{" "}
            </Link>
          )}
        </div>
        {window.innerWidth > 650 && (
          <div className="w-1/3 mt-3">
            {" "}
            <Link to="/" className="text-d14 underline underline-offset-1">
              continue to Shopping{" "}
            </Link>
          </div>
        )}
      </div>
      <div className="flex">
        {window.innerWidth > 650 && (
          <div className="w-">
            <VerticalNav />
          </div>
        )}

        <div
          className={` p-10 border  ${
            window.innerWidth < 650 ? "w-full" : "w-8/12 "
          }`}
        >
          <form onSubmit={(e) => saveDetails(e)}>
            <div classname="flex text-left	 border border-1 ">
              {window.innerWidth < 650 ? (
                <div className="text-d18 w-full text-left py-2">
                  change password
                </div>
              ) : (
                <div className=" w-full text-left py-2 text-d14">
                  Your Registered Email Address: {data?.email}
                </div>
              )}

              <div className="text-d13 text-left pt-3 pb-1">New Password </div>
              <div className="text-d13 w-full text-left">
                <input
                  className={` bg-white text-left p-2  border outline-none ${
                    window.innerWidth < 650 ? "w-full" : "w-5/12"
                  }`}
                  ref={newPasswordRef}
                />
                <div className="text-d13 w-full text-left text-dred2">
                  {error.new && error.new}
                  {error.errorCode === "new_password" && error.errorMsg}
                </div>
              </div>
              <div className="text-d13 text-left pt-3 pb-1">New Password Repeat</div>
              <div className="text-d13 w-full text-left">
                <input
                  className={` bg-white text-left p-2  border outline-none ${
                    window.innerWidth < 650 ? "w-full" : "w-5/12"
                  }`}
                  ref={confirmPasswordRef}
                />
                <div className="text-d13 w-full text-left text-dred2">
                  {error.confirm && error.confirm}
                  {error.repeat && error.repeat}
                </div>
              </div>
              <div className="text-d13 w-full text-left pt-3 pb-1"> Passowrd </div>
              <div className="text-d13 w-full text-left">
                <input
                  type="text"
                  className={` bg-white text-left p-2  border outline-none ${
                    window.innerWidth < 650 ? "w-full" : "w-5/12"
                  }`}
                  ref={oldPasswordRef}
                />
                <div className="text-d13 w-full text-left text-dred2">
                  {error.old && error.old}
                  {error.errorCode === "old_password" && error.errorMsg}
                </div>
              </div>
              <div className="text-d13 text-left py-2">
                <button className="bg-black text-white px-10 py-2 text-d15 mt-1">
                  SEND
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
