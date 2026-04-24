import React from 'react';

export default function WmLaranganTanggungJFormulir() {
  return (
    <>
      <table width='100%' className='table table-bordered'>
        <tbody>
          <tr>
            <td colSpan={3}>
              <table width='100%' className='noborder'>
                <tbody>
                  <tr>
                    <td rowSpan={4} width='1' className='border-0'>
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
            <th colSpan={4} className="text-center">
              LARANGAN DAN TANGGUNG JAWAB MITRA KERJA
            </th>
          </tr>
          <tr>
            <td colSpan={4}>
              1 . Mitra Kerja dilarang melaksanakan pekerjaan di luar waktu
              working permit yang telah disetujui
              <br />2 . Mitra Kerja dilarang melaksanakan pekerjaan di luar
              lingkup working permit yang telah disetujui
              <br />3 . Mitra Kerja dilarang memasuki area/ ruangan selain
              ruangan tempat kerja yang telah disetujui
              <br />4 . Mitra Kerja wajib menggunakan APD yang sesuai dengan
              pekerjaan yang dilaksanakan
              <br />5 . Mitra Kerja wajib menggunakan peralatan kerja yang
              sesuai dengan kebutuhan
              <br />6 . Mitra Kerja wajib bertanggung jawab menanggung semua
              kerugian akibat kelalaian dari pelaksanaan pekerjaan yang
              dilaksanakan yang mengakibatkan kerusakan instalasi eksisting
              milik PT. PLN (Persero) dan peralatan konsumen maupun kerugian
              akibat energi (kwh) yang hilang.
              <br />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <table width='100%' className='table table-bordered'>
        <tbody>
          <tr>
            <th colSpan={4}>SIGN APPROVAL</th>
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
            <td style={{ padding: '7px' }}>Disampaikan Oleh</td>
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
            <td style={{ padding: '7px' }}>Kepada</td>
            <td style={{ padding: '7px' }}>WAHYUDI</td>
            <td style={{ padding: '7px' }} height='50'></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
