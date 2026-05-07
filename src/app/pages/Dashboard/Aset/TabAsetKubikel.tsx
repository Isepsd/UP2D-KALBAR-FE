import React, { useRef } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

export default function AsetKubikelTab() {
  const myGrid = useRef<JqxGrid>(null);

  // Data source sesuai dengan tampilan gambar
  const source: any = {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'merk', type: 'string' },
      { name: 'seri', type: 'string' },
      { name: 'tipe', type: 'string' },
      { name: 'gi_terkait', type: 'string' },
      { name: 'tahun', type: 'string' },
      { name: 'status', type: 'string' },
    ],
    datatype: 'local',
    localdata: [
      { id: 'KBK-0001', merk: 'Schneider', seri: 'SM6-1000', tipe: 'Incoming', gi_terkait: 'GI Siantan', tahun: '2015', status: 'Normal' },
      { id: 'KBK-0002', merk: 'ABB', seri: 'SM6-1017', tipe: 'Outgoing', gi_terkait: 'GI Kota Baru', tahun: '2016', status: 'Normal' },
      { id: 'KBK-0003', merk: 'Siemens', seri: 'SM6-1034', tipe: 'Metering', gi_terkait: 'GI Singkawang', tahun: '2017', status: 'Pemeliharaan' },
      { id: 'KBK-0004', merk: 'Areva', seri: 'SM6-1051', tipe: 'Coupling', gi_terkait: 'GI Sintang', tahun: '2018', status: 'Normal' },
      { id: 'KBK-0005', merk: 'Schneider', seri: 'SM6-1068', tipe: 'Incoming', gi_terkait: 'GI Ketapang', tahun: '2019', status: 'Normal' },
      { id: 'KBK-0006', merk: 'ABB', seri: 'SM6-1085', tipe: 'Outgoing', gi_terkait: 'GI Sanggau', tahun: '2020', status: 'Normal' },
      { id: 'KBK-0007', merk: 'Siemens', seri: 'SM6-1102', tipe: 'Metering', gi_terkait: 'GI Siantan', tahun: '2021', status: 'Pemeliharaan' },
      { id: 'KBK-0008', merk: 'Areva', seri: 'SM6-1119', tipe: 'Coupling', gi_terkait: 'GI Kota Baru', tahun: '2022', status: 'Normal' },
      { id: 'KBK-0009', merk: 'Schneider', seri: 'SM6-1136', tipe: 'Incoming', gi_terkait: 'GI Singkawang', tahun: '2023', status: 'Normal' },
      { id: 'KBK-0010', merk: 'ABB', seri: 'SM6-1153', tipe: 'Outgoing', gi_terkait: 'GI Sintang', tahun: '2015', status: 'Normal' },
    ]
  };

  const dataAdapter = new jqx.dataAdapter(source);

  const columns: IGridProps['columns'] = [
    { text: 'ID Kubikel', datafield: 'id', width: '12%', cellsrenderer: (row, column, value) => {
        return `<div style="padding: 12px; color: #005696; font-weight: bold;">${value}</div>`;
    }},
    { text: 'Merk', datafield: 'merk', width: '15%' },
    { text: 'Seri', datafield: 'seri', width: '15%' },
    { text: 'Tipe', datafield: 'tipe', width: '15%' },
    { text: 'Gardu Induk', datafield: 'gi_terkait', width: '20%' },
    { text: 'Tahun Operasi', datafield: 'tahun', width: '13%' },
    { text: 'Status', datafield: 'status', width: '10%', cellsrenderer: (row, column, value) => {
        const isNormal = value === 'Normal';
        const bg = isNormal ? '#e9fbf3' : '#fff8e1';
        const txt = isNormal ? '#2ecc71' : '#ffc107';
        return `
          <div style="padding: 8px;">
            <div style="background: ${bg}; color: ${txt}; border-radius: 20px; text-align: center; font-size: 11px; font-weight: bold; padding: 4px 0; border: 1px solid ${bg}">
              ● ${value}
            </div>
          </div>`;
    }}
  ];

  return (
    <div>
      {/* 1. STATS CARDS (Header) */}
      <Row className="mb-3">
        {[
          { label: 'Total Kubikel', value: '10' },
          { label: 'Schneider', value: '3' },
          { label: 'ABB', value: '3' },
          { label: 'Pemeliharaan', value: '2' }
        ].map((stat, idx) => (
          <Col key={idx} md={3}>
            <Card className="border-0 shadow-sm" style={{ borderRadius: '8px', backgroundColor: '#f8fafd' }}>
              <Card.Body className="p-3">
                <div className="text-muted small font-weight-bold mb-1">{stat.label}</div>
                <h3 className="mb-0 font-weight-bold" style={{ color: '#005696' }}>{stat.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 2. JQXGRID (Main Content) */}
      <Card className="border-0 shadow-sm p-3" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <style>{`
        /* Sembunyikan semua border vertikal */
        .jqx-grid-column-header, 
        .jqx-grid-cell, 
        .jqx-widget-content,
        .jqx-grid-header {
            border-right: none !important;
            border-left: none !important;
        }

        /* Haluskan border horizontal */
        .jqx-grid-cell {
            border-bottom: 1px solid #f2f2f2 !important;
        }

        /* Styling Header */
        .jqx-grid-header {
            border-bottom: 1px solid #eeeeee !important;
        }

        .jqx-grid-column-header {
            font-weight: bold !important;
            color: #444 !important;
        }

        /* Hilangkan border luar wrapper */
        .jqx-widget, .jqx-grid {
            border: none !important;
        }

        /* Warna hover baris */
        .jqx-fill-state-hover {
            background-color: #f9f9f9 !important;
        }

        /* Styling Input Filter Row */
        .jqx-grid-filter-row {
            border-right: none !important;
            border-left: none !important;
            background-color: #ffffff !important;
        }
        
        .jqx-input {
            border: 1px solid #e0e0e0 !important;
            border-radius: 4px !important;
        }
        `}</style>

        <JqxGrid
          ref={myGrid}
          width={'100%'}
          autoheight={true}
          source={dataAdapter}
          columns={columns}
          theme={'bootstrap'}
          columnsresize={true}
          sortable={true}
          filterable={true}
          showfilterrow={true}
          rowsheight={50}
          columnsheight={45}
        />
        
        {/* Footer info jumlah data */}
        <div className="p-3 bg-white border-top">
          <small className="text-muted">Menampilkan <b>10</b> baris data</small>
        </div>
      </Card>
    </div>
  );
}