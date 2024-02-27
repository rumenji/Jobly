import React, { useState, useEffect } from "react";
import Company from "./Company";
import { Container } from "reactstrap";
import JoblyApi from "../../Helpers/useAxios";
import SearchForm from "../SearchForm";

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompanies() {
      const res = await JoblyApi.getCompanies();
      setCompanies(res);
    }
    getCompanies();
  }, [])

  const search = async (name) => {
    const res = await JoblyApi.getCompanies(name);
    setCompanies(res);
  }

  console.log(companies)
  return (
    <Container className="bg-light border">
      <SearchForm search={search} />
      {companies.map(company => (
        <Company key={company.handle} company_info={company} />
      ))}
    </Container>
  )
};

export default CompaniesList;