import WmBaSelesaiFormulir from '@app/modules/WorkingManagement/Formulir/WmBaSelesaiFormulir';
import WmJsaFormulir from '@app/modules/WorkingManagement/Formulir/WmJsaFormulir';
import WmLaranganTanggungJFormulir from '@app/modules/WorkingManagement/Formulir/WmLaranganTanggungJFormulir';
import WmSopFormulir from '@app/modules/WorkingManagement/Formulir/WmSopFormulir';
import WmApprovalDetailForm from '@app/modules/WorkingManagement/WmApprovalDetailForm';
import React, { useState } from 'react';
import { Card, Tab, Tabs } from 'react-bootstrap';

export default function WmWorkingPermitApproveDetailPage() {
  const tabOptions = [
    {
      label: 'JSA',
      key: 'jsa',
      component: <WmJsaFormulir></WmJsaFormulir>,
    },
    {
      label: 'SOP',
      key: 'sop',
      component: <WmSopFormulir></WmSopFormulir>,
    },
    {
      label: 'BA SELESAI',
      key: 'ba_selesai',
      component: <WmBaSelesaiFormulir></WmBaSelesaiFormulir>,
    },
    {
      label: 'LARANGAN DAN TANGGUNG JAWAB',
      key: 'ltj',
      component: <WmLaranganTanggungJFormulir></WmLaranganTanggungJFormulir>,
    },
  ];

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['key']);

  return (
    <>
      <Card className='card-widget'>
        <Card.Header className='text-uppercase fw-bold'>
          DETAIL DATA WORKING PERMIT
        </Card.Header>
        <Card.Body>
          <WmApprovalDetailForm />
        </Card.Body>
      </Card>
      <Card className='mt-3'>
        <Card.Body className='pt-0'>
          <Tabs
            defaultActiveKey='1'
            activeKey={tabActive}
            onSelect={(k: any) => setTabActive(k)}
            className='mb-3 mt-4 tab-sm'
          >
            {tabOptions.map((tab: any) => (
              <Tab key={tab.key} eventKey={tab.key} title={tab.label}>
                {tab?.component}
              </Tab>
            ))}
          </Tabs>
        </Card.Body>
      </Card>
    </>
  );
}
