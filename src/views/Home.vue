<template>
  <div>
    <div class="home">
      <img
        class="hiyoko"
        alt="hiyoko-gif"
        src="https://hiyokoyarou.com/wp-content/uploads/2015/09/piyopiyo.gif"
      />
      <HelloWorld msg="モードを選択してください" />
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
  height: 49%;
}
</style>
