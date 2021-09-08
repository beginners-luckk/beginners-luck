<template>
  <div>
    <div class="interview">
      <img class="interviewer" v-bind:src="imgPath" alt="" />
    </div>
    <div><button v-on:click="playInterview">面接開始</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
    <div>🔽質問一覧🔽</div>
    <div v-for="(text, index) in interviews" :key="index">
      <li>{{ text }}</li>
    </div>
  </div>
</template>

<script>
import { storage, storageRef } from "../storage/storage"

export default {
  data() {
    return {
      imgPath: require("@/assets/easy面接官.jpg"),
      interviewUrl: "",
      listArray: [],
      shuffledPathArray: [],
      judgeArray: [],
      interviews: [],
      fileList: [
        {
          fileName: "easy/syukatuziku.mp3",
          fileText: "どのような軸で就職活動を進めていますか",
        },
        {
          fileName: "easy/tsuyomi.mp3",
          fileText: "あなたの強みを教えてください",
        },
        {
          fileName: "easy/yaritaikoto.mp3",
          fileText: "弊社でやりたいことは何ですか",
        },
      ],
      count: 0,
    }
  },
  created: function () {
    // リスト取得
    const listRef = storageRef
    listRef
      .child("easy")
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
    async playInterview() {
      const storageRef = storage.ref("jobInterviews/zikopr.mp3")
      await storageRef.getDownloadURL().then((url) => {
        this.interviewUrl = url
      })
      const audio = new Audio()
      audio.src = this.interviewUrl
      return audio.play()
    },
    nextInterview() {
      const audio = new Audio()

      this.goJudgePath = this.shuffledPathArray[this.count]
      this.count++ //次の質問

      this.judgeArray.push(this.goJudgePath)
      // console.log(this.judgeArray)

      this.checkFunction(this.goJudgePath)
      console.log(this.interviews)

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
    checkFunction(path) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (path == this.fileList[i].fileName) {
          // this.interviews.push(path)
          this.interviews.push(this.fileList[i].fileText)
        }
      }
    },

    stopInterview() {},
  },
}
</script>

<style scoped>
.interview {
  background-color: bisque;
}
.interviewer {
  width: 48rem;
  height: 32rem;
  margin: 0 auto;
}
</style>

<style>
.interview {
  display: flex;
  text-align: center;
}
.interviewer {
  width: 45rem;
  height: 28rem;
  margin: 0 auto;
}
</style>
