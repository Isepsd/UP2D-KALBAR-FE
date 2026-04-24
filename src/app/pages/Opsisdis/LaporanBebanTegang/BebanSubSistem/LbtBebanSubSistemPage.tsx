import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** HELPER */

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';
/** CONFIG */
import { BEBAN_SUBSISTEM_BULAN_COLUMN_JQWIDGET, BEBAN_SUBSISTEM_HARIAN_COLUMN_JQWIDGET, BEBAN_SUBSISTEM_PERJAM_COLUMN_JQWIDGET, BEBAN_SUBSISTEM_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-subsistem.config';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';
import ChartlaporanBeban from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBeban';

const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.subsistem.jam, column: BEBAN_SUBSISTEM_PERJAM_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.subsistem.harian, column: BEBAN_SUBSISTEM_HARIAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.subsistem.bulanan, column: BEBAN_SUBSISTEM_BULAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.subsistem.tahunan, column: BEBAN_SUBSISTEM_TAHUN_COLUMN_JQWIDGET(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__ref_lokasi_subsistem",
  field: "id_ref_lokasi_subsistem",
}]

export default function LbtBebanSubSistemPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );


  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  /** MAP DATA FROM API RESPONSE */

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
                <SubSistemFilter tabActive={tabActive} isSubSistem={true} configFilter={["id_ref_lokasi_subsistem"]} />
              </div>
              <hr />
              {activeFilters?.filters?.id_ref_lokasi_subsistem &&
                <ChartlaporanBeban
                  tabActive={tabActive}
                  path={tabActiveConf.pathService}
                  format={tabActiveConf.format}
                  page="laporan-beban-subsistem"
                />
              }
            </Card.Body>
            {activeFilters?.filters?.id_ref_lokasi_subsistem && (
              <Card.Body>
                {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.subsistem.jam}
                    columnsConfig={BEBAN_SUBSISTEM_PERJAM_COLUMN_JQWIDGET}
                    primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban subsistem"
                  />
                }
                {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.subsistem.harian}
                    columnsConfig={BEBAN_SUBSISTEM_HARIAN_COLUMN_JQWIDGET}
                    primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban subsistem"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Hari")}
                  />
                }
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.subsistem.bulanan}
                    columnsConfig={BEBAN_SUBSISTEM_BULAN_COLUMN_JQWIDGET}
                    primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban subsistem"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Bulan")} />
                }
                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.subsistem.tahunan}
                    columnsConfig={BEBAN_SUBSISTEM_TAHUN_COLUMN_JQWIDGET}
                    primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban subsistem"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")} />
                }
                {/* <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey}
                  configParams={customFilter} tabActive={tabActive}
                /> */}
              </Card.Body>
            )}
          </Card>
        </Col>

      </Row>
    </>
  )
}
