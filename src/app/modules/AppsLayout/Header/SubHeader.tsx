import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Popover,
  Row,
} from 'react-bootstrap';

import '@styles/_subheader.scss';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useApp } from '@app/context/AppContext';
import { useLocation } from 'react-router-dom';

const SubHeaderContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 4.8rem;
  padding-left: 16.667rem;
  background: var(--white);
  border-bottom: 1px solid var(--black-75);
`;

function SubHeader({ children, filterLayout = 'dropdown' }: any) {
  const location = useLocation();
  const { activePage, activeFilters } = useSelector((state: any) => state.ui);
  const [search, setSearch] = useState<any>('');
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const [showFilterCard, setShowFilterCard] = useState<boolean>(true);
  const [layout, setLayout] = useState<string>(filterLayout);
  const { onChangeSearchValue } = useApp();

  /** SEARCH HANDLER */
  const searchHandler = (value: any) => {
    onChangeSearchValue(value || '');
  };

  const debouncedSearchHandler = useCallback(debounce(searchHandler, 500), []);

  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  useEffect(() => {
    debouncedSearchHandler(search);
  }, [search]);

  useEffect(() => {
    setSearch('');
  }, [location.pathname]);

  const handleToggleFilter = () => {
    if (filterLayout == 'dropdown') {
      setShowFilterDropdown(!showFilterDropdown);
    } else if (filterLayout == 'card') {
      setShowFilterCard(!showFilterCard);
    }
  };

  useEffect(() => {
    if (filterLayout != layout) {
      setLayout(filterLayout)
    }
  }, [filterLayout])


  if (activePage?.isSubUrl) {
    return <></>;
  }

  return (
    <>
      {(children || activePage?.search) && (
        <>
          <SubHeaderContainer className='sub-header'>
            <Container>
              <Row>
                <Col lg='3' xs='12'>
                  {activePage?.search && (
                    <InputGroup size='sm'>
                      <InputGroup.Text
                        id='search-data'
                        className='bg-transparent border-0 ps-0'
                      >
                        <i className='fa-solid fa-magnifying-glass fa-fw'></i>
                      </InputGroup.Text>
                      <FormControl
                        onChange={handleChangeSearch}
                        size='sm'
                        className='search bg-transparent ps-0 border-0'
                        placeholder='Cari...'
                        aria-label='Cari...'
                        aria-describedby='search-wsp'
                        value={search}
                      />
                    </InputGroup>
                  )}
                </Col>
                {(children && layout == 'dropdown') && (
                  <>
                    <Col>
                      <div className='d-none d-md-block'>
                        <div className='d-flex justify-content-end'>
                          <div
                            className='dropdown hide-toogle'
                            style={{ zIndex: 3 }}
                          >
                            {activeFilters?.count > 0 && (
                              <span className='text-muted small'>
                                {activeFilters?.count} Filter Aktif
                              </span>
                            )}
                            <button
                              className='btn btn-sm btn-primary dropdown-toggle my-1 ms-3'
                              type='button'
                              onClick={handleToggleFilter}
                            >
                              <i className="fa-solid fa-filter"></i>
                            </button>
                            <div
                              className={`dropdown-menu filter ${showFilterDropdown ? ' show' : ''
                                }`}
                              style={{ right: 0 }}
                            >
                              <Popover.Body
                                className='pt-3'
                                style={{ minWidth: '28rem' }}
                              >
                                <p className='font-weight-600 text-uppercase'>
                                  Filter Data
                                </p>
                                <hr />
                                {children ? (
                                  <>{children}</>
                                ) : (
                                  <p className='mb-0 text-muted'>
                                    Filter tidak tersedia.
                                  </p>
                                )}
                              </Popover.Body>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </>
                )}
              </Row>
            </Container>
          </SubHeaderContainer>
        </>
      )}
      {children && showFilterCard && layout == 'card' && (
        <Card className='card mt-4'>
          <Card.Header className='text-uppercase'>FILTER</Card.Header>
          <Card.Body>{children}</Card.Body>
        </Card>
      )}
    </>
  );
}

export default React.memo(SubHeader)