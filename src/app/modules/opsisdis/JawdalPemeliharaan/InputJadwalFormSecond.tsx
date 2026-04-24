import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';

interface IInputJadwalForm {
  register: any,
  errors?: any,
  control?: any
  setValue?: any
}

function InputJadwalFormSecond({
  register,
}: IInputJadwalForm) {

  return (
    <>
      <Row>
        <Col md={6}>
          <Form.Group className='mb-3'>
            <Form.Label>Jumlah Gardu Padam</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('jlh_gardu_padam')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Gardu</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Beban Padam</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('beban_padam')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">MW</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>ENS Pekerjaan</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('ens_pekerjaan')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">KWH</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>ENS s.d Saat Ini</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('ens_saat_ini')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">KWH</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Estimasi ENS Akumulasi</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('ens_akumulasi')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">KWH</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>SAIFI Pekerjaan</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('saifi_pekerjaan')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Kali/plg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>SAIFI s.d Saat Ini</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('saifi_saat_ini')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Kali/plg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Estimasi SAIFI Akumulasi</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('saifi_akumulasi')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Kali/plg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className='mb-3'>
            <Form.Label>Jumlah Pelanggan Padam</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('jlh_pelanggan_padam')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Plg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Jumlah Pelanggan UIW</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('jlh_pelanggan_uiw')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Plg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>SAIDI Pekerjaan</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('saidi_pekerjaan')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Menit/Plg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>SAIDI S.d saat ini</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('saidi_saat_ini')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Menit/Plg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Estimasi SAIDI Akumulasi</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control {...register('saidi_akumulasi')} type='number' aria-describedby="availibility-addon2" />
              <InputGroup.Text id="availibility-addon2">Menit/Plg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
    </>
  )
}
export default InputJadwalFormSecond;