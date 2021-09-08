<template>
  <div>
    <button type="button" v-if="status == 'ready'" @click="startButton">
      録音を開始する
    </button>
    <button type="button" v-if="status == 'recording'" @click="stopButton">
      録音を終了する
    </button>
    <div>
      <div>
        <p>１番目</p>
        <audio controls v-bind:src="voiceUrls[0]"></audio>
      </div>
      <div>
        <p>２番目</p>
        <audio controls v-bind:src="voiceUrls[1]"></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "init", // 状況
      recorder: null, // 音声にアクセスする "MediaRecorder" のインスタンス
      audioData: [], // 入力された音声データ
      audioExtension: "", // 音声ファイルの拡張子
      voiceUrls: [],
    }
  },
  methods: {
    startButton: function () {
      this.status = "recording"
      this.audioData = []
      this.recorder.start()
    },
    stopButton: function () {
      this.recorder.stop()
      this.status = "ready"
    },
    getExtension(audioType) {
      let extension = "wav"
      const matches = audioType.match(/audio\/([^;]+)/)

      if (matches) {
        extension = matches[1]
      }

      return "." + extension
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
        // console.log(a)
        // console.log(url)
        this.voiceUrls.push(url)
      })
      this.status = "ready"
    })
  },
}
</script>
