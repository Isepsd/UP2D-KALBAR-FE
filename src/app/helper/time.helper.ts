import moment from 'moment';
import 'moment/locale/id'; // without this line it didn't work
moment.locale('id');

export function timeFormat(time: any, format: string = "DD-MM-YYYY HH:mm") {
  const result = moment(time).format(format) || '';
  return result != 'Invalid date' ? result : '-';
}

export function timeFormatSec(time: any, format: string = "DD-MM-YYYY HH:mm:ss") {
  const result = moment(time).format(format) || '';
  return result != 'Invalid date' ? result : '-';
}

export function dateTimeFormat(time: any, from: string = "YYYY-MM-DD hh:mm", format: string = "DD MMM YYYY HH:mm") {
  const result = moment(time, from).format(format) || '';
  return result != 'Invalid date' ? result : '-';
}

export function monthTimeFormat(time: any) {
  const result = moment(time).format('MMM YYYY') || '';
  return result != 'Invalid date' ? result : '-';
}
export function yearTimeFormat(time: any) {
  const result = moment(time).format('YYYY') || '';
  return result != 'Invalid date' ? result : '-';
}

export function timeFormatAlt(time: any) {
  const result = moment(time).format('DD MMM YYYY') || '';
  return result != 'Invalid date' ? result : '-';
}

export function timeFormatAgo(time: any) {
  return moment(time).fromNow();
}


export function timeFormSelect(count: any, addMinute: any) {
  let time = "2022-01-01 00:00:00";
  let optionsTimes: any = []
  for (let index = 0; index < count; index++) {

    let times = moment(time).add(addMinute * index, 'minutes').format("YYYY-MM-DD HH:mm")
    optionsTimes.push({
      label: moment(times).format("HH:mm"),
      value: moment(times).format("HH:mm")
    })

  }
  return optionsTimes
}


export function timeDiff(end_date: any, start_date: any, changeTo: string = "seconds") {
  let ms: any = moment(end_date).diff(moment(start_date));
  let duration = moment.duration(ms)
  let result: any = 0;


  switch (changeTo) {
    case "seconds":
      result = duration.asSeconds();
      break;
    case "minutes":
      result = duration.asMinutes();
      break;
    case "hours":
      result = duration.asHours();
      break;
    case "days":
      result = duration.asDays();
      break;
    case "months":
      result = duration.asMonths();
      break;
    case "years":
      result = duration.asYears();
      break;

    default:
      break;
  }

  return result;
}

export function secondsToDHms(sum_seconds: number) {
  // console.log("sum_seconds", sum_seconds);

  let days: any = Math.floor(sum_seconds / (3600 * 24));
  let hours: any = Math.floor((sum_seconds % (3600 * 24)) / 3600);
  let minutes: any = Math.floor(((sum_seconds % (3600 * 24)) % 3600) / 60);
  let seconds: any = Math.floor(((sum_seconds % (3600 * 24)) % 3600) % 60);
  if (((sum_seconds % (3600 * 24)) % 3600) < 60) {
    minutes = ((sum_seconds % (3600 * 24)) % 3600);
    seconds = 0;
  }


  // add 0 if value < 10; Example: 2 => 02
  if (days < 10) { days = "0" + days; }
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return days + ':' + hours + ':' + minutes + ':' + seconds;
}

export function changeToDDHHMM(end_date: any, start_date: any) {
  let m1 = moment(start_date);
  let m2 = moment(end_date);
  let m3 = m2.diff(m1, 'minutes');

  let numdays = Math.floor(m3 / 1440);
  let numhours = Math.floor((m3 % 1440) / 60);
  let numminutes = Math.floor((m3 % 1440) % 60);
  return numdays + ":" + numhours + ":" + numminutes;
}


export function changeSecondsTo(sum_seconds: number, changeTo: string = "DHms") {
  let date = moment.unix(sum_seconds).format("hh:mm:ss")
  // const formatted = moment.utc(sum_seconds * 1000).format('HH:mm:ss');
  // console.log('date', date);
  date;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;
  let result = "";
  // console.log("changeSecondsTo", sum_seconds);
  // console.log("changeTo", changeTo);

  switch (changeTo) {
    case "DHms":
      // seconds = duration.seconds();
      // minutes = duration.minutes();
      // hours = duration.hours();
      // days = duration.days();

      // console.log("changeTo seconds", seconds);
      result = `${days}:${hours}:${minutes}:${seconds}`
      break;
    case "HH:mm:ss":
      result = moment.utc(sum_seconds * 1000).format('HH:mm:ss');
      break;
    default:
      break;
  }

  return result;
}

export function chartHoursCategories(start_date: any, end_date: any) {
  let interval = timeDiff(end_date, start_date, "hours")

  for (let i = 0; i < interval; i++) {

  }
}


export function chartDayCategories(start_date: any, end_date: any, format = "YYYY-MM-DD", formatLabel = "DD/MM/YYYY", formatAdd: any = "days") {
  let interval = timeDiff(end_date, start_date, formatAdd)
  // console.log("interval", interval);
  let categoriesLabel: any = []
  let categoriesData: any = []
  for (let i = 0; i < interval; i++) {
    categoriesLabel.push(moment(start_date).add(i, formatAdd).format(formatLabel));
    categoriesData.push(moment(start_date).add(i, formatAdd).format(format));
  }

  return { categoriesData, categoriesLabel }
}

export function chartMonthCategories(format = "YYYY-MM-DD", formatLabel = "DD/MM/YYYY") {
  let categoriesLabel: any = []
  let categoriesData: any = []
  for (let i = 0; i < 12; i++) {
    categoriesLabel.push(moment().startOf('year').add(i, "months").format(formatLabel));
    categoriesData.push(moment().startOf('year').add(i, "months").format(format));
  }

  return { categoriesData, categoriesLabel }
}
