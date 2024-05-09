import React, { useState, forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";

import sprite from "../../assets/svg/sprite.svg";
import "./calendar.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <button className={className} type="button" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div style={{display: 'flex', alignItems: 'flex-end' }}>
      <ReactDatePicker
        locale="en-GB"
        selected={startDate}
        name="name"
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        customInput={<CustomInput value={startDate} />}
        dateFormat="MMMM d"
      />
      <svg width={18} height={18}>
      <use href={`${sprite}#chevron-down`} style={{ stroke: 'var(--calendar-input)'}} />
      </svg>
    </div>  );
};

export default Calendar;