<template>
  <div>
    <div class="interview">
      <img class="interviewer" v-bind:src="imgPath" alt="" />
    </div>
    <div><button v-on:click="playInterview">面接開始</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
    <div><button v-on:click="getList">リスト取得</button></div>
    <div v-for="(interviewList, index) in interviewLists" v-bind:key="index">
      {{ index }}:{{ this.interviewList }}
    </div>
  </div>
</template>

<script>
import { storage, storageRef } from "../storage/storage"

export default {
  data() {
    return {
      imgPath: require("@/assets/med面接官.png"),
      interviews: [],
      interviewLists: [],
    }
  },
  methods: {
    playInterview() {
      const storageRef = storage.ref("jobInterviews/syukatuziku.mp3")
      storageRef.getDownloadURL().then((url) => {
        this.interviews = url
        console.log(this.interviews)
      })
      const audio = new Audio()
      audio.src = this.interviews
      return audio.play()
    },
    getList() {
      let listRef = storageRef
      listRef
        .child("jobInterviews")
        .list()
        .then((res) => {
          res.items.forEach((doc) => {
            console.log(doc.fullPath)
            this.interviewList = doc.fullPath
          })
        })
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
