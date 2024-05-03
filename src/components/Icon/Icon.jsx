import sprite from "../../assets/svg/sprite.svg";
const Icon = ({ id, className }) => {
  return (
    <svg className={className}>
      <use href={sprite + "#" + id}></use>
    </svg>
  );
};
export default Icon;
