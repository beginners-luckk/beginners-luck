<template>
  <div>
    <div class="bg-img">
      <h1 class="title1">Job</h1>
      <h1 class="title2">interview</h1>
      <button class="login" @click="signIn">LOGIN</button>
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
}
</script>
<style>
.bg {
  width: 50%;
  height: 60%;
  padding-top: 20%;
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
  margin-top: 16%;
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
}
</style>
