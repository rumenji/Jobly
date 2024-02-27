import React, { useState, useEffect } from "react";
import JobsCards from "./JobsCards";
import JoblyApi from "../../Helpers/useAxios";
import SearchForm from "../SearchForm";
import { Container } from "reactstrap";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);


  useEffect(function getAllJobs() {
    searchJobs();
  }, []);

  async function searchJobs() {
    const res = await JoblyApi.getJobs();
    setJobs(res);
  }

  const search = async (title) => {
    const res = await JoblyApi.getJobs(title);
    setJobs(res);
  }

  console.log(jobs)
  return (
    <Container className="bg-light border">
      <SearchForm search={search} />
      <JobsCards jobs={jobs} />
    </Container>
  )
};

export default JobsList;