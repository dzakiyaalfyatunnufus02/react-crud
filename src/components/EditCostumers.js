import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Costumers from "./database/Costumers";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function EditCostumer() {
  let history = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [id, setid] = useState("");
 
  const options = [
    { value: "Cash", label: "Cash" },
    { value: "Kredit", label: "Kredit" },
    { value: "Debit", label: "Debit" },
  ];
 
  var INDEX = Costumers.map(function (e) {
    return e.id;
  }).indexOf(id);
  const Submit = (e) => {
    e.preventDefault();
    let b = Costumers[INDEX];
    b.name = name;
    b.phone = phone;
    b.payMethod = payMethod;

    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("payMethod", payMethod);


  
    history("/tableCostumer");
  };
  useEffect(() => {
    setName(localStorage.getItem("name"));
    setPhone(localStorage.getItem("phone"));
    setPayMethod(localStorage.getItem("payMethod"));
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
            value={name}
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
            value={phone}
            name="phone"
            required
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      
      <Form>
     
      <label htmlFor="payMethod">  <div>payMethod :</div></label>
        <select
          name="payMethod"
          id="payMethod"
          value={payMethod}
          onChange={(e) => setPayMethod(e.target.value)}
        >
          {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <br/>
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
export default EditCostumer;
