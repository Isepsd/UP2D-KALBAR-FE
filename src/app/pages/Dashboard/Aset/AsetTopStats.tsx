import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';

export default function AsetTopStats() {
  return (
    <div className="mb-4">
      {/* Header Title & Export Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="font-weight-bold mb-1" style={{ color: '#002d5d' }}>Dashboard Manajemen Data Aset</h2>
          <p className="text-muted mb-0 small">Monitoring dan pengelolaan aset kelistrikan terintegrasi Single Data PLN.</p>
        </div>
        
      </div>

      {/* Global Filter Card - Button Cari dipindah ke sini */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
        <Card.Body className="py-3 px-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-4">
            <span className="font-weight-bold text-dark">Filter Global:</span>
            <Form.Select className="border-light bg-light text-muted" style={{ width: '220px', borderRadius: '8px' }}>
              <option>Semua Penyulang</option>
            </Form.Select>
            <Form.Select className="border-light bg-light text-muted" style={{ width: '220px', borderRadius: '8px' }}>
              <option>Semua Gardu Induk</option>
            </Form.Select>
            {/* Posisi Baru Button Cari (Sisi Kanan Baris Filter) */}
            <Button variant="primary" className="shadow-sm px-4 py-2 small" style={{ backgroundColor: '#005696', borderRadius: '8px' }}>
                <i className="fa fa-search mr-2"></i> Cari Data Aset
            </Button>
            <div>
            <Button variant="white" className="shadow-sm border border-light px-3 py-2 small">
                <i className="far fa-file-excel mr-2 text-success"></i> Export Excel
            </Button>
            </div>
          </div>
          
          
        </Card.Body>
      </Card>

      {/* Statistics Cards Row */}
      <Row className="gx-3">
        {/* Card 1: Total Aset */}
        <Col>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', backgroundColor: '#f0f7ff', color: '#005696', border: '1px solid #e1eeff' }}>
                  <i className="fa fa-database"></i>
                </div>
                <div className="px-2 py-1 rounded-sm" style={{ backgroundColor: '#e9fbf3', color: '#2ecc71', fontSize: '11px', fontWeight: 'bold' }}>+ 5,2%</div>
              </div>
              <p className="text-muted mb-1" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px' }}>TOTAL ASET TERINTEGRASI</p>
              <h2 className="font-weight-bold mb-1" style={{ color: '#212529' }}>2.847</h2>
              <small className="text-muted" style={{ fontSize: '12px' }}>Tercatat di Single Data</small>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 2: Aset KP */}
        <Col>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', backgroundColor: '#f0f7ff', color: '#005696', border: '1px solid #e1eeff' }}>
                  <i className="fa fa-map-marker-alt"></i>
                </div>
                <div className="px-2 py-1 rounded-sm" style={{ backgroundColor: '#e9fbf3', color: '#2ecc71', fontSize: '11px', fontWeight: 'bold' }}>+ 12</div>
              </div>
              <p className="text-muted mb-1" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px' }}>ASET KEY POINT (KP)</p>
              <h2 className="font-weight-bold mb-1" style={{ color: '#212529' }}>1.286</h2>
              <small className="text-muted" style={{ fontSize: '12px' }}>Total titik KP aktif</small>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 3: Kesehatan Rectifier */}
        <Col>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="mb-3">
                <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', backgroundColor: '#effaf3', color: '#27ae60', border: '1px solid #e2f5e9' }}>
                  <i className="fa fa-bolt" style={{ fontSize: '18px' }}></i>
                </div>
              </div>
              <p className="text-muted mb-1" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px' }}>KESEHATAN RECTIFIER</p>
              <h2 className="font-weight-bold mb-1" style={{ color: '#212529' }}>94,5%</h2>
              <small className="text-muted" style={{ fontSize: '12px' }}>Unit beroperasi normal</small>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 4: Ratio KP (Donut Chart) */}
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4 d-flex align-items-center">
              <div style={{ position: 'relative', width: '85px', height: '85px' }} className="mr-4 flex-shrink-0">
                <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f3f5" strokeWidth="3.5" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#005696" strokeWidth="3.5" strokeDasharray="82, 100" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                  <span className="font-weight-bold" style={{ fontSize: '16px', color: '#212529' }}>82%</span>
                </div>
              </div>
              <div>
                <div className="d-flex align-items-center mb-1">
                  <i className="fa fa-bullseye text-primary mr-2" style={{ fontSize: '14px' }}></i>
                  <p className="text-muted mb-0" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px' }}>PENCAPAIAN RATIO KP</p>
                </div>
                <h6 className="font-weight-bold mb-0" style={{ color: '#212529', fontSize: '15px' }}>Realisasi vs Target</h6>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Card 5: Rele Proteksi */}
        <Col>
          <Card className="border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <Card.Body className="p-4">
              <div className="mb-3">
                <div className="rounded d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px', backgroundColor: '#f0f7ff', color: '#005696', border: '1px solid #e1eeff' }}>
                  <i className="fa fa-shield-alt"></i>
                </div>
              </div>
              <p className="text-muted mb-1" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px' }}>TOTAL RELE PROTEKSI</p>
              <h2 className="font-weight-bold mb-1" style={{ color: '#212529' }}>412</h2>
              <small className="text-muted" style={{ fontSize: '12px' }}>Rele aktif terpasang</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}