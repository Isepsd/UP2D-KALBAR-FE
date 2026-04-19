import React from 'react'

export default function WmApprovalDetailForm({
  isSelect = true
}: any) {
  return (
    <form className="form" id="form">
      <table width="100%">
        <tbody>
          <tr>
            <td width="30%">Jenis Pekerjaan</td>
            <td width="70%">: EXTERNAL</td>
            <input type="hidden" value="202012231704411608983227" id="idwpon" />
          </tr>
          <tr>
            <td width="20%">Pekerjaan yg akan dilakukan</td>
            <td width="80%">: PEMINDAHAN MATERIAL BARU KE GUDANG WILAYAH</td>
          </tr>
          <tr>
            <td width="20%">Referensi SOP dan JSA</td>
            <td width="80%">: PENURUNAN MATERIAL GUDANG WILAYAH</td>
          </tr>
          <tr>
            <td width="20%">Detail Lokasi Pekerjaan</td>
            <td width="80%">: GUDANG UP2D DI WILAYAH</td>
          </tr>
          <tr>
            <td width="20%">Bagian</td>
            <td width="80%">: KSA</td>
          </tr>
          <tr>
            <td width="20%">Nama User / Direksi Pekerjaan</td>
            <td width="80%">: RISNAYANI</td>
          </tr>
          <tr>
            <td width="20%">Jabatan</td>
            <td width="80%">: MANAGER BAGIAN KSA</td>
          </tr>
          <tr>
            <td width="20%">Nama Pengawas</td>
            <td width="80%">: CITRA YULIA ROSANTIKA</td>
          </tr>
          <tr>
            <td width="20%">Nama Pengawas K3</td>
            <td width="80%">: HUSNI</td>
          </tr>
          <tr>
            <td width="20%">Unit / Vendor Pelaksana</td>
            <td width="80%">: PT. PLN (Persero) UP2D Kalimantan Barat</td>
          </tr>
          <tr>
            <td width="20%">Nama Koordinator Vendor</td>
            <td width="80%">: WAHYUDI</td>
          </tr>
          <tr>
            <td width="20%">Nama Pekerja</td>
            <td width="80%">
              <table>
                <tbody>
                  <tr>
                    <td className="td" style={{ padding: '2px 50px 2px 3px' }}>1. WAHYUDI</td>
                    <td className="td" style={{ padding: '2px 50px 2px 3px' }}>2. JOKO</td>
                    <td className="td" style={{ padding: '2px 50px 2px 3px' }}>3. AMIN</td>
                  </tr>
                  <tr>
                    <td className="td" style={{ padding: '2px 50px 2px 3px' }}>4. BAGUS</td>
                    <td className="td" style={{ padding: '2px 50px 2px 3px' }}>
                      5. SYAHRONI
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td width="20%">Tanggal dan Waktu Mulai Pekerjaan</td>
            <td width="80%">: 24-DECEMBER -2020</td>
          </tr>
          <tr>
            <td width="20%">Tanggal dan Waktu Selesai Pekerjaan</td>
            <td width="80%">: 27-DECEMBER -2020</td>
          </tr>
          <tr>
            <td width="20%">Petugas Zona Kerja</td>
            <td width="80%">: , Petugas Rayon</td>
          </tr>
          <tr>
            <td width="20%">Perlu Manuver / Padam 20 kv</td>
            <td width="80%">: TIDAK</td>
          </tr>
          <tr>
            <td width="20%">Perlu Grounding</td>
            <td width="70%" height="80%">: TIDAK</td>
          </tr>
          <tr>
            <td width="20%">Status Persetujuan</td>
            <td width="70%" height="80%">
              {isSelect &&
                <select id="statusetuju" style={{ width: '150px' }}>
                  <option value="">PILIH STATUS</option>
                  <option value="1">YA</option>
                  <option value="0">TIDAK</option>
                </select>
              }
              {!isSelect &&
                <>
                  YA
                </>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </form>

  )
}
