import React from "react";
import { Link } from "react-router-dom";
import KeranjangDetail from "../micros/KeranjangDetail";

const CardKeranjang = (props) => {
  return (
    <div className="card order2">
      <div className="card-header">
        <h5 className="text-light">
          <b>DETAIL PESANAN</b>
        </h5>
      </div>
      <div className="card-body row flex-wrap">
        {props.dataKeranjang.map((product, index) => {
          return (
            <KeranjangDetail
              key={index}
              judul={product.product_name}
              harga={product.price}
              stock={product.stock}
              id={product.id_product}
            />
          );
        })}
      </div>

      <div className="card-footer text-muted">
        <Link to="/keranjang/pesan" className="btn btn-light">
          {" "}
          Detail
        </Link>
      </div>
    </div>
  );
};

export default CardKeranjang;
