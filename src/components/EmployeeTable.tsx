import styled from "styled-components";
import { Theme } from "../theme";
import { Heading2 } from "./Typography";
import { useIsMobileView } from "../hooks/useIsMobileView";
import { Employee } from "../types/Employee";
import CircleIcon from "../icons/Circle";
import EmployeeTableRow from "./EmployeeTableRow";

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const StyledTableHeader = styled.thead`
  background-color: ${Theme.colors.BluePrimary};
  color: ${Theme.colors.White};
`;

const StyledTableHeaderData = styled.th<{
  hide?: boolean;
  isMobileView: boolean;
}>`
  height: 48px;
  text-align: left;
  font-weight: 500;
  &:first-of-type {
    border-top-left-radius: 8px;
    width: ${(props) => (props.isMobileView ? "80px" : "auto")};
    padding-left: 16px;
  }
  &:last-of-type {
    border-top-right-radius: 8px;
    padding-right: 34px;
    text-align: ${(props) => (props.isMobileView ? "right" : "left")};
  }
`;

const StyledTableBody = styled.tbody`
  background-color: ${Theme.colors.White};
`;

const COLUMNS = [
  { title: "Foto", key: "image" },
  { title: "Nome", key: "name" },
  { title: "Cargo", key: "job" },
  { title: "Data de admissão", key: "admission_date" },
  { title: "Telefone", key: "phone" },
];

type EmployeeTableProps = {
  employees: Array<Employee>;
};

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  const isMobileView = useIsMobileView();
  const columnsToRender = COLUMNS.slice(0, isMobileView ? 2 : 5);

  return (
    <StyledTable>
      <StyledTableHeader>
        {columnsToRender.map((column, index) => (
          <StyledTableHeaderData
            hide={index > 1 && isMobileView}
            isMobileView={isMobileView}
          >
            <Heading2>{column.title.toUpperCase()}</Heading2>
          </StyledTableHeaderData>
        ))}
        {isMobileView ? (
          <StyledTableHeaderData isMobileView={isMobileView}>
            <Heading2>
              <CircleIcon />
            </Heading2>
          </StyledTableHeaderData>
        ) : null}
      </StyledTableHeader>
      <StyledTableBody>
        {employees.map((employee) => (
          <EmployeeTableRow
            employee={employee}
            columns={COLUMNS}
            key={employee.id}
          />
        ))}
      </StyledTableBody>
    </StyledTable>
  );
}
