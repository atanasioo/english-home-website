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
import Login from "./pages/Login";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Profile from './pages/Profile';
import Search from "./pages/Search";
import OrderDetails from "./pages/OrderDetails"
import ChangeEmail from "./pages/ChangeEmail";
import ChangePassword from "./pages/ChangePassword";
import Addresses from "./pages/Addresses";
function App() {
  const width = window.innerWidth;

  return (
    <div className="App ">
      <CartProvider>
        <AccountProvider>
          <WishlistProvider>
            <Header />
          {width > 650 && <HeaderCampaigns />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route
              path={"/:name/c=:id"}
              element={<Category />}   exact
            />
             <Route
              path={"/:name/s=:id"}
              element={<Category />}   exact
            />
             <Route
              path={"/:name/m=:id"}
              element={<Category />}   exact
            />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotmypassword" element={<ForgotMyPassword />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="/:name/p=:id" element={<Product />} exact />

            <Route path="account" element={<Account />} />
            <Route path="account/orders" element={<Orders />} />
            <Route path="account/profile" element={<Profile />} />
            <Route path="account/addresses" element={<Addresses />} />

            <Route path="search" element={<Search />}/>
            <Route path="account/change-email" element={<ChangeEmail />} />
            <Route path="account/change-password" element={<ChangePassword />} />
            <Route path="account/order-details" element={<OrderDetails />} />






          </Routes>
          <Footer />
          </WishlistProvider>
        </AccountProvider>
      </CartProvider>
    </div>
  );
}

export default App;
