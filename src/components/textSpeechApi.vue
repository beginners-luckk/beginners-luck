<template>
  <div>
    <h2>
      <audio controls src="/synthetic-audio.mp3"></audio>
    </h2>
    <div><button v-on:click="playInterview">質問1</button></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audio: new Audio("/synthetic-audio.mp3"),
    }
  },
  methods: {
    playInterview() {
      let audio = new Audio("/synthetic-audio.mp3")
      return audio.play()
    },
  },
}
</script>
