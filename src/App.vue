<template>
  <div id="app">
    <router-link to="/BeforeSignIn">Before Sign In Page</router-link>

    <router-link to="/AfterSignIn">After Sign In Page</router-link>

    <router-link to="/Home">Home</router-link> |
    <router-link to="/History">History</router-link>

    <router-view />
    <!-- <text-to-speech /> -->
  </div>
</template>
<script>
// import textToSpeech from "./components/textSpeechApi.vue"

export default {
  methods: {
    signIn() {
      this.$store.dispatch("signInWithGoogle")
    },
    signOut() {
      this.$store.dispatch("signOut")
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
