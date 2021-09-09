<template>
  <div>
    <h1>After Sign In Page</h1>
    <user-voice />
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import UserVoice from "@/components/UserVoice.vue"

export default {
  components: {
    UserVoice,
  },
  signOut() {
    this.$store.dispatch("signOut")
  },
}
</script>
