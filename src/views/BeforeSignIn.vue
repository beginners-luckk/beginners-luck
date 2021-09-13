<template>
  <div>
    <div class="bg-img">
      <img v-bind:src="titlePath" class="title-img2" alt="" />
      <button class="login" @click="signIn">
        <router-link :to="{ name: 'Home' }">LOGIN</router-link>
      </button>

      <img
        class="bg"
        alt="bc-gif"
        src="https://img.gifmagazine.net/gifmagazine/images/2998664/original.gif"
      />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    signIn() {
      this.$store.dispatch("signInWithGoogle")
    },
  },
  data() {
    return {
      titlePath: require("@/assets/タイトル2.png"),
    }
  },
}
</script>
<style>
.bg {
  width: 50%;
  height: 60%;
  padding-top: 3rem;
}

.title1 {
  text-align: center;
  font-size: 250%;
  font-family: cursive;
  position: absolute;
  margin-top: 5%;
}
.title2 {
  text-align: center;
  font-size: 250%;
  font-family: cursive;
  position: absolute;
  margin-top: 10%;
}
.login {
  width: 5%;
  height: 5%;
  margin-top: 10%;
  position: absolute;
}
.bg-img {
  background-image: url(https://www.illust-pocket.com/wp-content/uploads/2016/07/516.jpg);
  background-size: 100% auto;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8rem;
}
</style>

<style scoped>
.title-img2 {
  height: 10rem;
}
</style>
