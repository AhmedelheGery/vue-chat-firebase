<template>
  <q-page class="main-bg">
    <div class="row items-center fit justify-center" v-if="isUserAuth == 0">
      <div class="col-sm-4 col-md-6 text-center">
        <h2 class="title" color="white">Let's Login to Chat!</h2>
        <q-btn
          to="/auth"
          icon-right="account_circle"
          label="Login"
          class="btn-bg"
          size="18px"
          no-caps
        />
      </div>
      <div class="col-sm-4 col-md-6 flex flex-center hello-animation q-pt-sm">
        <lottie :options="defaultOptions" :width="500" />
      </div>
    </div>
    <div v-else>
    <Users />
    <q-footer elevated>
      <q-toolbar class="gradient-bg flex text-center">
        <q-toolbar-title
          >Made by :
          <a class="github-url" href="https://github.com/AhmedelheGery" target="_blink">
            Ahmed Alaa - Frontend Engineer
          </a>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    </div>
  </q-page>
</template>

<script>
import Users from "./Users";
import { mapGetters } from "vuex";
import Lottie from "../components/Lottie";
import * as animationData from "../assets/chat.json";
export default {
  name: "Home",
  components: {
    Users,
    lottie: Lottie
  },
  computed: {
    ...mapGetters("auth", ["isUserAuth"])
  },
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 10
    };
  }
};
</script>
<style>
.hello-animation {
  margin: 0 auto;
}
.title {
  color: #fff;
}
</style>
