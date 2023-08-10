import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import VerticalNav from "../components/VerticalNav";
import _axios from "../axios";
import buildLink from "../urls";
import { FaDigitalTachograph } from "react-icons/fa";
import Loader from "../components/Loader";
import AccountHeader from "../components/AccountHeader";
export default function ChangeEmail() {
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [data, setData] = useState();

  const navigate = useNavigate();

  const oldEmailRef = useRef("");
  const newEmailRef = useRef("");
  const confirmEmailRef = useRef("");

  useEffect(() => {
    _axios
      .get(buildLink("get_account", undefined, window.innerWidth))
      .then((response) => {
        if (!response.data.success) {
          dispatchAccount({ type: "setLoading", payload: false });
          if (!stateAccount.loading && !stateAccount.loged) {
            navigate("/");
          }
        } else {
          setData(response?.data?.data);
        }
      });
  }, [window.location.href]);

  function saveDetails(event) {
    event.preventDefault();

    var obj = {
      firstname: data.firstname,
      last: data.firstname,

      Email: oldEmailRef.current.value,
      password: newEmailRef.current.value,
    };

    _axios
      .put(buildLink("save_account", undefined, window.innerWidth), obj)
      .then((response) => {
        return;
      });
  }
  return (
    <div>
      {!data ? (
        <Loader />
      ) : (
        <div>
          <div className=" bg-dgrey10 pt-5 px-12">
            {/* <div className="flex py-5 bg-dyellow2 my-5 mx-12">
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
            </div> */}
            <AccountHeader stateAccount={stateAccount} />
            <div className="flex mt-2">
              <div className="w-">
                <VerticalNav />
              </div>
              <div className="w-8/12 p-10 border">
                <form onSubmit={(e) => saveDetails(e)}>
                  <div classname="flex text-left	 border border-1 ">
                    <div className=" w-full text-left py-2 text-d14">
                      Your Registered Email Address: {data?.email}
                    </div>

                    <div className="text-d13 text-left py-2">New Email </div>
                    <div className="text-d13 w-full text-left">
                      <input
                        className="bg-white text-left w-full p-2  border outline-none"
                        ref={newEmailRef}
                      />
                    </div>
                    <div className="text-d13 text-left py-2">
                      New Email Repeat
                    </div>
                    <div className="text-d13 w-full text-left">
                      <input
                        className="bg-white text-left w-full p-2  border outline-none"
                        ref={confirmEmailRef}
                      />
                    </div>
                    <div className="text-d13 w-full text-left py-2">
                      {" "}
                      Password{" "}
                    </div>
                    <div className="text-d13 w-full text-left">
                      <input
                        type="text"
                        className="bg-white text-left w-full p-2  border outline-none"
                        ref={oldEmailRef}
                      />
                    </div>
                    <div className="text-d13 text-left py-2">
                      <button className="bg-black text-white px-10 py-2 text-d15 mt-1">
                        SEND
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
