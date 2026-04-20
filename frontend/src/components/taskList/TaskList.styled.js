import styled from "styled-components";

const StyledTaskList = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  @media screen and (max-width: 480px) {
    padding: 16px;
  }
`;

const TLHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f3f5;
  @media screen and (max-width: 480px) {
    margin-bottom: 16px;
    padding-bottom: 12px;
  }
`;

const TLDate = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

const TLCount = styled.div`
  font-size: 14px;
  color: #6c757d;
  background-color: #f8f9fa;
  padding: 6px 12px;
  border-radius: 20px;
`;

const TLTasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TLTask = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  @media screen and (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

const TLCheckbox = styled.div`
  position: relative;
  flex: 0 0 auto;
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  & label {
    display: block;
    width: 20px;
    height: 20px;
    border: 2px solid #cbd5e1;
    border-radius: 6px;
    cursor: pointer;
  }
  & input:checked + label {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }
  & input:checked + label::after {
    content: "✓";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 6px;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 12px;
  }
`;

const TLContent = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`;

const TLTitle = styled.div`
  font-size: 16px;
  height: 20px;
  line-height: 20px;
  align-self: center;
  font-weight: 500;
  text-decoration: ${(props) => (props.$isCancelled ? "line-through" : "none")};
  color: ${(props) => (props.$isCancelled ? "#64748b" : "inherit")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const TLDescription = styled.div`
  font-size: 14px;
  color: #64748b;
`;

const TLTime = styled.div`
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  color: #94a3b8;
  min-width: 64px;
  text-align: right;
  & i {
    margin-right: 4px;
  }
`;

export {
  StyledTaskList,
  TLHeader,
  TLDate,
  TLCount,
  TLTasks,
  TLTask,
  TLCheckbox,
  TLContent,
  TLTitle,
  TLDescription,
  TLTime,
};
