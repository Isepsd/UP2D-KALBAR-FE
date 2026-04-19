import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { CONFIG_BOX_BULANAN_SCADA } from "@app/configs/kinerja-scada.config";
import { getAllByPath } from "@app/services/main.service";
import { API_PATH } from "@app/services/_path.service";
import { get } from "lodash";
import axios from "axios";
import CardInfo from "@app/components/Card/CardInfo";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
export default function PeralatanScada() {

  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<any>()
  const source = axios.CancelToken.source();
  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {

      const req: any = await getAllByPath(get(API_PATH(), "fasop.laporan_scada.gangguan_peralatan_scada_box"), {}, source.token);
      const { results } = req;
      // console.log("results", results);
      let datas = results?.map((item: any) => {
        let result: any = CONFIG_BOX_BULANAN_SCADA?.filter((obj: any) => {
          return obj.label === item?.name;
        });
        // console.log("result", result);

        item.variant = result[0]?.variant ? result[0]?.variant : "primary"
        return item;
      })
      // console.log("datas", datas);

      setData(datas)
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData()
    const interval = setInterval(() => getAllData(), 60000);
    return (() => {
      source.cancel()
      clearInterval(interval)
      setData(null)
    })
  }, [])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row className="gx-2">
        {data?.map((item: any, index: number) =>
          <Col key={index} className="mb-2">
            <CardInfo
              variant={item?.variant}
              value={item?.jlh}
              // suffix={suffix || ''}
              label={item?.name}
            />
          </Col>
        )}
      </Row>

    </>

  )
}