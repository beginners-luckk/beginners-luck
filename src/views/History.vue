<template>
  <div>
    <div class="wrapper">
      <div style="margin: 20px">
        <pre>
過去に受けた面接の履歴を表示しています。"GoToDetail"から詳細を確認できます！</pre
        >
      </div>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
      />
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <table class="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Mode</th>
                  <th>Date</th>
                  <th>録音を確認する</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.no">
                  <td>{{ item.no }}</td>
                  <td>{{ item.mode }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.gotodetail }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <output-user-voice />
  </div>
</template>

<script>
import outputUserVoice from "../components/outputUserVoice.vue"
export default {
  components: { outputUserVoice },
  data() {
    return {
      items: [
        {
          no: "example",
          mode: "easy",
          date: "2021/09/01",
          gotodetail: "",
        },
      ],
    }
  },
}
</script>
