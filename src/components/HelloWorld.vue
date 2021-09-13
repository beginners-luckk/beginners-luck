<template>
  <div class="choose-mode">
    <div class="Home">
      <h1>{{ msg }}</h1>
    </div>
    <div class="item">
      <figure class="image">
        <img v-bind:src="imgPath" alt="" />
      </figure>
      <p class="title">Easy</p>
      <p class="description">優しく話しやすい雰囲気の面接</p>
      <router-link :to="{ name: 'Easy' }"
        ><p class="link"><a href="#">入室</a></p></router-link
      >
    </div>
    <div class="item">
      <figure class="image">
        <img v-bind:src="imgPath2" alt="" />
      </figure>
      <p class="title">Medium</p>
      <p class="description">
        あまり感情を表に出さず、淡々と質問がとんでくる面接
      </p>
      <router-link :to="{ name: 'Medium' }">
        <p class="link"><a href="#">入室</a></p></router-link
      >
    </div>
    <div class="item">
      <figure class="image">
        <img v-bind:src="imgPath3" alt="" />
      </figure>
      <p class="title">Hard</p>
      <p class="description">圧迫面接に近い雰囲気を味わえる、、、、</p>
      <router-link :to="{ name: 'Hard' }">
        <p class="link"><a href="#">入室</a></p></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      imgPath: require("@/assets/easydoor.jpeg"),
      imgPath2: require("@/assets/meddoor.png"),
      imgPath3: require("@/assets/harddoor 2.jpg"),
    }
  },
  props: {
    msg: String,
  },
}
</script>

<style>
.choose-mode {
  display: flex;
  justify-content: space-between;
}
.choose-mode .item {
  display: flex;
  flex-direction: column;
  width: 31%;
  margin: 0;
  padding: 0 0 20px 0;
  box-sizing: border-box;
  background: #eee;
}
.choose-mode .item {
  margin: 0;
  padding: 0;
  flex: 0 0 auto;
}
.choose-mode .item .image img {
  width: 50%;
  height: 300px;
  margin: 10px;
  -o-object-fit: cover;
  object-fit: cover;
}
.choose-mode .item .title {
  margin: 10px 0 0;
  padding: 0 20px;
  font-weight: bold;
  font-size: 20px;
}
.choose-mode .item .description {
  margin: 5px 0 20px;
  padding: 0 20px;
  font-size: 16px;
  flex: 1;
}
.choose-mode .item .link {
  margin: 20px 0 0;
  padding: 0 20px;
  font-size: 16px;
  text-align: center;
}
.choose-mode .item .link a {
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  background: black;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
