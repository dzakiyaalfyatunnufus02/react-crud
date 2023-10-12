import React, { Fragment, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import { Button, Form, InputGroup, Pagination, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function ReportSewa() {
  let history = useNavigate("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [reportSewa, setReportSewa] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);
  const npage = Math.ceil(reportSewa.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const RECORDS = reportSewa.slice(firstIndex, lastIndex);
  const userRole = localStorage.getItem("UserRole");


  const getOrder = async () => {
    try {
      const respon = await axios.get("http://localhost:2222/reportSewa");
      const allOrder = respon.data;

      // Apply search filter only for supervisor role
      const filterOrder = allOrder.filter((employee) =>
        employee.datetime?.toLowerCase().includes(search?.toLowerCase())
      );

      setReportSewa(filterOrder);
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

  const handleDelete = async (id) => {
    const RESPON = await axios.delete(`http://localhost:2222/reportSewa/${id}`);
    console.log(RESPON);
    console.log("deleted");
    getOrder();
    history("/reportSewa");
  };
  const handleProfile = () => {
    // Ganti urutan perintah agar navigasi terjadi sebelum clear local storage
    navigate("/profile");
  };
  useEffect(() => {
    getOrder();
  }, [search]);

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
              <Nav>
                <button onClick={handleProfile} className="btn btn-secondary" varian="secondary">
                   PROFILE
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
          <h1> TABLE REPORT SEWA</h1>
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
                  setCurrentPage(1) || setRecordsPerPage(Number(e.target.value))
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
                <th>Date Time</th>
                <th>Ruang</th>
                <th>Kapasitas</th>
                <th>Snack</th>
                <th>Extra Time</th>
                <th>Booking</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportSewa && reportSewa.length > 0 ? (
                RECORDS.map((item, index) => (
                  <tr key={index}>
                    <td>{item.datetime}</td>
                    <td>{item.ruang}</td>
                    <td>{item.kapasitas}</td>
                    <td>{item.snack}</td>
                    <td>{item.extratime == "true" ? "Ada" : "Tidak Ada"}</td>
                    <td>{item.booking}</td>
                    <td>
                      <Link to={`/editReportSewaa/${item.id}`}>
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
          <div className="pgntn">
          <Pagination className="pgntn">
            <Pagination.Prev onClick={prePage} />
            {numbers.map((n, i) => (
              <Pagination.Item
                key={i}
                active={currentPage === n}
                onClick={() => changeCPage(n)}
                style={{
                  backgroundColor: "lightgray"
                }}
              >
                {n}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={nextPage} />
          </Pagination>
          </div>
          
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
                <button onClick={handleProfile} className="btn btn-secondary" variant="secondary">
                   PROFILE
                </button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
          <h1> TABLE REPORT SEWA</h1>
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
                  setCurrentPage(1) || setRecordsPerPage(Number(e.target.value))
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
                <th>Date Time</th>
                <th>Ruang</th>
                <th>Kapasitas</th>
                <th>Snack</th>
                <th>Extra Time</th>
                <th>Booking</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportSewa && reportSewa.length > 0 ? (
                RECORDS.map((item, index) => (
                  <tr key={index}>
                    <td>{item.datetime}</td>
                    <td>{item.ruang}</td>
                    <td>{item.kapasitas}</td>
                    <td>{item.snack}</td>
                    <td>{item.extratime == "true" ? "Ada" : "Tidak Ada"}</td>
                    <td>{item.booking}</td>
                    <td>
                      <Link to={`/editReportSewaa/${item.id}`}>
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
                onClick={() => changeCPage(n)}
              >
                {n}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={nextPage} />
          </Pagination >
          <Link className="d-grid gap-2" to={"/addReportSewaa"}>
            <Button className="btn-lnk" size="lg">
              Create
            </Button>
          </Link>
        </div>
      </Fragment>
    )}
    </div>
   
      
    </>
  );
}

export default ReportSewa;
