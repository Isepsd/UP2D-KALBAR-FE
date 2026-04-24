export function mappingLineChart(data: any, moment: any, dateFormat: any = 'DD/MM/YYYY') {
  let res: any = {
    mw: [
      { name: 'Beban Max (MW)', data: [] },
      { name: 'Beban AVG (MW)', data: [] },
      { name: 'Beban Max Siang (MW)', data: [] },
      { name: 'Beban Max Malam (MW) ', data: [] }
    ],
    a: [
      { name: 'Beban Max (A)', data: [] },
      { name: 'Beban AVG (A)', data: [] },
      { name: 'Beban Max Siang (A)', data: [] },
      { name: 'Beban Max Malam (A)', data: [] }
    ],
    v: [
      { name: 'Tegangan Average (kV)', data: [] },
      { name: 'Tegangan Max (kV)', data: [] },
      { name: 'Tegangan Min (kV)', data: [] },
    ]
  };
  let cat: any = [];
  data.forEach((e: any) => {
    const { p_max, p_avg, p_max_malam, p_max_siang, i_max, i_avg, i_max_malam, i_max_siang, datum, v_avg, v_min, v_max } = e || {};
    res.mw[0].data.push(parseFloat(p_max) === 0 ? null : parseFloat(p_max));
    res.mw[1].data.push(parseFloat(p_avg) === 0 ? null : parseFloat(p_avg));
    res.mw[2].data.push(parseFloat(p_max_malam) === 0 ? null : parseFloat(p_max_malam));
    res.mw[3].data.push(parseFloat(p_max_siang) === 0 ? null : parseFloat(p_max_siang));
    res.a[0].data.push(parseFloat(i_max) === 0 ? null : parseFloat(i_max));
    res.a[1].data.push(parseFloat(i_avg) === 0 ? null : parseFloat(i_avg));
    res.a[2].data.push(parseFloat(i_max_malam) === 0 ? null : parseFloat(i_max_malam));
    res.a[3].data.push(parseFloat(i_max_siang) === 0 ? null : parseFloat(i_max_siang));

    res.v[0].data.push(parseFloat(v_avg) === 0 ? null : parseFloat(v_avg));
    res.v[1].data.push(parseFloat(v_max) === 0 ? null : parseFloat(v_max));
    res.v[2].data.push(parseFloat(v_min) === 0 ? null : parseFloat(v_min));
    cat.push(moment(datum).format(dateFormat))
  })
  return { res: res, cat: cat }
}

export function mappingLineChartPerjam(data: any, moment: any) {
  let res: any = {
    mw: [
      { name: 'Beban (MW)', data: [] },
    ],
    a: [
      { name: 'Beban (A)', data: [] },
    ],
    v: [
      { name: 'Tegangan (kV)', data: [] },
    ]
  };
  let cat: any = [];
  data?.forEach((e: any) => {
    const { p, i, v, datum } = e || {};
    res.mw[0].data.push(parseFloat(p) === 0 ? null : parseFloat(p));
    res.a[0].data.push(parseFloat(i) === 0 ? null : parseFloat(i));
    res.v[0].data.push(parseFloat(v) === 0 ? null : parseFloat(v));
    cat.push(moment(datum).format("DD/MM/YYYY HH:mm:ss"))
  })
  return { res: res, cat: cat }
}

export function mappingLineChartLoadFactor(data: any, moment: any, dateFormat: any = 'DD/MM/YYYY') {
  let res: any = { name: 'Load Factor', data: [] };
  let cat: any = [];
  data?.forEach((e: any) => {

    const { load_faktor, datum } = e || {};

    res.data.push(parseFloat(load_faktor) === 0 ? null : parseFloat(load_faktor));
    cat.push(moment(datum).format(dateFormat))
  })
  return { res: res, cat: cat }
}