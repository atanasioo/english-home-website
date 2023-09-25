import React, { useEffect, useState } from "react";
import facebook from "../assets/images/facebook.png"
import instagram from "../assets/images/instagram.png"

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
import { useContext } from "react";
import { AccountContext } from "../contexts/AccountContext";
import { Link } from "react-router-dom";
import { InformationContext } from "../contexts/InformationContext";

function Footer() {
  const [data, setData] = useState("");
  const [state, dispatch] = useContext(AccountContext);
  const infoState = useContext(InformationContext);

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
      {1 === 1 && (
        <>
          <div className="border-t-2 "></div>
          <div className="container">
            <div
              className={`flex flex-col  md:flex-row   px-6 ${
                window.innerWidth < 650 ? "mt-2" : "  mt-16"
              }`}
            >
              <div className="flex flex-col  md:grid md:grid-cols-3 md:gap-3 text-left pb-3 ">
                {data?.data?.map((cat) => {
                  return (
                    <div
                      key={cat?.category_id}
                      className="mt-2 mb-3 mx-2 flex flex-col justify-center"
                    >
                      <Link
                        to={`${
                          cat.name
                            .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                            .replace(/\s+/g, "-")
                            .replace("/", "-")
                            .replace("%", "") +
                          "/c=" +
                          cat?.category_id
                        }`}
                        className="text-d18 font-medium text-dbasenavy text-center md:text-left  pb-3 uppercase"
                        dangerouslySetInnerHTML={{ __html: cat?.name }}
                      ></Link>
                      {cat?.data?.map((sub) => {
                        return (
                          <Link
                            to={`${
                              sub?.name
                                .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                                .replace(/\s+/g, "-")
                                .replace("/", "-")
                                .replace("%", "") +
                              "/c=" +
                              sub?.category_id
                            }`}
                            className="text-d15 font-light text-center md:text-left  leading-relaxed text-dbgrey6 cursor-pointer text-dgrey6 hover:text-dblue1 hover:underline transition-all"
                            dangerouslySetInnerHTML={{ __html: sub?.name }}
                            key={sub?.category_id}
                          ></Link>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              <div className="md:ml-12">
                <div className="text-dbasenavy text-d14 text-left p-3 ">
                  Follow Us!{" "}
                </div>

                <div className="flex w-full place-content-center mx-5 ">
                  <div className="text-d25 mx-1 cursor-pointer">
                    {" "}
                    <a href={window.config["facebook"]} target="_blank">
                      <img src={facebook} className="w-10" />
                    </a>
                  </div>
                  <div className="text-d25  mx-1 cursor-pointer">
                    <a href={window.config["instagram"]} target="_blank">
                    <img src={instagram} className="w-10" />
                    </a>
                  </div>
                  {/* <div className="md:border-2 rounded-full  md:border-dbasenavy p-2 text-d25 mx-1 cursor-pointer">
                    {" "}
                    <FaLinkedinIn className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <div className="md:border-2 rounded-full  md:border-dbasenavy p-2 text-d25 mx-1 cursor-pointer">
                    {" "}
                  
                    <FaTwitter className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <div className="md:border-2 rounded-full  md:border-dbasenavy p-2 text-d25 mx-1 cursor-pointer">
                    {" "}
                    <FaYoutube className="w-4 h-4 md:w-6 md:h-6" />
                  </div> */}
                </div>
                <div className="pt-6 text-left ml-3">
                  <span className="text-d14 font-normal	">
                    Download the Mobile App Don't Miss The Opportunities!
                  </span>
                  <div className="flex space-x-3 py-3 w-full  place-content-center">
                    <a href={window.config["appleStore"]}>
                      <p className="appleStore px-10 cursor-pointer"></p>
                    </a>
                    <a href={window.config["googlePlay"]}>
                      <p className="googlePlay cursor-pointer"></p>
                    </a>
                  </div>
                  <a
                    className="flex justify-start text-center "
                    href={`https://api.whatsapp.com/send?phone=${
                      window.config["countryCode"] + "76400008"
                    }&text=Hi%20there%20i%27m%20interested%20in%20${
                      window.config["site-url"]
                    }`}
                  >
                    <div className="w-full grid-flow-row  pt-3">
                      <span className="w-full flex place-content-center leading-snug">
                        <img src={supportImage} alt="22" className="w-16 " />
                      </span>
                      <span className="w-full flex place-content-center text-d22 font-bold pt-3">
                        {window.config["supportNumber"]}
                      </span>{" "}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {window.innerWidth < 650 && (
            <div className="p-2   items-center border-t mt-2">
              {" "}
              {window.innerWidth < 650 &&
                infoState?.informations?.map(
                  (i) =>
                    i.status === "1" && (
                      <Link
                        key={i.id}
                        className="text-dblack2 text-d12 ml-5 leading-10 font-bold hover:underline text-center"
                        to={`/information/${i.id}`}
                      >
                        {i.title}
                      </Link>
                    )
                )}
            </div>
          )}
          <div className="bg-dbasenavy h-12  text-white text-d22 text-left px-auto py-1 mt-8">
            <div className="text-center md:text-left ml-8 container font-serif">
              {" "}
              ENGLISH HOME
            </div>
          </div>
          <div className=" h-16 md:h-12  text-d14 px-24 py-4 w-full text-center">
            Copyright © 2023 English Home Lebanon All rights reserved.
          </div>
        </>
      )}
    </div>
  );
}

export default Footer;
