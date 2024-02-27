import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import { Button, Container } from "reactstrap";

const Home = () => {
    const { currUser } = useContext(UserContext);

    return (
        <Container>
            {currUser ?
                <h4>
                    Welcome to the Jobly Board, {currUser.firstName || currUser.username}!
                </h4>
                :
                <p>
                    <Link to="/login">
                        <Button>Login</Button>
                    </Link>
                    <Link to="/signup">
                        <Button>Sign up</Button>
                    </Link>
                </p>
            }
        </Container>
    )
};

export default Home;