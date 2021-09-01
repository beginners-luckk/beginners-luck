<template>
  <div>
    <h2>
      <img v-bind:src="imgPath" alt="" />
    </h2>
    <div><button v-on:click="playInterview">面接開始</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
    <!-- <div v-for="intervie of interviews" :key="intervie.voice">
      質問内容:{{ interviews }}
    </div> -->
  </div>
</template>

<script>
// import { Howl } from "howler"
// import testAudioObject from "../assets/synthesize-output.json"
// console.log(testAudioObject)

export default {
  data() {
    return {
      imgPath: require("@/assets/easy面接官.jpg"),
      interviews: [
        {
          voice: "/yaritaikoto.mp3",
          text: "弊社でやりたいことは何ですか？",
          isdone: false,
        },
        {
          voice: "/tsuyomi.mp3",
          text: "あなたの強みを教えてください",
          isdone: false,
        },
        {
          voice: "/syukatuziku.mp3",
          text: "どのような軸で就職活動を進めていますか？",
          isdone: false,
        },
      ],
    }
  },
  methods: {
    playInterview() {
      // const sound = new Howl({
      //   src: [testAudioObject.audioContent],
      //   format: ["mp3"],
      //   html5: true,
      // })
      // sound.play()

      const audio = new Audio("/zikopr.mp3")
      return audio.play()
    },
    nextInterview() {
      const audio = new Audio()

      // 配列をランダムに取得
      for (let i = this.interviews.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let tmp = this.interviews[i]
        this.interviews[i] = this.interviews[j]
        this.interviews[j] = tmp
        if (tmp.isdone == false) {
          audio.src = tmp.voice
          tmp.isdone = true
          return audio.play()
        } else {
          return
        }
      }
    },
    stopInterview() {},
  },
}
</script>
