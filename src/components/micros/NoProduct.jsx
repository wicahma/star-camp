import React from "react";
import { Link } from "react-router-dom";
import keranjang from "../../assets/img/keranjang.png";

const NoProduct = (props) => {
  return (
    <div className="keranjang">
      <center>
        <img src={keranjang} alt="Card image cap" width="200px" />
        <h6 className="card-title text-center">
          <b>{props.pesan}</b>
        </h6>

        <Link to={"/home"} className="btn btn-primary center">
          Tambah Produk
        </Link>
      </center>
    </div>
  );
};

export default NoProduct;
