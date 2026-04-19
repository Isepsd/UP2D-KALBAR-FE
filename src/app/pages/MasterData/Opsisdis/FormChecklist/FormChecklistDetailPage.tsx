import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import FormChecklistDetailLogicPage from './FormChecklistDetailLogicPage';


import FormChecklistDetail from '@app/modules/MasterData/Opsisdis/FormChecklistDetail';

function FormChecklistDetailPage({ itemSelected }: any) {

  /** DATA RESP */

  const [dataSelected, setDataSelected] = useState<any>();

  return (
    <>
      <Row>
        <Col md={6} className='mb-4 position-static'>
          <div className='mb-4'>
            <FormChecklistDetail
              onSelectItem={setDataSelected}
              itemSelected={itemSelected}
            />
          </div>
        </Col>
        <Col md={6} className='mb-4 position-static'>
          <FormChecklistDetailLogicPage
            itemSelected={dataSelected} />
        </Col>
      </Row>


    </>
  )
}

export default FormChecklistDetailPage