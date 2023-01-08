import React from "react";
import { Link } from "react-router-dom";
import KeranjangDetail from "../micros/KeranjangDetail";

const CardKeranjang = (props) => {
  return (
    <div className="">
      <div className="card-body row flex-wrap gap-2">
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

      <div className="d-flex justify-content-end">
        <Link to="/keranjang/pesan" className="btn btn-detail-keranjang">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CardKeranjang;
