import React from 'react';
import { Form, Row } from 'react-bootstrap';

import styled from 'styled-components';


const TableStyle = styled.table`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  thead {
    th {
      font-style: normal;
      font-weight: 500;
    }
  }
  tbody {
    td {
      border-bottom: 1px solid var(--black-50) !important;
    }
  }
  th,
  td {
    border-width: 1px;
  }
`;

export default function FormatPesan() {
  return (
    <Row>
      <Form.Group className='mb-3 col-md-3'>
        <Form.Label>Format Pesan</Form.Label>
        <div className='table'>
          <TableStyle className='table'>
            <tbody>
              <tr>
                <td >#enter&nbsp;&nbsp;</td>
                <td >Enter</td>
              </tr>
              <tr>
                <td >#b1&nbsp;&nbsp;</td>
                <td >Nama B1</td>
              </tr>
              <tr>
                <td >#b2&nbsp;&nbsp;</td>
                <td >Nama B2</td>
              </tr>
              <tr>
                <td >#b3&nbsp;&nbsp;</td>
                <td >Nama B3</td>
              </tr>
              <tr>
                <td >#el&nbsp;&nbsp;</td>
                <td >Nama Element</td>
              </tr>
              <tr>
                <td >#info&nbsp;&nbsp;</td>
                <td >Nama Info</td>
              </tr>
              <tr>
                <td >#dtsistem&nbsp;&nbsp;</td>
                <td >Tanggal Sistem</td>
              </tr>
              <tr>
                <td >#stawal&nbsp;&nbsp;</td>
                <td >Status Awal</td>
              </tr>

              <tr>
                <td >#dtawal&nbsp;&nbsp;</td>
                <td >Tanggal Awal</td>
              </tr>
              <tr>
                <td >#stakhir&nbsp;&nbsp;</td>
                <td >Status Akhir</td>
              </tr>
              <tr>
                <td >#dtakhir&nbsp;&nbsp;</td>
                <td >Tanggal Akhir</td>
              </tr>
              <tr>
                <td >#durasi&nbsp;&nbsp;</td>
                <td >Durasi</td>
              </tr>
            </tbody>
          </TableStyle>
        </div>
      </Form.Group>
    </Row>
  );
}
