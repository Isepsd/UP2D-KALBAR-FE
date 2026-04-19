import React from 'react'
import { Button } from 'react-bootstrap'
import { FixedTopSidenav, Logo } from '@app/styled/sidenav.styled'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { cdnUrl } from '@app/helper/cdn.helper';
import LazyImage from '@app/components/Image/LazyImage';

const LogoContainer = styled.div`
  display:flex;
`

const TiltleAppContainer = styled.div`
  padding-left:1rem; 
`

const TiltleApp = styled.h5`
  margin-bottom:0;
  font-weight: 600;
  white-space: nowrap;
`

const TiltleAppSubTitle = styled.p`
  color:var(--primary-cc);
  font-weight:500;
  margin-bottom:0;
  font-size:.9rem;
  white-space: nowrap;
`

export default function AppLogo({onChangeVisible, isVisible, collapsedSidebar}:any) {
  const { application } = useSelector((state: any) => state.ui);
  return (
    <FixedTopSidenav>
      <Logo>
        <div className='d-flex cursor-pointer' style={{padding:'0.4rem 0.5rem'}}>
            <LogoContainer>
              <LazyImage src={cdnUrl(application?.logo)} height={42} alt="" defaultImage={'/static/no-image.png'} />
              <TiltleAppContainer className={collapsedSidebar}>
                <TiltleApp>{application?.app_name}</TiltleApp>
                <TiltleAppSubTitle>{application?.app_sub_name}</TiltleAppSubTitle>
              </TiltleAppContainer>
            </LogoContainer>
           <Button
              onClick={() => onChangeVisible(isVisible)}
              type='button'
              className='d-block d-md-none ms-auto px-2 py-0 no-outline rounded-circle'
              variant=''
              size='lg'
              style={{
                height: '28px',
                position: 'absolute',
                right: '-1rem',
                top: '1.5rem',
              }}
            >
            <i className='fa-solid fa-xmark'></i>
          </Button>
        </div>
      </Logo>
    </FixedTopSidenav>
  )
}
