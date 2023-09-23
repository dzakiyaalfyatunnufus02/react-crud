import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employees";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import "./Add.css";

function Add() {
  const [name, satName] = useState("");
  const [age, satAge] = useState("");

  let history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqued = ids.slice(0, 8);

    let a = name,
      b = age;

    Employees.push({ id: uniqued, Name: a, Age: b });

    history("/");
  };
  return (
    <div className="div-form">
      <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="YourName"
            required
            onChange={(e) => satName(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Control
            type="text"
            placeholder=" YourAge"
            required
            onChange={(e) => satAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Add;
