import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Error500({
  image = '/static/illustration/forbidden.svg',
  title = 'Tidak Ada Hak Akses',
  description = 'Anda tidak memiliki hak akses untuk mengakses halaman ini. Silahkan kembali ke halaman utama.',
  buttonTitle = 'Kembali ke Home',
  buttonTarget = '/',
}: any): React.ReactElement {
  return (
    <Container style={{ marginTop: '10rem' }}>
      <div className='text-center'>
        <img className='mb-4' src={image} alt='' width={'160'} />
        <h4>{title}</h4>
        <p>{description}</p>
        <Link className='btn btn-primary' to={buttonTarget}>{buttonTitle}</Link>
      </div>
    </Container>
  );
}
