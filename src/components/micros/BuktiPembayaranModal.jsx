import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const BuktiPembayaranModal = (props) => {
  const [bukti, setBukti] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/pay-detail/order/${props.id_pesanan}`)
      .then((res) => {
        setBukti(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className="modal fade"
      id="modal-bukti-status"
      tabIndex="-1"
      aria-labelledby="modal-bukti-status"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
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
