<template>
  <div class="box">
    <div
      class="interview-history"
      v-for="interview in interviews"
      :key="interview"
    >
      {{ interview }}
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      db: firebase.firestore().collection("users"),
      interviews: [],
      uid: "",
    }
  },
  created() {
    console.log("created-int")
    const user = firebase.auth().currentUser
    if (user !== null) {
      this.uid = user.uid
      console.log(this.uid)
    }
    this.getIntervews()
  },
  methods: {
    getIntervews: function () {
      console.log("getInts")
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
            console.log(data.interviews, "this.int")
            this.interviews = data.interviews
          })
        })
        .catch((error) => {
          console.log("Error getting documents: ", error)
        })
    },
  },
}
</script>
<style>
.box {
  margin: 0px;
  border: 0px;
  padding: 0px;
}
.interview-history {
  width: auto;
  height: 58.67px;
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px dotted silver;
  font-size: 50%;
}
</style>
