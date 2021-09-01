<template>
  <div>
    <div>
      <button id="SpeechSynthesisStart" v-on:click="textToSpeech">再生</button>
    </div>
    <div><button v-on:click="serchVoice">声を探す</button></div>
    <div>
      <button id="SpeechSynthesisPause" v-on:click="pauseText">一時停止</button>
    </div>
    <div>
      <button id="SpeechSynthesisStop" v-on:click="cancelText">停止</button>
    </div>
    <div>
      <textarea id="SpeechSynthesisText" v-model="inputText"></textarea>
      <div>{{ inputText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: "",
      pause: false,
    }
  },
  methods: {
    textToSpeech() {
      const uttr = new SpeechSynthesisUtterance()
      uttr.lang = "ja-JP"
      uttr.text = this.inputText
      uttr.pitch = 1
      //声を変える
      uttr.voice = speechSynthesis
        .getVoices()
        .filter((voice) => voice.name === "Google 日本語")[0]
      //
      if (this.pause == false) {
        speechSynthesis.speak(uttr)
        console.log(uttr)
      } else {
        speechSynthesis.resume()
        this.pause = false
      }
    },
    cancelText() {
      const uttr = new SpeechSynthesisUtterance()
      uttr.lang = "ja-JP"
      uttr.text = this.inputText
      speechSynthesis.cancel()
    },
    serchVoice() {
      const uttr = new SpeechSynthesisUtterance()
      uttr.lang = "ja-Jp"
      console.log(uttr)
    },
    pauseText() {
      const uttr = new SpeechSynthesisUtterance()
      uttr.lang = "ja-JP"
      uttr.text = this.inputText
      speechSynthesis.pause()
      this.pause = true
    },
  },
}
</script>
