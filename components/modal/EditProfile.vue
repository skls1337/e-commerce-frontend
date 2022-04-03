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
          <div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightNameWithError ? 'input is-danger' : 'input'
                  ]"
                  type="text"
                  :placeholder="namePlaceholder"
                  v-model="name"
                  @keyup="checkNameOnKeyUp(name)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
                <span
                  v-if="highlightNameWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightNameWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightNameWithError" class="help is-danger">
                {{ nameErrorLabel }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightAddressWithError ? 'input is-danger' : 'input'
                  ]"
                  :placeholder="addressPlaceholder"
                  v-model="address"
                  @keyup="checkAddress(address)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-city"></i>
                </span>
                <span
                  v-if="highlightAddressWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightAddressWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightAddressWithError" class="help is-danger">
                {{ invalidAddress }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightCityWithError ? 'input is-danger' : 'input'
                  ]"
                  :placeholder="cityPlaceholder"
                  v-model="city"
                  @keyup="checkCity(city)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-city"></i>
                </span>
                <span
                  v-if="highlightCityWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightCityWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightCityWithError" class="help is-danger">
                {{ invalidCity }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightZipWithError ? 'input is-danger' : 'input']"
                  :placeholder="zipPlaceholder"
                  v-model="zip"
                  @keyup="checkZip(zip)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-city"></i>
                </span>
                <span
                  v-if="highlightZipWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightZipWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightZipWithError" class="help is-danger">
                {{ invalidZip }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightCountryWithError ? 'input is-danger' : 'input'
                  ]"
                  :placeholder="countryPlaceholder"
                  v-model="country"
                  @keyup="checkCountry(country)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-flag-usa"></i>
                </span>
                <span
                  v-if="highlightCountryWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightCountryWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightCountryWithError" class="help is-danger">
                {{ invalidCountry }}
              </p>
            </div>

            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightPhoneWithError ? 'input is-danger' : 'input'
                  ]"
                  :placeholder="phonePlaceholder"
                  v-model="phone"
                  @keyup="checkPhone(phone)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-phone"></i>
                </span>
                <span
                  v-if="highlightPhoneWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightPhoneWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightPhoneWithError" class="help is-danger">
                {{ invalidPhone }}
              </p>
            </div>
          </div>
          <div v-if="error">
            <p class="help is-danger">Some error occured</p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button type="button" class="button is-info" @click="editProfile">
            Save
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
      modalTitle: "Sign up",
      modalTitleRegistered: "Welcome ",
      primaryBtnLabel: "Sign up",
      btnRegisteredLabel: "Close",
      namePlaceholder: "Name*",
      addressPlaceholder: "Address*",
      cityPlaceholder: "City*",
      zipPlaceholder: "Zip*",
      phonePlaceholder: "Phone*",
      countryPlaceholder: "Country*",
      notEqualErrorLabel: "Passwords must be equal",
      passwordErrorLabel: "Password required",
      nameErrorLabel: "Name required",
      emailErrorLabel: "Email required",
      emailNotValidLabel: "Valid email required",
      invalidAddress: "Invalid address",
      invalidCity: "Invalid city",
      invalidZip: "Invalid zip code",
      invalidCountry: "Invalid country",
      invalidPhone: "Invalid phone number",
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      city: "",
      zip: "",
      country: "",
      address: "",
      phone: "",
      id: "",
      highlightNameWithError: null,
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      highlightRepeatPasswordWithError: null,
      highlightAddressWithError: null,
      highlightCityWithError: null,
      highlightCountryWithError: null,
      highlightZipWithError: null,
      highlightPhoneWithError: null,
      isFormSuccess: false,
      isEditFinish: null,
      editFinishTitle: "Edit profile"
    };
  },
  computed: {
    error() {
      return this.$store.state.errorSystemInfo.errorRaised;
    },
    openModal() {
      if (this.$store.getters.isEditProfileModal) {
        this.name = this.$store.state.editProfile.name;
        this.city = this.$store.state.editProfile.city;
        this.zip = this.$store.state.editProfile.zip;
        this.country = this.$store.state.editProfile.country;
        this.address = this.$store.state.editProfile.address;
        this.phone = this.$store.state.editProfile.phone;
        this.id = this.$store.state.editProfile.id;
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    closeModal() {
      const data = {
        show: false,
        userProfile: {}
      };
      this.$store.commit("showEditProfileModal", data);
    },
    checkForm(e) {
      e.preventDefault();

      if (this.name) {
        this.$store.commit("setUserName", this.name);
      }

      if (!this.name) {
        this.highlightNameWithError = true;
      } else {
        this.highlightNameWithError = false;
      }
    },
    checkNameOnKeyUp(nameValue) {
      if (nameValue) {
        this.highlightNameWithError = false;
      } else {
        this.highlightNameWithError = true;
      }
    },
    checkAddress(addressValue) {
      if (addressValue.length < 6) {
        this.highlightAddressWithError = true;
      } else {
        this.highlightAddressWithError = false;
      }
    },
    checkCity(cityValue) {
      if (cityValue.length <= 4) {
        this.highlightCityWithError = true;
      } else {
        this.highlightCityWithError = false;
      }
    },
    checkZip(zipValue) {
      if (zipValue.length < 6) {
        this.highlightZipWithError = true;
      } else {
        this.highlightZipWithError = false;
      }
    },
    checkCountry(countryValue) {
      if (countryValue.length <= 4) {
        this.highlightCountryWithError = true;
      } else {
        this.highlightCountryWithError = false;
      }
    },
    checkPhone(phoneValue) {
      if (phoneValue.length != 10) {
        this.highlightPhoneWithError = true;
      } else {
        this.highlightPhoneWithError = false;
      }
    },
    editProfile() {
      const data = {
        city: this.city,
        address: this.address,
        zip: this.zip,
        phone: this.phone,
        country: this.country,
        name: this.name,
        id: this.id
      };
      this.$store.dispatch("editProfile", data);
      if (!this.$store.state.errorSystemInfo.errorRaised) {
        this.isFormSuccess = true;
      } else {
        this.isFormSuccess = false;
      }
    }
  }
};
</script>

<style></style>
