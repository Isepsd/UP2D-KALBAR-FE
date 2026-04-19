import React from 'react'
import { Table } from 'react-bootstrap'

function GarduDistribusi() {
  return (
    <Table striped bordered>
      <tbody>
        <tr>
          <td><b>Jumlah Gardu</b></td>
          <td>613 Gardu</td>
        </tr>
        <tr>
          <td><b>Jumlah Trafo</b></td>
          <td>613 Trafo</td>
        </tr>
        <tr>
          <td><b>Total Daya</b></td>
          <td>43,267 kVA</td>
        </tr>
        <tr>
          <td><b>Total Jumlah Pelanggan</b></td>
          <td>1 Pelanggan</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default GarduDistribusi