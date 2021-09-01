<template>
  <div class="History">
    <h1>過去の面接履歴</h1>
  </div>
</template>

<template>
  <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
      <title>Vue で Hello World</title>
      <meta
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        name="viewport"
      />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
      />
      <link rel="stylesheet" href="css/style.css" />
    </head>
    <body class="hold-transition fixed skin-blue-light sidebar-mini">
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
                        <th>No</th>
                        <th>Mode</th>
                        <th>Date</th>
                        <th>録音を確認する</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in items">
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
    </body>
  </html>
</template>

<script>
export default {
  name: "App",
  items: {
    no: "example",
    mode: "easy",
    date: "2021/09/01",
    gotodetail: "",
  },
}
</script>
