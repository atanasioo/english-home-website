import { useEffect, useState, useContext, useRef } from "react";
import { AccountContext } from "../contexts/AccountContext";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import Cookies from "js-cookie";

function TopAccount() {
  const [state, dispatch] = useContext(AccountContext);
  const [showmenu, setShowmenu] = useState(false);
  const navigate = useNavigate();
  const width = window.innerWidth;


  useEffect(() => {
    dispatch({ type: "setAdminLoading", payload: true });
    // 70 91 1870

    var adminToken = Cookies.get("ATDetails");

    // if (
    //   window.location.host === "localhost:3000" ||
    //   window.location.host === "localhost:3001"
    // ) {
    //   adminToken = "eab4e66ebc6f424bf03d9b4c712a74ce";
    // }

    if (typeof adminToken != typeof undefined) {
      dispatch({ type: "setAdminToken", payload: adminToken });
      dispatch({ type: "setAdmin", payload: true });
      dispatch({ type: "setAdminLoading", payload: false });
    } else {
      dispatch({ type: "setAdmin", payload: false });
      dispatch({ type: "setAdminLoading", payload: false });
    }
    dispatch({ type: "setLoading", payload: true });
    _axios
      .get(buildLink("login", undefined, window.innerWidth))
      .then((response) => {
        const data = response.data;

        dispatch({ type: "setShowOver", payload: false });
        if (data.customer_id > 0) {
          dispatch({ type: "setLoged", payload: true });
          dispatch({ type: "setUsername", payload: data.username });
          dispatch({ type: "setUserId", payload: data.customer_id });
        } else {
          dispatch({ type: "setLoged", payload: false });
        }
        dispatch({ type: "setLoading", payload: false });
        if (
          data.seller_logged !== "0" &&
          data.seller_logged !== null &&
          data.seller_logged !== undefined
        ) {
          dispatch({ type: "setSeller", payload: true });
          Cookies.set("seller_id", data.seller_logged);
        }
      });
  }, [dispatch]);

  // Logout
  function logout() {
    dispatch({ type: "setLoading", payload: true });
    //setShowUserMenu(false);
    _axios.post(buildLink("logout")).then(() => {
      checkLogin();
      dispatch({ type: "setSeller", payload: false });
      // Cookies.remove("seller_id");
      window.location.reload();
    });
  }

  // Check login
  function checkLogin() {
    dispatch({ type: "setLoading", payload: true });
    _axios
      .get(buildLink("login", undefined, window.innerWidth))
      .then((response) => {
        const data = response.data;

        dispatch({ type: "setShowOver", payload: false });
        if (data.customer_id > 0) {
          dispatch({ type: "setLoged", payload: true });
          dispatch({ type: "setUsername", payload: data.username });
          navigate("/");
        } else {
          dispatch({ type: "setLoged", payload: false });
        }
        dispatch({ type: "setLoading", payload: false });
      });
  }

  // console.log(state);
  return (
    <div className="relative">
      {/* {width > 650 ? ( */}
        <Link
          className="header__user__auth__link"
          onMouseEnter={() => setShowmenu(true)}
          onMouseLeave={() => setShowmenu(false)}
        >
          <div className="h-9 w-6 md:w-10 leading-8 mx-auto lg:border lg:border-dblue1 text-dbasenavy lg:text-dblue1 hover:text-dwhite1 hover:bg-dblue1 flex justify-center items-center mb-1">
            <FiUser className="h-5 w-5 lg:h-6 lg:w-6 " />
          </div>
          <span className="header__icons-text whitespace-nowrap hidden md:block mt-1.5 text-d8 font-semibold lg:font-normal lg:text-d11">
            {state.loged ? <p>Profile</p> : <p>My Account</p>}
          </span>
        </Link>
      {/* ): (
        <Link
          to={"/login"}
          className="header__user__auth__link"
        >
          <div className="h-9 w-6 md:w-10 leading-8 mx-auto md:border md:border-dblue1 text-dbasenavy md:text-dblue1 flex justify-center items-center mb-1">
            <FiUser className="h-5 w-5 md:h-6 md:w-6 " />
          </div>
          <span className="header__icons-text whitespace-nowrap hidden md:block mt-1.5 text-d11">
            {state.loged ? <p>Profile</p> : <p>My Account</p>}
          </span>
        </Link>
      )} */}

      {/* not logged hover div */}
      {showmenu && !state.loged && (
        <div
          className="header__auth__menu-inner absolute -mt-0.5 -right-16 bg-dwhite1 w-60  p-5 z-20 shadow-lg border border-dgrey5 flex flex-col"
          onMouseEnter={() => setShowmenu(true)}
          onMouseLeave={() => setShowmenu(false)}
        >
          <Link
            to={"/login"}
            className="cursor-pointer bg-dblue1 hover:bg-dblack2 text-dwhite1 border border-dborderblack3 text-center p-1 mb-1.5 text-sm font-mono"
          >
            LOGIN
          </Link>
          <Link
            to={"/login"}
            className="cursor-pointer bg-dwhite1 text-dblue1 hover:text-dblack2 border border-dborderblack3 text-center p-1 mb-1.5 text-sm font-mono"
          >
            SIGN UP
          </Link>
        </div>
      )}
      {/* logged in hover div */}
      {showmenu && state.loged && (
        <div
          className="header__auth__menu-inner absolute z-10 -right-12 bg-dwhite1 w-72 text-left top-full flex flex-col"
          onMouseEnter={() => setShowmenu(true)}
          onMouseLeave={() => setShowmenu(false)}
        >
          <div className="text-dborderblack3 bg-dgrey7 h-12 pt-1 px-3.5 leading-10 text-d15">
            {state?.username}
          </div>
          <Link to="account/profile"
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My Account
          </Link>
          <Link
            to="account/orders"
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My Orders
          </Link>
          <Link
          to="account/orders"
            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My User Information
          </Link>
          {/* <Link

            className="cursor-pointer w-full text-left h-9 leading-3 p-3  text-d14 text-dblack2 border-b
         border-dgrey5 hover:text-dblue1 hover:underline transition-all"
          >
            My Discount Coupons
          </Link> */}
          <Link
            to="account/addresses"
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
            onClick={() => logout()}
          >
            Log out
          </Link>
        </div>
      )}
    </div>
  );
}

export default TopAccount;
