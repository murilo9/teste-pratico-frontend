import styled from "styled-components";
import { Theme } from "../theme";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 21px;
  height: 60px;
  width: 100%;
  box-shadow: ${Theme.shadow["1"]};
  background-color: ${Theme.colors.White};
`;

export default function Header() {
  return (
    <StyledHeader>
      <img src="logo.svg" alt="Logo" />
    </StyledHeader>
  );
}
