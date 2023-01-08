import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const PembatalanModal = (props) => {
  let clickMe = useRef();
  let [batal, setBatal] = useState(null);
  let [redirect, setRedirect] = useState(null);

  const handleBatal = () => {
    const orderStat =
      props.user.role === "admin"
        ? "Dibatalkan"
        : "Menunggu verifikasi pembatalan";
    console.log(props.user.role);
    clickMe.current.click();
    axios
      .put(`${process.env.REACT_APP_API_POINT}order/${props.id_pesanan}`, {
        order_status: orderStat,
      })
      .then((res) => {
        console.log(res);
        setRedirect(
          props.user.role === "admin" ? (
            <Navigate to={"/pesanan/semua"} />
          ) : (
            <Navigate to={`/pesanan/${props.user.username}`} />
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChange = (e) => {
    setBatal(e.target.value);
  };

  useEffect(() => {
    console.log(batal);
  }, [batal]);

  return (
    <div
      className="modal fade"
      id="modal-batal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      {redirect}
      {props.user === null || props.user === undefined ? null : props.user
          .role === "admin" ? (
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content modal-batal">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Pembatalan Admin
              </h5>
              <button
                type="button"
                ref={clickMe}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h6>Anda yakin ingin membatalkan pesanan ini?</h6>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => handleBatal()}
                type="button"
                data-dismiss="modal"
                className="btn btn-danger"
              >
                Batalkan
              </button>
              <button
                data-dismiss="modal"
                type="button"
                className="btn btn-primary"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content modal-batal">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Pilih Alasan Pembatalan
              </h5>
              <button
                type="button"
                ref={clickMe}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="">
                <fieldset
                  id="pembatalan"
                  className="row"
                  onChange={(e) => handleOnChange(e)}
                >
                  <div className="col-md-6">
                    <input
                      type="radio"
                      id="1"
                      value="Tidak jadi memesan"
                      name="pembatalan"
                    />
                    <label htmlFor="1">Tidak jadi memesan</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      id="2"
                      value="Ingin merubah pesanan"
                      name="pembatalan"
                    />
                    <label htmlFor="2">Ingin merubah pesanan</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      id="3"
                      value="Ingin merubah tanggal sewa"
                      name="pembatalan"
                    />
                    <label htmlFor="3">Ingin merubah tanggal sewa</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      id="4"
                      value="Ingin merubah nama pemesan"
                      name="pembatalan"
                    />
                    <label htmlFor="4">Ingin merubah nama pemesan</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      id="5"
                      value="Berubah pikiran"
                      name="pembatalan"
                    />
                    <label htmlFor="5">Berubah pikiran</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="radio"
                      id="6"
                      value="Lain lain"
                      name="pembatalan"
                    />
                    <label htmlFor="6">Lain lain</label>
                  </div>
                </fieldset>
              </form>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => handleBatal()}
                type="button"
                className="btn btn-danger"
              >
                Batalkan
              </button>
              <button type="button" className="btn btn-primary">
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(PembatalanModal);
