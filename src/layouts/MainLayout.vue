<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="flex justify-around container">
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
          v-if="status"
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
export default {
  name: "MainLayout",
  data() {
    return {
      status: false
    };
  },
  computed: {
    checkTitle() {
      if (this.$route.path == "/auth") return "Auth";
      else if (this.$route.path == "/chat") return "Chat";
      return "NamiChat";
    }
  }
};
</script>
