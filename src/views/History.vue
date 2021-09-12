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
              <th class="thead"></th>
              <th class="thead-int">Interview</th>
              <th class="thead">YourAnsewer</th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr>
              <td><voicenumber /></td>
              <td><interview /></td>
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
import interview from "../components/interviiew.vue"
import outputUserVoice from "../components/outputUserVoice.vue"
import voicenumber from "../components/voiceNumber.vue"

export default {
  components: { outputUserVoice, voicenumber, interview },
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
.table {
  margin: auto;
  width: 70%;
}
.thead {
  font-size: 30px;
  border-bottom: 1px dotted black;
  padding: 0px;
  margin: 0px;
  border-left: 0px;
  border-right: 0px;
}
.thead-int {
  font-size: 30px;
  border-bottom: 1px dotted black;
  padding-right: 30px;
  margin: 0px;
  border-left: 0px;
  border-right: 0px;
  text-align: center;
}
.tbody {
  margin: auto;
}
</style>
