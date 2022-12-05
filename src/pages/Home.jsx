import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import { AccountContext } from "../contexts/AccountContext";
import { Link } from "react-router-dom";
import _axios from "../axios";
import WidgetsLoop from "../components/WidgetsLoop";
import WidgetsLoopMobile from "../components/WidgetsLoopMobile";

import buildLink from "../urls";
import TopCart from "../components/TopCart";
import Loader from "../components/Loader";
import PointsLoader from "../components/PointsLoader";
import CartmenuMobile from "../components/CartmenuMobile";

function Home() {
  const [data, setData] = useState();
  const [state, dispatch] = useContext(AccountContext);
  const [showCartmenu, setShowCartmenu] = useState(false);
  const [showCartmenuMob, setShowCartmenuMob] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingW, setLoadingw] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setIsHasMore] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [hoveredCart, setHoveredCart] = useState(false);
  const observer = useRef();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    getData();
  }, [page, window.innerWidth]);
  async function getData() {
    setLoading(true);
    await _axios({
      method: "post",
      url: buildLink("home", undefined, window.innerWidth),
      data: { view: "web_desktop", limit: 20, page: page },
    })
      .then((response) => {
        // alert(response?.data?.success)
        if (response?.data?.success) {
          setWidgets((prevWidgets) => {
            return [
              ...new Set([...prevWidgets, ...response?.data?.data?.widgets]),
            ];
          });
          //setData(response?.data?.data?.widgets);
        }
        setLoading(false);
        if (page >= response?.data?.data?.meta?.total_pages)
          setIsHasMore(false);
        else setIsHasMore(true);
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
    if (window.innerWidth > 650) {
      setShowCartmenu(true);
      setTimeout(() => {
        setShowCartmenu(false);
        setOverlay(false);
      }, 3000);
    } else {
      setShowCartmenuMob(true);
    }

    setOverlay(true);
  }

  function closeCartMobMenu() {
    setShowCartmenuMob(false);
    setOverlay(false);
  }
  console.log(hoveredCart);

  return (
    <div className="container pt-3 min-h-screen">
      {showCartmenu && (
        <div ref={wrapperRef} onMouseEnter={() => setHoveredCart(true)}>
          <TopCart cartmenu={showCartmenu} />
        </div>
      )}
      {hoveredCart && (
        <>
          <div
            ref={wrapperRef}
            onMouseEnter={() => {
              setHoveredCart(true);
              setOverlay(true);
            }}
            onMouseLeave={() => {
              setTimeout(() => {
                setHoveredCart(false);
                setOverlay(false);
              }, 2000);
            }}
          >
            <TopCart cartmenu={hoveredCart} />
          </div>
          <div
            className={`fixed h-full w-full min-h-full z-10 ${
              showCartmenu ? "bg-transparent" : "bg-dblackOverlay2"
            }  top-0 left-0`}
          ></div>
        </>
      )}

      {showCartmenuMob && (
        <div>
          <CartmenuMobile closemenu={closeCartMobMenu} />
        </div>
      )}
      {overlay && (
        <div
          className="fixed h-full w-full min-h-full z-10 bg-dblackOverlay2 top-0 left-0"
          onClick={() => {
            setOverlay(false);
            setShowCartmenuMob(false);
          }}
        ></div>
      )}

      {window.innerWidth < 650
        ? widgets?.map((widget) => {
            return (
              <WidgetsLoopMobile widget={widget} showCartmenuMob={showCart} />
            );
          })
        : widgets?.map((widget, index) => {
            if (widgets.length === index + 1) {
              return (
                <div className="theHome" ref={lastElementRef} key={widget}>
                  <WidgetsLoop widget={widget} showCartmenu={showCart} />
                </div>
              );
            } else {
              return (
                <div className="">
                  <WidgetsLoop showCartmenu={showCart} widget={widget} />
                </div>
              );
            }
          })}
      {/* {loading && <PointsLoader />} */}
      {loading && <PointsLoader />}
    </div>
  );
}

export default Home;
