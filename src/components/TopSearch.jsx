import React from "react";
import { AccountContext } from "../contexts/AccountContext";
import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import buildLink, { path } from "../urls";
import { BsSearch } from "react-icons/bs"
import axios from "axios";
import Cookies from "js-cookie";


function TopSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setResults([]);
    setViewResults(false);
    setShowSearch(false);
  }, [location]);

  const types = {
    1: "product",
    2: "category",
    3: "manufacturer",
    4: "seller",
  };
  const [results, setResults] = useState([]);
  const [viewResults, setViewResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [state] = useContext(AccountContext);
  const [message, setMessage] = useState();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  var store =path;

//   let i=0;
//   let placeholder= "";
//   const txt = "What are you looking for?";
//   const speed = 120;

//   function type(){
//     placeholder += txt.charAt(i);
//     document.getElementById("top_search_input").setAttribute("placeholder", placeholder);
//     i++;
//     setTimeout(type, speed);
//   }

  function setShowSearchFunction() {
    setShowSearch(false);
    setViewResults("");
  }

  function navigateSearch(e) {
 
    if (e.keyCode === 13) {
      const query = e.target.value;
      setQuery("");
      setLoading(false);
      navigate(store + "/search" + "?keyword=" + query)
    }
  }
  function navigateclickSearch(e) {
 
    setQuery("");
    setLoading(false);
    navigate(store +"/search?keyword=" + wrapperRef.current.value)
  
  
}
  function handleSearchResults() {
    const input = document.getElementById("top_search_input").value;
    if (input === "") {
      setViewResults(false);
      setLoading(false);
    } else {
      setViewResults(true);
    }
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */

      if (viewResults) {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            
            setTimeout(() => setViewResults(false), 200);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [ref, viewResults]);
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    async function search() {
      setLoading(true);
      const res = await axios.get(
        buildLink("search", undefined, window.innerWidth) + query,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("api-token"),
          },
          cancelToken: source.token,
        }
      );
      try {
        setResults(!res?.data?.message && res?.data?.data);
        setMessage(res?.data?.message);
        setLoading(false);
        setViewResults(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.error("axios error", error.message);
        } else {
          console.error(error);
        }
      }
    }
    if (query.length > 1) {
      search();
    } else {
      setLoading(false);
    }

    return () => source.cancel("Previous request is canceled");
  }, [query]);


  return(
     <div className="flex items-center mt-0.5 mx-2.5 md:mx-0">
        <input type="text" name="search_text" id="top_search_input"
        className="h-9 text-dblack2  md:mt-0.5 md:ml-5  xl:mt-0 pl-4 w-full md:w-64 lg:w-96 lg:ml-4 xl:ml-0 xl:w-4500  relative z-10 border-2 border-dbasenavy md:border  md:border-dbordergrey4 outline-none rounded-none "  
       
        placeholder="What are you looking for?"
        onChange={(e) => {
            setQuery(e.target.value);
          }}
        onKeyDown={(e) => {
            navigateSearch(e);
        }}
        onClick={() => {
            handleSearchResults();
         }}
        ref={wrapperRef}
        value={query}
        />
        <button className="w-10 h-9 md:mt-0.5 xl:mt-0 text-center flex justify-center items-center text-d15 bg-dbasenavy md:bg-dgrey9" 
        style={{minWidth: "30px"}} onClick={(e)=>{navigateclickSearch(e)}}>
            <BsSearch className="text-dwhite1 text-d18 md:text-d22"/>
        </button>
        {results.length > 0 && viewResults && (
          <div
            onMouseLeave={() => {
              // setViewResults(false);
              // setOverlay(false);
            }}
            
            className="xl:block lg:block absolute top-24 left-0 w-full md:top-14 md:left-32 z-20 md:w-8/12 text-sm md:text-d16"
            style={{backgroundColor: "#f8f7f7"}}
          >
            {results.length > 1 &&
              results.slice(0, 8).map(({ type, id, value, img, num_prods }) => (
                <Link
                  key={Math.random()}
                  className="px-4 py-2 cursor-pointer hover:bg-dgrey3 flex items-center "
                  to={
                    isNaN(type)
                      //? "search?keyword=" + value
                      ? `${path}/search?keyword=${value}`
                      // : state.admin
                      // ? `${path}/${types[type]}/${id}`
                      : `${path}/${value
                          .replaceAll("/", "-")
                          .replaceAll("%20", "-")}/${types[type]?.slice(
                          0,
                          1
                        )}=${id}`
                  }
                >
                  <span className="flex w-full items-center align-middle  h-auto my-2 px-1 ">
                    <span class="w-12 ">
                      {img.length > 0 ? (
                        <img
                         // onError={(event) => (event.target.src = sq)}
                          width="24"
                          height="24"
                          src={`${window.config["site-url"]}/image/${img}`}
                          //src={`https://www.ishtari.com/image/${img}`}
                          alt=""
                        />
                      ) : types[type] === "seller" ||
                        types[type] === "manufacturer" ? (
                        <img
                          // onError={(event) => (event.target.src = sq)}
                          width="24"
                          height="24"
                        //   src={
                        //     types[type] === "seller" ? sellerImage : brandImage
                        //   }
                          alt=""
                        />
                      ) : (
                        
                        <BsSearch />
                      )}
                    </span>
                    <span className="w-full align-middle ml-1 leading-4 text-left">
                      <span
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: value,
                        }}
                      ></span>
                      <span className="text-dblack1 font-light ml-2">
                        {" "}
                        {num_prods} 
                      </span>{" "}
                    </span>
                  </span>
                  <span className="text-dblack1 text-left  capitalize text-sm">
                    {types[type]}
                  </span>
                </Link>
              ))}
          </div>
        )}
     </div>
  );
}

export default TopSearch;
