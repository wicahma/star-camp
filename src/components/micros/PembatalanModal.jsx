import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const PembatalanModal = (props) => {
  let clickMe = useRef();
  let [batal, setBatal] = useState(null);
  let [redirect, setRedirect] = useState(null);

  const handleBatal = () => {
    console.log("Menunggu verifikasi pembatalan");
    clickMe.current.click();
    axios
      .put(`http://localhost:5000/api/order/${props.id_pesanan}`, {
        order_status: "Menunggu verifikasi pembatalan",
      })
      .then((res) => {
        console.log(res);
        setRedirect(<Navigate to={"/pesanan"} />);
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
      <div className="modal-dialog ">
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
              className="btn btn-primary"
            >
              Batalkan
            </button>
            <Link>
              <button type="button" className="btn btn-primary">
                Pembayaran
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PembatalanModal;
