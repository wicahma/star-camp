import React, { Component } from "react";
import syawal from "../../assets/img/sywl.png";
import habib from "../../assets/img/habib.png";
import nizar from "../../assets/img/nizar.png";
import aboutCamp from "../../assets/img/1.png";

export class About extends Component {
  render() {
    return (
      <>
        <section className="jumbotron bg-about">
          <div className="row d-flex justify-content-center align-items-center w-100 h-100">
            <div className="col-sm-12 py-5">
              <h2 className="display-4 Judul text-center pt-5 text-light">
                Star Camp
              </h2>
              <p className="lead text-center text-light">
                Rental / Sewa Alat Camping Murah Jogja
              </p>
            </div>
          </div>
        </section>
        <section id="about" className="desc">
          <div className="container">
            <div className="section">
              <h2 className="text-center">
                Star <span>Camp</span>
              </h2>

              <div className="accordion-button row">
                <div className="accordion-item col-sm-8">
                  <h6 className="align-content-around py-5">
                    STAR CAMP Adalah aplikasi penyewaan alat camping secara
                    online bagi pengguna agar bisa melakukan penyewaan alat
                    camping dengan mudah dari rumah, tidak perlu takut kehabisan
                    stok, dan dapat menikmati kebersamaan dengan keluarga /teman
                    di alam.
                  </h6>
                </div>
                <div className="col-sm-4 mb-5">
                  <img src={aboutCamp} className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-fluid about">
          <h2 className="text-center text-light p-4">Tentang Kami</h2>

          <div className="row card-pesan justify-content-center py-5">
            <div className="col-md-2 col-sm-6">
              <div className="card-about">
                <div className="p-4 kartu">
                  <img
                    className="card-img-top p-3"
                    src={habib}
                    alt="Card image cap"
                  />
                  <div>
                    <h5 className="text-center">Habib Aditya Julianto </h5>
                    <p className="text-center">2000016047</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-6">
              <div className="card-about">
                <div className="p-4 kartu">
                  <img
                    className="card-img-top p-3"
                    src={syawal}
                    alt="Card image cap"
                  />
                  <div>
                    <h5 className="text-center">Syawal Saputra</h5>
                    <p className="text-center">2011016065</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 col-sm-6">
              <div className="card-about">
                <div className="p-4 kartu">
                  <img
                    className="card-img-top p-3"
                    src={nizar}
                    alt="Card image cap"
                  />
                  <div>
                    <h5 className="text-center">Muh. Nizar</h5>
                    <p className="text-center">2011016111</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="page-footer font-small blue pt-3">
          <div className="copyright text-center py-4 text-light ftr">
            &copy; Copyright{" "}
            <strong>
              <span>Star Camp</span>
            </strong>{" "}
            All Crew
          </div>
        </footer>
      </>
    );
  }
}

export default About;
