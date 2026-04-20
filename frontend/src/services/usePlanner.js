//определяет режим отображения страницы (неделя или день) и предоставляет функции для переключения между ними
import { useState } from "react";

export default function usePlanner() {
  const today = new Date();
  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  };
  const [viewMode, setViewMode] = useState("week"); // "week" или "day"
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    getStartOfWeek(today),
  );

  const selectDay = (date) => {
    setSelectedDate(date);
    setViewMode("day");
  };

  const backToWeek = () => {
    setViewMode("week");
    setSelectedDate(null);
  };

  const shiftWeek = (direction) => {
    const newWeekStart = new Date(selectedWeekStart);
    newWeekStart.setDate(newWeekStart.getDate() + direction * 7);
    setSelectedWeekStart(newWeekStart);
  };

  const goToWeek = (date) => {
    const newWeekStart = getStartOfWeek(date);
    setSelectedWeekStart(newWeekStart);
    setSelectedDate(null);
  };

  return {
    viewMode,
    selectedDate,
    selectedWeekStart,
    selectDay,
    backToWeek,
    shiftWeek,
    goToWeek,
  };
}
