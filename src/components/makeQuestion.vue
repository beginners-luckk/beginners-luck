<template>
  <div>
    <textarea v-model="imputText"></textarea>
    <button @click="postQuestion">add</button>
    <div>{{ user.userQuestion }}</div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  computed: {
    user: function () {
      return this.$store.state.user
    },
  },
  data() {
    return {
      db: firebase.firestore(),
      imputText: "",
    }
  },
  methods: {
    postQuestion: function () {
      this.db
        .collection("users")
        .doc(this.user.uid)
        .update({
          userQuestion: firebase.firestore.FieldValue.arrayUnion(
            this.imputText
          ),
        })
        .then(() => {
          console.log("Document successfully written!")
        })
        .catch((error) => {
          console.error("Error writing document: ", error)
        })
    },
  },
}
</script>
