<template>
  <q-page class="flex flex-center">
    <q-list class="full-width" separator>
      <q-item
        v-for="user in users"
        :key="user.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-badge :color="user.online ? 'green' : 'grey-4'">
            {{ user.online ? "online" : "offline" }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Ahmed",
          letter: "A",
          online: false
        },
        {
          id: 2,
          name: "Marim",
          letter: "M",
          online: true
        },
        {
          id: 3,
          name: "Enas",
          letter: "E",
          online: false
        },
        {
          id: 4,
          name: "Yossef",
          letter: "Y",
          online: true
        }
      ]
    };
  }
};
</script>
