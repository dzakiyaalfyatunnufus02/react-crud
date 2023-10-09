import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import TableCostumers from "./TableCostumer";
import RuangTunggu from "./RuangTunggu";
import "./AddOrder.css";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Add() {
  let history = useNavigate();
  const [snack, setSnack] = useState("");
  const [capacity, setCapacity] = useState("");
  const [lunch, setLunch] = useState("");
  const [room, setRoom] = useState("");
  const [booking, setBooking] = useState("");
  const [extratime, setExtratime] = useState("");
  const options = [
    { value: true, label: "true" },
    { value: false, label: "false" },
  ];
  const Submit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqed = ids.slice(0, 8);

    const request = {
      id: uniqed,
      snack: snack.toString ,
      capacity: capacity,
      lunch: lunch.toString() ,
      room: room,
      booking: booking,
      extratime: extratime.toString() ,
    };

    try {
      const respon = await axios.post(" http://localhost:2222/order", request);
      console.log(respon);
      console.log("ordered");
    } catch (error) {
      console.log(error);
    }

    history("/ruangTunggu");

    //  function for operator And
  };
 

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

          <label htmlFor="Snack">
            {" "}
            <div>Snack :</div>
          </label>
        {/* ... */}
<select
  name="snack"
  id="snack"
  onChange={(e) => setSnack(e.target.value)}
>
  {options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>
<br></br>
{/* ... */}
<label htmlFor="lunch">
            {" "}
            <div>Lunch :</div>
          </label>
<select
  name="lunch"
  id="lunch"
  onChange={(e) => setLunch(e.target.value)}
>
  {options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>
<br></br>
{/* ... */}
<label htmlFor="extratime">
            {" "}
            <div>Extratime :</div>
          </label>
<select
  name="extratime"
  id="extratime"
  onChange={(e) => setExtratime(e.target.value)}
>
  {options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>
{/* ... */}

          <br />
          <Link to="/tableCostumer">
            <Button onClick={(e) => Submit(e)} type="submit">
              Create
            </Button>
          </Link>
        </Form>
      </div>
    </>
  );
}
export default Add;
