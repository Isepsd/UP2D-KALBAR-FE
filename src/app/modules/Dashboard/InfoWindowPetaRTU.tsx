import React from "react";
// import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";

export function InfoWindowPetaRTU({ data }: any) {
  // const [title, setTitle] = useState<any>()

  // useEffect(() => {
  //   setTitle(data?.jenis_laporan === "GANGGUAN" ? "Padam Gangguan" : "Padam Pemeliharaan")
  // }, [data])
  console.log(data)

  return (
    <>
      {data?.peralatan || "-"}
      {/* <div className="text-left  ">
        <h5>{title}</h5>
      </div> */}
      {/* <Table responsive>
        <tbody>
          <tr>
            <td className="text-left"><strong>Peralatan</strong></td>
            <td>:</td>
            <td className="text-left">{data?.peralatan || "-"}</td>

          </tr>
        </tbody>
      </Table> */}
    </>
  )
}