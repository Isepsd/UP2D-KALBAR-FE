import React, { useRef } from 'react';
import { Card } from 'react-bootstrap';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

export default function TabRectifier() {
  const myGrid = useRef<JqxGrid>(null);

  const source: any = {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'lokasi', type: 'string' },
      { name: 'merk', type: 'string' },
      { name: 'tegangan', type: 'string' },
      { name: 'arus', type: 'string' },
      { name: 'baterai', type: 'number' },
      { name: 'kesehatan', type: 'string' },
    ],
    datatype: 'local',
    localdata: [
      { id: 'RCT-001', lokasi: 'GI Siantan', merk: 'Eltek', tegangan: '108.0 VDC', arus: '12 A', baterai: 85, kesehatan: 'Gangguan' },
      { id: 'RCT-002', lokasi: 'GI Kota Baru', merk: 'Emerson', tegangan: '108.5 VDC', arus: '14 A', baterai: 88, kesehatan: 'Normal' },
      { id: 'RCT-003', lokasi: 'GI Singkawang', merk: 'Delta', tegangan: '109.0 VDC', arus: '16 A', baterai: 91, kesehatan: 'Normal' },
      { id: 'RCT-004', lokasi: 'GI Sintang', merk: 'Benning', tegangan: '109.5 VDC', arus: '18 A', baterai: 94, kesehatan: 'Normal' },
      { id: 'RCT-005', lokasi: 'GI Ketapang', merk: 'Eltek', tegangan: '108.0 VDC', arus: '20 A', baterai: 97, kesehatan: 'Peringatan' },
      { id: 'RCT-006', lokasi: 'GI Sanggau', merk: 'Emerson', tegangan: '108.5 VDC', arus: '22 A', baterai: 85, kesehatan: 'Normal' },
      { id: 'RCT-007', lokasi: 'GI Siantan', merk: 'Delta', tegangan: '109.0 VDC', arus: '24 A', baterai: 88, kesehatan: 'Normal' },
      { id: 'RCT-008', lokasi: 'GI Kota Baru', merk: 'Benning', tegangan: '109.5 VDC', arus: '26 A', baterai: 91, kesehatan: 'Gangguan' },
      { id: 'RCT-009', lokasi: 'GI Singkawang', merk: 'Eltek', tegangan: '108.0 VDC', arus: '28 A', baterai: 94, kesehatan: 'Peringatan' },
    ]
  };

  const dataAdapter = new jqx.dataAdapter(source);

  const columns: IGridProps['columns'] = [
    { text: 'ID Unit', datafield: 'id', width: '10%', cellsrenderer: (r, c, v) => `<div style="padding:15px; color:#005696; font-weight:bold;">${v}</div>` },
    { text: 'Gardu Induk', datafield: 'lokasi', width: '18%' },
    { text: 'Merk', datafield: 'merk', width: '15%' },
    { text: 'Tegangan Output', datafield: 'tegangan', width: '15%' },
    { text: 'Arus', datafield: 'arus', width: '10%' },
    { text: 'Backup Baterai', datafield: 'baterai', width: '20%', cellsrenderer: (r, c, v) => {
        const color = v >= 90 ? '#2ecc71' : '#f39c12';
        return `
        <div style="padding:15px 10px; display: flex; align-items: center;">
            <div style="flex-grow: 1; height: 6px; background:#eee; border-radius: 10px; overflow: hidden; margin-right: 10px;">
                <div style="width: ${v}%; height: 100%; background: ${color};"></div>
            </div>
            <div style="font-size:11px; width: 30px;">${v}%</div>
        </div>`;
    }},
    { text: 'Kesehatan', datafield: 'kesehatan', width: '12%', cellsrenderer: (r, c, v) => {
        const isNormal = v === 'Normal';
        const isGangguan = v === 'Gangguan';
        const color = isNormal ? '#2ecc71' : isGangguan ? '#e74c3c' : '#f39c12';
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
      {/* 1. KESEHATAN SYSTEM CARD */}
      <Card className="border shadow-sm mb-4" style={{ borderRadius: '12px' }}>
        <Card.Body className="p-3 d-flex align-items-center">
          <div 
            className="d-flex align-items-center justify-content-center mr-3" 
            style={{ width: '50px', height: '50px', backgroundColor: '#e9fbf3', borderRadius: '8px', color: '#2ecc71' }}
          >
            <i className="fas fa-microchip fa-lg"></i>
          </div>
          <div>
            <div className="text-muted small">Kesehatan Sistem Rectifier</div>
            <div className="d-flex align-items-baseline">
                <h3 className="mb-0 font-weight-bold mr-2">56%</h3>
                <small className="text-muted">(5 dari 9 unit normal)</small>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 2. JQXGRID SECTION */}
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
          columnsheight={45}
        />
        <div className="p-3 bg-white border-top text-muted">
          <small>Menampilkan <b>9</b> baris data</small>
        </div>
      </Card>
    </div>
  );
}