import React, { Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import { Button, Form, InputGroup, Pagination, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Costumers from "./database/Costumers";
import TableOrder from "./TableOrder";
import EditCostumer from "./EditCostumers";
import AddCostumers from "./AddCostumers";

function TableCostumers() {
  let history = useNavigate("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const npage = Math.ceil(Costumers.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [search, setSearch] = useState("");
  const firstIndex = (currentPage - 1) * recordsPerPage;
  const lastIndex = currentPage * recordsPerPage;
  const [id, setId] = useState("");

  const handleEdit = (id, name, phone, payMethod) => {
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("payMethod", payMethod);
    localStorage.setItem("id", id);
  };

  const filterCostumers = Costumers.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) 
  );
  const records = filterCostumers.slice(firstIndex, lastIndex);

  const handleDelete = (id) => {
    var index = Costumers.findIndex((e) => e.id === id);

    if (index !== -1) {
      Costumers.splice(index, 1);
      history("/tableCostumer");
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

  return (
    <>
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
                <th>Name</th>
                <th>Phone</th>
                <th>PayMethod</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterCostumers && filterCostumers.length > 0 ? (
                records.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.payMethod}</td>
                    <td>
                      <Link to={"/editCostumer"}>
                        <button
                          className="btn-edt"
                          onClick={() =>
                            handleEdit(
                              item.id,
                              item.name,
                              item.phone,
                              item.payMethod,
                            )
                          }
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

          <Link className="d-grid gap-2" to={"/addCostumer"}>
            <Button size="lg">Create</Button>

          </Link>
        </div>
      </Fragment>
    </>
  );
}
export default TableCostumers;
