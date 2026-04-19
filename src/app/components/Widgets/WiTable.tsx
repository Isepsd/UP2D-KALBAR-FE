import React, { FC, useEffect, useState } from 'react';
// import ReactTable from '@app/components/ReactTable';
// import Pagination from '@app/components/Pagination/Pagination';
import { generateDummyData } from '@app/helper/faker.helper';
import { Table } from 'react-bootstrap';

type Props = {
  type: any;
  columns: any;
  columnFilters?: boolean | false
};

const WiTable: FC<Props> = ({ type }) => {
  const [, setData] = useState<any>([]);
  // const [pagination, setPagination] = useState({
  //   perPage: 10,
  //   offset: 0,
  //   currentPage: 0,
  //   pageCount: 10,
  //   totalData: 100,
  //   marginPagesDisplayed: 2,
  //   pageRangeDisplayed: 7,
  // });

  useEffect(() => {
    let dataDummy: any = [];
    const dummy: any = generateDummyData(type);

    dummy.forEach((item: any, index: number) => {
      dataDummy.push({
        ...item,
        number: index + 1,
      });
    });

    setData(dataDummy);
  }, []);

  // const dataTable = useMemo(() => data, [data]);

  // const handlePaginationClick = (e: any) => {
  //   const selectedPage = e.selected;
  //   const offset = selectedPage * pagination.perPage;

  //   setPagination((prevState) => ({
  //     ...prevState,
  //     offset: offset,
  //     currentPage: selectedPage,
  //   }));
  // };

  return (
    <>
      {/* <ReactTable columns={columns} data={dataTable} columnFilters={columnFilters} containerClass='my-3 table table-responsive' />
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
      /> */}
      <Table bordered hover>
        <thead>
          <tr>
            <th rowSpan={2} className="align-middle">KINERJA</th>
            <th colSpan={3} className="text-center">BULAN BERJALAN</th>
            <th colSpan={3} className="text-center">AKUMULATIF</th>
          </tr>
          <tr>
            <th>JUMLAH POINT</th>
            <th>UPTIME (dd:hh:mm:ss)</th>
            <th>AVA</th>
            <th>JUMLAH POINT</th>
            <th>UPTIME (dd:hh:mm:ss)</th>
            <th>AVA (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RTU</td>
            <td>10</td>
            <td>240</td>
            <td>	100%</td>
            <td>	240</td>
            <td>	10</td>
            <td>	100%</td>
          </tr>
          <tr>
            <td>RTU</td>
            <td>10</td>
            <td>240</td>
            <td>	100%</td>
            <td>	10</td>
            <td>	240</td>
            <td>	100%</td>
          </tr>
          <tr>
            <td>TSD</td>
            <td>10</td>
            <td>240</td>
            <td>	100%</td>
            <td>	240</td>
            <td>	10</td>
            <td>	100%</td>
          </tr>
          <tr>
            <td>TSS</td>
            <td>10</td>
            <td>240</td>
            <td>	100%</td>
            <td>	10</td>
            <td>	240</td>
            <td>	100%</td>
          </tr>
          <tr>
            <td>TELEMETRING</td>
            <td>10</td>
            <td>240</td>
            <td>	100%</td>
            <td>	240</td>
            <td>	10</td>
            <td>	100%</td>
          </tr>
          <tr>
            <td>MASTER</td>
            <td>10</td>
            <td>240</td>
            <td>	100%</td>
            <td>	10</td>
            <td>	240</td>
            <td>	100%</td>
          </tr>
        </tbody>
      </Table>

      <Table bordered hover>
        <thead>
          <tr>
            <th rowSpan={3} className="align-middle">JENIS RC</th>
            <th colSpan={8} className="text-center">DASHBOARD RC</th>
          </tr>
          <tr>
            <th colSpan={4} className="text-center">BULAN BERJALAN</th>
            <th colSpan={4} className="text-center">AKUMULATIF</th>
          </tr>
          <tr>
            <th>JUMLAH REMOTE</th>
            <th>GAGAL</th>
            <th>BERHASIL</th>
            <th>AVA(%)</th>
            <th>JUMLAH REMOTE</th>
            <th>GAGAL</th>
            <th>BERHASIL</th>
            <th>AVAV(%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CB</td>
            <td>10</td>
            <td>240</td>
            <td>240</td>
            <td>	100%</td>
            <td>	240</td>
            <td>	240</td>
            <td>	10</td>
            <td>	100%</td>
          </tr>
          <tr>
            <td>LBS</td>
            <td>10</td>
            <td>240</td>
            <td>240</td>
            <td>	100%</td>
            <td>	10</td>
            <td>	10</td>
            <td>	240</td>
            <td>	100%</td>
          </tr>
          <tr>
            <td>RECLOSER</td>
            <td>10</td>
            <td>240</td>
            <td>240</td>
            <td>	100%</td>
            <td>	240</td>
            <td>	240</td>
            <td>	10</td>
            <td>	100%</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default WiTable;
