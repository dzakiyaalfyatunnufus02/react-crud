import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Swal from "sweetalert2";
import axios from "axios";
import "../components/Profile.css"; // Import file CSS untuk styling

const Profile = () => {
  const history = useNavigate("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [Email, setEMAIL] = useState("");
  const [UserName, setUSERNAME] = useState("");
  const [AvatarURL, setAVATARURL] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setPassword(account.password);
    } catch (error) {
      console.log(error);
    }
  };
  const putProfile = async () => {
    const request = {
      username: UserName,
      email: Email,
      role: role,
      avatarUrl: AvatarURL,
      password: password,
    };
    // const handeLogout = () => {
    //   localStorage.clear();
    //   history("/");

    //   Swal.fire({
    //     position: "top-middle",
    //     icon: "success",
    //     title: "LOGOUT Berhasil!!",
    //     showConfirmButton: false,
    //     timer: 2500,
    //   });
    // };
    try {
      const respon = await axios.put(
        `http://localhost:2222/accounts/${localStorage.getItem("id")}`,
        request
      );
      console.log(respon);
      handleClose();
      getProfile();
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
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
    setEMAIL(email);
    setAVATARURL(avatarUrl);
    setUSERNAME(username);
  }, [email, username, role, avatarUrl]);

  return (
    <div className="profile">
      <div className="profile-container">
        <Dropdown as={ButtonGroup}>
          <Button variant="success" className="split">Split Button</Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleProfile} href="#/action-1">
              Kembali
            </Dropdown.Item>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* <Button variant="secondary" onClick={handleProfile}>
          Kembali
        </Button> */}
      </div>
      <div id="id-h1">
        <h1
        className="class-h1"
        style={{
          // backgroundColor: "lightgreen",
          width:"320px",
          borderRadius: "15px"
        }}>PAGE PROFILE</h1>
      </div>
      {/* <div style={{
        backgroundColor: "lightgreen",
        width:"50px",
        height:"100px",
        marginRight: "100px"
      }}></div> */}
      <div className="profile-info">
        <img
          src={avatarUrl} // Gantilah dengan path atau URL foto pengguna
          alt="User Avatar"
          className="avatar"
          type="image"
        />
        <br></br>
        <br></br>
        <br></br>
        <div class="panel-body"
        style={{
     }}
        >
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
                  marginBlock:""
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
            </div>
          </div>
        </div>
        
        <div id="nav">
          <Button
            className="nm-nv"
            variant="success"
            active
            onClick={handleShow}
          >
            EDIT
          </Button>

          <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
              <Modal.Title>Edit Profil</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal">
              <div style={{ backgroundColor: ""}}>
              <div class="panel-body-EDT"
              style={{
                
              }}
              >
                <div class="form-group-edt">
                  <label
                    id="a"
                    className="t"
                    class="col-sm-2 control-label"
                    style={{
                      transform: "translate(-200%, -50%)",
                      marginBottom: "0px",
                      paddingBottom: "0",
                      fontFamily: "dashed"

                    }}
                  >
                    IMAGE   :
                  </label>
                  <br></br>
                  <div class="col-sm-10">
                    <input
                      style={{
                        width: "400px",
                        height: "60px",
                        borderRadius: "20px",
                      }}
                      value={AvatarURL}
                      type="text"
                      class="form-control"
                      onChange={(e) => setAVATARURL(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group-edt">
                  <label
                    id="b"
                    className="t"
                    class="col-sm-2 control-label"
                    style={{
                      transform: "translate(-200%, -50%)",
                      fontFamily: "dashed"
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
                      value={UserName}
                      type="text"
                      class="form-control"
                      onChange={(e) => setUSERNAME(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group-edt">
                  <label
                    id="c"
                    class="col-sm-2 control-label"
                    style={{
                      transform: "translate(-200%, -10%)",
                      marginLeft:"210px",
                      fontFamily: "dashed"
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
                      value={Email}
                      type="text"
                      class="form-control"
                      onChange={(e) => setEMAIL(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  putProfile();
                }}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
