import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import GrafikKomulatifUP2DBANTEN from '@app/modules/Dashboard/GrafikKomulatifUP2DBANTENDami';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { CONFIG_GRAFIK_KOMULATIF_up2dbantendummi } from '@app/configs/kinerja-scada.configMonrtu';
import { nanoid } from 'nanoid'; // Update import dari '@reduxjs/toolkit' ke 'nanoid'

export default function MonitoringRTU() {
  const [grafikKomulatif] = useState<any>(CONFIG_GRAFIK_KOMULATIF_up2dbantendummi);
  const [loading] = useState<boolean>(false);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Row className='mb-2 gx-2'>
        <div>
          {grafikKomulatif.map((item: any) => (
            <div key={nanoid()} className='mb-2'>
              <GrafikKomulatifUP2DBANTEN
                title={item.title}
                path={item.path}
              />
            </div>
          ))}
        </div>
      </Row>
    </>
  );
}
