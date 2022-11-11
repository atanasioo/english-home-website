import React, { useEffect, useState } from "react";
import _axios from "../axios";
import buildLink from "../urls";
import { useParams } from "react-router-dom";
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';

function Product() {
  const [productData, setProductData] = useState();
  let product_id = useParams().id;

  useEffect(() => {
    _axios
      .get(buildLink("product", undefined, undefined) + product_id)
      .then((response) => {
        setProductData(response.data.data);
      });
  }, []);

  return (
    <div className="flex flex-wrap ">
      <div className="w-7/12">x</div>

      <div className="w-5/12 p-1 ">
      <div className="flex my-3">
        <div className="font-sans md:font-serif font-semibold text-left	text-dborderblack2 text-d20 w-8/12">
          {productData?.heading_title}
        </div>
        <div className="align-right w-8 mt-1 text-d25  ml-6 	text-dborderblack2 font-black	" ><FiShare/></div>
        <div className="align-right w-12 mt-1 text-d25 ml-2 	text-dborderblack2" ><AiOutlineHeart /></div>
      </div>
        <div className="flex my-3">
          <div className="rounded-full bg-dborderblack2 text-white w-16 h-16 text-d11 align-middle pt-4">
            DiSCOUNT IN CART
          </div>

          <div className="pl-5 flex-nowrap text-d20  text-left align-middle my-1">
            <div className="font-light"> {productData?.price}</div>
            <div className="font-bold text-d25 leading-5">
              {" "}
              {productData?.special}
            </div>
          </div>
        </div>

        {productData?.options && productData?.options?.length > 0 && (
          <div className="my-4">
            <div className="text-left my-2">
              {productData?.["options"]["0"]?.name} :
            </div>
            <div className="flex flex-wrap w-full">
              {productData["options"]["0"]["option_value"]?.map((option) => (
                <img
                  src={option["image"]}
                  className="border  w-14 h-10 mr-4 text-center "
                  alt={option?.name}
                />
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-wrap my-3">
          <div className="w-3/12 flex flex-wrap align-middle text-center pt-3 text-d22 font-bold text-dborderblack2 pr-3">
            <span className="w-3/12">-</span>
           <span className="w-6/12 text-center "> 1 </span>
            <span className="w-3/12">+</span>
          </div>
          <button className="bg-dborderblack2 font-black	 text-white  py-4 w-8/12 text-d16">
      
            ADD TO BASKET
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
