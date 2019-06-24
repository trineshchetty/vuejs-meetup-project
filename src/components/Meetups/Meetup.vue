<template>
    <v-container>
        <v-layout row v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                :size="50"
                color="amber"
                indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card>                     
                    <v-card-title>
                        <h3 class="secondary--text">{{meetup.title}}</h3>
                        <v-spacer></v-spacer>
                        <template v-if="userIsCreator">
                            <edit-meetup-modal :meetups="meetup"></edit-meetup-modal>
                        </template> 
                    </v-card-title>

                    <v-img :src="meetup.imageUrl" height="500px"></v-img>

                    <v-card-text>
                        <div class="info--text ">
                            {{meetup.date | date}} - {{meetup.location}}
                            <template v-if="userIsCreator">
                                <edit-meetup-date-modal :meetups="meetup"></edit-meetup-date-modal>
                            </template>
                        </div>
                       {{meetup.description}}
                    </v-card-text>
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="secondary">Register</v-btn>
                    </v-card-actions>
                </v-card>

            </v-flex>
        </v-layout>


    </v-container>
</template>

<script>
export default {
    props: ['id'],
    name: "Meetup",
    computed: {
        meetup () {
            return this.$store.getters.loadedMeetup(this.id)
        },

        isAuthenticated () {
            return this.$store.getters.getUser !== undefined && this.$store.getters.getUser !== null
        },     
        userIsCreator () {
            if (!this.isAuthenticated) {
                return false
            }
            if (this.$store.getters.getUser.id === this.meetup.meetupCreatorUID) {
                return true
            }
            else {
                return false
            }
        },

        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>

<style>

</style>
