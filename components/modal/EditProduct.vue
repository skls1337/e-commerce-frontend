<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!isEditFinish" class="modal-card-title">
          {{ editFinishTitle }}
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="closeModal(false)"
        ></button>
      </header>
      <form @submit="checkForm" action="#" method="post">
        <section class="modal-card-body">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                :class="[highlightProductName ? 'input is-danger' : 'input']"
                placeholder="Product name"
                name="prodName"
                v-model="productName"
                @keyup="checkProduct(productName)"
              />
              <span class="icon is-small is-left">
                <i class="fa fa-file-signature"></i>
              </span>
              <span
                v-if="highlightProductName !== null"
                class="icon is-small is-right"
              >
                <i
                  :class="[
                    highlightProductName
                      ? 'fa fa-exclamation-circle'
                      : 'fa fa-check'
                  ]"
                ></i>
              </span>
            </p>
            <p v-if="highlightProductName" class="help is-danger">
              Valid product name is required
            </p>
          </div>
          <!-- Product Description -->
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <textarea
                :class="[
                  highlightProductDescription ? 'input is-danger' : 'input'
                ]"
                placeholder="Product description"
                name="prodDescr"
                v-model="productDescription"
                @keyup="checkProductDescription(productDescription)"
              />
              <span class="icon is-small is-left">
                <i class="fa fa-file-signature"></i>
              </span>
              <span
                v-if="highlightProductDescription !== null"
                class="icon is-small is-right"
              >
                <i
                  :class="[
                    highlightProductDescription
                      ? 'fa fa-exclamation-circle'
                      : 'fa fa-check'
                  ]"
                ></i>
              </span>
            </p>
            <p v-if="highlightProductDescription" class="help is-danger">
              Valid product description is required
            </p>
          </div>

          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <textarea
                :class="['input']"
                placeholder="Product specification"
                name="prodSpec"
                v-model="productSpecifications"
              />
              <span class="icon is-small is-left">
                <i class="fa fa-file-signature"></i>
              </span>
            </p>
          </div>

          <!-- Product price -->
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                :class="[highlightProductPrice ? 'input is-danger' : 'input']"
                placeholder="Product price"
                name="prodPrice"
                type="number"
                v-model="productPrice"
                min="0"
                @keyup="checkProductPrice(productPrice)"
              />
              <span class="icon is-small is-left">
                <i class="fa fa-money-bill"></i>
              </span>
              <span
                v-if="highlightProductPrice !== null"
                class="icon is-small is-right"
              >
                <i
                  :class="[
                    highlightProductPrice
                      ? 'fa fa-exclamation-circle'
                      : 'fa fa-check'
                  ]"
                ></i>
              </span>
            </p>
            <p v-if="highlightProductPrice" class="help is-danger">
              Valid product price is required
            </p>
          </div>

          <!-- Product quantity -->
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                :class="[
                  highlightProductQuantity ? 'input is-danger' : 'input'
                ]"
                placeholder="Product quantity"
                name="prodQuantity"
                type="number"
                v-model="productQuantity"
                min="0"
                @keyup="checkProductQuantity(productQuantity)"
              />
              <span class="icon is-small is-left">
                <i class="fa fa-sort-amount-up"></i>
              </span>
              <span
                v-if="highlightProductQuantity !== null"
                class="icon is-small is-right"
              >
                <i
                  :class="[
                    highlightProductQuantity
                      ? 'fa fa-exclamation-circle'
                      : 'fa fa-check'
                  ]"
                ></i>
              </span>
            </p>
            <p v-if="highlightProductQuantity" class="help is-danger">
              Valid product quantity is required
            </p>
          </div>

          <!-- Product image -->
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                :class="['input']"
                placeholder="Product Image Url"
                name="prodImageUrl"
                v-model="productImageUrl"
              />
              <span class="icon is-small is-left">
                <i class="fa fa-image"></i>
              </span>
            </p>
          </div>
          <div class="card column is-one-quarter">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="productImageUrl" alt="" />
              </figure>
            </div>
          </div>

          <!-- <div v-if="error">
            <p class="help is-danger">Invalid Login</p>
          </div> -->
        </section>
        <footer class="modal-card-foot">
          <button type="button" class="button is-info" @click="editProduct">
            Save Product
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: "",
      productDescription: "",
      productSpecifications: "",
      productPrice: "",
      productQuantity: "",
      productImageUrl: "",
      highlightProductName: null,
      highlightProductDescription: null,
      highlightProductPrice: null,
      highlightProductQuantity: null,
      highlightProductImageUrl: null,
      isFormSuccess: false,
      isEditFinish: null,
      editFinishTitle: "Edit product"
    };
  },
  computed: {
    openModal() {
      if (this.$store.getters.isEditProductModal) {
        this.productName = this.$store.state.editProduct.title;
        this.productDescription = this.$store.state.editProduct.description;
        this.productSpecifications = this.$store.state.editProduct.specifications;
        this.productPrice = this.$store.state.editProduct.price;
        this.productQuantity = this.$store.state.editProduct.quantity;
        this.productImageUrl = this.$store.state.editProduct.imageUrl;
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    closeModal(reloadPage) {
      this.$store.commit("showEditProductModal", false, {});

      if (reloadPage) {
        window.location.reload();
      }
    },
    checkProduct(productValue) {
      if (productValue.length < 50 && productValue.length > 1) {
        this.highlightProductName = false;
      } else {
        this.highlightProductName = true;
      }
    },
    checkProductDescription(producDescriptiontValue) {
      if (
        producDescriptiontValue.length < 500 &&
        producDescriptiontValue.length > 1
      ) {
        this.highlightProductDescription = false;
      } else {
        this.highlightProductDescription = true;
      }
    },
    checkProductPrice(producPriceValue) {
      if (producPriceValue > 0) {
        this.highlightProductPrice = false;
      } else {
        this.highlightProductPrice = true;
      }
    },
    checkProductQuantity(producQuantityValue) {
      if (producQuantityValue > 0) {
        this.highlightProductQuantity = false;
      } else {
        this.highlightProductQuantity = true;
      }
    },
    create() {
      if (this.checkForm() == true) {
        const data = {
          title: this.productName,
          description: this.productDescription,
          price: this.productPrice,
          quantity: this.productQuantity,
          imageUrl: this.productImageUrl
        };
        this.$store.dispatch("createProduct", { data });
        this.$router.push({ name: "index" });
      }
    },
    checkForm() {
      if (!this.productName) {
        this.highlightProductName = true;
        return false;
      } else {
        this.highlightProductName = false;
      }
      if (!this.productDescription) {
        this.highlightProductDescription = true;
        return false;
      } else {
        this.highlightProductDescription = false;
      }
      if (!this.productPrice) {
        this.highlightProductPrice = true;
        return false;
      } else {
        this.highlightProductPrice = false;
      }
      if (!this.productQuantity) {
        this.highlightProductQuantity = true;
        return false;
      } else {
        this.highlightProductQuantity = false;
      }
      return true;
    },
    editProduct() {
      const data = {
        id: this.$store.state.editProduct.id,
        quantity: this.productQuantity,
        price: this.productPrice,
        title: this.productName,
        imageUrl: this.productImageUrl,
        description: this.productDescription,
        specifications: this.productSpecifications,
        loading: false
      };
      this.$store.dispatch("editProduct", data);
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style lang="scss">
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>
