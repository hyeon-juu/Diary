import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "./css/Calendar.css";

function MainCalendar() {
  const [date, setDate] = useState(new Date());

  const navigate = useNavigate();
  const formatDate = (date) =>
    date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "-")
      .replace(".", "");
  //date click
  const dateClickHandler = (date) => {
    const formattDate = formatDate(date);
    navigate(`/diary/${formattDate}/view`);
  };
  //button click -> date 설정
  const todayDateHandler = () => {
    const formattDate = formatDate(date);
    navigate(`/diary/${formattDate}/write`);
  };

  return (
    <div className="calContainer">
      <Calendar onChange={setDate} value={date} onClickDay={dateClickHandler} />
      <button onClick={todayDateHandler}>+</button>
    </div>
  );
}

export default MainCalendar;
