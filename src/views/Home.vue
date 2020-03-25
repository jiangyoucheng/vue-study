<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <communication></communication>
  </div>
</template>

<script>
// @ is an alias to /src
import communication from '@/components/communication'
export default {
  name: 'Home',
  components: {
    communication
  }
}
</script>
