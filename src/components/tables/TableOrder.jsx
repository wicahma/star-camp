import React, { createRef, useEffect, useRef, useState } from "react";
import TableRow from "../micros/TableRow";

const TableOrder = (props) => {
  const [jumlah, setJumlah] = useState(0);
  const [jumlahPesanan, setJumlahPesanan] = useState(0);

  const table = useRef();

  const calcTotal = () => {
    let jum = 0;
    const row = table.current.children;
    for (const [key, value] of Object.entries(row)) {
      jum += Number(value.lastChild.lastChild.innerText.split("Rp. ")[1]);
    }
    setJumlah(jum);
  };

  const calcPesanan = () => {
    let jum = 0;
    const row = table.current.children;
    console.log(row);
    for (const [key, value] of Object.entries(row)) {
      jum += Number(value.lastChild.lastChild.id);
    }
    setJumlahPesanan(jum);
  };

  useEffect(() => {
    jumlah === 0 && calcTotal();
    jumlahPesanan === 0 && calcPesanan();
  }, []);

  return (
    <div className="card-body p-0">
      <div ref={table}>
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
      </div>
      <div className="d-flex justify-content-between">
        <h5>Total biaya</h5>
        <h5>Rp. {jumlah}</h5>
      </div>
      <div className="d-flex justify-content-between">
        <h5>Total pesanan</h5>
        <h5>{jumlahPesanan}</h5>
      </div>
    </div>
  );
};

export default TableOrder;
