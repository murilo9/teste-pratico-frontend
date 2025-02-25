import styled from "styled-components";
import Header from "./components/Header";
import { Heading1 } from "./components/Typography";
import SearchInput from "./components/SearchInput";
import { Theme } from "./theme";
import EmployeeTable from "./components/EmployeeTable";
import { useEffect, useState } from "react";
import { Employee } from "./types/Employee";
import { filterEmployeesBySearchQuery } from "./helpers/filterEmployeesBySearchQuery";

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
`;

const StyledTitle = styled(Heading1)`
  margin-bottom: 24px;
  font-size: 24px;
`;

const StyledSearchInput = styled(SearchInput)`
  margin-bottom: ${Theme.spacing.Medium20px};
`;

const StyledHeadingContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;

  @media screen and (min-width: 768px) {
    grid-template-columns: 3fr 288px;
  }
`;

function App() {
  const [employees, setEmployees] = useState<Array<Employee> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEmployees =
    employees !== null && searchQuery
      ? filterEmployeesBySearchQuery(employees, searchQuery)
      : employees;

  useEffect(() => {
    const init = async () => {
      const res = await fetch("http://localhost:3000/employees");
      const data = (await res.json()) as Array<Employee>;
      setEmployees(data);
    };
    init();
  }, []);

  return (
    <>
      <Header />
      <StyledMainContent>
        <StyledHeadingContainer>
          <StyledTitle>Funcionários</StyledTitle>
          <StyledSearchInput value={searchQuery} onChange={setSearchQuery} />
        </StyledHeadingContainer>
        {employees && filteredEmployees ? (
          <EmployeeTable employees={filteredEmployees} />
        ) : null}
      </StyledMainContent>
    </>
  );
}

export default App;
