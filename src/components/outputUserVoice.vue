<template>
  <div>
    <div>
      <p>１番目</p>
      <audio controls v-bind:src="urls[0]"></audio>
    </div>
    <div>
      <p>２番目</p>
      <audio controls v-bind:src="urls[1]"></audio>
    </div>
    <button @click="getUrls">test</button>
    <button @click="deleateUrls">deleate</button>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      db: firebase.firestore().collection("users"),
      urls: [],
      uid: "",
    }
  },
  created() {
    console.log("async")
    const user = firebase.auth().currentUser
    if (user !== null) {
      this.uid = user.uid
      console.log(this.uid)
    }
    this.getUrls()
  },
  methods: {
    getUrls: function () {
      console.log("id=", this.uid)
      console.log("getUrls")
      const id = this.uid
      const ref = this.db
      ref
        .where("uid", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data())
            const data = doc.data()
            data.id = doc.id
            console.log(data, "data")
            console.log(data.userUrl, "this.userurl")
            this.urls = data.userUrl
          })
        })
        .catch((error) => {
          console.log("Error getting documents: ", error)
        })
    },
    deleateUrls: function () {
      this.db.doc(this.uid).update({
        userUrl: firebase.firestore.FieldValue.delete(),
      })
      console.log("deleate", this.urls)
    },
  },
}
</script>
