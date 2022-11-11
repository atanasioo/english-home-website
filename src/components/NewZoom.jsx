import { useEffect, useState, useRef } from "react";
// import "../assets/css/arrows.css";
import Slider from "react-slick";
// import SmallArrows from "./SmallArrows";


function NewZoom(props) {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState({});
  //const [currentSlidee, setCurrentSlidee] = useState(0);
  const width= window.innerWidth;


  const setting = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: false,
    vertical: false,
    // prevArrow: <SmallArrows direction={"u"} /> ,
    // nextArrow: <SmallArrows direction={"d"}/>,
  };
   const mobileSetting= {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false,
   }


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
  }, [props.activeOption]);
  return (
    <div>
      {images.length > 0 && 
        <div
          className=" flex flex-wrap flex-col-reverse md:flex-row" 
           key={activeImage.popup}
        >
          <div id="selector_div" className=" selector_div w-full my-2 md:w-12/12 md:pr-2  ">
            <div className="selectors overflow-hidden overflow-y-hidden h-full  whitespace-pre md:whitespace-normal ">
             {width >768 ? (
              <Slider {...setting} >
                  {
                  images?.map((i) => (
                    
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
                  ))
                  }
                 </Slider>

             ) :(
              <Slider {...mobileSetting} >
                  {
                  images?.map((i) => (
                    
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
                                     
                   
                  ))
                  }
                 </Slider>
             )
            }                     
              
              </div>
                    
          </div>
          <div className="w-full md:w-10/12">
            <a id="Zoom-1" className="MagicZoom" href={activeImage["popup"]}>
              <img src={activeImage["popup"]} alt="" className="rounded-lg " />
            </a>
          </div>
        </div>
      }
    </div>
  );
}

export default NewZoom;
