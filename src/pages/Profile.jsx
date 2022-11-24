import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import VerticalNav from "../components/VerticalNav"
export default function Profile() {
  const [stateAccount, dispatchAccount] = useContext(AccountContext);

  return (
    <div className="container">
      <div className="flex py-5 bg-dyellow2 my-5 mx-12">
        <div className="w-1/3"></div>
        <div className="flex flex-col w-full items-center">
          <span className="text-d14 font-light">MY ACCOUNT</span>{" "}
          <span className="mt-1">hello {stateAccount.username}</span>
        </div>
        <div className="w-1/3 mt-3">
          {" "}
          <Link to="/" className="text-d14 underline underline-offset-1">
            continue to Shopping{" "}
          </Link>
        </div>
      </div>
      <div className="flex">
        <div className="w-4/12"><VerticalNav /></div>
        <div className="w-8/12 p-1">
          <div classname="flex left-0	">
            <div className="text-d18 w-full" >my profile</div>
            <div className="text-d18 w-full" >Name </div>
            <input className="bg-white text-left" />
            <div className="text-d18" >Surname </div>
            <input className="bg-white"  />
            <div className="text-d18" >Telephone</div>
            <input  className="bg-white" />
            <div className="text-d18" >Date of birth</div>
            <input className="bg-white"  />
            <div className="text-d18" ><input type="radio" /> I do not want to specify</div>


          </div>
        </div>
      </div>
    </div>
  );
}
