import React from "react";
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
  error,
}) => {
  const handleAddProduct = (product) => {
    // console.log(error);
    dispatch({ type: "ADD_TO_KERANJANG", product: product });
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
      {/* <Alert type="alert-danger" alert="data sudah dimasukkan " /> */}
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel1">
              Produk Kami
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
            <center>
              <img
                className="card m-4"
                src={`https://drive.google.com/uc?export=view&id=${img}`}
                alt="Card image cap"
                width="200px"
              />
              <h6 className="card-title text-center">
                <b> {title}</b>
              </h6>
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
