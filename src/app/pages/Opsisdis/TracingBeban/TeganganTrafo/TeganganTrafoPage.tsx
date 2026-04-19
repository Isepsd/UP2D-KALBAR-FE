import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';
import { exportingData } from '@app/store/reducers/app';
import { useDispatch } from 'react-redux';

/** HELPER */

/** COMPONENT */
import DynamicBebanAreaTableTracing from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTableTracing';
import Filter from '@app/modules/opsisdis/TracingBeban/Filter';

/** CONFIG */
import { BEBAN_TEGANGAN_BULAN_COLUMN_JQWIDGET, BEBAN_TEGANGAN_PERJAM_COLUMN_JQWIDGET,BEBAN_TEGANGAN_HARIAN_COLUMN_JQWIDGET ,BEBAN_TEGANGAN_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-tegangan.config';
import { GROUP_TEGANGAN_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import qs from 'query-string';
import { getAllByPath } from '@app/services/main.service';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';

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


export default function TeganganTrafoPage() {
  const dispatch = useDispatch();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
    dispatch(exportingData(null));
  }, [tabActive])

  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<any>(true)
  const [opiotnsGarduInduk, setOpiotnsGarduInduk] = useState<any>();

  /** GET DATA gardu induk */
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
          label: item?.nama_lokasi,
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
    getAllData()
  }, [])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {opiotnsGarduInduk &&
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
                    isGarduInduk={true}
                    isTrafo={true}
                    tabActive={tabActive}
                    isTreshold={tabActive != 'beban_perjam'}
                    configFilter={[]}
                    optionsGarduInduk={opiotnsGarduInduk}
                  />
                </div>


              </Card.Body>

              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                  {/* <DynamicBebanAreaTableTracingTracing pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey}
                      configParams={customFilter} tabActive={tabActive}
                    /> */}
                   {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.jam}
                      columnsConfig={BEBAN_TEGANGAN_PERJAM_COLUMN_JQWIDGET}
                      primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban tegangan" />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.harian} columnsConfig={BEBAN_TEGANGAN_HARIAN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban tegangan"
                      columnsGroupConfig={GROUP_TEGANGAN_JQWidget()}
                    />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.bulanan} columnsConfig={BEBAN_TEGANGAN_BULAN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban tegangan"
                      columnsGroupConfig={GROUP_TEGANGAN_JQWidget()}
                    />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.tahunan} columnsConfig={BEBAN_TEGANGAN_TAHUN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban tegangan"
                      columnsGroupConfig={GROUP_TEGANGAN_JQWidget()}
                    />
                  }
                </Card.Body>
              </>
            </Card>

          </Col>
        </Row>
      }
    </>
  )
}
