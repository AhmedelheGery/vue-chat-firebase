export default {
  computed: {
    otherUserDetails() {
      return this.$store.state.auth.users[this.$route.params.id];
    }
  }
};
