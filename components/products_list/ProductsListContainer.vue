<template>
  <div class="columns is-centered is-multiline">
    <div v-if="products.length < 0" class="lds-dual-ring"></div>
    <div
      v-else
      class="card column is-one-quarter"
      v-for="product in products"
      :key="product._id"
    >
      <VmProducts :product="product"></VmProducts>
    </div>
    <div v-if="products.length === 0" class="lds-dual-ring"></div>
  </div>
</template>

<script>
import VmProducts from "../Products";
import { getByTitle } from "@/assets/filters";

export default {
  name: "productsList",

  components: { VmProducts },

  data() {
    return {
      id: "",
      noProductLabel: "No product found",
      productsFiltered: []
    };
  },
  computed: {
    products() {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.state.products;
      }
    }
  },

  methods: {
    getProductByTitle() {
      let listOfProducts = this.$store.state.products,
        titleSearched = this.$store.state.userInfo.productTitleSearched;

      return (this.productsFiltered = getByTitle(
        listOfProducts,
        titleSearched
      ));
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(0, 0, 0);
  border-color: rgb(0, 0, 0) transparent #ff7b00 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
