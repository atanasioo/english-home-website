import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import VerticalNav from "../components/VerticalNav"
import _axios from "../axios";
import buildLink from "../urls";
import { FaDigitalTachograph } from "react-icons/fa";
export default function Profile() {


  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [data, setData]= useState()

  const fnameRef = useRef("")
  const lnameRef = useRef('')
  const phoneRef = useRef('')

useEffect(()=>{
 
  _axios
  .get(buildLink("get_account", undefined, window.innerWidth))
  .then((response) => {
    if (!response.data.success) {
  
    } else {
     setData(response?.data?.data)
    }
  });
},[window.location.href])

function saveDetails(event){

  event.preventDefault()

  var obj= {
    firstname: fnameRef.current.value,
    lastname: lnameRef.current.value,
    phone: phoneRef.current.value,
    email: data.email
  }

  _axios
  .put(buildLink("save_account", undefined, window.innerWidth), obj)
  .then((response) => {
   return;
  });
}
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
        <form  onSubmit={(e) => saveDetails(e)}>

          <div classname="flex text-left	text-d12 border border-1 ">
            <div className="text-d18 w-full text-left py-2" >my profile</div>
            <div className="text-d12 w-full text-left py-2" >Name </div>
            <div className="text-d12 w-full text-left" ><input type="text" className="bg-white text-left w-5/12 p-2  border" ref={fnameRef} defaultValue={data?.firstname}  /></div>
            <div className="text-d12 text-left py-2" >Surname </div>
            <div className="text-d12 w-full text-left" ><input className="bg-white text-left w-5/12 p-2  border" ref={lnameRef} defaultValue={data?.lastname} /></div>
            <div className="text-d12 text-left py-2" >Telephone</div>
            <div className="text-d12 w-full text-left" ><input className="bg-white text-left w-5/12 p-2  border" ref={phoneRef} defaultValue={data?.telephone} /></div>
            {/* <div className="text-d12 text-left py-2" >Date of birth</div>
            <div className="text-d12 w-full text-left" ><input className="bg-white text-left w-5/12 p-2 border" /> </div>
            <div className="text-d12 text-left p-2 border bg-white w-1/4" ><input type="radio" /> I do not want to specify</div>
            <div className="flex text-d12 text-left py-3 h-12" > Gender   <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div>women <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div> men <div className="mt-0.5 mx-1" ><input type="radio" name="gender" className="bg-white text-left  border" /></div> I do Not Want To Specify</div> */}
            <div className="text-d12 text-left py-2" ><button className="bg-black text-white px-10 py-2 text-d15 mt-1">SEND</button></div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
