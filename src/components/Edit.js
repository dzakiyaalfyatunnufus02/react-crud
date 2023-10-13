import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Add.css";
import axios from "axios";

function Edit() {
  // function for supervisor
  const navigate = useNavigate();
  const [username, satusername] = useState("");
  const [email, satEmail] = useState("");
  const [id, satId] = useState("");
  const [Id, setId] = useState("");
  const [password, satPassword] = useState("");
  const [role, satRole] = useState("");
  const userRole = localStorage.getItem("UserRole");
  let history = useNavigate();

  const param = useParams();
   const getById = async () => {
    try {
      const resdata = await axios.get(`http://localhost:2222/rooms/${param.id}`)
      const respon = resdata.data;
      setLantai(respon.lantai)
      setRuang(respon.ruang)
    } catch (error) {
      console.log(error);
    }
   }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const request = {
      username: username,
      email: email,
      password: password,
      role: "operator",
    };

    try {
      const respon = await axios.put(
        `http://localhost:2222/accounts/${param.id}`,
        request
      );
      console.log(respon.data);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }

    history("/table");
  };

  useEffect(() => {
    satusername(localStorage.getItem("username"));
    satEmail(localStorage.getItem("email"));
    satPassword(localStorage.getItem("password"));
    satRole(localStorage.getItem("role"));
    satId(localStorage.getItem("Id"));
  }, []);
  //  function for supervisor end

  // functioln for operator Start
  const [lantai, setLantai] = useState("");
  const [Ruang, setRuang] = useState("");

  const Submit = async (e) => {
    e.preventDefault();
    const Request = {
      lantai: lantai,
      ruang: Ruang,
    };

    try {
      const Respon = await axios.put(
        `http://localhost:2222/rooms/${param.id}`,
        Request
      );
      console.log(Respon.data);
      console.log("updated");
    } catch (error) {
      console.log(error);
    }

    history("/table");
  };
  const handleProfile = () => {
    navigate(-1);
  };
  useEffect(() => {
   getById();
  }, []);

  // functoin for operator end

  return (
    <>
      {userRole === "supervisor" ? (
        <div className="div-form" style={{
          paddingBottom: "100px",
          display: "block",
          gap: "100px",
          marginBottom: "100px",
          width: "500px",
        marginLeft:"400px"
          
        }}>
          <div id="id-edt" style={{
            paddingBotom: "100px",
            marginBlockEnd: "0px",
            backgroundColor: "lightgreen",
            borderRadius: "10px",
            width: "300px",
            marginBottom: "30px",



          }}>
            <h3>EDIT ROOMS</h3>
          </div>
                    <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your UserName"
                value={username}
                required
                onChange={(e) => satusername(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your Email"
                value={email}
                required
                onChange={(e) => satEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Control
                type="text"
                placeholder=" Your Password"
                value={password}
                required
                onChange={(e) => satPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
           
            <div id="edt-prfl">
              {" "}
              <Button onClick={(e) => Submit(e)} type="submit">
                EDIT
              </Button>
              <Button variant="secondary" onClick={handleProfile}>
                KEMBALI
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="div-form">
            <div>
            <h1 style={{
            paddingBotom: "100px",
            marginBlockEnd: "0px",
            backgroundColor: "lightgreen",
            borderRadius: "10px",
            width: "400px",
            marginBottom: "30px"

          }}>EDIT ROOMS</h1>
          </div>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Control
                type="number"
                placeholder="pilih lantai"
                value={lantai}
                required
                onChange={(e) => setLantai(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
          <Form className="d-grid gap-2" style={{ margin: "0.5rem" }}>
            <Form.Group className="mb-3" controlId="formAge">
              <Form.Control
                type="number"
                placeholder="pilih ruang"
                value={Ruang}
                required
                onChange={(e) => setRuang(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div id="edt-prfl">
              {" "}
              <Button onClick={(e) => Submit(e)} type="submit">
                EDIT
              </Button>
              <Button variant="secondary" onClick={handleProfile}>
                KEMBALI
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
export default Edit;
