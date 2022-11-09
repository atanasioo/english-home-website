import { useEffect, useState, useContext, useRef } from "react";
import { AccountContext } from "../contexts/AccountContext";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import Cookies from "js-cookie";

function TopAccount() {
  const [state, dispatch] = useContext(AccountContext);
  const [showmenu, setShowmenu] = useState(false);
 // console.log(state);
  return (
    <div className="relative">
      <Link
        className="header__user__auth__link"
        onMouseEnter={() => setShowmenu(true)}
        onMouseLeave={() => setShowmenu(false)}
      >
        <div className="h-9 w-6 md:w-10 leading-8 mx-auto md:border md:border-dblue1 text-dbasenavy md:text-dblue1 hover:text-dwhite1 hover:bg-dblue1 flex justify-center items-center mb-1">
          <FiUser className="h-5 w-5 md:h-6 md:w-6 " />
        </div>
        <span className="header__icons-text whitespace-nowrap hidden md:block mt-1.5 text-d11">
          {state.loged ? <p>Profile</p> : <p>My Account</p>}
        </span>
      </Link>
      {/* not logged hover div */}
      {showmenu && !state.loged && (
        <div
          className="header__auth__menu-inner absolute -mt-0.5 -right-16 bg-dwhite1 w-60  p-5 z-10 shadow-lg border border-dgrey5 flex flex-col"
          onMouseEnter={() => setShowmenu(true)}
          onMouseLeave={() => setShowmenu(false)}
        >
          <Link className="cursor-pointer bg-dblue1 hover:bg-dblack2 text-dwhite1 border border-dborderblack3 text-center p-1 mb-1.5 text-sm font-mono">
            LOGIN
          </Link>
          <Link className="cursor-pointer bg-dwhite1 text-dblue1 hover:text-dblack2 border border-dborderblack3 text-center p-1 mb-1.5 text-sm font-mono">
            SIGN UP
          </Link>
        </div>
      )}
      {/* logged in hover div */}
      {showmenu && state.loged && (
        <div className="header__auth__menu-inner absolute z-10 -right-12 bg-dwhite1 w-72 text-left top-full flex flex-col"
          onMouseEnter={() => setShowmenu(true)}
          onMouseLeave={() => setShowmenu(false)}
        >
          <div className="text-dborderblack3 bg-dgrey7 h-12 pt-1 px-3.5 leading-10 text-d15">
            {state?.username}
          </div>
          <Link
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My Account
          </Link>
          <Link
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My Orders
          </Link>
          <Link
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My User Information
          </Link>
          <Link
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My Discount Coupons
          </Link>
          <Link
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My Address Information
          </Link>
          <Link
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            Help
          </Link>
          <Link
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all bg-dgrey7"
          >
            Log out
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopAccount;
