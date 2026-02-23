import React from "react";
import SpinePattern from "./SpinePattern";

interface Book {
  id: string;
  title: string;
  rating: number;
  pages: number;
  genre: string;
}

interface SpineProps {
  book: Book;
  colorIndex: number;
  onClick: () => void;
}

const dashboardColors = [
  "#E9C58E",
  "#D99C8B",
  "#94AFC3",
  "#8FB8A7",
];

const genreSymbolMap: Record<string, string> = {
  "literary fiction": "#",
  "historical fiction": "=",
  "contemporary fiction": ">",
  "science fiction": "{",
};

const getHeightPercent = (rating: number) => {
  return 60 + ((rating - 1) / 4) * 30;
};

const getWidthPx = (pages: number) => {
  const raw = pages * 0.5;
  return Math.min(Math.max(raw, 80), 240);
  return raw;
};

const Spine: React.FC<SpineProps> = ({ book, colorIndex, onClick }) => {
  const heightPercent = getHeightPercent(book.rating);
  const widthPx = getWidthPx(book.pages);
  const symbol = genreSymbolMap[book.genre.toLowerCase()] ?? "*";
  const color = dashboardColors[colorIndex % dashboardColors.length];

  return (
    <div
      onClick={onClick}
      style={{
        height: `${heightPercent}%`,
        width: `${widthPx}px`,
        backgroundColor: color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 0px",
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
    >
      <SpinePattern symbol={symbol} width={widthPx} />

      <div
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontWeight: 600,
          fontSize: "24px",
          color: "#7b4a3b",
        }}
      >
        {book.title}
      </div>

      <SpinePattern symbol={symbol} width={widthPx} />
    </div>
  );
};

export default Spine;