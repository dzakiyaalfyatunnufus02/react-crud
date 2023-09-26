import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role : "supervisor",
  });
  const navigate = useNavigate();
  const accounts = [
    {
      id: 0,
      email: "youremail@gmail.com",
      username: "yourname",
      password: "yourpassword",
      role : "supervisor",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.username !== "" &&
      formData.email !== "" &&
      formData.password !== ""
    ) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        Swal.fire({
          position: 'top-center',
          icon: 'info',
      title: 'email tidak valid. Harap isi dengan benar!',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }

      const newAccount = {
        id: accounts.length,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        role : formData.role,

      };

      // Menambahkan akun baru ke array accounts
      accounts.push(newAccount);

      // Menyimpan array accounts di localStorage
      localStorage.setItem("accounts", JSON.stringify(accounts));

      // alert("Registrasi berhasil!");
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Register Berhasil',
        showConfirmButton: false,
        timer: 2500
      })
      console.log(accounts);

      navigate("/");

      setFormData({
        username: "",
        email: "",
        password: "",
        role : "supervisor",
      });
    } else {
      // alert("Harap isi semua kolom!");
      Swal.fire({
        position: 'top-center',
        icon: 'info',
        title: 'harap isi semua kolom',
        showConfirmButton: false,
        timer: 1500
      })
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
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-text"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleChange
              }
              name="email"
            />
            <input
              className="input-text"
              type="text"
              placeholder="Username"
              id="username"
              value={formData.username}
              onChange={handleChange
            
              }
              name="username"
            />
            
            <input
              className="input-text"
              type="password"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={handleChange
              }
              name="password"
            />
            <label htmlFor="role">Role:</label>
            <select name="role" id="role" value={formData.role} onChange={handleChange}>
              <option value="supervisor">Supervisor</option>
              <option value="operator">Operator</option>
            </select>
            <br />
            <br />
            <div id="r">
              <center>
                <button type="submit" id="r" className="btn btn-color px-5 mb-5 w100">
                  Register
                </button>
              </center>
            </div>
          </form>
          <br />
          <center>
            <div>
              <div className="text-center mb-5 text-dark">
                Sudah punya akun?
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

