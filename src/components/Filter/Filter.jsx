import { useState } from "react";
import { useDispatch } from "react-redux";

import { setFilter } from "../../redux/slice/filterSlice";

import ButtonClose from "../ButtonClose/ButtonClose";
import RadioFilter from "../RadioButtons/RadioFilter";

import css from "./Filter.module.css";

const Filter = ({ onClose }) => {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState("all");

  const resetFilter = () => {
    dispatch(setFilter("all"));
    setPriority("all");
  };

  const handleFilterChange = (priority) => {
    dispatch(setFilter(priority));
    setPriority(priority);
  };

  return (
    <div className={css.filter}>
      <ButtonClose onClick={onClose} aria-label="Close" />
      <p className={css.title}>Filters</p>
      <hr className={css.hr} />
      <div className={css.title_wrapper}>
        <p className={css.label_title}>Label color</p>
        <button
          onClick={resetFilter}
          className={css.show_all_btn}
          aria-label="Show all"
        >
          Show all
        </button>
      </div>

      <RadioFilter onFilterChange={handleFilterChange} priority={priority} />
    </div>
  );
};
export default Filter;
