
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
export default function CustomArrows({
  direction,
  onClick,
  style,
  className,
  type
}) {
 
  return type === "slider" || type === "carousel" ? (
    <div
      style={{ ...style, padding: "2px 2px" }}
      onClick={onClick}
      className={`absolute z-10 top-1/2 -mt-9  ${
        direction === "r" ? "right-0" : "left-0"
      }  border-dblack1 border w-9 h-9   cursor-pointer bg-dgreyTransp1 mx-4 flex items-center justify-center`}
    >
 

      {direction === "r" ? (
        <BsChevronRight
          className="w-6 h-6 transform "
          style={{ color: "#0f0f0f" }}
        />
      ) : (
        <BsChevronLeft
          className="w-6 h-6 transform"
          style={{ color: "#0f0f0f" }}
        />
      )}
    </div>
  ) : (
    <div
      style={{ ...style, padding: "2px 5px" }}
      onClick={onClick}
      className={` absolute z-20 top-1/2 -mt-9 ${
        direction === "r" ? "right-0" : "left-0"
      }  rounded-full w-14 h-14   cursor-pointer -mx-12`}
    >
      {/* <img src={direction === 'r' ? right : left} alt="" className='w-16 h-16 transform rounded-full hover:scale-125 ease-in-out' /> */}
      {direction === "r" ? (
        <BsChevronRight
          className="w-9 h-9 transform rounded-full"
          style={{ color: "#0f0f0f" }}
        />
      ) : (
        <BsChevronLeft
          className="w-9 h-9 transform rounded-ful"
          style={{ color: "#0f0f0f" }}
        />
      )}
    </div>
  );
}
