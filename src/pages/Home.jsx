import React, { useEffect, useState, useContext } from "react";
import { AccountContext } from "../contexts/AccountContext";
import { Link } from "react-router-dom";
import _axios from "../axios";
import WidgetsLoop from "../components/WidgetsLoop";
import WidgetsLoopMobile from "../components/WidgetsLoopMobile";

import buildLink from "../urls";

function Home() {
  const [data, setData] = useState();
  const [state, dispatch] = useContext(AccountContext);
  console.log(state);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    //  var plusHome = state.admin ?  '&nocahe=true' : ''
    await _axios({
      method: "post",
      url: buildLink("home", undefined, window.innerWidth),
      data: { view: "web_desktop", limit: 20, page: 1 }
    })
      .then((response) => {
        // alert(response?.data?.success)
        if (response?.data?.success) {
          setData(response?.data?.data?.widgets);
        }
      })
      .catch((e) => {});
  }
  return (
    <div className="container pt-3">

      {window.innerWidth < 650
        ? data?.map((widget) => {
            return <WidgetsLoopMobile widget={widget} />;
          })
        : data?.map((widget) => {
            return <WidgetsLoop widget={widget} />;
          })}
    </div>
  );
}

export default Home;
