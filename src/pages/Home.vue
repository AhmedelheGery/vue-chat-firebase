<template>
  <q-page>
    <div class="row" v-if="isUserAuth == 0">
      <div class="col-12 col-md-6 flex flex-center hello-animation">
        <lottie :options="defaultOptions" />
      </div>
    </div>
    <Users v-else />
  </q-page>
</template>

<script>
import Users from "./Users";
import { mapGetters } from "vuex";
import Lottie from "../components/Lottie";
import * as animationData from "../assets/chat.json";
export default {
  name: "PageIndex",
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
  },
};
</script>
<style lang="scss" scoped>
.q-page {
  background: transparent;
}
.hello-animation {
  margin: 0 auto;
}
</style>
