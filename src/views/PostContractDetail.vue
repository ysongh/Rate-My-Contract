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
            color="#26c6da"
            dark
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
                    <v-icon class="mr-1">
                      mdi-heart
                    </v-icon>
                    <span class="subheading mr-2">0</span>
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
  import { SkynetClient, genKeyPairFromSeed } from "skynet-js";
  import { SEEDPHASE } from '../config';
  const portal = 'https://siasky.net/';
  const client = new SkynetClient(portal);
  const { privateKey, publicKey } = genKeyPairFromSeed(SEEDPHASE);

  export default {
    name: 'PostContractDetail',
    data: () => ({
      loading: false,
      comments: [],
      comment: "",
    }),
    methods: {
      async addComment() {
        try {
          this.loading = true

          let { data } = await client.db.getJSON(publicKey, this.$route.params.data.title)
          console.log(data)
          const json = {
            text: this.comment,
            name: "Guest",
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
          
          this.comment = ""
          this.comments = newData.data
          this.loading = false
        } catch(error) {
          console.log(error);
          this.loading = false
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