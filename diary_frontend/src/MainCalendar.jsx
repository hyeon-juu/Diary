import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import "./css/Calendar.css"; // 스타일은 여기에

function MainCalendar() {
  const [date, setDate] = useState(new Date());
  const [imageMap, setImageMap] = useState({});
  const navigate = useNavigate();

  // 날짜를 YYYY-MM-DD 형식으로 포맷
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // 해당 월의 그림 이미지들 모두 불러오기
  useEffect(() => {
    const fetchImages = async () => {
      const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const promises = [];

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const formatted = formatDate(new Date(d)); // new Date()로 날짜 복제
        promises.push(
          fetch(`http://localhost:8080/api/diary/${formatted}`)
            .then((res) => (res.ok ? res.text() : null))
            .then((data) => {
              if (data) {
                return { date: formatted, image: data };
              } else return null;
            })
        );
      }

      const results = await Promise.all(promises);
      const map = {};
      results.forEach((item) => {
        if (item) map[item.date] = item.image;
      });
      setImageMap(map);
    };

    fetchImages();
  }, [date]);

  // 날짜 클릭 시 → /diary/yyyy-mm-dd/view
  const dateClickHandler = (clickedDate) => {
    const formattedDate = formatDate(clickedDate);
    navigate(`/diary/${formattedDate}/view`);
  };

  // + 버튼 클릭 시 → /diary/yyyy-mm-dd/write
  const todayDateHandler = () => {
    const formattedDate = formatDate(date);
    navigate(`/diary/${formattedDate}/write`);
  };

  return (
    <div className="calContainer">
      <Calendar
        onChange={setDate}
        value={date}
        onClickDay={dateClickHandler}
        tileContent={({ date, view }) => {
          const key = formatDate(date);
          if (imageMap[key]) {
            return (
              <img
                src={imageMap[key]}
                alt="thumbnail"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "4px",
                  objectFit: "cover",
                  marginTop: "5px",
                }}
              />
            );
          }
          return null;
        }}
      />
      <button onClick={todayDateHandler} className="plusButton">
        +
      </button>
    </div>
  );
}

export default MainCalendar;
