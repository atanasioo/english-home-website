import React, { useContext, useEffect, useState, useRef } from "react";
import { GoPlus } from "react-icons/go";
import { BsChevronRight } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AccountContext } from "../contexts/AccountContext";
import buildLink, { path, pixelID } from "../urls";
import _axios from "../axios";
import Cookies from "js-cookie";
import HandlePhoneModel from "../components/PhoneHandler";
import ReactPixel from "react-facebook-pixel";
function Checkout() {
  const [state, dispatch] = useContext(CartContext);
  const [stateAccount, dispatchAccount] = useContext(AccountContext);
  const [addressmenu, setAddressmenu] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [activeAddress, setActiveAddress] = useState({});
  const [zones, setZones] = useState([]);
  const [phoneValidate, setphoneValidate] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [err, setErr] = useState(false);
  const [deletemenu, setDeletemenu] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [paymenttab, setPaymenttab] = useState(true);
  const [addresstab, setAddresstab] = useState(false);
  const [cartData, setCartData] = useState({});
  const [firstAttemp, setFirstAttemp] = useState(true);
  const [customerId, setCustomerId] = useState("0");
  const [loading, setLoading] = useState(true);
  const [activePaymentMethod, setActivePaymentMethod] = useState("cod");
  const [emptyCart, setEmptyCart] = useState(false);
  const [paymentMeth, setPaymentMeth] = useState("");
  const [error, setError] = useState("");
  const zone = useRef({
    id: window.config["initial-zone"].id,
    name: window.config["initial-zone"].name,
  });
  const [addrInfo, setAddrInfo] = useState({
    addr1: "",
    addr2: "",
    em: "",
    tel: "",
    zn: zone.current.name || "",
    znId: zone.current.id || "",
    fn: "",
    ln: "",
  });
  const [loged, setloged] = useState();
  const [accountData, setAccountData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const width = window.innerWidth;
  const cid = localStorage.getItem("cid");

  const town = useRef({
    id: 0,
    name: "",
  });
  // const [termCondition, setTermCondition] = useState();

  //user details
  const firstname = useRef("");
  const lastname = useRef("");
  const address_1 = useRef("");
  const address_2 = useRef("");
  const telephone = useRef("");
  const coupon = useRef("");
  const zone_id = useRef("");

  const country_id = window.config["zone"];
  const city = "";
  const postcode = "";

  const email = useRef("");
  const comment = useRef("");

  const [confirmDisable, setConfirmDisalbe] = useState(false);

  // Manual
  const [manualResponse, setManualResponse] = useState({});
  const [manualR, setManualR] = useState({});

  const manualErrors = useRef({});
  const [manualCart, setManualCart] = useState([]);
  const [subTotal, setsubTotal] = useState(0);

  //get addresses
  useEffect(() => {
    _axios
      .get(buildLink("address", undefined, window.innerWidth))
      .then((response) => {
        if (response.status) {
          if (response.data.success) {
            setAddresses(response.data.data);
            setActiveAddress(response.data.data[0]);
          } else {
            getZones();
            setAddressmenu(true);
          }
        } else {
          dispatchAccount({ type: "setLoading", payload: false });

          if (!stateAccount.loged) {
            navigate("/");
          }
        }
      });
  }, [dispatchAccount, stateAccount.loged]);

  // Add Address
  function addAddress(e) {
    e.preventDefault();
    const obj = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      address_1: address_1.current.value,
      address_2: address_2.current.value,
      // email: email.current.value ?  email.current.value : '' ,
      telephone: window.config["countryCode"] + telephone.current.value,
      zone_id: zone_id.current.value,
      town_id: 0,
      country_id,
      city,
      postcode,
    };
    setphoneValidate("");
    if (window.config["zone"] === "82" && telephone.current.value.length < 11) {
      setphoneValidate("must be 9 numbers");
      return;
    }
    if (editAddress) {
      _axios
        .put(
          buildLink("address", undefined, window.innerWidth) +
            "&address_id=" +
            activeAddress.address_id,
          obj
        )
        .then((response) => {
          if (response.data.success) {
            setAddressmenu(false);
            setEditAddress(false);
            window.location.reload();
          } else {
            setError(response.data.errors["0"].errorMsg);
          }
        });
    } else {
      _axios
        .post(buildLink("address", undefined, window.innerWidth), obj)
        .then((response) => {
          if (response.data.success) {
            setAddressmenu(false);
            window.location.reload();
            // setMessage(
            //   "Address Added Successfully, you will be redirected to addresses page."
            // );
          }
        });
    }
  }

  //delete address
  function deleteAddress(address, address_id) {
    setActiveAddress(address);
    if (addresses.length !== 1) {
      _axios
        .delete(
          buildLink("address", undefined, window.innerWidth) +
            "&address_id=" +
            address_id
        )
        .then((response) => {
          setAddresses(addresses.filter((a) => a.address_id !== address_id));
          window.location.reload();
        });
    }
  }

  //get cart
  function getCart() {
    _axios
      .get(buildLink("cart", undefined, window.innerWidth))
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          setEmptyCart(true);
        } else {
          setsubTotal(response.data.sub_total);
          if (!stateAccount.admin) {
            // ---> Facebook PIXEL <---
            ReactPixel.init(pixelID, {}, { debug: true, autoConfig: false });
            ReactPixel.pageView();
            ReactPixel.fbq("track", "PageView");
            if (data) {
              // let productArray;
              // data.data.products?.map((p, index) => {
              //   if (index === data?.data?.products.length - 1) {
              //     productArray += p.product_id;
              //   } else {
              //     productArray = p.product_id + ",";
              //   }
              // });
              // if (!stateAccount.admin && manualResponse.order_product?.length > 0) {
              //   // ---> Facebook PIXEL <---
              //   const advancedMatching = {
              //     em: manualResponse?.social_data?.email,
              //     fn: manualResponse?.social_data?.firstname,
              //     ln: manualResponse?.social_data?.lastname,
              //     external_id: manualResponse?.social_data?.external_id,
              //     country: manualResponse?.social_data?.country_code,
              //   };
              //   ReactPixel.init(pixelID, advancedMatching, {
              //     debug: true,
              //     autoConfig: false,
              //   });
              //   // ReactPixel.pageView();
              //   // ReactPixel.fbq("track", "PageView");
              //   // if (data) {
              //   let productArray = "";
              //   manualResponse?.order_product?.map((p, index) => {
              //     if (index === manualResponse.order_product?.length - 1) {
              //       productArray += p.product_id;
              //     } else {
              //       productArray = p.product_id + ",";
              //     }
              //   });
              //   window.fbq(
              //     "track",
              //     "InitiateCheckout",
              //     {
              //       content_type: "product",
              //       content_ids: productArray,
              //       num_items: manualResponse?.order_product?.length,
              //       currency: manualResponse?.social_data?.currency,
              //     },
              //     { eventID: manualResponse?.social_data?.event_id }
              //   );
              //   // }
              // }
            }
          }
          if (data) {
            let productArray;
            data.data.products?.map((p, index) => {
              if (index === data?.data?.products.length - 1) {
                productArray += p.product_id;
              } else {
                productArray = p.product_id + ",";
              }
            });
          }
          let temp = [];
          const dt = data.data.products;
          for (let index = 0; index < dt.length; index++) {
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

          setManualCart(temp);
          manual(temp, zone, activePaymentMethod, false, false);
          setCartData(response.data.data);
        }

        dispatch({
          type: "setProducts",
          payload: response.data.data.products,
        });

        dispatch({
          type: "setProductsCount",
          payload: response.data.data.total_product_count,
        });
        dispatch({
          type: "setTotals",
          payload: response.data.data.totals,
        });
        dispatch({
          type: "loading",
          payload: false,
        });
      });
  }

  useEffect(() => {
    dispatchAccount({ type: "setAdminLoading", payload: true });
    // 70 91 1870

    var adminToken = Cookies.get("ATDetails");

    // if (
    //   window.location.host === "localhost:3000" ||
    //   window.location.host === "localhost:3001"
    // ) {
    //   adminToken = "eab4e66ebc6f424bf03d9b4c712a74ce";
    // }

    if (typeof adminToken != typeof undefined) {
      dispatchAccount({ type: "setAdminToken", payload: adminToken });
      dispatchAccount({ type: "setAdmin", payload: true });
      dispatchAccount({ type: "setAdminLoading", payload: false });
    } else {
      dispatchAccount({ type: "setAdmin", payload: false });
      dispatchAccount({ type: "setAdminLoading", payload: false });
    }
    dispatchAccount({ type: "setLoading", payload: true });
    _axios
      .get(buildLink("login", undefined, window.innerWidth))
      .then((response) => {
        const data = response.data;

        dispatchAccount({ type: "setShowOver", payload: false });
        if (data.customer_id > 0) {
          dispatchAccount({ type: "setLoged", payload: true });
          dispatchAccount({ type: "setUsername", payload: data.username });
          dispatchAccount({ type: "setUserId", payload: data.customer_id });
        } else {
          dispatchAccount({ type: "setLoged", payload: false });
        }
        dispatchAccount({ type: "setLoading", payload: false });
        if (
          data.seller_logged !== "0" &&
          data.seller_logged !== null &&
          data.seller_logged !== undefined
        ) {
          dispatchAccount({ type: "setSeller", payload: true });
          Cookies.set("seller_id", data.seller_logged);
        }
      });
  }, [dispatchAccount]);

  function getZones() {
    _axios
      .get(buildLink("zone", undefined, window.innerWidth) + "118")
      .then((response) => {
        setZones(response?.data?.data?.zones);
      });
  }

  useEffect(() => {
    if (!stateAccount?.loged) {
      _axios
        .get(buildLink("zone", undefined, window.innerWidth) + "118")
        .then((response) => {
          setZones(response?.data?.data?.zones);
        });
    }

    // // ---> Facebook PIXEL <---
    // if (!stateAccount.admin && manualResponse.order_product?.length > 0) {
    //   console.log("hello");
    //   const advancedMatching = {
    //     em: manualResponse?.social_data?.email,
    //     fn: manualResponse?.social_data?.firstname,
    //     ln: manualResponse?.social_data?.lastname,
    //     external_id: manualResponse?.social_data?.external_id,
    //     country: manualResponse?.social_data?.country_code,
    //   };

    //   ReactPixel.init(pixelID, advancedMatching, {
    //     debug: true,
    //     autoConfig: false,
    //   });
    //   ReactPixel.pageView();
    //   ReactPixel.fbq("track", "PageView");
    //   // if (data) {
    //   let productArray = "";

    //   manualResponse?.order_product?.map((p, index) => {
    //     if (index === manualResponse.order_product?.length - 1) {
    //       productArray += p.product_id;
    //     } else {
    //       productArray = p.product_id + ",";
    //     }
    //   });
    //   window.fbq(
    //     "track",
    //     "InitiateCheckout",
    //     {
    //       content_type: "product",
    //       content_ids: productArray,
    //       num_items: manualResponse?.order_product?.length,
    //       currency: manualResponse?.social_data?.currency,
    //     },
    //     { eventID: manualResponse?.social_data?.event_id }
    //   );
    // }
  }, []);

  // console.log(stateAccount.admin);

  const phoneHanlder = (childData, isValid) => {
    if (isValid === true) {
      telephone.current.value = childData;
      setErr("");
    } else {
      telephone.current.value = childData;
    }

    setIsValid(isValid);
  };

  // set active address from address list
  function changeAddress(address, _manual) {
    setActiveAddress(address);
    const obj = {
      name: address.zone,
      value: address.zone_id,
    };
    zone.current.name = address.zone;
    zone.current.id = address.zone_id;
    if (_manual) {
      setTimeout(() => {
        manual(
          manualCart,
          obj,
          activePaymentMethod,
          false,
          coupon.current.value
        );
      }, 500);
    }
  }

  useEffect(() => {
    localStorage.setItem("cid", 0);

    _axios
      .get(buildLink("get_account", undefined, window.innerWidth))
      .then((response) => {
        const data = response.data;
        if (!data.success) {
          setloged(false);
          getCart();
        } else {
          setloged(true);
          setAccountData(data.data);
          _axios
            .get(buildLink("login", undefined, window.innerWidth))
            .then((response) => {
              setCustomerId(response.data.customer_id);
              localStorage.setItem("cid", response.data.customer_id);
            });
          _axios
            .get(buildLink("address", undefined, window.innerWidth))
            .then((response) => {
              if (!response.data.success) {
                // history.push({
                //   pathname: "/account/address/add",
                //   search: "from-checkout=true"
                // });
                getCart();
              } else {
                zone.current.name = response.data.data[0].city;
                zone.current.id = response.data.data[0].zone_id;
                town.current.id = response.data.data[0].town_id;
                town.current.name = response.data.data[0].town_name;
                setAddresses(response.data.data);
                changeAddress(response.data.data[0], false);
                getCart();
              }
            });
        }
      });
    // End account check
    // window.alertHello()
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    manualErrors.current = "";
    // manual(manualCart, zone, paymentMeth, false);

    const btn = document.getElementById("savebtn");
    if (stateAccount?.loged) {
      setFirstAttemp(false);
      if (JSON.stringify(activeAddress) === "{}") {
        btn.disabled = true;
      } else {
        manual(manualCart, zone, paymentMeth, false);

        btn.disabled = false;
        setAddresstab(false);
        setPaymenttab(true);
      }
    } else {
      manual(manualCart, zone, paymentMeth, false);
      // alert(manualR.success)
      if (manualR.success === true) {
        btn.disabled = false;
        setAddresstab(false);
        setPaymenttab(true);
      }
    }
  }

  // Zone changed

  function zoneChanged(e) {
    const sel = e.target;
    const obj = {
      name: sel.options[sel.selectedIndex].text,
      value: sel.value,
    };
    zone.current.id = sel.value;
    zone.current.name = sel.options[sel.selectedIndex].text;
    manual(manualCart, obj, activePaymentMethod, false, true);

    // _axios
    //   .get(buildLink("town", undefined, window.innerWidth) + zone.current.id)
    //   .then((response) => {
    //     if (response.data.success) {
    //       setTownes(response.data.data);
    //       //  setLoadingtown(false)
    //     }
    //     setLoadingtown(false);
    //   });
  }

  function handlePaymentClick() {
    if (JSON.stringify(activeAddress) !== "{}") {
      setPaymenttab(true);
      setAddresstab(false);
    }
  }

  function manual(manualCartProducts, _zone, paymentcode, confirm, bool) {
    // alert(confirm)
    setLoading(true);
    window.scroll(0, 0);
    let body = {};
    // if it's first attemp
    // if (stateAccount.loged) {
    //   setFirstAttemp(false);
    // }

    if (firstAttemp  && !stateAccount.loged) {
      body = {
        order_product: manualCartProducts,
        customer_id: customerId,
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
        zone_id:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.zone_id
            : zone.current.id,
        zone:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.zone
            : zone.current.name,
        town_id:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.town_id
            : town.current.id,
        town:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.town_name
            : town.current.name,
        is_web: true,
        //   Cookies.get("change") === "false" || Cookies.get("change") === false
        //     ? false
        //     : true,
        source_id: 1,
        coupon: "",
        code_version: window.innerWidth > 600 ? "web_desktop" : "web_mobile",
      };
    } else {
      body = {
        order_product: manualCartProducts,
        customer_id: customerId || "",
        // firstname: stateAccount.loged
        //   ? activeAddress.firstname
        //   : firstname?.current?.value || addrInfo.fn,
        firstname:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.firstname
            : firstname?.current?.value || addrInfo.fn,
        lastname:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.lastname
            : lastname?.current?.value || addrInfo.ln,
        email: addrInfo.em || "",
        address_1:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.address_1
            : address_1?.current?.value || addrInfo.addr1,
        telephone:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.telephone
            : telephone?.current?.value?.replace("-", "") ||
              addrInfo.tel?.replace("-", ""),
        address_2:
          stateAccount.loged && Object.keys(activeAddress).length > 0
            ? activeAddress.address_2
            : address_2?.current?.value || addrInfo.addr2,
        city: "",
        shipping_method: "Delivery ( 1-4 days )",
        shipping_code: "ultimate_shipping.ultimate_shipping_0",
        payment_method: "Cash On Delivery",
        payment_code: "cod",
        comment: comment.current?.value || "",
        country_id: window.config["zone"],
        zone_id: _zone?.value || zone.current.id,
        zone: _zone?.name || zone.current.name,

        town_id: town.current.id,
        town: town.current.name,
        is_web:
          Cookies.get("change") === "false" || Cookies.get("change") === false
            ? false
            : true,
        payment_session: manualResponse.payment_session,
        source_id: 1,
        coupon: coupon?.current?.value || "",
        code_version: window.innerWidth > 600 ? "web_desktop" : "web_mobile",
      };
      const adminId = Cookies.get("user_id");
      if (typeof adminId != "undefined") {
        body["user_id"] = adminId;
      }
    }
    _axios
      .post(buildLink("manual", undefined, window.innerWidth), body)
      .then((response) => {
        setManualResponse(response.data.data);
        if (!firstAttemp) setManualR(response.data);
        const data = response.data;

        console.log(data);

        if (data?.success === false) {
          manualErrors.current = response.data.errors;

          setConfirmDisalbe(false);
          // if (manualErrors.current["0"].errorCode === "payment_method") {
          //   setAddresstab(false);
          setPaymenttab(false);
          setAddresstab(true);

          //   setPaymentMeth("Cash On Delivery");
          // } else {
          // }
        } else {
          manualErrors.current = "";
          paymentForm(confirm, paymentcode);
          setLoading(false);

          const data = response.data.data;
          console.log("heree");
          var dataSocial = data.social_data;
          dataSocial["link"] = window.location.href;
          dataSocial["fbp"] = Cookies.get("_fbp");
          dataSocial["fbc"] = Cookies.get("_fbc");
          dataSocial["ttp"] = Cookies.get("_ttp");
          _axios
            .post(buildLink("pixel", undefined, window.innerWidth), dataSocial)
            .then((response) => {
              const data = response.data;
              if (data.success === true) {
              }
            });

          if (bool === true) {
            setPaymenttab(false);
            setAddresstab(true);
          } else {
            // handleInputs()
            if (firstAttemp) {
              setFirstAttemp(false);
              setPaymenttab(false);
              setAddresstab(true);
            } else {
              setPaymenttab(true);
              setAddresstab(false);
            }
          }
        }
      });

    // if (cid < 1) {
    //  navigate('/login')
    // }
  }

  function handleInputs() {
    setAddrInfo({
      addr1: address_1.current.value,
      addr2: address_2.current.value,
      em: email.current.value,
      fn: firstname.current.value,
      ln: lastname.current.value,
      tel: telephone.current.value,
      zn: zone.current.name,
      znId: zone_id.current.value,
    });
  }

  console.log(activeAddress);

  //submit form
  function submitForm(e) {
    e.preventDefault();

    setConfirmDisalbe(true);
    // alert(activePaymentMethod)
    manual(manualCart, zone, activePaymentMethod, true, false);
    // alert(1)
    // setConfirmDisalbe(true);
  }

  function confirmOrder(c_url, s_url) {
    _axios.post(c_url).then((response) => {
      const data = response.data;
      if (data.success) {
        successOrder(s_url);
      }
    });
  }

  function successOrder(url) {
    _axios.get(url).then((response) => {
      const data = response.data;
      if (data.success) {
        if (!stateAccount.admin) {
          ReactPixel.init(pixelID, {}, { debug: true, autoConfig: false });
          ReactPixel.pageView();
          ReactPixel.fbq("track", "PageView");

          const advancedMatching = {
            em: data?.data?.social_data?.email,
            fn: data?.data?.social_data?.firstname,
            ln: data?.data?.social_data?.lastname,
            external_id: data?.data?.social_data?.external_id,
            country: data?.data?.social_data?.country_code,
          };
          ReactPixel.init(pixelID, advancedMatching, {
            debug: true,
            autoConfig: false,
          });
          ReactPixel.pageView();
          ReactPixel.fbq("track", "PageView");
          if (data) {
            // ReactPixel.track("Purchase", {
            //   content_type: "product",
            //   content_ids: data?.data?.social_data?.content_ids,
            //   value: data?.data?.social_data?.value,
            //   num_items: data?.data?.social_data?.num_items,
            //   event_id: data?.data?.social_data?.event_id,
            //   country: data?.data?.social_data?.country_code,
            //   currency: data?.data?.social_data?.currency,
            //   fbp: Cookies.get("_fbp")

            // }, { eventID : data?.data?.social_data?.event_id, event_id : data?.data?.social_data?.event_id  });

            window.fbq(
              "track",
              "Purchase",
              {
                content_type: "product",
                content_ids: data?.data?.social_data?.content_ids,
                value: data?.data?.social_data?.value !== "" ? data?.data?.social_data?.value : 10,
                num_items: data?.data?.social_data?.num_items,
                currency: data?.data?.social_data?.currency,
              },
              { eventID: data?.data?.social_data?.event_id }
            );
          }
          var dataSocial = data?.data?.social_data;
          dataSocial["link"] = window.location.href;
          dataSocial["fbp"] = Cookies.get("_fbp");
          dataSocial["fbc"] = Cookies.get("_fbc");
          dataSocial["ttp"] = Cookies.get("_ttp");
          _axios
            .post(buildLink("pixel", undefined, window.innerWidth), dataSocial)
            .then((response) => {
              const data = response.data;
              if (data.success === true) {
              }
            });
        }
        navigate("/success");
      }
    });
  }

  function handleCouponChange() {
    if (coupon.current.value.length < 1) {
      manualErrors.current = "";
    }
  }

  // HandleCoupon
  function setCoupon() {
    const obj = {
      name: zone.current.name,
      value: zone.current.id,
    };
    if (coupon.current.value.length > 1) {
      manual(manualCart, obj, activePaymentMethod, false, false);
    }
  }

  // Payment form
  function paymentForm(confirm, p_m) {
    setLoading(true);
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

        // Developer hint [here you must call the function to complete payment (incase backend payment changed)]
        if (data.success) {
          if ((p_m === "zenithbank_global_pay" || p_m === "momo") && confirm) {
            window.location.href = data.payment_url;
          }
          if (p_m === "mpgs" && confirm) {
            _axios
              .get(
                "https://www.ishtari-mobile.com/v1/index.php/?route=payment/mpgs/getSessionId"
              )
              .then((res) => {
                window.paymentStart(res.data.payment_session);
              });
          }
          if (p_m === "cod" && confirm) {
            if (Object.keys(manualErrors.current).length === 0) {
              confirmOrder(data.confirm_url, data.success_url);
            }
          }
        }
      });
  }

  // Update quantity
  function updateQuantity(e, key, quantity, i) {
    e.preventDefault();
    setLoading(true);
    dispatch({
      type: "loading",
      payload: true,
    });
    const obj = { key, quantity };
    _axios
      .put(buildLink("cart", undefined, window.innerWidth), obj)
      .then(() => {
        getCart();
        document.getElementById("p-quantity" + i).value = quantity;

        dispatch({
          type: "loading",
          payload: false,
        });
      });
  }

  function handleChangeQuantity(e, key, i) {
    if (document.getElementById("p-quantity" + i)) {
      document.getElementById("p-quantity" + i).value = e.target.value;
    }
    if (e.keyCode === 13) {
      let quantity = e.target.value;
      const obj = { key, quantity };

      dispatch({
        type: "loading",
        payload: true,
      });
      _axios
        .put(buildLink("cart", undefined, window.innerWidth), obj)
        .then(() => {
          getCart();

          e.target.blur();
        });
    }
  }

  useEffect(() => {
    if (!stateAccount.admin && manualResponse.order_product?.length > 0) {
      // ---> Facebook PIXEL <---
      const advancedMatching = {
        em: manualResponse?.social_data?.email,
        fn: manualResponse?.social_data?.firstname,
        ln: manualResponse?.social_data?.lastname,
        external_id: manualResponse?.social_data?.external_id,
        country: manualResponse?.social_data?.country_code,
      };
      ReactPixel.init(pixelID, advancedMatching, {
        debug: true,
        autoConfig: false,
      });
      // ReactPixel.pageView();
      // ReactPixel.fbq("track", "PageView");

      // if (data) {
      let productArray = "";

      manualResponse?.order_product?.map((p, index) => {
        if (index === manualResponse.order_product?.length - 1) {
          productArray += p.product_id;
        } else {
          productArray = p.product_id + ",";
        }
      });
      window.fbq(
        "track",
        "InitiateCheckout",
        {
          content_type: "product",
          content_ids: productArray,
          num_items: manualResponse?.order_product?.length,
          currency: manualResponse?.social_data?.currency,
        },
        { eventID: manualResponse?.social_data?.event_id }
      );
      // }
    }
  }, [manualResponse]);

  return (
    <div>
      {/* address modal  */}
      {addressmenu && stateAccount.loged && (
        <div className="orders-modal-container">
          <div className="address-modal block z-30 relative ">
            <div
              className="fixed top-0 left-0  bg-dblackOverlay2 w-full h-full z-40"
              onClick={() => {
                setAddressmenu(false);
                setEditAddress(false);
              }}
            ></div>
            <form
              onSubmit={(e) => addAddress(e)}
              className="fixed address-modal  left-0 right-0 bottom-0 top-0 m-auto  w-5000 max-w-full py-3.5 px-5  bg-dwhite1 z-50 text-sm text-left h-fit"
            >
              <GrClose
                className="w-6 h-6 absolute top-2.5 right-6 cursor-pointer"
                onClick={() => {
                  setAddressmenu(false);
                  setEditAddress(false);
                }}
              />
              <div className="address-modal__title py-2.5 px-5 -mx-5 text-d16 border-b border-dgrey3 flex justify-between items-center">
                <p>Address Update</p>
                <div className="py-1 text-d12">
                  {/* <label htmlFor="" className="ml-2">
                    <input type="radio" name="" id="" defaultChecked />
                    <span className="ml-1">Individual</span>
                  </label>
                  <label htmlFor="" className="ml-2">
                    <input type="radio" name="" id="" />
                    <span className="ml-1">Institutional</span>
                  </label> */}
                </div>
              </div>
              <div className="-mx-5 border border-b border-dgrey3"></div>
              {error && <div className="text-dred4 text-d14 mt-2">{error}</div>}
              <div className="title flex flex-col items-start">
                <label htmlFor="title" className="w-full mt-2.5">
                  Address *
                </label>
                <input
                  type="text"
                  name="title"
                  ref={address_1}
                  defaultValue={editAddress ? activeAddress.address_1 : ""}
                  id=""
                  required
                  placeholder="eg: home, work..."
                  className="address-modal__input"
                  style={{ maxWidth: "225px" }}
                />
              </div>
              <div className="fn-ln flex mt-2">
                <div className="w-488 mr-4 ">
                  <label htmlFor="" className="w-full top-2.5 ">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    ref={firstname}
                    id=""
                    required
                    className="address-modal__input"
                    defaultValue={`${
                      editAddress
                        ? activeAddress.firstname
                        : stateAccount?.username
                    }`}
                  />
                </div>
                <div className="w-488">
                  <label htmlFor="" className="w-full top-2.5 ">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    ref={lastname}
                    required
                    id=""
                    className="address-modal__input"
                    defaultValue={`${
                      editAddress
                        ? activeAddress.lastname
                        : stateAccount?.username
                    }`}
                  />
                </div>
              </div>
              <div className="phone-nb mt-2">
                <label htmlFor="phone" className="w-full top-2.5">
                  Mobile phone *
                </label>
                <br />
                <div className="flex items-center">
                  <input
                    type="text"
                    name=""
                    id=""
                    value={"+961"}
                    disabled
                    className="bg-transparent w-1/6 md:w-1/12 mt-1 "
                  />
                  <HandlePhoneModel
                    phone={telephone}
                    nb={`${
                      editAddress ? activeAddress?.telephone.substring(3) : ""
                    }`}
                    phoneHanlder={phoneHanlder}
                  />
                </div>
              </div>
              <div className="zone mt-2">
                <div className="zone ">
                  <label htmlFor="" className="w-full mt-2.5">
                    Zone *
                  </label>
                  <select
                    name="zone"
                    ref={zone_id}
                    id=""
                    required
                    className="address-modal__input border border-dgrey6"
                    onChange={(e) => {
                      zoneChanged(e);
                    }}
                  >
                    {zones?.map((zone) => (
                      <option
                        value={zone.zone_id}
                        key={zone.zone_id}
                        selected={`${
                          editAddress && activeAddress.zone_id === zone.zone_id
                            ? "selected"
                            : ""
                        }`}
                      >
                        {zone.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="address mt-2 flex flex-col pb-1">
                <label htmlFor="address">More Address Details *</label>
                <textarea
                  name="address_details"
                  id=""
                  cols="30"
                  rows="10"
                  ref={address_2}
                  maxLength={256}
                  defaultValue={editAddress ? activeAddress.address_2 : ""}
                  className="address-modal__input h-24 p-2.5"
                  placeholder={
                    "Please enter your other address information such as neighborhood, street, apartment name and number."
                  }
                ></textarea>
              </div>
              <div className="-mx-5 mt-3 border-b border-dgrey3"></div>

              <div className="address-modal-button mt-5 mb-1 text-center">
                <button
                  // type="submit"
                  // id="savebtn"
                  // onClick={(e) => handleSubmit(e)}
                  className="bg-dblack1 hover:bg-dblue1 mb-4 w-72 mx-auto text-center h-10 bg-clip-padding text-dwhite1 text-d16 uppercase transition ease-in duration-300"
                >
                  save and continue
                </button>
              </div>
            </form>
          </div>
          <div className="modal-information text-d12"></div>
          <div className="modal-sales z-49"></div>
        </div>
      )}
      {/* end address modal */}

      {/* delete confirmation modal */}
      {deletemenu && (
        <div className="orders-modal-container">
          <div className="address-modal block z-30 relative ">
            <div
              className="fixed top-0 left-0  bg-dblackOverlay2 w-full h-full z-40"
              onClick={() => setDeletemenu(false)}
            >
              <div className="py-10 ">
                <div className="container">
                  {addresses.length > 1 ? (
                    <div className="w-80 top-36 h-auto bg-dwhite1 relative overflow-hidden mx-auto z-50 ">
                      <GrClose
                        className="w-4 h-4 absolute top-2.5 right-2.5 cursor-pointer"
                        onClick={() => setDeletemenu(false)}
                      />
                      <div className="border-b border-dgrey7 py-5 mb-7 leading-5">
                        <span className="title inline-block align-middle text-center w-full text-lg font-semibold">
                          WARNING
                        </span>
                      </div>
                      <div className="h-auto inline-block w-full relative overflow-x-hidden">
                        <div
                          className="mb-3.5 text-center px-5 text-sm"
                          style={{ minHeight: "35px" }}
                        >
                          Are you sure you want to delete the address?
                        </div>
                      </div>
                      <div className="flex mx-auto text-center uppercase items-center justify-between mb-4">
                        <button
                          className="w-1/3 m-auto py-1 px-3 mb-2.5 text-center h-10 bg-clip-padding bg-dblue1 text-dwhite1 text-d15 uppercase hover:bg-dblack2 transition duration-300 ease-in"
                          onClick={() =>
                            deleteAddress(
                              activeAddress,
                              activeAddress?.address_id
                            )
                          }
                        >
                          delete
                        </button>
                        <button
                          className="w-1/3 m-auto py-1 px-3 mb-2.5 bg-dwhite1 h-10 border border-dblue1 text-dblack2 uppercase"
                          onClick={() => setDeletemenu(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-80 top-36 h-auto bg-dwhite1 relative overflow-hidden mx-auto z-50 ">
                      <GrClose
                        className="w-4 h-4 absolute top-2.5 right-2.5 cursor-pointer"
                        onClick={() => setDeletemenu(false)}
                      />
                      <div className="border-b border-dgrey7 py-5 mb-7 leading-5">
                        <span className="title inline-block align-middle text-center w-full text-lg font-semibold">
                          WARNING
                        </span>
                      </div>
                      <div className="h-auto inline-block w-full relative overflow-x-hidden">
                        <div
                          className="mb-3.5 text-center px-5 text-md"
                          style={{ minHeight: "35px" }}
                        >
                          Address cannot be deleted because it is the only
                          address you have.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* end delete confirmation modal */}

      <div className="checkout-viewport -mt-9 bg-dgrey10">
        <div
          className={`${width > 650 ? "container overflow-hidden" : "px-3"}`}
        >
          <div className="mt-7 -mx-1 flex flex-col md:flex-row">
            {/* <div className='w-full notify'></div> */}
            <div className="w-full md:w-2/3 mr-5">
              <div className="">
                {/* <div className="checkout-tabs flex justify-between bg-dwhite1 cursor-pointer">
                  <div
                    className={` pt-3.5 pr-12 md:pb-14 pl-3.5 relative w-1/2 ${
                      addresstab ? "bg-dblue1 text-dwhite1" : ""
                    }`}
                    onClick={() => {
                      setPaymenttab(false);
                      setAddresstab(true);
                    }}
                  >
                    <div className="text-d11 font-bold md:font-normal md:text-d16 text-left font-mono tracking-wide mb-2.5 uppercase flex items-center">
                      <span className="text-dblack2 bg-dwhite1 font-semibold text-d13 border border-dblack2 py-1 px-2 rounded-full mr-2">
                        1
                      </span>
                      <p>ADDRESS & CARGO INFORMATION</p>
                    </div>

                    {addresses.length < 1 ? (
                      <div className="text-left text-sm hidden md:block">
                        Please select a delivery address.
                      </div>
                    ) : (
                      <div className="text-left hidden md:block">
                        <div className="checkout-address-line-desc line-clamp-3 text-sm">
                          <p>
                            {activeAddress?.address_2} {activeAddress?.zone}{" "}
                            {activeAddress?.postcode}
                          </p>
                        </div>
                        <div className="text-sm">
                          <p>Tel: {activeAddress?.telephone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`pt-3.5 pr-12 md:pb-14 pl-3.5 relative w-1/2 ${
                      paymenttab ? "bg-dblue1 text-dwhite1" : ""
                    }`}
                    style={{ minWidth: "120px" }}
                    onClick={() => {
                      handlePaymentClick();
                    }}
                  >
                    <div className="text-d11 font-bold md:font-normal md:text-d16 font-mono mb-2.5 uppercase flex items-center">
                      <span className="text-dblack2 bg-dwhite1 font-semibold text-d13 border border-dblack2 py-1 px-2 rounded-full mr-2">
                        2
                      </span>
                      <p>payment options</p>
                    </div>
                    <div className="hidden md:block text-left text-sm">
                      You can safely make your payment by bank or credit card.
                    </div>
                  </div>
                </div> */}

                <div className="checkout-tabs-content ">
                  {/* address tab */}
                  <div className="checkout-tab-address border border-dgrey3">
                    <div className="address-delivery-tab">
                      <div className="address-content flex flex-col md:flex-row text-left">
                        <div className="bg-dwhite1 w-full ">
                          <div className="text-d13 bg-dgrey7 md:text-d16 py-3.5 px-7 text-dblack2 border-b border-dgrey3 flex items-center justify-between">
                            <div className="uppercase ">Delivery address</div>
                            <div className="text-dblack2 text-d14"></div>
                          </div>
                          {/* only if user is loged */}
                          {stateAccount?.loged ? (
                            <div className="checkout-address px-5">
                              {/* error div */}
                              {manualErrors.current.length > 0 && (
                                <div
                                  className={`text-dred4 text-sm mt-2
                                  ${
                                    manualErrors.current["0"].errorCode ===
                                    "payment_method"
                                      ? "hidden"
                                      : ""
                                  }`}
                                >
                                  {manualErrors.current.map(
                                    (err) => err.errorMsg
                                  )}
                                </div>
                              )}
                              <div className="my-6 mx-1 flex justify-between items-center text-sm">
                                Please select a delivery address.
                              </div>
                              <div className="-mx-1">
                                <div></div>
                                <div className="flex flex-wrap">
                                  {addresses?.map((addr, index) => (
                                    <div className="w-full md:w-488 mr-2.5">
                                      <div
                                        className={`bg-dwhite1  p-5 h-44 mb-4 relative transition ease-in duration-200 hover:border-2 hover:border-dblue1 hover:shadow-lg cursor-pointer overflow-hidden
                                      ${
                                        activeAddress === addr
                                          ? "border-2 border-dblue1"
                                          : "border border-dgrey3 opacity-50"
                                      }`}
                                        onClick={() => {
                                          changeAddress(addr, index);
                                        }}
                                      >
                                        <input
                                          type="radio"
                                          name="chosen-address"
                                          id={`chosen-address${addr.address_id}`}
                                          checked={`${
                                            activeAddress === addr
                                              ? "checked"
                                              : ""
                                          }`}
                                        />
                                        <span className="uppercase ml-2.5 leading-6 text-d16">
                                          ADDRESS YOU CHOOSE
                                        </span>
                                        <div className="checkout-address-text text-dblack1 mt-2.5 text-ellipsis overflow-hidden text-left">
                                          <p className="font-bold">
                                            {addr?.firstname}
                                          </p>
                                          <div className="checkout-address-line-desc line-clamp-3 text-sm">
                                            <p>
                                              {addr?.address_2} {addr?.zone}{" "}
                                              {addr?.postcode}
                                            </p>
                                          </div>
                                          <div className="text-sm">
                                            <p>Tel: {addr?.telephone}</p>
                                          </div>
                                        </div>
                                        <div className="text-right text-xs">
                                          <u
                                            className="mr-4"
                                            onClick={() => setDeletemenu(true)}
                                          >
                                            delete
                                          </u>
                                          <span>|</span>
                                          <u
                                            onClick={() => {
                                              getZones();
                                              setAddressmenu(true);
                                              setEditAddress(true);
                                            }}
                                            className="inline-block mt-2.5 text-dblue1 ml-4"
                                          >
                                            edit
                                          </u>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="w-full md:w-488">
                                    <div
                                      className="bg-dwhite1 border border-dgrey3 p-5 h-44 mb-4 relative transition ease-in duration-200 hover:border-2 hover:border-dblue1 hover:p-2.5 hover:shadow-lg cursor-pointer"
                                      onClick={() => {
                                        getZones();
                                        setAddressmenu(true);
                                      }}
                                    >
                                      <div className="absolute top-1/2 right-5 left-16 -translate-y-1/2 text-d14 text-center text-dblack2 flex items-center">
                                        <GoPlus className="w-4 h-4 mr-1" />
                                        <p>create new address</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="w1/2 hidden px-2 ">
                                  <Link>
                                    <input
                                      type="radio"
                                      name=""
                                      id=""
                                      defaultChecked
                                    />
                                    <div className="text-dblack2 relative left-0 top-12 -translate-y-1/2 font-bold text-d14"></div>
                                  </Link>
                                </div>
                              </div>
                              <div className="hidden"></div>
                            </div>
                          ) : (
                            // user is not loged
                            <div className="mx-5 my-5">
                              {/* error div */}
                              {manualErrors.current.length > 0 && (
                                <div
                                  className={`text-dred4 text-sm 
                                  ${
                                    manualErrors.current["0"].errorCode ===
                                    "payment_method"
                                      ? "hidden"
                                      : ""
                                  }`}
                                >
                                  {/* {manualErrors.current.map( */}
                                  {/* (err) => err.errorMsg */}
                                  {manualErrors.current["0"]?.errorMsg}
                                </div>
                              )}

                              <div className="flex flex-wrap justify-between">
                                <div className="w-full md:w-488">
                                  <div className="">
                                    <label htmlFor="" className="w-full">
                                      First Name *
                                    </label>
                                    <input
                                      type="text"
                                      name="first_name"
                                      ref={firstname}
                                      id=""
                                      required
                                      className="address-modal__input"
                                      defaultValue={`${addrInfo.fn}`}
                                      onChange={() => handleInputs()}
                                    />
                                  </div>
                                  <div className="mt-2.5">
                                    <label htmlFor="" className="w-full">
                                      Last Name *
                                    </label>
                                    <input
                                      type="text"
                                      name="first_name"
                                      ref={lastname}
                                      required
                                      id=""
                                      className="address-modal__input"
                                      defaultValue={`${addrInfo.ln}`}
                                      onChange={() => handleInputs()}
                                    />
                                  </div>
                                  <div className="mt-2.5">
                                    <label
                                      htmlFor=""
                                      className="w-full top-2.5 "
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      name="Email"
                                      ref={email}
                                      className="w-full address-modal__input"
                                      // defaultValue={`${email}`}
                                      onChange={() => handleInputs()}
                                    />
                                  </div>

                                  <div className="phone-nb mt-2.5">
                                    <label htmlFor="phone" className="w-full">
                                      Mobile phone *
                                    </label>
                                    <br />
                                    <div className="flex items-center">
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={"+961"}
                                        disabled
                                        className="bg-transparent w-1/6 md:w-10% mt-1"
                                      />
                                      <HandlePhoneModel
                                        phone={telephone}
                                        nb={`${addrInfo.tel}`}
                                        phoneHanlder={phoneHanlder}
                                        handleInputs={handleInputs}
                                        fromCheckout={true}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full md:w-488">
                                  <div className="zone">
                                    <div className="zone ">
                                      <label
                                        htmlFor=""
                                        className="w-full mt-2.5"
                                      >
                                        Zone *
                                      </label>
                                      <select
                                        name="zone"
                                        required
                                        ref={zone_id}
                                        id=""
                                        className="address-modal__input border border-dgrey6"
                                        onChange={(e) => {
                                          zoneChanged(e);
                                          handleInputs();
                                        }}
                                      >
                                        {zones?.map((zone) => (
                                          <option
                                            value={zone.zone_id}
                                            key={zone.zone_id}
                                            selected={`${
                                              addrInfo.znId === zone.zone_id
                                                ? "selected"
                                                : ""
                                            }`}
                                          >
                                            {zone.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="title flex flex-col items-start">
                                    <label
                                      htmlFor="title"
                                      className="w-full mt-2.5"
                                    >
                                      Address *
                                    </label>
                                    <input
                                      type="text"
                                      name="title"
                                      ref={address_1}
                                      required
                                      defaultValue={addrInfo.addr1}
                                      id=""
                                      placeholder="eg: home, work..."
                                      className="address-modal__input"
                                      onChange={() => handleInputs()}
                                    />
                                  </div>
                                  <div className="address mt-2 flex flex-col pb-1">
                                    <label htmlFor="address">
                                      More Address Details *
                                    </label>
                                    <textarea
                                      name="address_details"
                                      id=""
                                      cols="30"
                                      rows="10"
                                      ref={address_2}
                                      maxLength={256}
                                      defaultValue={addrInfo.addr2}
                                      className="address-modal__input h-28 p-2.5"
                                      placeholder={
                                        "Please enter your other address information such as neighborhood, street, apartment name and number."
                                      }
                                      onChange={() => handleInputs()}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* <div className="bg-dwhite1 w-full md:w-1/3 border-l border-dgrey3">
                            <div
                              onSubmit={(e) => handleSubmit(e)}
                              className={`${
                                stateAccount?.loged &&
                                JSON.stringify(activeAddress) === "{}"
                                  ? "opacity-30"
                                  : "opacity-100"
                              }`}
                            >
                              <div className="text-d16 py-3.5 px-7 text-dblack2 uppercase borer-b border-dgrey3">
                                {" "}
                                Cargo company
                              </div>
                              <div className="px-5"></div>
                              <div className="checkout-error text-left whitespace-nowrap mb-2.5 px-5 mt-1 text-dred4 text-d12"></div>
                              <div className="py-2.5 px-3.5 mb-5">
                                <button
                                  id="savebtn"
                                  //type="submit"
                                  onClick={(e) => {
                                    handleSubmit(e);
                                  }}
                                  className="text-d14 tracking-tight uppercase mt-3.5 h-11 text-center w-full bg-dblue1 text-dwhite1 flex items-center justify-center "
                                >
                                  <span>SAVE AND CONTINUE</span>
                                  <BsChevronRight className="w-3 h-3 ml-0.5" />
                                </button>
                              </div>
                            </div>
                          </div> */}
                      </div>
                    </div>
                    <div className="shop-delivery-tab"></div>
                  </div>

                  <div className="checkout-tab-payment relative mt-5 bg-dwhite1">
                    <div className="payment-type-content block">
                      <form action="" className="flex flex-col md:flex-row">
                        <div className="w-full border border-dgrey3">
                          <div className="text-d13 md:text-d16 py-3.5 px-7 bg-dgrey7  uppercase border-b border-dgrey3 w-full text-left">
                            {" "}
                            Payment options
                          </div>
                          <div className="px-7">
                            <div className="my-6 mx-1 flex justify-start items-center">
                              <input type="radio" name="" id="" checked />
                              <p className="ml-2 text-d18">Cash on delivery</p>
                            </div>
                            <div className="px-1 pb-14"></div>
                          </div>
                        </div>
                        {/* <div className=" w-full md:w-1/2 bg-dwhite1 border border-dgrey3">
                          <div className="text-d13 md:text-d16 px-3.5 py-7 text-dblack2 uppercase border-b border-dgrey3 w-full text-left">
                              {" "}
                              Payment options
                            </div>
                          <div className="checkout-button py-2.5 px-3.5 mb-5">
                            <div className="checkout-sticky-area  w-full  bg-dwhite1">
                              <div className="m-1 w-full items-center text-d14 font-bold md:hidden"></div>

         
                              {window.innerWidth < 650 && (
                                <div className=" w-full md:w-1/3 pt-2">
                                  <div>
                                    <div className="analytics-data hidden"></div>
                                    <div className="checkout-summary border border-dgrey3 bg-dwhite1">
                                      <div className="summary-wrapper py-3.5 px-6 relative bg-dwhite1">
                                        <div className="checkout-sum">
                                          <div className="summary-title text-d16 text-dblack1 border-b-0 flex items-center">
                                            <p>ORDER SUMMARY</p>
                                            <span className="text-d14 font-light mx-1">
                                              {state?.productsCount} Items
                                            </span>
                                          </div>
                                          <div className="checkout-summary-items table w-full">
                                            <div className="summary-items-wrapper h-auto overflow-y-auto mt-5">
                                              <div
                                                className={`summary-items ${
                                                  state.loading &&
                                                  "pointer-events-none opacity-50"
                                                }`}
                                              >
                                               
                                                {manualResponse?.order_product
                                                  ?.length > 0 &&
                                                  manualResponse?.order_product?.map(
                                                    (product, i) => (
                                                      <div
                                                        className={`summary-product-item flex items-center mb-2.5 ${
                                                          !product.stock &&
                                                          "bg-dred5 border-2 p-0.5"
                                                        }`}
                                                        key={
                                                          product?.product_id
                                                        }
                                                      >
                                                        <img
                                                          src={product?.image}
                                                          alt={product?.name}
                                                          className={"w-16"}
                                                        />
                                                        <div className="summary-product-item-info text-left text-d12 table-cell align-top mx-2">
                                                          <Link
                                                            to={`/${
                                                              product?.name
                                                                .replace(
                                                                  /\s+&amp;\s+|\s+&gt;\s+/g,
                                                                  "-"
                                                                )
                                                                .replace(
                                                                  /\s+/g,
                                                                  "-"
                                                                )
                                                                .replace(
                                                                  "/",
                                                                  "-"
                                                                )
                                                                .replace(
                                                                  "%",
                                                                  ""
                                                                ) +
                                                              "/p=" +
                                                              product.product_id
                                                            }`}
                                                            dangerouslySetInnerHTML={{
                                                              __html:
                                                                product?.name,
                                                            }}
                                                          ></Link>

                                                          <div className="text-left font-light flex pt-1">
                                                            <p className="mr-3">
                                                              Quantity :
                                                            </p>
                                                            <div className="flex justify-between">
                                                              <button
                                                                onClick={(e) =>
                                                                  updateQuantity(
                                                                    e,
                                                                    product.key,
                                                                    Number(
                                                                      product.quantity
                                                                    ) - 1,
                                                                    i
                                                                  )
                                                                }
                                                                className="w-4 h-4 md:w-5 md:h-5 pb-1 mr-1.5 md:mr-0 border border-dgrey13 md:border-dblue2 text-d18 md:text-d20 flex justify-center items-center rounded-full font-bold md:font-normal"
                                                              >
                                                                -
                                                              </button>
                                                             
                                                              <input
                                                                id={
                                                                  "p-quantity" +
                                                                  i
                                                                }
                                                                type="number"
                                                                className=" w-10 h-5  text-center bg-transparent"
                                                                defaultValue={
                                                                  product.quantity
                                                                }
                                                                onKeyDown={(
                                                                  e
                                                                ) =>
                                                                  handleChangeQuantity(
                                                                    e,
                                                                    product.key,
                                                                    i
                                                                  )
                                                                }
                                                              />{" "}
                                                              <button
                                                                onClick={(e) =>
                                                                  updateQuantity(
                                                                    e,
                                                                    product.key,
                                                                    Number(
                                                                      product.quantity
                                                                    ) + 1,
                                                                    i
                                                                  )
                                                                }
                                                                className="w-4 h-4 md:w-5 md:h-5 pb-1 ml-1.5 md:ml-0.5 border border-dgrey13 md:border-dblue2 text-d18 md:text-d20 flex justify-center items-center rounded-full font-bold md:font-normal"
                                                              >
                                                                +
                                                              </button>
                                                            </div>
                                                          </div>
                                                          <div className="summary-product-item-count hidden"></div>
                                                        </div>
                                                        <div className="summary-product-item-price hidden text-right text-d14 align-top pr-1"></div>
                                                      </div>
                                                    )
                                                  )}
                                              </div>
                                            </div>
                                            <div className="summary-list table w-full py-5">
                                             
                                              {manualResponse?.order_total?.map(
                                                (total, index) => (
                                                  <div
                                                    className={`flex items-center justify-between mb-1 ${
                                                      total.code ===
                                                      "ultimate_coupons"
                                                        ? "text-dblue1"
                                                        : "text-dblack2"
                                                    } ${
                                                      index ===
                                                      manualResponse.order_total
                                                        .length -
                                                        1
                                                        ? " border-t border-dgrey4 mt-4 pt-4 "
                                                        : ""
                                                    } `}
                                                    key={total.title}
                                                  >
                                                    <span> {total.title} </span>{" "}
                                                    <span> {total.text} </span>{" "}
                                                  </div>
                                                )
                                              )}{" "}
                                          
                                              <div className="hidden"></div>
                                             
                                            </div>
                                          </div>
                                       
                                        </div>
                                      </div>
                                      <div className="hidden mx-6 bg-dwhite1 border-t border-dgrey3"></div>
                                    </div>
                                  </div>
                                  <div
                                    className="hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dwhite1 border border-dgrey3 z-10"
                                    style={{ width: "490px" }}
                                  >
                                    <div className="gift-form-title h-14 bg-dwhite1 text-d14 font-semibold text-left text-dborderblack2 relative border-b border-dgrey4 pl-7 leading-10"></div>
                                    <div className="gift-form-body"></div>
                                  </div>
                                  <div className="gift-form"></div>
                                </div>
                              )}
                              <div className="p-3 text-left font-light text-d11">
                                <input
                                  type="checkbox"
                                  onClick={() =>
                                    setTermCondition(!termCondition)
                                  }
                                  value="1"
                                  className="m-1"
                                  required
                                />{" "}
                                I have read and accept the Membership Agreement
                                . I have read and understood the Clarification
                                text for my personal data to be processed within
                                the scope of my membership
                              </div>
                              {window.config["loginRequired"] &&
                              !stateAccount.loged ? (
                                <a
                                  href
                                  disabled="true"
                                  className="hidden md:block text-center h-12 bg-dblue1 hover:bg-dblack2 transition ease in duration-300  text-white  w-full mt-4 pt-3"
                                  onClick={() => {
                                    navigate("/login");
                                  }}
                                >
                                  {" "}
                                  CONFIRM ORDER{" "}
                                </a>
                              ) : (
                                <button
                                  onClick={
                                    termCondition && ((e) => submitForm(e))
                                  }
                                  disabled={confirmDisable}
                                  className={`hidden md:block text-center h-12  ${
                                    confirmDisable
                                      ? `bg-dgrey1 cursor-not-allowed hover:bg-dgrey1`
                                      : `bg-dblue1 hover:bg-dblack2 transition ease in duration-300`
                                  } text-white  w-full mt-4 `}
                                >
                                  CONFIRM ORDER
                                </button>
                              )}
                            </div>
                          </div>
                        </div> */}
                        {width < 650 && (
                          <div className="fixed z-20 bottom-0 left-0 w-full">
                            <div className="flex items-center">
                              {state?.totals?.map((total, index) => (
                                <button
                                  className={` ${
                                    index === state?.totals.length - 1
                                      ? "block"
                                      : "hidden"
                                  } font-bold text-d15 tracking-tight  mt-3.5 h-11 text-center w-1/2 bg-dwhite1 text-dblack2 flex items-center justify-center hover:bg-dblack1 transition ease in duration-300`}
                                >
                                  Total Amount {total.text}
                                </button>
                              ))}

                              <button
                                onClick={(e) => submitForm(e)}
                                disabled={confirmDisable}
                                className="text-d14 font-bold  tracking-tight uppercase mt-3.5 h-11 text-center w-1/2 bg-dblue1 text-dwhite1 flex items-center justify-center hover:bg-dblack1 transition ease in duration-300"
                              >
                                checkout
                              </button>
                            </div>
                          </div>
                        )}
                      </form>
                    </div>
                  </div>

                  <div className="mycart-tab bg-dwhite1 mt-5">
                    <div className="text-d13 md:text-d16 py-3.5 px-7 bg-dgrey7  uppercase border-b border-dgrey3 w-full text-left">
                      {" "}
                      My Cart
                    </div>
                    <div className="px-7">
                      <div className="summary-items-wrapper h-auto overflow-y-auto mt-5">
                        <div
                          className={`summary-items ${
                            state.loading && "pointer-events-none opacity-50"
                          }`}
                        >
                          {manualResponse?.order_product?.length > 0 &&
                            manualResponse?.order_product?.map((product, i) => (
                              <div
                                className={`summary-product-item flex items-center mb-5 md:mb-3.5 w-full ${
                                  !product.stock && "bg-dred5 border-2 p-0.5"
                                }`}
                                key={product?.product_id}
                              >
                                <img
                                  src={product?.image}
                                  alt={product?.name}
                                  className={"w-20"}
                                />
                                <div className="summary-product-item-info w-full text-left flex flex-col md:flex-row justify-between  align-top mx-2">
                                  <div>
                                    <p className="text-d13 text-dgrey12">
                                      {" "}
                                      {product.sku}{" "}
                                    </p>{" "}
                                    <Link
                                      to={`/${
                                        product?.name
                                          .replace(
                                            /\s+&amp;\s+|\s+&gt;\s+/g,
                                            "-"
                                          )
                                          .replace(/\s+/g, "-")
                                          .replace("/", "-")
                                          .replace("%", "") +
                                        "/p=" +
                                        product.product_id
                                      }`}
                                      dangerouslySetInnerHTML={{
                                        __html: product?.name,
                                      }}
                                      className="text-sm"
                                    ></Link>
                                    {product.option.length > 0 && (
                                      <p className="text-dblue1 text-sm">
                                        {" "}
                                        {product.option[0].name +
                                          " (" +
                                          product.option[0].value +
                                          ")"}{" "}
                                      </p>
                                    )}{" "}
                                  </div>

                                  <div className="flex flex-col justify-end">
                                    <span className=" font-semibold text-d16 md:text-right text-dblack1">
                                      {" "}
                                      {product.price_formatted}{" "}
                                    </span>{" "}
                                    <div className="text-left font-light flex pt-1 text-sm">
                                      <p className="mr-3">Quantity :</p>
                                      <div className="flex justify-between">
                                        <button
                                          onClick={(e) =>
                                            updateQuantity(
                                              e,
                                              product.key,
                                              Number(product.quantity) - 1,
                                              i
                                            )
                                          }
                                          className="w-4 h-4 md:w-5 md:h-5 pb-1 mr-1.5 md:mr-0 border border-dgrey13 md:border-dblue2 text-d18 md:text-d20 flex justify-center items-center rounded-full font-bold md:font-normal"
                                        >
                                          -
                                        </button>
                                        <input
                                          id={"p-quantity" + i}
                                          type="number"
                                          className=" w-10 h-5  text-center bg-transparent"
                                          defaultValue={product.quantity}
                                          onKeyDown={(e) =>
                                            handleChangeQuantity(
                                              e,
                                              product.key,
                                              i
                                            )
                                          }
                                        />{" "}
                                        <button
                                          onClick={(e) =>
                                            updateQuantity(
                                              e,
                                              product.key,
                                              Number(product.quantity) + 1,
                                              i
                                            )
                                          }
                                          className="w-4 h-4 md:w-5 md:h-5 pb-1 ml-1.5 md:ml-0.5 border border-dgrey13 md:border-dblue2 text-d18 md:text-d20 flex justify-center items-center rounded-full font-bold md:font-normal"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="checkout-contract py-5 ">
                    <div className="bg-dwhite1 border border-dgrey3 p-3.5 flex-col items-center hidden"></div>
                  </div>
                </div>
              </div>
            </div>
            {window.innerWidth  && (
              <div className=" w-full md:w-1/3 ">
                <div>
                  <div className="analytics-data hidden"></div>
                  <div className="checkout-summary border border-dgrey3 bg-dwhite1">
                    <div className="summary-wrapper py-3.5 px-6 relative bg-dwhite1">
                      <div className="checkout-sum">
                        <div className="summary-title text-d16 text-dblack1 border-b-0 flex items-center">
                          <p>ORDER SUMMARY</p>
                          <span className="text-d14 font-light mx-1">
                            {state?.productsCount} Items
                          </span>
                        </div>

                        <div className="coupon-div flex items-center w-full mt-4">
                          <input
                            type="text"
                            name="coupon"
                            id=""
                            className="address-modal__input"
                            placeholder="Coupon Code or Gift Card"
                            ref={coupon}
                            onChange={() => handleCouponChange()}
                          />
                          <span
                            className="bg-dblue1 text-dwhite1 h-9 mt-1 py-1 px-1.5"
                            onClick={() => setCoupon()}
                          >
                            Apply
                          </span>
                        </div>

                        <div className="checkout-summary-items table w-full">
                          <div className="summary-items-wrapper h-auto overflow-y-auto mt-5">
                            <div
                              className={`summary-items ${
                                state.loading &&
                                "pointer-events-none opacity-50"
                              }`}
                            ></div>
                          </div>
                          <div className="summary-list table w-full py-5">
                            {/* <div className="summary-item flex justify-between font-mono text-d15 text-dblack2"> */}
                            {/* <div>Total of {state?.productsCount} Items</div>
                            <div>${cartData?.sub_total}</div> */}
                            {manualResponse?.order_total?.map(
                              (total, index) => (
                                <div
                                  className={`flex items-center justify-between mb-1 ${
                                    total.code === "ultimate_coupons"
                                      ? "text-dblue1"
                                      : "text-dblack2"
                                  } ${
                                    index ===
                                    manualResponse.order_total.length - 1
                                      ? " border-t border-dgrey4 mt-4 pt-4 "
                                      : ""
                                  } `}
                                  key={total.title}
                                >
                                  <span> {total.title} </span>{" "}
                                  <span> {total.text} </span>{" "}
                                </div>
                              )
                            )}{" "}
                            {/* </div> */}
                          </div>
                        </div>

                        {/* here */}

                        {window.config["loginRequired"] &&
                        !stateAccount.loged ? (
                          <a
                            href
                            disabled="true"
                            className="hidden md:block text-center h-12 bg-dblue1 hover:bg-dblack2 transition ease in duration-300  text-white  w-full mt-4 pt-3"
                            onClick={() => {
                              navigate("/login");
                            }}
                          >
                            {" "}
                            CONFIRM ORDER{" "}
                          </a>
                        ) : (
                          <button
                            onClick={(e) => submitForm(e)}
                            disabled={confirmDisable}
                            className={`hidden md:block text-center h-12  ${
                              confirmDisable
                                ? `bg-dgrey1 cursor-not-allowed hover:bg-dgrey1`
                                : `bg-dblue1 hover:bg-dblack2 transition ease in duration-300`
                            } text-white  w-full mt-4 `}
                          >
                            CONFIRM ORDER
                          </button>
                        )}

                        {/* <div className="total-area border-t border-dgrey3 pt-6 inline-block w-full">
                        <p className="text-d14 text-dblack1 flex justify-between font-mono">
                          <span>Amount to be paid</span>
                          <span>${cartData?.sub_total}</span>
                        </p>
                      </div> */}
                      </div>
                    </div>
                    <div className="hidden mx-6 bg-dwhite1 border-t border-dgrey3"></div>
                  </div>
                </div>
                <div
                  className="hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dwhite1 border border-dgrey3 z-10"
                  style={{ width: "490px" }}
                >
                  <div className="gift-form-title h-14 bg-dwhite1 text-d14 font-semibold text-left text-dborderblack2 relative border-b border-dgrey4 pl-7 leading-10"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container"></div>
        <div></div>
      </div>

      {/* end address tab */}
    </div>
  );
}

export default Checkout;
