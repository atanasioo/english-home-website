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
    <div className="flex flex-row p-2 bg-dgrey10">
    {window.innerWidth > 650 &&

      <div className="w-3/12 px-8">
        <div className="w-full text-left text-d18 text-dblue2 fontsemibold border-b border-dblue2 p-2">CATEGORIES</div>
        <div className="w-full">FILTERS</div>
        <div className="w-full">



          
        </div>

      

      </div> }
   
        {window.innerWidth > 650 ?
           <div className="w-9/12">
        <div className="grid grid-cols-3">
        {data?.products?.map((product)=>(
          <div className="p-">
             <SingleProductCategory item={product}></SingleProductCategory>
          </div>
        ))}
      </div>
      </div>

      :
      <div className="grid grid-cols-2">
        {data?.products?.map((product)=>(
          <div className="">
             <SingleProductCategory item={product}></SingleProductCategory>
          </div>
         
        ))}
      </div>
      
      }
      
    </div>
  </div>;
}

export default Category;
