import { SideNavDivider } from '@app/styled/sidenav.styled';
import React, { useEffect, useState } from 'react';
import { Accordion, Card, Dropdown, useAccordionButton } from 'react-bootstrap';
import styled from 'styled-components';

import { setSubSideNavActive } from '@app/store/reducers/ui';
import { useDispatch } from 'react-redux';
import { JSONtoString, stringToJSON } from '@app/helper/data.helper';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

const MenuItemContainer = styled.div`
  display: 'flex';
  justify-content: space-between;
`;

export default function AccordionMenuManagement({
  menu,
  subnes,
  level = 1,
  maxLevel = 6,
  handleEdit,
  handleMoveUp,
  handleMoveDown,
  handleDelete,
}: IAccordionMenu) {
  const dispatch = useDispatch();
  const [roleActions, setRoleActions] = useState<any>({});
  const handleClickMenu = (data: any) => {
    const payload = data;
    dispatch(setSubSideNavActive(payload));
  };

  function CustomToggle({ children, eventKey }: any) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!')
    );

    return <div onClick={decoratedOnClick}>{children}</div>;
  }

  const btnClickEdit = (menu: any) => {
    if (handleEdit) {
      handleEdit(menu);
    }
  };

  const btnClickDelete = (menu: any) => {
    if (handleDelete) {
      handleDelete(menu);
    }
  };

  const btnClickMoveUp = (menu: any, menuArr: any) => {
    let menus: any = stringToJSON(JSONtoString(menuArr))
    if (handleMoveUp) {
      let index = menus.findIndex((e: any) => e.id == menu?.id);
      if (index > 0) {
        let el = menus[index];
        menus[index] = menus[index - 1];
        menus[index - 1] = el;
      }

      const params = menus?.map((item: any, index: number) => {
        return { id: item?.id, display: item?.display, no: index + 1 };
      });
      handleMoveUp(params);
    }
  };

  const btnClickMoveDown = (menu: any, menuArr: any) => {
    let menus: any = stringToJSON(JSONtoString(menuArr))

    if (handleMoveDown) {
      let index = menus.findIndex((e: any) => e.id == menu?.id);
      if (index !== -1 && index < menus.length - 1) {
        let el = menus[index];
        menus[index] = menus[index + 1];
        menus[index + 1] = el;
      }

      const params = menus?.map((item: any, index: number) => {
        return { id: item?.id, display: item?.display, no: index + 1 };
      });

      handleMoveDown(params);
    }
  };

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("menu")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
      sort: ROLE_ACTION(roleAccess, 'sort'),
    };
    setRoleActions(roleAct);
  }, [])

  return (
    <>
      {menu?.map((item: any, index: number) => (
        <div key={index}>
          {item?.children?.length == 0 || level == maxLevel ? (
            <>
              <AccordionMenuNavLink
                roleActions={roleActions}
                menu={item}
                level={level}
                subnes={subnes}
                onClickThirdMenu={handleClickMenu}
                btnClickEdit={btnClickEdit}
                btnClickDelete={btnClickDelete}
                btnClickMoveUp={(e: any) => btnClickMoveUp(e, menu)}
                btnClickMoveDown={(e: any) => btnClickMoveDown(e, menu)}
              ></AccordionMenuNavLink>
            </>
          ) : (
            <>
              <Accordion className='menu-management' defaultActiveKey={index == 0 ? '0' : ''}>
                <Card>
                  <Card.Header className='accordion-header'>
                    <div className='d-flex justify-content-between'>
                      <CustomToggle eventKey='0'>
                        {item?.icon && (
                          <span
                            className='icon'
                            dangerouslySetInnerHTML={{
                              __html: `<i class='${item?.icon}'></i>`,
                            }}
                          ></span>
                        )}
                        {item?.display}
                      </CustomToggle>
                      {(roleActions?.update || roleActions?.delete || roleActions?.sort) &&
                        <Dropdown
                          className='hide-toogle hide-focus'
                          align={'end'}
                        >
                          <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 px-0 text-body'>
                            <i className='fa-solid fa-ellipsis font-weight-bold text-white'></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {roleActions?.sort &&

                              <>
                                <Dropdown.Item onClick={() => btnClickMoveUp(item, menu)}>Move Up</Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => btnClickMoveDown(item, menu)}
                                >
                                  Move Down
                                </Dropdown.Item>
                              </>

                            }
                            {roleActions?.update &&
                              <Dropdown.Item onClick={() => btnClickEdit(item)}>
                                Edit
                              </Dropdown.Item>
                            }
                            {roleActions?.delete &&
                              <Dropdown.Item className='text-danger' onClick={() => btnClickDelete(item)}>
                                Hapus
                              </Dropdown.Item>
                            }


                          </Dropdown.Menu>
                        </Dropdown>
                      }

                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventKey='0'>
                    <Card.Body className={`accordion-body pb-2 pe-0 pt-1`}>
                      <AccordionMenuManagement
                        menu={item?.children}
                        subnes={true}
                        level={level + 1}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleMoveUp={handleMoveUp}
                        handleMoveDown={handleMoveDown}
                      ></AccordionMenuManagement>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              {menu?.length != index + 1 && subnes != true && (
                <SideNavDivider className='m-0 divider-nav' />
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
}

function AccordionMenuNavLink({
  roleActions,
  menu,
  subnes,
  onClickThirdMenu,
  btnClickEdit,
  btnClickDelete,
  btnClickMoveUp,
  btnClickMoveDown,
}: any) {

  return (
    <>
      {menu?.children?.length <= 0 ? (
        <div className='nav-link'>
          <MenuItemContainer className='d-flex justify-content-between'>
            <div>
              {menu?.icon && (
                <span
                  className='icon'
                  dangerouslySetInnerHTML={{
                    __html: `<i class='${menu?.icon}'></i>`,
                  }}
                ></span>
              )}
              {menu?.display}
            </div>
            {roleActions?.update && roleActions?.delete && roleActions?.sort &&
              <Dropdown className='hide-toogle hide-focus' align={'end'}>
                <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 px-0 text-body'>
                  <i className='fa-solid fa-ellipsis font-weight-bold'></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>

                  {roleActions?.sort &&
                    <>
                      <Dropdown.Item onClick={() => btnClickMoveUp(menu)}>
                        Move Up
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => btnClickMoveDown(menu)}>Move Down</Dropdown.Item>
                    </>
                  }
                  {roleActions?.update &&
                    <Dropdown.Item onClick={() => btnClickEdit(menu)}>
                      Edit
                    </Dropdown.Item>
                  }
                  {roleActions?.delete &&
                    <Dropdown.Item className='text-danger' onClick={() => btnClickDelete(menu)}>Hapus</Dropdown.Item>
                  }


                </Dropdown.Menu>
              </Dropdown>
            }

          </MenuItemContainer>
        </div>
      ) : (
        <a
          className='nav-link cursor-pointer'
          onClick={() => subnes && onClickThirdMenu(menu)}
        >
          <MenuItemContainer>
            {menu?.icon && (
              <span
                className='icon'
                dangerouslySetInnerHTML={{
                  __html: `<i class='${menu?.icon}'></i>`,
                }}
              ></span>
            )}
            {menu?.display}
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
  handleEdit?: any;
  handleDelete?: any;
  handleMoveUp?: any;
  handleMoveDown?: any;
}
