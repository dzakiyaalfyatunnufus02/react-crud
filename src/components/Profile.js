import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import { v4 as uuid } from "uuid";
import "../components/Profile.css"; // Import file CSS untuk styling

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [role, setRole] = useState("");

  const getProfile = async () => {
    try {
      const respon = await axios.get(
        `http://localhost:2222/accounts/${localStorage.getItem("id")}`
      );
      const account = respon.data;
      setAvatarUrl(account.avatarUrl);
      setEmail(account.email);
      setRole(account.role);
      setUsername(account.username);
    } catch (error) {
      console.log(error);
    }
  };
  const putProfile = async () => {
 
   
    const request = {
       username: username,
       email: email,
       role: role,
       avatarUrl: avatarUrl
    }
    try {
        const respon = await axios.put(`http://localhost:2222/accounts/${localStorage.getItem("id")}`,request)
        console.log(respon);
        const resdata = respon.data;
        setAvatarUrl(resdata.avatarUrl);
      setEmail(resdata.email);
      setRole(resdata.role);
      setUsername(resdata.username);
    } catch (error) {
        console.log(error);
    }
  }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/table");

    Swal.fire({
      position: "top-middle",
      icon: "success",
      title: "LOGOUT Berhasil!!",
      showConfirmButton: false,
      timer: 2500,
    });
  };
  const handleProfile = () => {
    navigate(-1);
  };
  useEffect(() => {
    getProfile();
  }, [email, username, role, avatarUrl]);

  return (
    <div className="profile">
      <div className="profile-container">
        <Button variant="danger" onClick={handleProfile}>
          KEMBALI
        </Button>
      </div>

      <div className="profile-info">
        <img
          src="https://scontent.fcgk29-1.fna.fbcdn.net/v/t39.30808-6/293055985_547436953829463_6601347277633412431_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1b51e3&_nc_ohc=JFqtQIaqoqcAX821NBm&_nc_ht=scontent.fcgk29-1.fna&oh=00_AfCs026AubLh7pMvZWovIVDOkvo2PNEtzQpErHeWTH_lGQ&oe=6529FD87" // Gantilah dengan path atau URL foto pengguna
          alt="User Avatar"
          className="avatar"
        />
        <br></br>
        <br></br>
        <br></br>
        <div class="panel-body">
          <div class="form-group">
            <label
            id="t"
              className="t"
              class="col-sm-2 control-label"
              style={{
                transform: "translate(-200%, -50%)",
              }}
            >
              USERNAME:
            </label>
            <br></br>
            <div class="col-sm-10">
              <input
                style={{
                  width: "400px",
                  height: "60px",
                  borderRadius: "20px",
                }}
                value={username}
                type="text"
                class="form-control"
                onChange={(e) => setUsername(e.target.value)}

              />
            </div>
          </div>
          <div class="form-group">
            <label
            id="f"
              class="col-sm-2 control-label"
              style={{
                transform: "translate(-200%, -10%)",
              }}
            >
              EMAIL:
            </label>
            <br></br>

            <div class="col-sm-10">
              <input
                style={{
                  width: "400px",
                  height: "60px",
                  borderRadius: "20px",
                }}
                value={email}
                type="text"
                class="form-control"
                onChange={(e) => setEmail(e.target.value)}

              />
            </div>
          </div>
          <div class="form-group">
            <label
            id="y"
              class="col-sm-2 control-label"
              style={{
                transform: "translate(-200%, -10%)",
              }}
            >
              ROLE:
            </label>
            <br></br>

            <div class="col-sm-10">
              <input
                style={{
                  width: "400px",
                  height: "60px",
                  borderRadius: "20px",
                }}
                value={role}
                type="text"
                class="form-control"
                onChange={(e) => setRole(e.target.value)}

              />
              <br></br>
              <div id="nav">
               <Nav>
      <button onClick={handleLogout} className="btn btn-danger">
        LOGOUT
      </button>
    </Nav>
    <br></br>
    <Nav>
      <button className="btn btn-danger" onClick={putProfile}>
        EDIT
      </button>
    </Nav>
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
