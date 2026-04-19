import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap';

import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableData from '@app/modules/Table/TableData';
import Filter from '@app/modules/opsisdis/JawdalPemeliharaan/Filter';
import CardFilter from '@app/components/Filter/CardFilter';

import { API_PATH } from '@app/services/_path.service';
import { INPUT_JADWAL_DOKUEMNTASI_COLUMN, INPUT_JADWAL_GARDU_COLUMN, MONITORING_COLUMN } from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column';
import BadgeStatus from '@app/components/Status/BadgeStatus';
import { timeFormatAlt } from '@app/helper/time.helper';
import TableDetailJadwalPemeliharaan from '@app/modules/opsisdis/JawdalPemeliharaan/TableDetailJadwalPemeliharaan';
import { head } from 'lodash';

const tabOptions = [
  { label: 'Gardu', value: 'gardu', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.jadwal_pemeliharaan.gardu, column: INPUT_JADWAL_GARDU_COLUMN(), primaryKey: 'id_trans_jadwal_har_gardu', add: false },
  { label: 'Dokumentasi', value: 'dokumentasi', format: 'YYYY', pathService: API_PATH().opsisdis.jadwal_pemeliharaan.dok, column: INPUT_JADWAL_DOKUEMNTASI_COLUMN(), primaryKey: 'id_trans_jadwal_har_dok', add: false },
]


function MonitoringJadwal() {
  // const navigate = useNavigate()
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [action] = useState<string>();

  const [columns, setColumns] = useState<any>(MONITORING_COLUMN());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const [dataSelected, setDataSelected] = useState<any>(null)

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        id: item?.id_trans_jadwal_har,
        status_pekerjaan: item?.status_pekerjaan == "input-jadwal-pemeliharaan" ? 'DRAFT' : item?.status_pekerjaan,
        nomor: item?.nomor,
        gardu: item?.gardu?.nama_lokasi,
        penyulang: item?.penyulang?.nama_lokasi,
        gardu_induk: item?.gardu_induk?.nama_lokasi,
        up3: item?.up3?.nama_lokasi,
        jenis_pelayanan: item?.jenis_pelayanan,
        status: item?.status_pekerjaan,
        wilayah_padam: item?.wilayah_padam,
        pelaksana: item?.pelaksana?.nama,
        jtm: item?.jtm,
        keterangan: item?.keterangan,
        jenis_pekerjaan: item?.ref_jenis_pekerjaan?.name,
        pengawas: item?.pengawas?.fullname,
        user_entri: item?.user_entri?.fullname,
        wilayah: item?.wilayah,
        jam_pekerjaan: item?.jam_pekerjaan,
        jenis_jadwal: item?.jenis_jadwal,
        tgl_create: item?.tgl_entri,
        tgl_period: `${timeFormatAlt(item?.tgl)}`,
        // butuh_padam: (<Form.Check disabled checked></Form.Check>),
        // butuh_padam: (<input type='checkbox'),
        butuh_padam: (<BadgeStatus status={item?.butuh_padam} trueStatus={0} trueMsg='Tidak Padam' falseMsg='Padam'></BadgeStatus>),
      });
    });

    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  const handleSelectedRows = (item: any) => {
    if (item?.length > 0) {
      setDataSelected(item[0])

    }
  }


  return (
    <>
      <Row>
        <Col md={12} className='mb-4 mt-4 position-static'>
          <CardFilter>
            <Filter isStatusPek={true} isButuhPadam={true} isWilayah={true} />
          </CardFilter>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>
              Monitoring Jadwal Pemeliharaan
            </Card.Header>
            <Card.Body>
              <TableDataListAction
                add={false}
                columns={columns}
                setColumns={setColumns}
                module='Approve ren'
                spaceTop={0}
              />
              <div className='mb-4'>
                <TableData
                  columnsConfig={dataColumns}
                  respDataApi={handleRespDataApi}
                  rowData={dataRows}
                  path={API_PATH().opsisdis.jadwal_pemeliharaan.har}
                  primaryKey={'id_trans_jadwal_har'}
                  action={action}
                  filterParams={{ sort_by: "+tgl_update" }}
                  onCheckedRows={handleSelectedRows}
                  selected={dataSelected}
                  rowSelect={true}
                  rowSelectType={'radio'}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        {dataSelected &&
          <Col md={12} className='mb-4 position-static'>
            <Card className='card-widget position-static'>
              <Card.Body>
                <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 tab-sm">
                  {
                    tabOptions.map((tab: any) => (
                      <Tab
                        key={tab.value} eventKey={tab.value} title={tab.label} />
                    ))
                  }
                </Tabs>

              </Card.Body>

              <Card.Body>
                <TableDetailJadwalPemeliharaan pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={tabActiveConf.value} parent={dataSelected} add={false} />
              </Card.Body>

            </Card>
          </Col>
        }
      </Row>
    </>
  );
}

export default MonitoringJadwal;
