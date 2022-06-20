<template>
  <v-container>
    <h1 class="mb-4">My Contract NFTs</h1>

    <v-row justify="center">
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="nft in this.nfts"
          :key="nft.id"
        >
          <v-expansion-panel-header>Contract NFT #{{ nft.id }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ nft.title }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "MyNFTs",
  data: () => ({
    nfts: []
  }),
  computed: mapGetters(['domainData', 'walletAddress', 'cContract']),
  async created() {
    try {
      this.loading = true
      const totalNFTs = await this.cContract.methods._nftIds().call()
      console.log(totalNFTs)

      let temp = [];
      for(let i = 1; i < totalNFTs; i++){
        const data = await this.cContract.methods.contractNFTList(i).call()
        console.log(data)
        if(this.walletAddress === data.owner) temp.push(data)
      }

      this.nfts = temp
      this.loading = false
    } catch (error) {
      console.log(error);
       this.loading = false
    }
  }
}
</script>

<style>

</style>