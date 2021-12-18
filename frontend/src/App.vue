<template>
<router-view/>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      logged: false
    }
  },
  computed: {
    ...mapState(["user", "token"])
  },
  beforeCreate() {
    if (sessionStorage.getItem('token')) {
      const user = {
        id: sessionStorage.getItem("userId"),
        token: sessionStorage.getItem("token")
      }
      this.$store.commit('CHECK_USER', user);
    } else {
      this.$router.push({ name: "Logger" });
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  list-style-type: none;
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  height: 100%;
  width: 100%;
}
a {
  all: unset;
  cursor: pointer;
  transition: 200ms ease-out;
  &:hover {
    color: #FD2D01;
  }
}
</style>
