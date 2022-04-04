<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="prod.imageUrl" alt="Image" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ prod.title }}</p>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>{{ prod.description }}</p>
        <p class="is-pulled-right">
          <span class="title is-4"
            ><strong>{{ prod.price }} RON</strong></span
          >
        </p>
          <p>Amount bought: {{ product.quantity }}</p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      prod: {}
    };
  },
  mounted() {
    this.prod = this.$store.getters.getProductById(this.product.productId);
  },
  computed: {
    theProduct() {
      return this.$store.getters.getProductById(this.product.productId);
    }
  }
};
</script>

<style></style>
