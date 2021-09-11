<template>
  <div>
    <div v-if="isStart">
      <button type="button" v-if="status == 'ready'" @click="startButton">
        面接開始
      </button>
    </div>
    <div>
      <button type="button" v-if="status == 'ready'" @click="startButton">
        次の質問
      </button>
      <button type="button" v-if="status == 'ready'" @click="lastButton">
        最後の質問
      </button>
    </div>
    <button type="button" v-if="status == 'recording'" @click="stopButton">
      回答を終了する
    </button>
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
