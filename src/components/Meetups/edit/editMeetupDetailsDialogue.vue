<template>
 <v-dialog width="33%" persistent v-model="closeModal">
     <v-btn fab accent slot="activator">
         <v-icon>edit</v-icon>
     </v-btn>
     <v-card>
         <v-container>
             <v-layout row wrap>
                 <v-flex xs12>
                     <v-card-title>Edit Meetup</v-card-title>
                 </v-flex>
             </v-layout>
             <v-divider></v-divider>
             <v-layout row wrap>
                 <v-flex xs12>
                    <v-card-text>
                        <v-text-field
                        name="title"
                        label="Title"
                        id="title"                                       
                        required                     
                        v-model="edittedTitle">
                    </v-text-field>
                    <v-textarea
                        name="description"
                        label="Description"
                        id="description"                     
                        required
                        multi-line                        
                        v-model="edittedDesc">
                    </v-textarea>
                     </v-card-text>
                 </v-flex>
             </v-layout>
             <v-divider></v-divider>
             <v-layout row wrap>
                 <v-flex xs12 sm6>
                     <v-card-actions>
                        <v-btn flat class="blue--text darken-1" @click="editMeetup">Edit</v-btn>
                         <v-btn flat class="blue--text darken-1" @click="closeModal = false">Close</v-btn>
                     </v-card-actions>
                 </v-flex>

             </v-layout>
         </v-container>
     </v-card>
 </v-dialog>
</template>
<script>

export default {
    props: ["meetups"],
    data () {
        return {
            closeModal: false,
            edittedTitle: this.meetups.title,
            edittedDesc: this.meetups.description
        }
    },
    computed: {
        getMeetupTitle () {
            return this.meetups.title
        },
        getMeetupDescription () {
            return this.meetups.description
        }
    },

    methods: {
        editMeetup () {
            if (this.edittedTitle.trim() === '' || this.edittedDesc.trim() === '') {
                return false
            }
            this.closeModal = false;
            this.$store.dispatch('updateMeetups', {
                id: this.meetups.meetup_id,
                title: this.edittedTitle,
                description: this.edittedDesc,
            })
        }
    }
}
</script>

<style>

</style>
