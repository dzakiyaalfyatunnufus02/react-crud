import React, { useState, useEffect } from "react";
  import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditOrder() {
  let history = useNavigate();
  const [snack, setSnack] = useState(false); // Ganti default value snack menjadi false
  const [capacity, setCapacity] = useState("");
  const [lunch, setLunch] = useState(false); // Ganti default value lunch menjadi false
  const [room, setRoom] = useState("");
  const [booking, setBooking] = useState("");
  const [extratime, setExtratime] = useState(false); // Ganti default value extratime menjadi false
  const param = useParams();

  const getById = async () => {
    try {
      const respon = await axios.get(
        `http://localhost:2222/order/${param.id}`
      );
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

    const request = {
      snack: snack.toString(),
      capacity: capacity,
      lunch: lunch.toString(),
      room: room,
      booking: booking,
      extratime: extratime.toString(),
    };
    try {
      const respon = await axios.put(
        `http://localhost:2222/order/${param.id}`,
        request
      );
      const resdata = respon.data;
      console.log("editorder");
      setRoom(resdata.room);
      setSnack(resdata.snack);
      setCapacity(resdata.capacity);
      setLunch(resdata.lunch);
      setExtratime(resdata.extratime);
      setBooking(resdata.booking);
    } catch (error) {
      console.log(error);
    }

    history("/tableOrder");
  };

  useEffect(() => {
    getById();
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
          <label htmlFor="Snack">
            <div>Snack :</div>
          </label>
          <select
            name="snack"
            id="snack"
            value={snack}
            onChange={(e) => setSnack(e.target.value)}
          >
            <option value={false}>Tidak Ada</option>
            <option value={true}>Ada</option>
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
            <option value={false}>Tidak Ada</option>
            <option value={true}>Ada</option>

          </select>
          <br></br>
          <label htmlFor="extratime">
            <div>Extra Time :</div>
          </label>
          <select
            name="extratime"
            id="extratime"
            value={extratime}
            onChange={(e) => setExtratime(e.target.value)}
          >
            <option value={false}>Tidak Ada</option>
            <option value={true}>Ada</option>

          </select>
          <br />
          <Link to="/tableOrder">
        <Button onClick={(e) => Submit(e)} type="submit">
          
          Edit
        </Button>
        </Link>
        </Form>
      </div>
    </>
  );
}

export default EditOrder;
