import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import NoProduct from "../../components/micros/NoProduct";
import PesananDetail from "../../components/micros/PesananDetail";

const Pesanan = (props) => {
  const [order, setOrder] = useState([]);
  const [checker, setChecker] = useState(false);
  const path = useLocation().pathname;

  const getAllData = () => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}order/${props.user.id_user}`)
      .then((res) => {
        setOrder(res.data.data);
      });
  };

  const getAdminData = (path) => {
    let path_child;
    if (path.includes("semua")) path_child = "s";
    if (path.includes("riwayat")) path_child = "/riwayat";
    axios
      .get(`${process.env.REACT_APP_API_POINT}order${path_child}`)
      .then((res) => {
        setOrder(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    props.user !== null && props.user.role === "admin"
      ? getAdminData(path)
      : getAllData();
  }, [path, checker]);

  const handleDeletePesanan = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_POINT}order/${id}`)
      .then((res) => {
        console.log(res);
        checker ? setChecker(false) : setChecker(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (order.length === 0) {
    return (
      <div className="container">
        <NoProduct pesan="Belum ada pesanan!" />;
      </div>
    );
  } else {
    return (
      <>
        <div className="container pesanan-list">
          {order.map((data) => {
            return (
              <PesananDetail
                key={data.id_order}
                id={data.id_order}
                nama={data.full_name}
                status={data.order_status}
                tanggal={data.time.slice(0, 10)}
                handleDelete={(id) => handleDeletePesanan(id)}
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
