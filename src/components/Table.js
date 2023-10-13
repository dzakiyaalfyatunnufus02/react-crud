import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, InputGroup, Pagination, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Table.css";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Swal from "sweetalert2";
import axios from "axios";

function Tabel() {
  let history = useNavigate();
  const navigate = useNavigate();
  const userRole = localStorage.getItem("UserRole");
  // function for supervisor START
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const [id, setId] = useState("");
  const [accounts, setAccounts] = useState([]);
  const npage = Math.ceil(accounts.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [rooms, setRooms] = useState([]);

  const records = accounts.slice(firstIndex, lastIndex);
  
  const getAccounts = async () => {
    try {
      const respon = await axios.get("http://localhost:2222/accounts");
      const allAccounts = respon.data;

      // Apply search filter only for supervisor role
      const filteredAccounts = allAccounts.filter(
        (employee) =>
          employee.username?.toLowerCase().includes(search?.toLowerCase()) &&
          employee.role !== "supervisor"
      );

      setAccounts(filteredAccounts);
      console.log(filteredAccounts);
    } catch (error) {
      console.log(error);
    }
  };

  // const records = filterAccounts.slice(firstIndex, lastIndex);

  const handleDelete = async (id) => {
    try {
      const respon = await axios.delete(`http://localhost:2222/accounts/${id}`);
      console.log(respon.data);
      console.log("deleted");
      getAccounts();
    } catch (error) {
      console.log(error);
    }
    history("/table");
  };

  function prePage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    history("/");

    Swal.fire({
      position: "top-middle",
      icon: "success",
      title: "LOGOUT Berhasil!!",
      showConfirmButton: false,
      timer: 2500,
    });
  };
  // function for supervisor END

  // function for operator Start
  const [currentRoom, setCurrentRoom] = useState(1);
  const [recordsPERPAGE, setRecordsPERPAGE] = useState(3);
  const npageE = Math.ceil(rooms.length / recordsPERPAGE);
  const number = [...Array(npageE + 1).keys()].slice(1);
  const [Search, setSEARCH] = useState("");
  const firstRoom = (currentRoom - 1) * recordsPERPAGE;
  const lastRoom = currentRoom * recordsPERPAGE;
  const RECORDS = rooms.slice(firstRoom, lastRoom);
  const getOperator = async () => {
    try {
      const Respon = await axios.get("http://localhost:2222/rooms");
      const allRooms = Respon.data;

      // Apply search filter only for operator role
      const filterRooms = allRooms.filter((room) =>
        room.lantai?.toLowerCase().includes(Search?.toLowerCase())
      );

      setRooms(filterRooms);
      console.log(filterRooms);
    } catch (error) {
      console.log(error);
    }
  };

 

  const delet = async (Id) => {
    try {
      const Respon = await axios.delete(`http://localhost:2222/rooms/${Id}`);
      console.log(Respon.data);
      console.log("deleted");
      getOperator();
    } catch (error) {
      console.log(error);
    }
  };
  function prePAGE() {
    if (currentRoom > 1) {
      setCurrentRoom(currentRoom - 1);
    }
  }
  function changeCPAGE(id) {
    setCurrentRoom(id);
  }
  function nextPAGE() {
    if (currentRoom < npageE) {
      setCurrentRoom(currentRoom + 1);
    }
  }
  const logout = () => {
    localStorage.clear();
    history("/");

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
  // function operator And

  useEffect(() => {
    getAccounts();
    getOperator();
  }, [search, Search]);

  return (
    <div className="home">
      {userRole === "supervisor" ? (
        <Fragment>
          <Navbar bg="light" expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/home">Sewa ruang</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/tableOrder">Approve List</Nav.Link>
                  <Nav.Link href="/reportSewa">Report Sewa</Nav.Link>
                  <Nav.Link href="/table">Table</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
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
                  <button
                    id="btn-profil"
                    onClick={handleLogout}
                    className="btn btn-danger"
                  >
                    LOGOUT
                  </button>
                </Nav>
                <Nav>
                  <button onClick={handleProfile} className="btn btn-secondary" variant="secondary">
                    PROFILE
                  </button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
            <h1>TABLE ROOMS</h1>
          </div>
          <div className="div-frgmnt" style={{ margin: "10rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "400px",
                  height: "40px",
                  fontSize: "15px",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              />
              <span>
                <select
                  value={recordsPerPage}
                  onChange={(e) =>
                    setCurrentPage(1) ||
                    setRecordsPerPage(Number(e.target.value))
                  }
                  style={{
                    width: "100px",
                    height: "40px",
                    fontSize: "15px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </span>
            </div>

            <br />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>password</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts && accounts.length > 0 ? (
                  records.map((item, index) => (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>
                      <td>{item.role}</td>
                      <td>
                        <Link to={`/edit/${item.id}`}>
                          <button
                            className="btn-edt"
                           
                          >
                            EDIT
                          </button>
                        </Link>
                        &nbsp;
                        <button
                          className="btn-dlt"
                          onClick={() => handleDelete(item.id)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Pagination className="pgntn">
              <Pagination.Prev onClick={prePage} />
              {numbers.map((n, i) => (
                <Pagination.Item
                  key={i}
                  active={currentPage === n}
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={nextPage} />
            </Pagination>

            <Link className="d-grid gap-2" to={"/create"}>
              <Button size="lg">Create</Button>
            </Link>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Navbar bg="light" expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/home">Sewa ruang</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/tableOrder">Approve List</Nav.Link>
                  <Nav.Link href="/costumer">costumer</Nav.Link>
                  <Nav.Link href="/reportSewa">Report Sewa</Nav.Link>
                  <Nav.Link href="/table">Table</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
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
                  <button onClick={logout} className="btn btn-danger">
                    LOGOUT
                  </button>
                </Nav>
                <Nav>
                  <button onClick={handleProfile} className="btn btn-secondary" variant="secondary">
                    PROFILE
                  </button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
            <h1>TABLE ROOMS</h1>
          </div>
          <div className="div-frgmnt" style={{ margin: "10rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="search by lantai"
                value={Search}
                onChange={(e) => setSEARCH(e.target.value)}
                style={{
                  width: "400px",
                  height: "40px",
                  fontSize: "15px",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              />
              <span>
                <select
                  value={recordsPERPAGE}
                  onChange={(e) =>
                    setCurrentRoom(1) ||
                    setRecordsPERPAGE(Number(e.target.value))
                  }
                  style={{
                    width: "100px",
                    height: "40px",
                    fontSize: "15px",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                </select>
              </span>
            </div>

            <br />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Lantai</th>
                  <th>Ruang</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms && rooms.length > 0 ? (
                  RECORDS.map((item, index) => (
                    <tr key={index}>
                      <td>{item.lantai}</td>
                      <td>{item.ruang}</td>

                      <td>
                        <Link to={`/edit/${item.id}`}>
                          <button
                            className="btn-edt"
                           
                          >
                            EDIT
                          </button>
                        </Link>
                        &nbsp;
                        <button
                          className="btn-dlt"
                          onClick={() => delet(item.id)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <Pagination className="pgntn">
              <Pagination.Prev onClick={prePAGE} />
              {number.map((n, i) => (
                <Pagination.Item
                  key={i}
                  active={currentRoom === n}
                  onClick={() => changeCPAGE(n)}
                >
                  {n}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={nextPAGE} />
            </Pagination>

            <Link className="d-grid gap-2" to="/create">
              <Button className="btn-lnk" size="lg">Create</Button>
            </Link>
          </div>
        </Fragment>
      )}
    </div>
  );
}
export default Tabel;
