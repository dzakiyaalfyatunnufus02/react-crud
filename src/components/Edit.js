import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employees";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import "./Add.css";

function Edit() {
  const [name, satName] = useState("");
  const [age, satAge] = useState("");
  const [id, satId] = useState("");

  let history = useNavigate();

  var index = Employees.map(function (e) {
    return e.id;
  }).indexOf(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    let a = Employees[index];
    a.Name = name;
    a.Age = age;

    history("/table");
  };

  useEffect(() => {
    satName(localStorage.getItem("Name"));
    satAge(localStorage.getItem("Age"));
    satId(localStorage.getItem("Id"));
  }, []);

  return (
    <div className="div-form">
      <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="YourName"
            value={name}
            required
            onChange={(e) => satName(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Control
            type="number"
            placeholder=" YourAge"
            value={age}
            required
            onChange={(e) => satAge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button onClick={(e) => handleSubmit(e)} type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
export default Edit;
