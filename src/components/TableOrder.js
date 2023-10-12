import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import "./AddOrder.css";
import { Button, Form, InputGroup, Pagination, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function TableOrder() {
  let history = useNavigate("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);
  const [order, setOrder] = useState([]);
  const npage = Math.ceil(order.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [search, setSearch] = useState("");
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const userRole = localStorage.getItem("UserRole");

  const RECORDS = order.slice(firstIndex, lastIndex);

  const getOrder = async () => {
    try {
      const respon = await axios.get("http://localhost:2222/order");
      const allOrder = respon.data;

      // Apply search filter only for supervisor role
      const filterOrder = allOrder.filter(
        (employee) =>
          employee.room?.toLowerCase().includes(search?.toLowerCase()) &&
          employee.role !== "supervisor"
      );

      setOrder(filterOrder);
      console.log(filterOrder);
    } catch (error) {
      console.log(error);
    }
  };

  const filterOrder = order.filter((employee) =>
    employee.room.toLowerCase().includes(search.toLowerCase())
  );
  const [orders, setOrders] = useState([]);
  const [Search, setSEARCH] = useState("");
  const Records = orders.slice(firstIndex, lastIndex);

  const getOperator = async () => {
    try {
      const Respon = await axios.get("http://localhost:2222/order");
      const allOrder = Respon.data;

      // Apply search filter only for operator role
      const filterOrder = allOrder.filter((order) =>
        order.room?.toLowerCase().includes(Search?.toLowerCase())
      );

      setOrders(filterOrder);
      console.log(filterOrder);
    } catch (error) {
      console.log(error);
    }
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
  const handleSubmit = (e) => {
    e.preventDefault();

    // alert("Login berhasil!");
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "approve berhasil",
      showConfirmButton: false,
      timer: 1500,
    });
    // console.log(storedAccounts);
    navigate("/Home");
  };

  const disabledButton = async (
    e,
    id,
    room,
    capacity,
    snack,
    lunch,
    extratime,
    booking
  ) => {
    e.preventDefault();
    const request = {
      room: room,
      capacity: capacity,
      snack: snack,
      lunch: lunch,
      extratime: extratime,
      booking: booking,
      approve: true,
    };
    try {
      const respon = await axios.put(
        `http://localhost:2222/order/${id}`,
        request
      );
      console.log(respon.data);
      getOrder();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "approve success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
  const handleProfile = () => {
    // Ganti urutan perintah agar navigasi terjadi sebelum clear local storage
    navigate("/profile");
  };
  const handleDelete = async (id) => {
    const RESPON = await axios.delete(` http://localhost:2222/order/${id}`);
    console.log(RESPON);
    console.log("deleted");
    getOperator();
    history("/tableOrder");
  };

  useEffect(() => {
    getOrder();
    getOperator();
  }, [search, Search]);

  return (
    <>
      <div className="home">
        {userRole === "supervisor" ? (
          <>
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
                    <button onClick={handleLogout} className="btn btn-danger">
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
              <h1> TABLE ORDERS</h1>
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
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={10}>10</option>
                  </select>
                </span>
              </div>

              <br />
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Capacity</th>
                    <th>Snack</th>
                    <th>Lunch</th>
                    <th>Extra Time</th>
                    <th>Booking</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterOrder && filterOrder.length > 0 ? (
                    RECORDS.map((item, index) => (
                      <tr key={index}>
                        <td>{item.room}</td>
                        <td>{item.capacity}</td>
                        <td>{item.snack === true ? "ada" : "tidak ada"}</td>
                        <td>{item.lunch === true ? "ada" : "tidak ada"}</td>
                        <td>{item.extratime === true ? "ada" : "tidak ada"}</td>
                        <td>{item.booking}</td>
                        <td>
                          <form action="" onSubmit={handleSubmit}>
                            {/* <Link  className="d-grid gap-2" to={"addOrder"}> */}
                            <button
                              type="submit"
                              id="Btn"
                              className="btn-edt"
                              disabled={item.approve ? true : false}
                              onClick={(e) =>
                                disabledButton(
                                  e,
                                  item.id,
                                  item.room,
                                  item.capacity,
                                  item.snack,
                                  item.lunch,
                                  item.extratime,
                                  item.booking
                                )
                              }
                            >
                              approve
                            </button>
                            {/* </Link> */}
                            <div id="r">
                              <center></center>
                            </div>
                          </form>
                          &nbsp;
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
            </div>
          </>
        ) : (
          <>
            <Navbar bg="light" expand="lg" className="bg-body-tertiary">
              <Container>
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
                    <button onClick={handleLogout} className="btn btn-danger">
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
              <h1>TABLE ORDERS</h1>
            </div>
            <div className="div-frgmnt" style={{ margin: "10rem" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="search"
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
                    <option value={3}>3</option>
                    <option value={6}>6</option>
                    <option value={10}>10</option>
                  </select>
                </span>
              </div>

              <br />
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Capacity</th>
                    <th>Snack</th>
                    <th>Lunch</th>
                    <th>Extra Time</th>
                    <th>Booking</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.length > 0 ? (
                    Records.map((item, index) => (
                      <tr key={index}>
                        <td>{item.room}</td>
                        <td>{item.capacity}</td>
                        <td>{item.snack == "true" ? "Ada" : "Tidak Ada"}</td>
                        <td>{item.lunch == "true" ? "Ada" : "Tidak Ada"}</td>
                        <td>
                          {item.extratime == "true" ? "Ada" : "Tidak Ada"}
                        </td>
                        <td>{item.booking}</td>
                        <td>
                          <Link to={`/editOrder/${item.id}`}>
                            <button className="btn-edt">EDIT</button>
                          </Link>
                          &nbsp;
                          <button
                            className="btn-dlt"
                            onClick={() => handleDelete(item.id)}
                          >
                            DELETE
                          </button>
                          &nbsp;
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
                    onClick={() => setCurrentPage(n)}
                  >
                    {n}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={nextPage} />
              </Pagination>
              <Link className="d-grid gap-2" to="/addOrder">
                <Button className="btn-lnk" size="lg">
                  Create
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TableOrder;
