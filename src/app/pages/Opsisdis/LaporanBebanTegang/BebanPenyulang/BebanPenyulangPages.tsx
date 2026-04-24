import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';

/** CONFIG */
import {
  LAPORAN_BEBAN_PENYULANG_JAM, 
} from '@app/configs/react-table/opsisdis/laporan-beban.column.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ChartlaporanBeban from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBeban';
import { useSelector } from 'react-redux';

const customFilter = [{
  search: "__ref_lokasi_gi",
  field: "id_gardu_induk",
}, {
  search: "__ref_lokasi_penyulang",
  field: "id_ref_lokasi_penyulang",
}]

export default function BebanPenyulangPages() {
  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );

  return (
    <>
      <SubSistemFilter tabActive="beban_perjam" isGarduInduk={true} isPenyulang={true} configFilter={["id_ref_lokasi_gi", "id_ref_lokasi_penyulang"]} />
      <Row>
        <Col md={12} className='mb-4 mt-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Body>
              {activeFilters.filters?.id_ref_lokasi_gi && activeFilters?.filters?.id_ref_lokasi_penyulang && (
                <>
                  <ChartlaporanBeban
                    tabActive={'beban_perjam'}
                    path={API_PATH().opsisdis.laporan_beban.penyulang.jam}
                    format={'DD/MM/YYYY HH:mm'}
                  />

                </>
              )}
            </Card.Body>
            {activeFilters.filters?.id_ref_lokasi_gi && activeFilters?.filters?.id_ref_lokasi_penyulang && (
              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.jam} columnsConfig={LAPORAN_BEBAN_PENYULANG_JAM()} primaryKey="id" configParams={customFilter} tabActive={'beban_perjam'} />
                </Card.Body>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}
