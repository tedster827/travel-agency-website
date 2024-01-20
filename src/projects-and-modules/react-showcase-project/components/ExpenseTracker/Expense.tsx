import React from "react";

interface ExpenseProps {
  name: string;
  amount: number;
}

const Expense = ({ name, amount }: ExpenseProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <h4>{amount}</h4>
    </div>
  );
};

export default Expense;
