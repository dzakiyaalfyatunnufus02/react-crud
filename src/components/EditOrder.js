
import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Order from "./database/Order";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function EditOrder() {
  let history = useNavigate();
  const [snack, setSnack] = useState("");
  const [capacity, setCapacity] = useState("");
  const [lunch, setLunch] = useState("");
  const [room, setRoom] = useState("");
  const [booking, setBooking] = useState("");
  const [extratime, setExtratime] = useState("");
  const [id, setid] = useState("");
 
  var INDEX = Order.map(function (e) {
    return e.id;
  }).indexOf(id);

  const Submit = (e) => {
    e.preventDefault();
    let b = Order[INDEX];
    b.room = room;
    b.snack = snack;
    b.capacity = capacity;
    b.lunch = lunch;
    b.extratime = extratime;
    b.booking = booking;

    localStorage.setItem("room", room);
    localStorage.setItem("snack", snack);
    localStorage.setItem("capacity", capacity);
    localStorage.setItem("lunch", lunch);
    localStorage.setItem("extratime", extratime);
    localStorage.setItem("booking", booking);

    console.log(b);


  
    history("/tableOrder");
  };
  useEffect(() => {
    setRoom(localStorage.getItem("room"));
    setSnack(localStorage.getItem("snack"));
    setCapacity(localStorage.getItem("capacity"));
    setLunch(localStorage.getItem("lunch"));
    setExtratime(localStorage.getItem("extratime"));
    setBooking(localStorage.getItem("booking"));
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
            value={room}
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
            placeholder="Your Capacity"
            value={capacity}
            name="capacity"
            required
            onChange={(e) => setCapacity(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Control
            type="text"
            placeholder="Your Booking"
            value={booking}
            name="booking"
            required
            onChange={(e) => setBooking(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </Form>
      
      <Form>
     
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
export default EditOrder;
