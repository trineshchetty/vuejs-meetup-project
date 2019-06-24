<template>
<v-container>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-card class="info">
                <v-container fluid>
                <v-layout row>
                    <v-flex xs6 sm6 md4>
                        <v-img :src="meetup.imageUrl" height="130"></v-img>
                    </v-flex>
                    <v-flex xs6 sm4 md6 >
                        <v-card-title primary-title>
                            <div>
                            <h3 class="mb-0">{{meetup.title}}</h3>
                            <div>{{meetup.date | date}}</div>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn flat :to="'/meetups/' + meetup.meetup_id"><v-icon left>arrow_forward</v-icon>Meetup</v-btn>
           
                        </v-card-actions>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>

</template>

<script>
export default {
    name: "Meetups",
  
    computed: {
        meetups () {
            return this.$store.getters.loadedMeetups
        },

        count () {
            return this.$store.state.count
        },      
    },
    methods: {
      
    }
}
</script>

<style>

</style>
