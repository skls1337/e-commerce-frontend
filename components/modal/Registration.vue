<template>
  <div :class="[openModal ? 'is-active' : '', 'modal']">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!isUserSignedUp" class="modal-card-title">{{ modalTitle }}</p>
        <p v-if="isUserSignedUp" class="modal-card-title">
          {{ modalTitleRegistered }}
        </p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <form @submit="checkForm" action="#" method="post">
        <section class="modal-card-body">
          <div v-if="!isUserSignedUp">
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
                    highlightEmailWithError ? 'input is-danger' : 'input'
                  ]"
                  type="email"
                  :placeholder="emailPlaceholder"
                  name="emailName"
                  v-model="email"
                  @keyup="checkEmailOnKeyUp(email)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                <span
                  v-if="highlightEmailWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightEmailWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightEmailWithError" class="help is-danger">
                {{ emailErrorLabel }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightPasswordWithError ? 'input is-danger' : 'input'
                  ]"
                  type="password"
                  :placeholder="passwordPlaceholder"
                  v-model="password"
                  @keyup="checkPasswordOnKeyUp(password)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                <span
                  v-if="highlightPasswordWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightPasswordWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightPasswordWithError" class="help is-danger">
                {{ passwordErrorLabel }}
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[
                    highlightRepeatPasswordWithError
                      ? 'input is-danger'
                      : 'input'
                  ]"
                  type="password"
                  :placeholder="repeatPasswordPlaceholder"
                  v-model="repeatPassword"
                  @keyup="checkRepeatPasswordOnKeyUp(repeatPassword)"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
                <span
                  v-if="highlightRepeatPasswordWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[
                      highlightRepeatPasswordWithError
                        ? 'fa fa-exclamation-circle'
                        : 'fa fa-check'
                    ]"
                  ></i>
                </span>
              </p>
              <p v-if="highlightRepeatPasswordWithError" class="help is-danger">
                {{ notEqualErrorLabel }}
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

          <div v-if="isUserSignedUp" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Welcome {{ name }}!</p>
                <p class="heading">Now you are a member</p>
              </div>
            </div>
          </div>
          <div v-if="error">
            <p class="help is-danger">Invalid Registration</p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button
            v-if="!isUserSignedUp"
            @click="register"
            type="submit"
            class="button is-success"
          >
            {{ primaryBtnLabel }}
          </button>
          <button
            v-if="isUserSignedUp"
            type="button"
            class="button is-info"
            @click="closeModal"
          >
            {{ btnRegisteredLabel }}
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from "@/assets/validators";

export default {
  name: "registration",

  data() {
    return {
      modalTitle: "Sign up",
      modalTitleRegistered: "Welcome ",
      primaryBtnLabel: "Sign up",
      btnRegisteredLabel: "Close",
      namePlaceholder: "Name*",
      emailPlaceholder: "Email*",
      passwordPlaceholder: "Password*",
      repeatPasswordPlaceholder: "Repeat Password*",
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
      highlightNameWithError: null,
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      highlightRepeatPasswordWithError: null,
      highlightAddressWithError: null,
      highlightCityWithError: null,
      highlightCountryWithError: null,
      highlightZipWithError: null,
      highlightPhoneWithError: null,
      isFormSuccess: false
    };
  },

  computed: {
    isUserSignedUp() {
      return this.$store.getters.isUserSignedUp;
    },
    error() {
      return this.$store.state.errorSystemInfo.errorRaised;
    },
    openModal() {
      if (this.$store.getters.isSignupModalOpen) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    closeModal() {
      this.$store.commit("showSignupModal", false);
    },
    checkForm(e) {
      e.preventDefault();

      if (this.name && this.email && this.password && this.repeatPassword) {
        this.highlightEmailWithError = false;
        this.highlightPasswordWithError = false;
        this.$store.commit("setUserName", this.name);
      }

      if (!this.name) {
        this.highlightNameWithError = true;
      } else {
        this.highlightNameWithError = false;
      }

      if (!this.email) {
        this.highlightEmailWithError = true;

        if (this.email && !isValidEmail(this.email)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      } else {
        this.highlightEmailWithError = false;
      }

      if (!this.password) {
        this.highlightPasswordWithError = true;
      } else {
        this.highlightPasswordWithError = false;
      }

      if (!this.repeatPassword) {
        this.highlightRepeatPasswordWithError = true;
      } else {
        this.highlightRepeatPasswordWithError = false;
      }
    },
    checkNameOnKeyUp(nameValue) {
      if (nameValue) {
        this.highlightNameWithError = false;
      } else {
        this.highlightNameWithError = true;
      }
    },
    checkEmailOnKeyUp(emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailWithError = false;
      } else {
        this.highlightEmailWithError = true;

        if (!isValidEmail(emailValue)) {
          this.emailErrorLabel = this.emailNotValidLabel;
        }
      }
    },
    checkPasswordOnKeyUp(passwordValue) {
      if (passwordValue) {
        this.highlightPasswordWithError = false;

        if (this.repeatPassword === this.password) {
          this.highlightRepeatPasswordWithError = false;
        } else {
          this.highlightRepeatPasswordWithError = true;
        }
      } else {
        this.highlightPasswordWithError = true;
      }
    },
    checkRepeatPasswordOnKeyUp(repeatPasswordValue) {
      if (repeatPasswordValue) {
        if (repeatPasswordValue === this.password) {
          this.highlightRepeatPasswordWithError = false;
        } else {
          this.highlightRepeatPasswordWithError = true;
        }
      } else {
        this.highlightRepeatPasswordWithError = true;
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
    register() {
      const data = {
        email: this.email,
        password: this.password,
        city: this.city,
        address: this.address,
        zip: this.zip,
        phone: this.phone,
        country: this.country,
        name: this.name
      };
      this.$store.dispatch("register", {
        data
      });
      if (!this.$store.state.errorSystemInfo.errorRaised) {
        this.isFormSuccess = true;
      } else {
        this.isFormSuccess = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>
