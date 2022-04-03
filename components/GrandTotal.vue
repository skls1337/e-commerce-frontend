<template>
  <h1>Grand Total: {{ grandTotal }} RON</h1>
</template>

<script>
export default {
  props: ["order"],
  computed: {
    grandTotal() {
      let grandTotal = 0;
      this.order.products.forEach(p => {
        const product = this.$store.getters.getProductById(p.productId);
        if (product) {
          grandTotal += product.price * p.quantity;
        }
      });

      return grandTotal;
    }
  }
};
</script>

<style></style>
