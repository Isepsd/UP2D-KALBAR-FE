import React from 'react'
import { Col, Row } from 'react-bootstrap'
import FormChecklistDetailLogic from '@app/modules/MasterData/Opsisdis/FormChecklistDetailLogic';

function FormChecklistDetailLogicPage({ itemSelected }: any) {
  /** DATA RESP */

  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <div className='mb-4'>
            <FormChecklistDetailLogic
              itemSelected={itemSelected}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default FormChecklistDetailLogicPage