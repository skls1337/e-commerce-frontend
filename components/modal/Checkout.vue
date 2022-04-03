<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal(false)"
        ></button>
      </header>
      <section class="modal-card-body">
        <div v-if="!isCheckoutSection">
          <div class="box" v-for="product in products" :key="product.id">
            <button
              class="is-pulled-right button is-info is-inverted"
              @click="removeFromCart(product.id)"
            >
              {{ removeLabel }}
            </button>
            <p>
              {{ product.title }}
              {{
                product.selectedQuantity > 0
                  ? ` - Quantity: ${product.selectedQuantity}`
                  : ""
              }}
            </p>
            <p>{{ product.price }} &euro;</p>
          </div>
          <div v-if="products.length === 0">
            <p>{{ cartEmptyLabel }}</p>
          </div>
        </div>
        <div v-if="isCheckoutSection">
          <p>You will be redirect to checkout page</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          v-show="products.length > 0 && !isCheckoutSection"
          class="button is-success"
          @click="onNextBtn"
        >
          {{ buyLabel }}
        </button>
        <button
          v-if="isCheckoutSection"
          class="button is-success"
          @click="closeModal(true)"
        >
          {{ closeLabel }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
export default {
  name: "checkout",

  data() {
    return {
      modalTitle: "Checkout",
      removeLabel: "Remove from cart",
      cartEmptyLabel: "Your cart is empty",
      closeLabel: "Close",
      isCheckoutSection: false,
      stripe: null
    };
  },
  async mounted() {
    this.stripe = await loadStripe("pk_test_51KgU5vDYWQXfM6IOywACLjOW7BKCxB5bMEH9zPLt7ptCAoyeG6NwvdRIw2wQtRQgxQQydAWYbPXQt15ndVFEDIfd00iTBlwCTl");
  },
  computed: {
    products() {
      return this.$store.getters.productsAdded;
    },
    openModal() {
      if (this.$store.getters.isCheckoutModalOpen) {
        return true;
      } else {
        return false;
      }
    },
    buyLabel() {
      let totalProducts = this.products.length,
        productsAdded = this.$store.getters.productsAdded,
        pricesArray = [],
        productLabel = "",
        finalPrice = "",
        quantity = 1;

      productsAdded.forEach(product => {
        if (product.selectedQuantity >= 1) {
          quantity = product.selectedQuantity;
        }

        pricesArray.push(product.price * quantity); // get the price of every product added and multiply quantity
      });

      finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices

      if (totalProducts > 1) {
        // set plural or singular
        productLabel = "products";
      } else {
        productLabel = "product";
      }
      return `Buy ${totalProducts} ${productLabel} at ${finalPrice} RON`;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  },

  methods: {
    closeModal(reloadPage) {
      this.$store.commit("showCheckoutModal", false);

      if (reloadPage) {
        window.location.reload();
      }
    },
    removeFromCart(id) {
      let data = {
        id: id,
        status: false
      };
      this.$store.commit("removeFromCart", id);
      this.$store.commit("setAddedBtn", data);
    },
    onNextBtn() {
      console.log(process.env.API_PROD_URL);
      if (this.isUserLoggedIn) {
        const productsAdded = this.$store.getters.productsAdded;
        const productsLineItems = [];
        productsAdded.forEach(p => {
          const q = 1;
          if (p.selectedQuantity == undefined) {
            p.selectedQuantity = q;
          }
          productsLineItems.push({
            price: p.productStripe.id,
            quantity: p.selectedQuantity
          });
        });
        this.stripe.redirectToCheckout({
          successUrl: "https://velvety-puppy-9a9a95.netlify.app/success",
          cancelUrl: "https://velvety-puppy-9a9a95.netlify.app/",
          lineItems: productsLineItems,
          mode: "payment"
        });
        const products = [];
        productsAdded.forEach(p => {
          const q = 1;
          if (p.selectedQuantity == undefined) {
            p.selectedQuantity = q;
          }
          products.push({
            description: p.title,
            price: p.price,
            quantity: p.selectedQuantity,
            "tax-rate": 0
          });
        });
        const productsForOrder = [];
        productsAdded.forEach(p => {
          const q = 1;
          if (p.selectedQuantity == undefined) {
            p.selectedQuantity = q;
          }
          productsForOrder.push({
            productId: p.id,
            quantity: p.selectedQuantity
          });
        });
        const data = {
          client: {
            address: this.$store.state.userInfo.address,
            zip: this.$store.state.userInfo.zip,
            country: this.$store.state.userInfo.country,
            city: this.$store.state.userInfo.city
          },
          products: products,
          to: this.$store.state.userInfo.email
        };
        const orderData = {
          shippingAddress: this.$store.state.userInfo.address,
          zip: this.$store.state.userInfo.zip,
          country: this.$store.state.userInfo.country,
          city: this.$store.state.userInfo.city,
          phone: this.$store.state.userInfo.phone,
          products: productsForOrder,
          userId: this.$store.state.userInfo.userId
        };
        this.$store.dispatch("emitInvoice", data);
        this.$store.dispatch("createOrder", orderData);
        this.isCheckoutSection = true;
      } else {
        this.$store.commit("showCheckoutModal", false);
        this.$store.commit("showLoginModal", true);
      }
    },
    onPrevBtn() {
      this.isCheckoutSection = false;
    }
  }
};
</script>
