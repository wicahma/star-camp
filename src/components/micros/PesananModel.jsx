import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import BuktiPembayaranModal from "./BuktiPembayaranModal";
import PembatalanModal from "./PembatalanModal";
import PembayaranModal from "./PembayaranModal";
import TableRow from "./TableRow";
import TransferModal from "./TransferModal";

const PesananModel = (props) => {
  let detailPesanan = useRef();
  const location = useLocation();
  const table = useRef();
  const [jumlah, setJumlah] = useState(0);
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState([]);
  const [pembayaran, setPembayaran] = useState(true);
  const data = {
    id_pesanan: location.state.id_pesanan,
    tanggal: location.state.tanggal,
    status: location.state.status,
  };

  const getPesanan = () => {
    axios
      .get(`http://localhost:5000/api/order-detail/${data.id_pesanan}`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getProduct = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkpembayaran = () => {
    axios
      .get(`http://localhost:5000/api/pay-detail/order/${data.id_pesanan}`)
      .then((res) => {
        res.data.data.length !== 0 && setPembayaran(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calcTotal = () => {
    let jum = 0;
    const row = table.current.children;
    for (const [key, value] of Object.entries(row)) {
      jum += Number(value.lastChild.innerText.split("Rp. ")[1]);
    }
    setJumlah(jum);
  };

  const statusCheck = () => {
    data.status === "Menunggu verifikasi pembatalan"
      ? detailPesanan.current.classList.add("d-none")
      : detailPesanan.current.classList.remove("d-none");
  };

  useEffect(() => {
    statusCheck();
    getProduct();
    getPesanan();
    checkpembayaran();
  }, []);

  useEffect(() => {
    jumlah === 0 ? calcTotal() : console.log("Hitungan Selesai");
  }, [product]);

  return (
    <div className="card order2">
      <div className="card-header">
        <h5 className="text-light">
          <b>DETAIL PESANAN</b>
        </h5>
      </div>
      <div className="card-body">
        <h6 className="text-light float-right">Tanggal Sewa</h6>
        <h6 className="text-light p-2">{props.user.full_name}</h6>
        <h6 className="text-light float-right">{data.tanggal}</h6>
        <h6 className="text-light p-2">{props.user.address}</h6>
        <h6 className="text-light p-2">{props.user.phone}</h6>
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
            {orders.map((order, index) => {
              let prod = product.find(
                (data) => data.id_product == order.id_product
              );
              return (
                <TableRow
                  key={order.id_order_detail}
                  index={index + 1}
                  many={order.jumlah}
                  nama={prod.product_name}
                  price={prod.price}
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

      <div
        ref={detailPesanan}
        className="d-flex justify-content-between card-footer text-muted"
      >
        <div>
          <button
            type="button"
            className="btn btn-warning"
            data-toggle="modal"
            data-target="#modal-bukti-status"
          >
            {props.user !== null
              ? props.user.role === "admin"
                ? "Lihat Bukti Pembayaran"
                : "Cek Status Pembayaran"
              : null}
          </button>
        </div>
        <div className="flex-shrink">
          {pembayaran && (
            <button
              data-toggle="modal"
              data-target="#modal-bayar"
              className="btn btn-light float-right ml-2"
            >
              Pembayaran
            </button>
          )}
          <button
            data-toggle="modal"
            data-target="#modal-batal"
            className="btn btn-light float-right"
          >
            Batalkan
          </button>
        </div>
      </div>
      <PembayaranModal id_pesanan={data.id_pesanan} />
      <PembatalanModal id_pesanan={data.id_pesanan} />
      <TransferModal id_pesanan={data.id_pesanan} />
      <BuktiPembayaranModal id_pesanan={data.id_pesanan} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(PesananModel);
