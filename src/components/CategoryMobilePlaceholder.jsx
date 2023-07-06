import React from "react";

function CategoryMobilePlaceholder() {
  return (
    <div
      className="animate-pulse mx-4 mb-12"
      style={{ backgroundColor: "#f7f7fa" }}
    >
      <div className="placeholder_animation h-8 w-full bg-white mt-4 mb-3"></div>
      <div className="flex gap-2">
        <div className="placeholder_animation h-8 w-full bg-white mt-4 mb-6"></div>
        <div className="placeholder_animation h-8 w-full bg-white mt-4 mb-6"></div>
      </div>
      
      <div className="flex">
        {/* Left */}
        <div className="w-full">
          {/* Options */}
          {/* <div className=" h-9 flex justify-between mb-3">
                        <div className="bg-white placeholder_animation h-full w-1/6"></div>
                        <div className="flex h-full justify-between w-9/12">
                            <div className="bg-white placeholder_animation h-full w-1/6"></div>
                            <div className="bg-white placeholder_animation h-full w-1/6"></div>
                            <div className="bg-white placeholder_animation h-full w-1/6 "></div>
                            <div className="bg-white placeholder_animation h-full w-1/6"></div>
                        </div>
                    </div> */}
          {/* Categories */}
          {/* <div className="placeholder_animation h-36 bg-white my-4"></div> */}

          <div className="grid grid-cols-2 gap-3">
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
            <div className="placeholder_animation h-64 bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryMobilePlaceholder;
