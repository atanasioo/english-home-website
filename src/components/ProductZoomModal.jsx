import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import { GrClose } from "react-icons/gr";
import PrismaZoom from "react-prismazoom";



function ProductZoomModal(props) {
  const { productData, images, selectedImage, closeModal, currentSlideIndex } =
    props;
  const [activeImage, setActiveImage] = useState("");
  const [cursor, setCursor] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(currentSlideIndex);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const width = window.innerWidth;

  useEffect(() => {
    setActiveImage(selectedImage);

    props?.images?.map((i) => {
      //   if (i.product_option_value_id === props.activeOption) {
      //     console.log("entered");
      //     setActiveImage(i);;
      //   }
    });
    if (width < 840) {
      const popup = document.getElementById("popup_modal");
      const backgroundImageUrl = selectedImage["popup"];
      // Create a new style element
      const style = document.createElement("style");
      style.type = "text/css";
      // Add a CSS rule for the #popup_modal::before pseudo-element
      const css = `#popup_modal::before { background-image: url(${backgroundImageUrl}); }`;
      style.appendChild(document.createTextNode(css));
      // Add the style element to the head of the document
      document.head.appendChild(style);
    }

    return () => {
      setActiveImage({});
    };
  }, [props.activeOption, images, selectedImage]);

  const mobileSetting = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 3.5,
    slidesToScroll: 2,
    swipeToSlide: true,
    autoplay: false,
    currentSlide: currentSlide,
    ref: slider2,
  };

  const mobileSingleSetting = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false,
    currentSlide: currentSlide,
    ref: slider1,
  };

  function changeImage(imgSrc) {
    var selectedImgIndex = 0;
    var image = document.getElementById("myimage");
    if (width > 840) {
      image.style.opacity = "0";
    } else {
      selectedImgIndex = images.findIndex(
        (item) => item.popup === imgSrc.popup && item.thumb === imgSrc.thumb
      );
    }

    setTimeout(function () {
      setActiveImage(imgSrc);

      if (width > 840) {
        image.addEventListener("load", () => {
          image.style.opacity = "1"; // set the opacity to 1 after a short delay
        });
      } else {
        slider1.current.slickGoTo(selectedImgIndex);
      }
    }, 250); /// the delay in milliseconds, should match the duration of the CSS transition
  }

  const handleFirstSliderChange = (index) => {
    setCurrentSlide(index);
    slider2.current.slickGoTo(index);
    setActiveImage(images[index]);
    const popup = document.getElementById("popup_modal");
    const backgroundImageUrl = activeImage["popup"];
    // Create a new style element
    const style = document.createElement("style");
    style.type = "text/css";
    // Add a CSS rule for the #popup_modal::before pseudo-element
    const css = `#popup_modal::before { background-image: url(${backgroundImageUrl}); }`;
    style.appendChild(document.createTextNode(css));
    // Add the style element to the head of the document
    document.head.appendChild(style);
  };

  return (
    <div className="fixed bg-white md:bg-dblackOverlay top-0 lef-0 right-0 bottom-0 w-full h-full z-40 overflow-hidden">
      <div className="relative z-50 h-screen mx-auto text-center box-border">
        <div className="absolute w-full lg:w-11/12 m-auto h-screen lg:h-5/6 z-50 bg-white top-0 left-0 right-0 bottom-0 md:rounded-lg">
          <GrClose
            className="absolute right-1 m-3 w-7 h-7 md:w-5 md:h-5 cursor-pointer text-white md:text-black"
            onClick={() => closeModal()}
          />
          <div
            id="popup_modal"
            className="flex flex-col justify-center h-900 lg:h-full"
          >
            <div className=" flex flex-col h-full lg:h-unset justify-between lg:flex-row lg:mx-8 py-2 md:py-0  lg:bg-white">
              <div className="product-big-img lg:mr-3 w-full lg:w-2/3 flex flex-col h-full justify-center items-center">
                {width > 840 ? (
                  <PrismaZoom
                    minZoom={1}
                    maxZoom={3}
                    onZoomChange={() => setCursor(!cursor)}
                  >
                    <img
                      id="myimage"
                      src={activeImage["popup"]}
                      alt=""
                      className={`rounded-lg   myimage-product-zoom  ${
                        cursor ? "cursor-zoom-out" : "cursor-zoom-in"
                      }`}
                    />
                  </PrismaZoom>
                ) : (
                  <Slider
                    {...mobileSingleSetting}
                    afterChange={handleFirstSliderChange}
                    className="w-full"
                  >
                    {images?.map((i) => (
                      <PrismaZoom
                        minZoom={1}
                        maxZoom={3}
                        onZoomChange={() => setCursor(!cursor)}
                        key={i["thumb"]}
                      >
                        <img
                          id="myimage"
                          src={i["popup"]}
                          alt=""
                          className={`rounded-lg w-full  myimage-product-zoom  ${
                            cursor ? "cursor-zoom-out" : "cursor-zoom-in"
                          }`}

                        />
                      </PrismaZoom>
                    ))}
                  </Slider>
                )}
              </div>
              <div className="product-info ml-4 lg:w-1/3">
                <div className="flex flex-col text-dborderblack2 text-left place-content-center">
                  <div className="product-title hidden lg:block font-mono md:font-mono font-semibold  text-dborderblack2 text-d17 md:text-d20 w-8/12">
                    {productData.name}
                  </div>
                  <div className="model-nb hidden lg:block text-sm text-light mt-10">
                    Model Number: {productData.model}
                  </div>
                  {/* selector-div */}
                  {width > 840 ? (
                    <div className={`grid ${images.length<4 ? "grid-cols-4" : "grid-cols-3" }  xl:grid-col-4 mt-7 `}>
                      {images?.map((i) => (
                        <div
                          key={i["thumb"]}
                          className={`mt-3 mr-2 w-24 cursor-pointer ${
                            activeImage["popup"] === i["popup"]
                              ? "border-3 border-dborderblack1"
                              : ""
                          } outline-none`}
                        >
                          <img
                            src={i["thumb"]}
                            alt=""
                            onClick={() => changeImage(i)}
                            className={`cursor-pointer `}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Slider
                      {...mobileSetting}
                      className={` thumbss-slider mb-2 ${
                        images.length < 4 ? "thumbss-center-slider" : ""
                      }`}
                    >
                      {images?.map((i) => (
                        <div
                          key={i["thumb"]}
                          className={` flex justify-center  mt-2 mr-4 w-20  cursor-pointer ${
                            activeImage["popup"] === i["popup"]
                              ? "border-3 border-dborderblack1"
                              : ""
                          } outline-none`}
                        >
                          <img
                            src={i["thumb"]}
                            alt=""
                            onClick={() => changeImage(i)}
                            className={`cursor-pointer`}
                          />
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductZoomModal;
