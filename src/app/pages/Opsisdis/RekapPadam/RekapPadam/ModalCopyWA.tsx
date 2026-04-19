import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import { localeFormatter, numberCurrencyID } from '@app/helper/number.helper';
moment.locale('id');

// const DATE_FORMAT = 'YYYY-MM-DD';
export default function RekapPadamPage({ data }: any) {
  const [text, setText] = useState<any>('');

  // const setHari = (tgl: any) => {
  //   const hari = moment(tgl, DATE_FORMAT).format('dddd');
  //   const tanggal = moment(tgl, DATE_FORMAT).format('DD-MM-YYYY');
  //   const pukul = moment(tgl, DATE_FORMAT).format('HH:mm:ss');
  //   return `${hari} Tgl ${tanggal} Pukul ${pukul}`;
  // };

  const padamGangguan = (data: any) => {
    const res = `PADAM GANGGUAN
Pkl : ${moment(data?.jam_padam).format("HH:mm")} WIB / ${data?.keypoint?.nama_lokasi || data?.lbs_manual || ""} / ${data?.induk_keypoint || ""} / ${data?.gardu_induk?.nama_lokasi || ""} / ${data?.jenis_keypoint || ""} / ${data?.keypoint?.ulp?.nama_lokasi || ""} / ${data?.keypoint?.up3?.nama_lokasi || ""} / ${data?.beban_padam || ""} / ${data?.ref_ep_indikasi?.nama || ""} / ${data?.total_gardu_padam || ""} / ${data?.coverage || ""} / ${data?.zona || ""} 
    Ir : ${data?.r || '0'} A
    Is : ${data?.s || '0'} A
    It : ${data?.t || '0'} A
    In : ${data?.n || '0'} A
`
      ;
    setText(res);
  };

  const updateGangguan = (data: any) => {
    const res = `UPDATE GANGGUAN
    Pkl : ${moment(data?.jam_tutup).format("HH:mm")} WIB / ${data?.keypoint?.nama_lokasi || data?.lbs_manual || ""} / ${data?.induk_keypoint || ""} / ${data?.gardu_induk?.nama_lokasi || ""} / ${data?.jenis_keypoint || ""} / ${data?.keypoint?.ulp?.nama_lokasi || ""} / ${data?.keypoint?.up3?.nama_lokasi || ""} / ${data?.total_gardu_nyala || ""} / ${data?.total_gardu_padam || ""} / ${data?.keterangan_ggn || ""}
`;
    setText(res);
  };

  const penormalanGangguan = (data: any) => {
    const res = `PENORMALAN GANGGUAN
    Pkl : ${moment(data?.jam_normal).format("HH:mm")} WIB / ${data?.keypoint?.nama_lokasi || data?.lbs_manual || ""} / ${data?.induk_keypoint || ""} / ${data?.gardu_induk?.nama_lokasi || ""} / ${data?.jenis_keypoint || ""} / ${data?.keypoint?.ulp?.nama_lokasi || ""} / ${data?.keypoint?.up3?.nama_lokasi || ""} / ${data?.ref_ep_penyebab_ggn?.nama || ""}

Recovery  : ${localeFormatter(data?.durasi_recovery) || '0'} Menit
ENS : ${localeFormatter(data?.ens) || '0'} Kwh
Nilai  : ${numberCurrencyID(data?.ens_rupiah)}
Cuaca : ${data?.ref_ep_cuaca?.nama}
saidi :${data?.saidi}
saifi : ${data?.saifi}
`;
    setText(res);
  };

  //   const padamTerencana = (data: any) => {
  //     const res = `INFORMASI PEKERJAAN/EMERGENCY DCC AREA
  // NO EVENT : ${data?.no_event}
  // Hari : ${setHari(data?.tanggal)}

  // ${setTextTypePeratan(data?.peralatan) || ''}
  // Beban Sebelum Dibuka : ${data?.beban_padam || '0'} MW
  // Keterangan Pekerjaan : ${data?.penyebab_ggn || ''}
  // UP3 : ${data?.keypoint?.up3?.nama_lokasi || ''}
  // ULP : ${data?.keypoint?.ulp?.nama_lokasi || ''}
  // Jumlah Gardu Padam : ${data?.jlh_gardu_padam || ''}
  // Wilayah Padam : ${data?.wilayah_padam || ''}
  // Pelanggan Premium : ${data?.pelanggan_pm || ''}
  // Pelanggan VIP : ${data?.pelanggan_vip || ''}
  // Penanggung Jawab : 
  // Pelaksana : 
  // Pengawas Pekerjaan : 
  // Pengawas K3 : 
  // Pengawas Manuver : 
  // Durasi Pekerjaan : 
  // Estimasi ENS :`;
  //     setText(res);
  //   };

  //   const updateTerencana = (data: any) => {
  //     const res = `UPDATE PEKERJAAN/EMERGENCY DCC AREA
  // NO EVENT : ${data?.no_event}
  // Hari : ${setHari(data?.tanggal)}

  // ${setTextTypePeratan(data?.peralatan) || ''}
  // Peralatan Ditutup :  ${data?.keypoint?.nama_lokasi}
  // UP3 : ${data?.keypoint?.up3?.nama_lokasi || ''}
  // ULP : ${data?.keypoint?.ulp?.nama_lokasi || ''}
  // Status Pengusutan : (pilih section dari trans_ep, join trans_ep_section where section != normal )
  // Sisa Beban Padam : (pilih beban_masuk dari trans_ep, join trans_ep_section where section != normal) MW`;
  //     setText(res);
  //   };

  //   const penormalanTerencana = (data: any) => {
  //     const res = `UPDATE PENORMALAN PEKERJAAN/EMERGENCY DCC AREA
  // NO EVENT : ${data?.no_event}
  // Hari : ${setHari(data?.tanggal)}
  // ${setTextTypePeratan(data?.peralatan) || ''}`;
  //     setText(res);
  //   };

  // const setTextTypePeratan = (data: any) => {
  //   switch (data) {
  //     case 'GI':
  //       return `
  //         Gardu Induk : 
  //         Peralatan Trip :
  //         Jenis Peralatan :
  //       `;
  //     case 'GH':
  //       return `
  //         Gardu Induk : 
  //         Penyulang GI : 
  //         Peralatan Trip : 
  //         Jenis Peralatan : 
  //       `;
  //     case 'RECLOSER':
  //       return `
  //         Gardu Induk :
  //         Penyulang GI :
  //         Peralatan Trip :
  //         Jenis Peralatan :
  //       `;
  //     case 'MOTORIZE':
  //       return `
  //         Gardu Induk :
  //         Penyulang GI :
  //         Zona :
  //         Peralatan Trip :
  //         Jenis Peralatan :
  //       `;
  //   }
  // };

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
        {/* <button
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
        </button> */}
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
