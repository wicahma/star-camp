import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { BarLoader } from "react-spinners";
import Alert from "./Alert";

const TambahProductModal = (props) => {
  const clickMe = useRef();
  const [produk, setProduk] = useState({
    product_name: "",
    kelengkapan: "",
    price: "",
    stock: "",
    image: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);

  const makeAlert = (data) => {
    data(true);
    setTimeout(() => data(false), 1500);
  };

  const handleInput = (e) => {
    const id = e.target.id;
    let value;
    if (id === "image") {
      value = e.target.files[0];
    } else {
      value = e.target.value;
    }
    setProduk({ ...produk, [id]: value });
  };

  const handleCheckData = (produk) => {
    let checker = false;
    for (const [key, value] of Object.entries(produk)) {
      if (value === "" || value === undefined) {
        makeAlert(setError);
        checker = true;
        break;
      }
    }
    return checker;
  };

  const handleSendData = () => {
    const form = new FormData();
    form.append("file", produk.image);
    form.append("product", JSON.stringify(produk));
    if (handleCheckData(produk)) {
      console.log("KOSONG");
    } else {
      setloading(true);
      axios
        .post(`${process.env.REACT_APP_API_POINT}product`, form)
        .then(() => {
          makeAlert(setSuccess);
          setloading(false);
        })
        .catch(() => {
          makeAlert(setErrorUpload);
          setloading(false);
        });
    }
  };

  return (
    <div
      className="modal fade"
      id="tambah-product-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="tambah-product-modalTitle"
      aria-hidden="true"
    >
      {error ? (
        <Alert alert="Isi form yang masih kosong!" type="alert-danger" />
      ) : null}
      {success ? (
        <Alert alert="Data produk berhasil ditambahkan!" type="alert-success" />
      ) : null}
      {errorUpload ? (
        <Alert alert="Data produk gagal ditambahkan!" type="alert-danger" />
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
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="tambah-product-modalTitle">
              Tambah Produk
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
          <div className="modal-body">
            <form className="row">
              <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="product_name">Nama produk</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleInput(e)}
                  id="product_name"
                  placeholder="Masukkan nama produk camping"
                />
              </div>
              <div className="form-group col-sm-12 col-md-6">
                <label htmlFor="price">Harga Sewa</label>
                <input
                  type="number"
                  onChange={(e) => handleInput(e)}
                  className="form-control"
                  id="price"
                  placeholder="Berikan harga per hari"
                />
              </div>
              <div className="form-group col-sm-12 col-md-8">
                <label htmlFor="kelengkapan">Kelengkapan</label>
                <textarea
                  type="text"
                  onChange={(e) => handleInput(e)}
                  className="form-control"
                  id="kelengkapan"
                  placeholder="Tuliskan kelengkapan dari produk"
                />
              </div>
              <div className="form-group col-sm-12 col-md-4">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  onChange={(e) => handleInput(e)}
                  className="form-control"
                  min={1}
                  max={300}
                  id="stock"
                  placeholder="Stock barang yang ada"
                />
              </div>
              <div className="form-group col-sm-12">
                <label htmlFor="image">Tambahkan gambar untuk produk</label>
                <input
                  type="file"
                  onChange={(e) => handleInput(e)}
                  className="form-control-file"
                  id="image"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleSendData()}
              className="btn btn-success"
              //   data-dismiss="modal"
            >
              Tambahkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahProductModal;
