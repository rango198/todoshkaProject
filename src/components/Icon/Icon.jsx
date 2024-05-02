import sprite from "../../assets/svg/sprite.svg";
const Icon = ({ style, width, height, iconId }) => {
  return (
    <svg styles={style} width={width} height={height}>
      <use href={`${sprite}#${iconId}`}></use>
    </svg>
  );
};
// Icon.propTypes;
export default Icon;
