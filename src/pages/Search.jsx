import React from "react";
import { Link } from "react-router-dom";

function Search() {
  return (
    <div className="bg-dgrey10">
      <div className="list">
        <div className="container">
            <div className="flex flex-col">
                <div className="border-b border-dgrey3 py-2.5 mt-1" style={{minHeight: "50px"}}>
                    <div className="breadcrumb text-left pr-2.5 inline-block align-middle" style={{minWidth: "25%"}}></div>
                    <div className="wrapper inline-block align-middle">
                        <div className="list-info-text text-dblack2 text-d15 font-light">
                            <div className="list-info-product-count ">
                                <button className="md:hidden"></button>
                                <p className="md:hidden"></p>
                                <span className="search-total-count">Showing 83 </span>
                                <span className="search-total-count-text">products</span>
                            </div>
                            <div className="list-info-mobile-filters md:hidden">
                                <div className="list__info__mobile-filters__line"></div>
                                <Link className="filter-btn"></Link>
                                <div className="sort-btn"></div>
                            </div>
                        </div>
                        <div className="md:hidden">

                        </div>
                        <div className="text-left text-dblack2 text-d15 font-light">
                            <div className="selected__filters__wrapper p-2.5">
                               <span>Filters :</span> 
                               <span className="list__info__filter pl-3.5"></span>
                            </div>
                        </div>
                        <Link className="border border-dgrey5 bg-dwhite1 text-d15 py-1 px-5 text-center ml-2.5 -mr-1 rounded-3xl uppercase text-dgrey6"></Link>
                        <Link className="border border-dgrey5 bg-dwhite1 text-d15 py-1 px-5 text-center ml-2.5 -mr-1 rounded-3xl uppercase text-dgrey6"></Link>
                        <div className="hidden"></div>
                    </div>
                </div>
            </div>
            <div className="pb-6 -mx-1"></div>
        </div>
      </div>
    </div>
  );
}

export default Search;
