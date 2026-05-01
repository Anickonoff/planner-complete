import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px calc(50% - 600px);
  background-color: white;
  border-bottom: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  gap: 16px;

  @media screen and (max-width: 1248px) {
    padding: 12px 24px;
  }
  @media screen and (max-width: 480px) {
    padding: 12px 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 600;
  color: #4361ee;

  i {
    font-size: 24px;
  }
  span {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const DateNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 480px) {
    gap: 8px;
  }
`;

const CurrentMonth = styled.h1`
  font-size: 20px;
  font-weight: 600;
  min-width: 100px;
  text-align: center;
  @media screen and (max-width: 480px) {
    font-size: 16px;
    min-width: 50px;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #495057;
  transition: background-color 0.2s;
  @media screen and (max-width: 480px) {
    width: auto;
    height: 32px;
  }

  &:hover {
    background-color: #e9ecef;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export {
  StyledHeader,
  Logo,
  DateNavigation,
  CurrentMonth,
  NavButton,
  HeaderButtons,
};
