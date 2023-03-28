import { React, useContext, useState, useCallback } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import CustomArrows from "./CustomArrows";
import SingleProducts from "./SingleProduct";
import { AccountContext } from "../contexts/AccountContext";
import { path } from "../urls";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SliderPlaceholder from "../assets/images/singleProduct.png";
import SliderPlace from "../assets/images/product.png"

function WidgetsLoop({ widget, showCartmenu }) {
  const [accountState] = useContext(AccountContext);
  const [dragging, setDragging] = useState(false);

  const types = {
    1: "product",
    2: "category",
    3: "manufacturer",
    4: "seller"
  };

  const setting = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <CustomArrows direction={"l"} type={"slider"} />,
    nextArrow: <CustomArrows direction={"r"} type={"slider"} />
  };

  const carousal = {
    // dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 2.51,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <CustomArrows direction={"l"} type={"carousel"} />,
    nextArrow: <CustomArrows direction={"r"} type={"carousel"} />
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
    prevArrow: <CustomArrows direction={"l"} type={"grid"} />,
    nextArrow: <CustomArrows direction={"r"} type={"grid"} />
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
    lazyLoad: true
  };
  const productSetting = {
    dots: true,
    speed: 200,
    slidesToShow: widget?.items?.length < 4 ? widget?.items?.length : 4,
    slidesToScroll: 4,
    infinite: true,
    prevArrow: <CustomArrows direction={"l"} />,
    nextArrow: <CustomArrows direction={"r"} />
  };

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const handleOnItemClick = useCallback(
    (e) => {
      if (dragging) {
        // e.stopPropagation()
        e.preventDefault();
      }
    },
    [dragging]
  );

  return (
    <div className="container pt-3">
      {widget.display === "slider" && (
        <Slider {...setting} style={{"height" : widget.banner_height}} >
          {widget?.items?.map((item, index) =>
            item.mobile_type_id === "0" ? (
              <div data-index={index} key={`slider` + index}>
                <LazyLoadImage
                  alt={item.name}
                  src={`${window.config["site-url"]}/image/` + item.image}
                  className="w-full"
                  width={widget.banner_width}
                  height={widget.banner_height}  
                  placeholderSrc={SliderPlaceholder}
              
                         />
              </div>
            ) : (
              <div >
                <Link
                  key={index}
                  to={
                    // accountState.admin
                    //   ? `${path}/${types[item.mobile_type]}/${
                    //       item.mobile_type_id
                    //     }`
                    //   :
                    item?.name?.length > 0
                      ? "/" +
                        item.name
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replace("/", "-")
                          .replace("%", "") +
                        "/" +
                        types[item?.mobile_type]?.slice(0, 1) +
                        "=" +
                        item.mobile_type_id
                      : "cat/c=" + item.mobile_type_id
                  }
                >
                  {/* <LazyLoadImage
                
                /> */}

                  <LazyLoadImage
                 
                    src={"https://www.englishhome.com.lb/image/" + item.image}
                    alt={item.name}
                    width={widget.banner_width}
                    height={widget.banner_height}
                    placeholderSrc={SliderPlaceholder}
                    // style={{"background": url(SliderPlaceholder) }}
                  />
                </Link>
              </div>
            )
          )}
        </Slider>
      )}
      {widget.display === "carousel" && (
        <div className="">
          {window.innerWidth > 650 ? (
            <Slider
              {...(widget.items[0].product_id ? productSetting : carousal)}
              beforeChange={handleBeforeChange}
              afterChange={handleAfterChange}
              className="carousel place-items-center"
            >
              {widget.items?.map((item) => {
                if (item.product_id) {
                  return (
                    <div
                      className=" grid grid-flow-col p-3"
                      key={item.product_id}
                    >
                      <SingleProducts
                        className=""
                        // likedData={likedData}
                        item={item}
                        showCartmenu={showCartmenu}
                        click={handleOnItemClick}
                        dragging={dragging}
                      ></SingleProducts>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`p-1 cursor-pointer hover:opacity-80  place-items-center w-1/${widget.column_number} md:w-1/${widget.column_number} `}
                      key={item.banner_image_id}
                    >
                      <Link
                        to={`${
                          // accountState.admin
                          //   ? path +
                          //     "/" +
                          //     types[item.mobile_type] +
                          //     "/" +
                          //     item.mobile_type_id
                          //   :

                          item?.name?.length > 0
                            ? "/" +
                              item.name
                                .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                                .replace(/\s+/g, "-")
                                .replace("/", "-")
                                .replace("/", "-") +
                              "/" +
                              types[item.mobile_type].slice(0, 1) +
                              "=" +
                              item.mobile_type_id
                            : "cat/c=" + item.mobile_type_id
                        }`}
                        onClickCapture={handleOnItemClick}
                      >
                        <LazyLoadImage
                          alt={item.name}
                          // src={
                          //   `${window.config["site-url"]}/image/` +
                          //   item.image
                          // }
                          src={
                            `https://www.englishhome.com.lb/image/` + item.image
                          }
                          // width={widget.banner_width}
                          height={widget.banner_height}
                          title={item.name}
                          placeholdersrc={SliderPlace}
                        />
                      </Link>
                    </div>
                  );
                }
              })}
            </Slider>
          ) : (
            <Slider {...productMobile}>
              {widget?.items?.map((item) => {
                if (item?.product_id) {
                  return (
                    <div className="pr-2" key={item.product_id}>
                      <SingleProducts
                        // likedData={likedData}
                        item={item}
                      ></SingleProducts>
                    </div>
                  );
                } else {
                  return (
                    <div className={`pr-2`} key={item.banner_image_id}>
                      <Link>
                        <LazyLoadImage
                          alt={item.name}
                          src={
                            `https://www.englishhome.com.lb/image/` + item.image
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
        <div className="flex">
          {widget?.items?.map((item, index) =>
            item.mobile_type_id !== "0" ? (
              <Link
                className={` w-1/${widget.column_number} md:w-1/${widget.column_number} `}
                to={
                  // accountState.admin
                  //   ? `${path}/${types[item.mobile_type]}/${
                  //       item?.mobile_type_id
                  //     }`
                  //   :
                  item?.name?.length > 0
                    ? "/" +
                      item?.name
                        ?.replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                        .replace("%", "")
                        .replace(/\s+/g, "-")
                        .replace("/", "-") +
                      "/" +
                      types[item?.mobile_type]?.slice(0, 1) +
                      "=" +
                      item.mobile_type_id
                    : "cat/c=" + item.mobile_type_id
                }
                // onClick={() => {
                //   if (types[item.mobile_type]?.slice(0, 1) === "p") {
                //     setProductHolder(item);
                //   }
                // }}
              >
                <LazyLoadImage
                  className="w-full"
                  alt={item.name}
                  src={`https://www.englishhome.com.lb/image/` + item.image}
                  width={item.banner_width}
                  height={item.banner_height}
                  // title={item.name}
                  // placeholdersrc={""}
                />
              </Link>
            ) : (
              <div key={index}>
                <LazyLoadImage
                  className="w-full"
                  src={"https://www.englishhome.com.lb/image/" + item.image}
                  alt={item.name}
                  // height={item.banner_height}
                />
              </div>
            )
          )}
        </div>
      )}

      {widget.display === "grid" &&
        widget.items.length < 2 &&
        widget?.items?.map((item, index) =>
          item.mobile_type_id !== "0" ? (
            <Link
              to={
                // accountState.admin
                //   ? `${path}/${types[item.mobile_type]}/${item?.mobile_type_id}`
                //   :
                item?.name?.length > 0
                  ? "/" +
                    item?.name
                      ?.replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                      .replace("%", "")
                      .replace(/\s+/g, "-")
                      .replace("/", "-") +
                    "/" +
                    types[item?.mobile_type]?.slice(0, 1) +
                    "=" +
                    item?.mobile_type_id
                  : "cat/c=" + item?.mobile_type_id
              }
            >
              <LazyLoadImage
                className="w-full"
                alt={item.name}
                src={`https://www.englishhome.com.lb/image/` + item.image}
                width={item.banner_width}
                height={item.banner_height}
                title={item.name}
              />
            </Link>
          ) : (
            <div key={index}>
              <LazyLoadImage
                className="w-full"
                src={"https://www.englishhome.com.lb/image/" + item.image}
                alt={item.name}
                height={item.banner_height}
              />
            </div>
          )
        )}
    </div>
  );
}

export default WidgetsLoop;
