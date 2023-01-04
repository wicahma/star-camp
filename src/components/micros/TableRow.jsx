import React from "react";

const TableRow = (props) => {
  return (
    <tr id="produk">
      <td>{props.index+1}</td>
      <td>{props.nama}</td>
      <td>Rp. {props.price}</td>
      <td>{props.many}</td>
      <td>Rp. {props.price * props.many}</td>
    </tr>
  );
};

export default TableRow;
