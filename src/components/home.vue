<template>
<v-container>
  <!-- Buttons -->
    <v-layout row wrap class="mb-2">
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
            <v-btn class="tertiary" large router to="/meetups">Explore Meetups</v-btn>
        </v-flex>

        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
            <v-btn class="tertiary" large router to="/meetups/new">Organise Meetups</v-btn>
        </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 class="text-xs-center">
       <v-progress-circular
      :size="50"
      color="amber"
      indeterminate
      v-if="loading"
    ></v-progress-circular>
  </v-flex>
    </v-layout>
    <!-- Carousel -->
    <v-layout row wrap class="mt-2 mb-2">
    <v-flex xs12>
      <v-carousel>
      <v-carousel-item v-for="meetup in meetups" v-bind:src="meetup.imageUrl" :key="meetup.id" @click="onLoadMeetup(meetup.meetup_id)">
        <div class="carousel-title">
          {{meetup.title}}
        </div>
      </v-carousel-item>
    </v-carousel>
    </v-flex>
    </v-layout>

    <!-- Subtext join us -->
       <v-layout row wrap class="mb-2">
        <v-flex xs12 class="text-xs-center">
          <p>Join us now!</p>
        </v-flex>
    </v-layout>
</v-container>
</template>

<script>

export default {
  name: 'Home',
  props: {
 
  },

  data () {
    return {
    
    }
  },
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    },

    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
       this.$router.push('/meetups/' + id)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.carousel-title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0,0,0,0.5);
  color: white;
  font-size: 2em;
  padding: 30px;
}

</style>