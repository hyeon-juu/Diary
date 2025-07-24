import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainCalendar from "./MainCalendar.jsx";
import ViewDiary from "./ViewDiary.jsx";
import WriteDiary from "./WriteDiary.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainCalendar />} />
          <Route path="diary/:date/view" element={<ViewDiary />} />
          <Route path="diary/:date/write" element={<WriteDiary />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
