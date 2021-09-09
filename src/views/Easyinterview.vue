<template>
  <div>
    <div class="interview">
      <img class="interviewer" v-bind:src="imgPath" alt="" />
    </div>
    <div><button v-on:click="playInterview">面接開始</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="lastInterview">最後の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
    <button v-on:click="displayFunction">🔽質問一覧🔽</button>
    <div v-if="this.display">
      <div v-for="(text, index) in interviews" :key="index">
        <li>{{ text }}</li>
      </div>
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
      display: false,
      fileList: [
        {
          fileName: "easy/syukatuziku.mp3",
          fileText: "どのような軸で就職活動を進めていますか",
        },
        {
          fileName: "easy/tsuyomi.mp3",
          fileText: "強みを教えてください",
        },
        {
          fileName: "easy/yaritaikoto.mp3",
          fileText: "弊社でやりたいことは何ですか",
        },
        {
          fileName: "easy/yowami.mp3",
          fileText:
            "弱みを教えてください。また、それを改善するために何が必要だと考えていますか",
        },
        {
          fileName: "easy/tsuyomiepisode.mp3",
          fileText: "強みを活かしたエピソードは何かありますか",
        },
        {
          fileName: "easy/ikasu.mp3",
          fileText: "今後どのようにそれらの経験を活かしていきますか",
        },
        {
          fileName: "easy/news.mp3",
          fileText: "最近、何か気になるニュースはありましたか",
        },
        {
          fileName: "easy/syui.mp3",
          fileText: "周囲の人から、どんな人だと言われますか",
        },
        {
          fileName: "easy/zayuu.mp3",
          fileText: "座右の名を教えてください",
        },
        {
          fileName: "easy/respect.mp3",
          fileText: "尊敬する人は誰ですか",
        },
        {
          fileName: "easy/reason.mp3",
          fileText: "アルバイトやボランティアを始めた理由は何ですか",
        },
        {
          fileName: "easy/manabi.mp3",
          fileText: "大学生活における一番の学びは何ですか",
        },
        {
          fileName: "easy/yoka.mp3",
          fileText: "予定が無い日は何をして過ごしますか",
        },
        {
          fileName: "easy/animal.mp3",
          fileText: "自分を動物に例えると何ですか",
        },
        {
          fileName: "easy/syumi.mp3",
          fileText: "趣味や特技は何かありますか",
        },
        {
          fileName: "easy/reason2.mp3",
          fileText: "「学生時代に力を入れたこと」を続けられた理由は何ですか",
        },
        {
          fileName: "easy/plan.mp3",
          fileText: "入社後のキャリアプランを教えてください",
        },
        {
          fileName: "easy/kandou.mp3",
          fileText: "最近、嬉しかったことや感動したことはありましたか",
        },
        {
          fileName: "easy/daigakureason.mp3",
          fileText: "その大学に入学した理由は何ですか",
        },
        {
          fileName: "easy/sigoto.mp3",
          fileText: "仕事に必要なものとは、何だと考えていますか",
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
      const storageRef = storage.ref("jobInterviews/easyintro.mp3")
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
    async lastInterview() {
      const storageRef = storage.ref("jobInterviews/easyLast.mp3")
      await storageRef.getDownloadURL().then((url) => {
        this.interviewUrl = url
      })
      const audio = new Audio()
      audio.src = this.interviewUrl
      return audio.play()
    },
    displayFunction() {
      this.display = !this.display
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
