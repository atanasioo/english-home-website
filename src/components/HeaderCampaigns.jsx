import React from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";
import { InformationContext } from "../contexts/InformationContext";

function HeaderCampaigns() {
  const location = useLocation();
  const [state, dispatch] = useContext(AccountContext);
  const infoState = useContext(InformationContext);

  return (
    <>
      {state?.admin && location.pathname !== "/checkout" && (
        <div className="header-campaigns bg-dyellow2 text-center text-dred2 py-2.5 text-sm md:mt-3.5 lg:mt-0">
          <div className="container flex flex-wrap justify-center">
            {infoState?.top_titles?.map((title, index) => (
              <div className="campaign-item flex items-center">
                <Link
                  to={`/${
                    title?.type === "seller"
                      ? "seller"
                      : title?.type === "manufacturer"
                      ? "manufacturer"
                      : "category"
                  }/${
                    title?.type === "seller"
                      ? "s="
                      : title?.type === "manufacturer"
                      ? "m="
                      : "c="
                  }${title?.type_id}`}
                  className="hover:underline"
                >
                  {title?.name}
                </Link>
                <p
                  className={`mx-2 ${
                    infoState?.top_titles.length - 1 === index ? "hidden" : ""
                  }`}
                >
                  |
                </p>
              </div>
            ))}

            {/* <div className="campaign-item flex items-center">
              <Link className="hover:underline">
                👀 View Your Favorite Products At Home
              </Link>
              <p className="mx-2">|</p>
            </div>
            <div className="campaign-item flex items-center">
              <Link className="hover:underline">✨ Top Selling Products</Link>
              <p className="mx-2">|</p>
            </div>
            <div className="campaign-item flex items-center">
              <Link className="hover:underline">⭐ All Products</Link>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderCampaigns;
