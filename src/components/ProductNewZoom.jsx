import { hover } from "@testing-library/user-event/dist/hover";
import { React, useState, useEffect } from "react";
import Slider from "react-slick";
import SmallArrows from "./SmallArrows";
import product_image from "../assets/images/product.png";
import ProductZoomModal from "./ProductZoomModal";

function ProductNewZoom(props) {
  const [activeImage, setActiveImage] = useState("");
  const [images, setImages] = useState(props.images);
  const [hoverZoom, setHoverZoom] = useState(false);
  const [lensClass, setLensClass] = useState("hidden");
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const width = window.innerWidth;

  useEffect(() => {
    setImages(props.images);

    setActiveImage(images[0]);

    props?.images?.map((i) => {
      if (i.product_option_value_id === props.activeOption) {
        setActiveImage(i);
      }
    });

    return () => {
      setActiveImage({});
      setImages([]);
    };
  }, [props.activeOption, props.images]);

  useEffect(() => {
    if (hoverZoom) {
      imageZoom("myimage", "myresult");
    }
  }, [hoverZoom]);

  const setting = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: width > 840 ? 6 : 4,
    slidesToScroll: 5,
    autoplay: false, ///
    vertical: false,
    prevArrow: <SmallArrows direction={"l"} />,
    nextArrow: <SmallArrows direction={"r"} />,
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

  function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens " + lensClass);
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calculate the ratio between result DIV and lens:*/
    cx = result.offsetWidth / (lens.offsetWidth * 1.5);
    cy = result.offsetHeight / (lens.offsetHeight * 1.5);
    /*set background properties for the result DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize =
      img.width * cx + "px " + img.height * cy + "px";
    /*execute a function when someone moves the cursor over the image, or the lens:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the imagee:*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      /*calculate the position of the lenss:*/
      x = pos.x - lens.offsetWidth / (10 * 1.5);
      y = pos.y - lens.offsetHeight / (10 * 1.5);
      /*prevent the lens from being positioned outside the image:*/
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      if (x > img.width - lens.offsetWidth) {
        x = img.width - lens.offsetWidth;
      }

      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }

      // prevent the lens from being positioned outside the image:
      x = Math.max(Math.min(x / 1.5, img.width - lens.offsetWidth), 0);
      y = Math.max(Math.min(y / 1.5, img.height - lens.offsetHeight), 0);

      /*set the position of the lens:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*display what the lens "sees":*/
      result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
    }
    function getCursorPos(e) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the imagee:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }

  function closeModal() {
    setShowModal(false);
    props.hideFixedCartMenu(false);
  }

  function changeImage(imgSrc) {
    var image = document.getElementById("myimage");
    image.style.opacity = "0";
    setTimeout(function () {
      setActiveImage(imgSrc);
      const selectedImgIndex = images.findIndex(
        (item) => item.popup === imgSrc.popup && item.thumb === imgSrc.thumb
      );
      setCurrentSlide(selectedImgIndex);
      image.addEventListener("load", () => {
        image.style.opacity = "1"; // set the opacity to 1 after a short delay
      });
    }, 250); // the delay in milliseconds, should match the duration of the CSS transition
  }

  console.log(images);

  return (
    <div>
      {showModal && (
        <ProductZoomModal
          selectedImage={activeImage}
          images={images}
          productData={props.productData}
          currentSlideIndex={currentSlide}
          closeModal={closeModal}
          hideFixedCartMenu={props.hideFixedCartMenu}
        />
      )}

      {images.length > 0 && (
        <div className="flex flex-col">
          <div className=" w-full md:w-10/12 relative flex items-center">
            <div
              onMouseEnter={() => {
                setHoverZoom(true);
                setLensClass("");
              }}
              onMouseLeave={() => {
                setHoverZoom(false);
                setLensClass("hidden");
              }}
              className={"hover:cursor-zoom-in   "}
            >
              {activeImage["popup"]?.length > 0 ? (
                <div
                  onClick={() => {
                    setShowModal(true);
                    props.hideFixedCartMenu(true);
                  }}
                >
                  <img
                    id="myimage"
                    src={activeImage["popup"]}
                    alt=""
                    className="rounded-lg myimage-product-zoom"
                  />
                </div>
              ) : (
                <img src={product_image} alt="" className="rounded-lg  " />
              )}
            </div>
            <div>
              <div
                id="myresult"
                className={`img-zoom-result absolute rounded-lg top-0 ml-4  w-full    ${
                  hoverZoom && width > 650 ? "" : "hidden"
                }`}
              ></div>
            </div>
          </div>

          {/* selector div */}
          <div className="w-full thumbs-slider mt-2">
            {width > 650 ? (
              <Slider {...setting}>
                {images?.map((i) => (
                  <div
                    key={i["thumb"]}
                    className={` flex justify-center mt-2 mr-4 cursor-pointer ${
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
            ) : (
              <Slider {...mobileSetting}>
                {images?.map((i) => (
                  <div
                    key={i["thumb"]}
                    className={` flex justify-center mt-2 mr-4 cursor-pointer ${
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
      )}
    </div>
  );
}

export default ProductNewZoom;
