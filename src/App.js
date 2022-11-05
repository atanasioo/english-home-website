import './App.css';
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='category' element={ <Category/> }/>
        <Route path='product' element={ <Product/> }/>
        <Route path='cart' element={ <Cart/> }/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
