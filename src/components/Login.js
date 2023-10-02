import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import './Login.css'
import Accounts from "./database/Accounts";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([
    {
      id: 0,
      username: "yourname",
      password: "k",
      role: "supervisor",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username !== "" && formData.password !== "") {
      const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

      const existingAccount = Accounts.find(
        (account) =>
          account.username === formData.username &&
          account.password === formData.password
      );

      if (existingAccount) {
        // alert("Login berhasil!");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "login berhasil",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("UserRole", existingAccount.role);
        // console.log(storedAccounts);
        navigate("/Home");
      } else {
        // alert("Username atau password salah!");
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "user name atau pasword salah",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="body">
      <div className="mainContainer">
        <div className="box">
          <div className="title-box">
            <button className="register">Log in</button>
          </div>
          <br />
          <br />

          <div>
            <form
              action=""
              onSubmit={handleSubmit}
              className="input-field"
              id="login"
            >
              <input
                className="input-text"
                type="text"
                placeholder="User Name"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                className="input-text"
                type="password"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />

              <input type="checkbox" id="log-checkbox" />
              <label htmlFor="log-checkbox">Remember Password</label>
              <div id="r">
                <center>
                  <button type="submit" id="r" className="r">
                    Log In
                  </button>
                </center>
              </div>
            </form>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <center>
              <div className="p">
                Not a member? <div></div>
                <Link id="p" className="register" to="/register">
                  Sign Up
                </Link>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
