import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { Await, Link, useNavigate } from "react-router-dom";
import "./Add.css";
import axios from "axios";

function Add() {
  // function for Supervisor Start
  const [username, satusername] = useState("");
  const [email, satEmail] = useState("");
  const [password, satPassword] = useState("");
  const userRole = localStorage.getItem("UserRole");

  let history = useNavigate();

  const handleSubmit =  async(e) => {
    e.preventDefault();
    
    const ids = uuid();
    let uniqued = ids.slice(0, 8);

    const request = {
      id: uniqued,
      username: username,
      email: email,
      password: password,
      role:"operator"
    }

    try {
      const respon = await axios.post("http://localhost:2222/accounts", request)
      console.log(respon);
      console.log("added");
    } catch (error) {
      console.log(error);
    }

    history("/table");
    // function for supervisor end
  };
  //  function for Operator Start
  const [lantai, setLantai] = useState("");
  const [ruang, setRuang] = useState("");
  
  const Submit = async(e) => {
    e.preventDefault();

    const ids = uuid();
    let Uniqed = ids.slice(0, 8);

    const Request = {
      id: Uniqed,
      lantai: lantai,
      ruang: ruang

    }
    try {
      const Respon = await axios.post("http://localhost:2222/rooms", Request)
      console.log(Respon);
      console.log("added");
    } catch (error) {
      console.log(error);
      
    }
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
