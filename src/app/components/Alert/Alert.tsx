import React, {useState} from "react"
import {ReactNode} from "react";


// TODO: Update interface with Regex for Daisy UI classes
interface AlertProps {
    alertClassName?: 'alert' | 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error';
    children: ReactNode;
}

const Alert: React.FunctionComponent<AlertProps> = ({alertClassName = 'alert', children }:AlertProps) => {
    const [alertDismiss, setAlertDismiss] = useState(false);


    const handleAlertDismiss = () => {
        setAlertDismiss(true)
    }

    return(
        <>
            {!alertDismiss &&
                <div
                    role="alert"
                    className={alertClassName + " shadow-lg"}
                >
                    {/*Alert Icon*/}
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-info shrink-0 w-6 h-6"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      >
                      </path>
                  </svg>
                  <div>
                    <h3 className="font-bold">New message!</h3>
                    <div className="text-xs">Alert Message: {children}</div>
                  </div>
                  <button
                      className="btn btn-sm"
                      onClick={handleAlertDismiss}
                  >
                      Dismiss
                  </button>
                </div>
            }
        </>
    )
}

export default Alert;