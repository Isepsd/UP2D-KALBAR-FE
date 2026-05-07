import React, { useRef, useState, useMemo } from 'react';
import { Card, Button, Modal, Row, Col, Form } from 'react-bootstrap';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

// Interface Data[cite: 2]
interface ITiketAnomali {
  id_tiket: string;
  tgl_lapor: string; 
  pelapor: string;
  aset: string;
  kode_aset: string;
  gi: string;
  penyulang: string;
  kategori: string;
  prioritas: string;
  status: string;
  deskripsi: string;
}

export default function AnomaliInput() {
  const myGrid = useRef<JqxGrid>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  
  // Helper Tanggal[cite: 2]
  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const getPastDateStr = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  };

  // State Filter[cite: 2]
  const [startDate, setStartDate] = useState(getPastDateStr(30));
  const [endDate, setEndDate] = useState(getTodayStr());
  const [filterStatus, setFilterStatus] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    start: getPastDateStr(30),
    end: getTodayStr(),
    status: ''
  });

  // Data Dummy[cite: 2]
  const [dataList, setDataList] = useState<ITiketAnomali[]>([
    { 
      id_tiket: 'ANO/UP2D-KB/2026/001', tgl_lapor: '2026-05-05 10:43', pelapor: 'Dispatcher A',
      aset: 'Rele Distance SEL-411L', kode_aset: 'RLE-001', gi: 'GI Cemara', penyulang: 'Cemara 1',
      kategori: 'Alarm SCADA', prioritas: 'Kritis', status: 'Open', deskripsi: 'Indikasi Trip'
    },
    { 
      id_tiket: 'ANO/UP2D-KB/2026/002', tgl_lapor: '2026-04-20 13:43', pelapor: 'Dispatcher B',
      aset: 'Rectifier 48V 50A EMERSON', kode_aset: 'RCT-002', gi: 'GI Senggiring', penyulang: '-',
      kategori: 'Battery Failure', prioritas: 'Tinggi', status: 'In Progress', deskripsi: 'Low Voltage'
    },
    { 
      id_tiket: 'ANO/UP2D-KB/2026/003', tgl_lapor: '2026-03-01 15:43', pelapor: 'Dispatcher A',
      aset: 'RTU SIEMENS SICAM A8000', kode_aset: 'RTU-001', gi: 'GI Cemara', penyulang: 'Cemara 2',
      kategori: 'Gangguan Komunikasi', prioritas: 'Sedang', status: 'Resolved', deskripsi: 'Link Down'
    }
  ]);

  const [formData, setFormData] = useState<ITiketAnomali>({
    id_tiket: '', tgl_lapor: '', pelapor: '', aset: '', kode_aset: '', 
    gi: '', penyulang: '', kategori: '', prioritas: 'Sedang', status: 'Open', deskripsi: ''
  });

  const stats = useMemo(() => ({
    total: dataList.length,
    open: dataList.filter(d => d.status === 'Open').length,
    progress: dataList.filter(d => d.status === 'In Progress').length,
    resolved: dataList.filter(d => d.status === 'Resolved').length
  }), [dataList]);

  // Fungsi Filter & Export[cite: 2]
  const handleApplyFilter = () => setAppliedFilters({ start: startDate, end: endDate, status: filterStatus });
  
  const handleResetFilter = () => {
    const defStart = getPastDateStr(30);
    const defEnd = getTodayStr();
    setStartDate(defStart); setEndDate(defEnd); setFilterStatus('');
    setAppliedFilters({ start: defStart, end: defEnd, status: '' });
  };

  const exportExcel = () => {
    myGrid.current?.exportdata('xls', 'Log_Anomali_UP2DKB');
  };

  const filteredData = useMemo(() => {
    return dataList.filter(d => {
      const itemDate = new Date(d.tgl_lapor.split(' ')[0]);
      const start = appliedFilters.start ? new Date(appliedFilters.start) : null;
      const end = appliedFilters.end ? new Date(appliedFilters.end) : null;
      if(start) start.setHours(0,0,0,0);
      if(end) end.setHours(23,59,59,999);
      const matchDate = (!start || itemDate >= start) && (!end || itemDate <= end);
      const matchStatus = appliedFilters.status === '' || d.status === appliedFilters.status;
      return matchDate && matchStatus;
    });
  }, [dataList, appliedFilters]);

  const source: any = {
    datafields: [
      { name: 'id_tiket', type: 'string' }, { name: 'tgl_lapor', type: 'string' },
      { name: 'aset', type: 'string' }, { name: 'kode_aset', type: 'string' },
      { name: 'gi', type: 'string' }, { name: 'kategori', type: 'string' },
      { name: 'prioritas', type: 'string' }, { name: 'status', type: 'string' },
      { name: 'pelapor', type: 'string' }
    ],
    datatype: 'local',
    localdata: filteredData
  };

  const columns: IGridProps['columns'] = [
    { 
      text: 'Aksi', width: 120, pinned: true,
      cellsrenderer: (row?: number) => `
        <div style="padding:10px 5px; text-align:center;">
          <button class="btn btn-xs btn-outline-info me-1 btn-view" data-row="${row}"><i class="fas fa-eye"></i></button>
          <button class="btn btn-xs btn-outline-primary me-1 btn-edit" data-row="${row}"><i class="fas fa-edit"></i></button>
          <button class="btn btn-xs btn-outline-danger btn-delete" data-row="${row}"><i class="fas fa-trash"></i></button>
        </div>`
    },
    { text: 'No', width: 45, pinned: true, cellsrenderer: (row?: number) => `<div style="padding:15px 5px; text-align:center; font-size:11px; color:#94a3b8;">${(row ?? 0) + 1}</div>` },
    { text: 'ID Tiket', datafield: 'id_tiket', width: 180, cellsrenderer: (r, c, v) => `<div style="padding:15px 10px; font-weight:700; font-size:11px; color: #334155;">${v}</div>` },
    { text: 'Waktu Lapor', datafield: 'tgl_lapor', width: 150 },
    { 
      text: 'Aset', datafield: 'aset', width: 230, 
      cellsrenderer: (r, c, v) => {
        const rowData = myGrid.current?.getrowdata(r as number);
        return `<div style="padding:10px 10px;"><div style="font-weight:600; color:#1e293b;">${v}</div><small class="text-muted" style="font-size:10px;">${rowData?.kode_aset || ''}</small></div>`;
      }
    },
    { text: 'GI', datafield: 'gi', width: 120 },
    { text: 'Kategori', datafield: 'kategori', width: 160 },
    { 
      text: 'Prioritas', datafield: 'prioritas', width: 100,
      cellsrenderer: (r, c, v) => {
        const colors: any = { 'Kritis': '#dc3545', 'Tinggi': '#fd7e14', 'Sedang': '#ffc107' };
        return `<div style="padding:12px 5px; text-align:center;"><span style="background:${colors[v] || '#6c757d'}; color:#fff; padding:3px 12px; border-radius:15px; font-size:10px; font-weight:bold;">${v}</span></div>`;
      }
    },
    { 
      text: 'Status', datafield: 'status', width: 110,
      cellsrenderer: (r, c, v) => {
        const styles: any = { 'Open': { bg: '#fff0f0', clr: '#d9534f' }, 'In Progress': { bg: '#fff9e6', clr: '#f0ad4e' }, 'Resolved': { bg: '#eefaf3', clr: '#5cb85c' } };
        const s = styles[v] || styles['Open'];
        return `<div style="padding:12px 5px; text-align:center;"><span style="background:${s.bg}; color:${s.clr}; border: 1px solid ${s.clr}50; padding:2px 10px; border-radius:5px; font-size:10px; font-weight:bold;">${v}</span></div>`;
      }
    },
    { text: 'Pelapor', datafield: 'pelapor', width: 120 },
  ];

  const handleAction = (e: any) => {
    const rowIdx = e.target.closest('[data-row]')?.getAttribute('data-row');
    if (rowIdx === null) return;
    const rowData = myGrid.current?.getrowdata(parseInt(rowIdx)) as ITiketAnomali;
    if (e.target.closest('.btn-view')) { setFormData(rowData); setViewMode(true); setIsEdit(false); setShowModal(true); }
    if (e.target.closest('.btn-edit')) { setFormData(rowData); setIsEdit(true); setViewMode(false); setShowModal(true); }
    if (e.target.closest('.btn-delete')) {
      if (window.confirm(`Hapus tiket ${rowData.id_tiket}?`)) setDataList(prev => prev.filter(d => d.id_tiket !== rowData.id_tiket));
    }
  };

  return (
    <div onClick={handleAction}>
      <style>{`
        .stat-card { border: none; border-radius: 12px; }
        .bg-dark-blue { background-color: #005696 !important; border: none; }
        .btn-xs { padding: 4px 8px; font-size: 11px; border-radius: 6px; }
        
        /* Modern UI Improvements */
        .filter-container { background: #ffffff; border-radius: 15px; border: 1px solid #edf2f7; }
        .filter-label { font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 6px; }
        
        /* Modal Styles based on image_f4c45c.png */
        .modal-content { border-radius: 16px; border: none; }
        .form-label { font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .form-control, .form-select { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; font-size: 13px; color: #334155; }
        .form-control:focus, .form-select:focus { background-color: #fff; border-color: #005696; box-shadow: 0 0 0 2px rgba(0,86,150,0.1); }
        .helper-text { font-size: 10px; color: #94a3b8; margin-top: 5px; display: block; }
        .form-control:read-only { background-color: #f1f5f9; color: #64748b; }


        /* Modal Styling from image_f4c45c.png */
        .modal-content { border-radius: 16px; border: none; overflow: hidden; }
        .form-label { font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .form-control, .form-select { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; font-size: 13px; color: #334155; }
        .form-control:focus, .form-select:focus { background-color: #fff; border-color: #005696; box-shadow: 0 0 0 2px rgba(0,86,150,0.1); }
        .helper-text { font-size: 10px; color: #94a3b8; margin-top: 5px; display: block; }
        .form-control:read-only { background-color: #f1f5f9; color: #64748b; border-color: #e2e8f0; }
        
        /* Filter Look */
        .filter-container { background: #ffffff; border-radius: 15px; border: 1px solid #edf2f7; }
        .filter-label { font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 6px; }
        
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

      {/* Header[cite: 2] */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: '#1e293b' }}>Daftar Tiket Anomali Peralatan</h4>
          <small className="text-muted">Klik <strong>Buat Tiket Baru</strong> untuk merekam temuan anomali di lapangan.</small>
        </div>
        <Button variant="primary" className="fw-bold px-4 bg-dark-blue shadow-sm" style={{ borderRadius: '10px' }} 
          onClick={() => {
            setFormData({id_tiket: '', tgl_lapor: '', pelapor: 'Dispatcher', aset: '', kode_aset: '', gi: '', penyulang: '', kategori: '', prioritas: 'Sedang', status: 'Open', deskripsi: ''});
            setIsEdit(false); setViewMode(false); setShowModal(true);
          }}>
          <i className="fas fa-plus me-2"></i>Buat Tiket Baru
        </Button>
      </div>

      {/* Stats Cards[cite: 2] */}
      <Row className="mb-4">
        {[{l:'TOTAL', v:stats.total, c:'primary'}, {l:'OPEN', v:stats.open, c:'danger'}, {l:'PROGRESS', v:stats.progress, c:'warning'}, {l:'RESOLVED', v:stats.resolved, c:'success'}].map((s, i) => (
          <Col md={3} key={i}>
            <Card className={`stat-card shadow-sm border-start border-${s.c} border-4`}>
              <Card.Body>
                <small className="text-muted fw-bold">{s.l}</small>
                <h2 className={`fw-bold mb-0 ${s.c === 'primary' ? '' : 'text-'+s.c}`}>{s.v}</h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Filter Section[cite: 2] */}
      <Card className="filter-container shadow-sm mb-4">
        <Card.Body className="p-4">
          <Row className="align-items-end g-3">
            <Col md={2}>
              <div className="filter-label">Dari Tanggal</div>
              <Form.Control size="sm" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </Col>
            <Col md={2}>
              <div className="filter-label">Sampai Tanggal</div>
              <Form.Control size="sm" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </Col>
            <Col md={3}>
              <div className="filter-label">Status Tiket</div>
              <Form.Select size="sm" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="">Semua Status</option>
                <option value="Open">🔴 Open</option>
                <option value="In Progress">🟡 In Progress</option>
                <option value="Resolved">🟢 Resolved</option>
              </Form.Select>
            </Col>
            <Col className="text-end">
              <Button variant="primary" size="sm" className="me-2 fw-bold bg-dark-blue shadow-sm px-4" style={{ borderRadius: '8px' }} onClick={handleApplyFilter}>Terapkan</Button>
              <Button variant="outline-secondary" size="sm" className="me-2 fw-bold px-3" style={{ borderRadius: '8px' }} onClick={handleResetFilter}>Reset</Button>
              <Button variant="success" size="sm" className="fw-bold px-4 shadow-sm" style={{ borderRadius: '8px', backgroundColor: '#22c55e', border: 'none' }} onClick={exportExcel}>Export Excel</Button>
            </Col>
            
            
          </Row>
        </Card.Body>
      </Card>

      {/* Grid Container[cite: 2] */}
      <Card className="border-0 shadow-sm p-3" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <JqxGrid 
          ref={myGrid}
          width={'100%'}
          autoheight={true}
          source={new jqx.dataAdapter(source)} 
          columns={columns}
          theme={'bootstrap'}
          columnsresize={true}
          sortable={true}
          filterable={true}
          showfilterrow={true}
          rowsheight={45}
        />
      </Card>

      {/* MODAL FORM - FOKUS PERBAIKAN DISINI[cite: 2] */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered backdrop="static">
        <Modal.Header closeButton className="border-0 px-4 pt-4">
          <div>
            <h5 className="fw-bold mb-0">
              {isEdit ? 'Update Pelaporan Anomali' : (viewMode ? 'Detail Pelaporan Anomali' : 'Form Pelaporan Anomali')}
            </h5>
          </div>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>ID Tiket</Form.Label>
                <Form.Control value={formData.id_tiket || 'AUTO-GENERATED'} readOnly />
                <span className="helper-text">Identitas unik laporan</span>
              </Col>
              <Col md={6}>
                <Form.Label><i className="far fa-clock me-1"></i> Waktu Lapor</Form.Label>
                <Form.Control value={formData.tgl_lapor || new Date().toLocaleString('id-ID')} readOnly />
                <span className="helper-text">Terkunci ke waktu sistem</span>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Nama Pelapor (Dispatcher)</Form.Label>
                <Form.Control 
                  disabled={viewMode} 
                  value={formData.pelapor} 
                  onChange={e => setFormData({...formData, pelapor: e.target.value})} 
                />
              </Col>
              <Col md={6}>
                <Form.Label>Pilih Aset</Form.Label>
                <Form.Select 
                  disabled={viewMode} 
                  value={formData.aset} 
                  onChange={e => setFormData({...formData, aset: e.target.value})}
                >
                  <option value="">Cari aset...</option>
                  <option>Rele Distance SEL-411L</option>
                  <option>RTU SIEMENS SICAM A8000</option>
                  <option>Rectifier 48V 50A EMERSON</option>
                </Form.Select>
                <span className="helper-text">Rele - Rectifier - RTU</span>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Lokasi (GI)</Form.Label>
                <Form.Control readOnly value={formData.gi || '-'} />
                <span className="helper-text">Auto-fill dari aset</span>
              </Col>
              <Col md={6}>
                <Form.Label>Penyulang</Form.Label>
                <Form.Control readOnly value={formData.penyulang || '-'} />
                <span className="helper-text">Auto-fill dari aset</span>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Kategori Gangguan</Form.Label>
                <Form.Select 
                  disabled={viewMode} 
                  value={formData.kategori} 
                  onChange={e => setFormData({...formData, kategori: e.target.value})}
                >
                  <option value="">Pilih kategori...</option>
                  <option>Gangguan Komunikasi</option>
                  <option>Kerusakan Hardware</option>
                  <option>Anomali Telemetring</option>
                  <option>Battery Failure</option>
                  <option>Setting Drift</option>
                  <option>Alarm SCADA</option>
                  <option>Pemeliharaan Korektif</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label>Prioritas</Form.Label>
                <Form.Select 
                  disabled={viewMode} 
                  value={formData.prioritas} 
                  onChange={e => setFormData({...formData, prioritas: e.target.value})}
                >
                  <option>Sedang</option>
                  <option>Tinggi</option>
                  <option>Kritis</option>
                </Form.Select>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Deskripsi Temuan Anomali</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4}
                disabled={viewMode} 
                value={formData.deskripsi} 
                onChange={e => setFormData({...formData, deskripsi: e.target.value})} 
                placeholder="Jelaskan gejala, indikasi alarm, kondisi yang ditemukan..." 
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Lampiran Bukti SCADA</Form.Label>
              <div className="border p-3 rounded-3 text-muted text-center" style={{ borderStyle: 'dashed', backgroundColor: '#f8fafc', cursor: 'pointer' }}>
                 <i className="fas fa-paperclip me-2"></i> Pilih file pendukung...
              </div>
              <span className="helper-text">Screenshot, log, atau file pendukung lainnya</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 px-4 pb-4">
          <Button variant="light" className="px-4 fw-bold" onClick={() => setShowModal(false)}>Batal</Button>
          {!viewMode && (
            <Button variant="primary" className="px-4 bg-dark-blue fw-bold shadow-sm">
              <i className="fas fa-paper-plane me-2"></i> 
              {isEdit ? 'Update Tiket' : 'Kirim Tiket'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}