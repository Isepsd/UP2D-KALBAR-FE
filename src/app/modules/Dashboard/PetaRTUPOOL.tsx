import { toNumber } from "lodash";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { DivIcon } from 'leaflet';
import { InfoWindowPetaRTU } from "./InfoWindowPetaRTU";
interface IPetaRTUPOOL {
  data?: any
}
export default function PetaRTUPOOL({ data }: IPetaRTUPOOL) {
  const customMarkerIconCircle = new DivIcon({
    html: renderToStaticMarkup(<i className=" fa fa-location-dot" />),
    className: "leaflet-icon-marker-circle"
  });

  return (
    <>
      {data?.map((item: any, index: number) => (
        <React.Fragment key={index}>
          {/* {item?.jenis_laporan === "PEMELIHARAAN" ? */}

          <Marker
            position={{
              lat: toNumber(item?.latitude),
              lng: toNumber(item?.longitude),
            }}
            icon={customMarkerIconCircle}
            key={index}
          >
            <Popup>
              <InfoWindowPetaRTU data={item} />
            </Popup>
          </Marker>
          {/* : null} */}
        </React.Fragment>

      ))
      }
    </>
  )
}