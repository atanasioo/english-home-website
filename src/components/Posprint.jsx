import { useContext, useEffect, useState } from "react";
import buildLink from "../urls";
import { useParams } from "react-router-dom";
import _axios from "../axios";
export default function PosPrint(props) {
  var param = useParams().id;
  const [result, setResult] = useState();
  const now = new Date();
  useEffect(() => {
    setResult("");
    console.log("test-1");
    // window.print();
    // window.close();
    // window.printDocument()
    _axios
      .get(buildLink("order_details") + param + "&pos=true")
      .then((response) => {
        if (response.data.success) {
          setResult(response?.data?.data);
        }
      });
  }, [window.location]);

  useEffect(() => {
    // const dateString = now.toLocaleDateString(); // formats date as "mm/dd/yyyy"
    // const timeString = now.toLocaleTimeString(); // formats time as "hh:mm:ss AM/PM"
    // console.log(dateString, timeString);
    if (result?.products?.length > 0) {
      // window.focus();
      window.print();
      // window.click();
      // window.reload();
      window.close();
    }
    // window.close()
  }, [result]);
  // if(!props){
  // window.print()
  // window.close()

  //  }

  // console.log(props)
  return (
    <div className="fixed pb-2 top-0   px-3" style={{ color: "rgb(20,20,20)" }}>
      <div className="w-full text-center text-7xl">
        {window.config["site-name"]}
      </div>
      <div className="w-full text-center text-4xxl"> {result?.order_id}</div>
      <div className="flex w-full  text-4xxl">
        {" "}
        <span className="w-4/12 font-semibold">Customer : </span>{" "}
        <span className="">
          {" "}
          {result?.firstname + "  "}{" "}
          {result?.lastname !== "Local Customer" && result?.lastname}
        </span>
      </div>
      <div className="flex w-full text-4xxl">
        {" "}
        <span className="w-4/12 test-left font-semibold">phone : </span>{" "}
        <span className="">
          {" "}
          {result?.telephone !== "0961" &&  result?.telephone !== 0 &&
            result?.telephone?.replaceAll("0961", "")?.replaceAll("9610", "").replaceAll("961", "")}
        </span>
      </div>
      <div className="flex w-full  pt-3 border-b pb-2  text-4xxl">
        <span className="w-1/2">
          <span className="font-semibold">Date : </span>
          <span className="w-1/2 pl-1">{now.toLocaleDateString()} </span>
        </span>{" "}
        <span>
          <span className="w-1/2 font-semibold">Time : </span>
          <span className="pl-1 w-1/2">{now.toLocaleTimeString()}</span>
        </span>{" "}
      </div>

      <table className="table-fixed text-3xl mt-2 w-full">
        <thead>
          <tr className="font-bold">
            <th className="w-5/12 text-left">Item</th>
            <th className="w-2/12 ">QTY</th>
            <th className="w-2/12 ">Price</th>
            <th className="w-3/12 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {result?.products?.map((p) => (
            <tr>
              <td className="w-5/12 ">{p.name}</td>
              <td className={"text-center text-2/12"}>{p.quantity}</td>
              <td className="w-2/12 text-center">{p.total}</td>
              <td className="w-3/12 text-center">{p.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {result?.products?.length && (
        <div className="flex  w-full text-4xxl mb-8">
          <div className="w-7/12 font-bold">
            Total Items {props?.products?.length}
          </div>

          <div className="w-5/12 ">
            {result?.totals?.map(
              (total) =>
                total.title !== "Store" && (
                  <div className="w-full flex  mb-1">
                    <div className="w-3/4">{total.title}</div>
                    <div className="text-right ">{total.text}</div>
                  </div>
                )
            )}
          </div>
        </div>
      )}

      <div className=" text-4xxl mt-12">
        <span className="font-semibold"> Mode of payment: </span>{" "}
        <span className="mr-1"> Cash</span>
      </div>
      <div className="w-full text-center px-3 text-2xl">
        {" "}
        exchange is allowed in 2 weeks time with the receipt and same same state
        of receiving the items no returns. no refuned allowed
      </div>
    </div>
  );
}
