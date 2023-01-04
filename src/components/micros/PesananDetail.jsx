import React from "react";
import { Link } from "react-router-dom";

const PesananDetail = (props) => {
  return (
    <div className="container-fluid">
      <div className="card order2">
        <div className="card-body d-flex justify-content-between">
          <h6 className="text-light">
            <b>{props.nama}</b>
          </h6>
          <h6 className="text-light font-weight-light">
            <b>Rp. {props.hargaTotal}</b>
          </h6>
          <h6 className="text-light font-weight-light">
            <b>{props.tanggal}</b>
          </h6>
          <h6 className="text-light font-weight-light">
            <b>{props.id}</b>
          </h6>
          <h6 className="text-light font-weight-light">
            <b>{props.status}</b>
          </h6>
        </div>
        <div className="ml-3 mb-3">
          <Link
            to={`/pesanan-detail/${props.id}`}
            state={{
              id_pesanan: props.id,
              tanggal: props.tanggal,
              status: props.status,
            }}
            className="btn btn-light"
          >
            {" "}
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PesananDetail;
