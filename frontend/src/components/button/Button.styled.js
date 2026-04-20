import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${(props) =>
    props.$primary &&
    `
    background-color: #4361ee;
    color: white;
    
    &:hover {
      background-color: #3a56d4;
    }
  `}

  ${(props) =>
    props.$secondary &&
    `
    background-color: #e9ecef;
    color: #495057;
    
    &:hover {
      background-color: #dee2e6;
    }
  `}

    ${(props) =>
    props.$warning &&
    `
    background-color: #be4141;
    color: #ffffff;
    
    &:hover {
      background-color: #fd0000;
    }
  `}
`;

export { StyledButton };
