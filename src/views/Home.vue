<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <communication></communication>
    <slots></slots>
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
  }
};
</script>
