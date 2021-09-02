<template>
  <div>
    <div class="interview">
      <img class="interviewer" v-bind:src="imgPath" alt="" />
    </div>
    <div><button v-on:click="playInterview">面接開始</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgPath: require("@/assets/med面接官.png"),
      interviews: [],
    }
  },
  methods: {
    playInterview() {
      const audio = new Audio()
      return audio.play()
    },
    nextInterview() {
      const audio = new Audio()

      // 配列をランダムに取得
      for (let i = this.interviews.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let tmp = this.interviews[i]
        this.interviews[i] = this.interviews[j]
        this.interviews[j] = tmp
        if (tmp.isdone == false) {
          audio.src = tmp.voice
          tmp.isdone = true
          return audio.play()
        } else {
          return
        }
      }
    },
    stopInterview() {},
  },
}
</script>

<style scoped>
.interview {
  display: flex;
  text-align: center;
  background-color: gray;
}
</style>
