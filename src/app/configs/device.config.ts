const CONFIG_DEVICE_SIZE = {
  mobile: '375px',
  mobileL: '576px',
  tablet: '768px',
  tabletL: '1024px',
  laptop: '1366px',
  laptopL: '1440px',
  desktop: '1920px',
  desktopL: '2560px',
};

export const CONFIG_DEVICE = {
  mobile: `(max-width: ${CONFIG_DEVICE_SIZE.mobile})`,
  mobileL: `(max-width: ${CONFIG_DEVICE_SIZE.mobileL})`,
  tablet: `(max-width: ${CONFIG_DEVICE_SIZE.tablet})`,
  tabletL: `(max-width: ${CONFIG_DEVICE_SIZE.tabletL})`,
  laptop: `(max-width: ${CONFIG_DEVICE_SIZE.laptop})`,
  laptopL: `(max-width: ${CONFIG_DEVICE_SIZE.laptopL})`,
  desktop: `(max-width: ${CONFIG_DEVICE_SIZE.desktop})`,
  desktopL: `(max-width: ${CONFIG_DEVICE_SIZE.desktopL})`,
};
