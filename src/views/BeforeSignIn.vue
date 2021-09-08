<template>
  <div>
    <h1 class="title">Job</h1>
    <h1 class="title">interview</h1>
    <button class="login" @click="signIn">LOGIN</button>
  </div>
</template>
<script>
export default {
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
