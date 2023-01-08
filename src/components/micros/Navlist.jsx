import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";

const Navlist = (props) => {
  let [out, setOut] = useState(false);
  const { pathname } = useLocation();

  const handleLogOut = () => {
    props.dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("dataUser");
    alert("Anda telah berhasil log out!");
    setOut(true);
  };

  return (
    <>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {!out ? null : <Navigate to={"/"} />}
        <ul className="navbar-nav ml-auto">
          <li
            className={`nav-item ${
              pathname.includes("/home") ? "active-nav" : null
            }`}
          >
            <Link to={"/home"} className="nav-link text-light">
              <b>Beranda </b>
            </Link>
          </li>

          {props.user === null ? null : props.user.role === "user" ? (
            <li
              className={`nav-item ${
                pathname.includes("/pesanan") ? "active-nav" : null
              }`}
            >
              <Link
                to={`/pesanan/${props.user.username}`}
                className="nav-link text-light"
              >
                <b>Pesanan</b>
              </Link>
            </li>
          ) : (
            <li className="nav-item btn-group">
              <button
                type="button"
                className="nav-link text-light"
                data-toggle="modal"
                data-target="#adminModal"
              >
                Pesanan
              </button>
            </li>
          )}
          <li
            className={`nav-item ${
              pathname.includes("/keranjang") ? "active-nav" : null
            }`}
          >
            <Link to={"/keranjang"} className="nav-link text-light">
              <b> Keranjang </b>
            </Link>
          </li>
        </ul>
        <div className="dropdown show">
          <a
            className="btn dropdown py-0 m-0"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {/* <img src="./assets/img/profil.png" alt="" width="40px" /> */}
            <i className="bi bi-person-circle text-light user"></i>
          </a>

          <div
            className="dropdown-menu dropdown-menu-right bg-primary"
            aria-labelledby="dropdownMenuLink"
          >
            <Link className="dropdown-item active" to={"/profile"}>
              Profil
            </Link>
            <button
              onClick={() => handleLogOut()}
              className="dropdown-item active"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(Navlist);
