<template>
  <div>
    <div class="card-image">
      <div v-if="isAdmin" class="position-absolute top-0 mb-2">
        <button class="button is-small" @click="showAlert(product.id)">
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
      <figure class="image is-4by3">
        <img :src="product.imageUrl" alt="Image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ product.title }}</p>
        </div>
        <div>
          <button
            class="button is-small"
            :title="removeFromFavouriteLabel"
            v-show="product.isFavourite"
            @click="removeFromFavourite(product.id)"
          >
            <span class="icon is-small">
              <i class="fas fa-heart"></i>
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
        </div>
      </div>
      <div class="content is-clearfix">
        <p>{{ product.description.substring(0, 50) }}</p>

        <p class="is-pulled-right">
          <span class="title is-4"
            ><strong>{{ product.price }} RON</strong></span
          >
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
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
          <div class="select is-rounded is-small">
            <select @change="onSelectQuantity(product.id)" v-model="selected">
              <option
                v-for="quantity in quantityArray"
                :value="quantity"
                :key="quantity"
                >{{ quantity }}</option
              >
            </select>
          </div>
        </div>
      </div>
    </div>
    <nuxt-link
      class="details"
      :to="{
        name: 'product_detail-id',
        params: {
          id: product.id,
          title: product.title,
          price: product.price,
          isAddedBtn: product.isAddedBtn,
          isFavourite: product.isFavourite
        }
      }"
    >
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "products",
  props: ["product"],

  data() {
    return {
      addToCartLabel: "Add to cart",
      viewDetailsLabel: "Details",
      removeFromCartLabel: "Remove from cart",
      addToFavouriteLabel: "Add to favourite",
      removeFromFavouriteLabel: "Remove from favourite",
      selected: 1,
      quantityArray: []
    };
  },

  mounted() {
    this.product.quantity <= 0 ? console.log("yes") : null;
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
    isUserLogged() {
      return this.$store.getters.isUserLoggedIn;
    },
    isAdmin() {
      console.log(this.$store.getters.isUserAdmin);
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
    onSelectQuantity(id) {
      let data = {
        id: id,
        quantity: this.selected
      };
      this.$store.commit("quantity", data);
    },
    showAlert(id) {
      const data = {
        show: true,
        id,
        type: "product"
      };
      this.$store.commit("showConfirmDeleteModal", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:hover {
    border: 1px solid #51bafc;
  }
}
.button,
.select {
  z-index: 2;
}
.select {
  position: absolute;
  right: 15px;
  bottom: 35px;
}
.card-content {
  padding: 0;
}
.buttons {
  margin: 0;
}
</style>
