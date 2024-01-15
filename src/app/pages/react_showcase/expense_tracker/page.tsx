"use client";
import React, { useState } from "react";
import AddExpenseForm from "src/projects-and-modules/react-showcase-project/components/ExpenseTracker/AddExpenseForm";
import ExpenseList from "src/projects-and-modules/react-showcase-project/components/ExpenseTracker/ExpenseList";
import { FieldValues } from "react-hook-form";

// Note: This code can supersede the defined store configuration state below, however it's better to have the config
//  control the expenseFilters not this export. It's better because we could call a future API that will have a
//  whole store's configuration.
// export const expenseFilters = ["🏎️ Auto", "🏡️ Home", "🤨 Other"] as cosnt;

// NOTE: This is the global definition of Expense for now
export type Expense = {
  description: string;
  amount: number;
  category: string;
};

type ExpenseTrackerConfig = {
  expenseFilters: string[];
  currentExpenses: Expense[];
  errorTextColor: string;
};

const ExpenseTrackerPage: React.FunctionComponent = () => {
  // FIXME: This is a temporary hardcoded value till the authentication service is up and running
  const userAuthenticated: boolean = true;

  const [expenseTrackerConfig, setExpenseTrackerConfig] =
    useState<ExpenseTrackerConfig>({
      expenseFilters: ["🏎️ Auto", "🏡️ Home", "🤨 Other"],
      currentExpenses: [],
      errorTextColor: "text-rose-400",
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

      // Update Filters if needed. If it already exists, don't update.
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

  const handleDeletion = (description: string, arrayIndex: number) => {
    setExpenseTrackerConfig((prevExpenseConfigState) => {
      let expensesWithoutItemToDelete =
        prevExpenseConfigState.currentExpenses.filter(
          (expense: Expense, index: number) => {
            if (expense.description === description && arrayIndex === index) {
            } else {
              return expense;
            }
          },
        );

      // TODO: Add logic to delete the category from config, if no more items are there with that category
      return {
        ...prevExpenseConfigState,
        currentExpenses: expensesWithoutItemToDelete,
      };
    });
  };

  return (
    <div className={"place-content-evenly m-3"}>
      <h1 className={"text-xl"}>Expense Tracker Page</h1>
      <AddExpenseForm
        expenseFilters={expenseTrackerConfig.expenseFilters}
        handleAddExpense={handleExpenseAddition}
        errorTextColor={expenseTrackerConfig.errorTextColor}
        isAuthenticated={userAuthenticated}
      />
      <ExpenseList
        expenseFilters={expenseTrackerConfig.expenseFilters}
        expenses={expenseTrackerConfig.currentExpenses}
        handleDeleteButtonClick={handleDeletion}
      />
    </div>
  );
};

export default ExpenseTrackerPage;
