import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import Alert from "./Alert";

const CardModal = ({
  id,
  img,
  title,
  stock,
  price,
  comp,
  product,
  dispatch,
}) => {
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const makeAlert = (data) => {
    data(true);
    setTimeout(() => data(false), 1500);
  };

  const handleAddProduct = (product) => {
    const products = JSON.parse(localStorage.getItem("produk")) || [];
    if (
      products.find((data) => data.id_product === product.id_product) !==
      undefined
    )
      return makeAlert(setError);
    products.push(product);
    localStorage.setItem("produk", JSON.stringify(products));
    dispatch({ type: "ADD_TO_KERANJANG", product: product });
    return makeAlert(setSucces);
  };

  return (
    <div
      key={id}
      className="modal fade"
      id={`Modal${id}`}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel1"
      aria-hidden="true"
    >
      {error === true ? (
        <Alert type="alert-danger" alert="Produk sudah ada di keranjang!" />
      ) : null}
      {succes === true ? (
        <Alert type="alert-success" alert="Produk berhasil ditambahkan!" />
      ) : null}
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div> */}
          <div className="modal-body">
            <center>
              <img
                className="image-product"
                src={`https://drive.google.com/uc?export=view&id=${img}`}
                alt="Card image cap"
                width="200px"
              />
              <h5 className="text-center font-weight-bold mt-2">{title}</h5>
              <h6 className="card-title text-center">Detail Produk</h6>
              <hr size="50%" color="black" />
              <h6 className="text-left">
                Harga : Rp. {price}
                <b className="float-right">kelengkapan:</b>
              </h6>
              <h6 className="text-left">
                Stok: {stock} <b className="float-right">{comp}</b>
              </h6>

              <div className="modal-footer justify-content-center p-4">
                <button
                  onClick={() => handleAddProduct(product)}
                  className="btn btn-primary"
                >
                  Tambahkan Ke Keranjang
                </button>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.mainStore.error,
});

export default connect(mapStateToProps)(CardModal);
