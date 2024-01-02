import { Expense } from "src/app/pages/react_showcase/expense_tracker/page";

const calculateExpenseTotal = (expenses: Expense[]) => {
  let total = 0;
  let numOfExpenses = expenses.length;
  for (let index = 0; index < numOfExpenses; index++) {
    total += expenses[index].amount;
  }
  return total;
};
export default calculateExpenseTotal;
