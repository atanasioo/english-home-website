import { useEffect, useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import "../assets/css/arrows.css";
import Slider from "react-slick";
// import SmallArrows from "./SmallArrows";
import "../assets/css/index.css"
import "../assets/css/magiczoom.css";
import CustomArrows from "./CustomArrows";
import SmallArrows from "./SmallArrows";
import product_image from "../assets/images/product.png"

function NewZoom(props) {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState({});
  //const [currentSlidee, setCurrentSlidee] = useState(0);
  const width = window.innerWidth;

  const setting = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 6,
    slidesToScroll: 5,
    autoplay: false,
    vertical: false,
    prevArrow: <SmallArrows direction={"l"} />,
    nextArrow: <SmallArrows direction={"r"} />
  };
  const mobileSetting = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 2,
    swipeToSlide: true,
    autoplay: false,
  };

  // console.log("Did this compenet get rerender ? ");
  useEffect(() => {
    setImages(props.images);
    try {
      document.getElementById("mag-z-id").outerHTML = "";
    } catch (e) {}
    const script = document.createElement("script");
    script.src = "https://www.ishtari.com/magiczoomplus/magiczoomplus.js";
    script.async = false;
    script.id = "mag-z-id";
    document.body.appendChild(script);
    setActiveImage(images[0]);

    // if(images[1]?.product_option_value_id !==0){
    props?.images?.map((i) => {
      if (i.product_option_value_id === props.activeOption) {
        setActiveImage(i);
      }
    });

    // }else{
    //   setActiveImage(images[0]);

    // }

    return () => {
      setActiveImage({});
      setImages([]);
    };
  }, [props.activeOption, props.images]);
  return (
    <div>
      {images.length > 0 && (
        <div className="flex flex-col justify-center items-center" key={activeImage.popup}>
          {/* <div className="bx-wrapper max-w-full mb-1.5 relative"> */}
            <div
              className=" overflow-hidden"
            >
              <div className="w-full"  >
                <div
                  id="Zoom-1"
                  className="MagicZoom"
                  // href={activeImage["popup"]}
                >
                  <LazyLoadImage
                    src={activeImage["popup"]}
                    alt=""
                    className="rounded-lg"
                    // style={{minHeight: "575px"}}
                    placeholderSrc={product_image}
                  />
                </div>
              </div>
            </div>

          {/* </div> */}
          <div
            id="selector_div"
            className=" selector_div w-full my-2 md:pr-2 "
          >
            <div className="selectors w-full overflow-hidden overflow-y-hidden h-full  whitespace-pre md:whitespace-normal ">
              {width > 650 ? (
                <Slider {...setting}>
                  {images?.map((i) => (
                    <a
                      data-zoom-id="Zoom-1"
                      href={i["popup"]}
                      key={i["popup"]}
                      data-image={i["popup"]}
                      data-zoom-image-2x={i["popup"]}
                      data-image-2x={i["popup"]}
                      className="mz-thumb flex justify-center"
                    >
                      <img srcSet={i["thumb"]} src={i["thumb"]} alt=""/>
                    </a>
                  ))}
                </Slider>
              ) : (
                <Slider {...mobileSetting}>
                  {images?.map((i) => (
                    <a
                      data-zoom-id="Zoom-1"
                      href={i["popup"]}
                      key={i["popup"]}
                      data-image={i["popup"]}
                      data-zoom-image-2x={i["popup"]}
                      data-image-2x={i["popup"]}
                      className="mz-thumb flex justify-center"
                    >
                      <img srcSet={i["thumb"]} src={i["thumb"]} alt="" />
                    </a>
                  ))}
                </Slider>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewZoom;
