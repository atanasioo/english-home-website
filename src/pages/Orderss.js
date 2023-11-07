import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import VerticalNav from "../components/VerticalNav";
import _axios from "../axios";
import buildLink, { path } from "../urls";
import { FaDigitalTachograph } from "react-icons/fa";
import AccountHeader from "../components/AccountHeader";
export default function Orders() {
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [data, setData] = useState();

  useEffect(() => {
    _axios
      .get(buildLink("orders", undefined, window.innerWidth))
      .then((response) => {
        if (!response.data.success) {
        } else {
          setData(response?.data?.data);
        }
      });
  }, [window.location.href]);

  return (
 <div
            className={` bg-dgrey10 pt-5  ${
              window.innerWidth < 650 ? "px-0" : "px-32"
            }`}
          >
            
            <AccountHeader stateAccount={stateAccount} />
            <div className="flex mt-2">
              {window.innerWidth > 650 && (
                <div className="">
                  <VerticalNav />
                </div>
              )}
              <div
                className={`  ${
                  window.innerWidth < 650 ? "w-full" : "w-full"
                }`}
              >
          <div className="w-full  overflow-y-auto px-2  md:py-10">
            {/* Header */}
            <div className="flex items-center mb-8">
              <div>
                <h1 className="text-lg text-left  font-semibold">Orders</h1>
                <h2 className=" font-light">Manage your Order details</h2>
              </div>
            </div>
            {data?.orders?.length !== 0 &&
              data?.orders?.map((data) => (
                <div className="bg-white rounded-md pt-2 pb-5 mt-5">
                  <div className="md:mt-5  md:pb-5 ">
                    <div className="flex flex-col justify-start items-center text-dblue sm:flex-row cart-header text-center sm:text-white bg-dbasenavy">
                      <div className="w-8/12 text-left ml-6"> #{data.order_id} </div>

                      <div className="mx-4 text-right justify-end ">
                        <Link
                          className="flex mx-4"
                          to={{
                            pathname: `${path}/account/order-details`,
                            // state:   data.order_id,
                            search:  data.order_id

                          
                          }}
                          key={data.order_id}
                        >
                          {/* <span className="text-dblue">&#x1f441;</span> */}
                          <span>
                            <svg
                              width="19"
                              height="18"
                              viewBox="0 0 24 24"
                              className="mt-1"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {" "}
                              <path
                                d="M21.2572 10.9622C21.7314 11.5813 21.7314 12.4187 21.2572 13.0378C19.764 14.9868 16.1818 19 12 19C7.81823 19 4.23598 14.9868 2.74284 13.0378C2.26857 12.4187 2.26856 11.5813 2.74283 10.9622C4.23598 9.01321 7.81823 5 12 5C16.1818 5 19.764 9.01321 21.2572 10.9622Z"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></path>{" "}
                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                                stroke="black"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></circle>{" "}
                            </svg>
                          </span>

                          <span className="mx-1 whitespace-nowrap">
                            {" "}
                            Order details
                          </span>
                        </Link>
                      </div>
                    </div>

                    <div className="cart-body">
                      <div className="flex md:px-2 py-1 justify-between items-center mt-4 md:ml-5 bg-white">
                        <div className="focus:text-dblue flex-row  items-center space-y-4  border-dblue">
                          <p className="flex space-x-1 text-sm">
                            <span>Name:</span> <span>{data.name}</span>
                          </p>
                          <p className="flex items-center text-center space-x-1 text-sm">
                            <span className=" text-d12 md:text-base ">
                              Number of products:
                            </span>{" "}
                            <span className="h-5"> {" " + data.products}</span>
                          </p>
                        </div>
                        <div className="flex-row items-center space-y-4 md:mr-52 ">
                          <p className="text-sm flex space-x-1">
                            <span>Date Added:</span>{" "}
                            <span className="font-semibold">
                              {data.date_added}
                            </span>
                          </p>
                          <p className="text-sm space-x-1">
                            <span>Total:</span>
                            <span className="font-semibold">{data.total}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
