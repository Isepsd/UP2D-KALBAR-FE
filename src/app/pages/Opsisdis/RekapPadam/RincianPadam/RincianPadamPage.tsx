import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap';
// import qs from 'query-string';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import ModalData from '@app/components/Modals/ModalForm';
import { getAllByPath } from '@app/services/main.service';
import { GANGGUAN_REKAP_PADAM } from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
import { API_PATH } from '@app/services/_path.service';
import Filter from './Filter';

const tabOptions = [
  { label: 'Rekap Gangguan', value: 'rekap_gangguan' },
  { label: 'Rekap Informasi Sistem', value: 'rekap_informasi_sistem' },
];

export default function RincianPadamPage() {
  const source = axios.CancelToken.source();
  const [columns, setColumns] = useState<any>(GANGGUAN_REKAP_PADAM());
  // const queryParams = qs.parse(location.search);
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value']);
  const [textWA, setTextWA] = useState<any>('');
  const [modalCopyWA, setModalCopyWA] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Copy Whatapps`,
  });

  // console.log('queryParams', queryParams);

  const getDataWa = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const resp = await getAllByPath(API_PATH().opsisdis.rekap_padam.trans_ep, params, source.token);
      const { results }: any = resp
      // console.log("results", results);
      results;

    } catch (err: any) {
      const errValidation = err?.response?.data?.results;
      // console.log('err', errValidation);
      errValidation;
    }
  };

  const onFilter = () => {
    setModalCopyWA((prev: any) => ({ ...prev, show: true }));
    const rekap_gangguan = `
      *Rekap Gangguan Penyulang Pkl 00:00:00 sd 21:00:00*
      1. UP3 BARABAI / KANTOR UP3 BARABAI / GI BARIKIN / - / BRK03 / Dibuka Sejak Pkl 10:11:57 WITA / Normal Pkl 11:09:36 WITA / Durasi Optimal : 57.65 Menit / 0 MW / Pengujian Relay / 0.00 kWh
      2. UP3 BANJARMASIN / ULP BANJARBARU / GI BANDARA / - / BDR02 / Dibuka Sejak Pkl 12:14:48 WITA / Normal Pkl 13:25:00 WITA / Durasi Optimal : 70.20 Menit / 0 MW / Potong jumper DS Risepole / 0.00 kWh
      3. UP3 BANJARMASIN / ULP BANJARBARU / GI BANDARA / BDR02 / RCL GUNTUNG MANGGIS / Dibuka Sejak Pkl 11:15:23 WITA / Normal Pkl 12:01:00 WITA / Durasi Optimal : 45.62 Menit / .3 MW / Penyambungan kembali SP terkait gangguan / 228.08 kWh
      4. UP3 BANJARMASIN / ULP PELAIHARI / GI PELAIHARI / PLH08 / RCL KANDANGAN BARU / Dibuka Sejak Pkl 18:03:35 WITA / Normal Pkl 18:31:48 WITA / Durasi Optimal : 28.22 Menit / .62 MW / Perbaikan Jumperan Fco Gardu Putus / 291.57 kWh
      5. UP3 BANJARMASIN / ULP PELAIHARI / GI PELAIHARI / PLH08 / DAM03 / Dibuka Sejak Pkl 11:57:00 WITA / Normal Pkl 12:55:03 WITA / Durasi Optimal : 58.05 Menit / 1.15 MW / Perbaikan Travers miring dan penggantian isolator breakdown / 1112.63 kWh
      6. UP3 BARABAI / ULP TANJUNG / GI TANJUNG / TJG03 / SLG05 / Dibuka Sejak Pkl 00:34:30 WITA / Normal Pkl 00:52:00 WITA / Durasi Optimal : 17.50 Menit / .25 MW / Emergency Kebakaran di Desa Mangkusip / 72.92 kWh
    `;
    const rekap_informasi_sistem = `
    *Rekap Informasi Sistem 20 kV UIW KALSELTENG* 
 Laporan Hari Rabu,Tanggal07-09-2022
 Realisasi Hari Rabu,Tanggal07-09-2022
 Jam 00:00:00 sd 21:00:00 WITA


 A. Gangguan JTM 
 ~Penyulang GI Trip (Z1) : 6x 
UP3 : (ggn<5 | ggn>5 | ENS)
UP3 BANJARMASIN ( 1 | 0 | 10.67Kwh ) 
UP3 BARABAI ( 0 | 0 | 0Kwh ) 
UP3 KOTABARU ( 2 | 0 | 38.45Kwh ) 
UP3 KUALA KAPUAS ( 2 | 0 | 5.69Kwh ) 
UP3 PALANGKARAYA ( 1 | 0 | 5.83Kwh ) 


~Penyulang GH/RCL Trip (Z2) : 13x 
UP3 : (ggn<5 | ggn>5 | ENS)
UP3 BANJARMASIN ( 3 | 0 | 15.02 Kwh ) 
UP3 BARABAI ( 2 | 0 | 5.32 Kwh ) 
UP3 KOTABARU ( 4 | 0 | 5.58 Kwh ) 
UP3 KUALA KAPUAS ( 2 | 0 | 0.63 Kwh ) 
UP3 PALANGKARAYA ( 2 | 0 | 7.03 Kwh ) 


~Penyulang ARZ1 (GI) : 5x 
UP3, Ggn
UP3 BANJARMASIN : 1
UP3 BARABAI : 0
UP3 KOTABARU : 1
UP3 KUALA KAPUAS : 2
UP3 PALANGKARAYA : 1


~Penyulang ARZ2 (GI) : 13x 
UP3, Ggn
UP3 BANJARMASIN : 3
UP3 BARABAI : 2
UP3 KOTABARU : 4
UP3 KUALA KAPUAS : 2
UP3 PALANGKARAYA : 2


~Rekap Gangguan JTM : 19x 
Wil, Z1, Z2, ARZ1, ARZ2, Hari Tanpa Padam, ENS, ENS (Rp.)
UP3 BANJARMASIN : 1 | 3 | 1 | 3 | 0 | 25.69 Kwh | Rp. ----
UP3 BARABAI : 0 | 2 | 0 | 2 | 0 | 5.32 Kwh | Rp. ----
UP3 KOTABARU : 2 | 4 | 1 | 4 | 0 | 44.03 Kwh | Rp. ----
UP3 KUALA KAPUAS : 2 | 2 | 2 | 2 | 0 | 6.32 Kwh | Rp. ----
UP3 PALANGKARAYA : 1 | 2 | 1 | 2 | 0 | 12.86 Kwh | Rp. ----


~Rekap Kalselteng : 19x 
Wil, Z1, Z2, ARZ1, ARZ2, ENS, ENS (Rp.)
UIW KALSELTENG : 6 | 13 | 5 | 13 | 94.22 Kwh | Rp. -----`
    const params = {
      page: -1,
      limit: -1
    }

    if (tabActive === 'rekap_gangguan') {
      getDataWa(params)
      setTextWA(rekap_gangguan)
    } else {
      getDataWa(params)
      setTextWA(rekap_informasi_sistem)
    }
  };


  return (
    <>
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        module='REPORT PADAM PER PENYULANG'
        filterLayout='card'
      >
        <Filter onFilter={onFilter} />
      </TableDataListAction>
      <div className='mb-4'>
        <ModalData modalProps={modalCopyWA}>
          <div className='p-4'>
            <Tabs
              defaultActiveKey='1'
              activeKey={tabActive}
              onSelect={(k: any) => setTabActive(k)}
              className='mb-3 tab-sm'
            >
              {tabOptions.map((tab: any) => (
                <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
              ))}
            </Tabs>
            <Form.Control
              as='textarea'
              type='text'
              placeholder=''
              defaultValue={textWA}
              style={{ height: '280px' }}
            />
          </div>
        </ModalData>
      </div>
    </>
  );
}
