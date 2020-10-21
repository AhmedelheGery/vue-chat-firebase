<template>
  <q-page class="flex flex-center">
    <q-list class="full-width" separator>
      <q-item
        v-for="(user, i) in getUsers"
        :key="i"
        :to="`chat/${i}`"
        class="q-my-sm"
        clickable
        v-ripple
        text-color="white"
      >
        <q-item-section avatar>
          <q-avatar class="btn-bg" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label color="white">{{ user.name }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge :color="user.online ? 'secondary' : 'blue-grey-4'">
            {{ user.online ? "online" : "offline" }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
    <q-footer elevated>
      <q-toolbar class="gradient-bg flex">
        <q-toolbar-title>Made by Eng : Ahmed Alaa</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["getUsers"])
  }
};
</script>
<style scoped>
.q-item {
  color: #fff;
  background-color: rgba(219, 93, 106, 0.2);
}
</style>
