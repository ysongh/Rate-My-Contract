<template>
  <v-container>
    <h1>Contract</h1>
    <v-card class="mb-2">
      <v-card-text class="font-weight-bold">
        <h2>{{ this.$route.params.data.title }}</h2>
        <p>{{ this.$route.params.data.description }}</p>
        <pre class="code">{{ this.$route.params.data.code }}</pre>
        <v-btn v-if="!this.walletAddress" class="btn-add mt-3" color="orange" @click="connectToBlockchain">
          Connect Wallet
        </v-btn>
        <div v-else class="d-flex align-center">
          <v-btn class="btn-add mt-3" color="orange" @click="mintNFT()">
            Mint as NFT
          </v-btn>
          <p class="ml-3 mt-5">{{ this.walletAddress }}</p>
        </div>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text>
        <v-textarea
          solo
          class="mb-0"
          rows="4"
          label="Add comment"
          v-model="comment"
        ></v-textarea>

        <v-btn  v-if="!loading" class="btn-add mb-6" color="orange" @click="addComment()">
          Add Comment
        </v-btn>

        <div class="text-center mb-3" v-else>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>

        <div v-bind:key="comment.date" v-for="comment of comments">
          <v-card
            class="mb-1"
          >
            <v-card-text class="font-weight-bold">
              {{ comment.text}}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt="User"
                    src="comment.text"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ comment.name }} - {{ comment.timestamp }}</v-list-item-title>
                  </v-list-item-content>

                  <v-row
                    align="center"
                    justify="end"
                  >
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { SkynetClient, genKeyPairFromSeed } from "skynet-js"

  import { SEEDPHASE } from '../config'
  const portal = 'https://siasky.net/'
  const client = new SkynetClient(portal)
  const { privateKey, publicKey } = genKeyPairFromSeed(SEEDPHASE)

  export default {
    name: 'PostContractDetail',
    data: () => ({
      loading: false,
      comments: [],
      comment: "",
    }),
    computed: mapGetters(['domainData', 'walletAddress', 'cContract']),
    methods: {
      ...mapActions(['connectToBlockchain']),
      async addComment() {
        try {
          this.loading = true

          let { data } = await client.db.getJSON(publicKey, this.$route.params.data.title)
          console.log(data)
          const json = {
            text: this.comment,
            name: this.domainData?.sub || "Guest",
            timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
          }
          if(data?.length) {
            data.unshift(json);
          }
          else {
            data = [json]
          }
          await client.db.setJSON(privateKey, this.$route.params.data.title, data)
          const newData = await client.db.getJSON(publicKey, this.$route.params.data.title)
           console.log(newData)
          this.comment = ""
          this.comments = newData.data
          this.loading = false
        } catch(error) {
          console.log(error);
          this.loading = false
        }
      },
      async mintNFT() {
        try{
          const tx = await this.cContract.methods
            .buyContract(this.$route.params.data.title, this.walletAddress)
            .send({ from: this.walletAddress })

          console.log(tx)
        } catch(error) {
           console.error(error)
        }
        
      }
    },
    async created() {
      try {
        const { data } = await client.db.getJSON(publicKey, this.$route.params.data.title);
        console.log(data);
        this.comments = data;
      } catch (error) {
        console.log(error);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .code {
    background: #f7f5f5;
    padding: 3px;
  }
</style>