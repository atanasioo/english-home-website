import React, { useEffect, useState, useContext } from "react";
import { AccountContext } from "../contexts/AccountContext";
import { Link } from "react-router-dom";
import _axios from "../axios";
import WidgetsLooop from "../components/WidgetsLoop";
import buildLink from "../urls";

function Home() {
  const [data, setData] = useState();
  const [state, dispatch] = useContext(AccountContext);
  console.log(state);
  useEffect(() => {
    getData();
  },[]);
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
    <div className="containner">
 
      
      {window.innerWidth < 650
        ?
        <div></div>
        : data?.map((widget) => {
            return <WidgetsLooop widget={widget} />;
          })}
    </div>
  );
}

export default Home;
