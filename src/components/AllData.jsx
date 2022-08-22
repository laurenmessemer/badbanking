import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { UserContext } from "./UserContext";

function AllData() {
  const ctx = React.useContext(UserContext);
  let even = true;
  return (
    <>
      <Container>
        <Card text={"black"} className="">
          <Card.Header className=" bg-light">
            <h5>Bee Bank User Data</h5>
          </Card.Header>
           <Card.Body className="pb-5 m-5">
            <Container className="w-150">
              <Row className={"bg-light text-black"}>
                <Col>EMAIL</Col>
                <Col>PASSWORD</Col>
                <Col>BALANCE</Col>
              </Row>
              {ctx.users.map((user, index) => {
                even = !even;
                return (
                  <Row
                    key={index}
                    className={
                      even ? "bg-light text-black" : "bg-white text-black"
                    }
                  >
                    <Col>{user.email}</Col>
                    <Col>{user.password}</Col>
                    <Col>{user.balance}</Col>
                  </Row>
                );
              })}
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AllData;
