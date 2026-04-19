import React, { useState, useEffect, useRef } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap';
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';

interface ITableDataJqxGrid {
  dataFieldsColsConfig: any;
  dataSources?: any;
  path: any;
  filterParams?: any;
  primaryKey: any;
  selectionmode?: any;
  respDataApi: any;
  rowData: any;
  serachBar?: boolean;
  onCheckedRows?: any;
  editable?: any;
}

export default function TableDataJqxGrid({ dataFieldsColsConfig = [], dataSources, path, primaryKey, filterParams = {}, selectionmode, respDataApi, rowData, serachBar = false, onCheckedRows, editable = false }: ITableDataJqxGrid) {
  const source = axios.CancelToken.source();
  const Grid = useRef<JqxGrid>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [columns] = useState<IGridProps["columns"]>(dataFieldsColsConfig.columns);

  /** DATA RESP */
  const [respData, setRespData] = useState<any>([]);
  const [dataRowsMaps, setDataRowsMaps] = useState<any>([]); // MAP DATA RESPONSE from module yang manggil
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const rowsChecked = useRef<any>([]);

  const handleRowSelectionChange = () => {
    const selectedRowIndexes = Grid.current?.getselectedrowindexes();
    const rowCount: any = Grid.current?.getdatainformation().rowscount || 0;

    const checkedRows: any[] = [];
    const uncheckedRows: any[] = [];

    for (let i = 0; i < rowCount; i++) {
      const row: any = Grid.current?.getrowdata(i);
      if (row !== undefined) {
        if (selectedRowIndexes?.includes(i)) {
          checkedRows.push(row);
        } else {
          uncheckedRows.push(row);
        }
      }
    }

    checkedRows.forEach((row: any) => {
      if (!rowsChecked.current.some((checkedRow: any) => checkedRow[primaryKey] === row[primaryKey])) {
        rowsChecked.current.push(row);
      }
    });

    uncheckedRows.forEach((row: any) => {
      const index = rowsChecked.current.findIndex((checkedRow: any) => checkedRow[primaryKey] === row[primaryKey]);
      if (index !== -1) {
        rowsChecked.current.splice(index, 1);
      }
    });

    onCheckedRows(rowsChecked);
  };

  const handleRowsSelected = () => {
    handleRowSelectionChange();
  }
  const handleRowUnselect = () => {
    handleRowSelectionChange();
  }

  const dataSource: any = {
    dataFields: dataFieldsColsConfig?.dataFields,
    dataType: "json",
    id: primaryKey,
    // localData: {},
    localData: dataRowsMaps ? dataRowsMaps : dataSources,
    totalrecords: totalRecords,
  };

  const rendergridrows = (): any[] => {
    return dataRowsMaps;
  };

  const handleOnPagechanged = () => {
    getAllData();
  };

  const handleOnPagesizechanged = () => {
    getAllData();
  };

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
    filterParams = { ...filterParams, page: 1, keyword: event.target.value }
    getAllData();
  };

  /** GET DATA */
  const getAllData = async () => {
    let pagination: any = Grid.current?.getpaginginformation();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      if (searchValue) {
        filterParams = { ...filterParams, page: 1, keyword: searchValue }
      }
      const params = {
        page: pagination?.pagenum ? pagination?.pagenum + 1 : 1,
        limit: pagination?.pagesize ? pagination?.pagesize : 10,
        ...filterParams
      };
      // console.log('params', params)
      const req: any = await getAllByPath(path, params, source.token);
      const { results, total } = req;
      setTotalRecords(total)
      setRespData(results);
      setLoading(false);
    } catch (err: any) {
      console.error('Error retrieving data:', err);
      setLoading(false);
    }
  };
  // console.log('dataRowsMaps', dataRowsMaps)

  /** GET DATA */
  useEffect(() => {
    getAllData();
    return () => {
      source.cancel("Request cancelled");
    };
  }, []);

  useEffect(() => {
    respDataApi(respData);
  }, [respData]);

  useEffect(() => {
    if (rowData) setDataRowsMaps(rowData);
  }, [rowData]);


  return (
    <>
      <TopBarLoader isLoading={loading} />
      {serachBar &&
        <InputGroup className='mb-2'>
          <InputGroup.Text id='search-wsp' style={{ background: 'var(--black-5)' }} >
            <i className='fa fa-search fa-fw'></i>
          </InputGroup.Text>
          <FormControl
            className='search ps-0'
            placeholder=' Cari...'
            aria-label=' Cari...'
            aria-describedby='search-wsp'
            onChange={handleSearch}
            style={{ background: 'var(--black-5)', borderLeft: 0 }}
          />
        </InputGroup>
      }

      <JqxGrid
        ref={Grid}
        width={"100%"}
        autoheight={true}
        autorowheight={true}
        source={new jqx.dataAdapter(dataSource)}
        virtualmode={true}
        columns={columns}
        rendergridrows={rendergridrows}
        // filterable={true}
        // showfilterrow={true}

        // select options
        selectionmode={selectionmode}
        onRowselect={handleRowsSelected}
        onRowunselect={handleRowUnselect}
        sortable={true}
        altrows={true}

        editable={editable}

        // Paging Options
        pageable={true}
        onPagechanged={handleOnPagechanged}
        onPagesizechanged={handleOnPagesizechanged}

        columnsresize={true}
        theme={"light"}
      />
    </>
  )
}
