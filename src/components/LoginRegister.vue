<template>
  <q-form @submit="onSubmit">
    <!-- user name -->
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      color="teal"
      outlined
      v-model="formData.userName"
      label="User name"
    >
      <template v-slot:append>
        <q-icon :size="'md'" name="person" color="secondary" />
      </template>
    </q-input>
    <!-- email -->
    <q-input
      class="q-mb-md"
      color="teal"
      type="email"
      outlined
      v-model="formData.email"
      label="Email"
    >
      <template v-slot:append>
        <q-icon :size="'md'" name="mail" color="secondary" />
      </template>
    </q-input>
    <!-- password -->
    <q-input
      class="q-mb-md"
      color="teal"
      type="password"
      outlined
      v-model="formData.password"
      label="Password"
    >
      <template v-slot:append>
        <q-icon :size="'md'" name="vpn_key" color="secondary" />
      </template>
    </q-input>
    <div class="text-right">
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
        userName: ""
      }
    };
  },
  props: ["tab"],
  methods: {
    ...mapActions("auth", ["signUpAction", "signInAction"]),
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
            userName: this.formData.userName
          }),
          this.signUpAction(formData));
    }
  },
  computed: {
    ...mapGetters("auth", ["isUserAuth"])
  }
};
</script>
