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
                    <div className="wrapper align-middle flex  items-center justify-center font-mono">
                        <div className="list-info-text text-dblack2 text-d15 ">
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
                        <div className="text-left text-dblack2 text-d15 ">
                            <div className="selected__filters__wrapper p-2.5">
                               <span>Filters :</span> 
                               <span className="list__info__filter pl-3.5">
                                    <input type="checkbox" name="search_text" id="" value=""/>
                                    <span className="inline-block cursor-pointer  text-d15 text-dblack2">blanket</span>
                               </span>
                            </div>
                        </div>
                        <Link className="border border-dgrey5 bg-dwhite1 text-d15 py-1 px-5 text-center ml-2.5 -mr-1 rounded-3xl uppercase text-dborderblack0">
                            Remove Filters
                        </Link>
                        <Link className="hidden border border-dgrey5 bg-dwhite1 text-d15 py-1 px-5 text-center ml-2.5 -mr-1 rounded-3xl uppercase text-dborderblack0"></Link>
                        <div className="hidden"></div>
                    </div>
                </div>
            </div>
            <div className="pb-6 -mx-1 flex">
                <div className="inline-block ">
                    <div className="pb-12 w-48">
                        <div className="category-tree">
                            <div className="category-big-title h-10 relative border-b border-dgrey9 text-dborderblack0 w-full text-left">
                                <div className="text-d16 text-dborderblack5 uppercase">CATEGORIES</div>
                            </div>
                            <div className="filter-wrapper py-5"></div>
                            <div className="category-big-title h-10 relative border-b border-dgrey9 text-dborderblack0 w-full">
                                <div className="text-d16 text-dborderblack5 uppercase text-left">FILTERS</div>
                            </div>
                            <div className="filter-sub-title text-left text-d14 text-dblack2 pt-8 uppercase mb-2.5 block w-full"></div>
                            <div className="sidebar-filter inline-block overflow-y-scroll overflow-x-hidden" style={{maxHeight: "210px"}}></div>
                            <div className="clear"></div>
                            <div className="filter-sub-title text-left text-d14 text-dblack2 pt-8 uppercase mb-2.5 block w-full"></div>
                            <div className="sidebar-filter inline-block overflow-y-scroll overflow-x-hidden" style={{maxHeight: "210px"}}></div>
                            <div className="clear"></div>
                            <div className="filter-sub-title text-left text-d14 text-dblack2 pt-8 uppercase mb-2.5 block w-full"></div>
                            <div className="sidebar-filter inline-block overflow-y-scroll overflow-x-hidden" style={{maxHeight: "210px"}}></div>
                            <div className="clear"></div>
                            <div className="filter-sub-title text-left text-d14 text-dblack2 pt-8 uppercase mb-2.5 block w-full"></div>
                            <div className="sidebar-filter inline-block overflow-y-scroll overflow-x-hidden" style={{maxHeight: "210px"}}></div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4">
                    <div className="border-b border-dgrey3 h-10 flex items-center">
                        <div className="w-full">
                            <div className="content__actions__select-box hidden md:block mr-8">
                                <div className="list-content__actions__sub--title text-d16 pr-3.5 relative top-1 inline-block"></div>
                                <Link className="list__grid inline-block mr-2.5 text-center align-middle"></Link>
                                <Link className="list__grid inline-block mr-2.5 text-center align-middle"></Link>
                                <Link className="list__grid inline-block mr-2.5 text-center align-middle"></Link>
                            </div>
                            <div className="content__actions__select-box hidden md:block mr-8"></div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="page-count hidden">4</div>
                        <div className="page-count hidden"></div>
                        <div className="page-count hidden"></div>
                        <div className="list-content"></div>
                        <div className="flex flex-col justify-around opacity-0 items-center fixed bottom-16 right-6 z-30 w-20 h-11 text-d12 font-bold text-center cursor-pointer transition-all text-dwhite1 bg-dborderblack1 py-1"></div>
                    </div>
                    <div className="showmore_wrap text-center"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
