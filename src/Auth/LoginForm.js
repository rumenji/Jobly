import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import ErrorAlert from "../Components/ErrorAlert";

const LoginForm = ({ login }) => {
    const INITIAL_STATE = { username: "", password: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([])
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormData(fData => (
            { ...fData, [name]: value }
        ));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const res = await login(formData);
        if (res.success) {
            navigate("/");
        } else {
            setFormErrors(res.e)
            console.debug(res.e)
        }
    }

    return (
        <Container className="bg-light border">
            <Form onSubmit={handleSubmit}>

                <FormGroup>
                    <Label for="username">Username:</Label>
                    <Input type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password:</Label>
                    <Input type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange} />
                </FormGroup>
                {formErrors.length ? <ErrorAlert type="danger" messages={formErrors} /> : null}
                <Button>
                    Log in
                </Button>
            </Form>
        </Container>
    )
}

export default LoginForm;