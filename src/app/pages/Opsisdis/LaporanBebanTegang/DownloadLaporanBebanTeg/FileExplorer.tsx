// import React, { useState } from 'react';
import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

// import { useForm, useWatch } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';

// import FiltersForm from '@app/modules/Filters/FilterForm';
// import FilterActionButton from '@app/modules/Filters/FilterActionButton';
// import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
// import moment from 'moment';

export default function FileExplorer() {

  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [dataParams, setDataParams] = useState<any>({
  //     day_after: moment().subtract(1, 'day').format('YYYY-MM-DD'),
  //     day_before: moment().format('YYYY-MM-DD'),
  //   });
  //   // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  //   /** FORM  HANDLE */
  //   const validationSchema = Yup.object().shape({
  //     day_after: Yup.string().typeError('Data wajib diisi').nullable(),
  //     day_before: Yup.string().typeError('Data wajib diisi').nullable(),
  //   });

  //   const [formModel] = useState<any>({
  //     nama_laporan: null,
  //     status_laporan: null,
  //     day_after: moment().subtract(1, 'day').format('YYYY-MM-DD'),
  //     day_before: moment().format('YYYY-MM-DD'),
  //   });

  //   const {
  //     handleSubmit,
  //     setValue,
  //     setError,
  //     control,
  //     formState,
  //     register
  //   } = useForm({
  //     resolver: yupResolver(validationSchema),
  //     defaultValues: formModel,
  //   });
  //   const { errors }: any = formState || {};

  //   /** SUBMIT FORM HANDLING */
  //   const onSubmitForm = (data: any) => {
  //     setDataParams(() => {
  //       return { ...data }
  //     });
  //   };

  //   // const watchDate2Before = useWatch({ control, name: 'date_before' });
  //   const watchDate2After = useWatch({ control, name: 'day_after' });

  return (
    <>
      {/* <Row>
        <Col md={12} className='mb-4 position-static'> */}
          <Card className='card-widget'>
            <Card.Header className='card-header'>File Explorer Download Laporan</Card.Header>
            <Card.Body>

              <Card className='card position-static mb-4'>
                <Card.Header className='card-header'>
                  <Breadcrumb className='mt-2'>
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">penyulang</Breadcrumb.Item>
                    <Breadcrumb.Item active>bulanan</Breadcrumb.Item>
                  </Breadcrumb>
                </Card.Header>

              </Card>

              <Row>
                {/* <Col md={12}> */}

                  <Col md={2} className='mb-4'>
                    <Card className='card'>
                      <Card.Body className='text-center'>
                        <i className='fa fa-folder fa-4x mb-2'></i> <br />
                        <a className='stretched-link' href="/my-folder">Pembangkit</a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={2} className='mb-4'>
                    <Card className='card'>
                      <Card.Body className='text-center'>
                        <i className='fa fa-folder fa-4x mb-2'></i> <br />
                        <a className='stretched-link' href="/my-folder">trafogi</a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={2} className='mb-4'>
                    <Card className='card'>
                      <Card.Body className='text-center'>
                        <i className='fa fa-folder fa-4x mb-2'></i> <br />
                        <a className='stretched-link' href="/my-folder">penyulang</a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={2} className='mb-4'>
                    <Card className='card'>
                      <Card.Body className='text-center'>
                        <i className='fa fa-folder fa-4x mb-2'></i> <br />
                        <a className='stretched-link' href="/my-folder">gh</a>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={2} className='mb-4'>
                    <Card className='card'>
                      <Card.Body className='text-center'>
                        <i className='fa fa-folder fa-4x mb-2'></i> <br />
                        <a className='stretched-link' href="/my-folder">keypoint</a>
                      </Card.Body>
                    </Card>
                  </Col>

                {/* </Col> */}
              </Row>

            </Card.Body>
          </Card>
        {/* </Col>
      </Row> */}
    </>
  );
}
