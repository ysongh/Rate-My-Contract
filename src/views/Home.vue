<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Review the list of Contracts</h1>
      <v-btn
        v-if='this.domainData.sub'
        color="orange"
        elevation="2"
        @click="goToFormPage()"
      >
        <v-icon left>
          mdi-pencil-plus
        </v-icon>Post Contract
      </v-btn>
    </div>

    <v-card
      class="mb-3"
      :key="contract.title"
      v-for="contract in this.contracts"
    >
      <v-card-text>
        <div class="d-flex justify-space-between align-center mb-1">
          <h1>
            {{ contract.title }}
          </h1>
          <p>{{ contract.date }}</p>
        </div>
        <div class="text--primary">
          {{ contract.description }}
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <p class="ml-2">By {{ contract.author }}</p>
        <v-btn
          text
          color="teal accent-4"
          @click="goToDetailPage(contract)"
        >
          View
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { SkynetClient, genKeyPairFromSeed } from "skynet-js"
import { SEEDPHASE } from '../config'

const portal = 'https://siasky.net/'
const client = new SkynetClient(portal)
const { publicKey } = genKeyPairFromSeed(SEEDPHASE)
const dataKey = "main";

export default {
  name: 'Home',
  data: () => ({
    contracts: []
  }),
  components: {
    
  },
  computed: mapGetters(['domainData']),
  methods: {
    goToFormPage() {
      this.$router.push('/post-contract')
    },
    goToDetailPage(data){
      console.log(data);
      this.$router.push({
        name: 'PostContractDetail',
        params: {
          data: data
        }
      })
    }
  },
  async created() {
    try {
      const { data } = await client.db.getJSON(publicKey, dataKey);
      console.log(data);
      this.contracts = data;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
