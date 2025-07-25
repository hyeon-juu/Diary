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
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
              if (data) {
                return { date: formatted, ...data };
              } else return null;
            })
        );
      }

      const results = await Promise.all(promises);
      const map = {};
      results.forEach((item) => {
        if (item)
          map[item.date] = {
            image: item.image,
            title: item.title,
            content: item.content,
          };
      });
      setImageMap(map);
    };

    fetchImages();
  }, [date]);

  // 날짜 클릭 시 → /diary/yyyy-mm-dd/view
  const dateClickHandler = (clickedDate) => {
    const formattedDate = formatDate(clickedDate);
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
          const entry = imageMap[key];

          if (view === "month" && entry) {
            return (
              <div>
                <img src={entry.image} alt="diary_thumbnail" />
                <div>{entry.title}</div>
              </div>
            );
          }
          return null;
        }}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString("en-US", { weekday: "short" })
        }
        // showNeighboringMonth={false}
      />
    </div>
  );
}

export default MainCalendar;
