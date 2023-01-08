import React, { Component } from "react";
import { connect } from "react-redux";
import CardKeranjang from "../../components/cards/CardKeranjang";
import NoProduct from "../../components/micros/NoProduct";

class Keranjang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keranjang: JSON.parse(localStorage.getItem("produk")),
    };
  }
  render() {
    console.log(this.props.keranjang);
    if (this.props.keranjang.length === 0) {
      return (
        <div className="container">
          <NoProduct pesan="Belum ada produk didalam keranjang!" />
        </div>
      );
    }
    return (
      <div className="container list-keranjang">
        <CardKeranjang dataKeranjang={this.props.keranjang} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  keranjang: state.mainStore.keranjang,
});

export default connect(mapStateToProps)(Keranjang);
