import React from "react"
// NOTE: import Form from "src/app/components/Generic/Form";
import FormShorterWithoutUsingRef from "src/app/components/Generic/FormShorterWithoutUsingRef";

const MarketingSignUpPage: React.FunctionComponent = () => {
    return (
        <div>
            <FormShorterWithoutUsingRef name={"Email Sign Up"}/>
        </div>
    )
}

export default MarketingSignUpPage;