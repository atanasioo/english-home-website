import { useLocation } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs"
import { path } from "../urls";
function Success(props) {
  const location = useLocation();

  return (
    <div className="bg-dbasenavy z-10 fixed top-0 left-0 w-screen h-screen flex justify-center items-center text-white flex-col">
      <span className="  w-20 h-20 bg-white flex items-center justify-center mb-4 rounded-full">
        <BsCheckLg className="text-4xl w-11 h-11 text-dbasenavy"/>
      </span>
      <div className="flex items-center justify-center w-full">
        <div className=""></div>
        <h1 className="font-bold text-3xl text-center">
          Your Order Has Been Processed
        </h1>
      </div>
      <button
        onClick={() => (window.location.href = `${path}/`)}
        className="bg-white text-dbasenavy px-10 py-3 rounded mt-4 font-bold"
      >
        CONTINUE SHOPPING
      </button>
    </div>
  );
}

export default Success;
