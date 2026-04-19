import React from 'react';

export default function WmSopFormulir() {
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
            <td colSpan={4}>
              Judul Pekerjaan : PENURUNAN MATERIAL GUDANG WILAYAH
            </td>
          </tr>
          <tr>
            <td colSpan={4}>Bagian : KSA</td>
          </tr>
        </tbody>
      </table>

      <table width='100%' className='table table-bordered'>
        <tbody>
          <tr>
            <th colSpan={5} className='text-center'>
              SOP PEKERJAAN
            </th>
          </tr>
          <tr>
            <th>No</th>
            <th colSpan={3}>Langkah Pekerjaan</th>
            <th colSpan={1} className='text-center'>
              Cek List
            </th>
          </tr>

          <tr>
            <td >1</td>
            <td colSpan={3}>Persiapan</td>
            <td colSpan={1} className='text-center'>
              <div className='checker'>
                <span className='checked'>
                  <input type='checkbox' />
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td >2</td>
            <td colSpan={3}>Safety Briefing</td>
            <td colSpan={1} className='text-center'>
              <div className='checker'>
                <span className='checked'>
                  <input type='checkbox' />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td >3</td>
            <td colSpan={3}>Penurunan Material</td>
            <td colSpan={1} className='text-center'>
              <div className='checker'>
                <span className='checked'>
                  <input type='checkbox' />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td >4</td>
            <td colSpan={3}>Penyusunan Material</td>
            <td colSpan={1} className='text-center'>
              <div className='checker'>
                <span className='checked'>
                  <input type='checkbox' />
                </span>
              </div>
            </td>
          </tr>
          <tr>
            <td >5</td>
            <td colSpan={3}>Penutupan Material</td>
            <td colSpan={1} className='text-center'>
              <div className='checker'>
                <span className='checked'>
                  <input type='checkbox' />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
