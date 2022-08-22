import React from "react";
import Card from "react-bootstrap/Card";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Withdraw = () => {
  const ctx = React.useContext(UserContext);
  const [withdraw, setWithdraw] = React.useState(0);
  const Message = withReactContent(Swal);

  const handleWithdraw = () => {
    if (ctx.loggedIn.status === false) {
      Message.fire({
        title: <strong>Error</strong>,
        html: <i>Invalid entry. You must be logged in first</i>,
        icon: "error",
      });
      return false;
    }

    if (isNaN(parseInt(withdraw))) {
      setWithdraw(0);
      Message.fire({
        title: <strong>Error</strong>,
        html: <i>Invalid entry. Your withdraw must be a number</i>,
        icon: "error",
      });
      return false;
    } else if (parseInt(withdraw) < 0) {
      setWithdraw(0);
      Message.fire({
        title: <strong>Error</strong>,
        html: <i>Invalid entry. Your withdraw can't be a negative number</i>,
        icon: "error",
      });
      return false;
    } else if (ctx.users[ctx.loggedIn.index].balance < parseInt(withdraw)) {
      setWithdraw(0);
      Message.fire({
        title: <strong>Error</strong>,
        html: <i>I'm sorry, we couldn't commplete your transaction due to lack of funds.</i>,
        icon: "error",
      });
      return false;
    }

    //ctx.users[account].balance -= parseInt(withdraw);
    ctx.users[ctx.loggedIn.index].balance -= parseInt(withdraw);
    setWithdraw(0);
    Message.fire({
      title: <strong>Success</strong>,
      html: <i>Hooray! Your withdraw has been completed successfully!</i>,
      icon: "success",
    });
    return true;
  };

  return (
    <>
      <Card bg={"light"} text={"black"} className={"w-150 mx-auto"}>
        <Card.Header
          style={{ padding: ".75rem 1.25rem" }}
        >
          Withdraw
        </Card.Header>
        <Card.Body className="pb-5 m-5">
          <>
            Account Balance:{" "}
            {ctx.loggedIn.index
              ? ctx.users[ctx.loggedIn.index].balance
              : "Not Logged In"}
            <br />
            To Withdraw: {withdraw}
            <br />
            <br />
            Amount
            <br />
            <input
              type="text"
              className="form-control"
              id="amount"
              placeholder="Enter Amount"
              value={withdraw}
              onChange={(e) => setWithdraw(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={handleWithdraw}
              disabled={!withdraw ? true : false}
            >
              Withdraw
            </button>
          </>
        </Card.Body>
      </Card>
    </>
  );
};

export default Withdraw;
