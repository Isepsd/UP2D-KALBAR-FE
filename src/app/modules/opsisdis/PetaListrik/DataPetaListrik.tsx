import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import axios from "axios";
import { get, toNumber } from "lodash";
import React, { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { DivIcon } from 'leaflet';
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { renderToStaticMarkup } from "react-dom/server";
import { InfoWindowPetaListrik } from "./InfoWindowPetaListrik";

export default function DataPetaListrik() {
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<any>();

  const getDataPadam = async () => {

    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(true);

    try {
      // let filter = customParamsService(, activeFilters.filters);
      const params = {
        page: "-1",
        limit: "-1"
      };

      // console.log('pathe', path);
      // console.log('paramset', params);

      const req: any = await getAllByPath(get(API_PATH(), "opsisdis.peta_listrik"), params, source.token);
      const { results } = req;
      const dataLength = results ? results.length : 0;
      let data: any = []
      if (dataLength > 0) {
        results?.map((d: any) => {
          if (d?.lon && d?.lat) {
            data.push({
              ...d,
              icon: d?.status === "Nyala" ? "/static/wo3-20.png" : "/static/wo-20.png",
              latitude: d?.lat,
              longitude: d?.lon
            })
          }
        });
        // console.log("data", data);

        setData(data);


      } else {
        setData([]);

      }
      setLoading(false);
    } catch (err: any) {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataPadam()
    const interval = setInterval(() => {
      getDataPadam()
    }, 30000);
    return () => {
      clearInterval(interval)
      setData(null)
      source.cancel()
    };
  }, [])

  const customMarkerIconCircle = new DivIcon({
    html: renderToStaticMarkup(<i className=" fa fa-circle" />),
    className: "leaflet-icon-marker-circle"
  });
  const customMarkerIconCirclePemeliharaan = new DivIcon({
    html: renderToStaticMarkup(<i className=" fa fa-circle" />),
    className: "leaflet-icon-marker-circle-pemeliharaan"
  });
  // const customMarkerIconSquare = new DivIcon({
  //   html: renderToStaticMarkup(<i className=" fa fa-circle" />),
  //   className: "leaflet-icon-marker-square"
  // });
  // const customMarkerCaret = new DivIcon({
  //   html: renderToStaticMarkup(<i className="fas fa-caret-up"></i>),
  //   className: "leaflet-icon-marker-caret"
  // });

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {data?.map((item: any, index: number) => (
        <React.Fragment key={index}>
          {/* {item?.jenis_laporan === "PEMELIHARAAN" ? */}

          <Marker
            position={{
              lat: toNumber(item?.latitude),
              lng: toNumber(item?.longitude),
            }}
            // icon={data?.status == "Nyala" ? iconNyala : iconPadam}
            icon={item?.jenis_laporan === "GANGGUAN" ? customMarkerIconCircle : customMarkerIconCirclePemeliharaan}
            key={index}
          >
            <Popup>
              <InfoWindowPetaListrik data={item} />
            </Popup>
          </Marker>
          {/* : null} */}
        </React.Fragment>

      ))
      }
    </>
  )
}