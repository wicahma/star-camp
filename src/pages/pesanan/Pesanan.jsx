import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { BarLoader } from "react-spinners";
import NoProduct from "../../components/micros/NoProduct";
import PesananDetail from "../../components/micros/PesananDetail";

const Pesanan = (props) => {
  const [order, setOrder] = useState([]);
  const [checker, setChecker] = useState(false);
  const [loading, setloading] = useState(false);
  const path = useLocation().pathname;

  const getAllData = () => {
    setloading(true);
    axios
      .get(`${process.env.REACT_APP_API_POINT}order/${props.user.id_user}`)
      .then((res) => {
        setOrder(res.data.data);
        setloading(false);
      })
      .catch(() => setloading(false));
  };

  const getAdminData = (path) => {
    setloading(true);
    let path_child;
    if (path.includes("semua")) path_child = "s";
    if (path.includes("riwayat")) path_child = "/riwayat";
    axios
      .get(`${process.env.REACT_APP_API_POINT}order${path_child}`)
      .then((res) => {
        setloading(false);
        setOrder(res.data.data);
      })
      .catch((err) => setloading(false));
  };

  useEffect(() => {
    props.user !== null && props.user.role === "admin"
      ? getAdminData(path)
      : getAllData();
  }, [path, checker]);

  const handleDeletePesanan = (id) => {
    setloading(true);
    axios
      .delete(`${process.env.REACT_APP_API_POINT}order/${id}`)
      .then((res) => {
        checker ? setChecker(false) : setChecker(true);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
      });
  };

  const handleDonePesanan = (id) => {
    alert(id);
    setloading(true);
    axios
      .put(`${process.env.REACT_APP_API_POINT}order/${id}`, {
        order_status: "Selesai",
      })
      .then((res) => {
        setloading(false);
        console.log(res);
        checker ? setChecker(false) : setChecker(true);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  };

  if (order.length === 0) {
    return (
      <div className="container">
        {loading ? (
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
        ) : null}
        <NoProduct pesan="Belum ada pesanan!" />;
      </div>
    );
  } else {
    return (
      <>
        <div className="container pesanan-list">
          {loading ? (
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
          ) : null}
          {order.map((data) => {
            return (
              <PesananDetail
                key={data.id_order}
                id={data.id_order}
                nama={data.full_name}
                status={data.order_status}
                tanggal={data.time.slice(0, 10)}
                handleDelete={(id) => handleDeletePesanan(id)}
                handleDone={(id) => handleDonePesanan(id)}
              />
            );
          })}
        </div>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
  keranjang: state.mainStore.keranjang,
  dataPesanan: state.mainStore.dataPesanan,
});

export default connect(mapStateToProps)(Pesanan);
