import React, { createRef, useEffect, useRef, useState } from "react";
import TableRow from "../micros/TableRow";

const TableOrder = (props) => {
  //   console.log(props.keranjang);
  let [jumlah, setJumlah] = useState(0);
  const table = useRef();

  const calcTotal = () => {
    let jum = 0;
    const row = table.current.children;
    // console.log(row);
    for (const [key, value] of Object.entries(row)) {
      jum += Number(value.lastChild.innerText.split("Rp. ")[1]);
    }
    setJumlah(jum);
  };

  useEffect(() => {
    calcTotal();
  }, []);

  return (
    <form className="form-table">
      <div className="card-body the-table">
        <table className="table table-bordered text-light">
          <thead>
            <tr>
              <th>No</th>
              <th>Detail Pesanan</th>
              <th>Harga</th>
              <th>Jumlah</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody ref={table}>
            {props.keranjang.map((row, index) => {
              return (
                <TableRow
                  key={row.id_product}
                  index={index}
                  nama={row.product_name}
                  price={row.price}
                  many={row.pesanan}
                />
              );
            })}
          </tbody>
          <tfoot>
            <tr className="table table-active table-borderless text-light">
              <td>Total</td>
              <td>Jumlah Pesanan</td>
              <td>Rp. {jumlah}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </form>
  );
};

export default TableOrder;
