import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { AccountContext } from "../contexts/AccountContext";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const [state, dispatch] = useContext(AccountContext);
  const [signupError, setSignupError] = useState("");
  const [showSignupError, setShowSignupError] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [logindiv, setLogindiv]= useState(true);
  const loginEmail = useRef("");
  const loginPassword = useRef("");
  const signupEmail = useRef("");
  const signupPassword = useRef("");
  const signupFirst = useRef("");
  const signupLast = useRef("");
  const navigate= useNavigate();
  const width = window.innerWidth;

  console.log(state);


  //sign up
  function signup(e) {
    e.preventDefault();
    setSignupLoading(true);
    const email = signupEmail.current.value;
    const password = signupPassword.current.value;
    const confirm = signupPassword.current.value;
    const firstname = signupFirst.current.value;
    const lastname = signupLast.current.value;
    const obj = JSON.stringify({
      email,
      password,
      firstname,
      lastname,
      confirm,
    });
    _axios.post(buildLink("register"), obj).then((response) => {
      const data = response.data;
      if (!data.success) {
        setShowSignupError(true);
        setSignupError(data?.errors[0]?.errorMsg);
        console.log(data?.errors[0]?.errorMsg);
      } else {
        checkLogin();
        navigate('/');
      }
      setSignupLoading(false);
    });
  }

    // Login
    function login(e) {
      setLoginLoading(true);
      e.preventDefault();
      const email = loginEmail.current.value;
      const password = loginPassword.current.value;
      _axios
        .post(buildLink("login", undefined, window.innerWidth), {
          email,
          password
        })
        .then((response) => {
          const data = response.data;
          if (!data.success) {
            setShowLoginError(true);
            setLoginError(data?.error?.warning);
          } else {
            checkLogin();
           // window.location.reload();
          }
          setLoginLoading(false);
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
          navigate('/');
        } else {
          dispatch({ type: "setLoged", payload: false });
        }
        dispatch({ type: "setLoading", payload: false });
      });
  }


  return (
    <div className="checkout-viewport bg-dgrey10">
      <div className="auth-register-mobile md:hidden flex justify-around text-center mt-1.5 items-center text-d24 font-semibold font-mono">
        <div 
        className={`w-1/2  text-dbasenavy bg-grey-gradient ${ logindiv ? "font-semibold bg-dwhite1 bg-none border-b-8 border-dblue3" : "font-normal"} border-b-2 border-dgrey3  text-d20 py-5 flex justify-center relative text-center h-16`}
        onClick={()=> setLogindiv(true)}
        >Login</div>
        <div className={`w-1/2 ${ !logindiv ? "font-semibold bg-dwhite1 bg-none border-b-8 border-dblue3" : "font-normal"} text-dbasenavy bg-grey-gradient border-b-2 border-dgrey3 text-d20 py-5 flex justify-center relative text-center h-16`}
          onClick={()=> setLogindiv(false)}
        >
          Sign up
        </div>
      </div>
      <div className="md:container">
        <div className="auth-register flex flex-col md:flex-row justify-center -mt-4 md:mt-0 mb-5 pt-5">
          <div className={`w-full md:w-1/2 relative px-5 md:block ${ logindiv && width<650 ? "block" : "hidden" }`} data-id="login">
            <div className="auth-register__wrapper py-2.5 px-5 md:py-7 md:px-12 md:bg-dwhite1 min-h-full mb-12">
              <div className="authentication-login">
                <div className="hidden md:block auth_title text-d27 text-center text-dborderblack2 m-2.5 font-mono">
                  Login
                </div>
                <div>
                  <form onSubmit={(e) => login(e)}>
                    <input type="hidden" name="" />
                    <div className="mt-3.5 relative">
                      <input
                        type="email"
                        name="email"
                        ref={loginEmail}
                        required
                        placeholder="E-Mail Address"
                        className="border border-dgrey3 font-d16 text-dborderblack2 h-14 mb-2.5 px-5 w-full outline-none focus:border focus:border-dblack2"
                      />
                    </div>
                    <div className={`error-email text-dred4 hidden`}></div>
                    <div className="mt-3.5 relative">
                      <input
                        type="password"
                        name="password"
                        ref={loginPassword}
                        minLength={6}
                        required
                        placeholder="Your password"
                        className="border border-dgrey3 font-d16 text-dborderblack2 h-14 mb-2.5 px-5 w-full outline-none focus:border focus:border-dblack2"
                      />
                    </div>
                    <div className={`error-password text-dred4 hidden`}></div>
                    
                    <input type="hidden" name="" />
                    <div className="clear hidden overflow-hidden "></div>
                    <div className="flex justify-between items-baseline -mt-2 -mb-3 relative ">
                      <label
                        htmlFor=""
                        className="flex text-justify text-d12 my-4 items-center"
                      >
                        <input
                          type="checkbox"
                          name="remember-me"
                          className="h-6 w-6 border-2 border-dbordergrey rounded-sm relative mr-2.5"
                        />
                        <p className="text-xs">Remember me</p>
                      </label>
                      <Link to={"/forgotmypassword"} className="block mt-2 mb-4 text-d12 text-right">
                        I forgot my password
                      </Link>
                    </div>
                    <div className="mt-3.5 relative">
                      <button
                        type="submit"
                        className="text-d16 font-mono bg-dblue3 h-14 block text-center 
                                        leading-3 w-full bg-clip-padding text-dwhite1 uppercase z-10"
                      >
                        LOGIN
                      </button>
                    </div>
                    <div className="mt-3.5 relative">
                      <a
                        href="/google/login/"
                        type="submit"
                        className="flex items-center text-center border border-dblue4 h-14 text-dblue4 justify-center "
                      >
                        <img
                          src="https://akn-eh.b-cdn.net/static_omnishop/eh590/assets/img/google-icon.svg"
                          alt=""
                          className="mr-5"
                        />
                        <span className="text-d16 leading-3 text-center text-dblue4">
                          SIGN IN WITH GOOGLE
                        </span>
                      </a>
                    </div>
                    <div className={`error-field text-dred4 ${loginError ? "block mt-2" : "hidden"} `}>{loginError}</div>
                    <div className="clear hidden overflow-hidden "></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className={`w-full md:w-1/2 relative px-5 md:block ${ !logindiv && width<650 ? "block" : "hidden" } `} data-id="register">
            <div className="auth-register__wrapper py-2.5 px-5 md:py-7 md:px-12 md:bg-dwhite1 min-h-full mb-12">
              <div className="authentication-register">
                <div className="auth-box ">
                  <div className="hidden md:block auth__form--title text-d27 text-center text-dborderblack2 m-2.5">
                    Sign up
                  </div>
                  <div>
                    <form onSubmit={(e) => signup(e)}>
                      <input type="hidden" name="" />
                      <div className="mt-3.5 relative flex items-center justify-between 
                      ">
                        <div className="w-488">
                          <input
                            type="text"
                            name=""
                            required
                            ref={signupFirst}
                            className="border w-full border-dgrey3 text-d16 text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                            placeholder="First name"
                          />
                          <div className={`error-name text-dred4 hidden`}></div>
                        </div>
                        <div className="w-488">
                          <input
                            type="text"
                            name=""
                            required
                            ref={signupLast}
                            className="border w-full  border-dgrey3 text-d16 text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                            placeholder="Last name"
                          />
                          <div className={`error-name text-dred4 hidden`}></div>
                        </div>
                      </div>
                      <div className="mt-3.5 relative w-full">
                        <input
                          type="email"
                          name=""
                          required
                          ref={signupEmail}
                          className="border border-dgrey3 text-d16 w-full text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                          placeholder="E-mail address"
                        />
                        <div className={`error-email text-dred4 hidden`}></div>
                      </div>
                      <div className="mt-3.5 relative">
                        <input
                          type="text"
                          name=""
                          className="border border-dgrey3 text-d16 w-full text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                          placeholder="Phone number"
                        />
                        <div className={`error-phone text-dred4 hidden`}></div>
                      </div>
                      <div className="mt-3.5 relative">
                        <input
                          type="password"
                          name=""
                          minLength={6}
                          required
                          ref={signupPassword}
                          className="border border-dgrey3 text-d16 w-full text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                          placeholder="Password"
                        />
                        
                      </div>
                      <div className="consent-agreement -mb-1">
                        <div
                          className="flex items-center text-d12 text-justify mb-2.5"
                          style={{ color: "#626262" }}
                        >
                          <input
                            type="checkbox"
                            name="email_allowed"

                            className="h-6 w-8  border-2 border-dbordergrey rounded-sm relative mr-2.5"
                          />
                          <input
                            type="checkbox"
                            name="sms_allowed"

                            className="h-6 w-8  border-2 border-dbordergrey rounded-sm relative mr-2.5 hidden"
                          />
                          <div className="">
                            <p>
                              I would like to receive SMS and electronic
                              messages within the scope of the{" "}
                              <span className="underline">
                                Illumination Text
                              </span>{" "}
                              to be informed about the campaigns
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex items-center text-d12 text-justify mb-2.5"
                          style={{ color: "#626262" }}
                        >
                          <input
                            type="checkbox"
                            name="confirm"

                            className="h-6 w-8  border-2 border-dbordergrey rounded-sm relative mr-2.5 "
                          />
                          <div className="">
                            <p>
                              I have read and understood the{" "}
                              <span className="underline">
                                Illumination Text.
                              </span>{" "}
                              I accept the{" "}
                              <span className="underline">
                                Membership Agreement
                              </span>{" "}
                              within the scope of the Clarification Text.
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex items-center text-d12 text-justify mb-2.5"
                          style={{ color: "#626262" }}
                        >
                          <input
                            type="checkbox"
                            name="tom_pay_allowed"

                            className="h-6 w-8  border-2 border-dbordergrey rounded-sm relative mr-2.5 "
                          />
                          <div className="">
                            <p>
                              I consent to the sending of electronic commercial
                              messages by TOM Pay within the scope of the{" "}
                              <span className="underline">
                                Clarification Text.
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="sign-up  mt-3.5 relative">
                        <button
                          type="submit"
                          className="text-d16 font-mono bg-dblue3 h-14 block text-center 
                                        leading-3 w-full bg-clip-padding text-dwhite1 uppercase "
                        >
                          {" "}
                          {signupLoading ? (
                            <span>LOADING</span>
                          ) : (
                            <span>SIGN UP</span>
                          )}
                        </button>
                        {signupError && (
                          <div className={`error-password text-dred4 mt-2`}>{signupError}</div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="login-register-secure-shopping flex justify-center items-center mt-12  bg-dgrey10">
          <img
            src="https://akn-eh.b-cdn.net/static_omnishop/eh590/assets/img/insurance.png"
            alt=""
            className="mb-8"
          />
          <div className="text-d18 text-dborderblack2 ml-2.5 font-semibold mb-8">
            Secure shopping
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
