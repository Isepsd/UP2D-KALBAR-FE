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
import { useNavigate } from 'react-router-dom';

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
  width: 100%;
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
    if (column.pinned) {
      return {
        position: 'sticky',
        left: 0,
        zIndex: 10,
        backgroundColor: 'white', // Tambahkan latar belakang agar terlihat jelas
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
    state: { sortBy,filters },
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
              pinned: false,
              style: getColumnStyle, 
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
            ...columns.map((column: any) => {
              if (column.freeze) {
                column.pinned = true;
                column.style = getColumnStyle(column);
              }
              return column;
            }),
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
      <ReactTableStyle
        className={containerClass}
        style={stylesReactTable || { minHeight: '18rem' }}
      >
        <PerfectScrollbar className="mb-3" style={{ height: '100%' }}>
          <StyledTable {...getTableProps()}>
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
                            background: 'white',
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
                          <input
                            type={column.id.includes('datum') ? 'date' : 'text'}
                            placeholder={
                              column.id.includes('datum')
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
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any, i: any) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={`tbody.tr${i}`}>
                    {row.cells.map((cell: any, indexTd: any) => (
                      <td
                        {...cell.getCellProps()}
                        key={`tbody.tr${i}.td${indexTd}`}
                        id={cell?.column?.id}
                        style={{
                          ...(cell?.column?.pinned && {
                            position: 'sticky',
                            left: cell?.column?.stickyLeft || 0,
                            zIndex: 10,
                            background: 'white',
                          }),
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
  
              {/* No Results Row */}
              {showNoResul && rows?.length === 0 && !loading && (
                <tr style={{ borderBottom: '1px solid var(--body-bg)' }}>
                  <td
                    colSpan={1000}
                    className="text-center fw-bold"
                    style={{ padding: '2rem 0', fontSize: '1.25rem' }}
                  >
                    <NoData>
                      <NoDataIllustration width={150} />
                    </NoData>
                    <Title className="mt-3">Tidak Tersedia</Title>
                    <p
                      className="small fw-normal"
                      style={{ color: 'var(--black-300)' }}
                    >
                      Maaf, data tidak tersedia di widget ini.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </StyledTable>
        </PerfectScrollbar>
      </ReactTableStyle>
    </>
  );
  
  
};

const Title = styled.h4`
  font-size: 1.25rem;
`;

export default ReactTable;
