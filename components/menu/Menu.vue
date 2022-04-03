<template>
  <div>
    <div class="navbar-item">
      <div class="field is-grouped">
        <p class="control">
          <a v-if="!isUserLoggedIn" class="button" @click="showSignupModal">
            <span class="icon">
              <i class="fa fa-user-plus"></i>
            </span>
            <span>{{ signupLabel }}</span>
          </a>
        </p>
        <p class="control">
          <a v-if="!isUserLoggedIn" class="button" @click="showLoginModal">
            <span class="icon">
              <i class="fa fa-user"></i>
            </span>
            <span>{{ loginLabel }}</span>
          </a>
        </p>
      </div>
    </div>
    <div v-if="isUserLoggedIn" class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link"> Welcome {{ getUserName }} </a>
      <div class="navbar-dropdown is-boxed">
        <nuxt-link class="navbar-item" :to="{ name: 'user-wishlist' }">
          {{ wishlistLabel }}
        </nuxt-link>
        <hr class="navbar-divider" />
        <nuxt-link class="navbar-item" :to="{ name: 'orders' }">
          {{ ordersLabel }}
        </nuxt-link>
        <div v-if="isAdmin">
          <hr class="navbar-divider" />
          <nuxt-link class="navbar-item" :to="{ name: 'admin' }">
            {{ adminPanelLabel }}
          </nuxt-link>
          <hr class="navbar-divider" />
          <nuxt-link class="navbar-item" :to="{ name: 'users' }">
            {{ usersLabel }}
          </nuxt-link>
        </div>
        <hr class="navbar-divider" />
        <a class="navbar-item" @click="showModal">
          {{ editProfileLabel }}
        </a>
        <hr class="navbar-divider" />
        <a class="navbar-item" @click="logout">
          {{ logoutLabel }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VmMenu",
  data() {
    return {
      wishlistLabel: "Wishlist",
      adminPanelLabel: "Create Product",
      ordersLabel: "Orders",
      logoutLabel: "Log out",
      loginLabel: "Log in",
      signupLabel: "Sign up",
      editProfileLabel: "Edit profile",
      usersLabel: "Users List"
    };
  },

  computed: {
    isAdmin() {
      return this.$store.getters.isUserAdmin;
    },
    isUserLoggedIn() {
      this.$store.dispatch("isUserLoggedIn");
      return this.$store.state.userInfo.isLoggedIn;
    },
    getUserName() {
      let name = this.$store.getters.getUserName;

      if (name === "") {
        return "user";
      } else {
        return name;
      }
    }
  },
  mounted() {
    this.$store.dispatch("getProducts");
    this.$store.dispatch("getUsers");
  },

  methods: {
    showModal() {
      const userProfileData = {
        name: this.$store.state.userInfo.name,
        city: this.$store.state.userInfo.city,
        zip: this.$store.state.userInfo.zip,
        country: this.$store.state.userInfo.country,
        address: this.$store.state.userInfo.address,
        phone: this.$store.state.userInfo.phone,
        id: this.$store.state.userInfo.userId
      };
      const data = {
        show: true,
        userProfile: userProfileData
      };
      this.$store.commit("showEditProfileModal", data);
    },
    logout() {
      this.$store.commit("isUserLoggedIn", false);
      this.$store.commit("isUserSignedUp", false);
      this.$store.commit("removeProductsFromFavourite");
      window.localStorage.removeItem("token");
      this.$store.commit("FINISH_EDIT");
    },
    showLoginModal() {
      this.$store.commit("showLoginModal", true);
    },
    showSignupModal() {
      this.$store.commit("showSignupModal", true);
    }
  }
};
</script>
