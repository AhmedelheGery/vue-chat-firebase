<template>
  <q-page class="flex column">
    <q-banner inline-actions class="bg-grey-2 text-center">
      User is offline.
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, i) in messages"
        :name="message.from"
        :key="i"
        :text="[message.text]"
        :sent="message.from == 'me'"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input
            outlined
            v-model="newMessage"
            label="Message"
            dense
            bg-color="white"
            class="full-width"
            rounded
          >
            <template v-slot:before> </template>
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                icon="send"
                color="white"
                type="submit"
                @click="sendMessage"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      newMessage: "",
      messages: [
        {
          text: "how are you?",
          from: "me"
        },
        {
          text: "fine you?",
          from: "them"
        },
        {
          text: "cool",
          from: "me"
        }
      ]
    };
  },
  methods: {
    ...mapActions("auth", ["getMessagesAction"]),
    sendMessage() {
      this.messages.push({
        text: this.newMessage,
        from: "me"
      });
      this.newMessage = "";
    }
  },
  mounted() {
    this.getMessagesAction(this.$route.params.id);
  }
};
</script>

<style lang="sass" scoped></style>
