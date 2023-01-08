import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        full_name: this.props.user.full_name,
        username: this.props.user.username,
        email: this.props.user.email,
        phone: this.props.user.phone,
        address: this.props.user.address,
      },
      respStatus: "",
    };
  }

  handleOnChange = (el) => {
    const value = el.target.value;
    const id = el.target.id;
    const newData = { ...this.state.data };
    newData[id] = value;
    this.setState({
      data: newData,
      respStatus: "",
    });
  };

  handleUpdate = (users) => {
    // console.log(users);
    axios
      .put(
        `${process.env.REACT_APP_API_POINT}user/${this.props.user.id_user}`,
        {
          username: users.username,
          email: users.email,
          phone: parseInt(users.phone),
          full_name: users.full_name,
          address: users.address,
        }
      )
      .then((res) => {
        // console.log(res);
        this.setState({
          respStatus: "Data berhasil dirubah, silakan lakukan login ulang!",
        });
      })
      .catch((err) => {
        this.setState({ respStatus: "Data gagal dirubah !" });
        console.log(err);
      });
  };

  render() {
    return (
      <section id="login">
        <div className="container-sm">
          <div className="card p-5 pesanan">
            <div className="card-body">
              <center>
                {/* <img
                  src="./assets/img/sywl.png"
                  alt=""
                  className=""
                  width="150px"
                /> */}
                <i className="bi bi-person-circle text-light user-profile"></i>
                <p className="text-light p-2">
                  <b>Edit Profil</b>
                </p>
              </center>

              <form className="row position-relative">
                <div className="col-md-4 form-group">
                  <label
                    htmlFor="nama"
                    className=" text-light col-form-label text-left"
                  >
                    <b className="text-light">Full Name</b>
                  </label>
                  <div className="">
                    <input
                      onChange={(e) => this.handleOnChange(e)}
                      type="text"
                      id="full_name"
                      name="nama"
                      className="form-control"
                      defaultValue={this.props.user.full_name}
                      placeholder="Masukkan fullname"
                    />
                  </div>
                </div>
                <div className="col-md-4 form-group">
                  <label
                    htmlFor="nama"
                    className=" text-light col-form-label text-left"
                  >
                    <b className="text-light">Username</b>
                  </label>
                  <div className="">
                    <input
                      onChange={(e) => this.handleOnChange(e)}
                      type="text"
                      id="username"
                      name="nama"
                      className="form-control"
                      defaultValue={this.props.user.username}
                      placeholder="Masukkan Username"
                    />
                  </div>
                </div>

                <div className="col-md-4 form-group">
                  <label htmlFor="email" className=" col-form-label text-left">
                    <b className="text-light">Email</b>
                  </label>

                  <div className="">
                    <input
                      className="form-control"
                      onChange={(e) => this.handleOnChange(e)}
                      defaultValue={this.props.user.email}
                      id="email"
                      rows="2"
                      placeholder="Masukkan Email"
                    />
                  </div>
                </div>
                <div className="col-md-4 form-group">
                  <label htmlFor="No Hp" className=" col-form-label text-left">
                    <b className="text-light">No Hp</b>
                  </label>
                  <div className="">
                    <input
                      type="number"
                      onChange={(e) => this.handleOnChange(e)}
                      id="phone"
                      name="phone"
                      defaultValue={this.props.user.phone}
                      className="form-control"
                      placeholder="Masukkan No Handphone"
                    />
                  </div>
                </div>

                <div className="col-md-8 form-group">
                  <label
                    htmlFor="nama"
                    className=" text-light col-form-label text-left"
                  >
                    <b className="text-light">Alamat</b>
                  </label>
                  <div className="">
                    <textarea
                      onChange={(e) => this.handleOnChange(e)}
                      type="text"
                      id="address"
                      name="alamat"
                      className="form-control"
                      defaultValue={this.props.user.address}
                      placeholder="Masukkan alamat kalian"
                    />
                  </div>
                </div>
                <div className="">
                  <p>{this.state.respStatus}</p>
                </div>
                <button
                  type="button"
                  onClick={() => this.handleUpdate(this.state.data)}
                  className="save-user col-sm-1"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(Profile);
