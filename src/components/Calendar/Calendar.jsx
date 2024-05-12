import React, { useState, forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";

import sprite from "../../assets/svg/sprite.svg";
import "./calendar.css";

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const getDateFormat = (startDate) => {
    console.log("startDate:", startDate);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (
      startDate.getDate() === today.getDate() &&
      startDate.getMonth() === today.getMonth() &&
      startDate.getFullYear() === today.getFullYear()
    ) {
      return "'Today',  MMMM dd";
    } else if (
      startDate.getDate() === tomorrow.getDate() &&
      startDate.getMonth() === tomorrow.getMonth() &&
      startDate.getFullYear() === tomorrow.getFullYear()
    ) {
      return "'Tomorrow',  MMMM dd";
    } else {
      return "EEEE,  MMMM dd";
    }
  };

  const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <button className={className} type="button" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ReactDatePicker
        // locale="en-GB"
        calendarStartDay={1}
        selected={startDate}
        name="name"
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        customInput={<CustomInput />}
        dateFormat={getDateFormat(startDate)}
        // shouldCloseOnSelect={false}
      />
      <svg width={18} height={18}>
        <use
          href={`${sprite}#chevron-down`}
          style={{
            stroke: "var(--calendar-input)",
            fontSize: "14px",
            fontWeight: "500",
          }}
        />
      </svg>
    </div>
  );
};

export default Calendar;
