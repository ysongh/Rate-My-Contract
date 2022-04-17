<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <span>Rate My Contract</span>

      <v-spacer></v-spacer>
      
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  },
  data: () => ({
    //
  }),
};
</script>


<style scoped>
</style>