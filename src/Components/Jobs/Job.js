import React, { useContext, useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import UserContext from "../../Auth/UserContext";

const Job = ({ id, title, salary, equity, companyName }) => {
  const { applyToJob, hasApplied } = useContext(UserContext);
  const [applied, setApplied] = useState();
  useEffect(function setAppliedStatus() {
    setApplied(hasApplied(id))
  }, [id, hasApplied])
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {title}
          </CardTitle>
          <CardText className="font-italic">{companyName}</CardText>
          <p className="num-employees">Salary: ${salary}</p>
          <p className="num-employees">Equity: {equity}</p>
          {applied ? <Button color="secondary" size="sm" disabled>Applied!</Button> :
            <Button color="primary" size="sm" onClick={() => applyToJob(id)}>Apply</Button>}
        </CardBody>
      </Card>
    </section>
  )
}

export default Job;