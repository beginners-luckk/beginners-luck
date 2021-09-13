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
    <div>
      <button @click="deleate" class="finish-button">
        <router-link :to="{ name: 'BeforeSignIn' }"
          >アプリを終了する</router-link
        >
      </button>
      <pre class="information">
      過去に受けた面接の履歴を表示しています。"GoToDetail"から詳細を確認できます！</pre
      >
    </div>
  </div>
</template>

<script>
import interview from "../components/interviiew.vue"
import outputUserVoice from "../components/outputUserVoice.vue"
import voicenumber from "../components/voiceNumber.vue"
import firebase from "firebase"

export default {
  components: { outputUserVoice, voicenumber, interview },
  data() {
    return {
      db: firebase.firestore().collection("users"),
    }
  },
  created() {
    const user = firebase.auth().currentUser
    if (user !== null) {
      this.uid = user.uid
    }
  },
  methods: {
    deleate: function () {
      this.db.doc(this.uid).update({
        userUrl: firebase.firestore.FieldValue.delete(),
      })
      this.db.doc(this.uid).update({
        count: firebase.firestore.FieldValue.delete(),
      })
      this.db.doc(this.uid).update({
        interviews: firebase.firestore.FieldValue.delete(),
      })
    },
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
  padding-right: 35.33px;
  margin: 0px;
  border-left: 0px;
  border-right: 0px;
  text-align: center;
}
.tbody {
  margin: auto;
}
</style>
