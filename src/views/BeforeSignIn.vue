<template>
  <div>
    <div class="bg-img">
      <h1 class="title">Job</h1>
      <h1 class="title">interview</h1>
      <button class="login" @click="signIn">LOGIN</button>

      <div>
        <img
          class="bg"
          alt="bc-gif"
          src="https://img.gifmagazine.net/gifmagazine/images/2998664/original.gif"
        />
      </div>
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
.title {
  text-align: center;
}
.bg {
  width: 50%;
  height: 300%;
  padding-top: 20px;
}

.title {
  font-size: 50px;
  font-family: cursive;
}
.login {
  width: 100px;
  height: 30px;
}
.bg-img {
  background-image: url(https://www.illust-pocket.com/wp-content/uploads/2016/07/516.jpg);
  background-size: 100% auto;
}
</style>
