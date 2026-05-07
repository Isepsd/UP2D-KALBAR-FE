import React, { useRef } from 'react';
import { Card } from 'react-bootstrap';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

export default function TabReleProteksi() {
  const myGrid = useRef<JqxGrid>(null);

  const source: any = {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'nama_rele', type: 'string' },
      { name: 'gi', type: 'string' },
      { name: 'merk', type: 'string' },
      { name: 'tipe', type: 'string' },
      { name: 'tgl_kalibrasi', type: 'string' },
      { name: 'status', type: 'string' },
    ],
    datatype: 'local',
    localdata: [
      { id: 'REL-0001', nama_rele: 'Rele OCR #1', gi: 'GI Siantan', merk: 'SEL', tipe: 'SEL-751', tgl_kalibrasi: '2024-01-01', status: 'Aktif' },
      { id: 'REL-0002', nama_rele: 'Rele GFR #2', gi: 'GI Kota Baru', merk: 'Siemens', tipe: '7SJ82', tgl_kalibrasi: '2024-02-04', status: 'Aktif' },
      { id: 'REL-0003', nama_rele: 'Rele Distance #3', gi: 'GI Singkawang', merk: 'ABB', tipe: 'REF615', tgl_kalibrasi: '2024-03-07', status: 'Pemeliharaan' },
      { id: 'REL-0004', nama_rele: 'Rele Differential #4', gi: 'GI Sintang', merk: 'Schneider', tipe: 'P145', tgl_kalibrasi: '2024-04-10', status: 'Aktif' },
      { id: 'REL-0005', nama_rele: 'Rele OCR #5', gi: 'GI Ketapang', merk: 'GE', tipe: 'Multilin 750', tgl_kalibrasi: '2024-05-13', status: 'Aktif' },
      { id: 'REL-0006', nama_rele: 'Rele GFR #6', gi: 'GI Sanggau', merk: 'SEL', tipe: 'SEL-751', tgl_kalibrasi: '2024-06-16', status: 'Gangguan' },
      { id: 'REL-0007', nama_rele: 'Rele Distance #7', gi: 'GI Siantan', merk: 'Siemens', tipe: '7SJ82', tgl_kalibrasi: '2024-07-19', status: 'Aktif' },
      { id: 'REL-0008', nama_rele: 'Rele Differential #8', gi: 'GI Kota Baru', merk: 'ABB', tipe: 'REF615', tgl_kalibrasi: '2024-08-22', status: 'Aktif' },
      { id: 'REL-0009', nama_rele: 'Rele OCR #9', gi: 'GI Singkawang', merk: 'Schneider', tipe: 'P145', tgl_kalibrasi: '2024-09-25', status: 'Pemeliharaan' },
      { id: 'REL-0010', nama_rele: 'Rele GFR #10', gi: 'GI Sintang', merk: 'GE', tipe: 'Multilin 750', tgl_kalibrasi: '2024-10-28', status: 'Aktif' },
    ]
  };

  const dataAdapter = new jqx.dataAdapter(source);

  const columns: IGridProps['columns'] = [
    { text: 'ID Rele', datafield: 'id', width: '10%', cellsrenderer: (r, c, v) => `<div style="padding:15px; color:#005696; font-weight:bold;">${v}</div>` },
    { text: 'Rele Proteksi', datafield: 'nama_rele', width: '20%' },
    { text: 'Gardu Induk', datafield: 'gi', width: '15%' },
    { text: 'Merk', datafield: 'merk', width: '10%' },
    { text: 'Tipe', datafield: 'tipe', width: '15%' },
    { text: 'Kalibrasi Terakhir', datafield: 'tgl_kalibrasi', width: '18%', cellsrenderer: (r, c, v) => `
        <div style="padding:15px 10px; color: #555;">
            <i class="far fa-calendar-alt mr-2 text-muted"></i> ${v}
        </div>` 
    },
    { text: 'Status', datafield: 'status', width: '12%', cellsrenderer: (r, c, v) => {
        const color = v === 'Aktif' ? '#2ecc71' : v === 'Gangguan' ? '#e74c3c' : '#f39c12';
        return `
          <div style="padding: 12px;">
            <div style="background: ${color}11; color: ${color}; border-radius: 20px; text-align: center; font-size: 11px; font-weight: bold; padding: 4px 0; border: 1px solid ${color}33;">
              ● ${v}
            </div>
          </div>`;
    }}
  ];

  return (
    <div>
      {/* JQXGRID SECTION */}
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
          rowsheight={55}
          columnsheight={50}
        />
        
        <div className="p-3 bg-white border-top text-muted">
          <small>Menampilkan <b>11</b> baris data</small>
        </div>
      </Card>
    </div>
  );
}