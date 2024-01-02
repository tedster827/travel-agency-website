"use client";
import React, { FormEvent, useState } from "react";
// React Hook Form is great for form validation and simplicity! It's validation and other features can be reused
// through the project
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// zod form validation site: zod.dev
import { z } from "zod";

// TODO: The form data fields are here. We need to implement a way to have a dynamic form for any fields
// z object from zod using chaining for form validations min().max() ... etc
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 letters long!",
    })
    .max(60, {
      message:
        "First name must be less than 60 letters long. If your first name is longer than 60 letters, please" +
        " contact support.",
    }),
  age: z
    // NOTE that all number validation fields are not the digits like in the normal HTML validation, it is the
    //  value min and max (age 18-9999 below)
    .number({
      invalid_type_error: "Please ensure that is a number and it is filled out",
    })
    .min(18, {
      message:
        "I'm sorry this site is only available to users over the age of 18.",
    })
    .max(9999, {
      message: "Are you really over 9999 years old? Please Contact Support!",
    }),
});
// The above is the standard HTML form validation attributes

type FormData = z.infer<typeof formSchema>;

let errorTextColor: string = "text-rose-400";

interface FormUsingReactHookFormProps {
  formName: string;
}

const FormUsingReactHookForm: React.FunctionComponent<
  FormUsingReactHookFormProps
> = ({ formName }: FormUsingReactHookFormProps) => {
  // Example of nested destructuring in JS (With formState)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  // NOTE: Uncomment to display available form handling
  // console.log(errors)

  // FieldValues is defined in the react-hook-form library
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div
      // TODO: Add better padding with form items
      className={""}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={"text-lg"}>{formName}</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control input input-bordered w-full max-w-xs"
            // This function returns an object and spreading that object will add all the function
            // properties to the input field
            {...register("name")}
          />
          {/*theObject.propertyName?.type with the question mark is optional chaining. This only should be used
                     when
                     you're not sure if the object has propertyName.*/}
          {errors.name && (
            <p className={errorTextColor + " "}>{errors.name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            id="age"
            type="number"
            className="form-control input input-bordered w-full max-w-xs"
            // The onChange eventHandler is called below with register
            {...register("age", {
              valueAsNumber: true,
            })}
          />
          {errors.age && (
            <p className={errorTextColor + " "}>{errors.age.message}</p>
          )}
        </div>
        {/* FIXME: Below is the code for if the button for submit would be disabled when the form is invalid. There
         is an issue with this however. The error messages don't show if the form isn't submitted*/}
        {/*<button className="btn btn-primary" type={"submit"} disabled={!isValid}>*/}
        {/*  Submit*/}
        {/*</button>*/}
        <button className="btn btn-primary" type={"submit"}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormUsingReactHookForm;
