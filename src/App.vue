<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions("auth", ["authAction"])
  },
  mounted() {
    return this.authAction();
  }
};
</script>
<style>
.gradient-bg {
  background-image: linear-gradient(
    to right,
    #210124,
    #3c0d37,
    #5d1647,
    #7f2055,
    #a32b60
  );
}
.btn-bg {
  background-color: #d74452;
  color: #fff;
}
</style>
