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

// import { device, ratio } from "./BackgroundImage/BackgroundImage";
// const { title, background } = useSelector(selectedBoard);

//   let bgUrl;
//   if (background && background !== "default") {
//     bgUrl = `../../assets/img/${device}/${background}-${device}-${ratio}.jpg`;
//   }
<div
  // className={color ? `background-${color}` : "background-color-body"}
  style={{ backgroundImage: `url(${bgUrl})` }}
></div>;

// background {
//   background-position: 50%;
//   background-repeat: no-repeat;
//   background-size: cover;
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   padding-bottom: 24px;
//   padding-left: 20px;
//   padding-right: 16px;}
