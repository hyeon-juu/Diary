import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainCalendar from "./MainCalendar.jsx";
import ViewDiary from "./ViewDiary.jsx";
import WriteDiary from "./WriteDiary.jsx";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error("api fail: ", err));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainCalendar />} />
          <Route path="diary/:date/view" element={<ViewDiary />} />
          <Route path="diary/:date/write" element={<WriteDiary />} />
        </Routes>
      </BrowserRouter>
      {/* <p>서버 메시지: {message}</p> */}
    </div>
  );
}

export default App;
