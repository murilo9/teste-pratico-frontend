import styled from "styled-components";
import { Theme } from "../theme";
import { Employee } from "../types/Employee";
import { format } from "date-fns";
import { maskPhone } from "../helpers/maskPhone";
import { useIsMobileView } from "../hooks/useIsMobileView";
import { useState } from "react";
import CaretUpIcon from "../icons/CaretUp";
import CaretDownIcon from "../icons/CaretDown";
import { Heading2 } from "./Typography";

const StyledContainer = styled.tr`
  box-shadow: ${Theme.shadow["1"]};
  display: contents;
`;

const StyledExpandedContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

const StyledExpandedContentEntry = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed ${Theme.colors.Gray10};
`;

const StyledTableBodyData = styled.td<{
  hide?: boolean;
  alignTextRight?: boolean;
}>`
  height: 48px;
  font-weight: 400;
  display: ${(props) => (props.hide ? "none" : "table-cell")};
  padding-right: ${(props) => (props.alignTextRight ? "24px" : "0px")};
  text-align: ${(props) => (props.alignTextRight ? "right" : "left")};
`;

const StyledAvatarWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16px;
`;

const StyledAvatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;

const StyledIconButton = styled.button`
  background: none;
  border: none;
`;

const renderEmployeeData = (columnKey: keyof Employee, employee: Employee) => {
  const data = employee[columnKey];
  switch (columnKey) {
    case "image":
      return (
        <StyledAvatarWrapper>
          <StyledAvatar src={data as string} alt={employee.name} />
        </StyledAvatarWrapper>
      );
    case "admission_date":
      return format(new Date(data), "dd/MM/yyyy");
    case "phone":
      return maskPhone(data as string);
    default:
      return data;
  }
};

type EmployeeTableRowProps = {
  employee: Employee;
  columns: Array<{ title: string; key: string }>;
};

export default function EmployeeTableRow({
  columns,
  employee,
}: EmployeeTableRowProps) {
  const isMobileView = useIsMobileView();
  const [isExpanded, setIsExpanded] = useState(false);
  const columnsToRender = columns.slice(0, isMobileView ? 2 : 5);
  const expandedInfoColumns = columns.slice(2);

  return (
    <StyledContainer>
      <tr>
        {/* LISTA DE COLUNAS */}
        {columnsToRender.map((column) => (
          <StyledTableBodyData>
            {renderEmployeeData(column.key as keyof Employee, employee)}
          </StyledTableBodyData>
        ))}
        {/* BOTÃO DE EXPANDIR */}
        <StyledTableBodyData hide={!isMobileView} alignTextRight={isMobileView}>
          <StyledIconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <CaretUpIcon color={Theme.colors.BluePrimary} size={20} />
            ) : (
              <CaretDownIcon color={Theme.colors.BluePrimary} size={20} />
            )}
          </StyledIconButton>
        </StyledTableBodyData>
      </tr>
      {isExpanded && isMobileView ? (
        <tr>
          <td colSpan={isMobileView ? 3 : 5}>
            <StyledExpandedContentList>
              {expandedInfoColumns.map((column) => (
                <StyledExpandedContentEntry>
                  <Heading2>{column.title}</Heading2>
                  <span>
                    {renderEmployeeData(column.key as keyof Employee, employee)}
                  </span>
                </StyledExpandedContentEntry>
              ))}
            </StyledExpandedContentList>
          </td>
        </tr>
      ) : null}
    </StyledContainer>
  );
}
