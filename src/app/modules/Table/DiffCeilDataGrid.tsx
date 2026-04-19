import React from 'react';

export default function DiffCeilDataGrid(cellData: any) {
   if(cellData.columnIndex ==5 || cellData.columnIndex ==6){
           if (cellData?.data.sinkron_data ==null && cellData?.displayValue !=null) {
            return (
              <div className={`${(cellData?.data.sinkron_data=='SCADA') ? "bg-disgust text-right" : " text-right"}`}>{cellData?.displayValue != null ? cellData?.displayValue : "-"}</div>
            );
            }
             else if (cellData?.data.sinkron_data =='SCADA' || cellData?.data.sinkron_data =='AMR') {
              return (
                <div className={`${(cellData?.data.sinkron_data=='SCADA') ? "bg-trust text-right" : " text-right"}`} style={{color: 'black'}}>{cellData?.displayValue != null ? cellData?.displayValue : "-"}</div>
              );
            } 
            else if (cellData?.data.sinkron_data =='SCADA' || cellData?.data.sinkron_data =='AMR' && cellData?.data.i > cellData?.data.i_max ) {
              return (
                <div className={`${(cellData?.data.sinkron_data=='SCADA') ? "bg-anger text-right" : " text-right"}`}>{cellData?.displayValue != null ? cellData?.displayValue : "-"}</div>
              );
            } 
            else if (cellData?.data.sinkron_data =='SCADA' || cellData?.data.sinkron_data =='AMR' && cellData?.data.id_user_update !=null) {
              return (
                <div className={`${(cellData?.data.sinkron_data=='SCADA') ? "bg-joy text-right" : " text-right"}`}>{cellData?.displayValue != null ? cellData?.displayValue : "-"}</div>
              );
            } 
            else if (cellData?.data.sinkron_data =='SCADA' || cellData?.data.sinkron_data =='AMR' && cellData?.data.i < 0) {
              return (
                <div className={`${(cellData?.data.sinkron_data=='SCADA') ? "bg-anticipation text-right" : " text-right"}`}>{cellData?.displayValue != null ? cellData?.displayValue : "-"}</div>
              );
            } 
  
   }else{
    return (
      <div>{cellData?.displayValue != null ? cellData?.displayValue : "-"}</div>
    );
   }
  
}
