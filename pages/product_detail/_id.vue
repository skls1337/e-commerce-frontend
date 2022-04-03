<template>
  <div class="section">
    <div class="card is-clearfix columns">
      <figure class="card-image is-480x480 column is-one-thirds">
        <img :src="product.imageUrl" />
      </figure>
      <div class="card-content column is-two-thirds">
        <div class="card-content__title">
          <h2 class="title is-4">
            {{ product.title }}
            <button
              class="button is-small"
              :title="removeFromFavouriteLabel"
              v-show="product.isFavourite"
              @click="removeFromFavourite(product.id)"
            >
              <span class="icon is-small">
                <i class="fa fa-heart"></i>
              </span>
            </button>
            <button
              class="button is-small"
              :title="addToFavouriteLabel"
              v-show="!product.isFavourite"
              @click="saveToFavorite(product.id)"
            >
              <span class="icon is-small">
                <i class="far fa-heart"></i>
              </span>
            </button>
          </h2>
        </div>
        <div class="card-content__text">
          <h2 class="title is-5">Description</h2>
          <p>
            {{ product.description }}
          </p>
        </div>
        <div class="card-content__reviews">
          <div class="is-pulled-left" v-if="isAdmin">
            <div class="card-content__title">
              <h3 class="title is-4 mb-2">
                Available quantity: {{ product.quantity }}
              </h3>
            </div>
            <div class="field flex">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="['input']"
                  placeholder="Available Stock"
                  name="stockAmount"
                  type="number"
                  v-model="stockAmount"
                  min="0"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-sort-amount-up"></i>
                </span>
              </p>
            </div>
            <button class="button is-primary" @click="changeStock(product.id)">
              Change stock
            </button>
          </div>
          <div class="select is-rounded is-small is-pulled-right">
            <select @change="onSelectQuantity(product.id)" v-model="selected">
              <option
                v-for="quantity in quantityArray"
                :key="quantity"
                :value="quantity"
                >{{ quantity }}</option
              >
            </select>
          </div>
        </div>
        <div class="card-content__price is-pulled-left">
          <span class="title is-3"
            ><strong>{{ product.price }} RON</strong></span
          >
        </div>
        <div v-if="isAdmin" class="card-content__btn is-pulled-right ml-6">
          <button class="button is-info" @click="showEditModal">
            Edit
          </button>
        </div>
        <div class="card-content__btn is-pulled-right">
          <div v-if="!product.isAddedToCart">
            <button
              v-if="product.quantity > 0"
              class="button is-primary"
              @click="addToCart(product.id)"
            >
              {{ addToCartLabel }}
            </button>
            <button v-else class="button is-text">
              Out of stock
            </button>
          </div>
          <div v-else>
            <button
              class="button is-text"
              v-if="product.isAddedToCart"
              @click="removeFromCart(product.id, false)"
            >
              {{ removeFromCartLabel }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="card is-clearfix columns">
        <div class="card-content column is-two-thirds">
          <div class="card-content__title">
            <h2 class="title is-4 ml-5">Product Specification</h2>
          </div>
          <div class="card-content ml-5">
            <p>{{ product.specifications }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product_detail-id",

  data() {
    return {
      addToCartLabel: "Add to cart",
      removeFromCartLabel: "Remove from cart",
      addToFavouriteLabel: "Add to favourite",
      removeFromFavouriteLabel: "Remove from favourite",
      stockAmount: 0,
      product: {},
      selected: 1,
      quantityArray: []
    };
  },

  mounted() {
    this.product = this.$store.getters.getProductById(this.$route.params.id);
    console.log(this.product);
    if (!this.product) {
      this.$router.push("/");
    }
    if (this.product.quantity < 20) {
      for (let i = 1; i <= this.product.quantity; i++) {
        this.quantityArray.push(i);
      }
    } else {
      for (let i = 1; i <= 20; i++) {
        this.quantityArray.push(i);
      }
    }
  },

  computed: {
    isAddedBtn() {
      return this.product.isAddedBtn;
    },
    isAdmin() {
      return this.$store.getters.isUserAdmin;
    }
  },

  methods: {
    addToCart(id) {
      let data = {
        id: id,
        status: true
      };
      this.$store.commit("addToCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected
      };
      this.$store.commit("quantity", data);
    },
    saveToFavorite(id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn;

      if (isUserLogged) {
        this.$store.commit("addToFavourite", id);
      } else {
        this.$store.commit("showLoginModal", true);
      }
    },
    removeFromFavourite(id) {
      this.$store.commit("removeFromFavourite", id);
    },
    changeStock(id) {
      const data = {
        id,
        quantity: this.stockAmount
      };
      this.$store.dispatch("changeStock", { data });
      this.resetStock();
      this.$router.push({ name: "index" });
    },
    resetStock() {
      this.stockAmount = 0;
    },
    showEditModal() {
      const data = {
        show: true,
        product: this.product
      };
      this.$store.commit("showEditProductModal", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-content {
  padding: 15px 10px 15px 0;

  &__text {
    margin: 15px 0;
  }
  &__reviews {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
