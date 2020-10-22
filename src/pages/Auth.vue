<template>
  <q-page class="flex q-pa-md full-width item-center main-bg">
    <q-card class="form-card">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="secondary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <LoginRegister :tab="tab" />
        </q-tab-panel>
        <q-tab-panel name="register">
          <LoginRegister :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-footer elevated>
      <q-toolbar class="gradient-bg flex text-center">
        <q-toolbar-title
          >Made by :
          <a class="github-url" href="https://github.com/AhmedelheGery" target="_blink">
            Ahmed Alaa - Frontend Engineer
          </a>
        </q-toolbar-title>      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import LoginRegister from "../components/LoginRegister";
import Lottie from "../components/Lottie";
import * as animationData from "../assets/hello.json";

export default {
  data() {
    return {
      tab: "login",
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 10
    };
  },
  components: {
    LoginRegister
  }
};
</script>

<style scoped>
.form-card {
  width: 60%;
  margin: auto;
  padding: 1% 0;
}
</style>
