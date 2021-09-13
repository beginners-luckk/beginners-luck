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
import firebase from "firebase"

export default {
  components: { UserVoice },
  data() {
    return {
      imgPath: require("@/assets/med面接官.png"),
      interviewUrl: "",
      listArray: [],
      shuffledPathArray: [],
      judgeArray: [],
      interviews: ["自己PRやガクチカ"],
      display: false,
      isList: true,
      isClose: false,
      isStarted: true,
      fileList: [
        {
          fileName: "medium/tansyo.mp3",
          fileText: "長所や短所を教えてください",
        },
        {
          fileName: "medium/manabi.mp3",
          fileText: "アルバイトやサークルにおいて、何を学びましたか",
        },
        {
          fileName: "medium/zigyou.mp3",
          fileText:
            "当社の事業で気になっているものはなんですか。また、どのように取り組んでくれますか",
        },
        {
          fileName: "medium/leader.mp3",
          fileText:
            "あなたにとって、「リーダーシップ」とは何ですか。また、そのような経験を教えてください",
        },
        {
          fileName: "medium/hitokoto.mp3",
          fileText: "自分の人生を一言で表してください",
        },
        {
          fileName: "medium/zasetu.mp3",
          fileText: "失敗や、挫折した経験を教えてください",
        },
        {
          fileName: "medium/syourai.mp3",
          fileText: "5年後、10年後のあなたを教えてください",
        },
        {
          fileName: "medium/yowami.mp3",
          fileText: "当社の弱みや強みは何だと思いますか",
        },
        {
          fileName: "medium/zyuni.mp3",
          fileText: "当社の志望順位は何番目ですか",
        },
        {
          fileName: "medium/senkou.mp3",
          fileText: "他社の選考状況を、なぜ受けたかも合わせて教えてください",
        },
        {
          fileName: "medium/syakai.mp3",
          fileText:
            "社会問題を一つ挙げて、どのように対応すべきか教えてください",
        },
        {
          fileName: "medium/rinen.mp3",
          fileText:
            "当社の理念について賛同できるものと、そうでないものを、理由も合わせて教えてください",
        },
        {
          fileName: "medium/pasokon.mp3",
          fileText: "パソコンはどの程度触れますか",
        },
        {
          fileName: "medium/zinsei.mp3",
          fileText:
            "小、中、高、大と、あなたはどんな人間で、どんな考え方をしていましたか",
        },
        {
          fileName: "medium/busyo.mp3",
          fileText:
            "志望部署はどこですか。その部署に配属されなかったら、どうしますか",
        },
        {
          fileName: "medium/friends.mp3",
          fileText:
            "友達の中で、あなたはどんなポジションですか。また、苦手な人はどんな人ですか",
        },
        {
          fileName: "medium/color.mp3",
          fileText: "自分を色に例えてください",
        },
        {
          fileName: "medium/issyo.mp3",
          fileText: "一生、当社で働く気はありますか",
        },
        {
          fileName: "medium/covid.mp3",
          fileText:
            "日本政府のコロナ対策について、どう思いますか。どう改善すべきですか",
        },
        {
          fileName: "medium/reason.mp3",
          fileText: "業界の中で当社を志望する理由を、具体的に述べてください",
        },
      ],
      count: 0,
      db: firebase.firestore().collection("users"),
    }
  },
  created: function () {
    // リスト取得
    const listRef = storageRef
    listRef
      .child("medium")
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
  computed: {
    user: function () {
      return this.$store.state.user
    },
  },
  methods: {
    async playInterview() {
      this.interviews.push(
        "はい、では、面接を始めます。1分間程度で自由に自己ＰＲをお願いします"
      )
      const storageRef = storage.ref("jobInterviews/medintro.mp3")
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
      this.interviews.push("こちらからの質問は以上です。何か質問はありますか")
      const storageRef = storage.ref("jobInterviews/medLast.mp3")
      await storageRef.getDownloadURL().then((url) => {
        this.interviewUrl = url
      })
      const audio = new Audio()
      audio.src = this.interviewUrl
      //postInterviews
      const id = this.user.uid
      const Data = { interviews: this.interviews }
      this.db
        .doc(id)
        .update(Data)
        .then(() => {
          console.log("Int successfully written!")
        })
      //postInt:comp.
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
      if (this.isStarted === true) {
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
.interviewer {
  height: 33rem;
}
</style>
