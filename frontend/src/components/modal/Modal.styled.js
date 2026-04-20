import styled, { css } from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background-color: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  @media screen and (max-width: 480px) {
    padding: 16px 20px;
    font-size: 16px;
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #94a3b8;
  transition: all 0.2s;
  @media screen and (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

const ModalForm = styled.form`
  padding: 24px;
  @media screen and (max-width: 480px) {
    padding: 20px;
  }
`;

const ModalBlock = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #475569;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 12px;
  }
`;

const StyledInput = css`
  width: 100%;
  min-width: 160px;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
`;

const ModalInput = styled.input`
  ${StyledInput}
`;

const ModalTextarea = styled.textarea`
  ${StyledInput}
  resize: vertical;
  min-height: 80px;
`;

const ModalRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  @media screen and (max-width: 480px) {
    gap: 12px;
  }
`;

const ModalTimeToggle = styled.label`
  align-items: center;
  gap: 8px;
  cursor: pointer;
  input {
    width: auto;
    margin-right: 4px;
  }
`;

const ModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  @media screen and (max-width: 480px) {
    gap: 8px;
    margin-top: 0px;
    padding-top: 16px;
  }
`;

export {
  ModalOverlay,
  StyledModal,
  ModalHeader,
  ModalCloseButton,
  ModalForm,
  ModalBlock,
  ModalInput,
  ModalTextarea,
  ModalTimeToggle,
  ModalActions,
  ModalRow,
};
