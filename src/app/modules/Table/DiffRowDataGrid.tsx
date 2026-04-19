import React from 'react';

export default function DiffRowDataGrid(rowElement: any, rowInfo: any) {
  console.log("DiffRowDataGrid rowElement",rowElement);
  console.log("DiffRowDataGrid rowInfo",rowInfo);

  return (
    <div>A</div>
  );
  // return (
  //   <div className={`${(cellData?.displayValue != "" && cellData?.displayValue != null) ? "" : "bg-warning text-white"}`}>{cellData?.displayValue ? cellData?.displayValue : "-"}</div>
  // );
}
