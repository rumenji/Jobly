import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import { Button, Col, Container, Row } from "reactstrap";

const Home = () => {
    const { currUser } = useContext(UserContext);

    return (
        <Container>
            {currUser ?
                <h4>
                    Welcome to the Jobly Board, {currUser.firstName || currUser.username}!
                </h4>

                :
                <h5>To use the Jobly app <Link to="/login"> log in </Link>
                     first or <Link to="/signup"> sign up</Link>.
                </h5>


            }

        </Container>
    )
};

export default Home;