<template>
  <div>
    <div class="wrapper">
      <!-- <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
      /> -->
      <div class="container">
        <table class="table">
          <thead class="thead">
            <tr class="thead">
              <th class="thead">No.</th>
              <th class="thead">YourAnsewer</th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr>
              <td><voicenumber /></td>
              <td><output-user-voice /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div style="margin: 20px">
      <pre>
過去に受けた面接の履歴を表示しています。"GoToDetail"から詳細を確認できます！</pre
      >
    </div>
  </div>
</template>

<script>
import outputUserVoice from "../components/outputUserVoice.vue"
import voicenumber from "../components/voiceNumber.vue"

export default {
  components: { outputUserVoice, voicenumber },
  data() {
    return {
      items: [
        {
          no: "example",
        },
      ],
    }
  },
}
</script>
<style>
.wrapper {
  padding-right: 100px;
  padding-left: 100px;
}
.container {
  padding-right: 100px;
  padding-left: 100px;
}
.table {
  margin: auto;
  width: 70%;
}
.thead {
  font-size: 30px;
  border-bottom: 1px solid black;
  padding: 0px;
}
.tbody {
  margin: auto;
}
</style>
