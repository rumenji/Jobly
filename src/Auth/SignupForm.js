import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import ErrorAlert from "../Components/ErrorAlert";

const SignupForm = ({ signup }) => {
    const INITIAL_STATE = { username: "", password: "", firstName: "", lastName: "", email: "" };
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormData(fData => (
            { ...fData, [name]: value }
        ));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const res = await signup(formData);
        if (res.success) {
            navigate("/");
        } else {
            console.debug(res.e)
            setFormErrors(res.e)
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
                <FormGroup>
                    <Label for="c">Email:</Label>
                    <Input type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="firstName">First Name:</Label>
                    <Input type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name:</Label>
                    <Input type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange} />
                </FormGroup>
                {formErrors.length ? <ErrorAlert type="danger" messages={formErrors} /> : null}
                <Button>
                    Sign up
                </Button>
            </Form>
        </Container>
    )
}

export default SignupForm;