import { useParams } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

function Diary() {
  const { date } = useParams();

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [context, setContext] = useState(null);

  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;
    canvas.style.border = "1px solid black";

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    setContext(ctx);
  }, []);

  // 색상 또는 굵기 변경 시 context에 반영
  useEffect(() => {
    if (context) {
      context.strokeStyle = isEraser ? "#ffffff" : color;
      context.lineWidth = lineWidth;
    }
  }, [color, lineWidth, isEraser, context]);

  const startDrawing = (e) => {
    if (!context) return;
    isDrawing.current = true;
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };

  const draw = (e) => {
    if (!isDrawing.current || !context) return;
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!context) return;
    isDrawing.current = false;
    context.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const base64 = canvas.toDataURL("image/png"); // ex: data:image/png;base64,iVBORw0K...

    fetch("http://localhost:8080/api/diary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        title,
        content,
        image: base64,
      }),
    })
      .then((res) => res.json())
      .then((data) => alert("저장 성공!"))
      .catch((err) => console.error("저장 실패", err));
  };

  return (
    <div>
      {date}입니다.
      <div style={{ marginBottom: "10px" }}>
        <label>색상:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setIsEraser(false);
            setColor(e.target.value);
          }}
        />
        <label style={{ marginLeft: "20px" }}>굵기:</label>
        <input
          type="range"
          min="5"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        />
        <button onClick={() => setIsEraser(true)}>지우개</button>
        <button onClick={clearCanvas}>다시 그리기</button>
        <button onClick={saveImage}>저장하기</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ background: "white", cursor: "crosshair" }}
      />
      {/* =================================== */}
      <div style={{ marginBottom: "10px" }}>
        <label>제목: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>내용: </label>
        <br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          cols={60}
          style={{ resize: "none" }}
        />
      </div>
    </div>
  );
}
export default Diary;
