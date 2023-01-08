import React, { Component } from "react";
import { connect } from "react-redux";
import "./login.css";
import logo from "../../assets/img/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

class Daftar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daftar: {
        username: null,
        email: null,
        password: null,
      },
      pass: { password: null, password2: null },
      error: "",
    };
  }

  handleOnChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    let daftarNew = { ...this.state.daftar };
    daftarNew[id] = value;
    this.setState({ daftar: daftarNew }, () => console.log(this.state.daftar));
  };

  handleOnChangePass = (e) => {
    this.setState({
      error: "",
    });
    const value = e.target.value;
    const id = e.target.id;
    let pass = { ...this.state.pass };
    pass[id] = value;

    this.setState({ pass: pass }, () =>
      this.state.pass.password !== this.state.pass.password2
        ? this.setState({
            error: "password tidak sama",
          })
        : null
    );
  };

  handleRegister = (data, pass) => {
    axios
      .post(`${process.env.REACT_APP_API_POINT}user`, {
        username: data.username,
        email: data.email,
        password: pass.password,
        role: "user",
      })
      .then((resp) => {
        this.setState({
          error: "User berhasil dibuat, silahkan kembali ke Login",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: "user gagal dibuat, Ada kesalahan",
        });
      });
  };

  render() {
    return (
      <section className="login" id="login">
        <div className="container log">
          <center>
            <img
              className="p-3 justify-content-center"
              src={logo}
              alt="star camp logo"
            />
          </center>

          <form className="pb-4">
            <div className="form-group text-light">
              <label htmlFor="exampleInputUser1">
                <b>Username</b>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                </div>
                <input
                  type="user"
                  onChange={(e) => this.handleOnChange(e)}
                  id="username"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
            </div>
            <div className="form-group text-light">
              <label htmlFor="exampleInputEmail1">
                <b>Email Address</b>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                </div>
                <input
                  type="email"
                  onChange={(e) => this.handleOnChange(e)}
                  id="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="form-group text-light">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                </div>
                <input
                  type="password"
                  onChange={(e) => this.handleOnChangePass(e)}
                  className="form-control"
                  id="password"
                  placeholder="Masukkan Password Baru"
                />
              </div>
            </div>
            <div className="form-group text-light">
              <label htmlFor="password2">
                <b>Password</b>
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                </div>
                <input
                  onChange={(e) => this.handleOnChangePass(e)}
                  type="password"
                  className="form-control"
                  id="password2"
                  placeholder="Masukkan Password Baru - lagi"
                />
              </div>
            </div>
            <div>
              <p>{this.state.error}</p>
            </div>
            <div
              className="nav-link btn-success text-center py-2 rounded"
              onClick={() =>
                this.handleRegister(this.state.daftar, this.state.pass)
              }
            >
              <h6>
                <b>Register</b>
              </h6>
            </div>
            <div className="mt-3 text-center">
              <p>
                Sudah daftar?, ayo <Link to={"/login"}>login</Link> sekarang
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Daftar);
