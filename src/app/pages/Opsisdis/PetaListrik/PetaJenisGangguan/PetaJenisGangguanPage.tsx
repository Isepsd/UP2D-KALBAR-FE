import React from 'react'
import { Col, Row } from 'react-bootstrap'

import MapLocation from '@app/components/Map/MapLocation'
import FilterPetaJenisGangguan from '@app/modules/opsisdis/FilterPetaJenisGangguan'


export default function PetaJenisGangguanPage() {
  return (
    <>

      <Row className='m-0'>

        <Col md={8} style={{ height: 'calc(100vh - 140px)' }}>
          <MapLocation items={[]} />
        </Col>
        <Col md={4}>
          <FilterPetaJenisGangguan />
          <h6 className='mt-3'>LEGENDA PETA</h6>
          <div className='text-uppercase'>
            <span className="pelita-red mr-2"><i className="fa fa-solid fa-record-vinyl"></i></span>
            I1 Komponen JTM : 3 Titik
          </div>
          <div className='text-uppercase'>
            <span className="pelita-red mr-2"><i className="fa fa-solid fa-record-vinyl"></i></span>
            I1 Komponen JTM : 3 Titik
          </div>
          <div className='text-uppercase'>
            <span className="pelita-red mr-2"><i className="fa fa-solid fa-record-vinyl"></i></span>
            I1 Komponen JTM : 3 Titik
          </div>
          <div className='text-uppercase'>
            <span className="pelita-red mr-2"><i className="fa fa-solid fa-record-vinyl"></i></span>
            I1 Komponen JTM : 3 Titik
          </div>
          <div className='text-uppercase'>
            <span className="pelita-red mr-2"><i className="fa fa-solid fa-record-vinyl"></i></span>
            I1 Komponen JTM : 3 Titik
          </div>
          <div className='text-uppercase'>
            <span className="pelita-red mr-2"><i className="fa fa-solid fa-record-vinyl"></i></span>
            I1 Komponen JTM : 3 Titik
          </div>
          <div className='text-uppercase'>
            <span className="pelita-red mr-2"><i className="fa fa-solid fa-record-vinyl"></i></span>
            I1 Komponen JTM : 3 Titik
          </div>
        </Col>
      </Row>
    </>
  )
}
