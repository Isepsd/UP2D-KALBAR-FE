import React, { useRef, useState } from 'react';
import { Card, Nav, Button, Badge, Modal, Row, Col, ProgressBar, Form } from 'react-bootstrap';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxChart, { IChartProps } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxchart';

export default function AnomaliMonitoring() {
  const myGrid = useRef<JqxGrid>(null);
  
  // Filter Bulan & Tahun (Default ke bulan berjalan)[cite: 1]
  const [filterDate, setFilterDate] = useState({
    bulan: 5, 
    tahun: 2026
  });

  const [activeTab, setActiveTab] = useState<string>('monitoring');
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const daftarBulan = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  // 1. DATA SOURCE (Bahasa Indonesia Standar PLN)[cite: 1]
  const source: any = {
    datafields: [
      { name: 'id_tiket', type: 'string' },
      { name: 'peralatan', type: 'string' },
      { name: 'lokasi', type: 'string' },
      { name: 'kategori', type: 'string' },
      { name: 'prioritas', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'waktu_lapor', type: 'date' },
      { name: 'durasi_string', type: 'string' }, // Pengganti aging_string
      { name: 'durasi_menit', type: 'number' }, // Pengganti aging_minutes
      { name: 'deskripsi', type: 'string' },
      { name: 'pelaksana', type: 'string' }
    ],
    datatype: 'local',
    localdata: [
      { id_tiket: 'ANO/UP2D-KB/05/010', peralatan: 'RTU Schneider', lokasi: 'GI Siantan', kategori: 'Putus Komunikasi', prioritas: 'Darurat', status: 'Open', waktu_lapor: new Date(2026, 4, 5, 9, 15), durasi_string: '8j 31m', durasi_menit: 511, deskripsi: 'Indikasi modul CPU hang, butuh reset.', pelaksana: '-' },
      { id_tiket: 'ANO/UP2D-KB/05/011', peralatan: 'Rectifier 110VDC', lokasi: 'GI Ketapang', kategori: 'Tegangan Rendah', prioritas: 'Darurat', status: 'In Progress', waktu_lapor: new Date(2026, 4, 5, 7, 30), durasi_string: '10j 16m', durasi_menit: 616, deskripsi: 'Tegangan busbar drop ke 105V.', pelaksana: 'TIM HAR SCADA' },
      { id_tiket: 'ANO/UP2D-KB/05/009', peralatan: 'Modem FO', lokasi: 'GI Tayan', kategori: 'Link Putus', prioritas: 'Normal', status: 'Resolved', waktu_lapor: new Date(2026, 4, 4, 14, 20), durasi_string: '27j 26m', durasi_menit: 1646, deskripsi: 'Pelemahan sinyal FO arah Singkawang.', pelaksana: 'ISEP' },
    ]
  };

  // 2. CHART OPTIONS[cite: 1]
  const chartOptions: IChartProps = {
    title: "", description: "", 
    source: [
        { minggu: 'Minggu 1', Open: 5, Resolved: 10, total: 15 },
        { minggu: 'Minggu 2', Open: 8, Resolved: 15, total: 23 },
        { minggu: 'Minggu 3', Open: 4, Resolved: 12, total: 16 },
        { minggu: 'Minggu 4', Open: 7, Resolved: 18, total: 25 },
    ],
    xAxis: { dataField: 'minggu', gridLines: { visible: false } },
    colorScheme: 'scheme01',
    showBorderLine: false,
    backgroundColor: 'transparent',
    renderEngine: 'HTML5',
    seriesGroups: [{
        type: 'spline',
        series: [
          { dataField: 'total', displayText: 'Total Gangguan', lineWidth: 4, symbolType: 'circle', lineColor: '#343a40', fillColor: '#343a40' },
          { dataField: 'Resolved', displayText: 'Resolved', lineWidth: 2, symbolType: 'diamond', lineColor: '#2ecc71', fillColor: '#2ecc71' },
          { dataField: 'Open', displayText: 'Open', lineWidth: 2, symbolType: 'circle', lineColor: '#dc3545', fillColor: '#dc3545' },
        ]
    }]
  };

  // 3. KOLOM GRID (Menampilkan Lama Penanganan)[cite: 1]
  const columns: IGridProps['columns'] = [
    { text: 'ID TIKET', datafield: 'id_tiket', width: '15%', cellsrenderer: (r, c, v) => `<div style="padding:10px 5px; font-weight:bold; color:#005696; font-size:11px;">${v}</div>` },
    { text: 'PERALATAN', datafield: 'peralatan', width: '15%', cellsrenderer: (r, c, v) => `<div style="padding:10px 5px; font-size:12px;">${v}</div>` },
    { 
        text: 'WAKTU LAPOR', datafield: 'waktu_lapor', width: '15%', 
        cellsrenderer: (r, c, v) => {
            const d = new Date(v);
            return `<div style="padding:4px 5px; line-height:1.2; font-size:11px;"><div>${d.toLocaleDateString('id-ID')}</div><div class="text-muted">${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')} WIB</div></div>`;
        }
    },
    { text: 'DURASI', datafield: 'durasi_string', width: '10%', cellsrenderer: (r, c, v) => `<div style="padding:10px 5px; font-size:12px;">${v}</div>` },
    { text: 'STATUS', datafield: 'status', width: '15%', cellsrenderer: (r, c, v) => `<div style="padding:10px 5px; font-weight:bold; font-size:11px; color:${v === 'Resolved' ? '#2ecc71' : (v === 'Open' ? '#dc3545' : '#f39c12')}">● ${v}</div>` },
    { text: 'PROGRES SLA', width: '20%', cellsrenderer: (row, c, v, d, p, data) => {
        const pct = Math.min((data.durasi_menit / 1440) * 100, 100);
        return `<div style="padding:15px 5px;"><div class="progress" style="height:5px"><div class="progress-bar ${pct > 80 ? 'bg-danger' : 'bg-primary'}" style="width:${pct}%"></div></div></div>`;
    }},
    { text: 'AKSI', width: '10%', cellsrenderer: (row) => `<div style="padding:7px 0; text-align:center;"><button class="btn btn-xs btn-outline-primary btn-detail" style="padding:2px 8px; font-size:10px;" data-row="${row}">Detail</button></div>` }
  ];

  return (
    <div onClick={(e: any) => {
      if (e.target.classList.contains('btn-detail')) {
        setSelectedData(myGrid.current?.getrowdata(e.target.getAttribute('data-row')));
        setShowModal(true);
      }
    }}>
      <style>{`
          svg text:last-child { display: none !important; }
          .icon-box { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-right: 12px; }
          .bg-soft-danger { background-color: #fdeaea; color: #dc3545; }
          .bg-soft-warning { background-color: #fff4e5; color: #ff9800; }
          .bg-soft-success { background-color: #eaf7ee; color: #2ecc71; }
          .stat-card-v2 { border: 1px solid #eef0f2 !important; border-radius: 12px; background: #fff; }
         
          .filter-select { border-radius: 8px; border: 1px solid #ddd; font-weight: 600; color: #444; }

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

      {/* HEADER & FILTERS[cite: 1] */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="font-weight-bold mb-0">Monitoring Anomali Aset UP2D Kalimantan Barat</h4>
          <p className="text-muted small mb-0">Periode Laporan: {daftarBulan[filterDate.bulan - 1]} {filterDate.tahun}</p>
        </div>
        <div className="d-flex gap-2">
          <Form.Select 
            className="filter-select shadow-sm" 
            value={filterDate.bulan}
            onChange={(e) => setFilterDate({...filterDate, bulan: parseInt(e.target.value)})}
          >
            {daftarBulan.map((b, i) => <option key={i} value={i+1}>{b}</option>)}
          </Form.Select>
          <Form.Select 
            className="filter-select shadow-sm"
            value={filterDate.tahun}
            onChange={(e) => setFilterDate({...filterDate, tahun: parseInt(e.target.value)})}
          >
            <option value={2026}>2026</option>
            <option value={2025}>2025</option>
          </Form.Select>
          <Button variant="primary" className="rounded-pill px-4 shadow-sm">Terapkan</Button>
        </div>
      </div>

      {/* SECTION 1: KARTU STATISTIK UTAMA[cite: 1] */}
      <Row className="mb-3">
        <Col md={3}><Card className="border-0 shadow-sm bg-primary text-white"><Card.Body><small className="opacity-75 d-block mb-1 text-uppercase font-weight-bold small">Total Temuan</small><h3 className="font-weight-bold mb-0">84</h3></Card.Body></Card></Col>
        <Col md={3}><Card className="border-0 shadow-sm bg-success text-white"><Card.Body><small className="opacity-75 d-block mb-1 text-uppercase font-weight-bold small">Persentase Resolved</small><h3 className="font-weight-bold mb-0">86%</h3></Card.Body></Card></Col>
        <Col md={3}><Card className="border-0 shadow-sm bg-warning text-dark"><Card.Body><small className="opacity-75 d-block mb-1 text-uppercase font-weight-bold small">Lewat Batas SLA</small><h3 className="font-weight-bold mb-0">3 <small style={{fontSize:'14px'}}>Tiket</small></h3></Card.Body></Card></Col>
        <Col md={3}><Card className="border-0 shadow-sm bg-dark text-white"><Card.Body><small className="opacity-75 d-block mb-1 text-uppercase font-weight-bold small">MTTR (Rata-rata Perbaikan)</small><h3 className="font-weight-bold mb-0">2.1 <small style={{fontSize:'14px'}}>Jam</small></h3></Card.Body></Card></Col>
      </Row>

      {/* SECTION 2: STATUS PEKERJAAN[cite: 1] */}
      <Row className="mb-4">
        <Col md={4}><Card className="stat-card-v2 shadow-sm border-0"><Card.Body className="d-flex align-items-center p-3"><div className="icon-box bg-soft-danger"><i className="fas fa-bolt"></i></div><div><small className="text-muted font-weight-bold d-block text-uppercase small">Open</small><h4 className="font-weight-bold mb-0">12</h4></div></Card.Body></Card></Col>
        <Col md={4}><Card className="stat-card-v2 shadow-sm border-0"><Card.Body className="d-flex align-items-center p-3"><div className="icon-box bg-soft-warning"><i className="fas fa-tools"></i></div><div><small className="text-muted font-weight-bold d-block text-uppercase small">In Progress</small><h4 className="font-weight-bold mb-0">8</h4></div></Card.Body></Card></Col>
        <Col md={4}><Card className="stat-card-v2 shadow-sm border-0"><Card.Body className="d-flex align-items-center p-3"><div className="icon-box bg-soft-success"><i className="fas fa-check-double"></i></div><div><small className="text-muted font-weight-bold d-block text-uppercase small">Resolved</small><h4 className="font-weight-bold mb-0">64</h4></div></Card.Body></Card></Col>
      </Row>

      <Row className="mb-4">
        {/* TREN GRAFIK[cite: 1] */}
        <Col md={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="font-weight-bold mb-3 text-muted small text-uppercase">Tren Temuan Anomali Bulanan</h6>
              <JqxChart style={{ width: '100%', height: '350px' }} {...chartOptions} />
            </Card.Body>
          </Card>
        </Col>

        {/* TOP 10 ASET[cite: 1] */}
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100" style={{ maxHeight: '410px' }}>
            <Card.Body style={{ overflowY: 'auto' }}>
              <h6 className="font-weight-bold mb-4 text-muted small text-uppercase">10 Aset Paling Sering Gangguan</h6>
              {[
                { n: 'RTU GI Siantan', v: 14, c: 'danger', p: 95 },
                { n: 'Rectifier GI Ketapang', v: 11, c: 'danger', p: 80 },
                { n: 'Modem FO GI Tayan', v: 9, c: 'warning', p: 65 },
                { n: 'Rele OCR GI Singkawang', v: 8, c: 'warning', p: 60 },
                { n: 'Battery GI Mempawah', v: 6, c: 'info', p: 45 },
                { n: 'Anunciator GI Ngabang', v: 5, c: 'info', p: 40 },
                { n: 'Gateway GI Sambas', v: 4, c: 'info', p: 30 },
                { n: 'UPS Panel UP2D', v: 3, c: 'success', p: 20 },
                { n: 'Switch Hub GI Sekadau', v: 2, c: 'success', p: 15 },
                { n: 'Inverter GI Sanggau', v: 2, c: 'success', p: 15 },
              ].map((x, i) => (
                <div className="mb-3" key={i}>
                  <div className="d-flex justify-content-between mb-1">
                    <small className="font-weight-bold">{x.n}</small>
                    <span className={`badge bg-light text-${x.c} border`}>{x.v}x</span>
                  </div>
                  <ProgressBar now={x.p} variant={x.c} style={{ height: '4px' }} className="rounded-pill" />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* TABEL DATA[cite: 1] */}
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white border-0 pt-3">
          <Nav variant="pills" activeKey={activeTab} onSelect={(k: any) => setActiveTab(k)}>
            <Nav.Item><Nav.Link eventKey="monitoring" className="px-4 small font-weight-bold">Monitoring Aktif</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="histori" className="px-4 small font-weight-bold">Histori Resolved</Nav.Link></Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body className="border-0 shadow-sm p-3" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <JqxGrid
                ref={myGrid} 
                width={'100%'} 
                autoheight={true} 
                theme={'bootstrap'}
                source={new jqx.dataAdapter({ ...source, localdata: activeTab === 'monitoring' ? source.localdata.filter((x:any)=>x.status!=='Resolved') : source.localdata.filter((x:any)=>x.status==='Resolved') })}
                columns={columns}
                sortable={true}
                filterable={true} 
                showfilterrow={true} 
                rowsheight={45}
              />
        </Card.Body>
        
      </Card>

      {/* MODAL DETAIL[cite: 1] */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 bg-light">
          <Modal.Title className="h6 font-weight-bold">Rincian Tiket Gangguan</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row>
            <Col md={7}>
              <h6 className="font-weight-bold mb-1">{selectedData?.peralatan}</h6>
              <p className="text-muted small mb-3">{selectedData?.lokasi}</p>
              <div className="p-3 bg-light rounded border">
                <small className="font-weight-bold text-primary">Keterangan:</small>
                <p className="small mb-0 mt-1">{selectedData?.deskripsi}</p>
              </div>
            </Col>
            <Col md={5} className="border-left pl-4">
              <div className="small">
                <div className="mb-2">● <b>Kategori:</b> {selectedData?.kategori}</div>
                <div className="mb-2">● <b>Pelaksana:</b> {selectedData?.pelaksana}</div>
                <div className="mb-2">● <b>Status:</b> <Badge bg={selectedData?.status === 'Resolved' ? 'success' : 'danger'}>{selectedData?.status}</Badge></div>
                <div className="mb-0 text-muted">Durasi Penanganan: {selectedData?.durasi_string}</div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}