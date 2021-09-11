<template>
  <div>
    <h1>テスト用</h1>
    <user-voice /> <make-question />
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import MakeQuestion from "../components/makeQuestion.vue"
import UserVoice from "@/components/userVoice.vue"

export default {
  components: {
    MakeQuestion,
    UserVoice,
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut")
    },
  },
}
</script>
