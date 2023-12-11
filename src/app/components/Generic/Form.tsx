'use client'
import React, {FormEvent, useRef} from "react"

interface FormProps {
    name: string
}

const Form:React.FunctionComponent<FormProps> = ({name}: FormProps) => {
    // NOTE: You should always initialize the useRef initial value to null because there isn't a DOM node that it
    //  can initially reference. The DOM node is only available after the component renders.
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const person = {
        name: '',
        age: -1
    }

    // TODO: Actual send this data to the server
    const handleFormSubmission = (event: FormEvent) => {
        event.preventDefault();
        console.log("Submitted!");
        // Note: The current property references a DOM node
        if(nameRef.current !== null && ageRef.current !== null) {
            // NOTE: Why are we allow to assign a new value to a const variable
            person.name = nameRef.current.value
            // Converting String to Int with parseInt
            person.age = parseInt(ageRef.current.value);
            console.log(person)
        }
    }

    return (
        <form
            onSubmit={handleFormSubmission}
        >
            <h1
                className={"text-lg"}
            >{name}</h1>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    id= "name"
                    ref={nameRef}
                    type="text"
                    className="form-control input input-bordered w-full max-w-xs"/>
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">
                    Age
                </label>
                <input
                    id="age"
                    ref={ageRef}
                    type="number"
                    className="form-control input input-bordered w-full max-w-xs"
                />
            </div>
            <button
                className="btn btn-primary"
                type={"submit"}
            >
                Submit
            </button>
        </form>
    )
}

export default Form;