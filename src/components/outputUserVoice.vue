<template>
  <div v-if="urls">
    <div>
      <audio controls v-bind:src="urls[0]"></audio>
    </div>
    <div v-if="count > 1">
      <audio controls v-bind:src="urls[1]"></audio>
    </div>
    <div v-if="count > 2">
      <audio controls v-bind:src="urls[2]"></audio>
    </div>
    <div v-if="count > 3">
      <audio controls v-bind:src="urls[3]"></audio>
    </div>
    <div v-if="count > 4">
      <audio controls v-bind:src="urls[4]"></audio>
    </div>
    <div v-if="count > 5">
      <audio controls v-bind:src="urls[5]"></audio>
    </div>
    <div v-if="count > 6">
      <audio controls v-bind:src="urls[6]"></audio>
    </div>
    <div v-if="count > 7">
      <audio controls v-bind:src="urls[7]"></audio>
    </div>
    <div v-if="count > 8">
      <audio controls v-bind:src="urls[8]"></audio>
    </div>
    <div v-if="count > 9">
      <audio controls v-bind:src="urls[9]"></audio>
    </div>
    <div v-if="count > 10">
      <audio controls v-bind:src="urls[10]"></audio>
    </div>
    <div v-if="count > 11">
      <audio controls v-bind:src="urls[11]"></audio>
    </div>
    <div v-if="count > 12">
      <audio controls v-bind:src="urls[12]"></audio>
    </div>
    <div v-if="count > 13">
      <audio controls v-bind:src="urls[13]"></audio>
    </div>
    <div v-if="count > 14">
      <audio controls v-bind:src="urls[14]"></audio>
    </div>
    <div v-if="count > 15">
      <audio controls v-bind:src="urls[15]"></audio>
    </div>
    <div v-if="count > 16">
      <audio controls v-bind:src="urls[16]"></audio>
    </div>
    <div v-if="count > 17">
      <audio controls v-bind:src="urls[17]"></audio>
    </div>
    <div v-if="count > 18">
      <audio controls v-bind:src="urls[18]"></audio>
    </div>
    <div v-if="count > 19">
      <audio controls v-bind:src="urls[19]"></audio>
    </div>
    <div v-if="count > 20">
      <audio controls v-bind:src="urls[20]"></audio>
    </div>
    <div v-if="count > 21">
      <audio controls v-bind:src="urls[21]"></audio>
    </div>
    <div v-if="count > 22">
      <audio controls v-bind:src="urls[22]"></audio>
    </div>
    <div v-if="count > 23">
      <audio controls v-bind:src="urls[23]"></audio>
    </div>
    <div v-if="count > 24">
      <audio controls v-bind:src="urls[24]"></audio>
    </div>
    <div v-if="count > 25">
      <audio controls v-bind:src="urls[25]"></audio>
    </div>
    <div v-if="count > 26">
      <audio controls v-bind:src="urls[26]"></audio>
    </div>
    <div v-if="count > 27">
      <audio controls v-bind:src="urls[27]"></audio>
    </div>
    <div v-if="count > 28">
      <audio controls v-bind:src="urls[28]"></audio>
    </div>
    <div v-if="count > 29">
      <audio controls v-bind:src="urls[29]"></audio>
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
    console.log("created-output")
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
      this.db.doc(this.uid).update({
        Numbers: firebase.firestore.FieldValue.delete(),
      })
      this.db.doc(this.uid).update({
        count: firebase.firestore.FieldValue.delete(),
      })
    },
  },
}
</script>
