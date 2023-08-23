import React from "react";
import cityCenterLocation from "../assets/images/city-center-location.png";
import cityMallLocation from "../assets/images/city-mall.png";

function StoreLocator() {
  return (
    <div className="md:container py-7 font-mono tracking-tighter px-10">
      <div className="w-full text-d27 font-bold flex justify-start mb-6 px-4">
        Our Stores
      </div>
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
        <div className="w-1/2 flex flex-col gap-2  px-4 text-left">
          <div className="text-d20 font-bold ">
            City Center, 2nd floor
          </div>
          <div>Beirut - Lebanon</div>
          <div>Phone: +961 76 400 008</div>
          <div>
            <img
              className="w-full"
              src={cityCenterLocation}
              alt="city-center-location"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-2  px-4 text-left">
          <div className="text-d20 font-bold ">
            City Mall, <span className="italic text-d17">Coming Soon...</span>
          </div>
          <div>Beirut - Lebanon</div>
          <div>Phone: +961 76 400 008</div>
          <div>
            <img
              className="w-full"
              src={cityMallLocation}
              alt="city-mall-location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreLocator;
