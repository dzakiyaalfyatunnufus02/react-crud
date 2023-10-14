import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import"../components/Add.css"

function EditCostumer() {
  const navigate = useNavigate();
  let history = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [payMethod, setPayMethod] = useState("");
  // const [id, setid] = useState("");
  const param = useParams(); 
  const options = [
    { value: "Cash", label: "Cash" },
    { value: "Kredit", label: "Kredit" },
    { value: "Debit", label: "Debit" },
  ];
   const getById = async () => {
    try {
      const respon = await axios.get(`  http://localhost:2222/costumers/${param.id}`)
      const resdata = respon.data;
      setName(resdata.name)
      setPhone(resdata.phone)
      setPayMethod(resdata.payMethod)
    } catch (error) {
      console.log(error);
    }
   }
 
  const handleProfile = () => {
    navigate(-1);
  };
  const Submit = async(e) => {
    e.preventDefault();
  
    const request = {
      name: name,
      phone: phone,
      payMethod: payMethod
    }

    try {
      const respon = await axios.put(`http://localhost:2222/costumers/${param.id}`, request)
      console.log(respon);
      console.log("update");
    } catch (error) {
      console.log(error);
      
    }


  
    history("/tableCostumer");
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
            <h3 style={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "300px",
            // paddingTop: "100px"
            // marginLeft:"300px",
            marginBottom:"50px"
          }}>EDIT COSTUMERS</h3>
          </div>
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
     
      <label htmlFor="payMethod">  <div style={{
        fontSize:"20px"
      }}>Pay Method :</div></label>
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
      <br></br>
      <br></br>
      <Link to="/tableCostumer">
        {/* <Button onClick={(e) => Submit(e)} type="submit">
          Edit
        </Button> */}
      
          <div id="edt-prfl">
              {" "}
              <Button onClick={(e) => Submit(e)} type="submit">
                EDIT
              </Button>
              <Button variant="secondary" onClick={handleProfile}>
                KEMBALI
              </Button>
            </div>
        </Link>
      </Form>
    </div>
  </>
  );
}
export default EditCostumer;
