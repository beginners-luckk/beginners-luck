<template>
  <div class="side">
    <div v-if="isStart">
      <div v-if="isBigi">
        <button
          type="button"
          v-if="status == 'ready'"
          @click="startButton"
          class="basic-btn"
        >
          面接開始
        </button>
      </div>
    </div>
    <div class="side" v-if="isNext">
      <button
        type="button"
        v-if="status == 'ready'"
        @click="startButton"
        class="basic-btn2"
      >
        次の質問
      </button>
      <div>
        <button
          type="button"
          v-if="status == 'ready'"
          @click="lastButton"
          class="basic-btn3"
        >
          逆質問
        </button>
      </div>
    </div>
    <button
      type="button"
      v-if="status == 'recording'"
      @click="stopButton"
      class="basic-btn2"
    >
      回答を終了する
    </button>

    <div v-if="isEnd">
      <router-link :to="{ name: 'History' }"
        ><button class="go-history">面接終了</button></router-link
      >
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      status: "init", // 状況
      recorder: null, // 音声にアクセスする "MediaRecorder" のインスタンス
      audioData: [], // 入力された音声データ
      audioExtension: "", // 音声ファイルの拡張子
      voiceUrls: [],
      db: firebase,
      isStart: true,
      isBigi: true,
      isEnd: false,
      isNext: false,
    }
  },
  computed: {
    user: function () {
      return this.$store.state.user
    },
  },
  methods: {
    startButton: function () {
      console.log("start")
      this.$emit("recoading-start")
      this.status = "recording"
      this.audioData = []
      this.recorder.start()
      this.isBigi = false
      this.isEnd = true
      this.isNext = true
    },
    lastButton: function () {
      console.log("last-start")
      this.$emit("last-int")
      this.status = "recording"
      this.audioData = []
      this.recorder.start()
    },
    stopButton: function () {
      console.log("stop")
      this.recorder.stop()
      this.status = "ready"
      this.postUrls()
    },
    getExtension(audioType) {
      let extension = "wav"
      const matches = audioType.match(/audio\/([^;]+)/)

      if (matches) {
        extension = matches[1]
      }

      return "." + extension
    },
    postUrls() {
      const id = this.user.uid
      console.log(id)
      console.log(this.voiceUrls)
      console.log("postUrls")
      const ref = this.db.firestore().collection("users").doc(id)
      return ref
        .update({
          userUrl: this.voiceUrls,
        })
        .then(() => {
          console.log("Document successfully written!")
        })
        .catch((error) => {
          console.error("Error writing document: ", error)
        })
    },
  },
  mounted() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.recorder = new MediaRecorder(stream)
      this.recorder.addEventListener("dataavailable", (e) => {
        this.audioData.push(e.data)
        this.audioExtension = this.getExtension(e.data.type)
      })
      this.recorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioData)
        const url = URL.createObjectURL(audioBlob)
        let a = document.createElement("a")
        a.href = url
        document.body.appendChild(a)
        console.log(url)
        this.voiceUrls.push(url)
        this.postUrls()
      })
      this.status = "ready"
    })
  },
}
</script>

<style>
.side {
  display: flex;
  justify-content: center;
}
.basic-btn {
  display: inline-block;
  text-decoration: none;
  background: #ff8181;
  color: #fff;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
  border-bottom: solid 3px #bd6565;
  transition: 0.4s;
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
}
.basic-btn :active {
  -webkit-transform: translateY(2px);
  transform: translateY(2px);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
  border-bottom: none;
}
.basic-btn2 {
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8; /*ボタン色*/
  color: #fff;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
  margin-top: 3rem;
  margin-left: 27rem;
  margin-bottom: 3rem;
  width: 8rem;
  height: 4rem;
}
.basic-btn2:active {
  -webkit-transform: translateY(4px);
  transform: translateY(4px);
  border-bottom: none;
}
.basic-btn3 {
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8; /*ボタン色*/
  color: #fff;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
  margin-top: 4.5rem;
  margin-left: 2rem;
  margin-bottom: 3rem;
}
.basic-btn3:active {
  -webkit-transform: translateY(4px);
  transform: translateY(4px);
  border-bottom: none;
}
.go-history {
  padding: 0.5em 1em;
  text-decoration: none;
  background: #ff4500; /*ボタン色*/
  color: #fff;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
  margin-top: 3.2rem;
  margin-left: 8rem;
  margin-right: 27rem;
  width: 8rem;
  height: 4rem;
}
.go-history:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px); /*下に動く*/
  border-bottom: none; /*線を消す*/
}
</style>
