import React, { useRef } from 'react';
import { Card } from 'react-bootstrap';
import ChartKPWilayah from './ChartKPWilayah';
// Import jqxWidgets Grid
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
// Letakkan di bagian atas file AsetKPTab.tsx atau App.tsx
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.bootstrap.css'; // Tambahkan ini

export default function AsetKPTab() {
  const myGrid = useRef<JqxGrid>(null);

  // Data Source Realistis Wilayah UP2D Kalbar
  const source: any = {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'jenis', type: 'string' },
      { name: 'penyulang', type: 'string' },
      { name: 'gi', type: 'string' },
      { name: 'single', type: 'bool' },
      { name: 'status', type: 'string' },
    ],
    datatype: 'local',
    localdata: [
      { id: 'KP-PNK-001', nama: 'LBS Siantan Hilir', jenis: 'LBS Motorized', penyulang: 'PYL-KHATULISTUWA', gi: 'GI Siantan', single: true, status: 'Normal' },
      { id: 'KP-PNK-002', nama: 'Recloser Parit Mayor', jenis: 'Recloser', penyulang: 'PYL-Tanjungpura', gi: 'GI Parit Baru', single: true, status: 'Normal' },
      { id: 'KP-SKW-015', nama: 'LBS Singkawang Tengah', jenis: 'LBS Motorized', penyulang: 'PYL-PASIR PANJANG', gi: 'GI Singkawang', single: true, status: 'Peringatan' },
      { id: 'KP-STG-042', nama: 'Recloser Sintang Kota', jenis: 'Recloser', penyulang: 'PYL-SINTANG 1', gi: 'GI Sintang', single: false, status: 'Normal' },
      { id: 'KP-KTP-008', nama: 'LBS Ketapang Kota', jenis: 'Sectionalizer', penyulang: 'PYL-DELTA', gi: 'GI Ketapang', single: true, status: 'Gangguan' },
      { id: 'KP-SGU-012', nama: 'Recloser Sanggau Kapuas', jenis: 'Recloser', penyulang: 'PYL-SANGGAU 2', gi: 'GI Sanggau', single: true, status: 'Pemeliharaan' },
      { id: 'KP-SBS-003', nama: 'LBS Sambas Jaya', jenis: 'LBS Motorized', penyulang: 'PYL-SAMBAS', gi: 'GI Sambas', single: true, status: 'Normal' },
      { id: 'KP-MMP-021', nama: 'Recloser Mempawah', jenis: 'Recloser', penyulang: 'PYL-MEMPAWAH', gi: 'GI Mempawah', single: false, status: 'Normal' },
      { id: 'KP-PNK-088', nama: 'LBS Untan', jenis: 'LBS Motorized', penyulang: 'PYL-AHMAD YANI', gi: 'GI Parit Baru', single: true, status: 'Normal' },
      { id: 'KP-SKW-009', nama: 'Recloser Roban', jenis: 'Recloser', penyulang: 'PYL-SINGKAWANG KOTA', gi: 'GI Singkawang', single: true, status: 'Peringatan' },
    ]
  };

  const dataAdapter = new jqx.dataAdapter(source);

  // Renderers untuk menyesuaikan tampilan jqxGrid dengan image_58ca1d.png
  const columns: IGridProps['columns'] = [
    { text: 'ID Aset', datafield: 'id', width: '12%', cellsrenderer: (row, column, value) => {
        return `<div style="padding: 12px; color: #005696; font-weight: bold; font-family: sans-serif;">${value}</div>`;
    }},
    { text: 'Key Point', datafield: 'nama', width: '20%' },
    { text: 'Jenis', datafield: 'jenis', width: '15%' },
    { text: 'Penyulang', datafield: 'penyulang', width: '18%' },
    { text: 'Gardu Induk', datafield: 'gi', width: '12%' },
    { text: 'Single Data', datafield: 'single', width: '13%', cellsrenderer: (row, column, value) => {
        const color = value ? '#2ecc71' : '#adb5bd';
        const icon = value ? 'fa-check-circle' : 'fa-times-circle';
        const text = value ? 'Terintegrasi' : 'Belum';
        return `<div style="padding: 12px; color: ${color}; font-weight: 600;"><i class="far ${icon} mr-1"></i> ${text}</div>`;
    }},
    { text: 'Status', datafield: 'status', width: '10%', cellsrenderer: (row, column, value) => {
        const styles: any = {
            'Normal': { bg: '#e9fbf3', text: '#2ecc71' },
            'Peringatan': { bg: '#fff8e1', text: '#ffc107' },
            'Gangguan': { bg: '#ffebee', text: '#e74c3c' },
            'Pemeliharaan': { bg: '#fff4e5', text: '#ff9800' }
        };
        const s = styles[value] || styles['Normal'];
        return `
          <div style="padding: 8px 5px;">
            <div style="background: ${s.bg}; color: ${s.text}; border-radius: 20px; text-align: center; font-size: 11px; font-weight: bold; padding: 4px 0; border: 1px solid ${s.bg}">
              ● ${value}
            </div>
          </div>`;
    }}
  ];

  return (
    <div className="animate__animated animate__fadeIn p-0">
      {/* CARD CHART */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
        <Card.Body className="p-4">
          <div className="mb-3">
            <h5 className="font-weight-bold mb-0" style={{ color: '#2d3436' }}>Tampilan Ratio KP per Wilayah</h5>
            <p className="text-muted small">Perbandingan target vs realisasi pencapaian Key Point</p>
          </div>
          <ChartKPWilayah />
        </Card.Body>
      </Card>

      {/* CARD JQXGRID */}

      
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
          selectionmode={'singlerow'}
          rowsheight={45}
          
        />
        <div className="p-3 bg-light border-top">
          <small className="text-muted font-weight-bold">Menampilkan 10 baris data aset</small>
        </div>
      </Card>
    </div>
  );
}