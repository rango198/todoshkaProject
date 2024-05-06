import { ThreeDots } from "react-loader-spinner";

import css from './Loader.module.css'

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#ffffff80"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;
