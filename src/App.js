import logo from "./logo.svg";
import "./App.css";
import Table from "./components/Table";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Register from "./components/Register";
import Login from "./components/Login";
import Costumer from "./components/TableCostumer";
import EditCostumer from "./components/EditCostumers";
import AddOrder from"./components/AddOrder";
import TableCostumers from "./components/TableCostumer";
import TableOrder from "./components/TableOrder"
import AddCostumers from "./components/AddCostumers";
// import Home from './components/Table';
import Home from "./components/Home";
import PrivateRoute from "./routes/PrivatRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditOrder from "./components/EditOrder";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/table"
            element={
              <PrivateRoute>
                <Table />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <Add />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit"
            element={
              <PrivateRoute>
                <Edit />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
           <Route
            path="/costumer"
            element={
              <PrivateRoute>
                <Costumer />
              </PrivateRoute>
            }
            />
           <Route
            path="/editCostumer"
            element={
              <PrivateRoute>
                <EditCostumer />
              </PrivateRoute>
            }
            />
           <Route
            path="/tableCostumer"
            element={
              <PrivateRoute>
                <TableCostumers />
              </PrivateRoute>
            }
            />
           <Route
            path="/addCostumer"
            element={
              <PrivateRoute>
                <AddCostumers />
              </PrivateRoute>
            }
            />
           <Route
            path="/tableOrder"
            element={
              <PrivateRoute>
                <TableOrder />
              </PrivateRoute>
            }
            />
           <Route
            path="/editOrder"
            element={
              <PrivateRoute>
                <EditOrder />
              </PrivateRoute>
            }
            />
           <Route
            path="/addOrder"
            element={
              <PrivateRoute>
                <AddOrder />
              </PrivateRoute>
            }
            />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// Router ini nama asli nya oky ini juga untuk membuat router
