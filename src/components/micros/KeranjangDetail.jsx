import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const KeranjangDetail = (props) => {
  const [valueProd, setValue] = useState(1);
  const handleDeleteData = () => {
    const products = JSON.parse(localStorage.getItem("produk")) || [];
    products.splice(
      products.findIndex((data) => data.id_product === props.id),
      1
      );
      console.log(products);
      localStorage.setItem("produk", JSON.stringify(products));
      props.dispatch({ type: "DELETE_FROM_KERANJANG", id: props.id });
  };

  const handleProductValue = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    props.dispatch({
      type: "PRODUCT_VALUE",
      id: props.id,
      value: valueProd,
    });
  }, [valueProd]);

  return (
    <div className="d-flex flex-wrap justify-content-between col-md-12 detail-keranjang p-4 mt-3">
      <div className="text-light flex-grow">
        <h6 className="font-weight-normal">{props.judul}</h6>
        <h6>Rp. {props.harga}</h6>
      </div>
      <div className="d-flex align-items-center keranjang-buttons">
        <input
          type="number"
          min={1}
          onChange={(e) => handleProductValue(e)}
          max={props.stock}
          defaultValue={1}
          className="keranjang-input"
        />
        <button
          type="button"
          onClick={() => handleDeleteData()}
          className="text-light hapus-keranjang"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(KeranjangDetail);
