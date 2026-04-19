import React from 'react';

export default function WmJsaFormulir() {
  return (
    <>
        <table width='100%' className="table table-bordered">
          <tbody>
            <tr>
              <td colSpan={3}>
                <table width='100%' className='noborder'>
                  <tbody>
                    <tr>
                      <td rowSpan={4} width='1' className='td'>
                        <img
                          src='http://103.78.140.243/apdkalselteng/assets/wponline/logopln.png'
                          height='66'
                          width='50'
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='border-0'>
                        PT. PLN (Persero)
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='border-0'>
                       UIW kalimantan barat
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className='border-0'>
                        UP2B kalimantan barat
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td rowSpan={5} >
                <img
                  src='http://103.78.140.243/apdkalselteng/assets/wponline/qrcode/202012231704411608983227.png'
                  height='120'
                  width='120'
                />
              </td>
            </tr>
            <tr>
              <td rowSpan={4} >
                <b>
                  FORMULIR IJIN KERJA <br />
                  Working Permit Form
                </b>
              </td>
              <td colSpan={2}>2432/KSA/XII/UP2D/2020</td>
            </tr>
            <tr>
              <td colSpan={2}>GUDANG UP2D DI WILAYAH</td>
            </tr>
            <tr>
              <td colSpan={2}>KSA</td>
            </tr>
            <tr>
              <td colSpan={2}>PEMINDAHAN MATERIAL BARU KE GUDANG WILAYAH</td>
            </tr>

            <tr>
              <td colSpan={4} >
                PEMINDAHAN MATERIAL BARU KE GUDANG WILAYAH
              </td>
            </tr>
            <tr>
              <td colSpan={4} >
                GUDANG UP2D DI WILAYAH
              </td>
            </tr>
          </tbody>
        </table>
        <table width='100%' className='table table-bordered'>
          <tbody>
            <tr>
              <th colSpan={4} style={{height: '25px'}}>
                JOB SAFETY ANALYSIS
              </th>
            </tr>
            <tr>
              <th>No</th>
              <th>Tahapan Pekerjaan</th>
              <th>Potensi Bahaya</th>
              <th>Pengendalian</th>
            </tr>
            <tr>
              <td >1</td>
              <td>Persiapan</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td >2</td>
              <td>Safety Briefing</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td >3</td>
              <td>Penurunan Material</td>
              <td>Material Jatuh,Terjepit, Terpeleset</td>
              <td>Menggunakan APD lengkap,menggunakan Forklip</td>
            </tr>
            <tr>
              <td >4</td>
              <td>Penyusunan Material</td>
              <td>Material Jatuh,Terjepit, Terpeleset,Tergores</td>
              <td>Menggunakan APD lengkap,menggunakan Forklip</td>
            </tr>
            <tr>
              <td >5</td>
              <td>Penutupan Material</td>
              <td>Terjepit, Tergores</td>
              <td>Menggunakan APD lengkap,menggunakan sarung tangan</td>
            </tr>
          </tbody>
        </table>
        <table width='100%' className='table table-bordered  mt-5'>
          <tbody>
            <tr>
              <th colSpan={4} style={{height: '25px'}}>
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
              <td  style={{ padding: '7px' }}>
                1
              </td>
              <td style={{ padding: '7px' }}>Di Buat Oleh</td>
              <td style={{ padding: '7px' }}>CITRA YULIA ROSANTIKA</td>
              <td style={{ padding: '7px' }}  height='50'>
                <img
                  src='http://103.78.140.243/apdkalselteng/assets/wponline/file/91157002/20190829180222340173116.jpg'
                  height='50'
                  width='100'
                />
              </td>
            </tr>
            <tr className='pad'>
              <td  style={{ padding: '7px' }}>
                2
              </td>
              <td style={{ padding: '7px' }}>Di Periksa Oleh</td>
              <td style={{ padding: '7px' }}></td>
              <td style={{ padding: '7px' }}  height='50'></td>
            </tr>
            <tr className='pad'>
              <td  style={{ padding: '7px' }}>
                3
              </td>
              <td style={{ padding: '7px' }}>Di Setujui Oleh</td>
              <td style={{ padding: '7px' }}>RISNAYANI</td>
              <td style={{ padding: '7px' }}  height='50'>
                <img
                  src='http://103.78.140.243/apdkalselteng/assets/wponline/file/71937011/201909121411191528690982.jpg'
                  height='50'
                  width='100'
                />
              </td>
            </tr>
          </tbody>
        </table>
    </>
  );
}
