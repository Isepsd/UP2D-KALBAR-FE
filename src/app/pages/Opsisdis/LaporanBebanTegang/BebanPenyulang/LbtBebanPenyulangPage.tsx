import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';

/** CONFIG */
import { AMR_GROUP_JQWIDGET,AMR_GROUP_BULAN_JQWIDGET,AMR_GROUP_TAHUN_JQWIDGET,BEBAN_PENYULANG_BULAN_COLUMN_JQWIDGET, BEBAN_PENYULANG_HARIAN_COLUMN_JQWIDGET, BEBAN_PENYULANG_PERJAM_COLUMN_JQWIDGET, BEBAN_PENYULANG_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-penyulang.config';
// import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ChartlaporanBeban from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBeban';
import qs from 'query-string';

const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.penyulang.jam, column: BEBAN_PENYULANG_PERJAM_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.penyulang.harian, column: BEBAN_PENYULANG_HARIAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.penyulang.bulanan, column: BEBAN_PENYULANG_BULAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.penyulang.tahunan, column: BEBAN_PENYULANG_TAHUN_COLUMN_JQWIDGET(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__ref_lokasi_gi",
  field: "id_gardu_induk",
}, {
  search: "__ref_lokasi_penyulang",
  field: "id_ref_lokasi_penyulang",
}]

export default function LbtBebanPenyulangPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const queryParams = qs.parse(location.search);

  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 mt-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Body>
              <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 tab-sm">
                {
                  tabOptions.map((tab: any) => (
                    <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
                  ))
                }
              </Tabs>
              <div className='px-2 mt-2'>
                <SubSistemFilter tabActive={tabActive} isGarduInduk={true} isPenyulang={true} configFilter={["id_ref_lokasi_gi", "id_ref_lokasi_penyulang"]} />
              </div>
              <hr />
              {(Object.keys(queryParams).length > 0) && (
                <>
                  {/* {tabActive == "beban_perjam" &&
                    <ChartlaporanBeban
                      tabActive={'beban_perjam'}
                      path={API_PATH().opsisdis.laporan_beban.penyulang.jam}
                      format={'DD/MM/YYYY HH:mm'}
                    />

                  }

                  {tabActive == "beban_harian" &&
                    <ChartlaporanBeban
                      tabActive={'beban_harian'}
                      path={API_PATH().opsisdis.laporan_beban.penyulang.harian}
                      format={'DD/MM/YYYY'}
                    />

                  }
                  {tabActive == "puncak_bulanan" &&
                    <ChartlaporanBeban
                      tabActive={'puncak_bulanan'}
                      path={API_PATH().opsisdis.laporan_beban.penyulang.bulanan}
                      format={'MM/YYYY'}
                    />

                  }
                  {tabActive == "puncak_tahunan" &&
                    <ChartlaporanBeban
                      tabActive={'puncak_tahunan'}
                      path={API_PATH().opsisdis.laporan_beban.penyulang.tahunan}
                      format={'YYYY'}
                    />

                  } */}
                  <ChartlaporanBeban tabActive={tabActive} path={tabActiveConf.pathService} format={tabActiveConf.format} page="laporan-beban-penyulang" />
                </>
              )}
            </Card.Body>
            {(Object.keys(queryParams).length > 0) && (
              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                  {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.jam} columnsConfig={BEBAN_PENYULANG_PERJAM_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban penyulang" />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.harian} columnsConfig={BEBAN_PENYULANG_HARIAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban penyulang" 
                    columnsGroupConfig={AMR_GROUP_JQWIDGET()} />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.bulanan} columnsConfig={BEBAN_PENYULANG_BULAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban penyulang"
                      columnsGroupConfig={AMR_GROUP_BULAN_JQWIDGET()}
                    />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.tahunan} columnsConfig={BEBAN_PENYULANG_TAHUN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban penyulang"
                      columnsGroupConfig={AMR_GROUP_TAHUN_JQWIDGET()} />
                  }

                  {/* <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={tabActive}
                  /> */}
                </Card.Body>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}
