import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import CustomArrows from "./CustomArrows";
import SingleProducts from "./SingleProduct";

function WidgetsLooop({ widget }) {
  const setting = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <CustomArrows direction={"l"}      type={"slider"}  />,
    nextArrow: <CustomArrows direction={"r"}      type={"slider"} />
  };

  const carousal = {
    // dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    lazyLoad: true,
    // autoplay: true,
    // autoplaySpeed: 4000,
    prevArrow: <CustomArrows direction={"l"}   type={"carousel"}  />,
    nextArrow: <CustomArrows direction={"r"}  type={"carousel"} />
  };


  const grid = {
    // dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    lazyLoad: true,
    // autoplay: true,
    // autoplaySpeed: 4000,
    prevArrow: <CustomArrows direction={"l"}   type={"grid"}  />,
    nextArrow: <CustomArrows direction={"r"}  type={"grid"} />
  };
  const productMobile = {
    dots: false,
    speed: 200,
    slidesToShow:
      widget?.type === "banner"
        ? widget?.display === "carousal"
          ? 2.5
          : widget.column_number - 0.5
        : 2.5,
    swipeToSlide: true,
    infinite: false,
    arrows: false,
    lazyLoad: true,
  };
  const productSetting = {
    dots: true,

    speed: 200,
    slidesToShow: widget?.items?.length < 4 ? widget?.items?.length : 4,
    slidesToScroll: 4,
    infinite: true,
    prevArrow: <CustomArrows direction={"l"} />,
    nextArrow: <CustomArrows direction={"r"} />,
  };
  return (
    <div className="container">
      {widget.display === "slider" && (
        <Slider {...setting} >
          {widget?.items?.map((item, index) => (
            <Link key={index} >
              <img
                className="w-full"
                src={"https://www.ishtari.com/image/" + item.image}
                alt={item.name}
                height={item.banner_height}
              />
            </Link>
          ))}
        </Slider>
      )}
      {widget.display === "carousel" && (
          <div className="">
          {window.innerWidth > 650 ? (
            <Slider {...productSetting}
             className="carousel" 
            >
              {widget.items?.map((item) => {
                if (item.product_id) {
                  return (
                    <div className=" grid grid-flow-col  p-3" key={item.product_id}>
                      <SingleProducts className=""
                        // likedData={likedData}
                        item={item}
                        // click={handleOnItemClick}
                        // dragging={dragging}
                      ></SingleProducts>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`p-1 cursor-pointer hover:opacity-80 w-1/${widget.column_number} md:w-1/${widget.column_number}`}
                      key={item.banner_image_id}
                    >
                      <Link
                 
                      >
                        <img
                          alt={item.name}
                          src={
                            `${window.config["site-url"]}/image/` +
                            item.image
                          }
                          width={item.banner_width}
                          height={item.banner_height}
                          title={item.name}
                          // placeholdersrc={ProductPlaceholder}
                        />
                      </Link>
                    </div>
                  );
                }
              })}
            </Slider>
          ) : (
            <Slider {...productMobile}>
              {widget.items?.map((item) => {
                if (item.product_id) {
                  return (
                    <div className="pr-2" key={item.product_id}>rrr
                      <SingleProducts
                        // likedData={likedData}
                        item={item}
                      ></SingleProducts>
                    </div>
                  );
                } else {
                  return (
                    <div className={`pr-2`} key={item.banner_image_id}>
                      <Link
                      
                      >
                        <img
                          alt={item.name}
                          src={
                            `${window.config["site-url"]}/image/` +
                            item.image
                          }
                          width={item.banner_width}
                          height={item.banner_height}
                          title={item.name}
                        />
                        
                      </Link>
                    </div>
                  );
                }
              })}
            </Slider>
          )}
        </div>
      )}
     

     
      {widget.display === "grid" && widget.items.length > 1 && (
        <Slider {...carousal}>
          {widget?.items?.map((item, index) => (
            <div key={index}>
              <img
                className="w-full"
                src={"https://www.ishtari.com/image/" + item.image}
                alt={item.name}
                // height={item.banner_height}
              />
            </div>
          ))}
        </Slider>
      )}

      {widget.display === "grid" &&
        widget.items.length < 2 &&
        widget?.items?.map((item, index) => (
          <div key={index}>
            <img
              className="w-full"
              src={"https://www.ishtari.com/image/" + item.image}
              alt={item.name}
              height={item.banner_height}
            />
          </div>
        ))}
    </div>
  );
}

export default WidgetsLooop;
