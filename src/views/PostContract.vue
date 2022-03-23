<template>
  <v-container>
    <v-card
      class="mx-auto my-12 pt-3"
      elevation="2"
      max-width="450"
    >
      <v-card-text>
        <h1>Post Contract</h1>
        <form class="mt-4">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            dense
            clearable
          ></v-text-field>

          <v-textarea
            solo
            class="mb-0"
            rows="4"
            label="Description"
            v-model="description"
          ></v-textarea>

          <v-file-input
            label="Upload Image"
            outlined
            dense
            prepend-icon="mdi-camera"
            v-model="file"
          ></v-file-input>

          <v-btn
            v-if="!loading"
            class="mb-4"
            @click="postContractDetail()"
            block
            color="primary"
            :disabled=isDisabled
          >
            Create
          </v-btn>

          <div class="text-center" v-else>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
        </form>
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
const dataKey = "main";

export default {
  name: "PostContract",
  data: () => ({
    loading: false,
    title: "",
    description: "",
    file: null,
  }),
  computed: {
    isDisabled() {
      return !this.title || !this.description;
    },
  },
  methods: {
    async postContractDetail() {
      try{
        this.loading = true
        console.log(this.title, this.description, this.file)

        let { data } = await client.db.getJSON(publicKey, dataKey)
        console.log(data)

        const json = {
          title: this.title,
          description: this.description
        }

        if(data.length) {
          data.unshift(json);
        }
        else {
          data = [json];
        }

        await client.db.setJSON(privateKey, dataKey, data)

        this.loading = false
        this.$router.push('/')
      } catch(error) {
        console.log(error);
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .flexRow {
    display: flex !important;
  }

  .v-input--selection-controls {
    margin-top: 5px;
    margin-left: 7px;
  }
</style>