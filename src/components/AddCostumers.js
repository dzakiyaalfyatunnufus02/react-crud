import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Costumers from "./database/Costumers";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Add() {
  let history = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState("Cash");
  const [id, setid] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    payMethod: "",
  });
  const options = [
    { value: "Cash", label: "Cash" },
    { value: "Kredit", label: "Kredit" },
    { value: "Debit", label: "Debit" },
  ];
  const Submit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let Uniqed = ids.slice(0, 8);

    let d = name,
      g = phone,
      f = payMethod;

    Costumers.push({
      id: Uniqed,
      name: d,
      phone: g,
      payMethod: f,
    });
    console.log(Costumers);
    history("/tableCostumer");

    //  function for operator And
  };
  useEffect(() => {
    setFormData({
      name: localStorage.getItem("name") || "",
      phone: localStorage.getItem("phone") || "",
      payMethod: localStorage.getItem("payMethod") || "",
    });
    setid(localStorage.getItem("id"));
  }, []);

  return (
    <>
      <div className="div-form">
        <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="Your Name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="number"
              placeholder="Your Phone"
              name="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <label htmlFor="payMethod">
            {" "}
            <div>payMethod :</div>
          </label>
          <select
            name="payMethod"
            id="payMethod"
            onChange={(e) => setPayMethod(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <br />
          <Link to="/tableCostumer">
            <Button onClick={(e) => Submit(e)} type="submit">
              Update
            </Button>
          </Link>
        </Form>
      </div>
    </>
  );
}
export default Add;
