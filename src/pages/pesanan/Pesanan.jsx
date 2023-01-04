import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import NoProduct from "../../components/micros/NoProduct";
import PesananDetail from "../../components/micros/PesananDetail";

class Pesanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
    };
  }
  getAllData = () => {
    axios
      .get(`http://localhost:5000/api/order/${this.props.user.id_user}`)
      .then((res) => {
        // console.log(res);
        this.setState({ order: res.data.data });
      });
  };
  componentDidMount() {
    this.getAllData();
  }

  render() {
    if (this.state.order.length === 0) {
      return (
        <div className="container">
          <NoProduct pesan="Belum ada pesanan!" />;
        </div>
      );
    } else {
      return (
        <div className="container">
          {this.state.order.map((data) => {
            return (
              <PesananDetail
                key={data.id_order}
                id={data.id_order}
                nama={this.props.user.full_name}
                status={data.order_status}
                tanggal={data.time.slice(0, 10)}
                dataUser={this.props.user}
              />
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
  keranjang: state.mainStore.keranjang,
});

export default connect(mapStateToProps)(Pesanan);
