import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { toNumber } from "lodash";
import { CustomInfoWindow } from "./CustomInfoWindow";

interface IMapLocation {
  items?: any[any]
  latitude?: number
  longitude?: number

}


const MapLocation = ({ items = [], latitude, longitude }: IMapLocation) => {

  const style = {
    width: "100%",
    height: "100%",
  };

  const [center, setCenter] = useState<any>({
    lat: toNumber(latitude ? latitude : process.env.LATITUDE),
    lng: toNumber(longitude ? longitude : process.env.LONGITUDE),
  })
  const [zoom, setZoom] = useState<number>(6)

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  };

  useEffect(() => {
    if (longitude && latitude) {
      setCenter((prevState: any) => ({
        ...prevState,
        lng: longitude,
        lat: latitude,
      }))
      setZoom(10)
    }
    // console.log("latitude", latitude);

  }, [longitude, latitude])
  // const onMapTypeIdChanged = (item: any) => {
  //   console.log("item", item);

  // }
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <div className="text-center h-100">
      <LoadScript googleMapsApiKey={`${process.env.API_GOOGLE}`}>
        <GoogleMap
          options={{ streetViewControl: false, mapTypeControl: false }}
          id="marker-example"
          mapContainerStyle={style}
          zoom={zoom}
          center={center}
          mapTypeId="TERRAIN"
          // onMapTypeIdChanged={(e: any) => onMapTypeIdChanged(e)}
          // extraMapTypes={["ROADMAP"]}
          
        >
          <MarkerClusterer options={options}>
            {(clusterer) =>
              items?.map((item: any, index: number) => (
                <Marker
                  key={index}
                  position={{
                    lat: toNumber(item?.latitude),
                    lng: toNumber(item?.longitude),
                  }}
                  clusterer={clusterer}

                  icon={{
                    // path: google.maps.SymbolPath.CIRCLE,
                    url: item?.icon || null,
                    fillColor: '#EB00FF',
                    scale: 1,
                    // size: { height: 50, width: 20 }
                  }}
                  onClick={() => handleActiveMarker(index)}
                >
                  {activeMarker === index ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <CustomInfoWindow data={item} />
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapLocation;
