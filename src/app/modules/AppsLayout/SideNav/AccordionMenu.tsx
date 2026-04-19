import { SideNavDivider } from '@app/styled/sidenav.styled';
import React, { useMemo } from 'react';
import { Accordion } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { setSubSideNavActive } from '@app/store/reducers/ui';
import { useDispatch, useSelector } from 'react-redux';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

const MenuItemContainer = styled.div`
  /* display: 'flex'; */
  /* position:absolute;
  .icon{
    position: absolute !important;
    left:-1.5rem !important;
  } */
`;

export default function AccordionMenu({
  menu,
  subnes,
  level = 1,
  maxLevel = 3,
}: IAccordionMenu) {
  const dispatch = useDispatch();
  const { collapsedSidebar } = useSelector((state: any) => state.ui);

  const handleClickMenu = (data: any) => {
    const payload = data;
    dispatch(setSubSideNavActive(payload));
  };

  return (
    <>
      {menu?.map((item: any, index: number) => (
        <div key={index}>
          {item?.children?.length == 0 || level == maxLevel ? (
            <>
              <AccordionMenuNavLink
                menu={item}
                level={level}
                subnes={subnes}
                onClickThirdMenu={handleClickMenu}
                collapsedSidebar={collapsedSidebar}
              ></AccordionMenuNavLink>
            </>
          ) : (
            <AccordionHeader
              menu={menu}
              item={item}
              subnes={subnes}
              level={level}
              index={index}
              collapsedSidebar={collapsedSidebar}
            ></AccordionHeader>
          )}
        </div>
      ))}
    </>
  );
}

function AccordionHeader({
  menu,
  item,
  subnes,
  level,
  index,
  collapsedSidebar,
}: any) {
  const permissionChecking = useMemo(() => {
    return ROLE_ACTION(ROLE_ACCESS(item?.name), 'view');
  }, [item?.name]);

  if (permissionChecking != true) {
    return <></>;
  }

  return (
    <>
      <Accordion className='sidenav-accordion' alwaysOpen>
        <Accordion.Item eventKey='0'>
          <Accordion.Header
            className={`${
              collapsedSidebar == 'collapse' ? 'collapse-header' : ''
            }`}
          >
            <div className='d-flex gap-3'>
              {level == 1 && !item?.icon && collapsedSidebar == 'collapse' ? (
                <span className='px-icon'>
                  <i className='fa-solid fa-circle'></i>
                </span>
              ) : (
                <>
                  {item?.icon && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: `<i class='${item?.icon} icon'></i>`,
                      }}
                    ></div>
                  )}
                </>
              )}
              <span className={`label-menu ${collapsedSidebar}`}>
                {item?.display}
              </span>
            </div>
          </Accordion.Header>
          <Accordion.Body
            className={`pb-2 ${level == 2 ? 'ms-3m' : ''} ${
              subnes == false ? 'px-0' : 'px-0'
            }`}
          >
            <AccordionMenu
              menu={item?.children}
              subnes={true}
              level={level + 1}
            ></AccordionMenu>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {menu?.length != index + 1 && subnes != true && (
        <SideNavDivider className='m-0 divider-nav' />
      )}
    </>
  );
}
function AccordionMenuNavLink({
  menu,
  subnes,
  onClickThirdMenu,
  level,
  collapsedSidebar,
}: any) {
  const permissionChecking = useMemo(() => {
    return ROLE_ACTION(ROLE_ACCESS(menu?.name), 'view');
  }, [menu?.name]);

  if (permissionChecking != true) {
    return <></>;
  }

  return (
    <>
      {menu?.path ? (
        <NavLink
          className={`nav-link ${level == 3 ? 'border-left' : ''}`}
          to={menu?.path}
        >
          <MenuItemContainer className='d-flex align-items-baseline'>
            {menu?.icon && (
              <div
                className={`icon-menu ${
                  collapsedSidebar && level == 3 ? collapsedSidebar : ''
                } ${level == 3 ? 'l3' : ''}`}
                dangerouslySetInnerHTML={{
                  __html: `<i class='${menu?.icon} icon'></i>`,
                }}
              ></div>
            )}
            <span className={`label-menu ${collapsedSidebar}`}>
              {menu?.display}
            </span>
          </MenuItemContainer>
        </NavLink>
      ) : (
        <a
          className='nav-link cursor-pointer'
          onClick={() => subnes && onClickThirdMenu(menu)}
        >
          <MenuItemContainer className='d-flex align-items-baseline'>
            {menu?.icon && (
              <span
                className='icon'
                dangerouslySetInnerHTML={{
                  __html: `<i class='${menu?.icon} icon'></i>`,
                }}
              ></span>
            )}
            <span className={`label-menu ${collapsedSidebar}`}>
              {menu?.display}
            </span>
          </MenuItemContainer>
        </a>
      )}
    </>
  );
}

interface IAccordionMenu {
  menu: any;
  subnes?: boolean;
  level?: number;
  maxLevel?: number;
  onClickThirdMenu?: any;
}
