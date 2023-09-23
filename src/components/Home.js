import React, { Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from "./Employees";
import './Home.css';
import {Link, useNavigate} from 'react-router-dom'

function Home() {
let history = useNavigate();

const handleEdit = ( id, name, age) => {
    localStorage.setItem('name', name);
    localStorage.setItem('Age', age);
    localStorage.setItem('Id', id);
}

const handleDelete = (id) => {
    var index = Employees.map(function(e) {
        return e.id
    }).indexOf(id);

    Employees.splice(index,1);
     history('/');
}

  return (
    <Fragment>
      {" "}
      <div className="div-frgmnt"  style={{ margin: "0rem" }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Employees && Employees.length > 0
              ? Employees.map((item) => {
                  return (
                    <tr>
                      <td>{item.Name}</td>
                      <td>{item.Age}</td>
                      <td>
                        <Link to={'/edit'}>
                        <button className="btn-edt" onClick={() => handleEdit(item.id, item.Name)}>EDIT</button>
                        </Link>
                        &nbsp;
                        <button className="btn-dlt" onClick={() => handleDelete(item.id)}>DELET</button>

                      </td>
                    </tr>
                  );
                })
              : "No date avaible"}
          </tbody>
        </Table>
        <Link className="d-grid gap-2" to={"/create"}>
            <Button size="lg">Create</Button>
        </Link>
      </div>{" "}
    </Fragment>
  );
}
export default Home;
