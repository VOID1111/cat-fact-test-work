<template>
  <hello-world />
</template>

<script lang="ts">
  import Vue from 'vue'
  import HelloWorld from '../components/HelloI18n.vue'

  export default Vue.extend({
    name: 'Home',

    components: {
      HelloWorld,
    },
  })
</script>
