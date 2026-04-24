/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useExpanded,
  useRowSelect,
} from 'react-table';
import styled from 'styled-components';
import NoDataIllustration from '../Illustration/NoDataIllustration';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { DefaultColumnFilter } from './ReactTableFilter';
import { ReactTableStyle } from './ReactTableStyle';
import PerfectScrollbar from 'react-perfect-scrollbar';

type Props = {
  columns: any;
  data: any;
  onSort?: any;
  onFilters?: any;
  columnFilters?: boolean;
  containerClass?: string;
  rowSelectType?: string;
  rowSelect?: boolean;
  onCheckedRows?: any;
  selectedRows?: any;
  loading?: boolean;
  showNoResul?: boolean;
  styles?: any;
};

const NoData = styled.div`
  /* width: 5rem; */
  /* padding: 1.1rem; */
  /* background: var(--black-25); */
  border-radius: 1rem;
  margin:0 auto;
`;

const ReactTable: FC<Props> = ({
  columns,
  data,
  onSort,
  onFilters,
  columnFilters = false,
  containerClass = 'table my-3',
  rowSelectType = 'checkbox',
  rowSelect = false,
  onCheckedRows,
  selectedRows = {},
  styles,
  loading,
  showNoResul = true
}) => {
  const [stylesReactTable] = useState(styles)
  const defaultColumn: any = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const initialState: any = React.useMemo(
    () => ({
      selectedRowIds: selectedRows
    }),
    [selectedRows]
  );
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { sortBy, filters }, // expanded , selectedRowIds
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: initialState,
      stateReducer: (newState: any, action: any) => {
        if (action.type === 'toggleRowSelected' && rowSelectType == 'radio') {
          newState.selectedRowIds = {
            [action.id]: true,
          };
        }

        return newState;
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    useRowSelect,
    (hooks) => {
      rowSelect &&
        hooks.visibleColumns.push((columns: any) => {
          return [
            {
              Header: rowSelectType == "checkbox" ? ({ getToggleAllRowsSelectedProps }: any) => (
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              ) : "",
              accessor: 'selection',
              minWidth: '20px',
              canFilter: false,
              disableSortBy: true,
              show: true,
              disableFilters: true,
              Cell: ({ row }: any) => {
                if (row?.original?.hiddenCheck === true) {
                  return (<></>)
                }
                return (<IndeterminateCheckbox
                  type={rowSelectType}
                  // disabled={row?.original?.disabled || false}
                  {...row.getToggleRowSelectedProps()}
                />)
              },
            },
            ...columns,
          ];
        });
    }
  );

  useEffect(() => {
    onSort && onSort({ sortBy });
  }, [onSort, sortBy]);

  useEffect(() => {
    onFilters && onFilters({ filters });
  }, [onFilters, filters]);

  useEffect(() => {
    onCheckedRows && onCheckedRows(selectedFlatRows.map((d: any) => d.original));
  }, [selectedFlatRows]);
  // Render the UI for your table

  return (
    <>
      <ReactTableStyle
        className={containerClass}
        style={stylesReactTable ? stylesReactTable : { minHeight: '18rem' }}
      >
        <PerfectScrollbar className='mb-3' style={{ height: '100%' }}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup: any, iHeader: number) => (
                <tr key={iHeader} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any, iColumn: number) => (
                    <th key={`${iHeader}-${iColumn}`} id={column.id} style={{ minWidth: column?.minWidth }} {...column.getHeaderProps()} className={column?.customClass}>
                      <div
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render('Header')}
                        <span className='ms-2'>
                          {column?.isSorted ? (
                            column.isSortedDesc ? (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: `<i class='fas fa-long-arrow-down'></i>`,
                                }}
                              ></span>
                            ) : (
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: `<i class='fas fa-long-arrow-up'></i>`,
                                }}
                              ></span>
                            )
                          ) : (
                            ''
                          )}
                        </span>
                      </div>
                      {columnFilters && !column.disableFilters && (
                        <div
                          className='mt-2'
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.id !== 'action'
                            ? column.render('Filter')
                            : null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} >
              {rows.map((row: any, i: number) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={`tbody.tr${i}`}>
                    {row.cells.map((cell: any, indexTd: number) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          key={`tbody.tr${i}.td${indexTd}`}
                          id={cell?.column?.id}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {showNoResul == true && rows?.length == 0 && loading !== true && loading !== undefined && (
                <tr style={{ borderBottom: '1px solid var(--body-bg)' }}>
                  <td
                    colSpan={1000}
                    className='text-center fw-bold'
                    style={{
                      padding: '2rem 0',
                      fontSize: '1.25rem',
                    }}
                  >
                    <NoData><NoDataIllustration width={150}></NoDataIllustration></NoData>
                    <Title className='mt-3'>Tidak Tersedia</Title>
                    <p className="small fw-normal" style={{ color: 'var(--black-300)', }}>Maaf, data tidak tersedia di widget ini.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </PerfectScrollbar>
      </ReactTableStyle>
    </>
  );
};


const Title = styled.h4`
  font-size: 1.25rem;
`;

export default ReactTable;
