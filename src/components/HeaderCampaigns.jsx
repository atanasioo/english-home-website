import React from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AccountContext } from "../contexts/AccountContext";

function HeaderCampaigns() {
  const location = useLocation();
  const [state, dispatch] = useContext(AccountContext);

  return (
    <>
      {state?.admin && location.pathname !== "/checkout" && (
        <div className="header-campaigns bg-dyellow2 text-center text-dred2 py-2.5 text-sm md:mt-3.5 lg:mt-0">
          <div className="container flex flex-wrap justify-center">
            <div className="campaign-item flex items-center">
              <Link className="hover:underline">
                🚚 150 TL and above FREE SHIPPING
              </Link>
              <p className="mx-2">|</p>
            </div>
            <div className="campaign-item flex items-center">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HeaderCampaigns;
