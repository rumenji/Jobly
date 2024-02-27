import React, { useState } from "react";
import { Button, Card, CardBody, Form, FormGroup, Input, Row } from "reactstrap";

const SearchForm = ({ search }) => {
    const [term, setTerm] = useState("");

    function handleChange(e) {
        setTerm(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        search(term || undefined);
        setTerm(term)
    }

    return (
        <Card>
            <CardBody>
                <Form onSubmit={handleSubmit}>

                    <FormGroup>
                        <Input className="square border"
                            plaintext
                            placeholder="Search..."
                            value={term}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button size="sm">Search</Button>

                </Form>
            </CardBody>
        </Card>
    )
};

export default SearchForm;