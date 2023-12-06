import React from "react";

function SitesHeader() {
  return (
    <div>
      <div className="flex justify-start items-center my-4 ">
        <div
          className="bg-dgrey9 text-dwhite1 px-4 py-2 ml-3 font-semibold cursor-pointer"
          onClick={() =>
            localStorage.setItem("site-local-name", "english-home")
          }
        >
          {" "}
          English Home{" "}
        </div>
        <div
          className="bg-dgrey9 text-dwhite1 px-4 py-2 ml-3 font-semibold cursor-pointer"
          onClick={() =>
            localStorage.setItem("site-local-name", "english-home-store_one")
          }
        >
          {" "}
          English Home Store One{" "}
        </div>
        <div
          className="bg-dgrey9 text-dwhite1 px-4 py-2 ml-3 font-semibold cursor-pointer"
          onClick={() =>
            localStorage.setItem("site-local-name", "english-home-store_two")
          }
        >
          {" "}
          English Home Store Two{" "}
        </div>
      </div>
    </div>
  );
}

export default SitesHeader;
