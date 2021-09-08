<template>
  <div>
    <div class="interview">
      <img class="interviewer" v-bind:src="imgPath" alt="" />
    </div>
    <div><button v-on:click="playInterview">面接開始</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
    <!-- <div v-for="(text, index) in textArray" v-bind:key="index">
      {{ index }}:{{ textArray.text }}
    </div> -->
  </div>
</template>

<script>
import { storage, storageRef } from "../storage/storage"

export default {
  data() {
    return {
      imgPath: require("@/assets/med面接官.png"),

      listArray: [],
      shuffledPathArray: [],
      judgeArray: [],
      count: 0,
    }
  },
  created: function () {
    // リスト取得
    const listRef = storageRef
    listRef
      .child("jobInterviews")
      .list()
      .then((res) => {
        res.items.forEach((doc) => {
          this.getPath = doc.fullPath
          this.listArray.push(this.getPath)
        })
      })
      .then(() => {
        this.shuffledPathArray = this.shuffleArray(this.listArray)
      })
  },
  methods: {
    playInterview() {
      const storageRef = storage.ref("jobInterviews/syukatuziku.mp3")
      storageRef.getDownloadURL().then((url) => {
        this.interviews = url
      })
      const audio = new Audio()
      audio.src = this.interviews
      return audio.play()
    },
    nextInterview() {
      const audio = new Audio()

      this.goJudgePath = this.shuffledPathArray[this.count]
      this.count++ //次の質問

      this.judgeArray.push(this.goJudgePath)

      // urlを取得して再生
      const storageRef = storage.ref(this.goJudgePath)
      storageRef
        .getDownloadURL()
        .then((url) => {
          this.playUrl = url
        })
        .then(() => {
          audio.src = this.playUrl
        })
        .then(() => {
          audio.load()
        })
        .then(() => {
          audio.play()
        })
    },
    // 配列をランダムにするメソッド
    shuffleArray(sourceArr) {
      // 元の配列の複製を作る
      const array = sourceArr.concat()
      // Fisher-Yatesのアルゴリズム？
      const arrayLength = array.length
      for (let i = arrayLength - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
      }
      return array
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
