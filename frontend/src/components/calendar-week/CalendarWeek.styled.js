import styled, { css } from "styled-components";

const StyledCalendarWeek = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
`;

const CWHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #495057;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f3f5;
`;

const CWGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #f1f3f5;
  border-radius: 8px;
  border: 1px solid #f1f3f5;
  overflow: hidden;
`;

const CWCell = styled.div`
  min-height: 100px;
  background-color: #fff;
  padding: 12px;
  position: relative;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  ${({ $isWeekend }) =>
    $isWeekend &&
    css`
      color: #ff0101;
    `}
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: #72acea;
    `}
  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? "#3a95f6" : "#f8f9fa"};
  }
  ${({ $isCurrent }) =>
    $isCurrent &&
    css`
      color: rgb(29, 103, 232);
      font-weight: 600;
    `}
  @media screen and (max-width: 480px) {
    min-height: 80px;
    font-size: 14px;
    padding: 10px;
  }
`;

const CWCellDate = styled.div`
  margin-bottom: 8px;
`;

const CWCellTasks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;

const CWCellTask = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  &:nth-child(1) {
    background-color: #4361ee;
  }
  &:nth-child(2) {
    background-color: #4caf50;
  }
  &:nth-child(3) {
    background-color: #ff9800;
  }
`;

export {
  StyledCalendarWeek,
  CWHeader,
  CWGrid,
  CWCell,
  CWCellDate,
  CWCellTasks,
  CWCellTask,
};
