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
    <v-btn
      v-if="!domainName"
      color="green"
      @click="loginWithUnstoppableDomains()"
    >
      Login With Unstoppable Domain
    </v-btn>
    <p>{{domainName}}</p>
  </v-app-bar>
</template>

<script>
import UAuth from '@uauth/js'

import { UNSTOPPABLEDOMAINS_CLIENTID, UNSTOPPABLEDOMAINS_REDIRECT_URI } from '../config'

const uauth = new UAuth({
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
  scope: "openid wallet email:optional humanity_check:optional"
});

export default {
  name: "Navbar",
  data: () => ({
    domainName: ''
  }),
  methods: {
    async loginWithUnstoppableDomains() {
      try {
        const authorization = await uauth.loginWithPopup()
        authorization.sub = authorization.idToken.sub
        console.log(authorization)

        this.domainName = authorization.idToken.sub
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
  .logo {
    width: 100px;
    margin-top: 7px;
  }
</style>