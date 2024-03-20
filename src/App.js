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
                {window.location.href.split("/")[3] === "storeone" ? (
                  <>
                    <Route path="/storeone" element={<Home />} exact />
                    <Route path="/storeone/category" element={<Category />} />
                    <Route
                      path={"/storeone/:name/c=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storeone/:name/c=:id/all"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storeone/:name/s=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storeone/:name/m=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route path="/storeone/cart" element={<Cart />} />
                    <Route path="/storeone/checkout" element={<Checkout />} />
                    <Route path="/storeone/login" element={<Login />} />
                    <Route
                      path="/storeone/forgotmypassword"
                      element={<ForgotMyPassword />}
                    />
                    <Route
                      path="/storeone/product/:id"
                      element={<Product />}
                    />
                    <Route
                      path="/storeone/:name/p=:id"
                      element={<Product />}
                      exact
                    />

                    <Route path="/storeone/account" element={<Account />} />
                    <Route
                      path="/storeone/account/orders"
                      element={<Orders />}
                    />
                    <Route
                      path="/storeone/account/profile"
                      element={<Profile />}
                    />
                    <Route
                      path="/storeone/account/addresses"
                      element={<Addresses />}
                    />
                    <Route
                      path="/storeone/storeLocator"
                      element={<StoreLocator />}
                    />
                    <Route
                      path="/storeone/information/:id"
                      element={<Information />}
                    />
                    <Route path="/storeone/contact" element={<Contact />} />

                    <Route path="/storeone/search" element={<Search />} />
                    <Route path="/storeone/latest" element={<Latest />} />
                    <Route
                      path="/storeone/posOrders"
                      element={<posOrders />}
                    />

                    <Route path="/storeone/pos" element={<Pos />} />

                    <Route
                      path="/storeone/account/change-email"
                      element={<ChangeEmail />}
                    />
                    <Route
                      path="/storeone/account/change-password"
                      element={<ChangePassword />}
                    />
                    <Route
                      path="/storeone/account/order-details"
                      element={<OrderDetails />}
                    />
                    <Route
                      path="/storeone/account/wishlist"
                      element={<Wishlist />}
                    />
                    <Route path="/storeone/success" element={<Success />} />
                    <Route
                      path="/storeone/:name"
                      element={<NotFound />}
                      exact
                    />
                  </>
                ) : window.location.href.split("/")[3] === "storetwo" ? (
                  <>
                    <Route path="/storetwo" element={<Home />}  />
                    <Route path="/storetwo/category" element={<Category />} />
                    <Route
                      path={"/storetwo/:name/c=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storetwo/:name/c=:id/all"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storetwo/:name/s=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storetwo/:name/m=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route path="/storetwo/cart" element={<Cart />} />
                    <Route path="/storetwo/checkout" element={<Checkout />} />
                    <Route path="/storetwo/login" element={<Login />} />
                    <Route
                      path="/storetwo/forgotmypassword"
                      element={<ForgotMyPassword />}
                    />
                    <Route
                      path="/storetwo/product/:id"
                      element={<Product />}
                    />
                    <Route
                      path="/storetwo/:name/p=:id"
                      element={<Product />}
                      exact
                    />

                    <Route path="/storetwo/account" element={<Account />} />
                    <Route
                      path="/storetwo/account/orders"
                      element={<Orders />}
                    />
                    <Route
                      path="/storetwo/account/profile"
                      element={<Profile />}
                    />
                    <Route
                      path="/storetwo/account/addresses"
                      element={<Addresses />}
                    />
                    <Route
                      path="/storetwo/storeLocator"
                      element={<StoreLocator />}
                    />
                    <Route
                      path="/storetwo/information/:id"
                      element={<Information />}
                    />
                    <Route path="/storetwo/contact" element={<Contact />} />

                    <Route path="/storetwo/search" element={<Search />} />
                    <Route path="/storetwo/latest" element={<Latest />} />
                    <Route
                      path="/storetwo/posOrders"
                      element={<posOrders />}
                    />

                    <Route path="/storetwo/pos" element={<Pos />} />

                    <Route
                      path="/storetwo/account/change-email"
                      element={<ChangeEmail />}
                    />
                    <Route
                      path="/storetwo/account/change-password"
                      element={<ChangePassword />}
                    />
                    <Route
                      path="/storetwo/account/order-details"
                      element={<OrderDetails />}
                    />
                    <Route
                      path="/storetwo/account/wishlist"
                      element={<Wishlist />}
                    />
                    <Route path="/storetwo/success" element={<Success />} />
                    <Route
                      path="/storetwo/:name"
                      element={<NotFound />}
                      exact
                    />
                  </>
                ) 
                : window.location.href.split("/")[3] === "storezahle" ? (
                  <>
                    <Route path="/storezahle" element={<Home />}  />
                    <Route path="/storezahle/category" element={<Category />} />
                    <Route
                      path={"/storezahle/:name/c=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storezahle/:name/c=:id/all"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storezahle/:name/s=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route
                      path={"/storezahle/:name/m=:id"}
                      element={<Category />}
                      exact
                    />
                    <Route path="/storezahle/cart" element={<Cart />} />
                    <Route path="/storezahle/checkout" element={<Checkout />} />
                    <Route path="/storezahle/login" element={<Login />} />
                    <Route
                      path="/storezahle/forgotmypassword"
                      element={<ForgotMyPassword />}
                    />
                    <Route
                      path="/storezahle/product/:id"
                      element={<Product />}
                    />
                    <Route
                      path="/storezahle/:name/p=:id"
                      element={<Product />}
                      exact
                    />

                    <Route path="/storezahle/account" element={<Account />} />
                    <Route
                      path="/storezahle/account/orders"
                      element={<Orders />}
                    />
                    <Route
                      path="/storezahle/account/profile"
                      element={<Profile />}
                    />
                    <Route
                      path="/storezahle/account/addresses"
                      element={<Addresses />}
                    />
                    <Route
                      path="/storezahle/storeLocator"
                      element={<StoreLocator />}
                    />
                    <Route
                      path="/storezahle/information/:id"
                      element={<Information />}
                    />
                    <Route path="/storezahle/contact" element={<Contact />} />

                    <Route path="/storezahle/search" element={<Search />} />
                    <Route path="/storezahle/latest" element={<Latest />} />
                    <Route
                      path="/storezahle/posOrders"
                      element={<posOrders />}
                    />

                    <Route path="/storezahle/pos" element={<Pos />} />

                    <Route
                      path="/storezahle/account/change-email"
                      element={<ChangeEmail />}
                    />
                    <Route
                      path="/storezahle/account/change-password"
                      element={<ChangePassword />}
                    />
                    <Route
                      path="/storezahle/account/order-details"
                      element={<OrderDetails />}
                    />
                    <Route
                      path="/storezahle/account/wishlist"
                      element={<Wishlist />}
                    />
                    <Route path="/storezahle/success" element={<Success />} />
                    <Route
                      path="/storezahle/:name"
                      element={<NotFound />}
                      exact
                    />
                  </>
                )
                
                : (
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
