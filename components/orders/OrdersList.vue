<template>
  <div class="section">
    <h3 class="title">Orders</h3>
    <div v-if="orders.length > 0">
      <div v-for="order in orders" :key="order._id">
        <h3 class="subtitle">Order id: {{ order._id }}</h3>
        <hr class="navbar-divider" />
        <h3 class="subtitle">Products</h3>
        <div class="columns is-centered is-multiline flex">
          <div
            class="card column is-one-quarter"
            v-for="product in order.products"
            :key="product.productId"
          >
            <ProductFromOrder :product="product" />
          </div>
        </div>
        <GrandTotal :order="order" />
      </div>
    </div>
    <div v-else>
      <div class="section">
        <p>No Orders found</p>
      </div>
    </div>
  </div>
</template>

<script>
import ProductFromOrder from "./ProductFromOrder.vue";
import GrandTotal from "../GrandTotal.vue";
export default {
  data() {
    return {
      total: 0
    };
  },
  components: {
    ProductFromOrder,
    GrandTotal
  },
  mounted() {
    if (this.$store.state.userInfo.isAdmin) {
      this.$store.dispatch("getAllOrders");
    } else {
      this.$store.dispatch("getMyOrders");
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    grandTotal(order) {
      let grandTotal = 0;
      order.products.forEach(p => {
        const product = this.$store.getters.getProductById(p.productId);
        if (p) {
          grandTotal += product.price * p.quantity;
        }
      });

      return grandTotal;
    }
  },
  methods: {}
};
</script>

<style></style>
