import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../AppsLayout/Header/Header';

import { Logo } from '@app/styled/sidenav.styled'
import { cdnUrl } from '@app/helper/cdn.helper';


const LogoContainer = styled.div`
  display:flex;
`

const TiltleAppContainer = styled.div`
  padding-left:1rem; 
`

const TiltleApp = styled.h5`
  margin-bottom:0;
  font-weight: 600;
`

const TiltleAppSubTitle = styled.p`
  color:var(--primary-cc);
  font-weight:500;
  margin-bottom:0;
  font-size:.9rem;
`

function HeaderExtraLayout() {
  const { application } = useSelector((state: any) => state.ui);
  
  return (
    <>
      <div className="position-fixed" style={{zIndex: '9999', width: '16.667rem'}}>
        <Logo>
          <div className='d-flex cursor-pointer' style={{padding:'0.4rem 0.5rem'}}>
              <LogoContainer>
                <img src={cdnUrl(application?.logo)} height={42} alt="" />
                <TiltleAppContainer>
                  <TiltleApp>{application?.app_name}</TiltleApp>
                  <TiltleAppSubTitle>{application?.app_sub_name}</TiltleAppSubTitle>
                </TiltleAppContainer>
              </LogoContainer>
          </div>
        </Logo>
      </div>
      <Header />
    </>
  )
}

export default HeaderExtraLayout