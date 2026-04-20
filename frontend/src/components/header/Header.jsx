import { format } from "date-fns";
import {
  CurrentMonth,
  DateNavigation,
  HeaderButtons,
  Logo,
  NavButton,
  StyledHeader,
} from "./Header.styled";
import { ru } from "date-fns/locale";
import Button from "../button/Button";

const Header = ({
  mode,
  selectedDay,
  selectedWeekStart,
  onBack,
  onShiftWeek,
  openCreateModal,
}) => {
  // const mode = "week";
  const date =
    mode === "week"
      ? `${format(selectedWeekStart, "dd.MM", { locale: ru })} - ${format(new Date(selectedWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000), "dd.MM", { locale: ru })}`
      : format(selectedDay, "dd MMM", { locale: ru });
  return (
    <StyledHeader>
      <Logo>
        <i className="fas fa-calendar-alt"></i>
        <span>Планировщик</span>
      </Logo>
      <DateNavigation>
        {mode === "week" && (
          <NavButton onClick={() => onShiftWeek(-1)}>
            <i className="fas fa-angle-left"></i>
          </NavButton>
        )}
        {mode === "day" && (
          <NavButton onClick={onBack}>
            <i className="fas fa-arrow-left"></i>
          </NavButton>
        )}
        <CurrentMonth>{date}</CurrentMonth>
        {mode === "week" && (
          <NavButton onClick={() => onShiftWeek(1)}>
            <i className="fas fa-angle-right"></i>
          </NavButton>
        )}
      </DateNavigation>
      <HeaderButtons>
        <Button $primary={true} onClick={openCreateModal}>
          <i className="fas fa-plus"></i>
          Добавить задачу
        </Button>
      </HeaderButtons>
    </StyledHeader>
  );
};

export default Header;
