<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="test">ガクチカ</button>
  </div>
</template>
<script>
export default {
  methods: {
    test: function () {
      const synth = window.speechSynthesis
      const u = new SpeechSynthesisUtterance()
      u.lang = "ja-JP"
      u.text = "学生時代力を入れたことは何ですか"
      u.pitch = -2
      synth.speak(u)
      //window.speechSynthesis.speak(SpeechSynthesisUtterance())
    },
  },
}
</script>
