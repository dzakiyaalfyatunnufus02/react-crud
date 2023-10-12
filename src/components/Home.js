import React from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Profile from "./Profile";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Home = () => {
  const navigate = useNavigate(); // Tambahkan useNavigate
  const userRole = localStorage.getItem("UserRole");
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
    // Ganti urutan perintah agar navigasi terjadi sebelum clear local storage
    navigate("/profile");
    };
  

  return (
    <div className="vid">
     

      <div className="home">
        {userRole === "supervisor" ? (
          <>

<Navbar bg="light" expand="lg" className="bg-body-tertiary" id="navabr">
<Container id="navbar">
  <Navbar.Brand href="/home">Sewa ruang</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/tableOrder">Approve List</Nav.Link>
      <Nav.Link href="/reportSewa">Report Sewa</Nav.Link>
      <Nav.Link href="/table">Table</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Something
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">
          Separated link
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav className="btn">
      <button onClick={handleLogout} className="btn btn-danger">
        LOGOUT
      </button>
    </Nav>
    <Link to={"/profile"}>
    <Nav>
      <button onClick={handleProfile} className="btn btn-secondary" variant="secondary">
        PROFILE
      </button>
    </Nav>
    </Link>
  </Navbar.Collapse>
</Container>
</Navbar>
          <h1>WELCOME SUPERVISOR</h1>
          </>

        ) : (
          <>
         <Navbar bg="light" expand="lg" className="bg-body-tertiary" id="navabr">
<Container id="navbar">
  <Navbar.Brand href="/home">Sewa ruang</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/tableOrder">Approve List</Nav.Link>
      <Nav.Link href="/tableCostumer">Costumer</Nav.Link>
      <Nav.Link href="/reportSewa">Report Sewa</Nav.Link>
      <Nav.Link href="/table">Table</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">
          Another action
        </NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">
          Something
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">
          Separated link
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav className="btn">
      <button onClick={handleLogout} className="btn btn-danger">
        LOGOUT
      </button>
    </Nav>
    <Nav>
      <button onClick={handleProfile} className="btn btn-secondary" variant="secondary" >
      PROFILE

      </button>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
          <h1> WELCOME OPERATOR</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
