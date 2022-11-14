import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import _axios from "../axios";
import SingleProductCategory from "../components/SingleProductCategory";
import buildLink from "../urls";
function Category() {
  const location = useLocation();
  const id = useParams().id;
  const title = useParams().c;
  const path  = location.pathname;
  const [data, setData] = useState({})
  
 

  useEffect(() => {
    var type
    if (location.pathname.indexOf("c=") > 0) type = "category"
    if (location.pathname.indexOf("m=") > 0) type = "manufacturer"
    if (location.pathname.indexOf("s=") > 0) type = "seller" 
    if (location.pathname.indexOf("?has_filter") > 0) type = "product_filter"

    _axios.post(buildLink(type , undefined, undefined) + id ).then((response)=>{
       setData(response.data.data);
    })


  }, [location]);
  return <div>
    <div className="flex flex-row">
      <div className="w-2/12">
        1
      </div>
      <div className="w-10/12">
      <div className="grid grid-cols-4">
        {data?.products?.map((product)=>(
          <div className="p-2">
             <SingleProductCategory item={product}></SingleProductCategory>
          </div>
         
        ))}
      </div>
      </div>
    </div>
  </div>;
}

export default Category;
