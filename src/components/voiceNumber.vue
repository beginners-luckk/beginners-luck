<template>
  <div class="box">
    <div class="number">
      <div class="text">1</div>
    </div>
    <div v-if="count > 1" class="number">
      <div class="text">2</div>
    </div>
    <div v-if="count > 2" class="number">
      <div class="text">3</div>
    </div>
    <div v-if="count > 3" class="number">
      <div class="text">4</div>
    </div>
    <div v-if="count > 4" class="number">
      <div class="text">5</div>
    </div>
    <div v-if="count > 5" class="number">
      <div class="text">6</div>
    </div>
    <div v-if="count > 6" class="number">
      <div class="text">7</div>
    </div>
    <div v-if="count > 7" class="number">
      <div class="text">8</div>
    </div>
    <div v-if="count > 8" class="number">
      <div class="text">9</div>
    </div>
    <div v-if="count > 9" class="number">
      <div class="text">10</div>
    </div>
    <div v-if="count > 10" class="number">
      <div class="text">11</div>
    </div>
    <div v-if="count > 11" class="number">
      <div class="text">12</div>
    </div>
    <div v-if="count > 12" class="number">
      <div class="text">13</div>
    </div>
    <div v-if="count > 13" class="number">
      <div class="text">14</div>
    </div>
    <div v-if="count > 14" class="number">
      <div class="text">15</div>
    </div>
    <div v-if="count > 15" class="number">
      <div class="text">16</div>
    </div>
    <div v-if="count > 16" class="number">
      <div class="text">17</div>
    </div>
    <div v-if="count > 17" class="number">
      <div class="text">18</div>
    </div>
    <div v-if="count > 18" class="number">
      <div class="text">19</div>
    </div>
    <div v-if="count > 19" class="number">
      <div class="text">20</div>
    </div>
    <div v-if="count > 20" class="number">
      <div class="text">21</div>
    </div>
    <div v-if="count > 21" class="number">
      <div class="text">22</div>
    </div>
    <div v-if="count > 22" class="number">
      <div class="text">23</div>
    </div>
    <div v-if="count > 23" class="number">
      <div class="text">24</div>
    </div>
    <div v-if="count > 24" class="number">
      <div class="text">25</div>
    </div>
    <div v-if="count > 25" class="number">
      <div class="text">26</div>
    </div>
    <div v-if="count > 26" class="number">
      <div class="text">27</div>
    </div>
    <div v-if="count > 27" class="number">
      <div class="text">28</div>
    </div>
    <div v-if="count > 28" class="number">
      <div class="text">29</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      db: firebase.firestore().collection("users"),
      uid: "",
      count: 0,
      numbers: [],
    }
  },
  created() {
    const user = firebase.auth().currentUser
    if (user !== null) {
      this.uid = user.uid
    }
    this.getCount()
  },
  methods: {
    getCount: function () {
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
            console.log(data.count, "this.count")
            this.count = data.count
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
.number {
  color: gray;
  width: auto;
  height: 58.67px;
  vertical-align: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dotted silver;
}
.text {
  font-size: 30px;
}
</style>
