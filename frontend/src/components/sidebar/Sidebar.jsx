import { StyledSidebar } from "./Sidebar.styled";

const Sidebar = ( {children} ) => {
  return (
    <StyledSidebar>
      {children}
    </StyledSidebar>
  );
};

export default Sidebar;
