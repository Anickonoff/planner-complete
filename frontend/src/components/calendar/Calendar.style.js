import styled from "styled-components";

const StyledCalendar = styled.div`
  position: relative;
  width: 225px;
  height: 375px;
  margin-bottom: 20px;
  @media screen and (max-width: 768px) {
    max-width: 340px;
    width: 100%;
    margin-inline: auto;
    padding: 0 10px;
  }
`;

const CalendarBlock = styled.div`
  display: block;
`;

const CalendarNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 7px;
  @media screen and (max-width: 768px) {
    padding: 0 14px;
  }
`;

const CalendarMonth = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  color: #000000;
  font-size: 14px;
  line-height: 25px;
  font-weight: 600;
  cursor: pointer;
`;

const CalendarActions = styled.div`
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalendarAction = styled.div`
  height: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
`;

const CalendarContent = styled.div`
  margin-bottom: 8px;
  touch-action: pan-y;
  user-select: none;
  will-change: transform, opacity;
  transform: translate3d(${({ $translateX = 0 }) => $translateX}px, 0, 0);
  opacity: ${({ $opacity = 1 }) => $opacity};
  transition: ${({ $transitionEnabled }) =>
    $transitionEnabled ? "transform 220ms ease, opacity 220ms ease" : "none"};
`;

const CalendarDaysNames = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 7px 0;
  padding: 0 7px;
  @media screen and (max-width: 768px) {
    padding: 0 14px;
  }

`;

const CalendarDayName = styled.div`
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.2px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const CalendarDayNameWeekend = styled(CalendarDayName)`
  color: #f00;
`;

const CalendarCells = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    max-width: 344px;
    height: auto;
    justify-content: space-around;
  }
`;

const CalendarWeek = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #000000;
  }
`;

const CalendarCell = styled.div`
  width: 25px;
  height: 25px;
  margin: 2px;
  border-radius: 50%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  color: ${({ $isActive, $isWeekend }) =>
    $isActive ? "#fff" : $isWeekend ? "#f00" : "#000000"};
  font-weight: ${({ $isCurrent }) => ($isCurrent ? "700" : "normal")};
  background-color: ${({ $isActive }) => ($isActive ? "#999" : "transparent")};
  opacity: ${({ $isOtherMonth }) => ($isOtherMonth ? "0.5" : "1")};
  font-size: 12px;
  line-height: 1;
  letter-spacing: -0.2px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
    width: 42px;
    height: 42px;
  }
`;

const MonthPicker = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  z-index: 20;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  padding: 10px;
`;

const MonthPickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const MonthPickerTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #000;
`;

const MonthPickerControls = styled.div`
  display: flex;
  gap: 6px;
`;

const MonthPickerControl = styled.button`
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 6px;
  min-width: 28px;
  height: 28px;
  padding-inline: 8px;
  font-size: 13px;
  cursor: pointer;
`;

const PickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
`;

const PickerButton = styled.button`
  border: 1px solid ${({ $isSelected }) => ($isSelected ? "#666" : "#ddd")};
  background: ${({ $isSelected }) => ($isSelected ? "#f0f0f0" : "#fff")};
  border-radius: 8px;
  min-height: 34px;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 6px;
`;

const MonthPickerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 6px;
  margin-top: 8px;
`;

const MonthPickerFooterButton = styled.button`
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 8px;
  min-height: 32px;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 10px;
  flex: 1;
`;

export {
  StyledCalendar,
  CalendarBlock,
  CalendarNav,
  CalendarMonth,
  CalendarActions,
  CalendarAction,
  CalendarContent,
  CalendarDaysNames,
  CalendarDayName,
  CalendarDayNameWeekend,
  CalendarCells,
  CalendarWeek,
  CalendarCell,
  MonthPicker,
  MonthPickerHeader,
  MonthPickerTitle,
  MonthPickerControls,
  MonthPickerControl,
  PickerGrid,
  PickerButton,
  MonthPickerFooter,
  MonthPickerFooterButton,
};
