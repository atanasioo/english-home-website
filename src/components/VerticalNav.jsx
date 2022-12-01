import React from "react";
import { Link } from "react-router-dom";

export default function VerticalNav() {
  return (
      <div className="py-2.5 text-d12 text-left font-mono pr-5">
        <div className="mb-7">
          <span className="font-semibold text-sm mb-1 block">my orders</span>
          <ul className="pb-7 border-b border-dgrey5 capitalize">
            <li className="leading-7">
              <Link to={"/account/orders"}>All My Orders</Link>
            </li>
          </ul>
        </div>
        <div className="mb-7">
          <span className="font-semibold text-sm mb-1 block">
            My Profile / Personal Information
          </span>
          <ul className="pb-7 border-b border-dgrey5 capitalize">
            <li className="leading-7">
              <Link to={"/account/profile"}>my profile</Link>
            </li>
            <li className="leading-7">
              <Link to={"/account/addresses"}>Address book</Link>
            </li>
            <li className="leading-7">
              <Link to="../account/change-email">Change Email</Link>
            </li>
            <li className="leading-7">
              <Link to="../account/change-password/">Change Password</Link>
            </li>
          </ul>
        </div>
        {/* <div className="mb-7">
          <span className="font-semibold text-sm mb-1 block">My deals</span>
          <ul className="pb-7 border-b border-dgrey5 capitalize">
            <li className="leading-7">
              <Link>Discount Coupons</Link>
            </li>
          </ul>
        </div> */}
        <div className="mb-7 font-bold leading-7 capitalize">
          <Link 
            to={"/information/11"}
            className="hover:underline cursor-pointer">
            Frequently Asked questions
          </Link>
          <p className="hover:underline cursor-pointer">log out</p>
        </div>
      </div>
  );
}
