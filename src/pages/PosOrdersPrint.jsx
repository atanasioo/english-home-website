import React, { useState, useEffect } from "react";
import buildLink from "../urls";
import _axios from "../axios";

export default function PosOrdersPrint() {
  const [storedArray, setMyArray] = useState([]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if(storedArray?.length > 0 && storedArray[0].order_id > 0){
        // console.log(storedArray.length)
        window.print();
      }else{ 
       
        
      }    }, 500); // Delay in milliseconds (2 seconds in this example)
    
 
  
  }, [storedArray]);


  useEffect(() => {
    getOrders();
  }, []);


 
  function getOrders() {
    const stored = localStorage.getItem("orders");
    if (stored) {
      var param = JSON.parse(stored);
      _axios
        .get(buildLink("order_details") + param + "&pos=true")
        .then((response) => {
          if (response.data.success) {
            setMyArray(response?.data?.data);

           
          }
        });
    }

  }


  return (
    <div className="p-4">
      <table class="min-w-full text-left  font-light stripe hover">
        <thead class="border-b font-medium border-DarkGrey">
          <tr>
            <th scope="col" class="px-6 py-4  w-1/12">
              OrderID
            </th>
            <th scope="col" class="px-6 py-4 w-2/12">
              customer name
            </th>
            <th scope="col" class="px-6 py-4  w-1/12">
              telephone
            </th>

            <th scope="col" class="px-6 py-4">
              sub total
            </th>
            <th scope="col" class="px-6 py-4">
              discount
            </th>
            <th scope="col" class="px-6 py-4">
              coupon
            </th>
            <th scope="col" class="px-6 py-4 w-1/12">
              total
            </th>
          </tr>
        </thead>
        <tbody>
          {storedArray?.map((order) => (
            <tr class="border border-DarkGrey ">
              <td class="whitespace-nowrap px-6 py-2 font-medium">
                {order?.order_id}
              </td>
              <td class="whitespace-nowrap px-6 py-2 font-medium">
                {order?.firstname + " "}{" "}
                {order?.lastname !== "Local Customer" && order?.lastname}
              </td>
              <td class="whitespace-nowrap px-6 py-2 font-medium">
                {order?.telephone}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {order?.totals?.map(
                  (item) => item?.code === "sub_total" && item?.text
                )}
              </td>

              <td class="whitespace-nowrap px-6 py-4">
                {order?.totals?.map(
                  (item) => item?.code === "discount" && item?.text
                )}
              </td>

              <td class="whitespace-nowrap px-6 py-4">
                {order?.totals?.map(
                  (item) => item?.code === "coupon" && item?.text
                )}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                {order?.totals?.map(
                  (item) => item?.code === "total" && item?.text
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
