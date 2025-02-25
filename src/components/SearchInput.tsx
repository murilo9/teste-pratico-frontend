import styled from "styled-components";
import { Theme } from "../theme";
import SearchIcon from "../icons/Search";

const StyledContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  height: 48px;
  border: 1px solid ${Theme.colors.Gray10};
  &::placeholder {
    color: ${Theme.colors.Gray20};
  }
  background-color: #ffffff;
  border-radius: 8px;
  position: relative;
  padding: 0px 40px 0px 16px;
  width: 100%;
  font-size: 16px;
`;

const StyledIconWrapper = styled.div`
  position: absolute;
  right: 14px;
  top: 14px;
`;

type SearchInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchInput({
  className,
  onChange,
  placeholder,
  value: inputValue,
}: SearchInputProps) {
  return (
    <StyledContainer className={className}>
      <StyledInput
        type="text"
        value={inputValue}
        onChange={({ target: { value } }) =>
          onChange ? onChange(value) : null
        }
        placeholder={placeholder || "Pesquisar"}
      />
      <StyledIconWrapper>
        <SearchIcon color="#dfdfdf" />
      </StyledIconWrapper>
    </StyledContainer>
  );
}
