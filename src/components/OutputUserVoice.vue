<template>
  <div>
    <div>
      <p>１番目</p>
      <audio controls v-bind:src="voiceUrls[0]"></audio>
    </div>
    <div>
      <p>２番目</p>
      <audio controls v-bind:src="voiceUrls[1]"></audio>
    </div>
    <input-user-voice :voiceUrels="voiceUrls"></input-user-voice>
  </div>
</template>

<script>
import InputUserVoice from "./InputUserVoice.vue"

export default {
  components: {
    InputUserVoice,
  },
  data() {
    return {
      voiceUrls: [],
    }
  },
}
</script>
