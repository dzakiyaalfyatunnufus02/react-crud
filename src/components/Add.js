import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { Await, Link, useNavigate } from "react-router-dom";
import "./Add.css";
import axios from "axios";

function Add() {
  // function for Supervisor Start
  const navigate = useNavigate();
  let history = useNavigate();
  const [username, satusername] = useState("");
  const [email, satEmail] = useState("");
  const [password, satPassword] = useState("");
  const userRole = localStorage.getItem("UserRole");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqued = ids.slice(0, 8);

    const request = {
      id: uniqued,
      username: username,
      email: email,
      password: password,
      role: "operator",
    };

    try {
      const respon = await axios.post(
        "http://localhost:2222/accounts",
        request
      );
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

  const Submit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let Uniqed = ids.slice(0, 8);

    const Request = {
      id: Uniqed,
      lantai: lantai,
      ruang: ruang,
    };
    try {
      const Respon = await axios.post("http://localhost:2222/rooms", Request);
      console.log(Respon);
      console.log("added");
    } catch (error) {
      console.log(error);
    }
    history("/table");

    //  function for operator And
  };
  const handleProfile = () => {
    navigate(-1);
  };
  return (
    <>
      {userRole === "supervisor" ? (
        <div
          className="div-form"
          style={{
            paddingBottom: "100px",
            display: "block",
            gap: "100px",
            marginBottom: "100px",
          }}
        >
          <div
            style={{
              width: "500px",
              marginLeft: "130px",
            }}
          >
            <h3
              style={{
                marginLeft: "400px",
                paddingBotom: "100px",
                marginBlockEnd: "0px",
                backgroundColor: "white",
                borderRadius: "10px",
                width: "250px",
                marginBottom: "50px",
              }}
            >
              CREAT ROOMS
            </h3>
          </div>
          <Form
            className="d-grid gap-2"
            style={{ margin: "0.5rem", width: "490px", marginLeft: "400px" }}
          >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your User Name"
                required
                onChange={(e) => satusername(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form
            className="d-grid gap-2"
            style={{ margin: "0.5rem", width: "500px", marginLeft: "400px" }}
          >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your Password"
                required
                onChange={(e) => satPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form
            className="d-grid gap-2"
            style={{ margin: "0.5rem", width: "500px", marginLeft: "400px" }}
          >
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
        <div
          className="div-form"
          style={{
            paddingBottom: "100px",
            display: "block",
            gap: "100px",
            marginBottom: "100px",
          }}
        >
          <div  style={{
              width: "500px",
              marginLeft: "130px",
            }}>
          
            <h3 style={{
                marginLeft: "400px",
                paddingBotom: "100px",
                marginBlockEnd: "0px",
                backgroundColor: "white",
                borderRadius: "10px",
                width: "250px",
                marginBottom: "50px",
              }}>EDIT ROOMS </h3>
          </div>
          <Form className="KMKMK" style={{ margin: "0.5rem", widht:"0px",marginLeft:"400px" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your Lantai"
                required
                onChange={(e) => setLantai(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="KMKMK" style={{ margin: "0.5rem", widht:"500px",marginLeft:"400px" }}>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Control
                type="text"
                placeholder=" Your Ruang"
                required
                onChange={(e) => setRuang(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div id="edt-prfl">
              {" "}
              <Button onClick={(e) => Submit(e)} type="submit">
                Submit
              </Button>
              <Button variant="secondary" onClick={handleProfile}>
                KEMBALI
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
export default Add;
