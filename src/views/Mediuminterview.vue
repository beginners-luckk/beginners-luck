<template>
  <div>
    <div class="interview">
      <img class="interviewer" v-bind:src="imgPath" alt="" />
    </div>
    <div><button v-on:click="playInterview">面接開始</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
    <!-- <div v-for="(interviewList, index) in interviewLists" v-bind:key="index">
      {{ index }}:{{ interviewList }}
    </div> -->
  </div>
</template>

<script>
import { storage, storageRef } from "../storage/storage"

export default {
  data() {
    return {
      imgPath: require("@/assets/med面接官.png"),
      interviews: [],
      interviewList: [],
      urlArray: [],
    }
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

      // リスト取得
      let listRef = storageRef
      listRef
        .child("jobInterviews")
        .list()
        .then((res) => {
          res.items.forEach((doc) => {
            this.interviewList = doc.fullPath
            // リストをURLに変換
            const storageRef = storage.ref(this.interviewList)
            storageRef.getDownloadURL().then((url) => {
              this.urlArray.push(url)
              // console.log(this.urlArray)
            })
          })

          // URLの配列をシャッフルして再生
          for (let i = this.urlArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let tmp = this.urlArray[i]
            this.urlArray[i] = this.urlArray[j]
            this.urlArray[j] = tmp
            // console.log(tmp)
            this.playUrl = tmp
          }
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
