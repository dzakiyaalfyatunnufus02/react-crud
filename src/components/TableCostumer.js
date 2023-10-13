import React, { Fragment, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import { Button, Pagination, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";

function TableCostumers() {
  let history = useNavigate("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const [Costumers, setCostumers] = useState([]);
  const npage = Math.ceil(Costumers.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [Search, setSEARCH] = useState("");
  const RECORDS = Costumers.slice(firstIndex, lastIndex);

  

  const filterCostumers = Costumers.filter((employee) =>
    employee.name.toLowerCase().includes(Search.toLowerCase())
  );

  const getCostumer = async () => {
    try {
      const Respon = await axios.get("http://localhost:2222/costumers");
      const allOrder = Respon.data;
      console.log(allOrder);

      // Apply search filter only for operator role
      const filterCostumers = allOrder.filter((order) =>
        order.name?.toLowerCase().includes(Search?.toLowerCase())
      );

      setCostumers(filterCostumers);
      console.log(filterCostumers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const respon = await axios.delete(
        ` http://localhost:2222/costumers/${id}`
      );
      console.log(respon.data);
      console.log("deleted");
      getCostumer();
    } catch (error) {
      console.log(error);
    }
    history("/tableCostumer");
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
}
const handleProfile = () => {
  // Ganti urutan perintah agar navigasi terjadi sebelum clear local storage
  navigate("/profile");
  };
  useEffect(() => {
    getCostumer();
  }, [Search]);

  return (
    <>
      <div className="home">
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
                <div></div>
                <Nav className="btn">
                  <button onClick={handleLogout} className="btn btn-secondary" variant="secondary">
                    LOGOUT
                  </button>
                </Nav>
                <Nav>
      <button id="btn-profil" onClick={handleProfile} className="btn btn-danger">
        PROFILE
      </button>
    </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div>
            <h1>TABLE COSTUMERS</h1>
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
                  <option value={7}>7</option>
                  <option value={15}>15</option>
                </select>
              </span>
            </div>

            <br />
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>PayMethod</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filterCostumers && filterCostumers.length > 0 ? (
                  RECORDS.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.payMethod}</td>
                      <td>
                        <Link to={`/editCostumer/${item.id}`}>
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

            <Link className="d-grid gap-2" to={"/addCostumer"}>
              <Button size="lg" className="btn-lnk">Create</Button>
            </Link>
          </div>
        </Fragment>
      </div>
    </>
  );
};
export default TableCostumers;
