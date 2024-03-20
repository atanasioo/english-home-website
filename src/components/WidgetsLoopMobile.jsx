import { React, useContext } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import CustomArrows from "./CustomArrows";
import SingleProducts from "./SingleProduct";
import { AccountContext } from "../contexts/AccountContext";
import { path } from "../urls";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SliderPlaceHolder from "../assets/images/singleProduct.png";
import SliderPlace from "../assets/images/product.png"
import { FaAngleRight } from "react-icons/fa";
function WidgetsLoopMobile({ widget, showCartmenuMob }) {
  const [accountState] = useContext(AccountContext);

  const types = {
    1: "product",
    2: "category",
    3: "manufacturer",
    4: "seller"
  };

  const setting = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 4000
  };

  const carousal = {
    infinite: false,
    speed: 1000,
    slidesToShow: 2.2,
    slidesToScroll: 1,
    lazyLoad: true
  };

  const grid = {
    infinite: false,
    speed: 1000,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    lazyLoad: true,

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
    swipeToSlide: true,
    slidesToShow: 2.5,
    slidesToScroll: 4,
    infinite: true,
    prevArrow: <CustomArrows direction={"l"} />,
    nextArrow: <CustomArrows direction={"r"} />
  };

  return (
    <div className="py-1">
      {widget.display === "slider" && (
        <Slider {...setting} >
          {widget?.items?.map((item, index) => (
            <Link 
              to={
                // accountState.admin
                //   ? `${path}/${types[item.mobile_type]}/${item.mobile_type_id}`
                //   : 
                  
                  item.name.length > 0
                  ? "/" +
                    item.name
                      .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                      .replace(/\s+/g, "-")
                      .replace("/", "-")
                      .replace("%", "") +
                    "/" +
                    types[item.mobile_type].slice(0, 1) +
                    "=" +
                    item.mobile_type_id
                  : "cat/c=" + item.mobile_type_id
              }
              key={index}
            >
              <LazyLoadImage
                src={"https://www.englishhome.com.lb/image/" + item.image}
                alt={item.name}
               width={"590"}
                height={"270"}
               placeholderSrc={SliderPlaceHolder}
              />
            </Link>
          ))}
        </Slider>
      )}
      {/* view all button */}
      {widget?.display === "carousel" && (
        <div className="flex items-center justify-between">
          {widget.view_title && (
            <h1
              className="pr-semibold p-2 text-xl"
              dangerouslySetInnerHTML={{ __html: widget.title }}
            />
          )}
          {widget.view_all !== "0" && (
            <div>
              {widget.type === "seller" ? (
                <a
                  href={
                    widget.filters !== false && widget.filters !== ""
                      ? "/" +
                        widget.title
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replaceAll("/", "-")
                          .replace("%", "") +
                        "/s=" +
                        widget.type_id +
                        "?has_filter=true" +
                        (widget?.filters?.filter_categories
                          ? "&filter_categories=" +
                            widget?.filters?.filter_categories.map(
                              (fc) => fc.id
                            )
                          : "") +
                        (widget?.filters?.filter_manufacturers
                          ? "&filter_manufacturers=" +
                            widget?.filters?.filter_manufacturers.map(
                              (fm) => fm.id
                            )
                          : "") +
                        (widget?.filters?.filter_sellers
                          ? "&filter_sellers=" +
                            widget?.filters?.filter_sellers.map((fs) => fs.id)
                          : "") +
                        (widget?.filters?.filter_options
                          ? "&filter_options=" +
                            widget?.filters?.filter_options.map((fo) => fo.id)
                          : "")
                      : "/" +
                        widget.title
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replaceAll("/", "-")
                          .replace("%", "") +
                        "/s=" +
                        widget.type_id
                  }
                >
                  <h1 className="font-bold text-xs px-2 py-1 cursor-pointer hover:opacity-80 flex items-center">
                    VIEW ALL <FaAngleRight className="mr-1 ml-1" />
                  </h1>
                </a>
              ) : widget.type === "category" ? (
                <a
                  href={
                    widget.filters !== false && widget.filters !== ""
                      ? "/" +
                        widget.title
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replaceAll("/", "-")
                          .replace("%", "") +
                        "/c=" +
                        widget.type_id +
                        "?has_filter=true" +
                        (widget?.filters?.filter_categories
                          ? "&filter_categories=" +
                            widget?.filters?.filter_categories.map(
                              (fc) => fc.id
                            )
                          : "") +
                        (widget?.filters?.filter_manufacturers
                          ? "&filter_manufacturers=" +
                            widget?.filters?.filter_categories.map(
                              (fm) => fm.id
                            )
                          : "") +
                        (widget?.filters?.filter_sellers
                          ? "&filter_sellers=" +
                            widget?.filters?.filter_sellers.map((fs) => fs.id)
                          : "") +
                        (widget?.filters?.filter_options
                          ? "&filter_options=" +
                            widget?.filters?.filter_options.map((fo) => fo.id)
                          : "")
                      : "/" +
                        widget.title
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replaceAll("/", "-")
                          .replace("%", "") +
                        "/c=" +
                        widget.type_id
                  }
                >
                  <h1 className="font-bold text-xs px-2 py-1 cursor-pointer hover:opacity-80 flex items-center">
                    VIEW ALL <FaAngleRight className="mr-1 ml-1" />
                  </h1>
                </a>
              ) : (
                <a
                  href={
                    widget.type === "new_arrival"
                      ? "/latest"
                      : widget.filters !== false && widget.filters !== ""
                      ? "/" +
                        widget.title
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replaceAll("/", "-")
                          .replace("%", "") +
                        "/c=" +
                        widget.type_id +
                        "?has_filter=true" +
                        (widget?.filters?.filter_categories
                          ? "&filter_categories=" +
                            widget?.filters?.filter_categories.map(
                              (fc) => fc.id
                            )
                          : "") +
                        (widget?.filters?.filter_manufacturers
                          ? "&filter_manufacturers=" +
                            widget?.filters?.filter_manufacturers.map(
                              (fm) => fm.id
                            )
                          : "") +
                        (widget?.filters?.filter_sellers
                          ? "&filter_sellers=" +
                            widget?.filters?.filter_sellers.map((fs) => fs.id)
                          : "") +
                        (widget?.filters?.filter_options
                          ? "&filter_options=" +
                            widget?.filters?.filter_options.map((fo) => fo.id)
                          : "")
                      : "/" +
                        widget.title
                          .replace(/\s+&amp;\s+|\s+&gt;\s+/g, "-")
                          .replace(/\s+/g, "-")
                          .replaceAll("/", "-")
                          .replace("%", "") +
                        "/c=" +
                        widget.type_id
                  }
                >
                  <h1 className="font-bold text-xs px-2 py-1 cursor-pointer hover:opacity-80 flex items-center">
                    VIEW ALL <FaAngleRight className="mr-1 ml-1" />
                  </h1>
                </a>
              )}
            </div>
          )}
        </div>
      )}
      {widget.display === "carousel" && (
        <div className="">
          {window.innerWidth > 650 ? (
            <Slider {...productSetting} className="carousel">
              {widget.items?.map((item) => {
                if (item.product_id) {
                  return (
                    <div
                      className=" grid grid-flow-col  p-3"
                      key={item.product_id}
                    >
                      <SingleProducts
                        className=""
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
                      className={`p-2 cursor-pointer hover:opacity-80 w-1/${widget.column_number} md:w-1/${widget.column_number}`}
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
                            
                            item.name.length > 0
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
                      >
                        <LazyLoadImage
                          alt={item.name}
                          src={
                            `${window.config["site-url"]}/image/` + item.image
                          }
                          // width={widget.banner_width}
                          height={widget.banner_height}
                          title={item.name}
                          placeholdersrc={SliderPlace}                        />
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
                    <div className="pr-3" key={item.product_id}>
                      <SingleProducts
                        // likedData={likedData}
                        item={item}
                        showCartmenuMob={showCartmenuMob}
                      ></SingleProducts>
                    </div>
                  );
                } else {
                  return (
                    <div className={`pr-2`} key={item.banner_image_id}>
                      <Link
                        to={`${
                          // accountState.admin
                          //   ? path +
                          //     "/" +
                          //     types[item.mobile_type] +
                          //     "/" +
                          //     item.mobile_type_id
                          //   :
                             item.name.length > 0
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
                      >
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
        <div className={` px-1 grid grid-cols-${widget.column_number} gap-2`}>
          {widget.mobile_widget_id > 0 ? (
            widget?.items?.map((item, index) =>
              item.mobile_type_id !== "0" ? (
                <Link
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
                        types[item.mobile_type]?.slice(0, 1) +
                        "=" +
                        item.mobile_type_id
                      : "cat/c=" + item.mobile_type_id
                  }
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
                <div key={index} className="p-1">
                  <LazyLoadImage
                    className="w-full"
                    src={"https://www.englishhome.com.lb/image/" + item.image}
                    alt={item.name}
                    // height={item.banner_height}
                  />
                </div>
              )
            )
          ) : (
            <div className="grid justify-between grid-cols-2">
              {widget?.items?.map((item, index) => (
                <div key={index} className="p-1">
                  <LazyLoadImage
                    className="w-full"
                    src={"https://www.englishhome.com.lb/image/" + item.image}
                    alt={item.name}
                    // height={item.banner_height}
                  />
                </div>
              ))}
            </div>
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
                    types[item.mobile_type]?.slice(0, 1) +
                    "=" +
                    item.mobile_type_id
                  : "cat/c=" + item.mobile_type_id
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
            <div key={index} className="p-1">
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

export default WidgetsLoopMobile;
