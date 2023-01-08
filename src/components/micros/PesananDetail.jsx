import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const PesananDetail = (props) => {
  return (
    <div className="container-fluid">
      <div className="order2">
        <div className="card-body d-flex justify-content-between">
          <h6 className="text-dark">
            <b>{props.nama}</b>
          </h6>
          <h6 className="text-dark font-weight-light">
            <b>{props.status}</b>
          </h6>
        </div>
        <div className="mx-3 pb-3">
          <div className="d-flex justify-content-between">
            <Link
              to={`/pesanan-detail/${props.id}`}
              state={{
                id_pesanan: props.id,
                tanggal: props.tanggal,
                status: props.status,
              }}
              className="btn btn-blue"
            >
              Detail
            </Link>
            {props.user !== null
              ? props.user.role === "admin" && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-toggle="modal"
                    data-target="#modal-hapus"
                  >
                    Hapus Pesanan
                  </button>
                )
              : null}
          </div>
        </div>
        <div
          class="modal fade"
          id="modal-hapus"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modal-hapus-Label"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modal-hapus-Label">
                  Pesanan ID-{props.id}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Data akan hilang selamanya, apakah anda yakin untuk menghapus
                Pesanan?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Tidak
                </button>
                <button
                  type="button"
                  data-dismiss="modal"
                  onClick={() => props.handleDelete(props.id)}
                  class="btn btn-danger"
                >
                  Ya, hapus pesanan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.mainStore.dataUser,
});

export default connect(mapStateToProps)(PesananDetail);
