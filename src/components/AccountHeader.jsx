import React from "react";
import { Link } from "react-router-dom";

function AccountHeader(props) {
  return (
    <div className="header-container -mx-1">
      <div className="w-full">
        <div className="account-header text-center h-24 py-5 bg-dbeige">
          <p className="text-d14">MY ACCOUNT</p>
          <p className="capitalize text-d20">Hello {props?.stateAccount.username}</p>
          <Link
            to={"/"}
            className="text-sm underline  md:float-right p-1 px-6 -mt-10"
          >
            continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccountHeader;
