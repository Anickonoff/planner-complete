import { format } from "date-fns";
import {
  StyledTaskList,
  TLCheckbox,
  TLContent,
  TLCount,
  TLDate,
  TLDescription,
  TLHeader,
  TLTask,
  TLTasks,
  TLTime,
  TLTitle,
} from "./TaskList.styled";
import { ru } from "date-fns/locale";

const TaskList = ({ days, openEditModal, onToggleTaskStatus }) => {
  const taskCountToString = (count) => {
    if (count === 0) return "Нет записей";
    if (count === 1) return "1 запись";
    if (count > 1 && count < 5) return `${count} записи`;
    return `${count} записей`;
    //будем считать, что >20 записей в день не будет
  };

  // функция для поределения наличия времени в задаче по eventDate или ключу hasTime при его наличии, для отображения его в виде - или времени
  const hasTime = (task) => {
    if (task.hasTime !== undefined) {
      return task.hasTime;
    }
    const eventDate = new Date(task.eventDate);
    return eventDate.getHours() !== 0 || eventDate.getMinutes() !== 0;
  };

  return (
    <>
      {days.map((day, dayIndex) => (
        <StyledTaskList key={day.date}>
          <TLHeader>
            <TLDate>{format(day.date, "dd MMMM yyyy", { locale: ru })}</TLDate>
            <TLCount>{taskCountToString(day.taskCount)}</TLCount>
          </TLHeader>
          <TLTasks>
            {day.tasks.map((task, index) => {
              const checkboxId = `task-${task.id ?? `${dayIndex}-${index}`}`;
              return (
              <TLTask key={index} onClick={() => openEditModal(task)}>
                <TLCheckbox onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    id={checkboxId}
                    checked={task.status === "completed"}
                    onChange={(e) => onToggleTaskStatus(task, e.target.checked)}
                  />
                  <label htmlFor={checkboxId}></label>
                </TLCheckbox>
                <TLContent>
                  <TLTitle $isCancelled={task.status === "cancelled"}>
                    {task.title}
                  </TLTitle>
                  <TLDescription>{task.description}</TLDescription>
                </TLContent>
                <TLTime>
                  <i className="far fa-clock"></i>{" "}
                  {hasTime(task)
                    ? format(new Date(task.eventDate), "HH:mm")
                    : "-"}
                </TLTime>
              </TLTask>
            );
            })}
          </TLTasks>
        </StyledTaskList>
      ))}
    </>
  );
};

export default TaskList;
