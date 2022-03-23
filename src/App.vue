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
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>


<style scoped>
</style>