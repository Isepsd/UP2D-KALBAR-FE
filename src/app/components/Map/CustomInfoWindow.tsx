import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export function CustomInfoWindow({ data }: any) {
  const [title, setTitle] = useState<any>()

  useEffect(() => {
    setTitle(data?.jenis_laporan === "GANGGUAN" ? "Padam Gangguan" : "Padam Pemeliharaan")
  }, [data])

  return (
    <>
      <div className="text-left  ">
        <h5>{title}</h5>
      </div>
      <Table responsive>
        {/* <thead>
          <tr>
            <th></th>
            <th></th>

          </tr>
        </thead> */}
        <tbody>
          <tr>
            <td width={50} className="text-left"><strong>Area PLN</strong></td>
            <td width={10}>:</td>
            <td className="text-left">{data?.ulp || "-"}</td>

          </tr>
          <tr>
            <td className="text-left"><strong>Gardu</strong></td>
            <td>:</td>
            <td className="text-left">{data?.gardu || "-"}</td>

          </tr>
          <tr>
            <td className="text-left"><strong>Alamat</strong></td>
            <td>:</td>
            <td className="text-left">{data?.alamat || "-"}</td>

          </tr>
          <tr>
            <td className="text-left"><strong>Penyulang</strong></td>
            <td>:</td>
            <td className="text-left">{data?.penyulang || "-"}</td>

          </tr>
          <tr>
            <td className="text-left"><strong>GI</strong></td>
            <td>:</td>
            <td className="text-left">{data?.gi || "-"}</td>

          </tr>
          <tr>
            <td className="text-left"><strong>Terdampak</strong></td>
            <td>:</td>
            <td className="text-left">{data?.jumlah_pelanggan || "0"} Pelanggan</td>

          </tr>
          <tr>
            <td colSpan={3}><strong>* Informasi Lebih Lanjut Hub. Contact Center 123</strong></td>


          </tr>

        </tbody>
      </Table>
    </>
  )
}