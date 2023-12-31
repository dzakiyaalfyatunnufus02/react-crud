import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [baru, setBaru] = useState([]);

  const navigate = useNavigate();
  const getAccounts = async () => {
    try {
      const Respon = await axios.get("http://localhost:2222/accounts");
      const allAccounts = Respon.data;

      const filteredAccounts = allAccounts.filter(
        (account) =>
          account.username?.toLowerCase().includes() &&
          account.role !== "supervisor"
      );
      setBaru(filteredAccounts);
      console.log(filteredAccounts);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.get("http://localhost:2222/accounts");
      if (formData.username !== "" && formData.password !== "") {
        const obj = data.data;
        const existingData = obj.find(
          (data) =>
            data.username === formData.username &&
            data.password === formData.password
        );

        if (existingData) {
          // alert("Login berhasil!");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "login berhasil",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("UserRole", existingData.role);
          localStorage.setItem("id", existingData.id);
          // console.log(storedAccounts);
          navigate("/home");
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    getAccounts();
  }, []);
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
