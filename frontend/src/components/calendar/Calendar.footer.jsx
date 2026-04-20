import { CalendarDeadlineText } from "./Calendar.style"

const CalendarFooter = ({ taskDate }) => {
  if (!taskDate) {
    return <CalendarDeadlineText>Выберите срок исполнения.</CalendarDeadlineText>;
  }
  const choosenDate = taskDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  });
  return (
    <CalendarDeadlineText>
      Срок исполнения:{" "}
      <span>
        {choosenDate}.
      </span>
    </CalendarDeadlineText>
  );
};

export default CalendarFooter;