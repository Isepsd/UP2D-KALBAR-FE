import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AsetTabNavigation({ activeTab, setActiveTab }: TabProps) {
  const tabs = [
    { id: 'kp', label: 'Data Aset KP', sub: 'KEY POINT', icon: 'fa-map-marker-alt', count: 12 },
    { id: 'kubikel', label: 'Data Aset Kubikel', sub: 'SWITCHGEAR', icon: 'fa-cubes', count: 10 },
    { id: 'penyulang', label: 'Penyulang & Konfigurasi', sub: 'FEEDER', icon: 'fa-sitemap', count: 8 },
    { id: 'rectifier', label: 'Rectifier', sub: 'DC POWER', icon: 'fa-charging-station', count: 9 },
    { id: 'rele', label: 'Rele Proteksi', sub: 'PROTECTION', icon: 'fa-shield-alt', count: 11 },
  ];

  return (
    <Row className="gx-2 mb-4">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Col key={tab.id}>
            <Card
              className={`border-0 shadow-sm h-100 cursor-pointer`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                  borderRadius: '10px',
                  backgroundColor: isActive ? '#005696' : '#ffffff',
                  cursor: 'pointer',
                  position: 'relative', // Wajib ada
                  transition: 'all 0.2s ease-in-out',
                  overflow: 'hidden' 
                }}

             
            >
              <Card.Body className="p-3 position-relative" style={{ zIndex: 2 }}>
                {/* Badge Count - Pojok Kanan Atas */}
                <div 
                  className="position-absolute" 
                  style={{ 
                    top: '12px', 
                    right: '12px', 
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#f1f3f5',
                    color: isActive ? '#ffffff' : '#495057',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}
                >
                  {tab.count}
                </div>

                {/* Icon Box */}
                <div 
                  className="rounded d-flex align-items-center justify-content-center mb-3" 
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#f0f7ff', 
                    color: isActive ? '#ffffff' : '#005696'
                  }}
                >
                  <i className={`fa ${tab.icon}`} style={{ fontSize: '14px' }}></i>
                </div>

                {/* Text Content */}
                <div className="mt-2">
                  <h6 
                    className={`mb-0 font-weight-bold`} 
                    style={{ 
                      fontSize: '13px', 
                      color: isActive ? '#ffffff' : '#212529',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.label}
                  </h6>
                  <small 
                    style={{ 
                      fontSize: '10px', 
                      fontWeight: 600, 
                      color: isActive ? 'rgba(255,255,255,0.7)' : '#adb5bd',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {tab.sub}
                  </small>
                </div>
              </Card.Body>

              {/* GARIS KUNING (PENGGANTI BORDER BOTTOM) */}
              {isActive && (
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    backgroundColor: '#ffc107',
                    zIndex: 3
                  }}
                />
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}