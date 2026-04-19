import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  background: url('/static/landing/img/header-background.png') 50% 0% ;
  background-size: cover;
  position: absolute;
  width: 100%;
  margin-top:-2.5rem;
`;

export default function Error404({ type = '' }: any): React.ReactElement {
  return (
    <>
      Not Found
      <Header
        id='header'
        className='ex-header'
        hidden
      >
        <div
          className='container'
          style={{
            padding: '4rem 0 1.5rem 0',
            height: type === 'admin' ? 'calc(100vh - 73px)' : 'auto',
          }}
        >
          <div className='row'>
            <div className='col-lg-12'>
              <h1>404 Not Found</h1>
              <p>Page you search is not found</p>
              <Link to='/' className='btn btn-outline-primary' hidden>
                <i className='fa-solid fa-house'></i> Kembali
              </Link>
            </div>
            {/* end of col */}
          </div>
          {/* end of row */}
        </div>
        {/* end of container */}
      </Header>
    </>
  );
}
