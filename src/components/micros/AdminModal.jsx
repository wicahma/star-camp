import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import tambah from "../../assets/img/addProduct.svg";
import order from "../../assets/img/order.svg";
import riwayat from "../../assets/img/riwayat.svg";

const AdminModal = (props) => {
  const { pathname } = useLocation();
  const clickMe = useRef();

  useEffect(() => {
    clickMe.current.click();
  }, [pathname]);

  return (
    <>
      <div
        className="modal fade"
        id="adminModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="adminModalTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="adminModalTitle">
                Pilih Action
              </h5>
              <button
                ref={clickMe}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body row align-items-end">
              <div className="col-sm-12 col-md-4">
                <div className="mx-auto text-center">
                  <div className="mb-3">
                    <img src={tambah} alt="gambar" className="img-fluid" />
                  </div>
                  <button
                    className="btn btn-blue"
                    data-toggle="modal"
                    data-target="#tambah-product-modal"
                    onClick={() => clickMe.current.click()}
                  >
                    Tambah Product
                  </button>
                </div>
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="mx-auto text-center">
                  <div className="mb-3">
                    <img src={order} alt="gambar" className="img-fluid" />
                  </div>
                  <Link to={"/pesanan/semua"}>
                    <button className="btn btn-blue">List Pesanan</button>
                  </Link>
                </div>
              </div>
              <div className="col-sm-12 col-md-4">
                <div className="mx-auto text-center">
                  <div className="mb-3">
                    <img src={riwayat} alt="gambar" className="img-fluid" />
                  </div>
                  <Link to={"/pesanan/riwayat"}>
                    <button className="btn btn-blue">Riwayat Pesanan</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModal;
