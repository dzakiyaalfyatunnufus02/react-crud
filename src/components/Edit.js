import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Accounts from "./database/Accounts";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import "./Add.css";
import Rooms from "./database/Rooms";

function Edit() {
  // function for supervisor
  const [username, satusername] = useState("");
  const [email, satEmail] = useState("");
  const [id, satId] = useState("");
  const [ Id, setId] = useState("");
  const [password, satPassword] = useState("");
  const [role, satRole] = useState("");
  const userRole = localStorage.getItem("UserRole");

  let history = useNavigate();

  var index = Accounts.map(function (e) {
    return e.id;
  }).indexOf(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    let a = Accounts[index];
    a.username = username;
    a.email = email;
    a.password = password;

    history("/table");
  };

  useEffect(() => {
    satusername(localStorage.getItem("username"));
    satEmail(localStorage.getItem("email"));
    satPassword(localStorage.getItem("password"));
    satRole(localStorage.getItem("role"));
    satId(localStorage.getItem("Id"));
  }, []);
  //  function for supervisor end

  // functioln for operator Start
  const [lantai, setLantai] = useState("");
  const [Ruang, setRuang] = useState("");

  var INDEX = Rooms.map(function (e) {
    return e.id;
  }).indexOf(Id);

  const Submit = (e) => {
    e.preventDefault();
    let b = Rooms[INDEX];
    b.lantai = lantai;
    b.ruang = Ruang;

    history("/table");
  };
  useEffect(() => {
    setLantai(localStorage.getItem("lantai"));
    setRuang(localStorage.getItem("ruang"));
    setId(localStorage.getItem ("id"));
  }, []);

  // functoin for operator end

  return (
    <>
      {userRole === "supervisor" ? (
        <div className="div-form">
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your UserName"
                value={username}
                required
                onChange={(e) => satusername(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your Email"
                value={email}
                required
                onChange={(e) => satEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Control
                type="text"
                placeholder=" Your Password"
                value={password}
                required
                onChange={(e) => satPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={(e) => handleSubmit(e)} type="submit">
              Update
            </Button>
          </Form>
        </div>
      ) : (
        <div className="div-form">
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="number"
                placeholder="pilih lantai"
                value={lantai}
                required
                onChange={(e) => setLantai(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Control
                type="number"
                placeholder="pilih ruang"
                value={Ruang}
                required
                onChange={(e) => setRuang(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button onClick={(e) => Submit(e)} type="submit">
              Update
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}
export default Edit;
