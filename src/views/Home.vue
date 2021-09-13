<template>
  <div>
    <div class="home">
      <!-- <h1 class="page-title" data-en="job interview">面接くん</h1> -->
      <img class="title-img" v-bind:src="titlePath" alt="" />
      <div class="Home">
        <h2 class="mode">※モードを選択してください</h2>
        <h3 class="practice">
          〜求める面接官像に合わせて練習することができます〜
        </h3>
      </div>
      <HelloWorld msg="" />
    </div>
    <div><router-view /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      titlePath: require("@/assets/タイトル.png"),
    }
  },
}
</script>

<style>
.hiyoko {
  width: 10%;
  height: 50%;
}

.Home {
  display: block;
}
.title-img {
  height: 15rem;
}
.mode {
  font-size: 3rem;
  margin: 0.5rem;
}
.practice {
  font-size: 2rem;
  margin: 0.5rem;
}
</style>
