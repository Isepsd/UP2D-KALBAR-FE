import React, { useRef, useState } from 'react';
import { Row, Col, Card, Nav, Badge } from 'react-bootstrap';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

export default function PenyulangTab() {
  const myGrid = useRef<JqxGrid>(null);
  const [activeWilayah, setActiveWilayah] = useState('Sungai Raya');

  const wilayahList = ['Sungai Raya', 'Pontianak Kota', 'Singkawang', 'Sintang', 'Ketapang', 'Sambas', 'Sanggau', 'Mempawah'];

  const source: any = {
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'nama', type: 'string' },
      { name: 'gi', type: 'string' },
      { name: 'konfigurasi', type: 'string' },
      { name: 'panjang', type: 'string' },
      { name: 'open_point', type: 'string' },
      { name: 'close_point', type: 'string' },
      { name: 'beban', type: 'number' },
      { name: 'status', type: 'string' },
    ],
    datatype: 'local',
    localdata: [
      { id: 'PYL-001', nama: 'Sungai Raya', gi: 'GI Siantan', konfigurasi: 'Radial', panjang: '15.0 kms', open_point: 'LBS-101', close_point: 'RC-201', beban: 40, status: 'Normal' },
      { id: 'PYL-002', nama: 'Pontianak Kota', gi: 'GI Kota Baru', konfigurasi: 'Loop / Ring', panjang: '19.7 kms', open_point: 'LBS-104', close_point: 'RC-206', beban: 46, status: 'Normal' },
      { id: 'PYL-003', nama: 'Singkawang', gi: 'GI Singkawang', konfigurasi: 'Spindle', panjang: '24.4 kms', open_point: 'LBS-107', close_point: 'RC-211', beban: 52, status: 'Peringatan' },
      { id: 'PYL-004', nama: 'Sintang', gi: 'GI Sintang', konfigurasi: 'Radial', panjang: '29.1 kms', open_point: 'LBS-110', close_point: 'RC-216', beban: 58, status: 'Normal' },
      { id: 'PYL-005', nama: 'Ketapang', gi: 'GI Ketapang', konfigurasi: 'Radial', panjang: '33.8 kms', open_point: 'LBS-113', close_point: 'RC-221', beban: 64, status: 'Normal' },
      { id: 'PYL-006', nama: 'Sambas', gi: 'GI Sanggau', konfigurasi: 'Loop / Ring', panjang: '38.5 kms', open_point: 'LBS-116', close_point: 'RC-226', beban: 70, status: 'Gangguan' },
    ]
  };

  const dataAdapter = new jqx.dataAdapter(source);

  const columns: IGridProps['columns'] = [
    { text: 'ID', datafield: 'id', width: '8%', cellsrenderer: (r, c, v) => `<div style="padding:15px; color:#005696; font-weight:bold;">${v}</div>` },
    { text: 'Penyulang', datafield: 'nama', width: '15%' },
    { text: 'Gardu Induk', datafield: 'gi', width: '12%' },
    { text: 'Konfigurasi', datafield: 'konfigurasi', width: '12%', cellsrenderer: (r, c, v) => {
        const icon = v === 'Radial' ? 'fa-share-alt' : 'fa-sync';
        return `<div style="padding:10px;"><span class="badge badge-light border text-muted p-2"><i class="fas ${icon} mr-1"></i> ${v}</span></div>`;
    }},
    { text: 'Panjang', datafield: 'panjang', width: '10%' },
    { text: 'Open Point', datafield: 'open_point', width: '13%', cellsrenderer: (r, c, v) => `
        <div style="padding:8px 12px;">
            <div style="font-weight:bold; color:#333;"><span style="color:#fbc02d">●</span> ${v}</div>
            <div style="font-size:10px; color:#999;">Titik manuver terbuka</div>
        </div>` 
    },
    { text: 'Close Point', datafield: 'close_point', width: '13%', cellsrenderer: (r, c, v) => `
        <div style="padding:8px 12px;">
            <div style="font-weight:bold; color:#333;"><span style="color:#2ecc71">●</span> ${v}</div>
            <div style="font-size:10px; color:#999;">Titik suplai aktif</div>
        </div>` 
    },
    { text: 'Beban', datafield: 'beban', width: '10%', cellsrenderer: (r, c, v) => {
        let colorClass = 'bg-success';
        if (v > 70) colorClass = 'bg-danger';
        else if (v > 50) colorClass = 'bg-warning';
        return `
        <div style="padding:15px 10px;">
            <div class="progress" style="height: 6px; background:#eee;">
                <div class="progress-bar ${colorClass}" style="width: ${v}%"></div>
            </div>
            <div style="font-size:10px; text-align:right; margin-top:4px;">${v}%</div>
        </div>`;
    }},
    { text: 'Status', datafield: 'status', width: '7%', cellsrenderer: (r, c, v) => {
        const color = v === 'Normal' ? '#2ecc71' : v === 'Gangguan' ? '#e74c3c' : '#f39c12';
        return `<div style="padding:12px;"><span style="border:1px solid ${color}33; background:${color}11; color:${color}; padding:4px 10px; border-radius:15px; font-size:11px; font-weight:bold;">● ${v}</span></div>`;
    }}
  ];

  return (
    <div>
      {/* 1. INFO BOX (Persis Gambar) */}
        <div 
        className="d-flex align-items-center mb-4 shadow-sm" 
        style={{ 
            backgroundColor: '#f0f7ff', 
            border: '1px solid #d0e3ff', 
            borderRadius: '10px', 
            padding: '12px 20px',
            fontSize: '13.5px',
            color: '#444'
        }}
        >
        <i className="fas fa-info-circle text-primary mr-3" style={{ fontSize: '16px' }}></i>
        
        <div className="ml-2" style={{ fontSize: '12px' }}>
            Konfigurasi <strong>Loop / Ring</strong> memberi suplai dua arah untuk keandalan tinggi. 
            Titik <strong>Open Point</strong> adalah saklar normal terbuka (titik manuver), 
            <strong> Close Point</strong> adalah saklar normal tertutup yang membawa beban aktif.
        </div>

        <div className="d-flex align-items-center ml-3" style={{ borderLeft: '1px solid #d0e3ff', paddingLeft: '20px' }}>
            <div className="d-flex align-items-center mr-3">
            <span style={{ 
                width: '12px', 
                height: '12px', 
                backgroundColor: '#fbc02d', 
                borderRadius: '50%', 
                display: 'inline-block', 
                marginRight: '8px',
                border: '1px solid #fbc02d'
            }}></span>
            <span>Open</span>
            </div>
            <div className="d-flex align-items-center">
            <div style={{ 
                width: '12px', 
                height: '12px', 
                border: '2px solid #2ecc71', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginRight: '8px'
            }}>
                <div style={{ width: '4px', height: '4px', backgroundColor: '#2ecc71', borderRadius: '50%' }}></div>
            </div>
            <span>Close</span>
            </div>
        </div>
        </div>

      {/* 2. TAB NAVIGASI WILAYAH */}
      <Nav variant="pills" className="mb-4 bg-white p-2 shadow-sm" style={{ borderRadius: '8px' }}>
        {wilayahList.map((w) => (
          <Nav.Item key={w}>
            <Nav.Link 
              active={activeWilayah === w} 
              onClick={() => setActiveWilayah(w)}
              className="px-4 py-2"
              style={{ cursor: 'pointer', borderRadius: '6px' }}
            >
              {w}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* 3. SKEMA KONFIGURASI JARINGAN */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '15px' }}>
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
                <h6 className="text-primary font-weight-bold small mb-1">SKEMA KONFIGURASI JARINGAN</h6>
                <h4 className="font-weight-bold">{activeWilayah} <span className="text-muted font-weight-normal" style={{fontSize:'16px'}}>· Radial</span></h4>
            </div>
            {/* FIX: Variant diganti menjadi BG */}
            <Badge bg="success" className="px-3 py-2" style={{ borderRadius: '20px' }}>● Normal</Badge>
          </div>

          <div className="py-5 border rounded-lg bg-white d-flex align-items-center justify-content-center position-relative mb-4">
            <div className="text-center mx-4">
                <div className="bg-primary text-white rounded mb-2 d-flex align-items-center justify-content-center" style={{width:60, height:60}}>
                    <i className="fas fa-bolt fa-2x"></i>
                </div>
                <small className="font-weight-bold">GI Siantan</small>
            </div>
            
            {[1, 2, 3, 4].map((i) => (
                <React.Fragment key={i}>
                    <div style={{width: 60, height: 2, background: '#005696'}}></div>
                    <div className="text-center mx-2">
                        <div className="border border-success rounded-circle d-flex align-items-center justify-content-center bg-white" style={{width:45, height:45, borderWidth:'2px'}}>
                             <div className="bg-success rounded-circle" style={{width:10, height:10}}></div>
                        </div>
                        <small className="d-block mt-2 font-weight-bold text-muted" style={{fontSize:10}}>{i % 2 === 0 ? `REC-${i/2}` : `LBS-${(i+1)/2}`}</small>
                    </div>
                </React.Fragment>
            ))}
            <div className="ml-3 text-muted italic small">end of line</div>
          </div>

          <Row>
            {[
                { label: 'OPEN POINT', val: 'LBS-101', color: '#fbc02d' },
                { label: 'CLOSE POINT', val: 'RC-201', color: '#2ecc71' },
                { label: 'PANJANG SALURAN', val: '15.0 kms', color: '#333' },
                { label: 'BEBAN AKTUAL', val: '40%', color: '#333' }
            ].map((item, idx) => (
                <Col key={idx} md={3}>
                    <div className="p-3 border rounded">
                        <small className="text-muted font-weight-bold d-block mb-2">{item.label}</small>
                        <h6 className="mb-0 font-weight-bold">
                            {idx < 2 && <span className="mr-1" style={{color:item.color}}>●</span>}
                            {item.val}
                        </h6>
                    </div>
                </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* 4. JQXGRID SECTION */}
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
          rowsheight={65}
          columnsheight={50}
        />
        <div className="p-3 bg-white border-top">
          <small className="text-muted">Menampilkan <b>8</b> baris data</small>
        </div>
      </Card>
    </div>
  );
}