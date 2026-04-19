import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import Filter from '@app/modules/opsisdis/TracingBeban/Filter';

/** CONFIG */import { BEBAN_KEYPOINT_PERJAM_COLUMN_JQWIDGET, BEBAN_KEYPOINT_HARIAN_COLUMN_JQWIDGET, BEBAN_KEYPOINT_BULAN_COLUMN_JQWIDGET, BEBAN_KEYPOINT_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-keypoint.config';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import qs from 'query-string';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.keypoint.jam, column: BEBAN_KEYPOINT_PERJAM_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.keypoint.harian, column: BEBAN_KEYPOINT_HARIAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.keypoint.bulanan, column: BEBAN_KEYPOINT_BULAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.keypoint.tahunan, column: BEBAN_KEYPOINT_TAHUN_COLUMN_JQWIDGET(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__ref_lokasi_gi",
  field: "id_gardu_induk",
}, {
  search: "__ref_lokasi_keypoint",
  field: "id_ref_lokasi_keypoint",
}]

export default function LbtBebanPenyulangPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const queryParams = qs.parse(location.search);
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<any>(true)
  const [opiotnsGarduInduk, setOpiotnsGarduInduk] = useState<any>();
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );

  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        sort_by: "nama_lokasi",
        id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk
      };


      const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.kode_lokasi,
          value: item?.id_ref_lokasi
        })
      })
      setLoading(false)
      setOpiotnsGarduInduk(unit)
    } catch (err: any) {
      setLoading(false)
      setOpiotnsGarduInduk(null)
    }
  };

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  useEffect(() => {
    getAllData()
  }, [])
  return (
    <>
      <TopBarLoader isLoading={loading} />
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
              <Filter
                    tabActive={tabActive}
                    isGarduInduk={true}
                    isOperator={true}
                    isSatuan={true}
                    isKP={true}
                    isNilai={true}
                    isBebanPuncak={tabActive != 'beban_perjam'}
                    page="tracing-beban-kp"
                    configFilter={["id_ref_lokasi_gi", "id_ref_lokasi_keypoint"]} 
                    optionsGarduInduk={opiotnsGarduInduk}
                  /></div>
              <hr />
              
            </Card.Body>
            {(Object.keys(queryParams).length > 0) && (
              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                  {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.keypoint.jam} columnsConfig={BEBAN_KEYPOINT_PERJAM_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban penyulang" />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.keypoint.harian} columnsConfig={BEBAN_KEYPOINT_HARIAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban penyulang" columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Hari")} />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.keypoint.bulanan} columnsConfig={BEBAN_KEYPOINT_BULAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban penyulang"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Bulan")}
                    />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.keypoint.tahunan} columnsConfig={BEBAN_KEYPOINT_TAHUN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban penyulang"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")} />
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
