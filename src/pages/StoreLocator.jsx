import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Cookies from "js-cookie";
import { ImLocation } from "react-icons/im";
import { MdLocationOn } from "react-icons/md";

function StoreLocator() {

  const [key, setKey]= useState(0);

  const AnyReactComponent = () => (
    <div
      className="text-2xl text-red-500 "
    >
      <MdLocationOn />
    </div>
  );
  const [position, setPosition] = useState({
    lat: 0,
    lng: 0
  });


  const defaultProps = {
    center: {
      lat:
        window.location.host === "www.ishtari.com.gh" ||
        window.location.host === "next.ishtari.com.gh" ||
        window.location.host === "ishtari.com.gh" ||
        Cookies.get("site-local-name") === "ishtari-ghana"
          ? 7.8159465
          : 33.8547,
      lng:
        window.location.host === "www.ishtari.com.gh" ||
        window.location.host === "next.ishtari.com.gh" ||
        window.location.host === "ishtari.com.gh" ||
        Cookies.get("site-local-name") === "ishtari-ghana"
          ? -1.189375
          : 35.8623,
    },
    zoom: 8,
  };

  const getMapOptions = (maps) => {
    return {
      streetViewControl: false,
      scaleControl: true,
      fullscreenControl: false,
      styles: [
        {
          featureType: "road",
          elementType: "all",
          stylers: [
            {
              visibility: "on",
            },
          ],
        },
      ],
      gestureHandling: "cooperative",
      disableDoubleClickZoom: true,
      minZoom: 6,
      maxZoom: 16,
      mapDataProviders: "",
      mapTypeControl: true,
      mapTypeId: maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.RIGHT_BOTTOM,
        mapTypeIds: [],
      },
      zoomControl: false,
      clickableIcons: false,
    };
  };

 



  return (
    <div className={`my-4 h-full  w-full`}>
      <div className="relative overflow-hidden" style={{ height: "500px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyCK_SKtHBGWHuxNCmRDOCN6J6bWKe4DF8Y",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={(o) => getMapOptions(o)}
          // onClick={(e) => handlePosition(e.lat, e.lng)}
          onGoogleApiLoaded={({ map, maps }) => console.log("")}
          yesIWantToUseGoogleMapApiInternals
          // center={position.lat !== 0 && [position.lat, position.lng]}
          // onChange={(center, zoom, bounds, marginBounds) => {
       
          //   // handlePosition(position.lat, position.lng);
          //   setOnChange(!onChange)
            
          //   console.log(center);
          // }}
        >
          <AnyReactComponent key ={key} lat={33.8547} lng={35.8623} />
        </GoogleMapReact>
        <div
          className={`block p-1 bottom-0 right-0 mobile:absolute z-10 mobile:p-5`}
        >
    
        </div>

     

        <div
          className={`absolute bottom-0 
              right-0 p-1 mobile:left-0 mobile:p-5 
              `}
        >
      
        </div>
      </div>
    </div>
  );
}

export default StoreLocator;
