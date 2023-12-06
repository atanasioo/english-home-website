import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotMyPassword from "./pages/ForgotMyPassword";
import Checkout from "./pages/Checkout";
import HeaderCampaigns from "./components/HeaderCampaigns";
import { AccountContext, AccountProvider } from "./contexts/AccountContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { InformationProvider } from "./contexts/InformationContext";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import OrderDetails from "./pages/OrderDetails";
import ChangeEmail from "./pages/ChangeEmail";
import ChangePassword from "./pages/ChangePassword";
import Addresses from "./pages/Addresses";
import Information from "./pages/Information";
import ProductPreview from "./pages/ProductPreview";

import Success from "./pages/Success";
import Wishlist from "./pages/Wishlist";
import Latest from "./pages/Latest";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

import PosOrders from "./pages/PosOrders";
import Pos from "./pages/Pos";
import PosPrinttest from "./components/Posprint";
import StoreLocator from "./pages/StoreLocator";
import PosPrint from "./components/Posprint";

function App() {
  const width = window.innerWidth;

  return (
    <div
      className={`App w-full ${
        window.location.href.split("/")[3] === "pos" && "fixed"
      }`}
    >
      <CartProvider>
        <AccountProvider>
          <WishlistProvider>
            <InformationProvider>
              {window.location.href.split("/")[3] !== "posprint" && <Header />}

              {width > 650 && <HeaderCampaigns />}
              <Routes>
                {window.location.href.split("/")[3] === "store_one" ? (
                  <>
                    <Route path="/store_one" element={<Home />} exact />
                    <Route path="/store_one/category" element={<Category />} />
                    <Route
                      path={"/store_one/:name/c=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/store_one/:name/c=:id/all"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/store_one/:name/s=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/store_one/:name/m=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route path="/store_one/cart" element={<Cart />} />
                    <Route path="/store_one/checkout" element={<Checkout />} />
                    <Route path="/store_one/login" element={<Login />} />
                    <Route
                      path="/store_one/forgotmypassword"
                      element={<ForgotMyPassword />}
                    />
                    <Route
                      path="/store_one/product/:id"
                      element={<Product />}
                    />
                    <Route
                      path="/store_one/:name/p=:id"
                      element={<Product />}
                      exact
                    />

                    <Route path="/store_one/account" element={<Account />} />
                    <Route
                      path="/store_one/account/orders"
                      element={<Orders />}
                    />
                    <Route
                      path="/store_one/account/profile"
                      element={<Profile />}
                    />
                    <Route
                      path="/store_one/account/addresses"
                      element={<Addresses />}
                    />
                    <Route
                      path="/store_one/storeLocator"
                      element={<StoreLocator />}
                    />
                    <Route
                      path="/store_one/information/:id"
                      element={<Information />}
                    />
                    <Route path="/store_one/contact" element={<Contact />} />

                    <Route path="/store_one/search" element={<Search />} />
                    <Route path="/store_one/latest" element={<Latest />} />
                    <Route
                      path="/store_one/posOrders"
                      element={<posOrders />}
                    />

                    <Route path="/store_one/pos" element={<Pos />} />

                    <Route
                      path="/store_one/account/change-email"
                      element={<ChangeEmail />}
                    />
                    <Route
                      path="/store_one/account/change-password"
                      element={<ChangePassword />}
                    />
                    <Route
                      path="/store_one/account/order-details"
                      element={<OrderDetails />}
                    />
                    <Route
                      path="/store_one/account/wishlist"
                      element={<Wishlist />}
                    />
                    <Route path="/store_one/success" element={<Success />} />
                    <Route
                      path="/store_one/:name"
                      element={<NotFound />}
                      exact
                    />
                  </>
                ) : window.location.href.split("/")[3] === "store_two" ? (
                  <>
                    <Route path="/store_two" element={<Home />} exact />
                    <Route path="/store_two/category" element={<Category />} />
                    <Route
                      path={"/store_two/:name/c=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/store_two/:name/c=:id/all"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/store_two/:name/s=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/store_two/:name/m=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route path="/store_two/cart" element={<Cart />} />
                    <Route path="/store_two/checkout" element={<Checkout />} />
                    <Route path="/store_two/login" element={<Login />} />
                    <Route
                      path="/store_two/forgotmypassword"
                      element={<ForgotMyPassword />}
                    />
                    <Route
                      path="/store_two/product/:id"
                      element={<Product />}
                    />
                    <Route
                      path="/store_two/:name/p=:id"
                      element={<Product />}
                      exact
                    />

                    <Route path="/store_two/account" element={<Account />} />
                    <Route
                      path="/store_two/account/orders"
                      element={<Orders />}
                    />
                    <Route
                      path="/store_two/account/profile"
                      element={<Profile />}
                    />
                    <Route
                      path="/store_two/account/addresses"
                      element={<Addresses />}
                    />
                    <Route
                      path="/store_two/storeLocator"
                      element={<StoreLocator />}
                    />
                    <Route
                      path="/store_two/information/:id"
                      element={<Information />}
                    />
                    <Route path="/store_two/contact" element={<Contact />} />

                    <Route path="/store_two/search" element={<Search />} />
                    <Route path="/store_two/latest" element={<Latest />} />
                    <Route
                      path="/store_two/posOrders"
                      element={<posOrders />}
                    />

                    <Route path="/store_two/pos" element={<Pos />} />

                    <Route
                      path="/store_two/account/change-email"
                      element={<ChangeEmail />}
                    />
                    <Route
                      path="/store_two/account/change-password"
                      element={<ChangePassword />}
                    />
                    <Route
                      path="/store_two/account/order-details"
                      element={<OrderDetails />}
                    />
                    <Route
                      path="/store_two/account/wishlist"
                      element={<Wishlist />}
                    />
                    <Route path="/store_two/success" element={<Success />} />
                    <Route
                      path="/store_two/:name"
                      element={<NotFound />}
                      exact
                    />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Home />} />
                    <Route path="category" element={<Category />} />
                    <Route path={"/:name/c=:id"} element={<Category />} exact />
                    <Route
                      path={"/:name/c=:id/all"}
                      element={<Category />}
                      exact
                    />
                    <Route path={"/:name/s=:id"} element={<Category />} exact />
                    <Route path={"/:name/m=:id"} element={<Category />} exact />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="login" element={<Login />} />
                    <Route
                      path="forgotmypassword"
                      element={<ForgotMyPassword />}
                    />
                    <Route path="product/:id" element={<Product />} />
                    <Route path="/:name/p=:id" element={<Product />} exact />

                    <Route path="account" element={<Account />} />
                    <Route path="account/orders" element={<Orders />} />
                    <Route path="account/profile" element={<Profile />} />
                    <Route path="account/addresses" element={<Addresses />} />
                    <Route path="/storeLocator" element={<StoreLocator />} />
                    <Route path="/information/:id" element={<Information />} />
                    <Route path="/posprint/:id" element={<PosPrint />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="search" element={<Search />} />
                    <Route path="latest" element={<Latest />} />
                    <Route
                      path="account/change-email"
                      element={<ChangeEmail />}
                    />
                    <Route
                      path="account/change-password"
                      element={<ChangePassword />}
                    />
                    <Route
                      path="account/order-details"
                      element={<OrderDetails />}
                    />
                    <Route path="/posOrders" element={<PosOrders />} />

                    <Route path="/pos" element={<Pos />} />
                    <Route path="account/wishlist" element={<Wishlist />} />
                    <Route path="success" element={<Success />} />
                    <Route path="/:name" element={<NotFound />} exact />
                  </>
                )}
              </Routes>
              {window.location.href.split("/")[3] !== "posprint" &&
                window.location.href.split("/")[3] !== "pos" &&
                window.location.href.split("/")[3] !== "orders" && <Footer />}
            </InformationProvider>
          </WishlistProvider>
        </AccountProvider>
      </CartProvider>
    </div>
  );
}

export default App;
