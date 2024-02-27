import React from "react";
import Job from "./Job";

const JobsCards = ({ jobs }) => {
    return (
        <div>
            {jobs.map(job => (
                <Job key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName} />
            ))}
        </div>
    )
}

export default JobsCards;