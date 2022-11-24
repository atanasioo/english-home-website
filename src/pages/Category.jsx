import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import _axios from "../axios";
import SingleProductCategory from "../components/SingleProductCategory";
import { useFiltersContext } from "../contexts/FiltersContext";
import queryString from "query-string";
import { VscPrimitiveSquare } from "react-icons/vsc";
import { GiSquare } from "react-icons/gi";
import { CiFilter } from "react-icons/ci";
import { BiSortAlt2 } from "react-icons/bi";
import buildLink, { path, pixelID } from "../urls";
import { type } from "@testing-library/user-event/dist/type";
import { RiArrowRightSLine } from "react-icons/ri";

function Category() {
  const location = useLocation();
  const params = useParams();
  const id = useParams().id;
  const path1 = location.pathname;
  const [data, setData] = useState({});
  const [filters, setfilters] = useState({});
  const [userFilters, setUserFilters] = useState({});
  const [pointer, setPointer] = useState(true);
  const [sort, setSort] = useState("Default");
  const [showSort, setShowSort] = useState(false);
  const [view, setView] = useState(3);
  const [filterMobile, setFilterMobile] = useState([]);
  const [filterMobileShow, setFilterMobileShow] = useState(false);
  const [mobileSort, setMobileSort] = useState(false);

  const urlRef = useRef(location?.pathname);
  const navigate = useNavigate();
  const pathname = location.pathname;

  useEffect(() => {
    console.log(filterMobile);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    var newPath;
    var type;
    var url = new URL(window.location);

    if (window.location.href.indexOf("has_filter") > 0) {
      type = "filter";
      if (url.searchParams.get("filter_categories") != null)
        newPath +=
          "&filter_categories=" + url.searchParams.get("filter_categories");
      if (url.searchParams.get("filter_sellers") != null)
        newPath += "&filter_sellers=" + url.searchParams.get("filter_sellers");
      if (url.searchParams.get("filter_manufacturers") != null)
        newPath +=
          "&filter_manufacturers=" +
          url.searchParams.get("filter_manufacturers");
      if (url.searchParams.get("filter_options") != null)
        newPath += "&filter_options=" + url.searchParams.get("filter_options");
      newPath = "&path=" + id + newPath;
    } else {
      newPath = id;
      if (window.location.href.indexOf("c=") > 0) type = "category";
      if (window.location.href.indexOf("m=") > 0) type = "manufacturer";
      if (window.location.href.indexOf("s=") > 0) type = "seller";
    }
    // alert(type , newPath)
    if (location.pathname !== urlRef.current) {
      setUserFilters({
        filter_sellers: [],
        filter_categories: [],
        filter_manufacturers: [],
        adv_filters: [],
        filter_options: []
      });
      urlRef.current = location.pathname;
    }
    // console.log(navigate);

    if (1 === 1) {
      let sellerIndex;
      let brandIndex;
      let optionsIndex;
      let advfiltersIndex;
      let categoryIndex;

      sellerIndex = window.location.href.indexOf("filter_sellers");
      brandIndex = window.location.href.indexOf("filter_manufacturers");
      categoryIndex = window.location.href.indexOf("filter_categories");
      advfiltersIndex = window.location.href.indexOf("adv_filters");
      optionsIndex = window.location.href.indexOf("filter_options");

      const value = Math.max(
        sellerIndex,
        brandIndex,
        optionsIndex,
        advfiltersIndex,
        categoryIndex
      );
      if (value === sellerIndex) {
        setUserFilters({
          ...userFilters,
          filter_options: [],
          filter_categories: [],
          filter_manufacturers: [],
          adv_filters: []
        });
      }
      if (value === categoryIndex) {
        setUserFilters({
          ...userFilters,
          filter_options: [],
          filter_manufacturers: [],
          filter_sellers: [],
          adv_filters: []
        });
      }
      if (value === brandIndex) {
        setUserFilters({
          ...userFilters,
          filter_sellers: [],
          filter_categories: [],
          filter_options: [],
          adv_filters: []
        });
      }
      if (value === advfiltersIndex) {
        setUserFilters({
          ...userFilters,
          filter_sellers: [],
          filter_categories: [],
          filter_manufacturers: [],
          filter_options: []
        });
      }
    }

    // navigate(pathname)

    _axios
      .post(buildLink(type, undefined, undefined) + newPath)
      .then((response) => {
        setData(response?.data?.data);
        setfilters(response?.data?.data?.filters);
        setPointer(true);
      });
  }, [location, sort]);

  function getType() {
    if (window.location.href.indexOf("c=") > 0) return "category";
    if (window.location.href.indexOf("m=") > 0) return "manufacturer";
    if (window.location.href.indexOf("s=") > 0) return "seller";
  }
  function pageSetter(page) {
    const new_page = parseInt(page["selected"]) + 1;
    pushRoute({ page: new_page });
  }
  // Set Sort
  function sortSetter(sort) {
    setSort(sort);
    setShowSort(false);
    let val = sort["value"];
    let order = "";
    let _sort = "";
    const i_o = val.indexOf("-");
    _sort = val.substring(0, i_o);
    order = val.substring(i_o + 1);
    const obj = { sort: _sort, order: order };
    setState(sort);
  }
  // Set limit
  function limitSetter(limit) {
    // setLimit(limit);
    // setShowLimit(false);
    pushRoute({ limit: limit.value });
  }

  // Push Route
  function pushRoute(data) {
    const q_s = queryString.parse(location.search);
    console.log(data);
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        q_s[key] = element;
      }
    }
    // alert(pathname);

    navigate(
      pathname + "&" + queryString.stringify(q_s).replaceAll("%2C", ",")
    );
  }
  function setState(sort) {
    console.log(sort);
    setSort(sort.text);
    let val = sort["value"];
    let order = "";
    let _sort = "";
    const i_o = val.indexOf("-");
    _sort = val.substring(0, i_o);
    order = val.substring(i_o + 1);
    var i_sort = pathname.indexOf("&sort=");
    var l = "";
    if (i_sort > -1) {
      l = path1.substring(0, i_sort);
      // alert(l);
    } else {
      l = pathname;
    }

    if (location.search.indexOf("has_filter=true") > -1 && i_sort > -1) {
      l = location.search;
    }
    console.log(l);
    setShowSort(false);
    navigate((l + "&sort=" + _sort + "&order=" + order).replaceAll("/&", "&"));
  }
  function parseFilter(typekey, filter) {
    setPointer(false);

    // console.log("yes");
    const id = filter["id"];
    var last = "";
    let type_key = typekey;
    // var sort="";
    // var order="";
    // var limit ='';
    last = filter["last"];

    let values_array = userFilters[type_key] || [];
    let c;
    let indexOfId = -1;
    let url1 = new URL(window.location);
    var filter_type = typekey;
    c = url1.searchParams.get(filter_type);

    if (c !== null) {
      indexOfId = c.split(",").indexOf(filter["id"]);
    }
    if (indexOfId < 0) {
      // // // console.log("Test from if");
      values_array.push(filter["id"]);

      setUserFilters({
        ...userFilters,
        type_key: values_array
      });

      let active_filters = {};
      for (const key in userFilters) {
        if (Object.hasOwnProperty.call(userFilters, key)) {
          const element = userFilters[key];

          if (element.length > 0 && key !== "type_key") {
            active_filters[key] = element;
          }
        }
      }

      let query = "?has_filter=true&";
      let q = new URLSearchParams(active_filters).toString();

      q = decodeURIComponent(q);
      query += q;

      console.log(
        params.name +
          "/" +
          getType().slice(0, 1) +
          "=" +
          id +
          query +
          "&last=" +
          last
      );

      navigate(path + query + "&last=" + last);
    } else {
      let query = type_key + "=" + id;
      let q = new URLSearchParams(query).toString();
      q = decodeURIComponent(q);

      let url1 = "?has_filter=false";
      values_array.pop();
      setUserFilters({
        ...userFilters,
        type_key: values_array
      });

      if (location.search.indexOf(id) > -1) {
        let c = "";
        var array;
        let lastLink;

        url1 = new URL(window.location);

        c = url1.searchParams.get(filter_type);
        if (c != null) {
          array = c.split(",");
          let indexOfId = array.indexOf(id);
          let lengthArray = array.length;
          if (indexOfId >= 0) {
            lastLink = url1.searchParams.get("last");
            if (indexOfId === 0 && lengthArray === 1) {
              if (location.search.indexOf("&" + q) > 0) {
                url1 = location.search.replace("&" + q, "");
              } else {
                url1 = location.search.replace(q, "");
              }

              if (url1 === "?has_filter=true&last=" + lastLink) {
                url1 = "";
              }
              if (url1 !== "") {
                url1 = url1
                  .toString()
                  .replace("&last=" + lastLink, "&last=" + last);
              }
            } else if (indexOfId === 0 && lengthArray > 1) {
              url1 = location.search.replace(id + ",", "");
              url1 = url1
                .toString()
                .replace("&last=" + lastLink, "&last=" + last);
            } else {
              url1 = location.search.replace("," + id, "");
              url1 = url1
                .toString()
                .replace("&last=" + lastLink, "&last=" + last);
            }
          }
        }
        // console.log(path + query + "&last=" + last);

        navigate(pathname + url1);
      } else {
        navigate("/" + path1);
        // console.log(path + query + "&last=" + last);
      }
    }
  }
  // Check filter
  function checkFilter(type, name, filter) {
    var url = new URL(window.location);
    var c = url.searchParams.get(type);

    let array = Array("");
    array[type] = c?.split(",");
    // console.log("type, name, filter");
    // console.log(type, name, filter);
    if (name === "Color" || name === "DIMENSIONS" || name === "Size") {
      if (c !== null && array[type].includes(filter["id"]) === true) {
        return "border border-dblue2 border text-dblue2";
      } else {
        return "";
      }
    } else {
      if (c !== null && array[type].includes(filter["id"]) === true) {
        return "text-dblue2 underline underline-offset-4";
      } else {
        return "";
      }
    }
  }
  function showMobilefilter() {
    setFilterMobileShow(true);
    setShowSort(false);
  }

  return (
    <div className=" bg-dgrey10 pt-1">
      <div className="  flex  pt-4 pb-2 pl-8 items-center text-d16 text-dblack1 capitalize">
        <div className=" flex w-3/12">
          <div className="flex items-center ">
            <Link
              to="/"
              className=" md:block text-dborderblack0 font-light truncate text-d16 md:text-tiny mr-2 hover:text-dblue"
              dangerouslySetInnerHTML={{
                __html: "Home"
              }}
            />{" "}
            <RiArrowRightSLine className="text-d22 font-light mt-0.5 -mx-2 " />
          </div>
          {data?.breadcrumbs?.map((bread) => (
            <div
              className="flex items-center text-dborderblack0"
              key={bread.text}
            >
              <p className=" mx-2">{bread.text.replace("&amp;", "&")}</p>
            </div>
          ))}
        </div>
        {window.innerWidth > 650 && (
          <div className="w-1/2 text-left text-d14">
            Showing {data?.products?.length} products
          </div>
        )}
      </div>
      <div className="border border-t-0 ml-8 mr-5"></div>

      <div
        className={`flex flex-row p-2 mt-2 ${
          !pointer && "pointer-events-none select-none opacity-25"
        }`}
      >
        {window.innerWidth > 650 && (
          <div className="w-3/12 px-8">
            <div className="w-10/12 text-left text-d18  border-b border-b-dblack2 py-2">
              CATEGORIES
            </div>
            <div className="w-10/12 text-left py-2">FILTERS</div>
            <div className="w-10/12 ">
              {Object.keys(filters).map((key) => (
                <div key={key} className="w-full">
                  <div className="w-full text-left text-dblack2 uppercase  py-2">
                    {filters[key]?.items.length > 0 && filters[key].name}
                  </div>
                  {filters[key]?.items.length > 0 &&
                  filters[key].name === "Color" ? (
                    <div
                      className={`${
                        filters[key]?.items.length > 6 && "h-36 overflow-y-auto"
                      }`}
                    >
                      <div className="grid grid-cols-4 w-3/4 ">
                        {filters[key]?.items?.map((filter) => (
                          <div className="text-left w-full my-1">
                            <img
                              src={filter.image}
                              alt={filter.name}
                              className={`rounded-full w-8   ${checkFilter(
                                filters[key].id,
                                filters[key].name,
                                filter
                              )}`}
                              onClick={() =>
                                parseFilter(filters[key].id, filter)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${
                        filters[key]?.items.length > 6 && "h-36 overflow-y-auto"
                      }`}
                    >
                      {filters[key]?.items?.map((filter) =>
                        filters[key].name === "DIMENSIONS" ||
                        filters[key].name === "Size" ? (
                          <div
                            className={`w-full border bg-white my-1 text-dborderblack0 text-d15 py-1 ${checkFilter(
                              filters[key].id,
                              filters[key].name,
                              filter
                            )}`}
                            onClick={() => parseFilter(filters[key].id, filter)}
                          >
                            {filter.name}
                          </div>
                        ) : (
                          <div
                            className={`text-left w-full hover:underline underline-offset-4 text-dborderblack0 text-d15 pointer-events-auto ${checkFilter(
                              filters[key].id,
                              filter.name,
                              filter
                            )}`}
                            onClick={() => parseFilter(filters[key].id, filter)}
                          >
                            {filter.name}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {window.innerWidth > 650 ? (
          <div className="w-9/12">
            <div className="flex w-full  pb-2">
              <div className="flex w-9/12 text-left pl-4">
                VIEW{" "}
                <div
                  className={`flex ml-4 pt-1.5 ${
                    view === 2
                      ? "text-d16  text-dborderblack1 "
                      : "ml-3 text-d14 text-dbordergrey"
                  }`}
                  onClick={() => setView(2)}
                >
                  <GiSquare />
                  <GiSquare
                    className={`${view === 2 ? "-ml-0.5" : "-ml-0.5"}`}
                  />
                </div>
                <div
                  className={`flex pt-1.5 ${
                    view === 3
                      ? "text-d16 text-dborderblack1 mx-3 -top-1"
                      : "mx-2 text-d14 text-dbordergrey"
                  }`}
                  onClick={() => setView(3)}
                >
                  <GiSquare />
                  <GiSquare
                    className={`${view === 3 ? "-mx-0.5" : "-mx-0.5"}`}
                  />
                  <GiSquare />
                </div>{" "}
                <div
                  className={`flex  pt-1.5 ${
                    view === 4
                      ? "text-d16 text-dborderblack1"
                      : "text-d14 text-dbordergrey"
                  }`}
                  onClick={() => setView(4)}
                >
                  <GiSquare />
                  <GiSquare className={view === 4 ? "-mx-0.5" : "-mx-0.5"} />
                  <GiSquare className={view === 4 ? "-mr-0.5" : "-mr-0.5"} />
                  <GiSquare />
                </div>
              </div>
              <div className="w-3/12 text-left">
                <div className="flex">
                  <div className="">sort</div>
                  <div
                    className=" ml-3 text-center bg-white border border-dbgrey1 w-44"
                    onClick={() => setShowSort(!showSort ? true : false)}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sort?.text ? sort?.text : sort
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className={`w-44 bg-white absolute z-10 ml-10 ${
                    !showSort && "hidden"
                  }`}
                >
                  {data?.sorts?.map((sort) => (
                    <div
                      className="pl-5 py-1 "
                      onClick={() => sortSetter(sort)}
                      dangerouslySetInnerHTML={{
                        __html: sort.text
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-t-0 mx-3"></div>

            <div
              className={`grid ${
                view !== 2 && view !== 4 ? "grid-cols-3" : "grid-cols-" + view
              } `}
            >
              {data?.products?.map((product) => (
                <div className="">
                  <SingleProductCategory item={product}></SingleProductCategory>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 grid-2">
              <div className="flex w-full " onClick={showMobilefilter}>
                <span className="w-2/6"></span>
                <span>Filter</span>
                <span className="mt-1 mx-4">
                  <CiFilter />
                </span>
              </div>
              <div
                className="border-l flex w-full"
                onClick={() => setShowSort(showSort ? false : true)}
              >
                <span className="w-2/6"></span>
                <span>Sort</span>
                <span className="mt-1 mx-4">
                  <BiSortAlt2 />
                </span>
                <div
                  className={`w-52 bg-white absolute z-20 top-52  -mt-3 text-left border border-dblack1 ${
                    !showSort && "hidden"
                  }`}
                >
                  {data?.sorts?.map((sort) => (
                    <div
                      className="pl-5 py-2 "
                      onClick={() => sortSetter(sort)}
                      dangerouslySetInnerHTML={{
                        __html: sort.text
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 ">
              {data?.products?.map((product) => (
                <div className="">
                  <SingleProductCategory item={product}></SingleProductCategory>
                </div>
              ))}
            </div>

            <div
              className={`absolute z-50 top-36  bg-white w-3/4 h-4/6 mx-12 pb-2 overflow-y-scroll  ${
                !filterMobileShow && "hidden"
              }`}
            >
              <div className="text-left w-full py-3 px-3  text-dbasenavy text-d18 font-bold bg-dyellow2 ">
                Filter
              </div>
              {}
              {Object.keys(filters).map(
                (key) =>
                  filters[key]?.items.length > 0 && (
                    <div
                      key={key}
                      className=" border border-dbordergrey3 p-3 m-3  text-d14"
                    >
                      {
                        <div
                          className={`flex w-full text-left text-dblack2 uppercase `}
                          onClick={() =>
                            !filterMobile.includes(filters[key].id)
                              ? setFilterMobile((filterMobile) => [
                                  ...filterMobile,
                                  filters[key].id
                                ])
                              : setFilterMobile((filterMobile) =>
                                  filterMobile.filter(
                                    (filterMobile) =>
                                      filterMobile !== filters[key].id
                                  )
                                )
                          }
                        >
                          <div className="w-11/12">{filters[key].name} </div>
                          <div className="text-black font-medium">
                            {filterMobile.includes(filters[key].id) ? "-" : "+"}
                          </div>
                        </div>
                      }
                      {filters[key].name === "Color" ? (
                        <div
                          className={` my-5 ${
                            filters[key]?.items.length > 6 &&
                            !filterMobile.includes(filters[key].id) &&
                            " overflow-y-auto h-36 px-2"
                          }  ${
                            !filterMobile.includes(filters[key].id)
                              ? "hidden"
                              : ""
                          }}`}
                        >
                          <div className="grid grid-cols-4 w-3/4 ">
                            {filters[key]?.items?.map((filter) => (
                              <div className="text-left w-full my-1">
                                <img
                                  src={filter.image}
                                  alt={filter.name}
                                  className={`rounded-full w-8   ${checkFilter(
                                    filters[key].id,
                                    filters[key].name,
                                    filter
                                  )}`}
                                  onClick={() =>
                                    parseFilter(filters[key].id, filter)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`my-5 ${
                            filters[key]?.items.length > 6 &&
                            "overflow-y-auto h-36 px-2"
                          }  ${
                            !filterMobile.includes(filters[key].id)
                              ? "hidden"
                              : ""
                          }`}
                        >
                          {filters[key]?.items?.map((filter) =>
                            filters[key].name === "DIMENSIONS" ||
                            filters[key].name === "Size" ? (
                              <div
                                className={`w-full border bg-white my-1 text-dborderblack0 text-d15 py-1 ${checkFilter(
                                  filters[key].id,
                                  filters[key].name,
                                  filter
                                )}`}
                                onClick={() =>
                                  parseFilter(filters[key].id, filter)
                                }
                              >
                                {filter.name}
                              </div>
                            ) : (
                              <div
                                className={`text-left w-full hover:underline underline-offset-4 text-dborderblack0 text-d15 pointer-events-auto ${checkFilter(
                                  filters[key].id,
                                  filter.name,
                                  filter
                                )}`}
                                onClick={() =>
                                  parseFilter(filters[key].id, filter)
                                }
                              >
                                {filter.name}
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )
              )}
            </div>
            {filterMobileShow && (
              <div className="w-screen h-screen	 fixed z-20 top-0 bg-dborderblack3 opacity-50 -ml-2"></div>
            )}
            {filterMobileShow && (
              <div className="flex w-screen z-30 bottom-0 bg-white -ml-2 fixed p-3 font-bold uppercase">
                <button
                  className="text-center border text-dborderblack5 mx-2 w-1/2 p-3"
                  onClick={() => setFilterMobileShow(false)}
                >
                  GIVE UP
                </button>
                <button
                  className="text-center border bg-dblack1 p-3 mx-1 text-white w-1/2"
                  onClick={() => setFilterMobileShow(false)}
                >
                  APPLY
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
