import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employees";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
// import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

function Home() {
  let history = useNavigate();
  // const [Employees, setEmployees] = useState(Employees);
  const [currentPage, setCurrentPage] = useState(1);
  // let [recordsPerPage, setRecordPerPage] = useState(0);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Employees.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Employees.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [search, setSearch] = useState("");
  // console.log(search);

  // console.log(lastIndex);

  const handleEdit = (id, name, age) => {
    localStorage.setItem("name", name);
    localStorage.setItem("Age", age);
    localStorage.setItem("Id", id);
  };

  const handleDelete = (id) => {
    var index = Employees.map(function (e) {
      return e.id;
    }).indexOf(id);

    Employees.splice(index, 1);
    history("/");
  };
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage === lastIndex) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  console.log(currentPage);
  return (
    <Fragment>
      {" "}
      <div className="div-frgmnt" style={{ margin: "0rem" }}>
        <form>
          <InputGroup>
            <Form.Control
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></Form.Control>
          </InputGroup>
        </form>
        <br></br>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {Employees && Employees.length > 0
              ? records
                  .filter((item) => {
                    return search.toLocaleLowerCase() === ""
                      ? item
                      : item.Name.toLocaleLowerCase().includes(search);
                  }) */}
            {Employees && Employees.length > 0
              ? Employees.filter((item) => {
                  // Gunakan filter pencarian jika input pencarian tidak kosong
                  if (search !== "") {
                    return item.Name.toLocaleLowerCase().includes(
                      search.toLowerCase()
                    );
                  } else {
                    return true; // Tampilkan semua data jika input pencarian kosong
                  }
                })
                  .slice(firstIndex, lastIndex)
                  .map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.Name}</td>
                        <td>{item.Age}</td>
                        <td>
                          <Link to={"/edit"}>
                            <button
                              className="btn-edt"
                              onClick={() => handleEdit(item.id, item.Name)}
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
                    );
                  })
              : "No date avaible"}
          </tbody>
        </Table>
        <nav>
          <ul className="pagination">
            <li className="page-it">
              <a href="#" className="page-link" onClick={prePage}>
                Prev
              </a>
            </li>
            {Array.from(
              { length: Math.ceil(Employees.length / recordsPerPage) },
              (_, i) => i + 1
            ).map((n, i) => (
              <li
                className={`page-item ${currentPage === n ? "active" : ""}`}
                key={i}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}

            <li className="page-it">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
        <Link className="d-grid gap-2" to={"/create"}>
          <Button size="lg">Create</Button>
        </Link>
      </div>{" "}
    </Fragment>
  );
}
export default Home;
