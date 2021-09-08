<template>
  <div class="wrapper">
    <div style="margin: 20px">
      <pre>
過去に受けた面接の履歴を表示しています。"GoToDetail"から詳細を確認できます！
</pre
      >
    </div>
    <div id="app">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div id="app">
              <table class="table">
                <thead>
                  <tr>
                    <p>No</p>
                    <p>Mode</p>
                    <p>Date</p>
                    <p>録音を確認する</p>
                  </tr>
                </thead>
                <tbody>
                  <tr v-bind:key="item in items">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: {
        no: "example",
        mode: "easy",
        date: "2021/09/01",
        gotodetail: "",
      },
    }
  },
}
</script>
