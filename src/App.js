import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeaderCampaigns from "./components/HeaderCampaigns";
import { AccountContext, AccountProvider } from "./contexts/AccountContext";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const width= window.innerWidth;

  return (
    <div className="App">
      <CartProvider>
        <AccountProvider>
          <Header />
          {width >650 && (
            <HeaderCampaigns />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
          <Footer />
        </AccountProvider>
      </CartProvider>
    </div>
  );
}

export default App;
