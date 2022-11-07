// Flo
var host = window.location.host;
export const path = "";
export var pixelID = "";
var mobileurls;
var path1 = "";
var urls = {
  token: "v2/index.php?route=token/token&grant_type=client_credentials",
  login: "v2/index.php?route=account/login/login",
  get_account: "v2/index.php?route=account/account/getAccount",
  save_account: "v2/index.php?route=account/account/saveAccount",
  change_password: "v2/index.php?route=account/account/changePassword",
  forget_password: "v2/index.php?route=account/forgotten/forgotten",
  wishlist: "v2/index.php?route=account/wishlist/wishlist",
  wishlistCount:"v2/index.php?route=account/wishlist/getTotalWishlist",
  orders: "v2/index.php?route=account/order/orders",
  order_details: "v2/index.php?route=account/order/orders&id=",
  register: "v2/index.php?route=account/register/register",
  latest: "v2/index.php?route=catalog/product/latest",
  zone: "v2/index.php?route=account/zone&country_id=",
  town: "v2/index.php?route=account/town&zone_id=",
  social: "v2/index.php?route=account/login/sociallogin",
  logout: "v2/index.php?route=account/logout/logout",
  address: "v2/index.php?route=account/address/address",
  cart: "v2/index.php?route=checkout/cart/cart",
  cartCount: "v2/index.php?route=checkout/cart/getProductsCount",
  search: "v2/index.php?route=catalog/search/autoCompleteV2&term=",
  home: "v2/index.php?route=common/widgets",
  product: "v2/index.php?route=catalog/product&product_id=",
  // recentlyViewd: "v1/index.php?route=catalog/product/recentlyViewd",
  productpreview: "v2/index.php?route=catalog/product_preview&product_id=",
  category: "v2/index.php?route=catalog/category&path=",
  manufacturer: "v2/index.php?route=catalog/manufacturer&manufacturer_id=",
  seller: "v2/index.php?route=catalog/seller&seller_id=",
  alg: "v2/index.php?route=catalog/search&key=",
  filter: "v2/index.php?route=catalog/filter_product",
  banner_event: "v2/index.php?route=design/bannerevent",
  menu: "v2/index.php?route=common/home/getMenu",
  footer: "v2/index.php?route=common/home/getFooter",
  all_categories: "v2/index.php?route=catalog/category/categories&level=2",
  manual: "v2/index.php?route=checkout/manual",
  payment_form: "v2/index.php?route=checkout/payment_form",
  autoCompletePhone:
    "v2/index.php?route=account/address/autoComplete&filter_name=",
  getCustomerByPhone:
    "v2/index.php?route=account/address/getCustomerByPhone&phone=",
  information: "v2/index.php?route=catalog/information",
  alias: "v2/index.php?route=catalog/seo/handler&keyword=",
  footerv2: "v2/index.php?route=common/footerItem",
  headerv2: "v2/index.php?route=design/headerMenu",
  // reviews: "v2/index.php?route=catalog/review",
  // pixel: "v1/index.php?route=marketing/st",
  currency: "v2/index.php?route=account/change/currency",
  notify:
    "v2/index.php?route=marketing/notify/addNotification",
  // productBundles:
  //   "v1/index.php?route=catalog/product/getProductBundles&product_id=",
  insertLike: "v2/index.php?route=catalog/product/likeProduct",
  deleteLike: "v2/index.php?route=catalog/product/unlikeProduct",
  getLikeProduct: "v2/index.php?route=catalog/product/getLikedProducts",
  verify: "v2/index.php?route=account/address/addressPhoneVerification",
  checkVerify: "v2/index.php?route=account/address/checkVerification"

};
if (
  localStorage.getItem("site-local-name") === "ishtari-ghana" ||
  host === "www.ishtari.com.gh" ||
  host === "ishtari.com.gh"
) {
  pixelID = "1132590020651282";
  host = "https://www.ishtari.com.gh/";
  // urls = {
  path1 = "";
  //   token: "v1/index.php?route=token/new_token&grant_type=client_credentials",
  //   login: "v1/index.php?route=account/login/login",
  //   get_account: "v1/index.php?route=account/account/getAccount",
  //   save_account: "v1/index.php?route=account/account/saveAccount",
  //   change_password: "v1/index.php?route=account/account/changePassword",
  //   wishlist: "v1/index.php?route=account/wishlist/wishlist",
  //   orders: "v1/index.php?route=account/order/orders",
  //   order_details: "v1/index.php?route=account/order/orders&id=",
  //   register: "v1/index.php?route=account/register/register",
  //   latest: "v1/index.php?route=catalog/product/latest",
  //   zone: "v1/index.php?route=account/zone/zone&country_id=",
  //   town: "v1/index.php?route=account/town/town&zone_id=",
  //   social: "v1/index.php?route=account/login/sociallogin",
  //   logout: "v1/index.php?route=account/logout/logout",
  //   address: "v1/index.php?route=account/address/address",
  //   cart: "v1/index.php?route=checkout/cart/cart",
  //   cartCount: "v1/index.php?route=checkout/cart/getProductsCount",
  //   search: "v1/index.php?route=catalog/fastsearch/autoComplete&term=",
  //   home: "v1/index.php?route=common/widgets",
  //   product: "v1/index.php?route=catalog/product&product_id=",
  //   productpreview: "v1/index.php?route=catalog/productpreview&product_id=",
  //   category: "v1/index.php?route=catalog/category&path=",
  //   manufacturer: "v1/index.php?route=catalog/manufacturer&manufacturer_id=",
  //   seller: "v1/index.php?route=catalog/seller&seller_id=",
  //   alg: "v1/index.php?route=catalog/new_search&key=",
  //   filter: "/v1/index.php?route=catalog/filter_product/new_filter",
  //   banner_event: "v1/index.php?route=design/bannerevent",
  //   menu: "v1/index.php?route=common/home/getMenu",
  //   footer: "v1/index.php?route=common/home/getFooter",
  //   all_categories: "v1/index.php?route=catalog/category/categories&level=2",
  //   manual: "v1/index.php?route=checkout/manual",
  //   payment_form: "v1/index.php?route=checkout/payment_form",
  //   autoCompletePhone:
  //     "v1/index.php?route=account/address/autoComplete&filter_name=",
  //   getCustomerByPhone:
  //     "v1/index.php?route=account/address/getCustomerByPhone&phone=",
  //   information: "v1/index.php?route=catalog/information",
  //   footerv2: "v1/index.php?route=common/footerItem",
  //   headerv2: "v1/index.php?route=design/headermenu/header",
  //   reviews: "v1/index.php?route=catalog/review"
  // };
}
if (
  localStorage.getItem("site-local-name") === "ishtari" ||
  host === "www.ishtari.com" ||
  host === "www.sari3.com" ||
  host === "ishtari.com"
) {
  pixelID = "668318187192045";
  host = "https://www.ishtari.com/";
  path1 = "motor/";
  mobileurls = {
    token: "v2/index.php?route=token/token&grant_type=client_credentials",
    login: "v2/index.php?route=account/login/login",
    get_account: "v2/index.php?route=account/account/getAccount",
    save_account: "v2/index.php?route=account/account/saveAccount",
    change_password: "v2/index.php?route=account/account/changePassword",
    forget_password: "v2/index.php?route=account/forgotten/forgotten",
    wishlist: "v2/index.php?route=account/wishlist/wishlist",
    wishlistCount:"v2/index.php?route=account/wishlist/getTotalWishlist",
    orders: "v2/index.php?route=account/order/orders",
    order_details: "v2/index.php?route=account/order/orders&id=",
    register: "v2/index.php?route=account/register/register",
    latest: "v2/index.php?route=catalog/product/latest",
    zone: "v2/index.php?route=account/zone&country_id=",
    social: "v2/index.php?route=account/login/sociallogin",
    logout: "v2/index.php?route=account/logout/logout",
    address: "v2/index.php?route=account/address/address",
    cart: "v2/index.php?route=checkout/cart/cart",
    cartCount: "v2/index.php?route=checkout/cart/getProductsCount",
    search: "v2/index.php?route=catalog/search/autoCompleteV2&term=",
    home: "v2/index.php?route=common/widgets",
    product: "v2/index.php?route=catalog/product&product_id=",
    productpreview: "v2/index.php?route=catalog/product_preview&product_id=",
    category: "v2/index.php?route=catalog/category&path=",
    manufacturer: "v2/index.php?route=catalog/manufacturer&manufacturer_id=",
    seller: "v2/index.php?route=catalog/seller&seller_id=",
    alg: "v2/index.php?route=catalog/search&key=",
    filter: "v2/index.php?route=catalog/filter_product",
    banner_event: "v2/index.php?route=design/bannerevent",
    menu: "v2/index.php?route=common/home/getMenu",
    footer: "v2/index.php?route=common/home/getFooter",
    all_categories: "v2/index.php?route=catalog/category/categories&level=2",
    manual: "v2/index.php?route=checkout/manual",
    payment_form: "v2/index.php?route=checkout/payment_form",
    autoCompletePhone:
      "v2/index.php?route=account/address/autoComplete&filter_name=",
    getCustomerByPhone:
      "v2/index.php?route=account/address/getCustomerByPhone&phone=",
    information: "v2/index.php?route=catalog/information",
    alias: "v2/index.php?route=catalog/seo/handler&keyword=",
    footerv2: "v2/index.php?route=common/footerItem",
    headerv2: "v2/index.php?route=design/headerMenu",
   
    currency: "v2/index.php?route=account/change/currency",
    notify:
      "v2/index.php?route=marketing/notify/addNotification",
    // productBundles:
    //   "v1/index.php?route=catalog/product/getProductBundles&product_id=",
    insertLike: "v2/index.php?route=catalog/product/likeProduct",
    deleteLike: "v2/index.php?route=catalog/product/unlikeProduct",
    getLikeProduct: "v2/index.php?route=catalog/product/getLikedProducts",
    town: "v2/index.php?route=account/town/town&zone_id=",
    verify: "v2/index.php?route=account/address/addressPhoneVerification",
    checkVerify: "v2/index.php?route=account/address/checkVerification"
  };
}
if (
  localStorage.getItem("site-local-name") === "flo" ||
  host === "www.flo-lebanon.com" ||
  host === "flo-lebanon.com"
) {
  host = "https://www.flo-lebanon.com/";
  path1 = "api/";
}
if (
  localStorage.getItem("site-local-name") === "aalbeit" ||
  host === "www.aalbeit.com" ||
  host === "aalbeit.com"
) {
  host = "https://www.aalbeit.com/";
  path1 = "api/";
}
if (
  localStorage.getItem("site-local-name") === "ishtari-usd" ||
  host === "www.ishtari-usd.com"
) {
  host = "https://www.ishtari-usd.com/";
  path1 = "api/";
}
if (
  localStorage.getItem("site-local-name") === "energy-plus" ||
  host === "www.energyplus-lb.com" ||
  host === "energyplus-lb.com"
) {
  host = "https://energyplus-lb.com/";
  path1 = "api/";
}
function buildLink(link, payload, width) {
  if (
    (width < 500 && localStorage.getItem("site-local-name") === "ishtari") ||
    (width < 500 && host === "https://www.ishtari.com/")
  ) {
    var mobilehost = "https://www.ishtari-mobile.com/";
    const extra_params = typeof payload == "undefined" ? "" : payload;
    return mobilehost + mobileurls[link] + extra_params;
  } else {
    const extra_params = typeof payload == "undefined" ? "" : payload;
    return host + path1 + urls[link] + extra_params;
  }
}
export default buildLink;