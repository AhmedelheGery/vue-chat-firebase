<template>
  <q-page class="flex column" ref="pageChat">
    <q-banner
      v-if="otherUserDetails && !otherUserDetails.online"
      inline-actions
      class="bg-grey-2 text-center fixed-top chat-banner full-width"
    >
      {{ otherUserDetails && otherUserDetails.name }} is offline.
    </q-banner>
    <div class="q-pa-md column col justify-end chat-wrapper">
      <q-chat-message
        v-for="(message, i) in messages"
        :name="
          message.from == 'me' ? '' : otherUserDetails && otherUserDetails.name
        "
        :key="i"
        :text="[message.text]"
        :sent="message.from == 'me'"
        :bg-color="message.from == 'me' ? 'secondary' : 'grey-4'"
        :text-color="message.from == 'me' ? 'white' : 'dark'"

      />
    </div>
    <q-footer elevated>
      <q-toolbar class="gradient-bg">
        <q-form @submit="sendMessage" class="full-width">
          <q-input
            outlined
            v-model="newMessage"
            ref="newMessage"
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
                :disable="disableCheck"
              />
              <!-- {{disableBtn}} -->
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserData from "../mixins/mixin-other-user-info";
export default {
  mixins: [mixinOtherUserData],
  data() {
    return {
      newMessage: ""
    };
  },
  computed: {
    ...mapState("auth", ["messages", "user", "users"]),
    userData() {
      return this.otherUserDetails;
    },
    disableCheck(){
      return (this.newMessage.length === 0 || !this.newMessage.trim()) ? true : false
    }
  },
  methods: {
    ...mapActions("auth", [
      "getMessagesAction",
      "leaveChatAction",
      "sendMessageAction"
    ]),
    sendMessage() {
      this.sendMessageAction({
        message: { text: this.newMessage, from: "me" },
        otherUserId: this.$route.params.id
      });
      this.newMessage = "";
      this.$refs.newMessage.focus();
    },
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
      }, 20);
    }
  },
  watch: {
    messages(val) {
      Object.keys(val).length && this.scrollToBottom();
    }
  },
  mounted() {
    this.getMessagesAction(this.$route.params.id);
  },
  destroyed() {
    this.leaveChatAction();
  }
};
</script>
<style scoped>
.chat-wrapper,body{
  background-color: #fff !important;
}
.chat-banner{
  padding-top: 70px;
}

</style>
