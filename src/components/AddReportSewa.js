import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddReportSewa() {
  let history = useNavigate();
  const [datetime, setDatetime] = useState("");
  const [ruang, setRuang] = useState("");
  const [kapasitas, setKapasitas] = useState("");
  const [snack, setSnack] = useState("");
  const [extratime, setExtratime] = useState("");
  const [booking, setBooking] = useState("");
  

  const options = [
    { value: true, label: "True" },
    { value: false, label: "False" },
  ];

  const Submit = async (e) => {
    e.preventDefault();

    const ids = uuid();
    let uniqed = ids.slice(0, 8);
    const request = {
      id: uniqed,
      datetime: datetime,
      ruang: ruang,
      kapasitas: kapasitas,
      snack: snack,
      extratime: extratime.toString(),
      booking: booking,
    };
    try {
      const respon = await axios.post(
        "http://localhost:2222/reportSewa",
        request
      );
      console.log(respon);
      console.log("reportsewa");
    } catch (error) {
      console.log(error);
    }
    history("/reportSewa");
  };

  

  return (
    <>
      <div className="div-form">
        <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="Pilih Ruang "
              name="ruang"
              required
              onChange={(e) => setRuang(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="Pilih Kapasitas "
              name="kapasitas"
              required
              onChange={(e) => setKapasitas(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              placeholder="Snack"
              name="snack"
              required
              onChange={(e) => setSnack(e.target.value)}
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
              placeholder="Tanggal, Bulan, Tahun, Jam"
              name="datetime"
              required
              onChange={(e) => setDatetime(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <label htmlFor="Snack">
            {" "}
            <div>Extra Time :</div>
          </label>
          <select
            name="extratime"
            id="extratime"
            value={extratime}
            onChange={(e) => setExtratime(e.target.value === "true")}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value.toString()}>
                {option.label}
              </option>
            ))}
          </select>
          <br />
          <Link to="/reportSewa">
            <Button onClick={(e) => Submit(e)} type="submit">
              Create
            </Button>
          </Link>
        </Form>
      </div>
    </>
  );
}
export default AddReportSewa;