export const getFilterQueryParams = (queryParams: any, fields: any) => {
  const qParams = { ...queryParams };
  let qParamsField = {};
  // console.log("fields", fields);

  Object.keys(qParams).map((qpf: any) => {
    // console.log("qpf", qpf);

    const field: any = fields[qpf];
    // console.log("field", field);

    qParamsField = { ...qParamsField, [field]: qParams[qpf] };
  });

  qParamsField = Object.fromEntries(
    Object.entries(qParamsField).filter(([key]) => key != 'undefined')
  );

  return qParamsField;
};


export const parsingStatus = (data: any) => {
  return data ? '1' : '0'
}

export const objectToFormData = (dataObject: any) => {
  if(!dataObject) return

  // console.log(dataObject);
  

  const formData = new FormData()
  Object.keys(dataObject).map((key: any) => {
    formData.append(key, dataObject[key])
  })
  
  return formData;
}