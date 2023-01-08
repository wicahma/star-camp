import axios from "axios";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import Alert from "./Alert";

const TransferModal = (props) => {
  const [payment, setPayment] = useState({
    bank_name: "",
    bukti_bayar: "",
    date: "",
    rek_name: "",
  });
  const [loading, setloading] = useState(false);
  const [checker, setChecker] = useState(false);
  const [success, setSuccess] = useState(false);
  const clickMe = useRef();
  const navigate = useNavigate();

  const makeAlert = (data) => {
    data(true);
    setTimeout(() => data(false), 1500);
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    const paymentNew = { ...payment };
    if (id === "bukti_bayar") {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };
      paymentNew[id] = img;
      return setPayment(paymentNew);
    }
    paymentNew[id] = value;
    setPayment(paymentNew);
  };

  const handleSendPayment = (id) => {
    axios
      .post(`${process.env.REACT_APP_API_POINT}pay`, {
        id_user: props.user.id_user,
        id_payment_detail: id,
        payment_status: "Menunggu verifikasi pembayaran",
      })
      .then((res) => {
        console.log("berhasil merubah data", res);
        makeAlert(setSuccess);
        setloading(false);
        navigate(`/pesanan/${props.user.username}`);
        clickMe.current.click();
      })
      .catch((err) => console.log(err));
  };

  const handleSendAPI = (pay) => {
    setloading(true);
    let form = new FormData();
    form.append("file", payment.bukti_bayar.data);
    axios
      .post(`${process.env.REACT_APP_API_POINT}pay-detail-img`, form)
      .then((res) => {
        axios
          .post(`${process.env.REACT_APP_API_POINT}pay-detail`, {
            id_order: props.id_pesanan,
            bank_name: pay.bank_name,
            rek_name: pay.rek_name,
            date: pay.date,
            payment_type: props.payment.payment_bill,
            payment_methode: props.payment.payment_method,
            payment_proof: res.data.response.data.id,
          })
          .then((res) => {
            console.log(res);
            handleSendPayment(res.data.data.insertId);
          })
          .catch((err) => setloading(false));
      })
      .catch((err) => setloading(false));
  };

  const handleCheck = (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (value === "") {
        return makeAlert(setChecker);
      }
      setChecker(false);
    }
    if (data.bukti_bayar === "") return makeAlert(setChecker);
    return handleSendAPI(data);
  };

  return (
    <div
      className="modal fade"
      id="modal-bayar-transfer"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
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
      {/* {redirect}     */}
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content modal-batal">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Isi Keterangan Transfer
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
            <input
              list="banks"
              name="bank"
              id="bank_name"
              onChange={(e) => handleOnChange(e)}
              className="m-3"
              placeholder="Pilih Bank"
            />
            <datalist id="banks">
              <option value="Bank Mandiri">Bank Mandiri</option>
              <option value="BCA">Bank BCA</option>
              <option value="BNI">Bank BNI</option>
              <option value="BRI">Bank BRI</option>
              <option value="BTN">Bank BTN</option>
              <option value="BSI">Bank BSI</option>
            </datalist>
            <form>
              <div className="form-group">
                <label for="nama" className="col-sm-3 text-dark col-form-label">
                  <b className="text-dark">Nama</b>
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    id="rek_name"
                    onChange={(e) => handleOnChange(e)}
                    name="nama"
                    className="form-control"
                    placeholder="Masukkan Nama"
                  />
                </div>
              </div>

              <div className="form-group">
                <label for="tts" className="col-sm-3 col-form-label">
                  <b className="text-dark">Tanggal Transfer</b>
                </label>
                <div className="col-sm-6">
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => handleOnChange(e)}
                      id="date"
                      placeholder="Pilih Tanggal Sewa"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group text-dark">
                <label for="bukti_bayar">
                  <b className="m-3">Upload Bukti Pembayaran</b>
                </label>
                <input
                  type="file"
                  onChange={(e) => handleOnChange(e)}
                  className="form-control-file m-3"
                  id="bukti_bayar"
                />
              </div>
            </form>
            {checker ? (
              <Alert alert="Isi data yang masih kosong!" type="alert-danger" />
            ) : null}
            {success ? (
              <Alert alert="Pembayaran berhasil dibuat!" type="alert-success" />
            ) : null}
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
              onClick={() => handleCheck(payment)}
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
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(TransferModal);
