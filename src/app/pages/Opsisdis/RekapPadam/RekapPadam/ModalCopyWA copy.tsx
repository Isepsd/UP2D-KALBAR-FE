import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

const DATE_FORMAT = 'YYYY-MM-DD';
export default function RekapPadamPage({ data }: any) {
  const [text, setText] = useState<any>('');

  const setHari = (tgl: any) => {
    const hari = moment(tgl, DATE_FORMAT).format('dddd');
    const tanggal = moment(tgl, DATE_FORMAT).format('DD-MM-YYYY');
    const pukul = moment(tgl, DATE_FORMAT).format('HH:mm:ss');
    return `${hari} Tgl ${tanggal} Pukul ${pukul}`;
  };

  const padamGangguan = (data: any) => {
    const res = `INFORMASI GANGGUAN DCC AREA
NO EVENT : ${data?.no_event || ''}
Hari : ${setHari(data?.tanggal)}

${setTextTypePeratan(data) || ''}
Beban Sebelum Trip : ${data?.beban_padam || '0'} MW
Indikasi Gangguan : ${data?.ref_ep_indikasi?.nama || ''}
Arus Gangguan : 
    R : ${data?.r || '0'} A
    S : ${data?.s || '0'} A
    T : ${data?.t || '0'} A
    N : ${data?.n || '0'} A
AG BY : ${data?.fai_arus_ggn_hmi || ''}
Cuaca : ${data?.ref_ep_cuaca?.nama || ''}
UP3 : ${data?.keypoint?.up3?.nama_lokasi || ''}
ULP : ${data?.keypoint?.ulp?.nama_lokasi || ''}
Jumlah Gardu Padam : ${data?.jlh_gardu_padam}
Wilayah Padam : ${data?.wilayah_padam || ''}
Pelanggan Premium : ${data?.pelanggan_pm || ''}
Pelanggan VIP : ${data?.pelanggan_vip || ''}
Kali GGN Selama Bulan : ${data?.jml_ggn_bulan ? data?.jml_ggn_bulan : "0"} Kali
Kali GGN Selama Tahun : ${data?.jml_ggn_tahun?data?.jml_ggn_tahun:"0"} Kali`;
    setText(res);
  };

  const updateGangguan = (data: any) => {
    const res = `UPDATE PENGUSUTAN GANGGUAN DCC AREA
NO EVENT : ${data?.no_event || ''}
Hari : ${setHari(data?.tanggal)}

${setTextTypePeratan(data?.peralatan) || ''}
Peralatan Ditutup : ${data?.keypoint?.nama_lokasi}
UP3 : ${data?.keypoint?.up3?.nama_lokasi || ''}
ULP : ${data?.keypoint?.ulp?.nama_lokasi || ''}
Status Pengusutan : (pilih section dari trans_ep, join trans_ep_section where section != normal )
Sisa Beban Padam : (pilih beban_masuk dari trans_ep, join trans_ep_section where section != normal)`;
    setText(res);
  };

  const penormalanGangguan = (data: any) => {
    const res = `UPDATE PENORMALAN GANGGUAN DCC AREA
NO EVENT : ${data?.no_event || ''}
Hari : ${setHari(data?.tanggal)}

${setTextTypePeratan(data?.peralatan) || ''}
Peralatan Ditutup :  (pilih section dari trans_ep, join trans_ep_section where section != normal )
UP3 : ${data?.keypoint?.up3?.nama_lokasi || ''}
ULP : ${data?.keypoint?.ulp?.nama_lokasi || ''}
Penyebab Gangguan : ${data?.keterangan_ggn || '0'} Menit
Durasi Isolasi : (formula durasi isolasi) Menit
Durasi Pengusutan : (formula durasi Pengusutan) Menit
Durasi Perbaikan : (formula durasi Perbaikan) Menit
Durasi Recovery : (formula durasi Recovery) Menit
ENS : ${data?.ens || '0'} Kwh
ENS Dalam Rupiah : Rp (nilai ref_ep_rupiah * ens) ,-`;
    setText(res);
  };

  const padamTerencana = (data: any) => {
    const res = `INFORMASI PEKERJAAN/EMERGENCY DCC AREA
NO EVENT : ${data?.no_event}
Hari : ${setHari(data?.tanggal)}

${setTextTypePeratan(data?.peralatan) || ''}
Beban Sebelum Dibuka : ${data?.beban_padam || '0'} MW
Keterangan Pekerjaan : ${data?.penyebab_ggn || ''}
UP3 : ${data?.keypoint?.up3?.nama_lokasi || ''}
ULP : ${data?.keypoint?.ulp?.nama_lokasi || ''}
Jumlah Gardu Padam : ${data?.jlh_gardu_padam || ''}
Wilayah Padam : ${data?.wilayah_padam || ''}
Pelanggan Premium : ${data?.pelanggan_pm || ''}
Pelanggan VIP : ${data?.pelanggan_vip || ''}
Penanggung Jawab : 
Pelaksana : 
Pengawas Pekerjaan : 
Pengawas K3 : 
Pengawas Manuver : 
Durasi Pekerjaan : 
Estimasi ENS :`;
    setText(res);
  };

  const updateTerencana = (data: any) => {
    const res = `UPDATE PEKERJAAN/EMERGENCY DCC AREA
NO EVENT : ${data?.no_event}
Hari : ${setHari(data?.tanggal)}

${setTextTypePeratan(data?.peralatan) || ''}
Peralatan Ditutup :  ${data?.keypoint?.nama_lokasi}
UP3 : ${data?.keypoint?.up3?.nama_lokasi || ''}
ULP : ${data?.keypoint?.ulp?.nama_lokasi || ''}
Status Pengusutan : (pilih section dari trans_ep, join trans_ep_section where section != normal )
Sisa Beban Padam : (pilih beban_masuk dari trans_ep, join trans_ep_section where section != normal) MW`;
    setText(res);
  };

  const penormalanTerencana = (data: any) => {
    const res = `UPDATE PENORMALAN PEKERJAAN/EMERGENCY DCC AREA
NO EVENT : ${data?.no_event}
Hari : ${setHari(data?.tanggal)}
${setTextTypePeratan(data?.peralatan) || ''}`;
    setText(res);
  };

  const setTextTypePeratan = (data: any) => {
    switch (data) {
      case 'GI':
        return `
          Gardu Induk : 
          Peralatan Trip :
          Jenis Peralatan :
        `;
      case 'GH':
        return `
          Gardu Induk : 
          Penyulang GI : 
          Peralatan Trip : 
          Jenis Peralatan : 
        `;
      case 'RECLOSER':
        return `
          Gardu Induk :
          Penyulang GI :
          Peralatan Trip :
          Jenis Peralatan :
        `;
      case 'MOTORIZE':
        return `
          Gardu Induk :
          Penyulang GI :
          Zona :
          Peralatan Trip :
          Jenis Peralatan :
        `;
    }
  };

  useEffect(() => {
    // console.log("data", data);

    padamGangguan(data)
  }, [data])

  return (
    <>
      <div className='p-2'>
        <button
          className='btn btn-primary me-1 mb-1'
          onClick={() => padamGangguan(data)}
        >
          Padam Gangguan
        </button>
        <button
          className='btn btn-primary me-1 mb-1'
          onClick={() => updateGangguan(data)}
        >
          Update Gangguan
        </button>
        <button
          className='btn btn-primary me-1 mb-1'
          onClick={() => penormalanGangguan(data)}
        >
          Penormalan Gangguan
        </button>
        <button
          className='btn btn-primary me-1 mb-1'
          onClick={() => padamTerencana(data)}
        >
          Padam Terencana / Emergency
        </button>
        <button
          className='btn btn-primary me-1 mb-1'
          onClick={() => updateTerencana(data)}
        >
          Update Terencana / Emergency
        </button>
        <button
          className='btn btn-primary me-1 mb-1'
          onClick={() => penormalanTerencana(data)}
        >
          Penormalan Terencana / Emergency
        </button>
        <div>
          <Form.Control
            as='textarea'
            type='text'
            placeholder=''
            value={text}
            style={{ height: '280px' }}
          />
        </div>
      </div>
    </>
  );
}
