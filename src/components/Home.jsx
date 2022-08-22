import React from "react";
import { UserContext } from "./UserContext";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Home = () => {
  const ctx = React.useContext(UserContext);
  const Message = withReactContent(Swal);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(ctx.loggedIn.status);

  const handleLogin = () => {
    ctx.users.find((user, index) => {
      if (user.email === email && user.password === password) {
        ctx.loggedIn.name = user.name;
        ctx.loggedIn.email = user.email;
        ctx.loggedIn.index = index;
        ctx.loggedIn.status = true;
        return setLoggedIn(true);
      }
      return false;
    });

    if (ctx.loggedIn.status === false) {
      Message.fire({
        title: <strong>Error</strong>,
        html: <i>Email or password are incorrect</i>,
        icon: "error",
      });
      return false;
    }
  };

  const handleLogout = () => {
    ctx.loggedIn.name = "";
    ctx.loggedIn.email = "";
    ctx.loggedIn.status = false;
    setEmail("");
    setPassword("");
    return setLoggedIn(false);
  };

  return (
    <>
      <Container className="w-150">
        <Card className="bg-light text-secondary">
          <Card.Body className="pb-5 m-5">
            <h3>{loggedIn === true ? `Hello, ${ctx.loggedIn.name}` : ""}</h3>
            <h1> Welcome to Bad Bee Bank</h1>
            <h5> See What We're Buzzing About!</h5>
            <Card.Text>Login</Card.Text>

            {loggedIn === false ? (
              <>
                <input
                  type="input"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <br />
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <br />
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={handleLogin}
                  disabled={!email && password.length < 8 ? true : false}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </Card.Body>
          <div>
            <Card.Img
              className="p-3"
              variant="bottom"
            />
          </div>
        </Card>
      </Container>
    </>
  );
};

export default Home;
