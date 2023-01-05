import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import TableOrder from "../../components/tables/TableOrder";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        full_name: this.props.user.full_name,
        phone: this.props.user.phone,
        address: this.props.user.address,
        time: "",
      },
      respStatus: "",
      navi: false,
    };
    this.clickMe = React.createRef();
  }

  handleOnChange = (el) => {
    const value = el.target.value;
    const id = el.target.id;
    const newData = { ...this.state.data };
    newData[id] = value;
    this.setState({
      data: newData,
    });
  };

  handleSendOrder = (order) => {
    // console.log(order);
    axios
      .put(`http://localhost:5000/api/user/${this.props.user.id_user}`, {
        full_name: this.state.data.full_name,
        phone: this.state.data.phone,
        address: this.state.data.address,
      })
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

    axios
      .post("http://localhost:5000/api/order", {
        id_user: parseInt(this.props.user.id_user),
        time: String(this.state.data.time),
        order_status: "Pesanan berhasil dibuat",
      })
      .then((res) => {
        //   console.log(res.data.data.insertId);
        console.log("data order berhasil diupload ke database");
        order.map((data) => {
          axios
            .post("http://localhost:5000/api/order-detail", {
              id_order: res.data.data.insertId,
              id_product: data.id_product,
              jumlah: parseInt(data.pesanan),
            })
            .then((data) => {
              console.log("data order detail berhasil diupload ke database");
              this.setState({
                navi: true,
              });
              this.clickMe.current.click();
            })
            .catch((err) => {
              console.log("eh order detail gagal diupload ke database :)");
            });
        });
      })
      .catch((err) => {
        console.log("eh order gagal diupload ke database :)");
        // console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="container-sm">
          <div className="card pesanan">
            <div className="card-header">
              <h5 className="text-light">
                <b>ISI DATA PESANAN</b>
              </h5>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label
                    htmlFor="nama"
                    className="text-light col-sm-3 col-form-label"
                  >
                    <b className="text-light">Nama Lengkap</b>
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      onChange={(e) => this.handleOnChange(e)}
                      id="full_name"
                      name="nama"
                      className="form-control"
                      defaultValue={this.props.user.full_name}
                      placeholder="Masukkan Nama"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="alamat" className="col-sm-3 col-form-label">
                    <b className="text-light">Alamat</b>
                  </label>

                  <div className="col-sm-6">
                    <textarea
                      className="form-control"
                      onChange={(e) => this.handleOnChange(e)}
                      id="address"
                      defaultValue={this.props.user.address}
                      rows="2"
                      placeholder="Masukkan Alamat"
                    ></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="No Hp" className="col-sm-3 col-form-label">
                    <b className="text-light">No Hp</b>
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="string"
                      onChange={(e) => this.handleOnChange(e)}
                      id="phone"
                      name="No Hp"
                      className="form-control"
                      defaultValue={this.props.user.phone}
                      placeholder="Masukkan No Handphone"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="time" className="col-sm-3 col-form-label">
                    <b className="text-light">Tanggal Sewa</b>
                  </label>
                  <div className="col-sm-6">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i className="bi bi-calendar" aria-hidden="true"></i>
                        </div>
                      </div>
                      <input
                        type="date"
                        onChange={(e) => this.handleOnChange(e)}
                        className="form-control"
                        id="time"
                        placeholder="Pilih Tanggal Sewa"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container-sm">
          <div className="card pesanann">
            <div className="card-header">
              <h5 className="text-light">
                <b>DETAIL PESANAN</b>
              </h5>
            </div>

            <div className="card-body">
              <TableOrder keranjang={this.props.keranjang} />
            </div>
            <div className="card-footer text-muted">
              <button
                type="button"
                className="btn btn"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Buat Pesanan
              </button>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body text-center">
                      <h5>Yakin Ingin Membuat Pesanan</h5>
                    </div>
                    <div className="modal-footer justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        ref={this.clickMe}
                      >
                        Tidak
                      </button>
                      <button
                        onClick={() =>
                          this.handleSendOrder(this.props.keranjang)
                        }
                        className="btn btn-primary"
                      >
                        Ya
                      </button>
                      {this.state.navi !== false && (
                        <Navigate to={`/pesanan/${this.props.user.username}`} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
  keranjang: state.mainStore.keranjang,
});

export default connect(mapStateToProps)(Order);
