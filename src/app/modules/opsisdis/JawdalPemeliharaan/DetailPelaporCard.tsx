import { Card, Col, Form, Row } from "react-bootstrap"
import React from 'react'
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
interface IInputJadwalForm {
  register: any,
  errors: any,
  control: any
}

function DetailPelaporCard({
  register,
  errors,
  control,
}: IInputJadwalForm) {

  return (
    <>
      <Card className='card-widget position-static mb-4' style={{ border: '1px solid var(--black-50)' }}>
        <Card.Header className='font-weight-light font-sise-large' style={{ backgroundColor: 'var(--black-50)' }}>Detail Pelapor</Card.Header>
        <Card.Body>
          <Form.Group as={Row} className="mb-3" controlId="pembuat_usulan">
            <Form.Label column md={3}>Pembuat Usulan</Form.Label>
            <Col md={9}>
              <Form.Control  {...register('pembuat_usulan')} type='number' aria-describedby="availibility-addon2" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="area_pembuat_usualn">
            <Form.Label column md={3}>Jumlah Gardu Padam</Form.Label>
            <Col md={9}>
              <Form.Control  {...register('area_pembuat_usualn')} type='number' aria-describedby="availibility-addon2" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="pembuat_usulan">
            <Form.Label column md={3}>Penanggung Jawab UP3/ULP</Form.Label>
            <Col md={9}>
              <SelectAsyncDynamic
                fieldName='id_user'
                pathServiceName='admin.user'
                labelField='fullname'
                valueField='id_user'
                placeholder='Pilih...'
                isClearable={true}
                errors={errors}
                control={control}
                queryParams={{
                  page: -1,
                  limit: 10,
                }}
              />
              {/* <Form.Control.Feedback type='invalid'>
                {errors?.id_parent_lokasi?.message}
              </Form.Control.Feedback> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="pembuat_usulan">
            <Form.Label column md={3}>Pengawas Pekerjaan UP3/ULP</Form.Label>
            <Col md={9}>
              <SelectAsyncDynamic
                fieldName='id_user'
                pathServiceName='admin.user'
                labelField='fullname'
                valueField='id_user'
                placeholder='Pilih...'
                isClearable={true}
                errors={errors}
                control={control}
                queryParams={{
                  page: -1,
                  limit: 10,
                }}
              />
              {/* <Form.Control.Feedback type='invalid'>
                {errors?.id_parent_lokasi?.message}
              </Form.Control.Feedback> */}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="pembuat_usulan">
            <Form.Label column md={3}>Pengawas K3 UP3/ULP</Form.Label>
            <Col md={9}>
              <SelectAsyncDynamic
                fieldName='id_user'
                pathServiceName='admin.user'
                labelField='fullname'
                valueField='id_user'
                placeholder='Pilih...'
                isClearable={true}
                errors={errors}
                control={control}
                queryParams={{
                  page: -1,
                  limit: 10,
                }}
              />
              {/* <Form.Control.Feedback type='invalid'>
                {errors?.id_parent_lokasi?.message}
              </Form.Control.Feedback> */}
            </Col>

          </Form.Group>

        </Card.Body>

      </Card>
    </>
  )
}
export default DetailPelaporCard;