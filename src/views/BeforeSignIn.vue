<template>
  <div>
    <h1 class="title">Job</h1>
    <h1 class="title">interview</h1>
    <button class="login" @click="signIn">LOGIN</button>
    <output-user-voice />
  </div>
</template>
<script>
import OutputUserVoice from "../components/OutputUserVoice.vue"
export default {
  components: { OutputUserVoice },
  methods: {
    signIn() {
      this.$store.dispatch("signInWithGoogle")
    },
  },
}
</script>
<style>
.title {
  text-align: center;
}
</style>
