import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import Calendar from "../calendar/Calendar";
import { MCSButton } from "./MobileCalendarSheet.styled";

const MobileCalendarSheet = ({ selectedWeekStart, onSelectDate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSheet = () => setIsOpen(true);
  const closeSheet = () => setIsOpen(false);
  return (
    <>
      <MCSButton onClick={openSheet}>Показать календарь</MCSButton>
      <Sheet isOpen={isOpen} onClose={closeSheet} detent="content">
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content disableDrag>
            <Calendar
              selectedWeekStart={selectedWeekStart}
              onSelectDate={(date) => {
                onSelectDate(date);
                closeSheet();
              }}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={closeSheet} />
      </Sheet>
    </>
  );
};

export default MobileCalendarSheet;
