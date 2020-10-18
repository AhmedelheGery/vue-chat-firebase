<template>
  <section>
    <q-page class="flex q-pa-md full-width">
      <q-card class="full-width">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
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
      <div class="col-6-md flex flex-center q-mx-auto">
        <lottie :options="defaultOptions" />
      </div>
    </q-page>
  </section>
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
    LoginRegister,
    Lottie
  }
};
</script>

<style lang="sass" scoped></style>
