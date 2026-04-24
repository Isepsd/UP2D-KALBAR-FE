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
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router-dom';

import EventKirimPornasDetailOnTableDetail from '@app/pages/Apkt/KirimEventKePornas/EventKirimPornasDetailOnTableDetail';

type Props = {
  columns: any;
  data: any;
  handleExpandRow: any;
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
  RowExpand?: any;
  handleFilterChange?: any;
};

const NoData = styled.div`
  border-radius: 1rem;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  color: var(--gray, #888);
`;

const StyledTable = styled.table`
  min-width: 10%
  border-collapse: collapse;

  th, td {
    border: 1px solid var(--border-color, #ddd);
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: var(--white);
    color: var(--black);
  }

  tr:hover {
    background-color: var(--hover-bg, #f1f1f1);
  }
`;

const ReactTable: FC<Props> = ({
  columns,
  data,
  onSort,
  onFilters,
  RowExpand,
  // handleExpandRow,
  columnFilters = false,
  containerClass = 'table my-3',
  rowSelectType = 'checkbox',
  rowSelect = false,
  onCheckedRows,
  selectedRows = {},
  styles,
  loading,
  showNoResul = true,
  handleFilterChange
}) => {
  const navigate = useNavigate(); // Menggunakan useNavigate untuk mengganti URL
  const [stylesReactTable] = useState(styles);
  const [filterValues, setFilterValues] = useState<any>({}); // Store filter values
  const [sortState, setSortState] = useState<any[]>([]);

  const defaultColumn: any = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const initialState: any = React.useMemo(
    () => ({
      selectedRowIds: selectedRows,
      sortBy: sortState.length > 0 ? sortState : [], // Gunakan sortState jika ada
    }),
    [selectedRows, sortState]
  );
  const getColumnStyle = (column: any) => {
    if (column.pinned || (rowSelectType === 'radio' && column.accessor === 'selection')) {
      return {
        position: 'sticky',
        left: 0,
        zIndex: 10,
        backgroundColor: 'var(--white)', // Tambahkan latar belakang agar kolom tetap terlihat
      };
    }
    return {};
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { sortBy, filters },
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: initialState,
      stateReducer: (newState: any, action: any) => {
        if (action.type === 'toggleRowSelected' && rowSelectType === 'radio') {
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
              Header: rowSelectType === "checkbox" ? ({ getToggleAllRowsSelectedProps }: any) => (
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              ) : "",
              accessor: 'selection',
              minWidth: '20px',
              canFilter: false,
              disableSortBy: true,
              show: true,
              disableFilters: true,
              pinned: rowSelectType === 'radio',  // Kolom ini dipin jika rowSelectType adalah radio
              style: getColumnStyle,  // Terapkan style dari getColumnStyle
              Cell: ({ row }: any) => {
                if (row?.original?.hiddenCheck === true) {
                  return (<></>);
                }
                return (<IndeterminateCheckbox
                  type={rowSelectType}
                  {...row.getToggleRowSelectedProps()}
                />);
              },
            },
            ...columns,
          ];
        });
    }
  );
  
  useEffect(() => {
    if (sortBy.length > 0) {
      setSortState(sortBy);

      onSort && onSort({ sortBy });

    }
  }, [onSort, sortBy]);

  useEffect(() => {
    onFilters && onFilters({ filters });
  }, [onFilters, filters]);

  useEffect(() => {
    onCheckedRows && onCheckedRows(selectedFlatRows.map((d: any) => d.original));
  }, [selectedFlatRows]);
  const handleColumnFilterChange = (column: any, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterValues = { ...filterValues, [column.id]: event.target.value };
    setFilterValues(newFilterValues); // Update filter state

    // Update URL with new query parameter
    const queryParams = new URLSearchParams(window.location.search); // Get existing query params
    queryParams.set(column.id, event.target.value); // Add or update filter value in URL
    navigate({
      pathname: window.location.pathname, // Keep the current path
      search: queryParams.toString(), // Update query string
    });

    handleFilterChange && handleFilterChange(column, event); // Optional: Pass to the parent component
  };

  return (
    <>
      <ReactTableStyle className={containerClass} style={stylesReactTable || { minHeight: '18rem' }}>
        <div className="mb-3" style={{ height: '100%', overflowY: 'auto', overflowX: 'auto' }}>
          <StyledTable {...getTableProps()} style={{ minWidth: '100%', maxWidth: 'max-content' }}>

            <thead>
              {headerGroups.map((headerGroup: any, iHeader: any) => (
                <tr key={iHeader} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any, iColumn: any) => (
                    <th
                      key={`${iHeader}-${iColumn}`}
                      id={column.id}
                      style={{
                        minWidth: column?.minWidth,
                        textAlign: 'center',
                        ...(
                          column.pinned && {
                            position: 'sticky',
                            left: column.stickyLeft || 0,
                            zIndex: 10,
                            background: 'var(--white)',
                          }
                        ),
                      }}
                      {...column.getHeaderProps()}
                      className={column?.customClass}
                    >
                      {/* Header Content */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {column.render('Header')}

                        {/* Sorting Icons with title attribute */}
                        {columnFilters && column.accessor && !column.disableSortBy && (
                          <span
                            style={{
                              marginLeft: '5px',
                              cursor: 'pointer',
                              fontSize: '1.2rem',
                            }}
                            onClick={() => {
                              // If the column isn't sorted yet, start with ascending (true), then toggle to descending when clicked
                              column.toggleSortBy(column.isSortedDesc ? false : true);
                            }}
                            title={column.isSortedDesc ? 'Sort Descending' : column.isSorted ? 'Sort Ascending' : 'Click to Sort'} // Tooltip Text
                          >
                            {/* Show the default ascending arrow (↑) if not sorted, and toggle between ascending and descending */}
                            {column.isSortedDesc ? (
                              <i className="fas fa-arrow-down"></i>  // Descending
                            ) : column.isSorted ? (
                              <i className="fas fa-arrow-up"></i>  // Ascending
                            ) : (
                              <i className="fas fa-sort"></i>  // Default (not sorted)
                            )}
                          </span>


                        )}

                        {/* Clear Sort Icon with title */}
                        {column.isSorted && (
                          <span
                            style={{
                              marginLeft: '10px',
                              cursor: 'pointer',
                              fontSize: '1.2rem',
                            }}
                            onClick={() => {
                              column.clearSortBy();
                              setSortState([]); // Resetting the sort state
                              if (onSort) {
                                onSort({ sortBy: [] }); // Trigger callback
                              }
                            }}
                            title="Clear Sort"
                          >
                            <i className="fas fa-times-circle"></i>  {/* Clear sort icon */}
                          </span>
                        )}
                      </div>
                      {/* Column Filter */}
                      {columnFilters && !column.disableFilters && column.accessor && (
                        <div
                          className="mt-2"
                          style={{
                            minWidth: column.minWidth,
                            position: 'relative',
                          }}
                        >
                          <i
                            className="fa fa-search"
                            style={{
                              position: 'absolute',
                              left: '10px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: 'var(--black)',
                            }}
                          ></i>
                          {/* <input
                            type={column.id.includes('datum') || column.id.includes('tanggal') || column.id.includes('datetime_status_2') ? 'date' : 'text'}
                            placeholder={
                              column.id.includes('datum') || column.id.includes('tanggal') || column.id.includes('datetime_status_2')
                                ? 'Pilih tanggal'
                                : 'Cari'
                            }
                            value={filterValues[column.id] || ''}
                            onChange={(e) => handleColumnFilterChange(column, e)}
                            style={{
                              width: '100%',
                              padding: '0.5rem 0.5rem 0.5rem 30px',
                              border: '1px solid var(--input-border-color, #ddd)',
                              borderRadius: '4px',
                              backgroundColor: 'var(--white)',
                              color: 'var(--black)',
                            }}
                          /> */}
                          {column.id === 'f_status_2' ? (
                            <select
                              value={filterValues[column.id] || ''}
                              onChange={(e: any) => handleColumnFilterChange(column, e)}
                              style={{
                                width: '100%',
                                padding: '0.5rem 0.5rem 0.5rem 30px',
                                border: '1px solid var(--input-border-color, #ddd)',
                                borderRadius: '4px',
                                backgroundColor: 'var(--white)',
                                color: 'var(--black)',
                              }}
                            >
                              <option value="">-- Semua Status --</option>
                              <option value="up">Nyala</option>
                              <option value="down">Padam</option>
                            </select>
                          ) : column.id === 'butuh_padam' ? (
                            <select
                              value={filterValues[column.id] || ''}
                              onChange={(e: any) => handleColumnFilterChange(column, e)}
                              style={{
                                width: '100%',
                                padding: '0.5rem 0.5rem 0.5rem 30px',
                                border: '1px solid var(--input-border-color, #ddd)',
                                borderRadius: '4px',
                                backgroundColor: 'var(--white)',
                                color: 'var(--black)',
                              }}
                            >
                              <option value="">-- SEMUA --</option>
                              <option value="1">YA</option>
                              <option value="0">TIDAK</option>
                            </select>
                          ) : (
                            <input
                              type={
                                column.id.includes('datum') ||
                                  column.id.includes('tanggal') ||
                                  column.id.includes('datetime_status_2') ||
                                  column.id.includes('periode')

                                  ? 'date'
                                  : 'text'
                              }
                              placeholder={
                                column.id.includes('datum') ||
                                  column.id.includes('tanggal') ||
                                  column.id.includes('datetime_status_2') ||
                                  column.id.includes('periode')
                                  ? 'Pilih tanggal'
                                  : 'Cari'
                              }
                              value={filterValues[column.id] || ''}
                              onChange={(e) => handleColumnFilterChange(column, e)}
                              style={{
                                width: '100%',
                                padding: '0.5rem 0.5rem 0.5rem 30px',
                                border: '1px solid var(--input-border-color, #ddd)',
                                borderRadius: '4px',
                                backgroundColor: 'var(--white)',
                                color: 'var(--black)',
                              }}
                            />
                          )}

                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
  {rows.map((row: any, i: number) => {
    prepareRow(row);
    const approvel_area = row.original.approvel_area;
    const approvel_apd = row.original.approvel_apd;

    let backgroundColor = '';
    if (approvel_area === 1 && approvel_apd === 0) {
      backgroundColor = '#FFFE99'; // Soft yellow
    } else if (approvel_area === 1 && approvel_apd === 1) {
      backgroundColor = '#81C784'; // Soft green
    } else if (approvel_area === 1 && approvel_apd === 2) {
      backgroundColor = '#FA8072'; // Salmon red
    }

    return (
      <React.Fragment key={`tbody.tr${i}`}>
        <tr {...row.getRowProps()}>
                      {row.cells.map((cell: any, indexTd: number) => (
            //     <td
            //       {...cell.getCellProps()}
            //       key={`tbody.tr${i}.td${indexTd}`}
            //       style={{
            //         ...(cell?.column?.pinned && {
            //           position: 'sticky',
            //           left: cell?.column?.stickyLeft || 0,
            //           zIndex: 10,
            //           background: 'var(--white)',
            //         }),
            //         backgroundColor: backgroundColor || 'var(--white)',
            //       }}
            //     >
              
            //   {cell.column.extrarow ? (
            //     <button
            //       className="btn btn-sm"
            //       style={{ backgroundColor: '#6c757d', color: 'white' }}
            //       onClick={() => handleExpandRow(row.original.id)}
            //     >
            //       <i className={`fas ${RowExpand.includes(row.original.id) ? 'fa-chevron-down' : 'fa-chevron-right'}`} />
            //     </button>
            //   ) : (
            //     cell.render('Cell')
            //   )}
            // </td>

            <td
              {...cell.getCellProps()}
              key={`tbody.tr${i}.td${indexTd}`}
              style={{
                ...(cell?.column?.pinned && {
                  position: 'sticky',
                  left: cell?.column?.stickyLeft || 0,
                  zIndex: 10,
                  background: 'var(--white)',
                }),
                backgroundColor: backgroundColor || 'var(--white)',
              }}
            >
              {cell.render('Cell')}
            </td>

          ))} 
      
        </tr>

    
       {/* Expand detail */}
{RowExpand.includes(row.original.id) && (

    <td  colSpan={row.cells.length + 1}   >
      <div
        className="extra-row-content"
        style={{
          maxHeight: '300px',
          maxWidth: '1200px',
          overflowY: 'auto',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <EventKirimPornasDetailOnTableDetail id={row.original.id} />
      </div>
    </td>

)}


      </React.Fragment>
    );
  })}

  {/* Kalau tidak ada hasil */}
  {showNoResul && rows.length === 0 && !loading && (
    <tr style={{ borderBottom: '1px solid var(--body-bg)' }}>
      <td colSpan={1000} className="text-center fw-bold" style={{ padding: '2rem 0', fontSize: '1.25rem' }}>
        <NoData>
          <NoDataIllustration width={150} />
        </NoData>
        <Title className="mt-3">Tidak Tersedia</Title>
        <p className="small fw-normal" style={{ color: 'var(--black-300)' }}>
          Maaf, data tidak tersedia di widget ini.
        </p>
      </td>
    </tr>
  )}
</tbody>



          </StyledTable>
        </div>
      </ReactTableStyle>
    </>
  );

};

const Title = styled.h4`
  font-size: 1.25rem;
`;

export default ReactTable;
