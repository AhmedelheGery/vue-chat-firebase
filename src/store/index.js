import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth
    },
    plugins: [createPersistedState()],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
