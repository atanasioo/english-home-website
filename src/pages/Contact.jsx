import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { AccountContext } from "../contexts/AccountContext";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import HandlePhoneModel from "../components/PhoneHandler";


function Contact() {
  const [state, dispatch] = useContext(AccountContext);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [err, setErr] = useState(false);
  const contactEmail = useRef("");
  const contactSubject = useRef("");
  const contactFirst = useRef("");
  const contactLast = useRef("");
  const contactMessage = useRef("");
  const contactPhone = useRef("");
  const navigate = useNavigate();
  const width = window.innerWidth;

  
  function submitForm(e) {
    e.preventDefault();
    setSubmitLoading(true);
    const email = contactEmail.current.value;
    const subject = contactSubject.current.value;
    const firstname = contactFirst.current.value;
    const lastname = contactLast.current.value;
    const message = contactMessage.current.value;
    const phone = contactPhone.current.value;
    const obj = JSON.stringify({
      email,
      subject,
      firstname,
      lastname,
      phone,
      message,
    });
    console.log(obj);
    _axios.post(buildLink("contactUs"), obj).then((response) => {
      const data = response.data;
      if (data.success) {
       console.log(data);
      }
      setSubmitLoading(false);
    });
  }

  const phoneHanlder = (childData, isValid) => {
    if (isValid === true) {
        contactPhone.current.value = childData;
      setErr("");
    } else {
        contactPhone.current.value = childData;
    }

    setIsValid(isValid);
  };

  return (
    <div className="bg-dgrey10 py-14">
      <div
        className={`w-full md:w-1/2 relative px-5 md:block m-auto `}
        data-id="register"
      >
        <div className="auth-register__wrapper py-2.5 px-5 md:py-7 md:px-12 md:bg-dwhite1 min-h-full mb-12">
          <div className="authentication-register">
            <div className="auth-box ">
              <div className="hidden md:block auth__form--title pb-2.5 text-d27 text-center text-dborderblack2 m-2.5 uppercase">
                Contact Us
              </div>
              <div>
                <form onSubmit={(e) => submitForm(e)}>
                  <input type="hidden" name="" />
                  <div
                    className="mt-3.5 relative flex items-center justify-between 
                      "
                  >
                    <div className="w-488">
                      <input
                        type="text"
                        name=""
                        required
                        ref={contactFirst}
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
                        ref={contactLast}
                        className="border w-full  border-dgrey3 text-d16 text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                        placeholder="Last name"
                      />
                      <div className={`error-name text-dred4 hidden`}></div>
                    </div>
                  </div>
                  <div className="mt-3.5 relative">
                    {/* <input
                      type="text"
                      name=""
                      className="border border-dgrey3 text-d16 w-full text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                      placeholder="Phone number"
                    /> */}
                     <HandlePhoneModel
                    phone={contactPhone}
                    nb={""}
                    fromContact= {true}
                    phoneHanlder={phoneHanlder}
                  />
                    <div className={`error-phone text-dred4 hidden`}></div>
                  </div>
                  <div className="mt-3.5 relative w-full">
                    <input
                      type="email"
                      name=""
                      required
                      ref={contactEmail}
                      className="border border-dgrey3 text-d16 w-full text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                      placeholder="E-mail address"
                    />
                    <div className={`error-email text-dred4 hidden`}></div>
                  </div>
                  <div className="mt-3.5 relative">
                    <input
                      type="text"
                      name=""
                      required
                      ref={contactSubject}
                      className="border border-dgrey3 text-d16 w-full text-dborderblack2 h-14 mb-2.5 px-5 outline-none focus:border focus:border-dblack2"
                      placeholder="Subject"
                    />
                    <div className={`error-phone text-dred4 hidden`}></div>
                  </div>
                  <div className="mt-3.5 relative">
                    <textarea
                      type="text"
                      name=""
                      minLength={6}
                      rows="8"
                      required
                      ref={contactMessage}
                      className="border border-dgrey3 text-d16 w-full text-dborderblack2  mb-2.5 pt-2.5 px-5 outline-none focus:border focus:border-dblack2"
                      placeholder="Message"
                    />
                  </div>

                  <div className="sign-up  mt-3.5 relative">
                    <button
                      type="submit"
                      className="text-d16 font-mono bg-dblue3 h-14 block text-center 
                                        leading-3 w-full bg-clip-padding text-dwhite1 uppercase "
                    >
                      {" "}
                      {submitLoading ? (
                        <span>LOADING...</span>
                      ) : (
                        <span>SUBMIT</span>
                      )}
                    </button>
                    {/* {signupError && (
                          <div className={`error-password text-dred4 mt-2 text-sm`}>{signupError}</div>
                        )} */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
