import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** HELPER */

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';

/** CONFIG */
import { BEBAN_UP3_BULAN_COLUMN_JQWIDGET, BEBAN_UP3_HARIAN_COLUMN_JQWIDGET, BEBAN_UP3_PERJAM_COLUMN_JQWIDGET, BEBAN_UP3_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-up3.config';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';
import ChartlaporanBeban from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBeban';


const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.up3.jam, column: BEBAN_UP3_PERJAM_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.up3.harian, column: BEBAN_UP3_HARIAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.up3.bulanan, column: BEBAN_UP3_BULAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.up3.tahunan, column: BEBAN_UP3_TAHUN_COLUMN_JQWIDGET(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__ref_lokasi_up3",
  field: "id_ref_lokasi_up3",
}]

export default function LBTBebanAreaPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );


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
                <SubSistemFilter tabActive={tabActive} isArea={true} configFilter={["id_ref_lokasi_up3"]} />
              </div>
              <hr />

              {activeFilters?.filters?.id_ref_lokasi_up3 &&
                <ChartlaporanBeban
                  tabActive={tabActive}
                  path={tabActiveConf.pathService}
                  format={tabActiveConf.format}
                  page="laporan-beban-up3"
                />
              }
            </Card.Body>
            {activeFilters?.filters?.id_ref_lokasi_up3 && (
              <Card.Body>
                {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.up3.jam} columnsConfig={BEBAN_UP3_PERJAM_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban area" />
                }
                {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.up3.harian} columnsConfig={BEBAN_UP3_HARIAN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban area"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Hari")} />
                }
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.up3.bulanan} columnsConfig={BEBAN_UP3_BULAN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban area"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Bulan")}
                  />
                }
                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.up3.tahunan} columnsConfig={BEBAN_UP3_TAHUN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban area"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")}
                  />
                }
                {/* <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} configParams={customFilter}  tabActive={tabActive}/> */}
              </Card.Body>
            )}

          </Card>
        </Col>
      </Row>
    </>
  )
}
