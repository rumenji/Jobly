import React, { useEffect, useState } from "react";
import JoblyApi from "../../Helpers/useAxios";
import Loading from "../../Helpers/isLoading";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Container } from "reactstrap";
import JobsCards from "../Jobs/JobsCards";

const CompanyDetails = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      const res = await JoblyApi.getCompany(handle);
      setCompany(res)
    }
    getCompany();
  }, [handle]);

  if (!company) return <Loading />

  return (
    <Container className="bg-light border">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {company.name}
          </CardTitle>
          <CardText className="font-italic">{company.description}</CardText>
          <p className="num-employees">Number of employees: {company.numEmployees}</p>
          <JobsCards jobs={company.jobs} />
        </CardBody>
      </Card>
    </Container>
  )

};

export default CompanyDetails;