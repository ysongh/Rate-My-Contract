<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <img class="logo" src="./assets/logo.png" alt="Logo">

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
  .logo {
    width: 100px;
  }
</style>