import { useEffect, useContext, useState } from "react";
import _axios from "../axios";
import { Link } from "react-router-dom";
import buildLink, { path } from "../urls";
import SingleProducts from "../components/SingleProduct";
import TopCart from "../components/TopCart";
import Loader from "../components/Loader";
import { WishlistContext } from "../contexts/WishlistContext";
import CartmenuMobile from "../components/CartmenuMobile";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [showCartmenu, setShowCartmenu] = useState(false);
  const [showCartmenuMob, setShowCartmenuMob] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stateW, dispatchW] = useContext(WishlistContext);
  const width= window.innerWidth;

  useEffect(() => {
    _axios
      .get(buildLink("wishlist", undefined, window.innerWidth))
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const data = response.data.data.products;
          setProducts(data);
          setLoading(false);
        } else {
        }
      });
  }, []);

  function showCart() {
    if(width > 650){
      setShowCartmenu(true);
    }else{
      setShowCartmenuMob(true);
    }
    
    setOverlay(true);
  }

  function closeCartMobMenu(){
    setShowCartmenuMob(false);
    setOverlay(false);
  }

    // Remove
    function remove(e, product_id) {
        e.preventDefault();
        _axios
          .delete(
            buildLink("wishlist", undefined, window.innerWidth) +
              "/&id=" +
              product_id
          )
          .then(() => {
            _axios
              .get(buildLink("wishlist", undefined, window.innerWidth))
              .then((response) => {
                const data = response.data.data.products;
                setProducts(data);
                dispatchW({
                  type: "setProductsCount",
                  payload: response.data.data.total
                });
              });
            window.location.reload();
          });
      }


  return (
    <>
      {showCartmenu && (
        <div>
          <TopCart
           cartmenu={showCartmenu} />
        </div>
      )}
      {showCartmenuMob && (
        <div>
          <CartmenuMobile closemenu={closeCartMobMenu} />
        </div>
      )}
      {overlay && (
        <div
          className="fixed h-full w-full min-h-full z-10 bg-dblackOverlay2 top-0 left-0"
          onClick={() => {
            setShowCartmenu(false);
            setOverlay(false);
          }}
        ></div>
      )}
      <div className="relative">
        <div
          className="h-20 opacity-60"
          style={{ backgroundColor: "#D8D8D8" }}
        ></div>
        <div
          className="absolute top-1/4 text-center block w-full text-3xl leading-tight"
          style={{ color: "rgb(51, 51, 51)" }}
        >
          Favorites
        </div>
      </div>
      <div className="container">
        {loading ? (
            <Loader />
        ):(
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.length > 0 &&
            products.map((product) => (
              <SingleProducts
                showCartmenu={showCart}
                item={product}
                wishlist= {true}
                removeW= {remove}
                showCartmenuMob={showCart}
              ></SingleProducts>
            ))}
        </div>  
        )}
        
      </div>
    </>
  );
};
export default Wishlist;
