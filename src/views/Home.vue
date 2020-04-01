<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <communication></communication>
    <slots></slots> -->
    <p>count：{{$store.state.count}}</p>
    <!-- <p>doubleCount：{{$store.getters.doubleCount}}</p> -->
    <button @click="minus">-</button>
    <button @click="add">+</button>
    <button @click="addAsyn">异步增加</button>
  </div>
</template>

<script>
// @ is an alias to /src
import communication from "@/components/communication";
import slots from "@/components/slots";
export default {
  name: "Home",
  components: {
    communication,
    slots
  },
  methods: {
    minus() {
      if(this.$store.state.count>0){
        this.$store.commit('minus');
      }
    },
    add() {
      this.$store.commit('add');
    },
    addAsyn() {
      this.$store.dispatch('add');
    }
  }
};
</script>
