import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Order from "./database/Order";
import "./AddOrder.css"
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function Add() {
  let history = useNavigate();
  const [snack, setSnack] = useState("");
  const [capacity, setCapacity] = useState("");
  const [lunch, setLunch] = useState("");
  const [room, setRoom] = useState("");
  const [booking, setBooking] = useState("");
  const [extratime, setExtratime] = useState("");
  const [id, setid] = useState("");
  const [formData, setFormData] = useState({
    snack: "",
    capacity: "",
    lunch: "",
    room: "",
    booking: "",
    extratime: "",
  }); 
  const options = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  
  ];
  const Submit = (e) => {
    e.preventDefault();

    const ids = uuid();
    let Uniqed = ids.slice(0, 8);

    let d = snack,
      g = capacity,
      f = lunch,
      k = room,
      s = booking,
      l = extratime;

    Order.push({
      id: Uniqed,
      snack: d,
      capacity: g,
      lunch: f,
      room: k,
      booking: s,
      extratime: l,
    });
    console.log(Order);
    history("/tableOrder");

    //  function for operator And
  };
  useEffect(() => {
    setFormData({
      snack: localStorage.getItem("snack") || "",
      capacity: localStorage.getItem("capacity") || "",
      lunch: localStorage.getItem("lunch") || "",
      room: localStorage.getItem("room") || "",
      booking: localStorage.getItem("booking") || "",
      extratime: localStorage.getItem("extratime") || "",
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
              placeholder="Your Room"
              name="room"
              required
              onChange={(e) => setRoom(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="Your Booking"
              name="booking"
              required
              onChange={(e) => setBooking(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="Your Capacity"
              name="capacity"
              required
              onChange={(e) => setCapacity(e.target.value)}
            ></Form.Control>
          </Form.Group>
              
      <label htmlFor="Snack">  <div>Snack :</div></label>
        <select
          name="snack"
          id="snack"
          value={snack}
          onChange={(e) => setSnack(e.target.value)}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
      </select>
      <br></br>
      <label htmlFor="Snack">  <div>Lunch :</div></label>
        <select
          name="lunch"
          id="lunch"
          value={lunch}
          onChange={(e) => setLunch(e.target.value)}
        >
          <option value={true}> True</option>
          <option value={false}> False</option>
      </select>
      <br></br>
      <label htmlFor="Snack">  <div>Extra Time :</div></label>
        <select
          name="extratime"
          id="extratime"
          value={extratime}
          onChange={(e) => setExtratime(e.target.value)}
        >
          <option value={true}> True</option>
          <option value={false}> False</option>
      </select>
      <br/>
          <Link to="/tableOrder">
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
