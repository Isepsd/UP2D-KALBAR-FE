import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import CardSummary from '@app/components/Card/CardSummary';
import CardSummaryBottom from '@app/components/Card/CardSummaryBottom';
import axios from 'axios';
import { getAllByPath } from '@app/services/main.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { API_PATH } from '@app/services/_path.service';
import { dateTimeFormat } from '@app/helper/time.helper';

function commify(n: any) {
  let parts = n.toString().split(".");
  const numberPart = parts[0];
  const decimalPart = parts[1];
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return numberPart.replace(thousands, ".") + (decimalPart ? "," + decimalPart : "");
}

function BebanStaticUID() {
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>();
  const [data, setData] = useState<any>([
    {
      id: 'total',
      value: 0,
      sufixTitle: 'MW',
      classBgCard: 'bg-info',
      labelFooter: 'Beban Tertinggi Hari ini',
      secondTitle: "2020-10-10 10:10:10",
      btnDetail: false,
      bebanmax: [
        {
          beban_max_siang: 0,
          sufixTitle: 'MW',
          classBgCard: 'bg-warning',
          secondTitle: "17-11-2022 10:00:00 ",
          labelFooter: "Beban Max Siang",
          labelFooter2: "Hari ini",
          btnDetail: false,
        },
        {
          beban_max_malam: 0,
          sufixTitle: 'MW',
          classBgCard: 'bg-warning',
          secondTitle: "17-11-2022 10:00:00 ",
          labelFooter: "Beban Max Malam",
          labelFooter2: "Hari ini",
          btnDetail: false,
        }

      ]
    },
    {
      id: 'belumdisetujui',
      value: 0,
      sufixTitle: 'MW',
      classBgCard: 'bg-info',
      labelFooter: 'Beban Tertinggi Bulan ini',
      secondTitle: "2020-10-10 10:10:10",
      btnDetail: false,
      bebanmax: [
        {
          beban_max_siang: 0,
          sufixTitle: 'MW',
          classBgCard: 'bg-warning',
          secondTitle: "17-11-2022 10:00:00 ",
          labelFooter: "Beban Max Siang",
          labelFooter2: "Bulan ini",
          btnDetail: false,
        },
        {
          beban_max_malam: 0,
          sufixTitle: 'MW',
          classBgCard: 'bg-warning',
          secondTitle: "17-11-2022 10:00:00 ",
          labelFooter: "Beban Max Malam",
          labelFooter2: "Bulan ini",
          btnDetail: false,
        }
      ]
    },
    {
      id: 'disetujui',
      value: 0,
      sufixTitle: 'MW',
      classBgCard: 'bg-info',
      labelFooter: 'Beban Tertinggi Tahun ini',
      secondTitle: "2020-10-10 10:10:10",
      btnDetail: false,
      bebanmax: [

        {
          beban_max_siang: 0,
          sufixTitle: 'MW',
          classBgCard: 'bg-warning',
          secondTitle: "17-11-2022 10:00:00 ",
          labelFooter: "Beban Max Siang",
          labelFooter2: "Tahun ini",
          btnDetail: false,
        },
        {
          beban_max_malam: 0,
          sufixTitle: 'MW',
          classBgCard: 'bg-warning',
          secondTitle: "17-11-2022 10:00:00 ",
          labelFooter: "Beban Max Malam",
          labelFooter2: "Tahun ini",
          btnDetail: false,
        }
      ]
    },
    {
      id: 'close',
      value: 0,
      sufixTitle: 'MW',
      classBgCard: 'bg-info',
      labelFooter: 'Beban Tertinggi Pernah Tercapai',
      secondTitle: "2020-10-10 10:10:10",
      btnDetail: false,
      bebanmax: [
        {
          beban_max_siang: 0,
          sufixTitle: 'MW',
          classBgCard: 'bg-warning',
          secondTitle: "17-11-2022 10:00:00 ",
          labelFooter: "Beban Max Siang",
          labelFooter2: "Pernah Tercapai",
          btnDetail: false,
        },
        {
          beban_max_malam: 0,
          sufixTitle: 'MW',
          classBgCard: 'bg-warning',
          secondTitle: "17-11-2022 10:00:00 ",
          labelFooter: "Beban Max Malam",
          labelFooter2: "Pernah Tercapai",
          btnDetail: false,
        }
      ]
    },
  ])


  /** GET DATA  */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const req: any = await getAllByPath(API_PATH().dashboard_jabar.beban_box, {}, source.token
      );

      const { results } = req;
      let newData = data

      // console.log("data[0].bebanmax.beban_max")
      // console.log(results?.beban_hari_ini[0][0]?.beban_max)

      newData[0].value = results?.beban_hari_ini?.length > 0 ? commify(results?.beban_hari_ini[0][0]?.beban) : 0
      newData[0].secondTitle = results?.beban_hari_ini?.length > 0 ? dateTimeFormat(results?.beban_hari_ini[0][0]?.tanggal, "DD-MM-YYYY HH:mm:ss") : "-"
      newData[0].labelFooter = results?.beban_hari_ini?.length > 0 ? results?.beban_hari_ini[0][0]?.label : "-"
      let siang = results?.beban_hari_ini[0][0]?.beban_max[0][0];
      let malam = results?.beban_hari_ini[0][0]?.beban_max[1][0];
      let rs = [siang, malam]

      newData[0].bebanmax = rs


      newData[1].value = results?.beban_bulan_ini?.length > 0 ? commify(results?.beban_bulan_ini[0][0]?.beban) : 0
      newData[1].secondTitle = results?.beban_bulan_ini?.length > 0 ? dateTimeFormat(results?.beban_bulan_ini[0][0]?.tanggal, "DD-MM-YYYY HH:mm:ss") : "-"
      newData[1].labelFooter = results?.beban_bulan_ini?.length > 0 ? results?.beban_bulan_ini[0][0]?.label : "-"

      let siang1 = results?.beban_bulan_ini[0][0]?.beban_max[0][0];
      let malam1 = results?.beban_bulan_ini[0][0]?.beban_max[1][0];
      let rs1 = [siang1, malam1]

      newData[1].bebanmax = rs1
      // newData[1].bebanmax = data[0][0].bebanmax

      newData[2].value = results?.beban_tahun_ini?.length > 0 ? commify(results?.beban_tahun_ini[0][0]?.beban) : 0
      newData[2].secondTitle = results?.beban_tahun_ini?.length > 0 ? dateTimeFormat(results?.beban_tahun_ini[0][0]?.tanggal, "DD-MM-YYYY HH:mm:ss") : "-"
      newData[2].labelFooter = results?.beban_tahun_ini?.length > 0 ? results?.beban_tahun_ini[0][0]?.label : "-"

      let siang2 = results?.beban_tahun_ini[0][0]?.beban_max[0][0];
      let malam2 = results?.beban_tahun_ini[0][0]?.beban_max[1][0];
      let rs2 = [siang2, malam2]

      newData[2].bebanmax = rs2

      newData[3].value = results?.beban_tertinggi?.length > 0 ? commify(results?.beban_tertinggi[0][0]?.beban) : 0
      newData[3].secondTitle = results?.beban_tertinggi?.length > 0 ? dateTimeFormat(results?.beban_tertinggi[0][0]?.tanggal, "DD-MM-YYYY HH:mm:ss") : "-"
      newData[3].labelFooter = results?.beban_tertinggi?.length > 0 ? results?.beban_tertinggi[0][0]?.label
        : "-"

      let siang3 = results?.beban_tertinggi[0][0]?.beban_max[0][0];
      let malam3 = results?.beban_tertinggi[0][0]?.beban_max[1][0];
      let rs3 = [siang3, malam3]

      newData[3].bebanmax = rs3

      setData([...newData])

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };


  useEffect(() => {
    getAllData()

    return () => {
      source.cancel()
      setData([])
    }
  }, [])


  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row>
        {data.map((item: any, index: number) => (

          <Col key={index} md={3} xs={12} className='mb-4 mb-md-0 px-1'>
            <CardSummary {...item} />
            <Col key={index} md={12} xs={12} className='mb-4 mb-md-0 px-1'>
              <CardSummaryBottom {...item.bebanmax} />
            </Col>
          </Col>
        ))}




      </Row>
    </>
  );
}

export default BebanStaticUID;
