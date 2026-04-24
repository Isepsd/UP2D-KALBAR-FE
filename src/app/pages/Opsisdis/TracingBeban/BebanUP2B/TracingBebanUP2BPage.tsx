import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';
import qs from 'query-string';
import { exportingData } from '@app/store/reducers/app';
import { useDispatch } from 'react-redux';

/** COMPONENT */
import DynamicBebanAreaTableTracing from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTableTracing';
import Filter from '@app/modules/opsisdis/TracingBeban/Filter';

/** CONFIG */
import { BEBAN_UP2B_BULAN_COLUMN_JQWIDGET, BEBAN_UP2B_HARIAN_COLUMN_JQWIDGET, BEBAN_UP2B_PERJAM_COLUMN_JQWIDGET, BEBAN_UP2B_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-up2b.config';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { useSelector } from 'react-redux';
const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.up2b.jam, column: BEBAN_UP2B_PERJAM_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.up2b.harian, column: BEBAN_UP2B_HARIAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.up2b.bulanan, column:  BEBAN_UP2B_BULAN_COLUMN_JQWIDGET  (), primaryKey: 'id' },
  { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.up2b.tahunan, column: BEBAN_UP2B_TAHUN_COLUMN_JQWIDGET(), primaryKey: 'id' },
]


const customFilter = [{
  search: "__ref_lokasi_up2b",
  field: "id_ref_lokasi_up2b",
}]

export default function TracingBebanUP2BPage() {
  const queryParams = qs.parse(location.search);
  const dispatch = useDispatch();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
    dispatch(exportingData(null));
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
              <Filter
                tabActive={tabActive}
                isUP2B={true}
                isOperator={true}
                isSatuan={true}
                isNilai={true}
                isBebanPuncak={tabActive != 'beban_perjam'}
                configFilter={[]}
              />
            </Card.Body>
            {(Object.keys(queryParams).length > 0) && (

              <Card.Body>
                {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.up2b.jam} columnsConfig={BEBAN_UP2B_PERJAM_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban area" />
                }
                {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.up2b.harian} columnsConfig={BEBAN_UP2B_HARIAN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban area"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Hari")} />
                }
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.up2b.bulanan} columnsConfig={BEBAN_UP2B_BULAN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban area"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Bulan")}
                  />
                }
                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.up2b.tahunan} columnsConfig={BEBAN_UP2B_TAHUN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban area"
                    columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")}
                  />
                }
                {/* <DynamicBebanAreaTable
                  pathService={tabActiveConf.pathService}
                  columnsConfig={tabActiveConf.column}
                  primaryKey={tabActiveConf.primaryKey}
                  tabActive={tabActive}
                  label={'beban_up2b'}
                /> */}
              </Card.Body>
            )}

          </Card>
        </Col>
      </Row>
    </>
  )
}
