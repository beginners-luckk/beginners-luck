<template>
  <div>
    <div class="interview">
      <img class="interviewer" v-bind:src="imgPath" alt="" />
    </div>
    <div><button v-on:click="playInterview">面接開始</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
    <div><button v-on:click="getList">リスト取得</button></div>
    <div><button v-on:click="randomInterview">ランダム再生</button></div>
    <div v-for="(interviewList, index) in interviewLists" v-bind:key="index">
      {{ index }}:{{ interviewList }}
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
      intervieUrl: [],
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
            let interviewList = doc.fullPath
            console.log(interviewList)
          })
        })
    },
    nextInterview() {
      const audio = new Audio()

      for (let i = this.interviewList.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let tmp = this.interviewList[i]
        this.interviewList[i] = this.interviewList[j]
        this.interviewList[j] = tmp

        audio.src = tmp
        return audio.play()
      }
    },
    randomInterview() {
      // ここのコメントアウトを解除して始める
      // const audio = new Audio()

      // リスト取得
      let listRef = storageRef
      listRef
        .child("jobInterviews")
        .list()
        .then((res) => {
          res.items.forEach((doc) => {
            let interviewList = doc.fullPath
            // console.log(interviewList)

            // リストをURLに変換
            const storageRef = storage.ref(interviewList)
            storageRef.getDownloadURL().then((url) => {
              let interviewUrl = url
              console.log(interviewUrl)

              // ここのコメントアウトを解除して始める
              // for (let i = interviewUrl.length - 1; i > 0; i--) {
              //   let j = Math.floor(Math.random() * (i + 1))
              //   let tmp = interviewUrl[i]
              //   interviewUrl[i] = interviewUrl[j]
              //   interviewUrl[j] = tmp
              //   console.log(tmp)
              //   audio.src = tmp
              //   audio.play()
              // }

              // let shuffledInterview = this.shuffleArray(interviewUrl)
              // console.log(shuffledInterview)

              // for (let i = 0; i < shuffledInterview.length; i++) {
              //   return shuffledInterview[i]
              // }
              // audio.src = this.shuffledInterview
              // audio.play()

              // for (let i = 0; i < shuffledInterview.length; i++) {
              //   audio.src = shuffledInterview[i]
              //   audio.play()
              // }
            })
          })
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

    stopInterview() {
      console.log(this.shuffleArray)
    },
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
