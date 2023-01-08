export const initialState = {
  dataUser: null,
  validate: false,
  keranjang: JSON.parse(localStorage.getItem("produk")) || [],
  product: [],
  payment: null,
  error: false,
  dataPesanan: null,
};

export default function mainStoreReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, dataUser: action.payload, validate: true };
    case "USER_LOGOUT":
      return {
        ...state,
        dataUser: null,
        validate: false,
      };

    case "PRODUCT_VALUE":
      let data = [...state.keranjang];
      let ind = data.findIndex((product) => product.id_product === action.id);
      let product = data[ind];
      product["pesanan"] = action.value;
      let updateData = [...data];
      updateData.splice(ind, 1, product);
      return { ...state, keranjang: updateData };

    case "DELETE_FROM_KERANJANG":
      let keranjangNew = [...state.keranjang];
      let id = action.id;
      let index = keranjangNew.findIndex(
        (product) => product.id_product === id
      );
      keranjangNew.splice(index, 1);
      return { ...state, keranjang: keranjangNew };

    case "ADD_TO_KERANJANG":
      const found = state.keranjang.find((data) =>
        data.id_product === action.product.id_product ? true : false
      );
      if (!found) {
        let keranjangNew = [...state.keranjang];
        keranjangNew.push(action.product);
        console.log("data berhasil ditambahkan!");
        return { ...state, keranjang: keranjangNew };
      }
      return { ...state, error: true };

    case "DELETE_ERROR":
      return { ...state, error: false };
    case "SET_PAYMENT":
      return { ...state, payment: action.payload };
    case "SET_PESANAN":
      return { ...state, dataPesanan: action.payload };

    default:
      return state;
  }
}
