import React from "react";
import { connect } from "react-redux";

const KeranjangDetail = (props) => {
  const handleDeleteData = () => {
    // console.log(props.id);
    props.dispatch({ type: "DELETE_FROM_KERANJANG", id: props.id });
  };

  const handleProductValue = (e) => {
    // console.log(props.id);
    props.dispatch({
      type: "PRODUCT_VALUE",
      id: props.id,
      value: e.target.value,
    });
  };
  return (
    <div className="d-flex justify-content-between col-md-12 detail-keranjang mt-3">
      <div className="text-light">
        <h6>
          <b>{props.judul}</b>
        </h6>
        <h6>
          <b>Rp. {props.harga}</b>
        </h6>
      </div>
      <div className="d-flex align-items-center">
        <input
          type="number"
          min={1}
          onChange={(e) => handleProductValue(e)}
          max={props.stock}
          defaultValue={0}
        />
        <button
          type="button"
          onClick={() => handleDeleteData()}
          className="text-light hapus-keranjang"
        >
          <b>Hapus</b>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(KeranjangDetail);
