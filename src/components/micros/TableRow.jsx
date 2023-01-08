import React from "react";

const TableRow = (props) => {
  return (
    <div className="row list-pesanan" id="produk">
      <div className="col-sm-6">{props.nama}</div>
      <div className="col-sm-6 row">
        <div className="col-6">
          Rp. {props.price} x {props.many}
        </div>
        <div className="col-6" id={props.many}>
          Rp. {props.price * props.many}
        </div>
      </div>
    </div>
  );
};

export default TableRow;
