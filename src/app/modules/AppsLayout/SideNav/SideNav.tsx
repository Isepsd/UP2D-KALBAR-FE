import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setSubSideNavActive, toggleSidebarMenu } from '@app/store/reducers/ui';


// import WorkspaceSearch from "./WorkspaceSearch";
import AppLogo from "./AppLogo";
import AccordionMenu from "./AccordionMenu";

/** STYLED */
import {
  SideNavContainer,
  SideNavDivider,
} from '@app/styled/sidenav.styled';
import styled from 'styled-components';

const BackButton = styled.div`
  padding:1.25rem 1rem;
`

const TitleSideNavSub = styled.div`
  padding:.5 rem 0;
  margin-bottom:0;
  font-weight: bold;
  text-transform: uppercase;
`
export default function SideNav() {
  const location = useLocation()
  const { subSideNavActive, collapsedSidebar, navigation } = useSelector((state: any) => state.ui);
  const { access } = useSelector((state: any) => state.auth);

  const [nestedMenu, setNestedMenu] = useState([])
  const [subSideNav, setSubSideNav] = useState([])
  const dispatch = useDispatch()


  useEffect(() => {
    if (subSideNavActive) {
      setSubSideNav(subSideNavActive?.children)
    }
  }, [subSideNavActive])

  const handleClickHideSubSideNav = () => {
    dispatch(setSubSideNavActive([]))
  }

  useEffect(() => {
    handleClickHideSubSideNav()
  }, [location])

  useEffect(() => {
    const nav: any = navigation ? navigation : []
    setNestedMenu(nav)
  }, [navigation, access])

  useEffect(() => {
    return () => {
      setNestedMenu([])
    }
  }, [])

  return (
    <>
      <SideNavContainer
        className={`sidenav ${collapsedSidebar} ${location.pathname == '/account/change-password' && 'bg-transparent border-0'} ${collapsedSidebar == 'expand' && screen.width <= 575 ? 'visible' : 'hidden'}`}
      >
        <div
          className='sidebar-content d-flex align-items-start flex-column mb-3'
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          <div className='mb-auto w-100'>
            <div style={{ marginBottom: '5rem' }} >
              <AppLogo onChangeVisible={() => dispatch(toggleSidebarMenu())} collapsedSidebar={collapsedSidebar} />
            </div>
            {
              location.pathname != '/account/change-password' &&
              <>
                {/* <WorkspaceSearch /> */}
                <AccordionMenu menu={nestedMenu} />
              </>
            }
            {/* <SideNavDivider className='m-0' /> */}
          </div>
          {/* {
            location.pathname != '/account/change-password' &&
            <div className='pb-3 w-100'>
              <Nav className='flex-column px-icon'>
                <NavLink className='no-hover-bg nav-link py-2' to={`/admin/role`}>
                  <span className='icon'>
                    <i className="fa-solid fa-key"></i>
                  </span>
                  <span className={collapsedSidebar}> Roles</span>
                </NavLink>
                <NavLink className='no-hover-bg nav-link py-2' to={`/admin/users`}>
                  <span className='icon'>
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <span className={collapsedSidebar}> User Management</span>
                </NavLink>
                <NavLink className='no-hover-bg nav-link py-2' to={`/admin/menu`}>
                  <span className='icon'>
                    <i className="fa-solid fa-bars"></i>
                  </span>
                  <span className={collapsedSidebar}> Menu</span>
                </NavLink>
              </Nav>
            </div>
          } */}
        </div>
      </SideNavContainer>

      {/* sidenav sub */}
      {
        subSideNav?.length > 0 &&
        <SideNavContainer
          className={`sidenav`}
          style={{ left: '16.667rem', boxShadow: '20px 0px 20px rgba(var(--black-900-rgb), .05)' }}
        >
          <BackButton>
            <div className="d-flex">
              <Button
                type='button'
                className='d-none d-sm-block me-3 p-0 bg-transparent text-body no-outline'
                variant='btn-link'
                onClick={() => handleClickHideSubSideNav()}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </Button>
              <TitleSideNavSub>{subSideNavActive?.display}</TitleSideNavSub>
            </div>
          </BackButton>

          <SideNavDivider className='mb-2 mt-0' />
          <AccordionMenu menu={subSideNav} />
        </SideNavContainer>
      }

    </>
  );
}
