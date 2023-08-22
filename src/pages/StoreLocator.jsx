import React from 'react'
import cityCenterLocation from "../assets/images/city-center-location.png"
import cityMallLocation from "../assets/images/city-mall.png"

function StoreLocator() {
  return (
    <div className='md:container py-7 font-mono tracking-tighter'>
      <div className='w-full text-d27 font-bold flex justify-start mb-6 px-4'>Our Stores</div>
      <div className='flex flex-col gap-5 md:gap-0 md:flex-row '>
        <div className='flex flex-col gap-2 justify-start items-start px-4'>
          <div className='text-d20 font-bold text-start'>City Center, 2nd floor</div>
          <div>Beirut - Lebanon</div>
          <div>Phone: +961 76 400 008</div>
          <div>
            <img 
              src={cityCenterLocation}
              alt="city-center-location"
            />
          </div>
        </div>
        <div className='flex flex-col gap-2 justify-start items-start px-4'>
          <div className='text-d20 font-bold text-start'>City Mall, <span className='italic text-d17'>Coming Soon...</span></div>
          <div>Beirut - Lebanon</div>
          <div>Phone: +961 76 400 008</div>
          <div>
            <img 
              src={cityMallLocation}
              alt="city-mall-location"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreLocator