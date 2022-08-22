import React from "react";
import Card from "react-bootstrap/Card";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Deposit = () => {
  const ctx = React.useContext(UserContext);
  const [deposit, setDeposit] = React.useState(0);
  const Message = withReactContent(Swal);

  const handleDeposit = () => {
    if (ctx.loggedIn.status === false) {
      Message.fire({
        title: <strong>Error</strong>,
        html: <i>Must be logged in first</i>,
        icon: "error",
      });
      return false;
    }

    if (isNaN(deposit)) {
      setDeposit(0);
      Message.fire({
        title: <strong>Error</strong>,
        html: <i>Deposit must be a number</i>,
        icon: "error",
      });
      return false;
    } else if (deposit < 0) {
      setDeposit(0);
      Message.fire({
        title: <strong>Error</strong>,
        html: <i>Deposit can't be a negative number</i>,
        icon: "error",
      });
      return false;
    }

    //ctx.users[account].balance += parseInt(deposit);
    ctx.users[ctx.loggedIn.index].balance += parseInt(deposit);

    setDeposit(0);
    Message.fire({
      title: <strong>Success</strong>,
      html: <i>Your Big deposit has been received!</i>,
      icon: "success",
    });
    return true;
  };

  return (
    <>
      <Card bg={"light"} text={"black"} className={"w-150 mx-auto"}>
        <Card.Header style={{ padding: ".75rem 1.25rem" }}>
          Deposit
        </Card.Header>
        <Card.Body style={{ padding: "1.25rem" }}>
          <>
            Account Balance:{" "}
            {ctx.loggedIn.status
              ? ctx.users[ctx.loggedIn.index].balance
              : "Not Logged In"}
            <br />
            To Deposit: {deposit}
            <br />
            <br />
            Amount
            <br />
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Enter Amount"
              value={deposit}
              onChange={(e) => setDeposit(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={handleDeposit}
              disabled={!deposit ? true : false}
            >
              Deposit
            </button>
          </>
        </Card.Body>
      </Card>
    </>
  );
};

export default Deposit;
