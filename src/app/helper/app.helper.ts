export function setFavicons(favImg: string) {
  let headTitle: any = document.querySelector('head');

  let favIcons = [
    { rel: 'apple-touch-icon' },
    { rel: 'apple-touch-startup-image' },
    { rel: 'shortcut icon' },
    { rel: 'icon' },
  ]

  favIcons.forEach(function (favIcon) {
    let setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel', favIcon.rel);
    setFavicon.setAttribute('href', favImg);
    headTitle.appendChild(setFavicon);
  });
}

export function catchServiceMessage(error: any, firstWord: string = "") {
  let message: string = error?.response ? `${firstWord}, ${error?.response?.data?.message}` : " ";
  return message;
}