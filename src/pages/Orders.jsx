import { useState, useEffect, useContext, useRef } from "react";
import buildLink from "../urls";
import _axios from "../axios";
import { useReactToPrint } from "react-to-print";
import { FaEye } from "react-icons/fa";
import { AiOutlinePrinter } from "react-icons/ai";
export default function PosOrders() {
  const [storedArray, setMyArray] = useState([]);
  const [holdArray, setHoldArray] = useState([]);

  const [showDetails, setShowDetails] = useState();
  const [printShow, setPrinthow] = useState();

  const [details, setDetails] = useState();
  const [holdDetails, setHoldDetails] = useState();

  const [date, setDate] = useState();
  const [totals, setTotals] = useState("");
  const [myFilter, setMyFilter] = useState();
  const [manualResponse, setManualResponse] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [stored, setStored] = useState([]);


  const dateref = useRef("");

  function handlePrint(id) {
    const url = "/posprint/" + id;

    const windowFeatures =
      " toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=302.36220472441, height=250";

    // const printWindow =
    window.open(url, "_blank", windowFeatures);
    // console.log("print it");
    // printWindow.onload = () => {
    //   printWindow.print();
    //   printWindow.close();

    // };

    // printWindow.setTimeout(function () {
    //   printWindow.print();
    //   printWindow.close();
    // }, 1000); // s
  }

  function addToLocalStorage(order, id) {
    console.log(order, '---------',id)
    // if(storedArray?.length < 1){
   
    //   stored.push(order)

    // }else{
      setStored((prevArray) => [...prevArray, order]);

    // }

    console.log(holdArray?.filter((item, key) => key !== id))
    
    setHoldArray(holdArray?.filter((item, key) => key !== id));


    setShowDetails("");
  }
  
  useEffect(() => {
    var d = new Date(),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const date = [year, month, day].join("-");
    setDate(date);
    // getOrders(date);
  }, [window.location]);

  useEffect(() => {
    getOrders(date);
  }, [date, stored]);

  function print() {
    const url = "/ordersprint/";

    const windowFeatures =
      " toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes";

    window.open(url, "", windowFeatures);
  }

  function getOrders(date) {
    var sum = 0;
    const stored = localStorage.getItem("orders");
    // alert(storedArray)
    if (stored && date != undefined) {
      var param = JSON.parse(stored);
      _axios
        .get(
          buildLink("order_details") + param + "&pos=true&date_added=" + date
        )
        .then((response) => {
          if (response.data.success) {
            // setMyArray(response?.data?.data);
            console.log(date);
            // calculateSum(date);
            setMyArray(response?.data?.data);
            response?.data?.data?.map((order) => {
              // console.log(order);
              // if (date === order?.date_added) {
              // storedArray.push(order)

              order.totals.map((item) => {
                if (item.code === "total")
                  sum += Number(item?.text?.replace("$", "")); // Replace "columnName" with the actual column you want to sum
              });
              // }
            });
          }
          setTotals(sum);
        });
    }
  }

  useEffect(() => {
    // Load the array from local storage on component mount
    const storedHold = localStorage.getItem("hold-order");
    console.log(JSON.parse(storedHold));
    if (storedHold) {
      setHoldArray(JSON.parse(storedHold));
    }
  }, [window.location]);


  function detailsShow(value) {
    setHoldDetails("");
    setShowDetails(value);

    setDetails(storedArray?.filter((item) => item?.order_id?.includes(value)));
  }

  function detailsHoldShow(value) {
    setDetails("")
    setShowDetails(value);
    setHoldDetails(holdArray[value]);
  }
  function filterDate(e) {
    setMyFilter("");
    // console.log(dateref.current.value)
    var d = new Date(e.target.value),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const date = [year, month, day].join("-");
    console.log(date);
    setDate(date);


    // console.log("storedArray");
    // console.log(storedArray);
    // console.log("myf");
    // console.log(myFilter);
    // // calculateSum(date)
  }
  function filterID(e) {
    e.target.value != ""
      ? setMyArray(
          storedArray?.filter((item) =>
            item?.order_id?.includes(e.target.value)
          )
        )
      : getOrders();
  }
  function filterName(e) {
    e.target.value != ""
      ? setMyArray(
          storedArray?.filter(
            (item) =>
              item?.includes(e.target.value) ||
              item?.lastname?.includes(e.target.value)
          )
        )
      : setMyArray(JSON.parse(localStorage.getItem("orders")));
  }



  function sync() {
    _axios
      .post(buildLink("manual", undefined, window.innerWidth), holdDetails)
      .then((response) => {
        setManualResponse(response?.data?.data);

        if (response?.data?.success === false) {
          console.log(response?.data);
          setError(response?.data?.errors);

          if (
            response?.data?.errors.length === 1 &&
            response?.data.message === "OUT OF STOCK"
          ) {
            return;
          }
        } else {
          setError("");
          paymentForm(true, "cod");
          setManualResponse(response?.data?.data);
        }
      });
  }

  function paymentForm(confirm, p_m) {
    // setLoading(true);
    _axios
      .post(buildLink("payment_form"), { payment_method: p_m })
      .then((response) => {
        const data = response.data;
        try {
          document.getElementById("simp-id").outerHTML = "";
        } catch (e) {}
        const script = document.createElement("script");
        script.src = "https://www.simplify.com/commerce/simplify.pay.js";
        script.async = false;
        script.id = "simp-id";
        document.body.appendChild(script);

        if (data.success) {
          // setId(data.order_id);

          if (p_m === "cod" && confirm) {
            // if (Object.keys(manualErrors.current).length === 0) {
            confirmOrder(data.confirm_url, data.success_url);
            // }
          }
        }
      });
  }
  function confirmOrder(c_url, s_url) {
    _axios.post(c_url).then((response) => {
      const data = response.data;
      if (data.success) {
        successOrder(s_url);
        setSuccess(true);
      }
    });
  }

  function successOrder(url) {
    _axios.get(url).then((response) => {
      const data = response.data;
      if (data.success) {
        addToLocalStorage(data?.data?.orderDetails?.order_id, showDetails);
        console.log(data.data);
        // console.log(manualResponse);

        // handlePrint();
        // history.push("/pos");
      }
    });
  }


  useEffect(() => {
    // Save the array to local storage whenever it changes
    if(stored?.length > 0)
    localStorage.setItem("orders", JSON.stringify(stored));
  }, [stored]);


  useEffect(() => {
    // Save the array to local storage whenever it changes
    localStorage.setItem("hold-order", JSON.stringify(holdArray));
  }, [holdArray]);

  return (
    <div>
      {showDetails && (
        <div
          id="overlay"
          className="fixed  z-40 w-screen h-screen inset-0 bg-dblack bg-opacity-60"
        ></div>
      )}

      {(showDetails  || showDetails === 0 )&& (
        <div class="fixed left-0 top-0   h-full w-full overflow-y-auto overflow-x-hidden outline-none z-50">
          <div class="pointer-events-none relative w-1/2 top-1/3 left-1/4  translate-y-[-50px]  transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
            <div class="p-5  pointer-events-auto relative flex w-full flex-col rounded-md border-dinputBorder bg-white  text-current shadow-lg outline-none">
              <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-dinputBorder z-50	 ">
                <h5
                  class="text-xl font-medium leading-normal"
                  id="exampleModalLabel"
                >
                  Order Details
                </h5>

                {error?.length > 0 &&
                  error?.map(
                    (err) =>
                      (err?.errorCode === "stock" ||
                        err?.errorCode === "option") && (
                        <p className="  m-1 text-dbase text-d22">
                          {error[0]?.errorMsg}
                        </p>
                      )
                  )}
                <button onClick={() => setShowDetails("")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div>
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border font-medium border-DarkGrey">
                    <tr>
                      <th scope="col" class="px-2 py-4">
                        #
                      </th>
                      <th scope="col" class="py-4">
                        product
                      </th>
                      <th scope="col" class="pr-4 py-4">
                        sku
                      </th>
                      <th scope="col" class=" py-4">
                        Model
                      </th>
                      <th scope="col">price</th>
                      <th scope="col" class=" py-4">
                        QTY
                      </th>

                      <th scope="col" class="py-4">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details &&
                      details[0]?.products?.map((order, key) => (
                        <tr class="border border-DarkGrey ">
                          <td class="whitespace-nowrap px-4 py-2 font-medium">
                            {key + 1}
                          </td>
                          <td class="whitespace-nowrap py-2">{order?.name}</td>
                          {/* <td class="whitespace-nowrap px-6 py-4">${order.sub_total}</td> */}
                          <td class="whitespace-nowrap  py-2">{order?.sku}</td>
                          <td class="whitespace-nowrap  py-2">
                            {order?.model}
                          </td>
                          <td class="whitespace-nowrap  py-2">
                            {order?.price}
                          </td>
                          <td class="whitespace-nowra py-2">
                            {order?.quantity}
                          </td>

                          <td class="whitespace-nowrap  py-2">
                            {order?.total}
                          </td>
                        </tr>
                      ))}

                    {holdDetails &&
                      holdDetails?.order_product?.map((order, key) => (
                        <tr class="border border-DarkGrey ">
                          <td class="whitespace-nowrap px-4 py-2 font-medium">
                            {key + 1}
                          </td>
                          <td class="whitespace-nowrap py-2">{order?.name} - {  order?.order_option[0] && (order?.order_option[0]?.name +":"+  order?.order_option[0]?.value)}</td>
                          {/* <td class="whitespace-nowrap px-6 py-4">${order.sub_total}</td> */}
                          <td class="whitespace-nowrap  py-2">{order?.sku}</td>
                          <td class="whitespace-nowrap  py-2">
                            {order?.model} 
                          </td>
                          <td class="whitespace-nowrap  py-2">
                            {order?.unit_price}
                          </td>
                          <td class="whitespace-nowra py-2">
                            {order?.quantity}
                          </td>

                          <td class="whitespace-nowrap  py-2">
                            {order?.price}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  {holdDetails && (
                    <tfoot>
                      <tr class="border border-DarkGrey ">
                        <td
                          class="whitespace-nowrap  py-2 pr-8 font-medium text-right"
                          colspan="5"
                        >
                          Sub Total
                        </td>
                        <td class="whitespace-nowrap  py-2">
                          {holdDetails?.sub_total}
                        </td>
                      </tr>
                      {holdDetails?.modification_amount && (
                        <tr class="border border-DarkGrey ">
                          <td
                            class="whitespace-nowrap  py-2 pr-8 font-medium text-right"
                            colspan="5"
                          >
                            {holdDetails?.modification_type}
                          </td>
                          <td class="whitespace-nowrap  py-2">
                            {holdDetails?.modification_amount}
                          </td>
                        </tr>
                      )}

                      {holdDetails.coupon && (
                        <tr class="border border-DarkGrey ">
                          <td
                            class="whitespace-nowrap  py-2 pr-8 font-medium text-right"
                            colspan="5"
                          >
                            Coupon
                          </td>
                          <td class="whitespace-nowrap  py-2">
                            {holdDetails?.coupon}
                          </td>
                        </tr>
                      )}
                      <tr class="border border-DarkGrey ">
                        <td
                          class="whitespace-nowrap  py-2 pr-8 font-medium text-right"
                          colspan="5"
                        >
                          Total
                        </td>
                        <td class="whitespace-nowrap  py-2">
                          {holdDetails?.order_total}
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            <div className="flex justify-between">
            <div class="text-dbase pt-2 ">Reason {holdDetails?.hold_reason}</div>

              <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-dinputBorder pt-3">

                <button
                  className="bg-dblue text-white py-2 px-3 rounded ml-3"
                  onClick={() => sync("")}
                >
                  sync
                </button>
                <button
                  className="bg-dgreyRate p-2  rounded ml-3"
                  onClick={() => detailsShow("")}
                >
                  Close
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between mt-6">
        <div className="px-5">
          {" "}
          Date{" "}
          <input
            type="date"
            className="px-5 border ml-2"
            onChange={(e) => filterDate(e)}
            value={date}
            style={{ borderColor: "rgb(200, 200, 200)" }}
            // ref={dateref}
          />
          {/* <button
          className="px-5 bg-dblue text-white py-2 rounded-md ml-5 float-right mr-6 mt-3"
          filter={(e) => filterDate(e)}
        >
          Print
        </button> */}
        </div>

        <button
          className="px-5 bg-dblue text-white py-2 rounded-md ml-5 float-right mr-6 mt-3"
          onClick={print}
        >
          Print
        </button>
      </div>

      <div class="flex w-full flex-col p-5">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left  font-light stripe hover">
                <thead class="border-b font-medium border-DarkGrey">
                  <tr>
                    <th scope="col" class="px-6 py-4  w-1/12">
                      OrderID
                    </th>
                    <th scope="col" class="px-6 py-4 w-2/12">
                      customer name
                    </th>
                    <th scope="col" class="px-6 py-4 w-2/12">
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
                    <th scope="col" class="px-6 py-4">
                      Order Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr class="border-b border-DarkGrey">
                    <td class="whitespace-nowrap px-6 py-4 font-medium">
                      <input
                        className="w-full border border p-2 rounded border-DarkGrey"
                        onChange={(e) => filterID(e)}
                      />
                    </td>
                    <td class="whitespace-nowrap">
                      <input
                        className="w-full border border-DarkGrey p-2 rounded "
                        onChange={(e) => filterName(e)}
                      />
                    </td>
                    <td class="whitespace-nowrap px-6 py-4"></td>
                    <td class="whitespace-nowrap px-6 py-4"></td>
                  </tr> */}
                  {storedArray?.length > 0 &&
                    storedArray?.map(
                      (order) => (
                        // date === order.date_added && (
                        <tr class="border border-DarkGrey ">
                          <td class="whitespace-nowrap px-6 py-2 font-medium">
                            {order?.order_id}
                          </td>
                          <td class="whitespace-nowrap px-6 py-2 font-medium">
                            {order?.firstname + " "}{" "}
                            {order?.lastname !== "Local Customer" &&
                              order?.lastname}
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
                              (item) =>
                                item?.code === "modification" &&
                                item?.text + " (" + item.title + ")"
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
                          <td class="whitespace-nowrap px-6 py-2 flex">
                            <button
                              class="bg-transparent hover:bg-dblue text-blue-700 font-semibold hover:text-white py-3 px-3 border border-blue-500 hover:border-transparent rounded-full"
                              onClick={() => detailsShow(order?.order_id)}
                            >
                              <FaEye />
                            </button>

                            <button
                              href={"/posprint/" + order?.order_id}
                              // target="_blank"
                              class="ml-2 bg-transparent hover:bg-dblue text-blue-700 font-semibold hover:text-white py-3 px-3 border border-blue-500 hover:border-transparent rounded-full"
                              onClick={() => handlePrint(order?.order_id)}
                            >
                              <AiOutlinePrinter />
                            </button>
                          </td>
                        </tr>
                      )
                      // )
                    )}

                  {holdArray?.length > 0 &&
                    holdArray?.map(
                      (order, key) => (
                        // date === order.date_added && (
                        <tr class="border border-DarkGrey bg-dmenusep bg-opacity-40 ">
                          <td class="whitespace-nowrap px-6 py-2 font-medium ">
                            hold
                          </td>
                          <td class="whitespace-nowrap px-6 py-2 font-medium">
                            {order?.firstname + " "}{" "}
                            {order?.lastname !== "Local Customer" &&
                              order?.lastname}
                          </td>
                          <td class="whitespace-nowrap px-6 py-2 font-medium">
                            {order?.telephone}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            {order.sub_total}
                          </td>

                          <td class="whitespace-nowrap px-6 py-4">
                            {order.modification_amount}
                          </td>

                          <td class="whitespace-nowrap px-6 py-4">
                            {order.coupon}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                            {order.order_total}
                          </td>
                          <td class="whitespace-nowrap px-6 py-2 flex">
                            <button
                              class="bg-transparent hover:bg-dblue text-blue-700 font-semibold hover:text-white py-3 px-3 border border-blue-500 hover:border-transparent rounded-full"
                              onClick={() => detailsHoldShow(key)}
                            >
                              <FaEye />
                            </button>

                            <button
                              href={"/posprinthold/" + key}
                              // target="_blank"
                              class="ml-2 bg-transparent hover:bg-dblue text-blue-700 font-semibold hover:text-white py-3 px-3 border border-blue-500 hover:border-transparent rounded-full"
                              onClick={() => handlePrint(key)}
                            >
                              <AiOutlinePrinter />
                            </button>
                          </td>
                        </tr>
                      )
                      // )
                    )}
                </tbody>
              </table>
            </div>
          </div>

          <div className=" pr-7 fixed bottom-0 px-12 py-6 w-full  text-d22 font-semibold bg-white border-t border-DarkGrey">
            <div className="flex justify-between">
              <div className=""></div>
              <div className=""> Totals ${totals > 0 ? totals : 0}</div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
