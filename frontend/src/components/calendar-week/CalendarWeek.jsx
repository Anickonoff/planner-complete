import {
  CWCell,
  CWCellDate,
  CWCellTask,
  CWCellTasks,
  CWGrid,
  CWHeader,
  StyledCalendarWeek,
} from "./CalendarWeek.styled";

const CalendarWeek = ({ weekDays, selectedDay, onSelectDay }) => {
  const dayNames = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const indicatorCount = (weekDay) => Math.min(weekDay.taskCount, 3);

  return (
    <StyledCalendarWeek>
      <CWHeader>
        {dayNames.map((name, index) => (
          <div key={index}>{name}</div>
        ))}
      </CWHeader>
      <CWGrid>
        {weekDays.map((weekDay, index) => (
          <CWCell
            key={index}
            $isCurrent={isToday(weekDay.date)}
            $isWeekend={
              weekDay.date.getDay() === 0 || weekDay.date.getDay() === 6
            }
            $isSelected={
              weekDay.date.toDateString() === selectedDay?.toDateString()
            }
            onClick={() => onSelectDay(weekDay.date)}
          >
            <CWCellDate>{weekDay.date.getDate()}</CWCellDate>
            <CWCellTasks>
              {Array.from({ length: indicatorCount(weekDay) }).map((_, i) => (
                <CWCellTask key={i} />
              ))}
            </CWCellTasks>
          </CWCell>
        ))}
      </CWGrid>
    </StyledCalendarWeek>
  );
};

export default CalendarWeek;
