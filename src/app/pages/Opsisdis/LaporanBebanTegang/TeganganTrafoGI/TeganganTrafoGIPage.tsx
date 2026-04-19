import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** HELPER */

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';

/** CONFIG */

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import qs from 'query-string';
import { useSelector } from 'react-redux';
import ChartlaporanBeban from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBeban';
import { BEBAN_TEGANGAN_BULAN_COLUMN_JQWIDGET, BEBAN_TEGANGAN_PERJAM_COLUMN_JQWIDGET,BEBAN_TEGANGAN_HARIAN_COLUMN_JQWIDGET ,BEBAN_TEGANGAN_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-tegangan.config';
import { GROUP_TEGANGAN_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';

const tabOptions = [
  { label: 'Tegangan Per 5 Menit', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi_5.jam, column: BEBAN_TEGANGAN_PERJAM_COLUMN_JQWIDGET(), primaryKey: 'id' },
  {
    label: 'Tegangan Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi_5.harian, column: BEBAN_TEGANGAN_HARIAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Tegangan  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi_5.bulanan, column: BEBAN_TEGANGAN_BULAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Tegangan  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi_5.tahunan, column: BEBAN_TEGANGAN_TAHUN_COLUMN_JQWIDGET(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__ref_lokasi_gi",
  field: "id_gardu_induk",
}, {
  search: "__ref_lokasi_trafo_gi",
  field: "id_ref_lokasi_trafo_gi",
}]

export default function TeganganTrafoGIPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );


  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  // console.log("tabActiveConf.column", tabActiveConf.column);


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
                <SubSistemFilter tabActive={tabActive} isGarduInduk={true} isTrafoNonKTT={true} isJenisLayanan={true} configFilter={["id_ref_lokasi_gi", "id_ref_lokasi_trafo_gi"]} />
              </div>

              <hr />
              {activeFilters?.filters?.id_ref_lokasi_gi &&
                <div className="mt-3">
                  <ChartlaporanBeban page="opsis-tegangan-gi" tabActive={tabActive} path={tabActiveConf.pathService} format={tabActiveConf.format} />
                </div>
              }

            </Card.Body>
            {activeFilters?.filters?.id_ref_lokasi_gi &&
              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                  {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.jam}
                      columnsConfig={BEBAN_TEGANGAN_PERJAM_COLUMN_JQWIDGET}
                      primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban tegangan" />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.harian} columnsConfig={BEBAN_TEGANGAN_HARIAN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban tegangan"
                      columnsGroupConfig={GROUP_TEGANGAN_JQWidget()}
                    />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.bulanan} columnsConfig={BEBAN_TEGANGAN_BULAN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban tegangan"
                      columnsGroupConfig={GROUP_TEGANGAN_JQWidget()}
                    />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.tahunan} columnsConfig={BEBAN_TEGANGAN_TAHUN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban tegangan"
                      columnsGroupConfig={GROUP_TEGANGAN_JQWidget()}
                    />
                  }
                  {/* <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey}
                    configParams={customFilter} tabActive={tabActive}
                  /> */}
                </Card.Body>
              </>
            }
          </Card>

        </Col>
      </Row>
    </>
  )
}
