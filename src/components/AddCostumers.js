import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
  let history = useNavigate();
  const navigate = useNavigate();
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
  const Submit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let Uniqed = ids.slice(0, 8);

    const request = {
      id: Uniqed,
      name: name,
      phone: phone,
      payMethod: payMethod,
    };

    try {
      const respon = await axios.post(
        "http://localhost:2222/costumers",
        request
      );
      console.log(respon);
      console.log("costumered");
    } catch (error) {
      console.log(error);
    }
    history("/tableCostumer");

    //  function for operator And
  };
  const handleProfile = () => {
    navigate(-1);
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
      <div className="div-form" style={{
        width: "500px",
        marginLeft:"400px"
      }}>
      <div style={{
              width: "500px",
              marginLeft: "130px",
            }}>
            <h4 style={{
            paddingBotom: "100px",
            marginBlockEnd: "0px",
            backgroundColor: "white",
            borderRadius: "10px",
            width: "300px",
            marginBottom:"50px"

          }}>CREATE COSTUMER</h4>
          </div>
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
            <div >PAYMETHOD :</div>
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
          <div id="edt-prfl">
            {" "}
            <Link to="/tableCostumer">
              <Button onClick={(e) => Submit(e)} type="submit">
                Update
              </Button>
            </Link>
            <Button variant="secondary" onClick={handleProfile}>
              KEMBALI
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
export default Add;
