"use client";
import React, { FormEvent, useState } from "react";

interface FormShorterWithoutUsingRefProps {
  name: string;
}

// Note: Some general notes about this component is that it wil re-render on every modification of its input. Some
//  may say that is slower, but premature optimization is the root of all evil. Apparently. Take this as a remember
//  to think more critically about your optimizations and optimize after the feature is developed.
const FormShorterWithoutUsingRef: React.FunctionComponent<
  FormShorterWithoutUsingRefProps
> = ({ name }: FormShorterWithoutUsingRefProps) => {
  const [person, setPerson] = useState({
    name: "",
    age: "",
  });

  // TODO: Actual send this data to the server
  const handleFormSubmission = (event: FormEvent) => {
    event.preventDefault();
    console.log("Submitted!");
    console.log(person);
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <h1 className={"text-lg"}>{name}</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          type="text"
          // This input field will always rely on the value in person and no other variable. This prevents
          // the value from de-syncing.
          value={person.name}
          className="form-control input input-bordered w-full max-w-xs"
          // NOTE: The change event handler here will make the component update every time the user types
          //  a new character or modifies their input in anyway.
          onChange={(event) => {
            setPerson({
              ...person,
              name: event.target.value,
            });
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          id="age"
          type="number"
          value={person.age}
          className="form-control input input-bordered w-full max-w-xs"
          onChange={(event) => {
            setPerson({
              ...person,
              age: event.target.value,
            });
          }}
        />
      </div>
      <button className="btn btn-primary" type={"submit"}>
        Submit
      </button>
    </form>
  );
};

export default FormShorterWithoutUsingRef;
