<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    
    <router-link :to="{ path: '/'}">
      <img class="logo" src="../assets/logo.png" alt="Logo">
    </router-link>

    <router-link :to="{ path: '/'}" class="nav-link">
      Home
    </router-link>

    <v-spacer></v-spacer>
    <p class="mt-4">{{this.domainName}}</p>
    <v-btn
      v-if="!domainName"
      color="green"
      @click="loginWithUnstoppableDomains()"
    >
      Login With Unstoppable Domain
    </v-btn>
    <v-btn
      v-else
      class="ml-4"
      color="red"
      @click="logoutFromUnstoppableDomains()"
    >
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UAuth from '@uauth/js'

import { UNSTOPPABLEDOMAINS_CLIENTID, UNSTOPPABLEDOMAINS_REDIRECT_URI } from '../config'

const uauth = new UAuth({
  clientID: UNSTOPPABLEDOMAINS_CLIENTID,
  redirectUri: UNSTOPPABLEDOMAINS_REDIRECT_URI,
  scope: "openid wallet"
  // scope: "openid wallet email:optional humanity_check:optional"
});

export default {
  name: "Navbar",
  data: () => ({
    domainName: ''
  }),
  computed: mapGetters(['domainData']),
  methods: {
    ...mapActions(['changeDomainData']),
    async loginWithUnstoppableDomains() {
      try {
        const authorization = await uauth.loginWithPopup()
        authorization.sub = authorization.idToken.sub
        console.log(authorization)

        this.domainName = authorization.idToken.sub
        this.changeDomainData(authorization)
      } catch (error) {
        console.error(error)
      }
    },
    async logoutFromUnstoppableDomains() {
    try {
      await uauth.logout()

      this.domainName = ""
      this.changeDomainData(null)
    } catch (error) {
      console.error(error);
    }
  }
  },
  created() {
    uauth
      .user()
      .then(userData => {
        console.log(userData);
        this.domainName = userData.sub
        this.changeDomainData(userData)
      })
      .catch(error => {
        console.error('error:', error);
      })
  }
}
</script>

<style>
  .logo {
    width: 100px;
    margin-top: 7px;
  }

  .nav-link {
    text-decoration: none;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    color: #fff !important;
  }
  
  .nav-link:hover {
     color: rgb(184, 193, 203) !important;
  }
</style>