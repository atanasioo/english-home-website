import React, { useEffect, useState, useContext, useRef } from "react";
import { AccountContext } from "../contexts/AccountContext";
import { Link } from "react-router-dom";
import _axios from "../axios";
import WidgetsLoop from "../components/WidgetsLoop";
import WidgetsLoopMobile from "../components/WidgetsLoopMobile";

import buildLink from "../urls";
import TopCart from "../components/TopCart";
import Loader from "../components/Loader";
import PointsLoader from "../components/PointsLoader";

function Home() {
  const [data, setData] = useState();
  const [state, dispatch] = useContext(AccountContext);
  const [showCartmenu, setShowCartmenu] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [loading, setLoading]= useState(true);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  console.log(state);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    //  var plusHome = state.admin ?  '&nocahe=true' : ''
    await _axios({
      method: "post",
      url: buildLink("home", undefined, window.innerWidth),
      data: { view: "web_desktop", limit: 20, page: 1 },
    })
      .then((response) => {
        // alert(response?.data?.success)
        if (response?.data?.success) {
          setData(response?.data?.data?.widgets);
          setLoading(false);
        }
      })
      .catch((e) => {});
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */

      if (showCartmenu) {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            //console.log(ref.current.contains(event.target))
            setTimeout(() => setShowCartmenu(false), 200);
            setTimeout(() => setOverlay(false), 200);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }
    }, [ref, showCartmenu]);
  }

  function showCart() {
    setShowCartmenu(true);
    setOverlay(true);
  }

  return (
    <div className="container pt-3">
      {showCartmenu && (
        <div ref={wrapperRef}>
          <TopCart cartmenu={showCartmenu} />
        </div>
      )}
       {overlay && (
        <div
          className="fixed h-full w-full min-h-full z-10 bg-dblackOverlay2 top-0 left-0"
          onClick={() => {
            setOverlay(false);
          }}
        ></div>
      )}

      {window.innerWidth < 650
        ? data?.map((widget) => {
            return <WidgetsLoopMobile widget={widget} />;
          })
        : data?.map((widget) => {
            return <WidgetsLoop widget={widget} showCartmenu={showCart} />;
          })}
          {loading && <PointsLoader />}
    </div>
  );
}

export default Home;
