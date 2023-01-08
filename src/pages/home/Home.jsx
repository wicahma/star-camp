import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import CardProduct from "../../components/cards/CardProduct";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  handleGetProduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_POINT}products`)
      .then((res) => {
        this.setState({
          products: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.handleGetProduct();
  }

  render() {
    return (
      <>
        <section className="jumbotron warna-bg">
          <div className="row d-flex justify-content-center align-items-center w-100 h-100">
            <div className="col-sm-12 py-5">
              <h2 className="display-4 Judul text-center pt-5 text-light">
                Star Adventure
              </h2>
              <p className="lead text-center text-light">
                Rental / Sewa Alat Camping Murah Jogja
              </p>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="row card-pesan">
            {this.state.products.map((product) => {
              return (
                <CardProduct
                  key={product.id_product}
                  id={product.id_product}
                  title={product.product_name}
                  img={product.image}
                  price={product.price}
                  stock={product.stock}
                  comp={product.kelengkapan}
                  product={product}
                />
              );
            })}
          </div>
        </div>
        <footer className="page-footer font-small blue pt-5">
          <div className="copyright text-center py-4 text-light footer">
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
