import React from "react";
import notfound from "../assets/images/404.webp";

function NotFound() {
  return (
    <div class="h-screen w-screen flex items-center bg-dgrey2">
      <div class="container flex flex-col md:flex-col items-center justify-center w-full text-gray-700">
      <div class="flex flex-wrap justify-center">

        <div class="w-full">
          <img src={notfound} alt="" />
        </div>
        </div>
        <div className="text-d17 font-bold text-black mt-12">The page you were looking for could not be found.</div>
      </div>
    </div>
  );
}

export default NotFound;
