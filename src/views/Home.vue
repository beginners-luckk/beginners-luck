<template>
  <div>
    <div class="home">
      <img
        class="hiyoko"
        alt="hiyoko-gif"
        src="https://hiyokoyarou.com/wp-content/uploads/2015/09/piyopiyo.gif"
      />
      <div class="Home">
        <h1>モードを選択してください</h1>
        <h2>〜求める面接官像に合わせて練習することができます〜</h2>
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
}
</script>

<style>
.hiyoko {
  width: 10%;
  height: 50%;
}

.Home {
  display: flex;
  display: block;
}
.Home {
  display: flex;
  display: block;
}
</style>
