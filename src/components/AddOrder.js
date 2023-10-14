import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Add() {
  let history = useNavigate();
  const navigate = useNavigate();
  const [snack, setSnack] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [lunch, setLunch] = useState(false);
  const [room, setRoom] = useState("");
  const [booking, setBooking] = useState("");
  const [extratime, setExtratime] = useState(false);
  const param = useParams();

  const options = [
    { value: true, label: "true" },
    { value: false, label: "false" },
  ];

  const getById = async () => {
    try {
      const respon = await axios.get(`http://localhost:2222/order/${param.id}`);
      const resdata = respon.data;
      setRoom(resdata.room);
      setSnack(resdata.snack);
      setCapacity(resdata.capacity);
      setLunch(resdata.lunch);
      setExtratime(resdata.extratime);
      setBooking(resdata.booking);
    } catch (error) {
      console.log(error);
    }
  };

  const Submit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqed = ids.slice(0, 8);

    const request = {
      id: uniqed,
      snack: snack.toString(),
      capacity: capacity,
      lunch: lunch.toString(),
      room: room,
      booking: booking,
      extratime: extratime.toString(),
    };

    try {
      const respon = await axios.post("http://localhost:2222/order", request);
      console.log(respon);
      const resdata = respon.data;
      setRoom(resdata.room);
      setSnack(resdata.snack);
      setCapacity(resdata.capacity);
      setLunch(resdata.lunch);
      setExtratime(resdata.extratime);
      setBooking(resdata.booking);
    } catch (error) {
      console.log(error);
    }

    history("/ruangTunggu");
  };
  const handleProfile = () => {
    navigate(-1);
  };
  useEffect(() => {
    getById();
  }, []);

  return (
    <>
      <div className="div-form" style={{
        width: "500px",
        marginLeft:"400px"
      }}>
      <div>
            <h4 style={{
                marginLeft: "150px",
                paddingBotom: "100px",
                marginBlockEnd: "0px",
                backgroundColor: "white",
                borderRadius: "10px",
                width: "230px",
                marginBottom: "50px",
          }}>CREAT ORDERS</h4>
          </div>
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

        <label htmlFor="Snack">
          <div>Snack :</div>
        </label>
        <select
          name="snack"
          id="snack"
          value={snack}
          onChange={(e) => setSnack(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br></br>

        <label htmlFor="lunch">
          <div>Lunch :</div>
        </label>
        <select
          name="lunch"
          id="lunch"
          value={lunch}
          onChange={(e) => setLunch(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br></br>

        <label htmlFor="extratime">
          <div>Extratime :</div>
        </label>
        <select
          name="extratime"
          id="extratime"
          value={extratime}
          onChange={(e) => setExtratime(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <br />
        <br></br>
        <div id="edt-prfl">
              {" "}
              <Link to="/tableCostumer">
          <Button onClick={(e) => Submit(e)}>Create</Button>
        </Link>
              <Button variant="secondary" onClick={handleProfile}>
                KEMBALI
              </Button>
            </div>
        
        {/* ... (Closing tags) */}
      </div>
    </>
  );
}

export default Add;
