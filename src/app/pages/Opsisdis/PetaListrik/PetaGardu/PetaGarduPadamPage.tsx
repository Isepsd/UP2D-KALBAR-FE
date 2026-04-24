// import React, { useEffect, useState } from 'react'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
// import styled from 'styled-components'

// import StatisticPetaGarduPadam from '@app/modules/opsisdis/StatisticPetaGarduPadam'
// import CardSummaryMap from '@app/components/Card/CardSummaryMap'
import MapLocationLeaflet from '@app/components/Map/MapLocationLeaflet'
import DataPetaListrik from '@app/modules/opsisdis/PetaListrik/DataPetaListrik'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { getAllByPath } from '@app/services/main.service'
// import { API_PATH } from '@app/services/_path.service'
// import { get } from 'lodash'
import TopBarLoader from '@app/components/Loader/TopBarLoader'
// import MapLocationLeaflet from '@app/components/Map/MapLocationLeaflet'

// const Info = styled.div`
//   font-size: 1rem;
//   padding-left: 0.5rem;
// `

export default function PetaGarduPadamPage() {
  const navigate = useNavigate()
  // const source = axios.CancelToken.source();
  // const [loading, setLoading] = useState<boolean>();
  // const [data, setData] = useState<any>();

  // const getData = async () => {

  //   await new Promise((resolve) => setTimeout(resolve, 300));
  //   setLoading(true);

  //   try {
  //     // let filter = customParamsService(, activeFilters.filters);
  //     const params = {
  //       page: "-1",
  //       limit: "-1"
  //     };

  //     // console.log('pathe', path);
  //     // console.log('paramset', params);

  //     const req: any = await getAllByPath(get(API_PATH(), "opsisdis.peta_listrik_box"), params, source.token);
  //     const { results } = req;
  //     let data: any = []
  //     results?.map((d: any) => {
  //       data.push({ name: d.name, value: d?.jlh, sufixTitle: '', secondTitle: d?.name, classBgCard: d?.name == "GANGGUAN" ? 'bg-danger' : 'bg-fear' },)
  //     })

  //     setData(data);
  //     setLoading(false);
  //   } catch (err: any) {
  //     setData([]);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   getData()
  //   const interval = setInterval(() => {
  //     getData()
  //   }, 30000);
  //   return () => {
  //     clearInterval(interval)
  //     setData(null)
  //     source.cancel()
  //   };
  // }, [])

  return (

    <>
    <TopBarLoader/>
      {/* <TopBarLoader isLoading={loading} /> */}
      <Row className='m-0'>
        <Col md={1} className="d-flex align-items-center">
          <Button onClick={() => navigate(-1)} variant="primary">
            <i className="fas fa-angle-left"></i>
          </Button>
        </Col>
        <Col md={5}>
          <p className='mb-1'>Keterangan</p>
          <div className="d-flex mb-3">
            {/* {
              data?.map((item: any, index: number) => (
                <div className="align-items-center d-flex me-3" key={index}>
                  <img src={item?.name == "GANGGUAN" ? "/static/wo.png" : "/static/wo3.png"} height={32} alt={item?.name} />
                  <Info>{item?.name}</Info>
                </div>
              ))
            } */}

            {/* <div className="align-items-center d-flex ms-3">
              <img src="/static/wo3.png" height={32} alt="Gardu Padam Pekerjaan" />
              <Info>Gardu Padam Pekerjaan</Info>
            </div> */}
          </div>
        </Col>
        <Col md={6}>
          <Row>
            {/* {
              data?.map((item: any, index: number) => (
                <Col key={index} md={6} xs={12}>
                  <CardSummaryMap {...item} btnDetail={false} />
                </Col>
              ))
            } */}
          </Row>
        </Col>
      </Row>
      <Row className='m-0'>
        <Col md={12} style={{ height: 'calc(100vh - 195px)' }}>
          <MapLocationLeaflet>
            <DataPetaListrik />
          </MapLocationLeaflet>
        </Col>
      </Row>
    </>
  )
}
