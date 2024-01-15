"use client";
import React from "react";
// NOTE: to useFrom the component must be a client-side component!
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const expenseFormSchema = z.object({
  description: z
    .string({
      required_error: "A description is required.",
    })
    .min(1, {
      message: "Please enter at least one character.",
    })
    .max(60, {
      message: "Maximum 60 characters reached.",
    }),
  // TODO: Make this work with a dollar amount and not just a normal number
  amount: z
    .number({
      required_error: "An amount is required.",
      invalid_type_error: "This value needs to be a dollar amount.",
    })
    .min(0.0)
    .max(9_000_000_000_000)
    // TODO: Refine and implement // value must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
    // .safe({
    //   message:
    //     "You have entered a value that is greater than 9 Trillion or a value that is less than negative 9 Trillion." +
    //     " Contact Support if you believe this is correct.",
    // })
    .refine((number) => {
      return number * 100 - Math.trunc(number * 100) < Number.EPSILON;
    }),
  category: z.string({
    required_error: "Please select a Category",
  }),
});

type ExpenseFormData = z.infer<typeof expenseFormSchema>;

interface AddExpenseFromProps {
  expenseFilters: string[];
  handleAddExpense: (data: FieldValues) => void;
  errorTextColor: string;
  isAuthenticated: boolean;
}

const AddExpenseForm = ({
  expenseFilters,
  handleAddExpense,
  errorTextColor,
  isAuthenticated,
}: AddExpenseFromProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(expenseFormSchema) });

  return (
    <div className={"mt-3 flex items-center"}>
      <form
        onSubmit={handleSubmit((data) => {
          handleAddExpense(data);
          reset();
        })}
      >
        <div className={"mb-4"}>
          <h2 className={"mt-2 text-lg"}>Add An Expense</h2>
          <div className={"mb-3"}>
            <label htmlFor={"description"} className={"form-label"}>
              Expense Description
            </label>
            <input
              id={"description"}
              type={"text"}
              className={"form-control input input-bordered w-full max-w-xs"}
              {...register("description")}
            />
            {errors.description && (
              <p className={errorTextColor + " "}>
                {errors.description.message}
              </p>
            )}
          </div>
          <div className={"mb-3"}>
            <label htmlFor={"amount"} className={"form-label"}>
              Amount
            </label>
            <input
              id={"amount"}
              type={"number"}
              className={"form-control input input-bordered w-full max-w-xs"}
              {...register("amount", {
                valueAsNumber: true,
              })}
            />
            {errors.amount && (
              <p className={errorTextColor + " "}>{errors.amount.message}</p>
            )}
          </div>
          <label className={"form-control w-full max-w-xs mb-4"}>
            <div className={"label"}>
              <span className={"label-text"}>Expense Category</span>
            </div>
            <select
              id={"category"}
              className={"select select-bordered"}
              defaultValue={"🤨 Other"}
              {...register("category")}
            >
              <option disabled value={"🤨 Other"}>
                ️Click to Select a Category
              </option>
              {expenseFilters.map((filter: string, index: number) => {
                return (
                  <option key={index} value={filter}>
                    {filter}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <button className={"mt-4 btn btn-primary"} type={"submit"}>
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
