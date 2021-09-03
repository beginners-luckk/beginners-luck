<template>
  <div>
    <h1>After Sign In Page</h1>
    <UserProfile />
    <user-voice />
    <make-question />
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import UserProfile from "@/components/UserProfile.vue"
import makeQuestion from "@/components/makeQuestion.vue"
import UserVoice from "@/components/UserVoice.vue"

export default {
  components: {
    UserProfile,
    makeQuestion,
    UserVoice,
  },
  signOut() {
    this.$store.dispatch("signOut")
  },
}
</script>
