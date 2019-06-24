<template>
<v-app>
    <v-toolbar class="primary">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor: pointer">
          Meetup Finder</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
    <v-toolbar-items   class="hidden-xs-only">
      <v-btn :key="items.id" v-for="items in menuItems" :to="items.link" flat class="white--text">
        <v-icon left>{{items.icon}}</v-icon>{{items.title}}</v-btn>
      <v-btn v-if="isAuthenticated" @click="logout" flat class="white--text">
        <v-icon left>exit_to_app</v-icon>Log Out</v-btn>
        
    </v-toolbar-items>
    
    </v-toolbar>

      <main>
       <router-view></router-view>
    </main>

    <v-navigation-drawer 
    temporary 
    v-model="sideNav"
    :clipped="$vuetify.breakpoint.lgAndUp"
    fixed
    app>
    <v-list>
      <v-list-tile :key="items.id" v-for="items in menuItems" :to="items.link">
        <v-list-tile-action>
          <v-icon>{{items.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>{{items.title}}</v-list-tile-content>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
          <v-list-tile-content v-if="isAuthenticated">Log Out</v-list-tile-content>
   
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>


</v-app>
</template>
<script>

export default {
  name: "app",
  data () {
    return {
      sideNav: false  
    }
  },

  computed: {
    menuItems () {
      let menuItems = [       
        {icon: 'face', title: 'Sign Up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]

      if (this.isAuthenticated) {
        menuItems = [ {icon: 'supervisor_account', title: 'View Meetups', link: "/meetups"},
                      {icon: 'room', title: 'Organise Meetup', link: '/meetups/new'},
                      {icon: 'person', title: 'Profile', link: '/profile'},                      
                  
        ];
      }
      return menuItems
    },

    isAuthenticated () {
      return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
    }  
  },

  methods: {
    logout () {
      this.$store.dispatch('userSignout')
    }
  }  
}

</script>
<style>

/* Global Loader Style */

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
