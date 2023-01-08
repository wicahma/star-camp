import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";
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
  const [jumlahPesanan, setJumlahPesanan] = useState(0);
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
      .get(`${process.env.REACT_APP_API_POINT}order-detail/${data.id_pesanan}`)
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getProduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}products`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkpembayaran = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_POINT}pay-detail/order/${data.id_pesanan}`
      )
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
      jum += Number(value.lastChild.lastChild.innerText.split("Rp. ")[1]);
    }
    console.log(row);
    setJumlah(jum);
  };

  const calcPesanan = () => {
    let jum = 0;
    const row = table.current.children;
    for (const [key, value] of Object.entries(row)) {
      jum += Number(value.lastChild.lastChild.id);
    }
    setJumlahPesanan(jum);
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
    setTimeout(() => {
      jumlah === 0 ? calcTotal() : console.log("Hitungan harga Selesai");
      jumlahPesanan === 0
        ? calcPesanan()
        : console.log("Hitungan pesanan Selesai");
    }, 2000);
  }, [orders]);

  return (
    <div className="container-sm mt-5">
      <div className="order2">
        <div className="text-center pt-2">
          <h5 className="text-dark">
            <b>DETAIL PESANAN</b>
          </h5>
        </div>
        <div className="card-body">
          <h6 className="text-dark float-right">Tanggal Sewa</h6>
          <h6 className="text-dark p-2">{props.user.full_name}</h6>
          <h6 className="text-dark float-right">{data.tanggal}</h6>
          <h6 className="text-dark p-2">{props.user.address}</h6>
          <h6 className="text-dark p-2">{props.user.phone}</h6>

          <div ref={table} className="px-2">
            {orders.length !== 0 && product.length !== 0 ? (
              orders.map((order, index) => {
                let prod = product.find(
                  (data) => data.id_product === order.id_product
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
              })
            ) : (
              <div className="loading">
                <div className="loader">
                  <BarLoader
                    size={150}
                    color={"#123abc"}
                    loading={true}
                    speedMultiplier={1.5}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <h5>Total biaya</h5>
            <h5>
              Rp.{" "}
              {jumlah === 0 ? (
                <div className="loading">
                  <div className="loader">
                    <BarLoader
                      size={150}
                      color={"#123abc"}
                      loading={true}
                      speedMultiplier={1.5}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                </div>
              ) : (
                jumlah
              )}
            </h5>
          </div>
          <div className="d-flex justify-content-between">
            <h5>Total pesanan</h5>
            <h5>
              {jumlahPesanan === 0 ? (
                <div className="loading">
                  <div className="loader">
                    <BarLoader
                      size={150}
                      color={"#123abc"}
                      loading={true}
                      speedMultiplier={1.5}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                </div>
              ) : (
                jumlahPesanan
              )}
            </h5>
          </div>
        </div>

        <div
          ref={detailPesanan}
          className="d-flex justify-content-between card-footer text-muted"
        >
          <div>
            {!pembayaran && (
              <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target="#modal-bukti-status"
              >
                {props.user !== null
                  ? props.user.role === "admin"
                    ? "Lihat Bukti"
                    : "Cek Status"
                  : null}
              </button>
            )}
          </div>
          <div className="flex-shrink">
            {pembayaran && (
              <button
                data-toggle="modal"
                data-target="#modal-bayar"
                className="btn btn-blue float-right ml-2"
              >
                Pembayaran
              </button>
            )}
            <button
              data-toggle="modal"
              data-target="#modal-batal"
              className="btn btn-danger float-right"
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(PesananModel);
