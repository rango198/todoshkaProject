const isRetina = () => {
  if (window.devicePixelRatio > 1) {
    return "2x";
  } else {
    return "1x";
  }
};
const setDevice = () => {
  if (window.innerWidth <= 375) {
    return "mob";
  }
  if (window.innerWidth <= 768) {
    return "tab";
  }
  return "desk";
};
export const device = setDevice();
export const ratio = isRetina();

<div
  // className={color ? `background-${color}` : "background-color-body"}
  style={{ backgroundImage: `url(${bgUrl})` }}
></div>;
