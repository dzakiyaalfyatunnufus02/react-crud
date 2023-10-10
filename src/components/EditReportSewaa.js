import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditREportSewa() {
  let history = useNavigate();
  let navigate = useNavigate();
  const [datetime, setDatetime] = useState("");
  const [ruang, setRuang] = useState("");
  const [kapasitas, setKapasitas] = useState("");
  const [snack, setSnack] = useState("");
  const [extratime, setExtratime] = useState("");
  const [booking, setBooking] = useState("");
   const param = useParams();

  const getById = async () => {
    try {
      const respon = await axios.get(
        `http://localhost:2222/reportSewa/${param.id}`
      );
    const resdata = respon.data;
    setRuang(resdata.ruang);
    setDatetime(resdata.datetime);
    setKapasitas(resdata.kapasitas);
    setSnack(resdata.snack);
    setExtratime(resdata.extratime === "true");
    setBooking(resdata.booking);
    } catch (error) {
      console.log(error);
    }
  };
  const Submit = async(e) => {
    e.preventDefault();

    const request = {
      snack: snack,
      kapasitas: kapasitas,
      ruang: ruang,
      datetime: datetime,
      booking: booking,
      extratime: extratime.toString(),
    };
    try {
      const respon = await axios.put(
        ` http://localhost:2222/reportSewa/${param.id}`,
        request
      );
      console.log(respon);
      console.log("update");
    } catch (error) {
      console.log(error);
    }
    navigate("/reportSewa");

   
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
              placeholder="PIlih Ruang"
              value={ruang}
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
              placeholder="Pilih Kapasitas"
              value={kapasitas}
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
              placeholder="Your Booking"
              value={booking}
              name="booking"
              required
              onChange={(e) => setBooking(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Form>
        <label htmlFor="extratime">
            {" "}
            <div>Snack :</div>
          </label>
          <select
            name="snack"
            id="snack"
            value={snack}
            onChange={(e) => setSnack(e.target.value)}
          >
            <option value={false}> Tidak Ada</option>
            <option value={true}> Ada</option>

          </select>
          <br></br>
          <br></br>
          <label htmlFor="extratime">
            {" "}
            <div>Extra Time :</div>
          </label>
          <select
            name="extratime"
            id="extratime"
            value={extratime}
            onChange={(e) => setExtratime(e.target.value)}
          >
            <option value={false}> Tidak Ada</option>
            <option value={true}> Ada</option>

          </select>
          <br />
          <Link to="/reportSewa">
            <Button onClick={(e) => Submit(e)} type="submit">
              Edit
            </Button>
          </Link>
        </Form>
      </div>
    </>
  );
}

export default EditREportSewa;
