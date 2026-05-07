import React, { useState } from 'react';
import AsetTabNavigation from './AsetTabNavigation';
import TabAsetKP from './TabAsetKP';
import TabAsetKubikel from './TabAsetKubikel';
import TabPenyulang from './TabPenyulang';
import TabRectifier from './TabRectifier';
import TabReleProteksi from './TabReleProteksi';
import AsetTopStats from './AsetTopStats';

export default function AsetPage() {
  const [activeTab, setActiveTab] = useState('kp');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'kp': return <TabAsetKP />;
      case 'kubikel': return <TabAsetKubikel />;
      case 'penyulang': return <TabPenyulang />;
      case 'rectifier': return <TabRectifier />;
      case 'rele': return <TabReleProteksi />;
      default: return <TabAsetKP />;
    }
  };

  return (
    <div>
      {/* 1. Header & Stats (Opsional jika sudah ada) */}
      
        <AsetTopStats />
      {/* 2. Menu Navigasi 5 Tab */}
      <AsetTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 3. Konten Dinamis */}
      <div className="animate__animated animate__fadeIn">
        {renderTabContent()}
      </div>
    </div>
  );
}