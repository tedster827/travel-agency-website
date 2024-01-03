"use client";
import React, { ChangeEvent, useState } from "react";
import { Expense } from "src/app/pages/react_showcase/expense_tracker/page";
import calculateExpenseTotal from "src/app/components/ReactShowcase/ExpenseTracker/calculateExpenseTotal";

interface ExpenseListProps {
  expenseFilters: string[];
  expenses: Expense[];
}

const ExpenseList = ({ expenseFilters, expenses }: ExpenseListProps) => {
  const [currentFilter, setCurrentFilter] = useState<string>("NONE");

  const handleFilterSelection = (
    dropdownEvent: ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentFilter(dropdownEvent.target.value);
  };

  return (
    <div className={"mt-5"}>
      <div
        className={
          "border flex flex-col md:flex-row items-center gap-4 p-4 mb-2"
        }
      >
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Expenses</div>
            <div className="stat-value">${calculateExpenseTotal(expenses)}</div>
            {/*<div className="stat-desc">21% more than last month</div>*/}
          </div>
        </div>

        <label className={"form-control w-full max-w-xs mb-4"}>
          <div className={"label"}>
            <span className={"label-text"}>Filter Expenses</span>
          </div>
          <select
            id={"selectedCategory"}
            className={"select select-bordered"}
            defaultValue={"NONE"}
            onChange={handleFilterSelection}
          >
            <option value={"NONE"}>Remove Filter (No Current Filter)</option>
            {expenseFilters.map((categoryFilter, index) => {
              return (
                <option key={index} value={categoryFilter}>
                  {categoryFilter}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <p className={"mb-4 text-sm"}>
        Last Rendered Time: {new Date().toLocaleString()}
      </p>
      {/*TODO: add mapping to x expenses here*/}
      <table className={"table table-ordered"}>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => {
            console.log("Current Expense: " + expense.description);
            if (
              currentFilter === "NONE" ||
              currentFilter === expense.category
            ) {
              return (
                <tr key={index}>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  {/*Take Note: category is the expense's filter category. The values should be the same when
                     filtering.*/}
                  <td>{expense.category}</td>
                </tr>
              );
            }
            return;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
