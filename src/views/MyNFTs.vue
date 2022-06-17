<template>
  <v-container>
    <h1 class="mb-4">My Contract NFTs</h1>

    <v-row justify="center">
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="(item,i) in 5"
          :key="i"
        >
          <v-expansion-panel-header>Contract NFT #{{ i + 1 }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    </v-container>
</template>

<script>
export default {
  name: "MyNFTs"
}
</script>

<style>

</style>