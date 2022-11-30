import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import _axios from "../axios";
// import PointsLoader from "../components/PointsLoader";
import { AccountContext } from "../contexts/AccountContext";
import buildLink from "../urls";
import { useWindowDimensions } from "../components/Header";

function OrderDetails() {
  const [data, setData] = useState();
  const [email, setEmail] = useState("");
  const [state] = useState(AccountContext)
  const location = useLocation();
  const id  = location.search.replaceAll("?",'') || "";
console.log(id)
  const  width  = window.innerWindow;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    _axios.get(buildLink("order_details",undefined,window.innerWidth) + id).then((response) => {
      setData(response?.data.data);
      setLoading(false);
    });
    _axios.get(buildLink("get_account",undefined,window.innerWidth)).then((response) => {
      setEmail(response.data.data.email);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="bg-dgrey10">

        <div className="px-2 pb-5 md:px-0 md:mx-24 md:pb-14 -mt-5">
          <div className="flex justify-between mt-5 text-sm font-bold">
            <p>#{data?.order_id}</p>
            <p>{data?.date_added}</p>
          </div>
          <div className="mt-5">
            <p className="text-xs font-semibold">
              {data?.firstname + " "}
              {data?.lastname}
            </p>
            <p className="text-xs">{data?.telephone}</p>
            <p className="text-xxs text-gray-600">{email}</p>
          </div>

          <div className="flex-row md:flex mt-5 pb-7  border-b  border-dgrey1 justify-between">
            <div className="w-full md:w-1/2 border  border-dgrey shadow-lg mr-5 rounded-md">
              {/* right */}
              <p className="cart-header">Shipping Address</p>
              <div className="cart-body">
                <p className="text-sm py-5 mx-3 rounded-t-md border-b text-dblack border-dgrey1">
                  {data?.firstname + " "}
                  {data?.lastname}
                </p>
                <p
                  className="mt-5 text-sm mx-3 pb-2"
                  dangerouslySetInnerHTML={{ __html: data?.shipping_address }}
                ></p>
              </div>
            </div>
            <div className="w-full md:w-1/2 border mt-3 md:mt-0 border-dgrey shadow-lg rounded-md">
              {/* right */}
              <p className="cart-header">Payment Address</p>
              <div className="cart-body">
                <p className="text-sm py-5 mx-3 rounded-t-md border-b text-dblack border-dgrey1">
                  {data?.firstname + " "}
                  {data?.lastname}
                </p>
                <p
                  className="mt-5 text-sm mx-3 pb-2 "
                  dangerouslySetInnerHTML={{ __html: data?.payment_address }}
                ></p>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-7">
            {width > 650 ? (
              <table className="w-full  text-left">
                <thead className="border">
                  <th className=" border-l  px-4  py-1 text-sm">#</th>
                  <th className="border-l px-2 md:px-4 py-1  text-sm">
                    Product
                  </th>
                  <th className="border-l px-4 md:px-4 py-1  text-sm">SKU</th>
                  <th className="border-l px-2 md:px-4 py-1  text-sm">
                    Quantity
                  </th>
                  <th className="border-l px-2 md:px-4 py-1  text-sm">Price</th>
                  <th className="px-2 border-l md:px-4  py-1 text-sm">Total</th>
                </thead>
                {data?.products?.map((data) => (
                  <tr className="border">
                    <td className="border  px-4">
                      <img className="w-12" src={data.image} alt="" />
                    </td>
                    <td className="px-4 text-sm ">{data.name}</td>
                    <td className="border   px-4 text-sm">{data.model}</td>
                    <td className="border  px-4 text-sm">{data.quantity}</td>
                    <td className="border  px-4 text-sm">{data.price}</td>
                    <td className="border  px-4 text-sm">{data.total}</td>
                  </tr>
                ))}
              </table>
            ) : (
              <table className="w-full  text-left">
                <thead className="border">
                  <div className="hidden md:block">
                    {" "}
                    <th className=" border-l  px-4  py-1 text-sm">#</th>
                  </div>
                  <th className="border-l px-2  py-1  text-sm">Product</th>
                  <th className="border-l px-4  py-1  text-sm">SKU</th>
                  <th className="border-l px-2  py-1  text-sm">Quantity</th>
                  <th className="border-l px-2  py-1  text-sm">Price</th>
                  <th className="border-l px-2  py-1 text-sm">Total</th>
                </thead>
                {data?.products.map((data) => (
                  <tr className="border">
                    <div className="hidden md:flex-wrap">
                      {" "}
                      <td className="border  px-4">
                        <img className="w-12" src={data.image} alt="" />
                      </td>
                    </div>
                    <td className=" px-2 md:px-4 text-sm line-clamp-3 md:line-clamp-none">
                      {data.name}
                    </td>
                    <td className="border  px-2 md:px-4 text-sm">
                      {data.model}
                    </td>
                    <td className="border px-2 md:px-4 text-sm">
                      {data.quantity}
                    </td>
                    <td className="border px-2 md:px-4 text-sm">
                      {data.price}
                    </td>
                    <td className="border px-2 md:px-4 text-sm">
                      {data.total}
                    </td>
                  </tr>
                ))}
              </table>
            )}
          </div>
          <div className="flex justify-between mt-5 md:mt-10 border-b border-dgrey1 pb-2 items-centre">
            {data?.totals.map((data) => (
              <div>
                <div className="flex-row  ">
                  <p className="border-b border-dgrey1"> {data.title} </p>
                </div>
                <div>
                  <p className="mt-4"> {data.text} </p>
                </div>
              </div>
            ))}
          </div>
        </div>

    </div>
  );
}

export default OrderDetails;
