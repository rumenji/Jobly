import React from "react";
import { Alert } from "reactstrap";

const ErrorAlert = ({ type, messages = [] }) => {
    return (
        <Alert color={type}>
            {messages.map(error => (
                error
            ))}
        </Alert>
    )
}

export default ErrorAlert;