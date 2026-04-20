import { useMemo, useState } from "react";
import CalendarWeek from "../components/calendar-week/CalendarWeek";
import Content from "../components/content/Content";
import Header from "../components/header/Header";
import Main from "../components/main/Main";
import Sidebar from "../components/sidebar/Sidebar";
import TaskList from "../components/taskList/TaskList";
import Wrapper from "../components/wrapper/Wraper";
import usePlanner from "../services/usePlanner";
import useTasks from "../services/useTasks";
import Calendar from "../components/calendar/Calendar";
import { compareAsc, isSameDay } from "date-fns";
import Modal from "../components/modal/Modal";
import { useMediaQuery } from "react-responsive";
import MobileCalendarSheet from "../components/MobileCalendarSheet/MobileCalendarSheet";

const MainPage = () => {
  const planner = usePlanner();
  const { tasks, addTask, editTask, removeTask } = useTasks();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const weekDays = useMemo(() => {
    const days = [];
    const weekStart = planner.selectedWeekStart;
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dayTasks = tasks
        .filter((task) => isSameDay(new Date(task.eventDate), date))
        .sort((a, b) =>
          compareAsc(new Date(a.eventDate), new Date(b.eventDate)),
        );
      days.push({ date, tasks: dayTasks, taskCount: dayTasks.length });
    }
    return days;
  }, [tasks, planner.selectedWeekStart]);

  const visibleDays =
    planner.viewMode === "week"
      ? weekDays
      : weekDays.filter(
          (day) =>
            day.date.toDateString() === planner.selectedDate.toDateString(),
        );

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null, // "create" | "edit"
    task: null,
  });

  const openCreateModal = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      task: { eventDate: new Date() },
    });
  };

  const openEditModal = (task) => {
    setModalState({ isOpen: true, mode: "edit", task });
  };

  const handleSubmit = (data) => {
    if (modalState.mode === "create") {
      addTask(data);
    } else if (modalState.mode === "edit") {
      editTask(data.id, data);
    }
    setModalState({ isOpen: false, mode: null, task: null });
  };

  const handleDelete = (taskId) => {
    removeTask(taskId);
    setModalState({ isOpen: false, mode: null, task: null });
  };

  const handleToggleTaskStatus = (task, isChecked) => {
    editTask(task.id, {
      status: isChecked ? "completed" : "planned",
    });
  };

  return (
    <Wrapper>
      <Header
        mode={planner.viewMode}
        selectedDay={planner.selectedDate}
        selectedWeekStart={planner.selectedWeekStart}
        onBack={planner.backToWeek}
        onShiftWeek={planner.shiftWeek}
        openCreateModal={openCreateModal}
      />
      <Main>
        {!isMobile && (
          <Sidebar>
            <Calendar
              selectedWeekStart={planner.selectedWeekStart}
              onSelectDate={planner.goToWeek}
            />
          </Sidebar>
        )}
        <Content>
          <CalendarWeek
            weekDays={weekDays}
            selectedDay={planner.selectedDate}
            onSelectDay={planner.selectDay}
            mode={planner.viewMode}
          />
          <TaskList
            days={visibleDays}
            openEditModal={openEditModal}
            onToggleTaskStatus={handleToggleTaskStatus}
          />
        </Content>
      </Main>
      {isMobile && (
        <MobileCalendarSheet
          selectedWeekStart={planner.selectedWeekStart}
          onSelectDate={planner.goToWeek}
        />
      )}
      {modalState.isOpen && (
        <Modal
          mode={modalState.mode}
          initialData={modalState.task}
          onSubmit={handleSubmit}
          onClose={() =>
            setModalState({ isOpen: false, mode: null, task: null })
          }
          onDelete={modalState.mode === "edit" ? handleDelete : null}
        />
      )}
    </Wrapper>
  );
};

export default MainPage;
