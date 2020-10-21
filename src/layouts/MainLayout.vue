<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="flex justify-around container gradient-bg">
        <q-btn
          v-if="this.$route.path.includes('chat')"
          v-go-back.single
          color="secondary"
          icon="arrow_back"
          label="Back"
          dense
          no-caps
        />
        <q-toolbar-title class="text-center	">
          {{ checkTitle }}
        </q-toolbar-title>
        <q-btn
          dense
          icon-right="exit_to_app"
          label="Logout"
          color="secondary"
          no-caps
          v-if="user.userId"
          @click="logout"
        />
        <q-btn
          to="/auth"
          v-else
          dense
          icon-right="account_circle"
          label="Login"
          color="secondary"
          no-caps
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserData from "../mixins/mixin-other-user-info";

export default {
  mixins: [mixinOtherUserData],
  name: "MainLayout",
  computed: {
    ...mapState("auth", ["user"]),
    checkTitle() {
      if (this.$route.path == "/auth") return "";
      else if (this.$route.path.includes("chat"))
        return this.otherUserDetails && this.otherUserDetails.name;
      return "NamiChat";
    }
  },
  methods: {
    ...mapActions("auth", ["signOutAction"]),
    logout() {
      this.signOutAction();
    }
  }
};
</script>
