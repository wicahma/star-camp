import React from "react";
import { connect } from "react-redux";
import CardModal from "../micros/CardModal";

const CardProduct = (props) => {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="card-product">
        <div className="kartu">
          <img
            className="card-img-top"
            src={`https://drive.google.com/uc?export=view&id=${props.img}`}
            alt="Card image cap"
          />
        </div>
        <h5 className="card-title">{props.title}</h5>

        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target={`#Modal${props.id}`}
        >
          Detail
        </button>
        <CardModal
          id={props.id}
          img={props.img}
          title={props.title}
          stock={props.stock}
          price={props.price}
          comp={props.comp}
          dispatch={props.dispatch}
          product={props.product}
          error={props.error}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  keranjang: state.mainStore.keranjang,
});

export default connect(mapStateToProps)(CardProduct);
