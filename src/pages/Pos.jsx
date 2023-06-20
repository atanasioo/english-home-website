import _axios from "../axios";
import { useState, useEffect, useContext, useRef } from "react";
import buildLink from "../urls";
import { CartContext } from "../contexts/CartContext";
import HandlePhoneModel from "../components/PhoneHandler";
import PointsLoader from "../components/PointsLoader";
import { useNavigate} from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";
import PosPrint from "../components/Posprint";
import { AccountContext } from "../contexts/AccountContext";
import Cookies from "js-cookie";
export default function Pos() {
  const [stateAccount, dispatchA] = useContext(AccountContext);

  const [cart, setCart] = useState();
  const [selectCart, SetSelectCart] = useState();
  const [state, dispatch] = useContext(CartContext);
  const [isValid, setIsValid] = useState(true);
  const [confirmDisable, setConfirmDisalbe] = useState(false);
  const [showCalculte, setShowCalculate] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [modificationError, setModificationError] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState(false);
  const [holdArray, setHoldArray] = useState([]);

  const [success, setSuccess] = useState(false);
  // const printRef = useRef();
  const qtyRef = useRef("");

  const typeRef = useRef("");
  const amountRef = useRef("");
  const remarqueRef = useRef("");

  // const [telephone, setTelephone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [coupon, setCoupon] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({});
  const [errorProduct, setErrorProduct] = useState("");
  const [change, setChange] = useState();
  const [id, setId] = useState();
  const [opacity, setOpacity] = useState(false);

  const [manualResponse, setManualResponse] = useState();
  const [myArray, setMyArray] = useState([]);
  const [users, setUsers] = useState([]);

  const firstname = useRef("");
  const lastname = useRef("");

  const telephone = useRef("");
  const navigate = useNavigate();
  const couponRef = useRef("");


  useEffect(() => {
    // Load the array from local storage on component mount
    const storedHold = localStorage.getItem("hold-order");
    if (storedHold) {
      setHoldArray(JSON.parse(storedHold));
    }
  }, []);

  useEffect(() => {
    // Save the array to local storage whenever it changes

    localStorage.setItem("hold-order", JSON.stringify(holdArray));
  }, [holdArray]);

  function setCoupon() {
    if (couponRef.current.value.length > 1) {
      manual(false, false, true);
    } else {
    }
  }
  function neworder() {
    setCart("");
    SetSelectCart("");
    setManualResponse("");
    setConfirmDisalbe(false);
    setError({});
    setFirstName("");
    setLastName("");
    setErrorProduct("");
    // setCoupon("");
    couponRef.current.value = "";
    typeRef.current.value = "";
    amountRef.current.value = "";
    remarqueRef.current.value = "";
    setSuccess(false);
    setOrderSuccess(false);
    setOpacity(false);
    dispatch({
      type: "setProducts",
      payload: []
    });
    dispatch({
      type: "setTotals",
      payload: 0
    });
    dispatch({
      type: "setProductsCount",
      payload: 0
    });
    firstname.current.value = "";
    lastname.current.value = "";
    telephone.current.value = "";
    amountRef.current.value = "";
    remarqueRef.current.value = "";
    typeRef.current.value = "";

    telephone.current.value = "";
    console.log("yess");
    var body = {
      order_product: [],
      customer_id: "",
      firstname: "initial firstname",
      lastname: "initial lastname",
      email: "initialmail@mail.com",
      address_1: "initial address one",
      telephone: "00000000",
      address_2: "",
      city: "",
      shipping_method: "Delivery ( 1-4 days )",
      shipping_code: "ultimate_shipping.ultimate_shipping_0",
      payment_method: "Cash On Delivery",
      payment_code: "cod",
      comment: "",
      country_id: window.config["zone"],
      payment_session: "",
      zone_id: "",
      zone: "",
      modification_type: "",
      modification: "",
      modification_remarque: "",

      is_web: true,
      //   Cookies.get("change") === "false" || Cookies.get("change") === false
      //     ? false
      //     : true,
      user_id: Cookies.get("salsMan")
        ? Cookies.get("salsMan")
        : Cookies.get("user_id"),

      source_id: 1,
      coupon: "",
      code_version: window.innerWidth > 600 ? "web_desktop" : "web_mobile"
    };
    _axios
      .post(buildLink("manual", undefined, window.innerWidth), body)
      .then((response) => {
        // setManualResponse(response?.data?.data);
      });
    document.getElementById("code").focus();
  }

  const phoneHanlder = (childData, isValid) => {
    // console.log(telephone.current.value);
    if (isValid === true) {
      telephone.current.value = childData;
    } else {
      telephone.current.value = childData;
    }

    setIsValid(isValid);
  };
  const AdminPhoneHandler = (obj, isValid) => {
    console.log(obj);
    if (isValid) {
      firstname.current.value = obj.firstname !== "undefined" && obj.firstname;
      lastname.current.value = obj.lastname !== "undefined" && obj.lastname;
      telephone.current.value = obj.telephone;

      const data = {
        name: obj.city,
        value: obj.zone
      };
      manual(false);
    }
    const onEscape = function (action) {
      window &&
        window.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            action();
          }
        });
    };
    onEscape(() => {
      telephone.current.blur();
    });
  };

  useEffect(() => {
    // Load the array from local storage on component mount
    const storedArray = localStorage.getItem("orders");
    if (storedArray) {
      setMyArray(JSON.parse(storedArray));
    }
  }, []);

  useEffect(() => {
    // Save the array to local storage whenever it changes

    localStorage.setItem("orders", JSON.stringify(myArray));
  }, [myArray]);

  function modification() {
    setModificationError({});
    // alert(amountRef.current.value )
    if (remarqueRef.current.value === "" && amountRef.current.value === "") {
      setModificationError({
        remarque: "remarque is required",
        amount: "modifiction number is required"
      });
    } else if (amountRef.current.value === "") {
      setModificationError({ amount: "modifiction number is required" });
    } else if (remarqueRef.current.value === "") {
      setModificationError({
        remarque: "remarque is required"
      });
    } else {
      manual(false, false, true);
    }
  }
  function getcart() {
    _axios.get(buildLink("cart", undefined, undefined)).then((response) => {
      if (response.error) {
        setCart([]);
        // setError("Product Not found");
      } else {
        setCart(response?.data?.data);
        // manual()
      }
    });
  }

  function getUsers() {
    _axios
      .get(buildLink("getSalesMan", undefined, undefined))
      .then((response) => {
        console.log(response?.data);
        if (response) {
          setUsers(response?.data);
        }
      });
  }
  useEffect(() => {
    document.getElementById("code")?.focus();

    getcart();
    getUsers();
    // if(window?.location?.href.indexOf('new_tab')> -1){
    //   neworder()

    // }
  }, [window.location]);

  useEffect(() => {
    if (cart?.products?.length > 0) {
      // alert(1)
      // manual(true);
    }
  }, [cart]);

  function changeResult(value) {
    // cart?.totals?.map((total) => {
    //   if (total.title === "Total") {
    //     setChange(total.value);
    //   }
    // });

    if (value !== "") {
      cart?.totals?.map((total) => {
        if (total.title === "Total") {
          setChange(total.value - Number(value));
        }
      });
    } else {
      cart?.totals?.map((total) => {
        if (total.title === "Total") {
          setChange(total.value);
        }
      });
    }
  }

  function addToCart(e) {
    setErrorProduct("");

    if (e.target.value.trim() !== "" && e.key === "Enter") {
      setLoader(true);

      // Send request
      var obj = {
        code: e.target.value
      };
      _axios
        .post(buildLink("pos", undefined, undefined), obj)
        .then((responses) => {
          if (responses.status === 200 && responses.data.success) {
            _axios
              .get(buildLink("cart", undefined, window.innerWidth))
              .then((response) => {
                setLoader(false);
                setCart([]);

                setCart(response?.data?.data);
                SetSelectCart();
                ////manual(false);
                dispatch({
                  type: "setProducts",
                  payload:
                    response.data?.data?.products?.length > 0
                      ? response.data.data.products
                      : []
                });
                dispatch({
                  type: "setTotals",
                  payload:
                    response.data?.data?.totals?.length > 0
                      ? response.data.data.totals
                      : 0
                });
                dispatch({
                  type: "setProductsCount",
                  payload:
                    response.data?.data?.total_product_count > 0
                      ? response.data.data.total_product_count
                      : 0
                });
                dispatch({
                  type: "loading",
                  payload: false
                });
              });
            document.getElementById("code").value = "";
          } else {
            setErrorProduct(responses?.data?.errors && responses?.data?.errors[0]?.errorMsg);
            setLoader(false);
          }
        });
      document.getElementById("code").focus();
    }
    if (e.target.value?.length < 1) {
      FocusCart(e);
    }
  }

  function search(e) {
    const value = e.target.value;

    _axios
      .get(buildLink("searchProduct", undefined, undefined) + value)
      .then((response) => {
        console.log(response?.data);
        if (response.data.success) {
          setDataSearch(response?.data?.data);
        }
      });
  }
  function FocusCart(e) {
    document.getElementById("item0").focus();
    SetSelectCart(0);
  }
  function handleClick(e, i, qty, cartId) {
    // up arrow
    var select;
    if (e.keyCode === 38) {
      if (i != 0) {
        select = i - 1;
        SetSelectCart(select);
        // select = select - 1;
        console.log("item" + select);
        document.getElementById("item" + select).focus();
      } else {
        select = Number(cart?.products?.length) - 1;
        SetSelectCart(select);
        select = Number(cart?.products?.length) - 1;
        document.getElementById("item" + select).focus();
      }
    }
    //down arrow
    if (e.keyCode === 40) {
      if (cart.products.length > i + 1) {
        SetSelectCart(i + 1);

        select = i + 1;
        document.getElementById("item" + select).focus();
      } else {
        SetSelectCart(0);
        document.getElementById("item0").focus();
      }
    }
    console.log(e);
    //left Arrow  qty - 1
    if (qty > 0 && e.keyCode === 37) {
      qty = Number(qty) - 1;
      updatequnatity(cartId, qty, i);
    }

    //right arrow aty + 1
    if (e.keyCode === 39) {
      qty = Number(qty) + 1;
      updatequnatity(cartId, qty, i);
    }
    if (e.keyCode === 88) {
      updatequnatity(cartId, 0);
    }
    if (e.keyCode === 13) {
      updatequnatity(cartId, qtyRef.current.value);
    }
  }

  function changeQuantity(key, quantity , i) {
    console.log("omar" + quantity);
    console.log("omar" + i);
    document.getElementById("item" + i).value = quantity;

    updatequnatity(key, quantity);
  }

  function updatequnatity(key, quantity, i) {
    const obj = { key, quantity };
    _axios
      .put(buildLink("cart", undefined, window.innerWidth), obj)
      .then(() => {
        _axios
          .get(buildLink("cart", undefined, window.innerWidth))
          .then((response) => {
            setCart([]);
            setCart(response?.data?.data);

            dispatch({
              type: "setProducts",
              payload:
                response.data?.data?.products?.length > 0
                  ? response.data.data.products
                  : []
            });
            dispatch({
              type: "setTotals",
              payload:
                response.data?.data?.totals?.length > 0
                  ? response.data.data.totals
                  : 0
            });
            dispatch({
              type: "setProductsCount",
              payload:
                response.data?.data?.total_product_count > 0
                  ? response.data.data.total_product_count
                  : 0
            });
            dispatch({
              type: "loading",
              payload: false
            });
            if (quantity === 0) {
              window.location.reload();
            }
            // if (quantity > 0) document.getElementById("item" + i).focus();
          });
      });
  }
  function confirmPos(confirm, calculate) {
    setConfirmDisalbe(true);
    manual(confirm, calculate);
  }
  function manual(confirm, calculate, bool) {
    // console.log("manual");
    // window.scroll(0, 0);
    let body = {};
    // if it's first attemp
    setError({});
    let temp = [];
    const dt = cart?.products;
    for (let index = 0; index < dt?.length; index++) {
      let new_product = {};
      let product_option = {};
      new_product.product_id = dt[index]["product_id"];
      new_product.quantity = dt[index]["quantity"];
      if (dt[index]["option"].length !== 0) {
        product_option["type"] = "radio";
        product_option["product_option_id"] =
          dt[index]["option"][0]["product_option_id"];
        product_option["product_option_value_id"] =
          dt[index]["option"][0]["product_option_value_id"];

        new_product.order_option = [product_option];
      }
      temp.push(new_product);
    }
    console.log("manual-2");
    if (!typeRef.current.value && !amountRef.current.value) {
      body = {
        order_product: temp,
        // customer_id: customerId,
        firstname: firstname?.current?.value || firstName,
        lastname: lastname?.current?.value || lastName || "Local Customer",
        email: email || "",
        address_1: "store",
        telephone: telephone?.current?.value || "96100000000",
        address_2: "store store",
        city: "",
        shipping_method: "Delivery ( 1-4 days )",
        shipping_code: "ultimate_shipping.ultimate_shipping_0",
        payment_method: "Cash On Delivery",
        payment_code: "cod",
        comment: "",
        country_id: window.config["zone"],
        zone_id: 3995,
        user_id: Cookies.get("salsMan") ? Cookies.get("salsMan") : "",
        modification_type: typeRef.current.value || "",
        modification: amountRef.current.value || "",
        modification_remarque: remarqueRef.current.value || "",
        zone: "Store",
        town_id: "",
        town: "",
        is_web: true,
        payment_session: false,
        source_id: 1,
        coupon: couponRef.current.value || "",
        code_version: window.innerWidth > 600 ? "web_desktop" : "web_mobile"
      };
    } else {
      body = {
        order_product: temp,
        // customer_id: customerId,
        firstname: firstname?.current?.value || firstName,
        lastname: lastname?.current?.value || lastName || "Local Customer",
        email: email || "",
        address_1: "store",
        telephone: telephone?.current?.value || "96100000000",
        address_2: "store store",
        city: "",
        shipping_method: "Delivery ( 1-4 days )",
        shipping_code: "ultimate_shipping.ultimate_shipping_0",
        payment_method: "Cash On Delivery",
        payment_code: "cod",
        comment: "",
        country_id: window.config["zone"],
        zone: "Store",

        zone_id: 3995,
        modification_type: typeRef.current.value,
        modification: amountRef.current.value,
        modification_remarque: remarqueRef.current.value,
        currency_code: "USD",
        order_total: cart?.totals?.find((t) => t.code === "total")?.value,
        user_id: Cookies.get("salsMan") ? Cookies.get("salsMan") : "",

        town_id: "",
        town: "",
        is_web: true,
        payment_session: false,
        source_id: 1,
        coupon: couponRef.current.value || "",
        code_version: window.innerWidth > 600 ? "web_desktop" : "web_mobile"
      };
    }

    _axios
      .post(buildLink("manual", undefined, window.innerWidth), body)
      .then((response) => {
        setManualResponse(response?.data?.data);

        if (response?.data?.success === false) {
          console.log(response?.data);
          setError(response?.data?.errors);

          if(response?.data?.errors.length === 1 &&  (response?.data.message ==="OUT OF STOCK" || response?.data?.message?.indexOf('STOCK') > -1 ||  response?.data?.message?.indexOf('Stock') > 0 ||  response?.data?.message?.indexOf('stock') > 0) ){
            setSuccess(true);
            body.hold_reason  = response?.data.message 
            addToHold(body)    
            setShowCalculate(false);
            setOpacity(true);
          
            handlePrintHolder(holdArray.length)
          }
         
        } else {
          if (calculate === true) {
            setShowCalculate(true);
            cart?.totals?.map((total) => {
              if (total.title === "Total") {
                setChange(total.value);
              }
            });
            document.getElementById("rendered").focus();
          } else {
            paymentForm(confirm, "cod");
            setManualResponse(response?.data?.data);
          }
        }

        if (bool === true) {
          getcart();
        }
        setConfirmDisalbe(false);
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
          setId(data.order_id);

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
        setOrderSuccess(true);
        // handlePrint();
        setShowCalculate(false);
        setOpacity(true);
        handlePrint(data.data.orderDetails.order_id);
        addToLocalStorage(data?.data?.orderDetails?.order_id);
        console.log(data.data);
        // console.log(manualResponse);

        // handlePrint();
        // navigate.push("/pos");
      }
    });
  }
  function addToLocalStorage(order) {
    setMyArray((prevArray) => [...prevArray, order]);
  }
  function addToHold(order) {
    setHoldArray((prevArray) => [...prevArray, order]);
  }

  function handlePrintHolder(id) {
    const url = "/posprinthold/"+id

    const windowFeatures =
      " toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=302.36220472441, height=250";

    window.open(url, "_blank", windowFeatures);
 
  }

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current
  // } );

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

  function newTab() {
    const windowFeatures =
      " toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, wid";

    // const printWindow =
    window.open("/pos?new_tab", "_blank", windowFeatures);
  }
  function handleCouponChange() {
    if (couponRef.current.value.length < 1) {
      couponRef.current.value = "";
    }
  }
  return (
    <div>
      {stateAccount.admin && (
        <div className="overflow-hidden">
          {showCalculte && (
            <div class="fixed left-0 top-0 z-[1055]  h-full w-full overflow-y-auto overflow-x-hidden outline-none">
              <div class="pointer-events-none relative w-1/4 top-1/3 left-1/3  translate-y-[-50px]  transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                <div class="p-5 min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-dinputBorder bg-white  text-current shadow-lg outline-none ">
                  <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-dinputBorder ">
                    <h5
                      class="text-xl font-medium leading-normal"
                      id="exampleModalLabel"
                    >
                      Complete Order
                    </h5>
                    <button onClick={() => setShowCalculate(false)}>
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

                  <div class="relative flex-auto p-4">
                    <div>
                      <label className="w-1/2">rendered : </label>
                      <input
                        className="w-1/2 border ml-3 border-dinputBorder p-2 "
                        id="rendered"
                        onChange={(e) => changeResult(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="relative flex-auto p-4">
                    <div>
                      <label className="w-1/2">Change : </label>
                      <span className="w-1/2 border ml-3 border-dinputBorder bg-dgreyRate p-2">
                        {change}{" "}
                      </span>
                    </div>
                  </div>

                  <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-dinputBorder pt-3">
                    <button
                      className="bg-dgreyRate p-2  rounded ml-3"
                      onClick={() => setShowCalculate(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-dblue text-white p-2 mx-6 rounded"
                      onClick={() => confirmPos(true, false)}
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showSearch && (
            <div class="fixed left-0 top-0 z-50  h-full w-full overflow-y-auto overflow-x-hidden outline-none">
              <div class="pointer-events-none relative w-1/3 top-1/3 left-1/3  translate-y-[-50px]  transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                <div class="p-5 min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-dinputBorder bg-white  text-current shadow-lg outline-none ">
                  <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-dinputBorder ">
                    <h5
                      class="text-xl font-medium leading-normal"
                      id="exampleModalLabel"
                    >
                   Search
                    </h5>
                    <button onClick={() => setShowSearch(false)}>
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

                  <div class="relative flex-auto p-4">
                    <div vlassname="flex">
                      <label className="w-1/4">Search : </label>
                      <input
                        className="w-3/4 border ml-5 border-dgrayRate p-2 "
                        id="rendered"
                        onKeyUp={(e) => search(e)}
                      />
                    </div>
                  </div>

                  <div className="flex p-1 ">
                    <div className="w-1/3">sku</div>
                    <div> {dataSearch.sku}</div>
                  </div>
                  <div className="flex p-1">
                    <div className="w-1/3">Model</div>
                    <div> {dataSearch.model}</div>
                  </div>

                  <div className="flex p-1">
                    <div className="w-1/3">upc</div>
                    <div> {dataSearch.upc}</div>
                  </div>
                  {dataSearch?.all_options?.length > 0  &&
                  <div>
                  <div className="flex p-1">
                  <b className="pr-1 ">Options </b>  ( { dataSearch?.all_options?.length > 0  && dataSearch?.all_options[0].name} )
                  </div>
                  <div className="flex p-1">
                    <div className="w-1/3">Name</div>
                    <div> Barcode</div>
                  </div>
                  {dataSearch?.all_options?.length > 0 && dataSearch?.all_options[0]?.product_option_values?.map((op)=> (
                    <div className="flex p-1 border">
                      <div className="w-1/3 "> {op.name}</div>
                      <div>{op.barcode}</div>
                    </div>
                  ))}
                  </div>
}
                  <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-dinputBorder pt-3">
                    <button
                      className="bg-dgreyRate p-2  rounded ml-3"
                      onClick={() => setShowCalculate(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className={`flex flex-col-2   bg-dinputBorder min-h-screen p-3 ${
              opacity && "opacity-20"
            }`}
          >
            {/* <button onClick={handlePrint}>Printxssssxx</button> */}
            {/* <ReactToPrint
          trigger={() => <button onClick={() =>handlePrint}>Printxxx</button>}
          content={() => printRef.current}
        /> */}
            <div className="w-1/2 ">
              <div className="  bg-white p-5">
                {/* <button
                  className="w-1/2 bg-dgreen h-12 m-4 text-white px-2"
                  onClick={(e) => handlePrint(e)}
                >
                  Print
                </button> */}
                <div className="flex">
                  <div className=" w-7/12">
                    <input
                      id="code"
                      type="text"
                      className="py-2 border-dblue border rounded-lg w-full px-2  focus:outline-black"
                      placeholder="Enter SKU CODE "
                      onKeyUp={(e) => addToCart(e)}
                      // onKeyUp={(e) => FocusCart(e)}
                      onFocus={() => SetSelectCart("")}
                    />
                  </div>
                  <button
                    // href="/pos?new_tab"
                    className="border bg-dblue text-white py-2 px-3 ml-6 rounded-md"
                    // target="_blank"
                    onClick={(e) => neworder(e)}
                  >
                    New Order
                  </button>

                  <button
                    // href="/pos?new_tab"
                    className="bg-dblue py-2 px-3 ml-6 text-white rounded-md"
                    // target="_blank"
                    onClick={() => setShowSearch(true)}
                  >
                    Search
                  </button>
                </div>
                {errorProduct && (
                  <div className="w-full text-dbase ml-5 mt-2">
                    Product Not Found
                  </div>
                )}
              </div>
              <div className=" bg-white p-3 mt-3  pb-8">
                {/* <div className="mx-3   w-3/4">
              <div className="input required">
                <label>Last name</label>
                <input
                  ref={lastname}
                  type="text"
                  minLength={1}
                  onChange={(e) => {
                    setLastName(e);
                  }}
                />
              </div>

              {error[0]?.errorCode === "lastname" && (
                <p className=" text-sm mt-1 text-dbase">
                  Please enter your last name
                </p>
              )}
            </div> */}

                <div className="w-full mx-2 bg-white p-2">
                  {loader && <PointsLoader />}
                  {/* Cart Items */}
                  {!loader && (
                    <div className="w-full h-screen  overflow-y-auto ">
                      {error?.length > 0 &&
                        error?.map(
                          (err) =>
                            (err?.errorCode === "stock" ||
                              err?.errorCode === "option") && (
                              <p className=" text-sm m-1 text-dbase">
                                {error[0]?.errorMsg}
                              </p>
                            )
                        )}
                      {cart?.products?.length > 0 &&
                        cart?.products
                          ?.sort((a, b) => b.cart_id - a.cart_id)
                          ?.map((item, i) => (
                            <div
                              className={`hidden xl:flex lg:flex mb-2 px-2 py-2 rounded ${
                                item.stock
                                  ? "bg-white "
                                  : "bg-dbase bg-opacity-10"
                              } ${selectCart === i && "border border-dblue"}`}
                            >
                              <div className=" w-16 mt-6">
                                # {cart?.products?.length -i  }
                              </div>

                              {/* {select  &&  showSelect && (
                        <input
                          className="mr-2"
                          type="checkbox"
                          id={item.cart_id}
                          onClick={() => change(item.cart_id)}
                          checked={
                            selectProduct.indexOf(item.cart_id) > -1
                              ? "checked"
                              : ""
                          }
                          name="chk"
                        />
                      )} */}

                              <img
                                onClick={() =>
                                  navigate(
                                    `${item.name
                                      .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                                      .replaceAll("20%", "")
                                      .replace(/\s+/g, "-")
                                      .replaceAll("/", "-")}/p=${
                                      item.product_id
                                    }`
                                  )
                                }
                                src={item.thumb}
                                className="w-24 cursor-pointer block rounded"
                                alt={item.name}
                              />
                              <div className="flex flex-col   justify-between items-start pl-3 text-dblack py-2 flex-grow w-full text-left">
                                <p className="text-d13 font-light">
                                  {item.sku}
                                </p>
                                <p
                                  className="flex text-sm font-semibold text-left"
                                  dangerouslySetInnerHTML={{
                                    __html: item.name.slice(0, 45) + "..."
                                  }}
                                ></p>
                                {item.option.length > 0 && (
                                  <p className="text-dgreen text-sm ">
                                    {item.option[0].name +
                                      " (" +
                                      item.option[0].value +
                                      ")"}
                                  </p>
                                )}
                                <button
                                  className="cursor-pointer font-light text-xs"
                                  onClick={() =>
                                    updatequnatity(item.cart_id, 0)
                                  }
                                >
                                  <span>Remove</span>
                                  <i className="icon icon-trash ml-1"></i>
                                </button>
                              </div>

                              <div className="py-2 px-6 w-48 flex flex-col items-end text-dblack justify-center">
                                <span className=" font-semibold text-lg">
                                  {item.total}
                                </span>
                                <div className="flex mt-4">
                                  <button
                                    className="w-10 h-10  text-2xl border border-dinputBorder rounded-tl rounded-bl cursor-pointer hover:shadow"
                                    onClick={(e) =>
                                      changeQuantity(
                                        item.cart_id,
                                        Number(item?.quantity) - 1,
                                        i
                                      
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <input
                                    type="number"
                                    id={`item${i}`}
                                    ref={qtyRef}
                                    defaultValue={item?.quantity}
                                    className="border border-dinputBorder w-12 h-10 border-r-0 border-l-0 text-center focus:outline-none"
                                    onKeyDown={(e) =>
                                      handleClick(
                                        e,
                                        i,
                                        item?.quantity,
                                        item.cart_id
                                      )
                                    }
                                  />

                                  <button
                                    className="w-10 h-10  text-2xl border border-dinputBorder  rounded-tr rounded-br cursor-pointer hover:shadow"
                                    onClick={(e) =>
                                      changeQuantity(
                                        item.cart_id,
                                        Number(item?.quantity) + 1,
                                        i
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>
                  )}
                  <div className="w-auto px-5 h-8 border text-xl font-semibold cursor-pointer text-white fixed bottom-0 p-7 m-7 rounded-full ">
                    <select
                      className="w-auto px-5  border text-xl font-semibold cursor-pointer text-white   p-3 rounded-full bg-Orangeflo"
                      onChange={(e) => Cookies.set("salsMan", e.target.value)}
                    >
                      <option value="">user</option>

                      {users?.map((u) =>
                        u.user_id == Cookies.get("salsMan") ? (
                          <option value={u.user_id} selected>
                            {" "}
                            {u.username}
                          </option>
                        ) : (
                          <option value={u.user_id}> {u.username}</option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* <div className=" w-3/4 mt-3 mx-3">
              <div className="input items-center">
                <label>Email</label>

                <input
                  type="text"
                  minLength={1}
                  required
                  onChange={(e) => {
                    setEmail(e);
                  }}
                />
              </div>

              <p className="hidden text-sm mt-1 text-dbase">
                Please enter your first name
              </p>
            </div> */}
              </div>
              {/* {orderSuccess && ( */}
              {/* <div className=" mt-2 flex flex-cols-2 gap-3">
              <div className="w-1/3"></div>

              <div
                className="w-1/3"
                ref={printRef}
                style={{ display: "block" }} // This make ComponentToPrint show   only while printing
              >
                {" "}
                <PosPrint
                  items={manualResponse}
                  name={
                    firstname?.current?.value +
                      " " +
                      lastname?.current?.value ||
                    firstName + lastName ||
                    ""
                  }
                  telephone={telephone.current.value}
                />
              </div>
              <div className="w-1/3"></div>
            </div> */}
              {/* )} */}
            </div>
            <div className="w-1/2 mx-2 bg-white border-l-4 text-left">
              <div className="flex w-full p-2">
                <div className=" w-1/3">
                  <div className="flex items-center -space-x-3  ml-3 ">
                    <div className="flex items-center space-x-1   mt-7 mr-2 border-dinputBorder">
                      
                      <p className=" ">
                        {" "}
                        {window.config["countryCode"].substring(1)}{" "}
                      </p>{" "}
                    </div>
                    <div
                      className="input  required "
                      style={{ borderColor: "rgb(230, 230, 230)" }}
                    >
                      <label className="" htmlFor="telephone"> Telephone </label>{" "}
                      <div className="pl-2">
                        <HandlePhoneModel
                          fromCheckout={true}
                          phone={telephone}
                          phoneHanlder={phoneHanlder}
                          AdminPhoneHandler={AdminPhoneHandler}
                          // fromContact={true}
                        />{" "}
                      </div>
                    </div>{" "}
                  </div>{" "}
          
                </div>
                <div className="w-1/3 ml-6 mt-1">
                  <div className="input required">
                    <label>First name</label>
                    <input
                      ref={firstname}
                      className="border "
                      type="text"
                      minLength={1}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      style={{ borderColor: "rgb(230, 230, 230)" }}
                    />
                  </div>
                  {(error[0]?.errorCode === "firstname" ||
                    error[1]?.errorCode === "firstname" ||
                    error[2]?.errorCode === "firstname") && (
                    <p className=" text-sm mt-1 text-dbase">
                      Please enter your First Name
                    </p>
                  )}
                </div>

                <div className="w-1/3 ml-3 mt-1">
                  <div className="input ">
                    <label>Last name</label>
                    <input
                      ref={lastname}
                      type="text"
                      className="border "
                      minLength={1}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      style={{ borderColor: "rgb(230, 230, 230)" }}
                    />
                  </div>
                  {/* {(error[0]?.errorCode === "firstname" ||
                error[1]?.errorCode === "firstname" ||
                error[2]?.errorCode === "firstname") &&
                confirmNow && (
                  <p className=" text-sm mt-1 text-dbase">
                    Please enter your Full name
                  </p>
                )} */}
                </div>
              </div>
              <div className="px-3 ">
                {/* <p
                      className={
                        coupon?.current?.value?.length > 1 &&
                        error?.current?.temp_coupon
                          ? "text-xs text-dbase"
                          : "hidden"
                      }
                    >
                      {coupon.current?.value?.length > 1 &&
                      error?.current?.temp_coupon
                        ? error?.current?.temp_coupon
                        : ""}
                    </p> */}
              </div>
              <div className="flex py-5 px-6  border-t-4  border-dinputBorder ">
                <input
                  style={{ borderColor: "rgb(230, 230, 230)" }}
                  type="text"
                  className="border flex-grow rounded-tl rounded-bl border-r-0 h-10 px-5"
                  placeholder="Coupon Code or Gift Card"
                  ref={couponRef}
                  onChange={() => handleCouponChange()}
                />
                <div
                  onClick={() => setCoupon()}
                  className="bg-dblue text-white px-3 h-10 rounded-tr rounded-br text-sm"
                >
                  <p className="text-center mt-3">APPLY</p>
                </div>{" "}
              </div>{" "}
              {(error[0]?.errorCode === "temp_coupon" ||
                error[1]?.errorCode === "temp_coupon" ||
                error[2]?.errorCode === "temp_coupon") && (
                <div className="w-full text-sm mt-1 ml-16 px-2 text-dbase">
                  {error[0]?.errorMsg ||
                    error[2]?.errorCode ||
                    error[3]?.errorCode}
                </div>
              )}
              <div className="pt-2 border-t-4 border-b-4  border-dinputBorder px-6">
                <div className="w-full text-xl">Modification</div>
                <div className="flex w-full mt-4">
                  <div className="w-1/4 mt-1">Type</div>{" "}
                  <select
                    style={{ borderColor: "rgb(230, 230, 230)" }}
                    className="bg-white relative px-5 h-8 border text-sm font-semibold cursor-pointer rounded w-full"
                    ref={typeRef}
                  >
                    <option value="amount"> Amount</option>
                    <option value="percentage"> % percentage</option>
                  </select>
                </div>
                <div className="flex w-full mt-3">
                  <div className="w-1/5 mt-1">Number</div>{" "}
                  <div className="w-4/5">
                    <input
                      style={{ borderColor: "rgb(230, 230, 230)" }}
                      className="border  w-full flex-grow rounded-md  h-10 px-5"
                      ref={amountRef}
                      type="number"
                    />
                    <div className=" text-sm mt-1  px-2 text-dbase">
                      {modificationError?.amount}
                    </div>
                  </div>
                </div>

                <div className="flex w-full mt-1">
                  <div className="w-1/5 mt-1"> remarque</div>{" "}
                  <div className="w-4/5">
                    <input
                      style={{ borderColor: "rgb(230, 230, 230)" }}
                      className="border border-dinputBorder3 w-full flex-grow rounded-md h-10 px-5"
                      rows="5"
                      ref={remarqueRef}
                    />
                    <div className="w-full text-sm mt-1 px-2 text-dbase">
                      {modificationError?.remarque}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end w-full mt-2 pb-2">
                  <button
                    className="bg-dblue text-white px-5 py-2 rounded "
                    onClick={() => modification()}
                  >
                    {" "}
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex inset-x-0 bottom-0 fixed text-left ">
            <div className="flex w-3/4"></div>
            {cart?.totals?.length && (
              <div className=" px-6 py-4 rounded bg-white w-1/4 mx-5 border  border-dinputBorder">
                <div className="flex w-full">
                  <div className="w-full mb-2 font-semibold text-lg">
                    Order Totals
                  </div>{" "}
                  <div className="w-full text-right">
                    Subtotal ({cart?.totals?.length} items)
                  </div>
                </div>
                <div>
                  {cart?.totals?.map(
                    (total) =>
                      total.title !== "Store" && (
                        <div className="flex items-center justify-between mb-1 text-dblack">
                          <span>{total.title}</span>
                          <span>{total.text}</span>
                        </div>
                      )
                  )}
                </div>
                {success ? (
                  <div className="flex">
                    <button
                      className="w-full bg-greenaalbeit h-12 m-4 text-white px-2"
                      onClick={(e) => neworder(e)}
                      // onClick={(e)=>newTab(e)}
                    >
                      New Order
                    </button>

                    {/* <button
                      className="w-1/2 bg-dgreen h-12 m-4 text-white px-2"
                      onClick={(e) => handlePrint(e)}
                    >
                      Print
                    </button> */}
                  </div>
                ) : (
                  <button
                    className=" text-center bg-dblue text-white rounded w-full py-3 mt-4 hover:bg-dbluedark"
                    onClick={() => confirmPos(false, true)}
                  >
                    {confirmDisable ? (
                      <div className="lds-ellipsis h-6  -mt-5">
                        <div />
                        <div />
                        <div />
                        <div />
                      </div>
                    ) : (
                      "Process"
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
