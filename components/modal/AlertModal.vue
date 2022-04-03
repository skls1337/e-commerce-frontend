<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!isDone" class="modal-card-title">
          {{ title }}
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>

      <section class="modal-card-body">
        <div class="level-item has-text-centered">
          <div>
            <p class="title">Confirm delete item!</p>
            <p class="heading">Are you sure you want to delete this item?</p>
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button type="button" class="button is-primary" @click="deleteItem">
          Yes
        </button>
        <button type="button" class="button is-info" @click="closeModal">
          No
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Confirm delete",
      isDone: false
    };
  },
  computed: {
    openModal() {
      if (this.$store.getters.isConfirmDeleteModal) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    deleteItem() {
      switch (this.$store.state.deleteType) {
        case "user":
          this.deleteUser();
          break;
        case "product":
          this.deleteProduct();
          break;
        default:
          this.closeModal();
          break;
      }
    },
    closeModal() {
      const data = {
        show: false,
        data: {},
        type: ""
      };
      this.$store.commit("showConfirmDeleteModal", data);
    },
    deleteProduct() {
      this.$store.dispatch(
        "deleteProduct",
        this.$store.state.userInfo.selectedForDelete
      );
    },
    deleteUser() {
      this.$store.dispatch(
        "deleteUser",
        this.$store.state.userInfo.selectedForDelete
      );
    }
  }
};
</script>

<style>
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>
