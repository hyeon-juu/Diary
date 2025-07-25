import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainCalendar from "./MainCalendar.jsx";
import Diary from "./Diary.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainCalendar />} />
          <Route path="diary/:date/write" element={<Diary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
