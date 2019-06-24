<template>
 <v-dialog width="33%" persistent v-model="closeModal">
     <v-btn flat accent slot="activator">Change Date</v-btn>
     <v-card>
         <v-container>
             <v-layout row wrap>
                 <v-flex xs12>
                     <v-card-title>Set New Date</v-card-title>
                 </v-flex>
             </v-layout>
             <v-divider></v-divider>

             <v-layout row wrap>
                    <v-flex xs6 sm4 offset-sm3>
                        <v-date-picker v-model="editableDate"></v-date-picker>                  
                    </v-flex>
            </v-layout>
             <v-divider></v-divider>
             <v-layout row wrap>
                 <v-flex xs12 sm6>
                     <v-card-actions>
                        <v-btn flat class="blue--text darken-1" @click="editMeetupDate">Save</v-btn>
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
            editableDate: null
            // date: new Date(this.meetups.date)
        }
    },
    computed: {
        isAuthenticated () {
            return this.$store.getters.getUser
        }
    },

    methods: {
        editMeetupDate () {           
            const newDate = new Date(this.meetups.date)            

            let newDay = new Date(this.editableDate).toString().substring(8,10)
            let newMonth = new Date(this.editableDate).toString().substring(5,7)
            let newYear = new Date(this.editableDate).toString().substring(0,4)

            newDate.setUTCDate(newDay)
            newDate.setUTCMonth(newMonth)
            newDate.setUTCFullYear(newYear)

            console.log(newDay)

            this.$store.dispatch('updateMeetups', {
                id: this.meetups.meetup_id,
                date: newDate
            })
            this.closeModal = true
        
        }
    },  

    created () {
        this.editableDate = new Date(this.meetups.date).toISOString().substring(0,10)
    }
}
</script>

<style>

</style>
