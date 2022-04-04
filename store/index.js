import api from "../api/api";
import { v4 as uuidv4 } from "uuid";
const uuid = uuidv4();
export const state = () => ({
  products: [
    // {
    //   id: 1,
    //   title: "Product 1",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 50,
    //   ratings: 3,
    //   reviews: 5,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 2,
    //   title: "Product 2",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 35,
    //   ratings: 5,
    //   reviews: 10,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 3,
    //   title: "Product 3",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 110,
    //   ratings: 2,
    //   reviews: 3,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 4,
    //   title: "Product 4",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 50,
    //   ratings: 1,
    //   reviews: 0,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 5,
    //   title: "Product 5",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 35,
    //   ratings: 4,
    //   reviews: 2,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 6,
    //   title: "Product 6",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 110,
    //   ratings: 5,
    //   reviews: 1,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 7,
    //   title: "Product 7",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 50,
    //   ratings: 5,
    //   reviews: 7,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 8,
    //   title: "Product 8",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 35,
    //   ratings: 3,
    //   reviews: 0,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // },
    // {
    //   id: 9,
    //   title: "Product 9",
    //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //   price: 110,
    //   ratings: 4,
    //   reviews: 2,
    //   isAddedToCart: false,
    //   isAddedBtn: false,
    //   isFavourite: false,
    //   quantity: 1
    // }
  ],
  orders: [],
  users: [],
  editProduct: {},
  editProfile: {},
  deleteType: "",
  userInfo: {
    isLoggedIn: false,
    isSignedUp: false,
    hasSearched: false,
    name: "",
    address: "",
    zip: "",
    country: "",
    city: "",
    email: "",
    productTitleSearched: "",
    userId: "",
    isAdmin: false,
    selectedForDelete: ""
  },
  systemInfo: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false,
    openEditProductModal: false,
    openEditProfileModal: false,
    openConfirmDeleteProductModal: false
  },
  errorSystemInfo: {
    errorMessage: "",
    errorRaised: false
  }
});

export const getters = {
  productsAdded: state => {
    return state.products.filter(el => {
      return el.isAddedToCart;
    });
  },
  productsAddedToFavourite: state => {
    return state.products.filter(el => {
      return el.isFavourite;
    });
  },
  getProductById: state => id => {
    return state.products.find(product => product._id == id);
  },
  isUserLoggedIn: state => {
    return state.userInfo.isLoggedIn;
  },
  isUserAdmin: state => {
    return state.userInfo.isAdmin;
  },
  isUserSignedUp: state => {
    return state.userInfo.isSignedUp;
  },
  getUserName: state => {
    return state.userInfo.name;
  },
  isLoginModalOpen: state => {
    return state.systemInfo.openLoginModal;
  },
  isSignupModalOpen: state => {
    return state.systemInfo.openSignupModal;
  },
  isCheckoutModalOpen: state => {
    return state.systemInfo.openCheckoutModal;
  },
  isEditProductModal: state => {
    return state.systemInfo.openEditProductModal;
  },
  isEditProfileModal: state => {
    return state.systemInfo.openEditProfileModal;
  },
  isConfirmDeleteModal: state => {
    return state.systemInfo.openConfirmDeleteProductModal;
  },
  quantity: state => {
    return state.products.quantity;
  },
  getUserById: state => id => {
    console.log(state.users);
    return state.users.find(user => user._id == id);
  }
};

export const mutations = {
  addToCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = true;
      }
    });
  },
  setAddedBtn: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.isAddedBtn = data.status;
      }
    });
  },
  removeFromCart: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isAddedToCart = false;
      }
    });
  },
  removeProductsFromFavourite: state => {
    state.products.filter(el => {
      el.isFavourite = false;
    });
  },
  isUserLoggedIn: (state, isUserLoggedIn) => {
    state.userInfo.isLoggedIn = isUserLoggedIn;
  },
  isUserSignedUp: (state, isSignedUp) => {
    state.userInfo.isSignedUp = isSignedUp;
  },
  setHasUserSearched: (state, hasSearched) => {
    state.userInfo.hasSearched = hasSearched;
  },
  setUserName: (state, name) => {
    state.userInfo.name = name;
  },
  setProductTitleSearched: (state, titleSearched) => {
    state.userInfo.productTitleSearched = titleSearched;
  },
  showLoginModal: (state, show) => {
    state.systemInfo.openLoginModal = show;
  },
  showSignupModal: (state, show) => {
    state.systemInfo.openSignupModal = show;
  },
  showCheckoutModal: (state, show) => {
    state.systemInfo.openCheckoutModal = show;
  },
  showEditProductModal: (state, data) => {
    state.systemInfo.openEditProductModal = data.show;
    state.editProduct = data.product;
  },
  showEditProfileModal: (state, data) => {
    state.systemInfo.openEditProfileModal = data.show;
    state.editProfile = data.userProfile;
  },
  showConfirmDeleteModal: (state, data) => {
    state.systemInfo.openConfirmDeleteProductModal = data.show;
    state.userInfo.selectedForDelete = data.id;
    state.deleteType = data.type;
  },
  addToFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = true;
      }
    });
  },
  removeFromFavourite: (state, id) => {
    state.products.forEach(el => {
      if (id === el.id) {
        el.isFavourite = false;
      }
    });
  },
  quantity: (state, data) => {
    state.products.forEach(el => {
      if (data.id === el.id) {
        el.selectedQuantity = data.quantity;
      }
    });
  },
  setAdmin: state => {
    state.userInfo.isAdmin = false;
  },
  SET_USER(state, authUser) {
    state.authUser = authUser;
  },
  SET_ORDERS(state, payload) {
    state.orders = payload;
  },
  SET_PRODUCTS(state, products) {
    products.forEach(p => {
      p.id = p._id;
      p.isAddedToCart = false;
      p.isAddedBtn = false;
      p.isFavourite = false;
    });
    state.products = products;
  },
  ADD_PRODUCT(state, payload) {
    state.products.push(payload.data.data);
    window.location.reload();
  },
  AUTH(state, payload) {
    if (payload.success) {
      state.errorSystemInfo.errorMessage = "";
      state.errorSystemInfo.errorRaised = false;
      state.userInfo.isLoggedIn = true;
      state.userInfo.isSignedUp = true;
      window.localStorage.setItem("token", payload.token);
    } else {
      state.errorSystemInfo.errorMessage = payload.message;
      state.errorSystemInfo.errorRaised = true;
      state.userInfo.isLoggedIn = false;
      state.userInfo.isSignedUp = false;
    }
  },
  UPDATE_USER_INFO(state, payload) {
    if (payload.success) {
      state.userInfo.isLoggedIn = true;
      state.userInfo.city = payload.data.city;
      state.userInfo.address = payload.data.address;
      state.userInfo.zip = payload.data.zip;
      state.userInfo.country = payload.data.country;
      state.userInfo.phone = payload.data.phone;
      state.userInfo.name = payload.data.name;
    }
  },
  IS_AUTH(state, payload) {
    if (payload.success) {
      state.userInfo.isLoggedIn = true;
      state.userInfo.city = payload.data.city;
      state.userInfo.address = payload.data.address;
      state.userInfo.zip = payload.data.zip;
      state.userInfo.country = payload.data.country;
      state.userInfo.phone = payload.data.phone;
      state.userInfo.name = payload.data.name;
      state.userInfo.userId = payload.data._id;
      state.userInfo.email = payload.data.email;
      if (payload.data.role == "admin") {
        state.userInfo.isAdmin = true;
      } else {
        state.userInfo.isAdmin = false;
      }
    } else {
      state.userInfo.isLoggedIn = false;
    }
  },
  FINISH_EDIT() {
    window.location.reload();
  },
  GET_USERS(state, payload) {
    if (payload.success) {
      state.users = payload.data;
    }
  }
};

export const actions = {
  getProducts({ commit }) {
    api.get("/products").then(response => {
      commit("SET_PRODUCTS", response.data.data);
    });
  },
  login({ commit }, { email, password }) {
    api
      .post("/auth/login", { email, password })
      .then(response => {
        commit("AUTH", response.data);
      })
      .catch(err => {
        const payload = {
          success: false,
          error: err.message
        };
        commit("AUTH", payload);
        commit("FINISH_EDIT");
      });
  },
  createProduct({ commit }, { data }) {
    api
      .post("/products", {
        quantity: data.quantity,
        price: data.price,
        description: data.description,
        title: data.title,
        imageUrl: data.imageUrl,
        specifications: data.specifications
      })
      .then(response => {
        commit("ADD_PRODUCT", response);
      });
  },
  register({ commit }, { data }) {
    api
      .post("/auth/register", {
        email: data.email,
        password: data.password,
        city: data.city,
        address: data.address,
        zip: data.zip,
        phone: data.phone,
        country: data.country,
        name: data.name
      })
      .then(response => {
        commit("AUTH", response.data);
        commit("FINISH_EDIT");
      })
      .catch(err => {
        const payload = {
          success: false,
          error: err.message
        };
        commit("AUTH", payload);
      });
  },
  emitInvoice({ commit }, data) {
    api
      .post("/invoice/send-invoice", {
        sender: {
          company: "Vericu SRL",
          address: "Str. Masinii Puternice",
          zip: "1234 AG",
          city: "Pitesti",
          country: "ROMANIA"
        },
        client: data.client,
        information: {
          number: uuid.toString().substring(0, 10),
          date: Date.now().toString()
        },
        products: data.products,
        settings: {
          currency: "RON"
        },
        to: data.to
      })
      .catch(err => {
        console.log(err);
      });
  },
  isUserLoggedIn({ commit }) {
    api
      .get("/auth/me")
      .then(response => {
        commit("IS_AUTH", response.data);
      })
      .catch(err => {
        const payload = {
          success: false,
          error: err.message
        };
        commit("IS_AUTH", payload);
      });
  },
  changeStock({ commit }, { data }) {
    api
      .put(`/products/${data.id}`, {
        quantity: data.quantity
      })
      .then(() => {
        commit("FINISH_EDIT");
      });
  },
  getMyOrders({ commit }) {
    api.get("/orders/my-orders").then(response => {
      commit("SET_ORDERS", response.data.data);
    });
  },
  createOrder({ commit }, data) {
    api.post("/orders", {
      phone: data.phone,
      country: data.country,
      shippingAddress: data.shippingAddress,
      name: data.name,
      userId: data.userId,
      products: data.products
    });
  },
  editProduct({ commit }, data) {
    api
      .put(`/products/${data.id}`, {
        quantity: data.quantity,
        price: data.price,
        description: data.description,
        title: data.title,
        imageUrl: data.imageUrl,
        specifications: data.specifications
      })
      .then(response => {
        commit("showEditProductModal", false, {});
      });
  },
  editProfile({ commit }, data) {
    api
      .put(`/users/${data.id}`, {
        city: data.city,
        address: data.address,
        zip: data.zip,
        phone: data.phone,
        country: data.country,
        name: data.name
      })
      .then(response => {
        commit("UPDATE_USER_INFO", response.data);
        commit("FINISH_EDIT");
      });
  },
  deleteProduct({ commit }, id) {
    api.delete(`products/${id}`).then(() => {
      const data = {
        show: false,
        id: ""
      };
      commit("showConfirmDeleteModal", data);
      commit("FINISH_EDIT");
    });
  },
  getUsers({ commit }) {
    api.get("/users").then(response => {
      commit("GET_USERS", response.data);
    });
  },
  deleteUser({ commit }, id) {
    api.delete(`/users/${id}`).then(() => {
      const data = {
        show: false,
        id: ""
      };
      commit("showConfirmDeleteModal", data);
      commit("FINISH_EDIT");
    });
  },
  getAllOrders({ commit }) {
    api.get("/orders").then(response => {
      commit("SET_ORDERS", response.data.data);
    });
  }
};
