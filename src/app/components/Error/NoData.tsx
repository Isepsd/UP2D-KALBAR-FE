import React from 'react';
import styled from 'styled-components';
import NoDataIllustration from '../Illustration/NoDataIllustration';

export default function NoData() {
  return (
    <>
      <NoDataContainer>
        <NoDataIllustration width={150}></NoDataIllustration>
        <Title className='mt-3'>Tidak Tersedia</Title>
        <p className='small fw-normal' style={{ color: 'var(--black-300)' }}>
          Maaf, data tidak tersedia di widget ini.
        </p>
      </NoDataContainer>
    </>
  );
}

const NoDataContainer = styled.div`
  /* width: 5rem; */
  padding: 1.1rem;
  /* background: var(--black-25); */
  border-radius: 1rem;
  margin: 0 auto;
  width: 18rem;
  text-align:center;
`;

const Title = styled.h4`
  font-size: 1.25rem;
`;
