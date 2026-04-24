import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setActivePaging } from '@app/store/reducers/ui';
// import { Form } from 'react-bootstrap';
// import { nanoid } from '@reduxjs/toolkit';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';
interface ILimitOptions {
  label: any;
  value: number
}

type Props = {
  pagination: any;
  handlePaginationClick: (e: any) => void;
  suffixTotal?: string;
  forced?: boolean;
  limitOptions?: Array<ILimitOptions>;
  isOptionsPerPage?: boolean;
  onChangeItemPerPage?: any;
};

const Pagination: FC<Props> = ({
  pagination,
  handlePaginationClick,
  suffixTotal = 'Data',
  forced = true,
  limitOptions,
  isOptionsPerPage = true,
  onChangeItemPerPage,
}) => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const [limitData, setLimitData] = useState<Array<ILimitOptions>>([
    {
      label: '5',
      value: 5,
    },
    {
      label: '10',
      value: 10,
    },
    {
      label: '25',
      value: 25,
    },
    {
      label: '50',
      value: 50,
    },
    {
      label: '100',
      value: 100,
    },
    {
      label: '1000',
      value: 1000,
    },
  ]);
  const [limitSelected, setLimitSelected] = useState<any>(limitData[1]);

  useEffect(() => {
    if (limitOptions)
      setLimitData((prev: Array<ILimitOptions>) => [...prev, ...limitOptions]);
  }, [limitOptions]);

  const onClickPageLink = (v: any) => {
    handlePaginationClick(v);
    if (forced) {
      searchParams.delete('page');
      searchParams.append('page', v?.selected + 1);
      setSearchParams(searchParams);
    }
    dispatch(setActivePaging(v?.selected + 1));
  };

  const onChangePerPage = (item: any) => {
    const newValue: number = parseInt(item?.value || 10)

    setLimitSelected(item);
    onChangeItemPerPage(newValue);
// 
    if (searchParams.get('page')) {
      searchParams.delete('page');
      searchParams.append('page', '1');
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      {pagination?.totalData > 0 && (
        <section className='animate__animated animate__fadeIn'>
          <div className='pagination-container d-flex justify-content-between align-items-center'>
            <div className='d-flex justify-content-end'>
              <ReactPaginate
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me px-2'}
                pageCount={pagination.pageCount}
                forcePage={forced ? pagination?.currentPage : 0}
                marginPagesDisplayed={pagination.marginPagesDisplayed}
                pageRangeDisplayed={2}
                onPageChange={onClickPageLink}
                containerClassName={'pagination react-paginate'}
                activeClassName={'active'}
              />

              {/* {isOptionsPerPage && (
                <Form.Select
                  onChange={(e: any) => onChangePerPage(e.target.value)}
                  value={limitSelected}
                  aria-label='Default select example'
                  className='ms-4'
                >
                  {limitData.map((item: ILimitOptions) => (
                    <option key={nanoid()} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
              )} */}

              {isOptionsPerPage && (
                <div className='ms-2' style={{ width: "7rem" }}>
                  <Select
                    placeholder=""
                    defaultValue={limitSelected}
                    styles={ReactSelectStyle}
                    // value={options.filter((c: any) => c.value == value)}
                    onChange={(val: any) => onChangePerPage(val)}
                    options={limitData}
                  />
                </div>
              )}
            </div>
            {pagination?.info && (
              <div className='text-muted d-none d-sm-block'>
                data kosong : {pagination?.info}
              </div>
            )}
            <div className='text-muted d-none d-sm-block'>
              {pagination?.totalData} {suffixTotal}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Pagination;
