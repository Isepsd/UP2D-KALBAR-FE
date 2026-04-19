import Preloader from '@app/components/Loader/Preloader';
import { cdnUrl } from '@app/helper/cdn.helper';
import { stringToJSON } from '@app/helper/data.helper';
import { timeFormat } from '@app/helper/time.helper';
import { IWpOnline } from '@app/interface/wp-online.interface';
import useApiRequest from '@app/services/useApiRequest';
import { nanoid } from '@reduxjs/toolkit';
import { isArray } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function WpDetailPage() {
  const { application } = useSelector((state: any) => state.ui);
  const { id } = useParams()
  const [wp, setWp] = useState<IWpOnline>()
  const { currentUser } = useSelector((state: any) => state.auth);
  useEffect(() => {
    document.body.classList.add("print")

    return () => {
      document.body.classList.remove("print")
    }
  }, [])

  /** REQ DATA */
  const [reqParams,] = useState<any>({});

  const apiRequest = useApiRequest({
    url: `main/working-permit/online/html-view/${id}`,
    method: 'GET',
    params: reqParams,
  });

  useEffect(() => {
    const response = apiRequest?.response?.results
    setWp({
      ...response,
      nama_pekerja: stringToJSON(response?.nama_pekerja)
    })

    return () => {
      setWp(undefined)
    }
  }, [apiRequest?.response?.results])

  if (apiRequest?.loading) {
    return <Preloader image={cdnUrl(application?.logo)} />
  }

  // console.log("cureent", currentUser)
  return (
    <>
      <div className='container-fluid my-2'>
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <td colSpan={4}>
                <table width='100%' className='border-0'>
                  <tbody>
                    <tr>
                      <td rowSpan={5} width='1' className='td border-0'>
                        <img
                          src='/static/logopln.png'
                          height='66'
                          width='50'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        PT. PLN (Persero)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        {application?.app_sub_name}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        {application?.company}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} align='center'>
                <b>
                  FORMULIR IJIN KERJA <br />
                  Working Permit Form
                </b>
              </td>
              <td colSpan={3}>{wp?.nomor_formulir}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.area?.nama_lokasi}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.bagian?.name}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.pekerjaan_dilakukan}</td>
            </tr>

            <tr>
              <td colSpan={4}>{wp?.jenis_pekerjaan}</td>
            </tr>
            <tr>
              <td style={{ width: '30%' }}>Nomor Formulir</td>
              <td colSpan={3}>{wp?.nomor_formulir}</td>
            </tr>
            <tr>
              <td>Pekerjaan Yang Akan Dilakukan</td>
              <td colSpan={3}>{wp?.pekerjaan_dilakukan}</td>
            </tr>
            <tr>
              <td>Referensi SOP</td>
              <td colSpan={3}>{wp?.master_sop_jsa?.judul_pekerjaan}</td>
            </tr>
            <tr>
              <td>Detail Lokasi Pekerjaan</td>
              <td colSpan={3}>{wp?.area?.nama_lokasi}</td>
            </tr>
            <tr>
              <td>Bagian</td>
              <td colSpan={3}>{wp?.bagian?.name}</td>
            </tr>
            <tr>
              <td>Nama User / Direksi Pekerjaan</td>
              <td colSpan={3}>{wp?.user_manager?.fullname}</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td colSpan={3}></td>
            </tr>
            <tr>
              <td>Nama Pengawas</td>
              <td colSpan={3}>{wp?.pengawas?.fullname}</td>
            </tr>
            <tr>
              <td>Nama Pengawas K3</td>
              <td colSpan={3}>{wp?.pengawas_k3?.fullname}</td>
            </tr>

            <tr>
              <td>Nama Pekerja</td>
              <td colSpan={3}>
                <table>
                  <tbody>
                    <tr>
                      {
                        (isArray(wp?.nama_pekerja) ? wp?.nama_pekerja : [])?.map((item: any, index: number) => (
                          <td
                            className='td'
                            style={{ padding: '2px 50px 2px 3px' }}
                            key={nanoid()}
                          >
                            {index + 1}. {item}
                          </td>
                        ))
                      }
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>Tanggal Mulai &amp; Tanggal Selesai Pekerjaan</td>
              <td colSpan={3}>
                {wp?.tgl_pekerjaan ? timeFormat(wp?.tgl_pekerjaan, "DD-MM-YYYY") : ""}
                &nbsp; - &nbsp;
                {wp?.tgl_pekerjaan_selesai ? timeFormat(wp?.tgl_pekerjaan_selesai, "DD-MM-YYYY") : ""}
              </td>
            </tr>
            <tr>
              <td>Jam Mulai &amp; Jam Selesai Pekerjaan</td>
              <td colSpan={3}>
                {wp?.tgl_pekerjaan ? timeFormat(wp?.tgl_pekerjaan, "HH:mm:ss") : ""}
                &nbsp; - &nbsp;
                {wp?.tgl_pekerjaan_selesai ? timeFormat(wp?.tgl_pekerjaan_selesai, "HH:mm:ss") : ""}

              </td>
            </tr>
            <tr>
              <td>Petugas Zona Kerja</td>
              <td colSpan={3}>, Petugas Rayon</td>
            </tr>
            <tr>
              <td>Perlu Manuver/ Padam 20 kV</td>
              <td colSpan={3}>{wp?.manuver ? 'YA' : 'TIDAK'}</td>
            </tr>
            <tr>
              <td>Perlu Grounding</td>
              <td colSpan={3}>{wp?.grounding ? 'YA' : 'TIDAK'}</td>
            </tr>
            <tr>
              <td valign='top' height='30' colSpan={4}>
                Catatan Tambahan :
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <br />
        <br />
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <td align='center' style={{ width: '25%' }}>
                <b>Penanggung Jawab </b>
              </td>
              <td align='center' style={{ width: '25%' }}>
                <b>Pengawas Pekerjaan </b>
              </td>
              <td align='center' style={{ width: '25%' }}>
                <b>Pengawas K3 </b>
              </td>
              <td align='center' style={{ width: '25%' }}>
                <b>Pejabat Laks K3L </b>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '25px' }} align='center'></td>
              <td style={{ padding: '25px' }} align='center'></td>
              <td style={{ padding: '25px' }} align='center'></td>
              <td style={{ padding: '25px' }} align='center'></td>
            </tr>
            <tr>
              <td align='center'>{wp?.user_manager?.fullname}</td>
              <td align='center'>AHMAD AZIS KURNIAWAN</td>
              <td align='center'>{wp?.pengawas_k3?.fullname}</td>
              <td align='center'>ANDI MARANATHA TOBING</td>
            </tr>
            <tr>
              <td align='center'>
                <b>Koordinator Vendor</b>
              </td>
              <td align='center'>
                <b>Petugas Rayon</b>
              </td>
              <td align='center' rowSpan={3}></td>
              <td align='center' rowSpan={3}></td>
            </tr>
            <tr>
              <td style={{ padding: '25px' }}>&nbsp;</td>
              <td style={{ padding: '25px' }}>&nbsp;</td>
            </tr>
            <tr>
              <td align='center'></td>
              <td align='center'>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        <div style={{ pageBreakAfter: 'always' }}></div>

        <table width='100%' className='border border-black' style={{ fontSize: '12px' }}>
          <tbody>
            <tr>
              <td colSpan={4}>
                <table width='100%' className='border-0'>
                  <tbody>
                    <tr>
                      <td rowSpan={5} width='1' className='td border-0'>
                        <img
                          src='http://portal.up2djkt.com/apdjakarta/assets/wponline/logopln.png'
                          height='66'
                          width='50'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        PT. PLN (Persero)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        UIW {application?.app_sub_name}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        {application?.company}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} align='center'>
                <b>
                  FORMULIR IJIN KERJA <br />
                  Working Permit Form
                </b>
              </td>
              <td colSpan={3}>{wp?.nomor_formulir}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.area?.nama_lokasi}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.bagian?.name}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.pekerjaan_dilakukan}</td>
            </tr>

            <tr>
              <th colSpan={4} style={{ height: '25px', textAlign: 'center' }}>
                LARANGAN DAN TANGGUNG JAWAB MITRA KERJA
              </th>
            </tr>
            <tr>
              <td colSpan={4}>
                1 . Mitra kerja wajib mengikuti SOP kerja dan mematuhi ketentuan
                K3
                <br />2 . Mitra Kerja dilarang melaksanakan pekerjaan di luar
                waktu working permit yang telah disetujui
                <br />3 . Mitra Kerja dilarang melaksanakan pekerjaan di luar
                lingkup working permit yang telah disetujui
                <br />4 . Mitra Kerja dilarang memasuki area/ ruangan selain
                ruangan tempat kerja yang telah disetujui
                <br />5 . Mitra Kerja wajib menggunakan APD yang sesuai dengan
                pekerjaan yang dilaksanakan
                <br />6 . Mitra Kerja wajib menggunakan peralatan kerja yang
                sesuai dengan kebutuhan
                <br />7 . Mitra Kerja wajib bertanggung jawab menanggung semua
                kerugian akibat kelalaian dari pelaksanaan pekerjaan yang
                dilaksanakan yang mengakibatkan kerusakan instalasi eksisting
                milik PT. PLN (Persero) dan peralatan konsumen maupun kerugian
                akibat energi (kwh) yang hilang.
                <br />8 . MITRA KERJA WAJIB MENGIKUTI SOP DAN K3
                <br />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th colSpan={4} style={{ height: '25px' }}>
                SIGN APPROVAL
              </th>
            </tr>
            <tr>
              <th>No</th>
              <th>Status</th>
              <th>Nama</th>
              <th>Tanda Tangan</th>
            </tr>
            <tr className='pad'>
              <td align='center' style={{ padding: '7px' }}>
                1
              </td>
              <td style={{ padding: '7px' }}>Disampaikan Oleh</td>
              <td style={{ padding: '7px' }}>{currentUser?.fullname}</td>
              <td style={{ padding: '7px' }} align='center' height='50'></td>
            </tr>
            <tr className='pad'>
              <td align='center' style={{ padding: '7px' }}>
                2
              </td>
              <td style={{ padding: '7px' }}>Kepada</td>
              <td style={{ padding: '7px' }}></td>
              <td style={{ padding: '7px' }} height='50'></td>
            </tr>
          </tbody>
        </table>
        <div style={{ pageBreakAfter: 'always' }}></div>
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <td colSpan={4}>
                <table width='100%' className='border border-black'>
                  <tbody>
                    <tr>
                      <td rowSpan={4} width='1%' className='border'>
                        <img
                          src='http://portal.up2djkt.com/apdjakarta/assets/wponline/logopln.png'
                          height='60'
                          width='50'
                        />
                      </td>
                      <td width='30%' align='center' className='border'>
                        <b>
                          PT PLN (PERSERO) {application?.app_sub_name}
                        </b>
                      </td>
                      <td width='7%' className='td border-0'>
                        No. Dokumen
                      </td>
                      <td width='1%' className='td border-0'>
                        :
                      </td>
                      <td className='td border-0' width='13%'>
                        FM/I.02.03
                      </td>
                    </tr>

                    <tr>
                      <td width='30%' align='center' className='border'>
                        <b>{application?.app_sub_name}</b>
                      </td>
                      <td width='7%' className='td border-0'>
                        Tanggal Terbit
                      </td>
                      <td width='1%' className='td  border-0'>
                        :
                      </td>
                      <td width='13%' className='td  border-0'>
                        27 APRIL 2020
                      </td>
                    </tr>
                    <tr>
                      <td width='30%' align='center' className='border'>
                        <b>FORMULIR WORKING PERMIT/IJIN BEKERJA</b>
                      </td>
                      <td width='7%' className='td border-0'>
                        Halaman
                      </td>
                      <td width='1%' className='td border-0'>
                        :
                      </td>
                      <td width='13%' className='td border-0'>
                        1 dari 1
                      </td>
                    </tr>
                    <tr>
                      <td width='30%' align='center' className='border'>
                        <b>PEJABAT PELAKSANA K3L</b>
                      </td>
                      <td width='7%' className='td'>
                        Status Revisi
                      </td>
                      <td width='1%' className='td  border-0'>
                        :
                      </td>
                      <td width='13%' className='td  border-0'>
                        00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table width='100%'>
          <tbody>
            <tr>
              <td className='border-0' align='center'>
                <b>
                  <u>
                    JOB SAFETY ANALYSIS (JSA) <br />
                    ANALISIS KESELAMATAN KERJA
                  </u>
                </b>
              </td>
            </tr>
          </tbody>
        </table>
        <table width='100%'>
          <tbody>
            <tr>
              <td colSpan={7} height='25px' className='border-0'>
                <b>A. INFORMASI PEKERJAAN</b>
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td width='1%' className='border-0'>
                1.
              </td>
              <td className='border-0' width='37%'>
                Tanggal
              </td>
              <td width='1%' className='border-0' colSpan={2}>
                :
              </td>
              <td colSpan={2} className='border-0' width='60%'>
                27 APRIL 2020
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td width='1%' className='border-0'>
                2.
              </td>
              <td className='border-0' width='37%'>
                Jenis Pekerjaan
              </td>
              <td className='border-0' width='1%' colSpan={2}>
                :
              </td>
              <td className='border-0' colSpan={2} width='60%'>
                {wp?.pekerjaan_dilakukan}
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'>
                3.
              </td>
              <td className='border-0' width='37%'>
                Lokasi
              </td>
              <td className='border-0' width='1%' colSpan={2}>
                :
              </td>
              <td className='border-0' colSpan={2} width='60%'>
                {wp?.area?.nama_lokasi}
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'>
                4.
              </td>
              <td className='border-0' width='37%'>
                Perusahaan Pelaksana Pekerjaan
              </td>
              <td className='border-0' width='1%' colSpan={2}>
                :
              </td>
              <td className='border-0' colSpan={2} width='60%'>
                PLN {application?.app_sub_name}
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'>
                5.
              </td>
              <td className='border-0' width='37%'>
                Pengawas Pekerjaan
              </td>
              <td className='border-0' width='1%' colSpan={2}>
                :
              </td>
              <td className='border-0' colSpan={2} width='60%'>
                AHMAD AZIS KURNIAWAN
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'>
                6.
              </td>
              <td className='border-0' width='37%'>
                Pelaksana Pekerjaan
              </td>
              <td className='border-0' width='0.5%'>
                :
              </td>
              <td className='border-0' width='0.5%'></td>
              <td className='border-0' align='center' width='35%'>
                Nama
              </td>
              <td className='border-0' align='center' width='25%'>
                Tanda Tangan
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'></td>
              <td className='border-0' width='37%'></td>
              <td className='border-0' width='0.5%'></td>
              <td className='border-0' width='0.5%'>
                1.
              </td>
              <td className='border-0' align='center' width='35%'>
                ARIS
              </td>
              <td className='border-0' align='center' width='25%'>
                .......................................................
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'></td>
              <td className='border-0' width='37%'></td>
              <td className='border-0' width='0.5%'></td>
              <td className='border-0' width='0.5%'>
                2.
              </td>
              <td className='border-0' align='center' width='35%'>
                AIDI
              </td>
              <td className='border-0' align='center' width='25%'>
                .......................................................
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'></td>
              <td className='border-0' width='37%'></td>
              <td className='border-0' width='0.5%'></td>
              <td className='border-0' width='0.5%'>
                3.
              </td>
              <td className='border-0' align='center' width='35%'>
                ..............................................................................
              </td>
              <td className='border-0' align='center' width='25%'>
                .......................................................
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'></td>
              <td className='border-0' width='37%'></td>
              <td className='border-0' width='0.5%'></td>
              <td className='border-0' width='0.5%'>
                4.
              </td>
              <td className='border-0' align='center' width='35%'>
                ..............................................................................
              </td>
              <td className='border-0' align='center' width='25%'>
                .......................................................
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'></td>
              <td className='border-0' width='37%'></td>
              <td className='border-0' width='0.5%'></td>
              <td className='border-0' width='0.5%'>
                5.
              </td>
              <td className='border-0' align='center' width='35%'>
                ..............................................................................
              </td>
              <td className='border-0' align='center' width='25%'>
                .......................................................
              </td>
            </tr>
            <tr>
              <td width='1%' className='border-0'></td>
              <td className='border-0' width='1%'></td>
              <td className='border-0' width='37%'></td>
              <td className='border-0' width='0.5%'></td>
              <td className='border-0' width='0.5%'>
                6.
              </td>
              <td className='border-0' align='center' width='35%'>
                ..............................................................................
              </td>
              <td className='border-0' align='center' width='25%'>
                .......................................................
              </td>
            </tr>
          </tbody>
        </table>
        <table width='100%'>
          <tbody>
            <tr>
              <td colSpan={10} height='25px' className='border-0'>
                <b>B. PERALATAN KESELAMATAN</b>
              </td>
            </tr>
            <tr>
              <td className='border-0' width='1'></td>
              <td className='border-0' width='1'>
                <b>1.</b>
              </td>
              <td className='border-0' width='200'>
                <b>ALAT PELINDUNG DIRI</b>
              </td>
              <td className='border-0' width='15'>
                :
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Helm
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Earmuff
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Wearpack
              </td>
            </tr>
            <tr>
              <td className='border-0' width='216' colSpan={4} rowSpan={3}></td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Sepatu Keselamatan
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Sarung Tangan Katun
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Tabung Pernafasan
              </td>
            </tr>
            <tr>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Kacamata
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Sarung Tangan Karet
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Full Body Harness
              </td>
            </tr>
            <tr>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Earplug
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Sarung Tangan 20KV
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Lain-lain:
              </td>
            </tr>
            <tr>
              <td className='border-0' width='1'></td>
              <td className='border-0' width='1'>
                <b>2.</b>
              </td>
              <td className='border-0' width='200'>
                <b>PERLENGKAPAN KESELAMATAN</b>
              </td>
              <td className='border-0' width='15'>
                :
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100'>
                Pemadan API (APAR, dll)
              </td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100' colSpan={3}>
                Lain-lain:
              </td>
            </tr>
            <tr>
              <td className='border-0' width='1'></td>
              <td className='border-0' width='1'></td>
              <td className='border-0' width='150'>
                <b>&amp; DARURAT</b>
              </td>
              <td className='border-0' width='15'></td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100' colSpan={5}>
                Rambu Keselamatan
              </td>
            </tr>
            <tr>
              <td className='border-0' width='216' colSpan={4} rowSpan={2}></td>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100' colSpan={5}>
                LOTO (Log Out Tag Out)
              </td>
            </tr>
            <tr>
              <td className='border-0' width='20'>
                <input type='checkbox' />
              </td>
              <td className='border-0' width='100' colSpan={5}>
                Radio Telekomunikasi
              </td>
            </tr>
          </tbody>
        </table>

        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th colSpan={4} style={{ height: '25px' }}>
                C. ANALISIS KESELAMATAN KERJA
              </th>
            </tr>
            <tr>
              <th align='center'>No</th>
              <th>Tahapan Pekerjaan</th>
              <th>Potensi Bahaya</th>
              <th>Pengendalian</th>
            </tr>
            <tr>
              <td align='center'>1</td>
              <td>Persiapan Pekerjaan (Safety Briefing, Berdoa)</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td align='center'>2</td>
              <td>Menurunkan material Panel RTU dari Mobil Truk</td>
              <td>Terpeleset, Terjepit</td>
              <td>
                Gunakan APD, Gunakan Helm, Gunakan Sepatu Safety dan Sarung
                Tangan
              </td>
            </tr>
            <tr>
              <td align='center'>3</td>
              <td>
                Memindahkan / Menggeser Panel RTU ke tempat yang telah disetujui
              </td>
              <td>Terpeleset, Terjepit Panel</td>
              <td>
                Gunakan APD, Gunakan Helm, Gunakan Sepatu Safety dan Sarung
                Tangan
              </td>
            </tr>
            <tr>
              <td align='center'>4</td>
              <td>
                Penarikan kabel wiring dari Panel RTU ke masing-masing cell 20kV
              </td>
              <td>Terbentur pintu cell 20kV / RTU, Tersetrum</td>
              <td>
                Gunakan APD, Gunakan Helm, dan Peralatan Kerja (Multi Meter)
              </td>
            </tr>
            <tr>
              <td align='center'>5</td>
              <td>Penarikan kabel power suplay Panel RTU</td>
              <td>Tersetrum 48 Vdc</td>
              <td>
                Gunakan Sarung Tangan, Gunakan Alat kerja secara benar (Multi
                Meter)
              </td>
            </tr>
            <tr>
              <td align='center'>6</td>
              <td>Wiring status dan control di masing-masing cell 20kV</td>
              <td>Tersetrum, Salah Wiring</td>
              <td>
                Gunakan APD, Gunakan alat kerja yang standart serta lebih teliti
                dalam melakukan instalasi
              </td>
            </tr>
            <tr>
              <td align='center'>7</td>
              <td>Perapihan Wiring</td>
              <td>Tersetrum Tegangan 220 V</td>
              <td>
                Gunakan Sarung Tangan, Gunakan Alat kerja secara benar (Multi
                Meter)
              </td>
            </tr>
            <tr>
              <td align='center'>8</td>
              <td>Konfigurasi Gateway / BCU</td>
              <td>Salah mengisi IP Address, Salah mengisi Address Database</td>
              <td>
                Lebih teliti dalam melakukan konfigurasi peralatan dan pengisian
                addressing data
              </td>
            </tr>
            <tr>
              <td align='center'>9</td>
              <td>Pengetesan Point to Point ke Master</td>
              <td>Salah menginfokan Data</td>
              <td>Lebih teliti dan tetap berkoordinasi dengan bagian Master</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <table width='100%' className='border-0'>
          <tbody>
            <tr>
              <td align='center' style={{ width: '25%' }} className='border-0'>
                <b>DISETUJUI OLEH :</b>
              </td>
              <td align='center' style={{ width: '25%' }} className='border-0'>
                <b>DIPERIKSA OLEH : </b>
              </td>
              <td align='center' style={{ width: '25%' }} className='border-0'>
                <b>DIPERIKSA OLEH :</b>
              </td>
              <td align='center' style={{ width: '25%' }} className='border-0'>
                <b>DISUSUN OLEH :</b>
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: '25px' }}
                align='center'
                className='border-0'
              >
                <img
                  src='http://portal.up2djkt.com/apdjakarta/assets/wponline/qrcode/202004271053201280202633ANGGORO PRIMADIANTO.png'
                  height='50'
                  width='100'
                />
              </td>
              <td
                style={{ padding: '25px' }}
                align='center'
                className='border-0'
              >
                <img
                  src='http://portal.up2djkt.com/apdjakarta/assets/wponline/qrcode/202004271053201280202633.png'
                  height='50'
                  width='100'
                />
              </td>
              <td
                style={{ padding: '25px' }}
                align='center'
                className='border-0'
              ></td>
              <td
                style={{ padding: '25px' }}
                align='center'
                className='border-0'
              >
                <img
                  src='http://portal.up2djkt.com/apdjakarta/assets/wponline/qrcode/202004271053201280202633.png'
                  height='50'
                  width='100'
                />
              </td>
            </tr>
            <tr>
              <td align='center' className='border-0'>
                ANGGORO PRIMADIANTO
              </td>
              <td align='center' className='border-0'>
                AHMAD AZIS KURNIAWAN
              </td>
              <td align='center' className='border-0'>
                ANDI MARANATHA TOBING
              </td>
              <td align='center' className='border-0'>
                DEDY SUHENDRI
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ pageBreakAfter: 'always' }}></div>
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <td colSpan={4}>
                <table width='100%' className='border-0'>
                  <tbody>
                    <tr>
                      <td rowSpan={5} width='1' className='td border-0'>
                        <img
                          src='http://portal.up2djkt.com/apdjakarta/assets/wponline/logopln.png'
                          height='66'
                          width='50'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        PT. PLN (Persero)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        UIW KALIMANTAN BARAT
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        UP2D KALIMANTAN BARAT
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} align='center'>
                <b>
                  FORMULIR IJIN KERJA <br />
                  Working Permit Form
                </b>
              </td>
              <td colSpan={3}>{wp?.nomor_formulir}</td>
            </tr>
            <tr>
              <td colSpan={3}>UP3 BINTARO</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.bagian?.name}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.pekerjaan_dilakukan}</td>
            </tr>

            <tr>
              <td colSpan={4}>Judul Pekerjaan : {wp?.master_sop_jsa?.judul_pekerjaan}</td>
            </tr>
            <tr>
              <td colSpan={4}>Bagian : {wp?.bagian?.name}</td>
            </tr>
          </tbody>
        </table>

        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th colSpan={5} style={{ height: '25px', textAlign: 'center' }}>
                SOP PEKERJAAN
              </th>
            </tr>
            <tr>
              <th style={{ width: '20px' }}>No</th>
              <th colSpan={3}>Langkah Pekerjaan</th>
              <th colSpan={1} style={{ textAlign: 'center' }}>
                Cek List
              </th>
            </tr>

            <tr>
              <td align='center'>1</td>
              <td colSpan={3}>Persiapan Pekerjaan (Safety Briefing, Berdoa)</td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>

            <tr>
              <td align='center'>2</td>
              <td colSpan={3}>Menurunkan material Panel RTU dari Mobil Truk</td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>
            <tr>
              <td align='center'>3</td>
              <td colSpan={3}>
                Memindahkan / Menggeser Panel RTU ke tempat yang telah disetujui
              </td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>
            <tr>
              <td align='center'>4</td>
              <td colSpan={3}>
                Penarikan kabel wiring dari Panel RTU ke masing-masing cell 20kV
              </td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>
            <tr>
              <td align='center'>5</td>
              <td colSpan={3}>Penarikan kabel power suplay Panel RTU</td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>
            <tr>
              <td align='center'>6</td>
              <td colSpan={3}>
                Wiring status dan control di masing-masing cell 20kV
              </td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>
            <tr>
              <td align='center'>7</td>
              <td colSpan={3}>Perapihan Wiring</td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>
            <tr>
              <td align='center'>8</td>
              <td colSpan={3}>Konfigurasi Gateway / BCU</td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>
            <tr>
              <td align='center'>9</td>
              <td colSpan={3}>Pengetesan Point to Point ke Master</td>
              <td colSpan={1} style={{ textAlign: 'center' }}>
                <input type='checkbox' />
              </td>
            </tr>
            <tr>
              <td valign='top' height='300' colSpan={5}>
                Catatan Tambahan :
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ pageBreakAfter: 'always' }}></div>

        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <td colSpan={4}>
                <table width='100%' className='border-0'>
                  <tbody>
                    <tr>
                      <td rowSpan={5} width='1' className='td border-0'>
                        <img
                          src='http://portal.up2djkt.com/apdjakarta/assets/wponline/logopln.png'
                          height='66'
                          width='50'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        PT. PLN (Persero)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        UIW KALIMANTAN BARAT
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        UP2D KALIMANTAN BARAT
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} align='center'>
                <b>
                  FORMULIR IJIN KERJA <br />
                  Working Permit Form
                </b>
              </td>
              <td colSpan={3}>{wp?.nomor_formulir}</td>
            </tr>
            <tr>
              <td colSpan={3}>UP3 BINTARO</td>
            </tr>
            <tr>
              <td colSpan={3}></td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.pekerjaan_dilakukan}</td>
            </tr>

            <tr>
              <td colSpan={4} align='center'>
                <b>PEMERIKSAAN KESIAPAN PERSONIL</b>
              </td>
            </tr>
            <tr>
              <td colSpan={4} align='center'>
                {wp?.pekerjaan_dilakukan}
              </td>
            </tr>
            <tr>
              <td colSpan={4} align='center'></td>
            </tr>
          </tbody>
        </table>
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th style={{ width: '20px' }}>No</th>
              <th>Nama Pelaksana</th>
              <th>Kondisi Jasmani</th>
              <th>Kondisi Rohani</th>
              <th>Disiplin</th>
              <th>Penguasaan Kompetensi</th>
              <th>
                <u>Tanda Tangan</u> <br />
                Memahami penjelasan tentang pekerjaan yang akan dilaksanakan dan
                kemungkinan bahayanya
              </th>
            </tr>
            <tr>
              <td height='50' align='center'>
                1
              </td>
              <td>ARIS</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td height='50' align='center'>
                2
              </td>
              <td>AIDI</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th colSpan={4} style={{ height: '25px' }}>
                SIGN APPROVAL
              </th>
            </tr>
            <tr>
              <th style={{ width: '20px' }}>No</th>
              <th style={{ width: '250px' }}>Status</th>
              <th>Nama</th>
              <th>Tanda Tangan</th>
            </tr>
            <tr className='pad'>
              <td align='center' style={{ padding: '7px' }}>
                1
              </td>
              <td style={{ padding: '7px' }}>Pengawas Lapangan</td>
              <td style={{ padding: '7px' }}>AHMAD AZIS KURNIAWAN</td>
              <td style={{ padding: '7px' }} align='center' height='50'></td>
            </tr>
          </tbody>
        </table>
        <div style={{ pageBreakAfter: 'always' }}></div>
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <td colSpan={4}>
                <table width='100%' className='border-0'>
                  <tbody>
                    <tr>
                      <td rowSpan={5} width='1' className='td border-0'>
                        <img
                          src='http://portal.up2djkt.com/apdjakarta/assets/wponline/logopln.png'
                          height='66'
                          width='50'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        PT. PLN (Persero)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        UIW KALIMANTAN BARAT
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        UP2D KALIMANTAN BARAT
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} align='center'>
                <b>
                  FORMULIR IJIN KERJA <br />
                  Working Permit Form
                </b>
              </td>
              <td colSpan={3}>{wp?.nomor_formulir}</td>
            </tr>
            <tr>
              <td colSpan={3}>UP3 BINTARO</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.bagian?.name}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.pekerjaan_dilakukan}</td>
            </tr>
          </tbody>
        </table>

        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th colSpan={10} style={{ height: '25px', textAlign: 'center' }}>
                PEMBAGIAN TUGAS DAN PENGGUNAAN ALAT PELINDUNG DIRI
              </th>
            </tr>
            <tr>
              <td colSpan={10} align='center'>
                {wp?.pekerjaan_dilakukan}
              </td>
            </tr>
            <tr>
              <td colSpan={10} align='center'></td>
            </tr>
            <tr>
              <th rowSpan={2} align='center'>
                No
              </th>
              <th rowSpan={2} align='center'>
                Nama Pelaksana
              </th>
              <th colSpan={7} align='center'>
                ALAT PELINDUNG DIRI YANG DIGUNAKAN
              </th>
              <th rowSpan={2} align='center'>
                Tugas Pokok yang Harus Dilaksakan
              </th>
            </tr>

            <tr>
              <th align='center'>Safety Helmet</th>
              <th align='center'>Body Harness</th>
              <th align='center'>Sarung Tangan</th>
              <th align='center'>Sarung Tangan 20kV</th>
              <th align='center'>Sepatu Safety</th>
              <th align='center'>Sepatu Tahan 20kV</th>
              <th align='center'>Grounding &amp; Tester</th>
            </tr>
            <tr>
              <td align='center'>1</td>
              <td>ARIS</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td align='center'>2</td>
              <td>AIDI</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <br />
        <br />
        <br />
        <br />
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th colSpan={4} style={{ height: '25px' }}>
                SIGN APPROVAL
              </th>
            </tr>
            <tr>
              <th style={{ width: '20px' }}>No</th>
              <th style={{ width: '250px' }}>Status</th>
              <th>Nama</th>
              <th>Tanda Tangan</th>
            </tr>
            <tr>
              <td align='center' style={{ padding: '7px' }}>
                1
              </td>
              <td style={{ padding: '7px' }}>Pengawas Lapangan</td>
              <td style={{ padding: '7px' }}>AHMAD AZIS KURNIAWAN</td>
              <td style={{ padding: '7px' }} align='center' height='50'></td>
            </tr>
          </tbody>
        </table>

        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <td colSpan={4}>
                <table width='100%' className='border-0'>
                  <tbody>
                    <tr>
                      <td rowSpan={5} width='1' className='td border-0'>
                        <img
                          src='http://portal.up2djkt.com/apdjakarta/assets/wponline/logopln.png'
                          height='66'
                          width='50'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        PT. PLN (Persero)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        {application?.app_sub_name}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='td border-0'>
                        {application?.company}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td rowSpan={4} align='center'>
                <b>
                  FORMULIR IJIN KERJA <br />
                  Working Permit Form
                </b>
              </td>
              <td colSpan={3}>{wp?.nomor_formulir}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.area?.nama_lokasi}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.bagian?.name}</td>
            </tr>
            <tr>
              <td colSpan={3}>{wp?.pekerjaan_dilakukan}</td>
            </tr>
          </tbody>
        </table>
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th colSpan={4} style={{ height: '25px', textAlign: 'center' }}>
                BERITA ACARA SELESAI PEKERJAAN
              </th>
            </tr>
            <tr>
              <td>Pada Hari ini Tanggal :</td>
              <td>&nbsp;{moment().format("DD-MM-YYYY")}</td>
              <td colSpan={2}>Jam :&nbsp;{moment().format("HH:mm:ss")}</td>
            </tr>
            <tr>
              <td colSpan={4}>Yang Bertanda Tangan Dibawah ini :</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td colSpan={3}>AHMAD AZIS KURNIAWAN</td>
            </tr>
            <tr>
              <td>Jabatan</td>
              <td colSpan={3}></td>
            </tr>
            <tr>
              <td>Perusahaan</td>
              <td colSpan={3}>PT. PLN (Persero) {application?.app_sub_name}</td>
            </tr>
            <tr>
              <td colSpan={4}>
                Menyatakan Pekerjaan Yang Tertuang Dalam Working Permit Telah Di
                Selesaikan Dengan Baik
                <br />
                Demikian Pernyataan ini Dibuat Dengan Sebenar-benarnya
              </td>
            </tr>
            <tr>
              <td valign='top' height='50' colSpan={4}>
                Catatan Tambahan :
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <table width='100%' className='border border-black'>
          <tbody>
            <tr>
              <th colSpan={4} style={{ height: '25px' }}>
                SIGN APPROVAL
              </th>
            </tr>
            <tr>
              <th style={{ width: '20px' }}>No</th>
              <th style={{ width: '250px' }}>Status</th>
              <th>Nama</th>
              <th>Tanda Tangan</th>
            </tr>
            <tr>
              <td align='center' style={{ padding: '7px' }}>
                1
              </td>
              <td style={{ padding: '7px' }}>Pengawas Lapangan</td>
              <td style={{ padding: '7px' }}>AHMAD AZIS KURNIAWAN</td>
              <td style={{ padding: '7px' }} align='center' height='50'></td>
            </tr>
          </tbody>
        </table>
        <div style={{ pageBreakAfter: 'always' }}></div>
      </div>
    </>
  );
}
