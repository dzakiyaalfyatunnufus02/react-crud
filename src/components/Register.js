import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuid } from "uuid";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ids = uuid();
    let Uniqed = ids.slice(0, 8);

    const request = {
      id: Uniqed,
      email: email,
      username: username,
      password: password,
      role: "supervisor"
    };
    if (username !== "" && email !== "" && password !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        Swal.fire({
          position: "top-center",
          icon: "info",
          title: "email tidak valid. Harap isi dengan benar!",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      try {
        const RESPON = await axios.post("http://localhost:2222/accounts", request);
        console.log(RESPON.data);
        

      // alert("Registrasi berhasil!");
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Register Berhasil",
        showConfirmButton: false,
        timer: 2500,
      });

        console.log("updated");
      } catch (error) {
        console.log(error);
      }
      navigate("/");
      
    } else {
      // alert("Harap isi semua kolom!");
      Swal.fire({
        position: "top-center",
        icon: "info",
        title: "harap isi semua kolom",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  

  return (
    <div className="body">
      <div className="mainContainer">
        <div className="box">
          <div className="title-box">
            <button className="login" to="/register">
              Register
            </button>
          </div>
          <br />
          <br />
          <div className="input-field" id="login">
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                className="input-text"
                placeholder="Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
              <input
                className="input-text"
                type="text"
                placeholder="Username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
              />

              <input
                className="input-text"
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              
             
              <div id="r">
                <center>
                  <button
                    type="submit"
                    id="r"
                    className="btn btn-color px-5 mb-5 w100"
                  >
                    Register
                  </button>
                </center>
              </div>
            </form>
            <center>
              <div>
                <div className="text-center mb-5 text-dark">
                already have an account?
                  <div></div>
                  <Link id="p" className="register" to="/">
                    Log In
                  </Link>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
