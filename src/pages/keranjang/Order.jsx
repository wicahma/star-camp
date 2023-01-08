import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "../../components/micros/Alert";
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
      error: false,
      success: false,
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

  checker = () => {
    let nothing = false;
    for (const [key, value] of Object.entries(this.state.data)) {
      if (value === "" || value === undefined || value === null) nothing = true;
    }
    return nothing;
  };

  handleSendOrder = (order) => {
    if (this.checker() === true) {
      this.setState({ error: true });
      return setTimeout(() => this.setState({ error: false }), 1500);
    }
    axios
      .put(
        `${process.env.REACT_APP_API_POINT}user/${this.props.user.id_user}`,
        {
          full_name: this.state.data.full_name,
          phone: this.state.data.phone,
          address: this.state.data.address,
        }
      )
      .then((res) => {
        this.setState({
          respStatus: "Data berhasil dirubah, silakan lakukan login ulang!",
        });
      })
      .catch((err) => {
        this.setState({ respStatus: "Data gagal dirubah !" });
        console.log(err);
      });

    axios
      .post(`${process.env.REACT_APP_API_POINT}order`, {
        id_user: parseInt(this.props.user.id_user),
        time: String(this.state.data.time),
        order_status: "Pesanan berhasil dibuat",
      })
      .then((res) => {
        //   console.log(res.data.data.insertId);
        console.log("data order berhasil diupload ke database");
        order.map((data) => {
          axios
            .post(`${process.env.REACT_APP_API_POINT}order-detail`, {
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
      });
  };

  render() {
    return (
      <div className="container mx-auto mt-4 row">
        <div className="col-md-4 col-sm-12">
          <div className="order2 card-body px-0 pt-4 pb-1">
            <h5 className="text-dark text-center">
              <b>ISI DATA PESANAN</b>
            </h5>
            {this.state.error === true && (
              <Alert alert="Ada data yang masih kosong!" type="alert-danger" />
            )}
            <form>
              <div className="form-group">
                <label
                  htmlFor="nama"
                  className="text-dark col-sm-12 col-form-label"
                >
                  <b className="text-dark">Nama Lengkap</b>
                </label>
                <div className="col-sm-12">
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
                <label htmlFor="alamat" className="col-sm-12 col-form-label">
                  <b className="text-dark">Alamat</b>
                </label>

                <div className="col-sm-12">
                  <textarea
                    className="form-control"
                    onChange={(e) => this.handleOnChange(e)}
                    id="address"
                    defaultValue={this.props.user.address}
                    rows="6"
                    placeholder="Masukkan Alamat"
                  ></textarea>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="No Hp" className="col-sm-12 col-form-label">
                  <b className="text-dark">No Hp</b>
                </label>
                <div className="col-sm-12">
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
                <label htmlFor="time" className="col-sm-12 col-form-label">
                  <b className="text-dark">Tanggal Sewa</b>
                </label>
                <div className="col-sm-12">
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
        {this.state.navi === true && (
          <Navigate to={`/pesanan/${this.props.user.username}`} />
        )}
        <div className="col-md-8 col-sm-12">
          <div className="order2 card-body">
            <h5 className="text-dark text-center">
              <b>DETAIL PESANAN</b>
            </h5>

            <TableOrder keranjang={this.props.keranjang} />
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-blue"
                onClick={() => this.handleSendOrder(this.props.keranjang)}
              >
                Buat Pesanan
              </button>
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
