import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import VerticalNav from "../components/VerticalNav"
export default function Profile() {
  const [stateAccount, dispatchAccount] = useContext(AccountContext);

  return (
    <div className="relative -top-2 bg-dgrey10 pt-5 px-12">
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
        <div className="w-"><VerticalNav /></div>
        <div className="w-8/12 p-10 border">
          <div classname="flex text-left	text-d12 border border-1 ">
            <div className="text-d18 w-full text-left py-2" >my profile</div>
            <div className="text-d12 w-full text-left py-2" >Name </div>
            <div className="text-d12 w-full text-left" ><input className="bg-white text-left w-5/12 p-2  border" /> </div>
            <div className="text-d12 text-left py-2" >Surname </div>
            <div className="text-d12 w-full text-left" ><input className="bg-white text-left w-5/12 p-2  border" /> </div>
            <div className="text-d12 text-left py-2" >Telephone</div>
            <div className="text-d12 w-full text-left" ><input className="bg-white text-left w-5/12 p-2  border" /> </div>
            <div className="text-d12 text-left py-2" >Date of birth</div>
            <div className="text-d12 w-full text-left" ><input className="bg-white text-left w-5/12 p-2 border" /> </div>
            <div className="text-d12 text-left p-2 border bg-white w-1/4" ><input type="radio" /> I do not want to specify</div>
            <div className="flex text-d12 text-left py-3 h-12" > Gender   <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div>women <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div> men <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div> I do Not Want To Specify</div>
            <div className="text-d12 text-left py-2" ><button className="bg-black text-white px-2 py-1">Save</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}
