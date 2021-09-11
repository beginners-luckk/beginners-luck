<template>
  <div>
    <div class="home">
      <h1 class="page-title" data-en="job interview">面接くん</h1>
      <div class="Home">
        <h1>モードを選択してください</h1>
        <h2>〜求める面接官像に合わせて練習することができます〜</h2>
      </div>
      <HelloWorld msg="" />
    </div>
    <div><router-view /></div>
    <img
      class="hiyoko"
      alt="hiyoko-gif"
      src="https://hiyokoyarou.com/wp-content/uploads/2015/09/piyopiyo.gif"
    />
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
.page-title {
  position: relative;
  padding-top: 50px;
  padding-left: 30px;
  font-size: 4.8rem;
}
.page-title span {
  position: relative;
  z-index: 2;
}
.page-title::before {
  content: attr(data-en);
  position: absolute;
  margin-left: 33rem;
  transform: rotate(-5deg);
  top: -20px;
  left: 0;
  color: gray;
  font-size: 5rem;
  font-weight: 400;
  font-family: luxus-brut, cursive;
  font-style: italic;
}
</style>
