import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const Company = (data) => {
  const { name, handle, description, numEmployees } = data.company_info;
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            <Link to={`/companies/${handle}`} >{name}</Link>
          </CardTitle>
          <CardText className="font-italic">{description}</CardText>
          <p className="num-employees">Number of employees: {numEmployees}</p>
        </CardBody>
      </Card>
    </section>
  )
}

export default Company;