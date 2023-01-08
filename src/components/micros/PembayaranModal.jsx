import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

const PembayaranModal = (props) => {
  let clickMe = useRef();
  const transfer = useRef();
  let [payment, setPayment] = useState({});
  let [redirect, setRedirect] = useState(null);
  const handleOnChange = (e) => {
    const value = e.target.value;
    const id = e.target.id.split("-")[0];
    let newPayment = { ...payment };
    id === "metode"
      ? (newPayment["payment_method"] = value)
      : (newPayment["payment_bill"] = value);
    setPayment(newPayment);
  };

  const fetchPayment = () => {
    axios
      .put(`${process.env.REACT_APP_API_POINT}order/${props.id_pesanan}`, {
        order_status: "Menunggu pembayaran",
      })
      .then((res) => {
        console.log(res);
        setRedirect(<Navigate to={`/pesanan/${props.user}`} />);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNext = (data) => {
    if (Object.keys(data).length < 2) {
      console.log("Pilih pilihan terlebih dahulu");
    } else if (data.payment_method === "Tunai") {
      fetchPayment();
      clickMe.current.click();
    } else {
      clickMe.current.click();
      console.log("acieee tf");
      console.log(transfer);
      transfer.current.dataset.target = "#modal-bayar-transfer";
      transfer.current.click();
    }
  };

  useEffect(() => {
    props.dispatch({ type: "SET_PAYMENT", payload: payment });
  }, [payment]);

  return (
    <div
      className="modal fade"
      id="modal-bayar"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      {redirect}
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content modal-batal">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Pilih Jenis Pembayaran
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
                id="jenis-pembayaran"
                className="row"
                onChange={(e) => handleOnChange(e)}
              >
                <div className="col-md-6">
                  <input
                    type="radio"
                    id="pembayaran-1"
                    value="DP"
                    name="jenis-pembayaran"
                  />
                  <label htmlFor="pembayaran-1">Pembayaran DP</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="radio"
                    id="pembayaran-2"
                    value="Tagihan"
                    name="jenis-pembayaran"
                  />
                  <label htmlFor="pembayaran-2">Pembayaran Tagihan</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="radio"
                    id="pembayaran-3"
                    value="Lunas"
                    name="jenis-pembayaran"
                  />
                  <label htmlFor="pembayaran-3">Pembayaran Lunas</label>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Pilih Metode Pembayaran
            </h5>
          </div>
          <div className="modal-body">
            <form className="">
              <fieldset
                id="metode-pembayaran"
                className="row"
                onChange={(e) => handleOnChange(e)}
              >
                <div className="col-md-6">
                  <input
                    type="radio"
                    id="metode-1"
                    value="Tunai"
                    name="metode-pembayaran"
                  />
                  <label htmlFor="metode-1">Tunai</label>
                </div>
                <div className="col-md-6">
                  <input
                    type="radio"
                    id="metode-2"
                    value="Transfer"
                    name="metode-pembayaran"
                  />
                  <label htmlFor="metode-2">Transfer</label>
                </div>
              </fieldset>
            </form>
          </div>

          <div className="modal-footer">
            <button
              data-dismiss="modal"
              type="button"
              className="btn btn-primary"
            >
              Batal
            </button>

            <button
              type="button"
              data-toggle="modal"
              data-target=""
              ref={transfer}
              onClick={() => handleNext(payment)}
              className="btn btn-primary"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  payment: state.mainStore.payment,
  user: state.mainStore.dataUser.username,
});

export default connect(mapStateToProps)(PembayaranModal);
