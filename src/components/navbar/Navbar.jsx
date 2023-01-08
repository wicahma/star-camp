import React from "react";
import logo from "../../assets/img/logo.png";
import { Link, useLocation } from "react-router-dom";
import Navlist from "../micros/Navlist";
import AdminModal from "../micros/AdminModal";
import { connect } from "react-redux";
import TambahProductModal from "../micros/TambahProductModal";

const Navbar = (props) => {
  let location = useLocation();
  // console.log(location);

  const handleLocation = (loc) => {
    if (loc.pathname === "/")
      return (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link to={"/home"} className="nav-link text-light">
                <b>Beranda</b>
              </Link>
            </li>

            <li className="nav-item">
              <form className="form-inline my-2 my-lg-0">
                <Link to={"/login"} className="btn btn-light" role="button">
                  Login
                </Link>
              </form>
            </li>
          </ul>
        </div>
      );
    return <Navlist />;
  };
  if (location.pathname === "/login") return null;
  if (location.pathname === "/daftar") return null;
  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
          <Link to={"/"} className="navbar-brand">
            <img
              src={logo}
              width="125"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {handleLocation(location)}
        </nav>
      </div>
      {props.user === null ? null : props.user.role === "admin" ? (
        <>
          <AdminModal />

          <TambahProductModal />
        </>
      ) : null}
    </header>
  );
};
const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});
export default connect(mapStateToProps)(Navbar);
