import React, { Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import Order from "./database/Order";
import "./AddOrder.css"
import EditOrder from "./EditOrder";
import { Button, Form, InputGroup, Pagination, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function TableOrder() {
  let history = useNavigate("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);
  const npage = Math.ceil(Order.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [search, setSearch] = useState("");
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const [id, setId] = useState("");
  const userRole = localStorage.getItem("UserRole");

  const [disabledItem, setDisalbedItem] = useState({});

  const [formData, setFormData] = useState({
    room: "",
    capacity: "",
    snack: "",
    lunch: "",
    extratime: "",
    booking: "",
  });

  // const onClick = () => console.log("onClick");
  // const onClick2 = debounce(onClick, 300)

  const handleApprov = (
    id,
    room,
    capacity,
    snack,
    lunch,
    extratime,
    booking
  ) => {
    localStorage.setItem("room", room);
    localStorage.setItem("capacity", capacity);
    localStorage.setItem("snack", snack);
    localStorage.setItem("lunch", lunch);
    localStorage.setItem("extratime", extratime);
    localStorage.setItem("booking", booking);
    localStorage.setItem("id", id);
  };

  const filterOrder = Order.filter((employee) =>
    employee.room.toLowerCase().includes(search.toLowerCase())
  );
  const records = filterOrder.slice(firstIndex, lastIndex);

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

    if (
      formData.room !== "" &&
      formData.capacity !== "" &&
      formData.snack !== "" &&
      formData.lunch !== "" &&
      formData.extratime !== "" &&
      formData.booking !== ""
    ) {
      const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

      const existingOrder = Order.find(
        (order) =>
          order.room === formData.room &&
          order.capacity === formData.capacity &&
          order.snack === formData.snack &&
          order.lunch === formData.lunch &&
          order.extratime === formData.extratime &&
          order.booking === formData.booking
      );
      if (existingOrder) {
        // alert("Login berhasil!");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "approve berhasil",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.setItem("UserRole", existingOrder.role);
        // console.log(storedAccounts);
        navigate("/Home");
      }
    }
  };

  const disabledButton = (index) => {
    setDisalbedItem((prev) => ({ ...prev, [index]: true }));
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "approve success",
      showConfirmButton: false,
      timer: 1500,
    });
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleEdit = (id, room, capacity, snack, lunch, extratime, booking) => {
    localStorage.setItem("room", room);
    localStorage.setItem("capacity", capacity);
    localStorage.setItem("snack", snack);
    localStorage.setItem("lunch", lunch);
    localStorage.setItem("extratime", extratime);
    localStorage.setItem("booking", booking);
    localStorage.setItem("id", id);
    history("/editOrder");
  };
  const handleDelete = (id) => {
    var index = Order.findIndex((e) => e.id === id);
    if (index !== -1) {
      Order.splice(index, 1);
      history("/tableOrder");
    }
  };

  return (
    <>
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
                    <Nav.Link href="/tableOrder">Table Order</Nav.Link>
                    <Nav.Link href="/tableCostumer">Costumer</Nav.Link>
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
                  <Nav>
                    <button onClick={handleLogout} className="btn btn-danger">
                      LOGOUT
                    </button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

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
                    records.map((item, index) => (
                      <tr key={index}>
                        <td>{item.room}</td>
                        <td>{item.capacity}</td>
                        <td>{item.snack === true ? "ada" : "tidak ada"}</td>
                        <td>{item.lunch === true ? "ada" : "tidak ada"}</td>
                        <td>{item.extratime === true ? "ada" : "tidak ada"}</td>
                        <td>{item.booking}</td>
                        <td>
                          <form action="" onSubmit={handleSubmit}>
                            <button
                              type="submit"
                              id="Btn"
                              className="btn-edt"
                              disabled={disabledItem[index]}
                              onClick={() => disabledButton(index)}
                            >
                              approve
                            </button>

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
              <Pagination>
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
                    <Nav.Link href="/tableOrder">Table Order</Nav.Link>
                    <Nav.Link href="/tableCostumer">Costumer</Nav.Link>
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
                  <Nav>
                    <button onClick={handleLogout} className="btn btn-danger">
                      LOGOUT
                    </button>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

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
                    records.map((item, index) => (
                      <tr key={index}>
                        <td>{item.room}</td>
                        <td>{item.capacity}</td>
                        <td>{item.snack}</td>
                        <td>{item.lunch}</td>
                        <td>{item.extratime}</td>
                        <td>{item.booking}</td>
                        <td>
                          <button
                            className="btn-edt"
                            onClick={() =>
                              handleEdit(
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
                            EDIT
                          </button>
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
              <Pagination>
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
              <Link className="d-grid gap-2" to={"/addOrder"}>
                <Button className="btn" size="lg">Create</Button>
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </>
  );
}

export default TableOrder;
