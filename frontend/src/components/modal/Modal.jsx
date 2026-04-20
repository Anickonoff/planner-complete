import { format } from "date-fns";
import Button from "../button/Button";
import {
  ModalActions,
  ModalBlock,
  ModalCloseButton,
  ModalForm,
  ModalHeader,
  ModalInput,
  ModalOverlay,
  ModalRow,
  ModalTextarea,
  ModalTimeToggle,
  StyledModal,
} from "./Modal.styled";
import { useEffect, useState } from "react";

const Modal = ({ mode, initialData, onSubmit, onClose, onDelete }) => {
  const [formData, setFormData] = useState(initialData);

  const [errors, setErrors] = useState({
    title: "",
    eventDate: "",
  });

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  if (!formData) return null;
  const parsedDate = new Date(formData.eventDate);

  const validateForm = () => {
    const newErrors = {};
    const eventDate = new Date(formData.eventDate);
    if (!formData.title.trim()) {
      newErrors.title = "Название задачи не может быть пустым";
    }
    if (formData.hasTime) {
      if (eventDate < new Date()) {
        newErrors.eventDate = "Дата не может быть в прошлом";
      }
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const eventDay = new Date(eventDate);
      eventDay.setHours(0, 0, 0, 0);
      if (eventDay < today) {
        newErrors.eventDate = "Дата не может быть в прошлом";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value; // строка в формате "yyyy-MM-dd"
    const [year, month, day] = newDate.split("-").map(Number);
    setFormData((prev) => {
      const updatedDate = new Date(prev.eventDate);
      updatedDate.setFullYear(year, month - 1, day);
      return { ...prev, eventDate: updatedDate.toISOString() };
    });
    setErrors((prev) => ({ ...prev, eventDate: "" }));
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value; // строка в формате "HH:mm"
    const [hours, minutes] = newTime.split(":").map(Number);
    setFormData((prev) => {
      const updatedDate = new Date(prev.eventDate);
      updatedDate.setHours(hours, minutes);
      return { ...prev, eventDate: updatedDate.toISOString() };
    });
    setErrors((prev) => ({ ...prev, eventDate: "" }));
  };

  const handleToggleTime = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => {
      const date = new Date(prev.eventDate);
      if (!checked) {
        date.setHours(0, 0, 0, 0);
      }
      return { ...prev, eventDate: date.toISOString(), hasTime: checked };
    });
    setErrors((prev) => ({ ...prev, eventDate: "" }));
  };

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить это событие?")) {
      onDelete(formData.id);
    }
  };

  const handleCancelTask = () => {
    onSubmit({ ...formData, status: "cancelled" });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>{mode === "edit" ? "Редактировать задачу" : "Новая задача"}</h3>
          <ModalCloseButton onClick={onClose}>
            <i className="fas fa-times"></i>
          </ModalCloseButton>
        </ModalHeader>
        <ModalForm
          onSubmit={(e) => {
            e.preventDefault();
            if (validateForm()) {
              onSubmit(formData);
            }
          }}
        >
          <ModalBlock>
            <label htmlFor="taskTitle">Название задачи</label>
            <ModalInput
              id="taskTitle"
              type="text"
              placeholder="Что нужно сделать?"
              name="title"
              value={formData?.title || ""}
              onChange={handleChange}
            />
            {errors.title && (
              <span style={{ color: "red" }}>{errors.title}</span>
            )}
          </ModalBlock>
          <ModalBlock>
            <label htmlFor="taskDesc">Описание</label>
            <ModalTextarea
              id="taskDesc"
              placeholder="Детали задачи (не обязательно)"
              name="description"
              value={formData?.description || ""}
              onChange={handleChange}
            />
          </ModalBlock>
          <ModalRow>
            <ModalBlock>
              <label htmlFor="taskDate">Дата</label>
              <ModalInput
                id="taskDate"
                type="date"
                value={format(parsedDate, "yyyy-MM-dd")}
                onChange={handleDateChange}
              />
              {errors.eventDate && (
                <span style={{ color: "red" }}>{errors.eventDate}</span>
              )}
            </ModalBlock>
            <ModalBlock>
              <ModalTimeToggle htmlFor="taskTime">
                <input
                  type="checkbox"
                  id="taskTimeToggle"
                  checked={formData?.hasTime ?? false}
                  onChange={handleToggleTime}
                />
                Добавить время
              </ModalTimeToggle>
              <ModalInput
                id="taskTime"
                type="time"
                disabled={!formData?.hasTime}
                value={formData?.hasTime ? format(parsedDate, "HH:mm") : ""}
                onChange={handleTimeChange}
              />
            </ModalBlock>
          </ModalRow>
          <ModalActions>
            <Button $secondary={true} type="button" onClick={onClose}>
              Отмена
            </Button>
            <Button $primary={true} type="submit">
              Сохранить
            </Button>
            {mode === "edit" && (
              <Button
                $secondary={true}
                type="button"
                onClick={handleCancelTask}
              >
                Отменить задачу
              </Button>
            )}
            {mode === "edit" && (
              <Button $warning={true} type="button" onClick={handleDelete}>
                Удалить
              </Button>
            )}
          </ModalActions>
        </ModalForm>
      </StyledModal>
    </ModalOverlay>
  );
};

export default Modal;
