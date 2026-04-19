import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';
import qs from 'query-string';

/** COMPONENT */
import DynamicBebanAreaTableTracing from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTableTracing';
import Filter from '@app/modules/opsisdis/TracingBeban/Filter';

/** CONFIG */
import { BEBAN_PENYULANG_BULAN_COLUMN_JQWIDGET, BEBAN_PENYULANG_HARIAN_COLUMN_JQWIDGET, BEBAN_PENYULANG_PERJAM_COLUMN_JQWIDGET, BEBAN_PENYULANG_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-penyulang.config';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { exportingData } from '@app/store/reducers/app';
import { useDispatch } from 'react-redux';

// import FilterPessrJam from '@app/modules/opsisdis/TracingBeban/FilterPerJam';
// import { useSelector } from 'react-redux';
// import TableDataPagination from '@app/modules/Table/TableDataPagination';
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

export default function TracingBebanPenyulangPage() {
  const queryParams = qs.parse(location.search);
  const dispatch = useDispatch();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<any>(true)
  const [opiotnsGarduInduk, setOpiotnsGarduInduk] = useState<any>();
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );

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

    dispatch(exportingData(null));

  }, [tabActive])

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      {/* <CardFilter>
        <Filter
          tabActive={tabActive}
          isGarduInduk={true}
          isOperator={true}
          isSatuan={true}
          isNilai={true}
          isBebanPuncak={tabActive != 'beban_perjam'}
          configFilter={[]}
        />
      </CardFilter> */}
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
                  {/* {tabActive == 'beban_perjam' && <FilterPerJam
                  tabActive={'beban_perjam'}
                  isGarduInduk={true}
                  isOperator={true}
                  isSatuan={true}
                  isPenyulang={true}
                  isNilai={true}
                  isBebanPuncak={tabActive != 'beban_perjam'}
                  configFilter={[]} />}
                {tabActive != 'beban_perjam' && */}
                  <Filter
                    tabActive={tabActive}
                    isGarduInduk={true}
                    isOperator={true}
                    isSatuan={true}
                    isPenyulang={true}
                    isNilai={true}
                    isBebanPuncak={tabActive != 'beban_perjam'}
                    page="tracing-beban-penyulang"
                    configFilter={[]}
                    optionsGarduInduk={opiotnsGarduInduk}
                  />
                  {/* } */}


                </div>
                <hr />
              </Card.Body>
              {(Object.keys(queryParams).length > 0) && (
                <Card.Body>
                  {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.penyulang.jam} columnsConfig={BEBAN_PENYULANG_PERJAM_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban penyulang" />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.penyulang.harian} columnsConfig={BEBAN_PENYULANG_HARIAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban penyulang" columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Hari")} />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.penyulang.bulanan} columnsConfig={BEBAN_PENYULANG_BULAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban penyulang"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Bulan")}
                    />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTableTracing pathService={API_PATH().opsisdis.laporan_beban.penyulang.tahunan} columnsConfig={BEBAN_PENYULANG_TAHUN_COLUMN_JQWIDGET} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban penyulang"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")} />
                  }
                  {/* <DynamicBebanAreaTableTracingTracing
                    pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column}
                    primaryKey={tabActiveConf.primaryKey}
                    tabActive={tabActive}
                    label={'beban_penyulang'}

                  /> */}
                </Card.Body>
              )}

            </Card>
          </Col>
        </Row>
      }
    </>
  )
}
