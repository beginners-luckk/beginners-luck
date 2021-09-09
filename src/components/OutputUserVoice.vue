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
    <UserVoice :voiceUrls="voiceUrls" />
  </div>
</template>

<script>
import UserVoice from "@/components/userVoice.vue"

export default {
  components: { UserVoice },
  data() {
    return {
      voiceUrls: [],
    }
  },
}
</script>
