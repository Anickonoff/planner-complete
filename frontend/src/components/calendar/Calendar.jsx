import { useEffect, useRef, useState } from "react";
import {
  CalendarAction,
  CalendarActions,
  CalendarBlock,
  CalendarCell,
  CalendarCells,
  CalendarContent,
  CalendarDayName,
  CalendarDayNameWeekend,
  CalendarDaysNames,
  CalendarMonth,
  CalendarNav,
  CalendarWeek,
  MonthPicker,
  MonthPickerControl,
  MonthPickerControls,
  MonthPickerFooter,
  MonthPickerFooterButton,
  MonthPickerHeader,
  MonthPickerTitle,
  PickerButton,
  PickerGrid,
  StyledCalendar,
} from "./Calendar.style";
import { isSameWeek } from "date-fns";

const Calendar = ({ onSelectDate, selectedWeekStart, readOnly = false }) => {
  const SWIPE_THRESHOLD = 48;
  const SWIPE_LOCK_THRESHOLD = 8;
  const TRANSITION_MS = 220;
  const daysName = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const monthsName = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const [month, setMonth] = useState(() => {
    return selectedWeekStart ? new Date(selectedWeekStart) : new Date();
  });
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [pickerStep, setPickerStep] = useState("year");
  const [pickerYear, setPickerYear] = useState(() => {
    const baseDate = selectedWeekStart
      ? new Date(selectedWeekStart)
      : new Date();
    return baseDate.getFullYear();
  });
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInstantJump, setIsInstantJump] = useState(false);
  const [contentWidth, setContentWidth] = useState(320);
  const calendarRef = useRef(null);
  const calendarContentRef = useRef(null);
  const touchStateRef = useRef({
    startX: 0,
    startY: 0,
    deltaX: 0,
    axis: null,
  });
  const exitTimerRef = useRef(null);
  const enterTimerRef = useRef(null);

  const getLastMonday = (targetMonth) => {
    const lastMonday = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth(),
    );
    const shift = lastMonday.getDay() === 0 ? 7 : lastMonday.getDay();
    lastMonday.setDate(lastMonday.getDate() - (shift - 1));
    return lastMonday;
  };

  const getFirstSunday = (targetMonth) => {
    const nextSunday = new Date(
      targetMonth.getFullYear(),
      targetMonth.getMonth() + 1,
    );
    const shift =
      nextSunday.getDay() === 0
        ? 7
        : nextSunday.getDay() === 1
          ? 8
          : nextSunday.getDay();
    nextSunday.setDate(nextSunday.getDate() + (7 - shift));
    return nextSunday;
  };

  const getDays = (targetMonth) => {
    const today = new Date();
    const newDays = [];
    const startDate = getLastMonday(targetMonth);
    const endDate = getFirstSunday(targetMonth);

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      newDays.push({
        day: date.getDate(),
        date: new Date(date),
        isCurrent:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
        isOtherMonth: date.getMonth() !== targetMonth.getMonth(),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isActive: selectedWeekStart
          ? isSameWeek(date, selectedWeekStart, { weekStartsOn: 1 })
          : false,
      });
    }

    return newDays;
  };

  const clearAnimationTimers = () => {
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }
  };

  const shiftMonth = (date, diff) => {
    return new Date(date.getFullYear(), date.getMonth() + diff, 1);
  };

  const animateMonthChange = (direction) => {
    if (isAnimating || direction === 0) {
      return;
    }

    const width = calendarContentRef.current?.offsetWidth || 320;

    clearAnimationTimers();
    setIsDragging(false);
    setIsAnimating(true);
    setIsInstantJump(false);
    setTranslateX(direction === 1 ? -width : width);

    exitTimerRef.current = setTimeout(() => {
      setMonth((prev) => shiftMonth(prev, direction));
      setIsInstantJump(true);
      setTranslateX(direction === 1 ? width : -width);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsInstantJump(false);
          setTranslateX(0);
          enterTimerRef.current = setTimeout(() => {
            setIsAnimating(false);
          }, TRANSITION_MS);
        });
      });
    }, TRANSITION_MS);
  };

  const chngMonth = (action) => {
    const direction = action === "prev" ? -1 : 1;
    animateMonthChange(direction);
  };

  const resetSwipeState = () => {
    touchStateRef.current = {
      startX: 0,
      startY: 0,
      deltaX: 0,
      axis: null,
    };
  };

  const handleTouchStart = (event) => {
    if (isAnimating || isMonthPickerOpen || event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    touchStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      deltaX: 0,
      axis: null,
    };
    setIsDragging(false);
  };

  const handleTouchMove = (event) => {
    if (isAnimating || isMonthPickerOpen || event.touches.length !== 1) {
      return;
    }

    const touch = event.touches[0];
    const dx = touch.clientX - touchStateRef.current.startX;
    const dy = touch.clientY - touchStateRef.current.startY;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (touchStateRef.current.axis === null) {
      if (absX < SWIPE_LOCK_THRESHOLD && absY < SWIPE_LOCK_THRESHOLD) {
        return;
      }

      touchStateRef.current.axis = absX > absY * 1.2 ? "x" : "y";
    }

    if (touchStateRef.current.axis !== "x") {
      return;
    }

    touchStateRef.current.deltaX = dx;
    setIsDragging(true);
    setTranslateX(dx);
  };

  const handleTouchEnd = () => {
    if (isAnimating || isMonthPickerOpen) {
      resetSwipeState();
      return;
    }

    if (touchStateRef.current.axis !== "x") {
      resetSwipeState();
      setIsDragging(false);
      return;
    }

    const delta = touchStateRef.current.deltaX;
    const direction = delta < 0 ? 1 : -1;

    resetSwipeState();
    setIsDragging(false);

    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      animateMonthChange(direction);
      return;
    }

    setTranslateX(0);
  };

  const setTaskDateHandler = (date) => {
    if (readOnly) {
      return;
    }

    if (date) {
      onSelectDate(date);
    }
  };

  const openMonthPicker = () => {
    setPickerYear(month.getFullYear());
    setPickerStep("year");
    setIsMonthPickerOpen(true);
  };

  const closeMonthPicker = () => {
    setIsMonthPickerOpen(false);
    setPickerStep("year");
  };

  const selectYear = (year) => {
    setPickerYear(year);
    setPickerStep("month");
  };

  const selectMonth = (monthIndex) => {
    setMonth(new Date(pickerYear, monthIndex, 1));
    closeMonthPicker();
  };

  const goToCurrentMonth = () => {
    const now = new Date();
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    closeMonthPicker();
  };

  useEffect(() => {
    if (!isMonthPickerOpen) {
      return undefined;
    }

    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        closeMonthPicker();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMonthPickerOpen]);

  useEffect(() => {
    return () => {
      clearAnimationTimers();
    };
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      setContentWidth(calendarContentRef.current?.offsetWidth || 320);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const days = getDays(month);
  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const yearOptions = Array.from({ length: 9 }, (_, i) => pickerYear - 4 + i);
  const selectedPickerMonth =
    month.getFullYear() === pickerYear ? month.getMonth() : -1;

  return (
    <StyledCalendar>
      <CalendarBlock ref={calendarRef}>
        <CalendarNav>
          <CalendarMonth type="button" onClick={openMonthPicker}>
            {monthsName[month.getMonth()]} {month.getFullYear()}
          </CalendarMonth>
          <CalendarActions>
            <CalendarAction onClick={() => chngMonth("prev")}>
              <i className="fa fa-angle-left"></i>
            </CalendarAction>
            <CalendarAction onClick={() => chngMonth("next")}>
              <i className="fa fa-angle-right"></i>
            </CalendarAction>
          </CalendarActions>
        </CalendarNav>

        {isMonthPickerOpen && (
          <MonthPicker>
            <MonthPickerHeader>
              <MonthPickerTitle>
                {pickerStep === "year" ? "Выберите год" : `${pickerYear}`}
              </MonthPickerTitle>
              <MonthPickerControls>
                {pickerStep === "year" ? (
                  <>
                    <MonthPickerControl
                      type="button"
                      onClick={() => setPickerYear((prev) => prev - 9)}
                    >
                      <i className="fa fa-angle-left"></i>
                    </MonthPickerControl>
                    <MonthPickerControl
                      type="button"
                      onClick={() => setPickerYear((prev) => prev + 9)}
                    >
                      <i className="fa fa-angle-right"></i>
                    </MonthPickerControl>
                  </>
                ) : (
                  <MonthPickerControl
                    type="button"
                    onClick={() => setPickerStep("year")}
                  >
                    Назад
                  </MonthPickerControl>
                )}
              </MonthPickerControls>
            </MonthPickerHeader>

            <PickerGrid>
              {pickerStep === "year"
                ? yearOptions.map((year) => (
                    <PickerButton
                      key={year}
                      type="button"
                      $isSelected={year === pickerYear}
                      onClick={() => selectYear(year)}
                    >
                      {year}
                    </PickerButton>
                  ))
                : monthsName.map((monthName, index) => (
                    <PickerButton
                      key={monthName}
                      type="button"
                      $isSelected={index === selectedPickerMonth}
                      onClick={() => selectMonth(index)}
                    >
                      {monthName}
                    </PickerButton>
                  ))}
            </PickerGrid>

            <MonthPickerFooter>
              <MonthPickerFooterButton type="button" onClick={goToCurrentMonth}>
                К текущему
              </MonthPickerFooterButton>
              <MonthPickerFooterButton type="button" onClick={closeMonthPicker}>
                Отмена
              </MonthPickerFooterButton>
            </MonthPickerFooter>
          </MonthPicker>
        )}

        <CalendarContent
          ref={calendarContentRef}
          $translateX={translateX}
          $opacity={
            isDragging && contentWidth
              ? 1 - Math.min(Math.abs(translateX) / contentWidth, 0.2)
              : 1
          }
          $transitionEnabled={!isDragging && !isInstantJump}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <CalendarDaysNames>
            {daysName.map((day, index) =>
              index >= 5 ? (
                <CalendarDayNameWeekend key={day}>{day}</CalendarDayNameWeekend>
              ) : (
                <CalendarDayName key={day}>{day}</CalendarDayName>
              ),
            )}
          </CalendarDaysNames>
          <CalendarCells>
            {weeks.map((week, weekIndex) => (
              <CalendarWeek
                key={weekIndex}
                onClick={() => {
                  setTaskDateHandler(week[0].date);
                }}
              >
                {week.map((day) => (
                  <CalendarCell
                    key={`${day.isOtherMonth ? "other" : "current"}-${day.day}`}
                    $isOtherMonth={day.isOtherMonth}
                    $isWeekend={day.isWeekend}
                    $isCurrent={day.isCurrent}
                    $isActive={day.isActive}
                  >
                    {day.day}
                  </CalendarCell>
                ))}
              </CalendarWeek>
            ))}
          </CalendarCells>
        </CalendarContent>
      </CalendarBlock>
    </StyledCalendar>
  );
};

export default Calendar;
