import React, { useEffect, useState } from "react";

import _axios from "../axios";
import buildLink from "../urls";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube
} from "react-icons/fa";
import supportImage from "../assets/images/online-support.png";
function Footer() {
  const [data, setData] = useState("");

  async function getFooter() {
    const footer = await _axios.get(
      buildLink("footerv2", undefined, window.innerWidth)
    );
    setData(footer?.data?.data);
  }
  useEffect(() => {
    getFooter();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="border-t-2 "></div>
      <div className="container">
        <div className={`flex flex-col  md:flex-row   px-auto ${ window.innerWidth < 650 ? "mt-2" : "  mt-16"}`}>
          <div className="flex flex-col  md:grid md:grid-cols-3 md:gap-3 text-left ">
            {data?.data?.map((cat) => {
              return (
                <div key={cat.category_id} className="mt-2 mb-3 mx-2 flex flex-col justify-center">
                  <div
                    className="text-d18 font-medium text-dbasenavy text-center md:text-left  pb-3 uppercase"
                    dangerouslySetInnerHTML={{ __html: cat.name }}>
                  </div>
                  {cat?.data?.map((sub) => {
                    return (
                      <div
                        className="text-d15 font-light text-center md:text-left  leading-relaxed text-dbgrey6 cursor-pointer text-dgrey6 hover:text-dblue1 hover:underline transition-all"
                        dangerouslySetInnerHTML={{ __html: sub.name }}
                        key={sub.category_id}>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="md:ml-12 ">
            <div className="text-dbasenavy text-d14 text-left p-3 ">
              Follow Us!{" "}
            </div>

            <div className="flex w-full place-content-center mx-5 ">
              <div className="md:border-2 rounded-full  md:border-dbasenavy p-2 text-d25 mx-1 cursor-pointer">
                {" "}
                <FaFacebookF className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <div className="md:border-2 rounded-full  md:border-dbasenavy p-2 text-d25  mx-1 cursor-pointer">
                {" "}
                <FaInstagram className="w-4 h-4 md:w-6 md:h-6"/>
              </div>
              <div className="md:border-2 rounded-full  md:border-dbasenavy p-2 text-d25 mx-1 cursor-pointer">
                {" "}
                <FaLinkedinIn className="w-4 h-4 md:w-6 md:h-6"/>
              </div>
              <div className="md:border-2 rounded-full  md:border-dbasenavy p-2 text-d25 mx-1 cursor-pointer">
                {" "}
                <FaTwitter className="w-4 h-4 md:w-6 md:h-6"/>
              </div>
              <div className="md:border-2 rounded-full  md:border-dbasenavy p-2 text-d25 mx-1 cursor-pointer">
                {" "}
                <FaYoutube className="w-4 h-4 md:w-6 md:h-6"/>
              </div>
            </div>
            <div className="pt-6 text-left ml-3">
              <span className="text-d14 font-normal	">
                Download the Mobile App Don't Miss The Opportunities!
              </span>
              <div className="flex space-x-3 py-3 w-full  place-content-center">
                <a>
                  <p className="appleStore px-10 cursor-pointer"></p>
                </a>
                <a>
                  <p className="googlePlay cursor-pointer"></p>
                </a>
              </div>
              <div className="w-full grid-flow-row  pt-3">
                <span className="w-full flex place-content-center leading-snug">
                  <img src={supportImage} alt="22" className="w-16 " />
                </span>
                <span className="w-full flex place-content-center text-d22 font-bold pt-3">
                  961 03 555 665
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dbasenavy h-12  text-white text-d22 text-left px-auto py-1">
        <div className="text-center md:text-left container font-serif"> ENGLISH HOME</div>
      </div>
      <div className=" h-16 md:h-12  text-d14 px-24 py-4 w-full text-center">
        Copyright © 2008-2022 LEBANON HOME All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
