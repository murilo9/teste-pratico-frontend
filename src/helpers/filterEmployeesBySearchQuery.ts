import { Employee } from "../types/Employee";

export const filterEmployeesBySearchQuery = (
  employees: Array<Employee>,
  searchQuery: string
): Array<Employee> =>
  employees.filter((employee) => {
    const searchTerms = [employee.name, employee.job, employee.phone];
    const regex = new RegExp(searchQuery, "i");
    return searchTerms.some((term) => regex.test(term));
  });
