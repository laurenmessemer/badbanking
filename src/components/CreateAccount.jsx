import React from "react";
import Card from "react-bootstrap/Card";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CreateAccount = () => {
  const [show, setShow] = React.useState(true);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const ctx = React.useContext(UserContext);
  const Message = withReactContent(Swal);

  function validate(field, label) {
    if (!field || (label === "password" && password.length < 8)) {
      if (label === "password" && password && password.length < 8) {
        Message.fire({
          title: <strong>Error</strong>,
          html: `${label} must be at least 8 characters long`,
          icon: "error",
        });
        return false;
      }
      Message.fire({
        title: <strong>Error</strong>,
        html: `No ${label} has been entered`,
        icon: "error",
      });
      return false;
    }
    return true;
  }

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    ctx.users.push({ name, email, password, balance: 100 });
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <>
      <Card bg={"light"} text={"black"} className={"w-150 mx-auto"}>
        <Card.Header
          style={{ padding: ".75rem 1.25rem" }}
        >
          Create a Bad Bee Bank Account
        </Card.Header>
        <Card.Body style={{ padding: "1.25rem" }}>
          {show ? (
            <>
              Name
              <br />
              <input
                type="input"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
              <br />
              Email address
              <br />
              <input
                type="input"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <br />
              Password
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
                className="btn btn-secondary"
                onClick={handleCreate}
                disabled={!name && !email && password.length < 8 ? true : false}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <h5>Success</h5>
              <button
                type="submit"
                className="btn btn-light"
                onClick={clearForm}
              >
                Add another account
              </button>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateAccount;
