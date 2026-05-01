import styled from "styled-components";

const StyledMain = styled.main`
  display: flex;
  height: calc(100vh - 73px);
  padding-inline: calc(50% - 600px);

  @media screen and (max-width: 1248px) {
    padding-inline: 24px;
  }
`;

export { StyledMain };
