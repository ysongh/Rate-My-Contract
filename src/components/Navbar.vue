<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    
    <router-link :to="{ path: '/'}">
      <img class="logo" src="../assets/logo.png" alt="Logo">
    </router-link>

    <v-spacer></v-spacer>
    
  </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>
  .logo {
    width: 100px;
    margin-top: 7px;
  }
</style>