import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

type Props = {
  pagination: any;
  handlePaginationClick: (e: any) => void;
  suffixTotal?: string;
  forced?: boolean;
};

const PaginationProp: FC<Props> = ({
  pagination,
  handlePaginationClick,
  suffixTotal = 'Data',
  forced = true
}) => {

  const onClickPageLink = (v: any) => {
    handlePaginationClick(v)   
  }

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
            </div>
            {pagination?.info &&

              <div className='text-muted d-none d-sm-block'>
                data kosong : {pagination?.info}
              </div>

            }
            <div className='text-muted d-none d-sm-block'>
              {pagination?.totalData} {suffixTotal}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PaginationProp;
