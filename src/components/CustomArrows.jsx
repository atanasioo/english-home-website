
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
export default function CustomArrows({
  direction,
  onClick,
  style,
  className,
  type
}) {
  console.log(style);
  return type === "slider" || type === "carousel" ? (
    <div
      style={{ ...style, padding: "2px 2px" }}
      onClick={onClick}
      className={`absolute z-10 ${
        direction === "r" ? "right-0" : "left-0"
      }  border-dblack1 border-2 w-12 h-12  top-1/2  cursor-pointer bg-white mx-4`}
    >
 

      {direction === "r" ? (
        <BsChevronRight
          className="w-10 h-10 transform  hover:scale-125 ease-in-out"
          style={{ color: "#0f0f0f" }}
        />
      ) : (
        <BsChevronLeft
          className="w-10 h-10 transform  hover:scale-125 ease-in-out"
          style={{ color: "#0f0f0f" }}
        />
      )}
    </div>
  ) : (
    <div
      style={{ ...style, padding: "2px 5px" }}
      onClick={onClick}
      className={` absolute z-20 ${
        direction === "r" ? "right-0" : "left-0"
      }  rounded-full w-14 h-14  top-1/2  cursor-pointer -mx-12`}
    >
      {/* <img src={direction === 'r' ? right : left} alt="" className='w-16 h-16 transform rounded-full hover:scale-125 ease-in-out' /> */}
      {direction === "r" ? (
        <BsChevronRight
          className="w-16 h-16 transform rounded-full hover:scale-125 ease-in-out "
          style={{ color: "#0f0f0f" }}
        />
      ) : (
        <BsChevronLeft
          className="w-16 h-16 transform rounded-full hover:scale-125 ease-in-out"
          style={{ color: "#0f0f0f" }}
        />
      )}
    </div>
  );
}
