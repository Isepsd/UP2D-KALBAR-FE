import React from 'react';

export default function FormatPesan() {
  return (
    <table>
      <tbody>
        <tr>
          <td colSpan={5} >
            Format Pesan :&nbsp;&nbsp;
          </td>
        </tr>
        <tr>
          <td >#enter&nbsp; : &nbsp;</td>
          <td >Enter</td>
          <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; </td>
          <td >#b1&nbsp; : &nbsp;</td>
          <td >Nama B1</td>
        </tr>
        <tr>
          <td >#b2&nbsp; : &nbsp;</td>
          <td >Nama B2</td>
          <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; </td>
          <td >#b3&nbsp; : &nbsp;</td>
          <td >Nama B3</td>
        </tr>
        <tr>
          <td >#el&nbsp; : &nbsp;</td>
          <td >Nama Element</td>
          <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; </td>
          <td >#info&nbsp; : &nbsp;</td>
          <td >Nama Info</td>
        </tr>
        <tr>
          <td >#dtsistem&nbsp; : &nbsp;</td>
          <td >Tanggal Sistem</td>
          <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; </td>
          <td >#stawal&nbsp; : &nbsp;</td>
          <td >Status Awal</td>
        </tr>
        <tr>
          <td >#dtawal&nbsp; : &nbsp;</td>
          <td >Tanggal Awal</td>
          <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; </td>
          <td >#stakhir&nbsp; : &nbsp;</td>
          <td >Status Akhir</td>
        </tr>
        <tr>
          <td >#dtakhir&nbsp; : &nbsp;</td>
          <td >Tanggal Akhir</td>
          <td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp; </td>
          <td >#durasi&nbsp; : &nbsp;</td>
          <td >Durasi</td>
        </tr>
      </tbody>
    </table>
  );
}
