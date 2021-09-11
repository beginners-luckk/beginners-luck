<template>
  <div>
    <div class="interview">
      <img class="interviewer" v-bind:src="imgPath" alt="" />
    </div>
    <div>
      <user-voice @recoading-start="startRecoading" @last-int="lastInterview">
      </user-voice>
    </div>

    <div v-if="isList">
      <button v-on:click="displayFunction" class="list-btn">質問リスト</button>
    </div>
    <div v-if="isClose">
      <button v-on:click="closeFunction" class="list-btn">閉じる</button>
    </div>

    <div v-if="this.display">
      <div v-for="(text, index) in interviews" :key="index">
        <ul>
          <li>{{ text }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, storageRef } from "../storage/storage"
import UserVoice from "@/components/userVoice.vue"

export default {
  data() {
    return {
      imgPath: require("@/assets/hard面接官.jpeg"),
      interviewUrl: "",
      listArray: [],
      shuffledPathArray: [],
      judgeArray: [],
      display: false,
      interviews: [],
      isStarted: true,
      isList: true,
      isClose: false,
      fileList: [
        {
          fileName: "hard/iyagarase.mp3",
          fileText: "ちょっと話長いんだよね、簡潔にまとめて",
        },
        {
          fileName: "hard/kaesu.mp3",
          fileText: "結局何が言いたいの",
        },
        {
          fileName: "hard/rinen.mp3",
          fileText: "当社の理念についてどう思う",
        },
        {
          fileName: "hard/hensati.mp3",
          fileText: "社会人としての偏差値はいくつだと思う",
        },
        {
          fileName: "hard/reason.mp3",
          fileText: "その理由は何",
        },
        {
          fileName: "hard/pen.mp3",
          fileText: "このペンを私に一万円で売ってみて",
        },
        {
          fileName: "hard/mece.mp3",
          fileText:
            "さっきからMECEじゃないんだよね。そのへんに気を遣って、当社の弱みは何だと思う",
        },
        {
          fileName: "hard/sibou.mp3",
          fileText: "志望動機を簡単に話して",
        },
        {
          fileName: "hard/yokunai.mp3",
          fileText: "当社じゃなくても良くない",
        },
        {
          fileName: "hard/doryoku.mp3",
          fileText: "そのために何か努力してるの",
        },
        {
          fileName: "hard/zikohyoka.mp3",
          fileText: "今の時点で、この面接の自己評価は何点くらいだと思う",
        },
        {
          fileName: "hard/gyakuni.mp3",
          fileText: "君が面接官だったら、君自身を採用したいのかい",
        },
        {
          fileName: "hard/eigo.mp3",
          fileText: "英語とかはできるんだっけ",
        },
        {
          fileName: "hard/pasokon.mp3",
          fileText:
            "君はパソコン触れるのかな。今の時代、ある程度スキルないとキツイよ",
        },
        {
          fileName: "hard/syakai.mp3",
          fileText: "今の社会に何が必要だと思う",
        },
        {
          fileName: "hard/covid.mp3",
          fileText: "アフターコロナの働き方について、「社会人」としてどう思う",
        },
        {
          fileName: "hard/covid2.mp3",
          fileText: "コロナ渦の政策についてどう思う",
        },
        {
          fileName: "hard/gekimu.mp3",
          fileText: "当社は激務だけど大丈夫なの",
        },
        {
          fileName: "hard/turai.mp3",
          fileText: "今までの人生で、一番辛かったことを教えて",
        },
        {
          fileName: "hard/muiteru.mp3",
          fileText: "当社より向いてる会社ありそうだけど",
        },
        {
          fileName: "hard/yaritai.mp3",
          fileText: "当社の事業で興味のあるものはなに。あと、何やりたいの",
        },
        {
          fileName: "hard/yoitokoro.mp3",
          fileText: "当社の良いところ、悪いところを挙げて",
        },
        {
          fileName: "hard/saigo.mp3",
          fileText: "何を思って、最期の時を迎えたいかな",
        },
        {
          fileName: "hard/daizi.mp3",
          fileText: "当社で働く上で、一番大事なことは何だと思ってるの",
        },
        {
          fileName: "hard/merit.mp3",
          fileText: "採用するメリットは何かあるのかな",
        },
      ],
      count: 0,
    }
  },
  components: { UserVoice },
  created: function () {
    // リスト取得
    const listRef = storageRef
    listRef
      .child("hard")
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
      const storageRef = storage.ref("jobInterviews/hardintro.mp3")
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
      const storageRef = storage.ref("jobInterviews/hardLast.mp3")
      await storageRef.getDownloadURL().then((url) => {
        this.interviewUrl = url
      })
      const audio = new Audio()
      audio.src = this.interviewUrl
      return audio.play()
    },
    displayFunction() {
      this.display = !this.display
      this.isList = false
      this.isClose = true
    },
    closeFunction() {
      this.isClose = false
      this.isList = true
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
    startRecoading() {
      console.log("startRecoading-child")
      if (this.isStarted == true) {
        this.playInterview()
        this.isStarted = false
      } else {
        this.nextInterview()
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
