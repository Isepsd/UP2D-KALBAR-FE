
export function CeilBackgroundPengukuranBeban(row: any, column: any, value: any, data: any) {

  switch (column) {
    case "i":
      if (data.sinkron_data == null && value != null) {
        return data.sinkron_data == 'SCADA' ? "bg-disgust text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR') {
        return data.sinkron_data == 'SCADA' ? "bg-trust text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR' && data?.i > data.i_max) {
        return data.sinkron_data == 'SCADA' ? "bg-anger text-right text-black" : " text-right"
      }
      else if ((data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR') && data.id_user_update != null) {
        return data.sinkron_data == 'SCADA' ? "bg-joy text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR' && data.i < 0) {
        return data.sinkron_data == 'SCADA' ? "bg-anticipation text-right text-black" : " text-right"
      }
      break;
    case "p":
      if (data.sinkron_data == null && value != null) {
        return data.sinkron_data == 'SCADA' ? "bg-disgust text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR') {
        return data.sinkron_data == 'SCADA' ? "bg-trust text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR' && data?.i > data.i_max) {
        return data.sinkron_data == 'SCADA' ? "bg-anger text-right text-black" : " text-right"
      }
      else if ((data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR') && data.id_user_update != null) {
        return data.sinkron_data == 'SCADA' ? "bg-joy text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR' && data.i < 0) {
        return data.sinkron_data == 'SCADA' ? "bg-anticipation text-right text-black" : " text-right"
      }
      break;
    case "v":
      if (data.sinkron_data == null && value != null) {
        return data.sinkron_data == 'SCADA' ? "bg-disgust text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR') {
        return data.sinkron_data == 'SCADA' ? "bg-trust text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR' && data?.i > data.i_max) {
        return data.sinkron_data == 'SCADA' ? "bg-anger text-right text-black" : " text-right"
      }
      else if ((data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR') && data.id_user_update != null) {
        return data.sinkron_data == 'SCADA' ? "bg-joy text-right text-black" : " text-right"
      }
      else if (data.sinkron_data == 'SCADA' || data.sinkron_data == 'AMR' && data.i < 0) {
        return data.sinkron_data == 'SCADA' ? "bg-anticipation text-right text-black" : " text-right"
      }
      break;

    default:
      return ""
      break;
  }

}

export const cellclassname = (row: any, column: any, value: any, data: any) => {
  row
  column
  value
  data
  // console.log("row", row);
  // console.log("column", column);
  // console.log("value", value);
  // console.log("data", data);

  return "red"
}