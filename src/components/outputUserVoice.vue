<template>
  <div v-if="urls">
    <div>
      <p>１問目</p>
      <audio controls v-bind:src="urls[0]"></audio>
    </div>
    <div v-if="count > 1">
      <p>２問目</p>
      <audio controls v-bind:src="urls[1]"></audio>
    </div>
    <div v-if="count > 2">
      <p>３問目</p>
      <audio controls v-bind:src="urls[2]"></audio>
    </div>
    <div v-if="count > 3">
      <p>４問目</p>
      <audio controls v-bind:src="urls[3]"></audio>
    </div>
    <div v-if="count > 4">
      <p>５問目</p>
      <audio controls v-bind:src="urls[4]"></audio>
    </div>
    <div v-if="count > 5">
      <p>６問目</p>
      <audio controls v-bind:src="urls[5]"></audio>
    </div>
    <div v-if="count > 6">
      <p>７問目</p>
      <audio controls v-bind:src="urls[6]"></audio>
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
      count: 0,
    }
  },
  created() {
    console.log("created")
    const user = firebase.auth().currentUser
    if (user !== null) {
      this.uid = user.uid
      console.log(this.uid)
    }
    this.getUrls()
    this.getCount()
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
    getCount: function () {
      console.log("id=", this.uid)
      console.log("getCount")
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
            console.log(data.count, "this.count")
            this.count = data.count
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
