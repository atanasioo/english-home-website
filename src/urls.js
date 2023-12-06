// Flo
var host = window.location.host;
const firstPath = window.location.href.split('/')[3];
var path1 = "";

export var path = "";
if (window.location.href.split("/")[3] === "store_one") {
  path = "/store_one";
} else if (window.location.href.split("/")[3] === "store_two") {
  path = "/store_two";
}

if (
  localStorage.getItem("site-local-name") === "english-home-store_one" ||
  ((host === "www.englishhome.com.lb" || host === "englishhome.com.lb") &&
    firstPath === "store_one")
) {
  host = "https://www.englishhome.com.lb/";
  path1 = "store_one/api/";
} else if (
  localStorage.getItem("site-local-name") === "english-home-store_two" ||
  ((host === "www.englishhome.com.lb" || host === "englishhome.com.lb") &&
    firstPath === "store_two")
) {
  host = "https://www.englishhome.com.lb/";
  path1 = "store_two/api/";
} else{
  host = window.location.host;
  host = "https://www.englishhome.com.lb/api/";
}

export var pixelID = "";

var urls = {
  token: "v2/index.php?route=token/token&grant_type=client_credentials",
  login: "v2/index.php?route=account/login/login",
  get_account: "v2/index.php?route=account/account/getAccount",
  save_account: "v2/index.php?route=account/account/saveAccount",
  change_password: "v2/index.php?route=account/account/changePassword",
  forget_password: "v2/index.php?route=account/forgotten/forgotten",
  wishlist: "v2/index.php?route=account/wishlist/wishlist",
  wishlistCount: "v2/index.php?route=account/wishlist/getTotalWishlist",
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
  notify: "v2/index.php?route=marketing/notify/addNotification",
  insertLike: "v2/index.php?route=catalog/product/likeProduct",
  deleteLike: "v2/index.php?route=catalog/product/unlikeProduct",
  getLikeProduct: "v2/index.php?route=catalog/product/getLikedProducts",
  verify: "v2/index.php?route=account/address/addressPhoneVerification",
  checkVerify: "v2/index.php?route=account/address/checkVerification",
  contactUs: "v2/index.php?route=account/contact_us",
  disabledAccount: "v2/index.php?route=account/logout/disableAccount",
  pixel: "v2/index.php?route=marketing/st",
  pos : "v2/index.php?route=checkout/cart/addToCartPos&test",
  getSalesMan: "v2/index.php?route=stockapi/admin_login/getSalesMan",
  searchProduct: "v2/index.php?route=stockapi/product&ite"

};

pixelID = "597971315174718";

//path1 = "motor/";

function buildLink(link, payload, width) {
  const extra_params = typeof payload == "undefined" ? "" : payload;
  return host + path1 + urls[link] + extra_params;
}
export default buildLink;
