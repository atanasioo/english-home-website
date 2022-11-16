import React, { useEffect, useState, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import _axios from "../axios";
import SingleProductCategory from "../components/SingleProductCategory";
import buildLink from "../urls";
import { useFiltersContext } from "../contexts/FiltersContext";

function Category() {
  const location = useLocation();
  const id = useParams().id;
  const title = useParams().c;
  const path = location.pathname;
  const [data, setData] = useState({});
  const [filters, setfilters] = useState({});
  const [ userFilters, setUserFilters ] = useState({});
  const urlRef = useRef(location?.pathname);
  const navigate = useNavigate();

  useEffect(() => {
    var type;
    if (location.pathname.indexOf("c=") > 0) type = "category";
    if (location.pathname.indexOf("m=") > 0) type = "manufacturer";
    if (location.pathname.indexOf("s=") > 0) type = "seller";
    if (location.pathname.indexOf("?has_filter") > 0) type = "product_filter";

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
    // console.log(navigate)
    if (navigate) {
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
    _axios.post(buildLink(type, undefined, undefined) + id).then((response) => {
      setData(response?.data?.data);
      setfilters(response?.data?.data?.filters);
    });
  },[location]);

  function parseFilter(typekey, filter) {
  
    const id = filter["id"];
    const last = filter["last"];
    const type_key = typekey;
    
    //  console.log(userFilters['filter_categories'])
    let values_array = userFilters[type_key] || [];
    let c;
    let indexOfId = -1;
    let url1 = new URL(window.location);
    var filter_type = type_key;
    c = url1.searchParams.get(filter_type);
console.log(c)
    if (c !== null) {
      indexOfId = c.split(",").indexOf(filter["id"]);
    }
    if (indexOfId < 0) {
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

      navigate(path + query + "&last=" + last);
    } else {
      let query = type_key + "=" + id;
      let q = new URLSearchParams(query).toString();
      q = decodeURIComponent(q);
      // console.log("q" + q);

      // console.log("query" + query);
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
        navigate(path + url1);
      } else {
        navigate(path);
      }
    }
  }

  return (
    <div>
      <div className="flex flex-row p-2 bg-dgrey10">
        {window.innerWidth > 650 && (
          <div className="w-3/12 px-8">
            <div className="w-full text-left text-d18  border-b border-b-dblack2 py-2">
              CATEGORIES
            </div>
            <div className="w-full text-left py-2">FILTERS</div>
            <div className="w-full">
              {Object.keys(filters).map((key) => (
                <div key={key} className="w-full">
                  <div className="w-full text-left text-dbasenavy font-bold py-2">
                    {filters[key]?.items.length > 0 && filters[key].name}
                  </div>
                  {filters[key]?.items.length > 0 &&
                  filters[key].name === "Color" ? (
                    <div className="grid grid-cols-4 w-3/4">
                      {filters[key]?.items?.map((filter) => (
                        <div className="text-left w-full my-1">
                          <img
                            src={filter.image}
                            alt={filter.name}
                            className="rounded-full w-8"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    filters[key]?.items?.map((filter) =>
                      filters[key].name === "DIMENSIONS" ||
                      filters[key].name === "Size" ? (
                        <div className="w-full border bg-white my-1 py-1">
                          {filter.name}
                        </div>
                      ) : (
                        <div
                          className="text-left w-full hover:underline underline-offset-4	"
                          onClick={parseFilter(filters[key].id, filter)}
                        >
                          {filter.name}
                        </div>
                      )
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {window.innerWidth > 650 ? (
          <div className="w-9/12">
            <div className="grid grid-cols-3">
              {data?.products?.map((product) => (
                <div className="p-">
                  <SingleProductCategory item={product}></SingleProductCategory>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2">
            {data?.products?.map((product) => (
              <div className="">
                <SingleProductCategory item={product}></SingleProductCategory>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Category;
