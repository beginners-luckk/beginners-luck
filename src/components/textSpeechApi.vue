<template>
  <div>
    <h2>
      <img v-bind:src="imgPath" alt="" />
    </h2>
    <div><button v-on:click="playInterview">質問</button></div>
    <div><button v-on:click="nextInterview">次の質問</button></div>
    <div><button v-on:click="stopInterview">終了</button></div>
    <!-- <div v-for="intervie of interviews" :key="intervie.voice">
      質問内容:{{ interviews }}
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgPath: require("@/assets/面接官.jpg"),
      interviews: [
        { voice: "/yaritaikoto.mp3", text: "弊社でやりたいことは何ですか？" },
        { voice: "/tsuyomi.mp3", text: "あなたの強みを教えてください" },
        {
          voice: "/syukatuziku.mp3",
          text: "どのような軸で就職活動を進めていますか？",
        },
      ],
    }
  },
  methods: {
    playInterview() {
      const audio = new Audio("/yaritaikoto.mp3")
      return audio.play()
    },
    nextInterview() {
      const audio = new Audio()

      // 配列をランダムに取得
      for (let i = this.interviews.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var tmp = this.interviews[i]
        this.interviews[i] = this.interviews[j]
        this.interviews[j] = tmp
        audio.src = this.interviews[i].voice
      }

      return audio.play()
    },
    stopInterview() {},
  },
}
</script>
