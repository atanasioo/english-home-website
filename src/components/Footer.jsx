import React, { useEffect, useState } from "react";

import _axios from "../axios";
import buildLink from "../urls";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutubeSquare,
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
    <div className="">
      <div className="border-t-2 "></div>
      <div className="container">
        <div className=" flex   px-auto mt-16">
          <div className="grid grid-cols-3 gap-3 text-left ">
            {data?.data?.map((cat) => {
              return (
                <div key={cat.category_id} className="mt-2 mb-3 mx-2">
                  <div
                    className="text-d18 font-medium text-dbasenavy  pb-3"
                    dangerouslySetInnerHTML={{ __html: cat.name }}
                  />
                  {cat?.data?.map((sub) => {
                    return (
                      <div
                        className="text-d15 font-light  leading-relaxed text-dbgrey6 cursor-pointer opacity-50"
                        dangerouslySetInnerHTML={{ __html: sub.name }}
                        key={sub.category_id}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="ml-12 ">
            <div className="text-dbasenavy text-d14 text-left p-3 ">
              Follow Us!{" "}
            </div>

            <div className="flex w-full place-content-center mx-5 ">
              <div className="border-2 rounded-full  border-dbasenavy p-2 text-d25 mx-1">
                {" "}
                <FaFacebookF />
              </div>
              <div className="border-2 rounded-full  border-dbasenavy p-2 text-d25  mx-1">
                {" "}
                <FaInstagram />
              </div>
              <div className="border-2 rounded-full  border-dbasenavy p-2 text-d25 mx-1">
                {" "}
                <FaLinkedinIn />
              </div>
              <div className="border-2 rounded-full  border-dbasenavy p-2 text-d25 mx-1">
                {" "}
                <FaTwitter />
              </div>
              <div className="border-2 rounded-full  border-dbasenavy p-2 text-d25 mx-1">
                {" "}
                <FaYoutube />
              </div>
            </div>
            <div className="pt-6 text-left ml-3">
              <span className="text-d14 font-normal	">
                Download the Mobile App Don't Miss The Opportunities!
              </span>
              <div className="flex space-x-3 py-3 w-full  place-content-center">
                <a>
                  <p className="appleStore px-10"></p>
                </a>
                <a>
                  <p className="googlePlay"></p>
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
        <div className="container"> ENGLISH HOME</div>
      </div>
      <div className=" h-12  text-d14 px-24 py-4 w-full text-center">
        Copyright © 2008-2022 LEBANON HOME All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
