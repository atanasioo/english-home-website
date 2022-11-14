import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ForgotMyPassword from "./pages/ForgotMyPassword";
import HeaderCampaigns from "./components/HeaderCampaigns";
import { AccountContext, AccountProvider } from "./contexts/AccountContext";
import { CartProvider } from "./contexts/CartContext";
import Login from "./pages/Login";

function App() {
  const width = window.innerWidth;

  return (
    <div className="App ">
      <CartProvider>
        <AccountProvider>
          <Header />
          {width > 650 && <HeaderCampaigns />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="category/:id" element={<Category />} />
            {/* <Route
              path={["/:name/c=:id", "/:name/m=:id", "/:name/s=:id"]}
              element={<Category />}   exact
            /> */}
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotmypassword" element={<ForgotMyPassword />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="/:name/p=:id" element={<Product />} exact />
          </Routes>
          <Footer />
        </AccountProvider>
      </CartProvider>
    </div>
  );
}

export default App;
