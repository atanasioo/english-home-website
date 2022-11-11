import React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import { AccountContext } from "../contexts/AccountContext";
import buildLink, { path } from "../urls";
import _axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function ForgotMyPassword() {
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const loginEmail = useRef("");

  // Forget Password
  async function handleForgetPassword(e) {
    e.preventDefault();
    if (loginEmail.current.value) {
      const new_password = await _axios.post(buildLink("forget_password"), {
        email: loginEmail.current.value,
      });
      console.log(new_password);
      if (new_password.data.errors) {
        setErr("No Email Found");
      } else {
        setMessage(new_password?.data?.data?.message);
        console.log(new_password?.data?.data?.message);
        setErr();
      }
    } else {
      setErr("Please enter your email");
    }
  }

  return (
    <div className="bg-dgrey10">
      <div>
        <div className="auth relative mt-4 md:mt-0 md:py-32 ">
          <div className="container ">
            <div className="forgot-password-form-wrapper flex flex-col md:flex-row ">
              <div className="w-full md:w-1/2 mt-10 pl-16">
                <form className="text-left" onSubmit={(e) => handleForgetPassword(e)}>
                  <div>
                    <div className="title font-mono text-dbasenavy text-5xl font-semibold mb-5">
                      <div>I forgot</div>
                      <div>my password!</div>
                    </div>
                    <div className="text-dgrey6 text-d17">
                      Enter your registered e-mail address to set a new
                      password.
                    </div>
                    <div className="text-dgrey6 text-d17">
                      We will send the password change link to your e-mail
                      address.
                    </div>
                  </div>
                  <div className="mt-14">
                    <input
                      type="email"
                      name="email"
                      required
                      ref={loginEmail}
                      placeholder="E-Mail Address"
                      className="w-11/12 p-3.5 shadow-xl text-dgrey6 text-d17 outline-none"
                    />
                    <div className={`error-email text-dred4 `}></div>
                    <div className={`error-form text-dred4 `}></div>
                    <div className={`success-form text-dblue3 text-d12`}></div>
                    {message && (
                      <div
                        onClick={() => setMessage()}
                        className="cursor-pointer text-sm mt-2 w-full text-dblue3 py-2"
                      >
                        {message}
                      </div>
                    )}
                    {err && (
                      <div
                        onClick={() => setErr()}
                        className="cursor-pointer w-full mt-2 text-dred4 py-2"
                      >
                        {err}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="bg-dbasenavy text-dwhite1 py-2.5 px-3.5 tracking-widest mt-5"
                    >
                      SEND PASSWORD RENEWAL LINK
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-full md:w-1/2 ">
                <div
                  className="bg-center bg-cover bg-no-repeat flex flex-wrap justify-center h-full pt-12 md:p-20"
                  style={{
                    backgroundImage:
                      "url(https://akn-eh.b-cdn.net/cms/2020/12/25/5481a4f4-9855-4e6b-add5-087d4bf04b81.jpg)",
                  }}
                >
                  <div
                    className="flex flex-col basis-1/2"
                    style={{ maxWidth: "250px" }}
                  >
                    <div className="flex justify-center">
                      <img
                        src="https://akn-eh.b-cdn.net/cms/2020/12/11/4a862307-08f8-438b-aaf0-2f2de33050d2.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="flex justify-center mt-2.5 text-dbasenavy text-d15 font-semibold">
                        RETURN FROM STORE
                      </div>
                      <div className="text-center text-dbasenavy text-d13">
                        You can make your return transactions from English Home
                        stores.
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex flex-col basis-1/2"
                    style={{ maxWidth: "250px" }}
                  >
                    <div className="flex justify-center">
                      <img
                        src="https://akn-eh.b-cdn.net/cms/2020/12/11/565c8d64-65f8-4c03-971c-0c042ae12fa5.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="flex justify-center mt-2.5 text-dbasenavy text-d15 font-semibold">
                        DELIVERY FROM STORE
                      </div>
                      <div className="text-center text-dbasenavy text-d13">
                        Make an online payment from anywhere and receive your
                        order from our stores.
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex flex-col basis-1/2"
                    style={{ maxWidth: "250px" }}
                  >
                    <div className="flex justify-center">
                      <img
                        src="https://akn-eh.b-cdn.net/cms/2020/12/11/1f4daea6-ef1e-4ac2-8754-5735b98df03c.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="flex justify-center mt-2.5 text-dbasenavy text-d15 font-semibold">
                        FAST SHIPPING
                      </div>
                      <div className="text-center text-dbasenavy text-d13">
                        Your orders will be delivered to the cargo in the
                        fastest way.
                      </div>
                    </div>
                  </div>

                  <div
                    className="flex flex-col basis-1/2"
                    style={{ maxWidth: "250px" }}
                  >
                    <div className="flex justify-center">
                      <img
                        src="https://akn-eh.b-cdn.net/cms/2020/12/11/1ff01847-0f3b-4e92-90a6-3b5f7cd72101.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="flex justify-center mt-2.5 text-dbasenavy text-d15 font-semibold">
                        30 DAY RETURN GUARANTEE
                      </div>
                      <div className="text-center text-dbasenavy text-d13">
                        If you are not satisfied with your order, you can return
                        it within 30 days.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotMyPassword;
