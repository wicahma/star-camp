import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { BarLoader } from "react-spinners";
import Alert from "./Alert";

const BuktiPembayaranModal = (props) => {
  const [bukti, setBukti] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const clickMe = useRef();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_POINT}pay-detail/order/${props.id_pesanan}`
      )
      .then((res) => {
        setBukti(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const makeAlert = (data) => {
    data(true);
    setTimeout(() => data(false), 1500);
  };

  const handleSendApp = () => {
    setloading(true);
    axios
      .put(`${process.env.REACT_APP_API_POINT}pay/${bukti[0].id_payment}`, {
        payment_status: "Pembayaran berhasil",
      })
      .then((res) => {
        makeAlert(setSuccess);
        setloading(false);
        clickMe.current.click();
      })
      .catch((err) => {
        makeAlert(setError);
        setloading(false);
        clickMe.current.click();
      });
  };

  return (
    <div
      className="modal fade"
      id="modal-bukti-status"
      tabIndex="-1"
      aria-labelledby="modal-bukti-status"
      aria-hidden="true"
    >
      {error ? (
        <Alert alert="Gagal verifikasi pembayaran!" type="alert-danger" />
      ) : null}
      {success ? (
        <Alert alert="Berhasil verifikasi pembayaran!" type="alert-success" />
      ) : null}
      {loading ? (
        <div className="loading">
          <div className="loader">
            <BarLoader
              size={150}
              color={"#123abc"}
              loading={loading}
              speedMultiplier={1.5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : null}
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modal-bukti-status">
              {props.user !== null
                ? props.user.role === "admin"
                  ? "Approval bukti pembayaran"
                  : "Cek Status"
                : "Loading..."}
            </h5>
            <button
              type="button"
              className="close"
              ref={clickMe}
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {props.user !== null ? (
              props.user.role === "admin" ? (
                <>
                  {bukti === null ? (
                    "loading"
                  ) : bukti.length === 0 ? (
                    <p>User belum melakukan pembayaran</p>
                  ) : (
                    bukti.map((data) => {
                      return (
                        <>
                          <h5 className="font-weight-bold">
                            {data.payment_status}
                          </h5>
                          <p className="m-0">Metode : {data.payment_methode}</p>
                          <p className="m-0">Tipe : {data.payment_type}</p>
                          {data.payment_methode === "Transfer" ? (
                            <>
                              <p className="m-0">
                                Nama Rekening : {data.rek_name}
                              </p>
                              <p>Nama Bank : {data.bank_name}</p>
                              <h5 className="font-weight-bold">
                                Bukti Pembayaran
                              </h5>
                              <img
                                src={`https://drive.google.com/uc?export=view&id=${data.payment_proof}`}
                                className="payment-proof"
                              />
                            </>
                          ) : null}
                        </>
                      );
                    })
                  )}
                </>
              ) : (
                <>
                  {bukti === null ? (
                    "loading"
                  ) : bukti.length === 0 ? (
                    <p>
                      Anda belum melakukan pembayaran, silahkan lakukan
                      pembayaran terlebih dahulu
                    </p>
                  ) : (
                    bukti.map((data) => {
                      return (
                        <>
                          <h5 className="font-weight-bold">
                            {data.payment_status}
                          </h5>
                          <p className="m-0">Metode : {data.payment_methode}</p>
                          <p className="m-0">Tipe : {data.payment_type}</p>
                          {data.payment_methode === "Transfer" ? (
                            <>
                              <p className="m-0">
                                Nama Rekening : {data.rek_name}
                              </p>
                              <p>Nama Bank : {data.bank_name}</p>
                              <h5 className="font-weight-bold">
                                Bukti Pembayaran
                              </h5>
                              <img
                                src={`https://drive.google.com/uc?export=view&id=${data.payment_proof}`}
                                className="payment-proof"
                              />
                            </>
                          ) : null}
                        </>
                      );
                    })
                  )}
                </>
              )
            ) : (
              "Loading..."
            )}
          </div>

          <div className="modal-footer">
            {props.user !== null ? (
              props.user.role === "admin" ? (
                <>
                  <button
                    data-dismiss="modal"
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleSendApp()}
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    data-toggle="modal"
                    data-target=""
                    className="btn btn-danger"
                  >
                    Tolak
                  </button>
                </>
              ) : (
                <button
                  data-dismiss="modal"
                  type="button"
                  className="btn btn-success"
                >
                  Oke
                </button>
              )
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(BuktiPembayaranModal);
