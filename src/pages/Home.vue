<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-6 flex flex-center hello-animation">
        <lottie :options="defaultOptions" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Lottie from "../components/Lottie";
import * as animationData from "../assets/chat.json";
export default {
  name: "PageIndex",
  components: {
    lottie: Lottie
  },
  data() {
    return {
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 10
    };
  }
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
