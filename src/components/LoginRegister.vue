<template>
  <q-form @submit="onSubmit">
    <!-- user name -->
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      color="primary"
      outlined
      v-model="formData.name"
      label="User name"
    >
      <template v-slot:append>
        <q-icon :size="'md'" name="person" color="primary" />
      </template>
    </q-input>
    <!-- email -->
    <q-input
      class="q-mb-md"
      color="primary"
      type="email"
      outlined
      v-model="formData.email"
      label="Email"
    >
      <template v-slot:append>
        <q-icon :size="'md'" name="mail" color="primary" />
      </template>
    </q-input>
    <!-- password -->
    <q-input
      class="q-mb-md"
      color="primary"
      type="password"
      outlined
      v-model="formData.password"
      label="Password"
    >
      <template v-slot:append>
        <q-icon :size="'md'" name="vpn_key" color="primary" />
      </template>
    </q-input>
    <div class="text-right">
      <q-btn @click.prevent="validate()" color="primary" :label="tab" type="submit" />
    </div>
    <p v-if="getError" class="q-mb-0 err-msg" text-color="negative">{{getError}}</p>
        <div
            v-if="validationErrors.length"
            class="notification is-danger is-light"
          >
              <q-icon @click="resetError()" :size="'md'" name="clear" color="secondary" />
            <div class="content">
              Please resolve the following error(s) before proceeding.
              <ul style="margin-top:0.3em; margin-left: 1em">
                <li
                  class="err-msg"
                  v-for="(error, index) in validationErrors"
                  :key="`error-${index}`"
                  v-html="error"
                />
              </ul>
            </div>
          </div>
  </q-form>
</template>

<script>
import { mapActions , mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
        name: "",
      },
      validationErrors: []
    };
  },
  props: ["tab"],
    computed: {
    ...mapGetters("auth", ["getError"])
  },
  methods: {
    ...mapActions("auth", ["signUpAction", "signInAction", "clearErrAction"]),
    resetError() {
      this.validationErrors = [];
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError();
      // email validation
      if (!this.formData.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
      }
      if (/.+@.+/.test(this.formData.email) != true) {
        this.validationErrors.push("<strong>E-mail</strong> must be valid.");
      }
      // password validation
      if (!this.formData.password) {
        this.validationErrors.push("<strong>Password</strong> cannot be empty");
      }
      if (/.{6,}/.test(this.formData.password) != true) {
        this.validationErrors.push(
          "<strong>Password</strong> must be at least 6 characters long"
        );
      }
      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.onSubmit();
      }
    },
    onSubmit() {
      let formData;
      this.tab == "login"
        ? ((formData = {
            email: this.formData.email,
            password: this.formData.password
          }),
          this.signInAction(formData))
        : ((formData = {
            email: this.formData.email,
            password: this.formData.password,
            name: this.formData.name
          }),
          this.signUpAction(formData));
    }
  },
  mounted(){
    this.clearErrAction()
  }
};
</script>
<style scoped>
.err-msg{
  color : red
}

</style>
