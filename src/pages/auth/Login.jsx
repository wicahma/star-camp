import React, { Component } from "react";
import "./login.css";
import logo from "../../assets/img/logo.png";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      validate: false,
      error: "",
    };
  }

  handleInput = (e) => {
    let data = e.target.value;
    let id = e.target.id;
    let dataNew = { ...this.state.data };
    dataNew[id] = data;
    // console.log(data);
    this.setState({
      data: dataNew,
      error: "",
    });
  };

  handleLogin = () => {
    // console.log(this.state.data);
    axios
      .get(
        `${process.env.REACT_APP_API_POINT}user/${this.state.data.email}&${this.state.data.password}`
      )
      .then((res) => {
        localStorage.setItem("dataUser", JSON.stringify(res.data[0]));
        this.props.dispatch({ type: "SET_USER", payload: res.data[0] });
        this.setState({
          validate: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: "Data yang dimasukkan salah!",
        });
      });
  };

  render() {
    return (
      <section id="login" className="login">
        {this.state.validate === true ? (
          <Navigate to={"/home"} replace />
        ) : null}
        <div className="container log">
          <center>
            <img src={logo} alt="" className="m-5" />
          </center>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                </div>
                <input
                  onChange={(e) => this.handleInput(e)}
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>
                </div>
                <input
                  onChange={(e) => this.handleInput(e)}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <p className="text-center">{this.state.error}</p>
            </div>
            <div
              type="button"
              onClick={() => this.handleLogin()}
              className="nav-link btn-success mt-5"
            >
              <center>Login</center>
            </div>
            <a className="nav-link text-dark mt-4" href="./password.html">
              <b>
                <center>Lupa Password</center>
              </b>
            </a>
            <Link to={"/daftar"} className="nav-link text-dark">
              <b>
                <center>Buat Akun</center>
              </b>
            </Link>
          </form>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Login);
