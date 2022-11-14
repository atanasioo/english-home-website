import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
export default function SmallArrows({ direction, onClick, style, className }) {
 
    return (
      <div
        style={{ ...style}}
        onClick={onClick}
        className={`${className}  z-30  bg-dblackOverlay w-6 h-7 ${
          direction === "r" ? "right-0 " : "left-0 "
        }   cursor-pointer  `}
      > 
      {direction === "r" ? (
        <BsChevronRight className="text-white w-5 h-5 mt-1 ml-0.5"/>
      ): (
        <BsChevronLeft className="text-white w-5 h-5 mt-1"/>
      )}
        
      </div>
    );
  }
  