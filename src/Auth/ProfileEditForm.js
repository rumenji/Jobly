import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import UserContext from "./UserContext";

const ProfileEditForm = ({ editProfile }) => {
    const { currUser } = useContext(UserContext);
    console.log(currUser)
    const [formData, setFormData] = useState({
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setFormData(fData => (
            { ...fData, [name]: value }
        ));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const res = await editProfile(formData, currUser.username);
        if (res.success) {
            navigate("/");
        } else {
            console.debug(res.e)
        }
    }

    return (
        <Container className="bg-light border">
            <Form onSubmit={handleSubmit}>
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
                <FormGroup>
                    <Label for="password">Confirm password:</Label>
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
                <Button>
                    Save Changes
                </Button>
            </Form>
        </Container>
    )
}

export default ProfileEditForm;