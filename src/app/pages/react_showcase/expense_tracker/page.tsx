"use client";
import React, { useState } from "react";
import AddExpenseForm from "src/app/components/ReactShowcase/ExpenseTracker/AddExpenseForm";
import ExpenseList from "src/app/components/ReactShowcase/ExpenseTracker/ExpenseList";
import { FieldValues } from "react-hook-form";

// NOTE: This is the global definition of Expense for now
export type Expense = {
  description: string;
  amount: number;
  category: string;
};

type ExpenseTrackerConfig = {
  expenseFilters: string[];
  currentExpenses: Expense[];
};

const ExpenseTrackerPage: React.FunctionComponent = () => {
  const [expenseTrackerConfig, setExpenseTrackerConfig] =
    useState<ExpenseTrackerConfig>({
      expenseFilters: [],
      currentExpenses: [],
    });

  const handleExpenseAddition = (data: FieldValues) => {
    const newExpenseAddition = {
      description: data.description,
      amount: data.amount,
      category: data.category,
    };

    // NOTE: React takes the second state update and overrides the first set state.
    setExpenseTrackerConfig((prevConfig) => {
      // Update Expenses
      const updatedExpenses = [
        ...prevConfig.currentExpenses,
        newExpenseAddition,
      ];

      // Update Filters if needed
      const updatedFilters = prevConfig.expenseFilters.includes(data.category)
        ? prevConfig.expenseFilters
        : [...prevConfig.expenseFilters, data.category];

      return {
        ...prevConfig,
        currentExpenses: updatedExpenses,
        expenseFilters: updatedFilters,
      };
    });
  };

  console.log("Page Config");
  console.log(expenseTrackerConfig);

  return (
    <div className={"place-content-evenly m-3"}>
      <h1 className={"text-xl"}>Expense Tracker Page</h1>
      <AddExpenseForm handleAddExpense={handleExpenseAddition} />
      <ExpenseList
        expenseFilters={expenseTrackerConfig.expenseFilters}
        expenses={expenseTrackerConfig.currentExpenses}
      />
    </div>
  );
};

export default ExpenseTrackerPage;
