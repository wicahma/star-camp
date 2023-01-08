import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Daftar from "./pages/auth/Daftar";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/auth/Profile";
import Keranjang from "./pages/keranjang/Keranjang";
import Pesanan from "./pages/pesanan/Pesanan";
import About from "./pages/about/About";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Order from "./pages/keranjang/Order";
import PesananModel from "./components/micros/PesananModel";

function App(props) {
  useEffect(() => {
    let dataUser = JSON.parse(localStorage.getItem("dataUser"));
    props.dispatch({ type: "SET_USER", payload: dataUser });
  }, []);

  return (
    <Router>
      <Navbar />;
      <div className={`root-container`}>
        <Routes>
          <Route path="/" exact element={<About />} />
          <Route
            path="/home"
            exact
            element={props.user ? <Home /> : <Navigate to={"/"} />}
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/daftar" exact element={<Daftar />} />
          <Route
            path="/profile"
            exact
            element={props.user ? <Profile /> : <Navigate to={"/"} />}
          />
          <Route
            path="/keranjang"
            exact
            element={props.user ? <Keranjang /> : <Navigate to={"/"} />}
          />
          <Route
            path="/keranjang/pesan"
            exact
            element={props.user ? <Order /> : <Navigate to={"/"} />}
          />
          <Route
            path="/pesanan/:type"
            exact
            element={props.user ? <Pesanan /> : <Navigate to={"/"} />}
          />
          <Route
            path="/pesanan-detail/:id"
            exact
            element={props.user ? <PesananModel /> : <Navigate to={"/"} />}
          />
        </Routes>
      </div>
      
    </Router>
  );
}

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(App);
