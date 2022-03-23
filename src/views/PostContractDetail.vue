<template>
  <v-container>
    <h1>Contract</h1>
    <v-card class="mb-2">
      <v-card-text class="font-weight-bold">
        <h2>{{ this.$route.params.data.title }}</h2>
        <p>{{ this.$route.params.data.description }}</p>
        <pre class="code">{{ this.$route.params.data.code }}</pre>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  
  export default {
    name: 'PostContractDetail',
  }
</script>

<style lang="scss" scoped>
  .code {
    background: #f7f5f5;
    padding: 3px;
  }
</style>