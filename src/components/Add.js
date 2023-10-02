import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Accounts from "./database/Accounts";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import "./Add.css";
import Rooms from "./database/Rooms";

function Add() {
  // function for Supervisor Start
  const [username, satusername] = useState("");
  const [email, satEmail] = useState("");
  const [password, satPassword] = useState("");
  const userRole = localStorage.getItem("UserRole");

  let history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqued = ids.slice(0, 8);

    let a = username,
      b = email,
      c = password;

    Accounts.push({
      id: uniqued,
      username: a,
      email: b,
      password: c,
      role: "operator",
    });

    history("/table");
    // function for supervisor end
  };
  //  function for Operator Start
  const [lantai, setLantai] = useState("");
  const [ruang, setRuang] = useState("");
  
  const Submit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let Uniqed = ids.slice(0, 8);

    let d = lantai,
        g = ruang;

        Rooms.push({
          id: Uniqed,
          lantai: d,
          ruang: g,
        
        });
        history("/table");

    //  function for operator And
  };
  return (
    <>
      {userRole === "supervisor" ? (
        <div className="div-form">
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your User Name"
                required
                onChange={(e) => satusername(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your Password"
                required
                onChange={(e) => satPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Control
                type="text"
                placeholder=" Your Email"
                required
                onChange={(e) => satEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={(e) => handleSubmit(e)} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      ) : (
        <div className="div-form">
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your Lantai"
                required
                onChange={(e) => setLantai(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Control
                type="text"
                placeholder=" Your Ruang"
                required
                onChange={(e) => setRuang(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={(e) => Submit(e)} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}
export default Add;
