<template>
<v-container>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <h4 class="secondary--text">Create A New Meetup</h4>
        </v-flex>
    </v-layout>

    <form @submit.prevent="createMeetup">

    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="title">
            </v-text-field>
        </v-flex>
    </v-layout>

    <v-layout row>

         <v-flex xs12 sm6 offset-sm3>
            <v-text-field
                name="location"
                label="Location"
                id="location"
                required
                v-model="location">
            </v-text-field>
        </v-flex>
    </v-layout>

    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-btn class="tertiary" @click="onFileUpload">Upload Image</v-btn>
            <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display: none;">

        </v-flex>
    </v-layout>

    <!-- <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
        
            <v-text-field name="imageUrl" label="image URL" required v-model="imageUrl"></v-text-field>

        </v-flex>
    </v-layout>
 -->

       <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <img :src="imageUrl" height=150>
         
        </v-flex>
    </v-layout>

    <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-textarea
                name="description"
                label="Description"
                id="description"
                required
                multi-line
                v-model="description">
            </v-textarea>
        </v-flex>

    </v-layout>

    <v-layout row>
        <v-flex xs6 sm4 offset-sm3>
            <v-date-picker v-model="date"></v-date-picker>
                {{showDate}}
        </v-flex>

        <v-flex xs6 sm4 offset-sm3>
            <v-time-picker v-model="time"></v-time-picker>
        </v-flex>
    </v-layout>

     <v-layout>
          <v-flex xs12 sm6 offset-sm3>
              <v-btn class="secondary" type="submit" :disabled="!formIsValid">Create Meetup</v-btn>
        </v-flex>

    </v-layout>
    </form>
</v-container>

</template>

<script>
export default {
    name: "createMeetup",
    data () {
        return {
            title: '',
            location: '',
            imageUrl: '',
            description: '',
            date: new Date().toISOString().substring(0, 10),
            time: new Date (),
            image: null        
        }
    },

    computed: {
        formIsValid () {
            return this.title !== '' && 
            this.location !== '' && 
            this.imageUrl !== '' && 
            this.description !== ''
        },

        submitDateTime () {
            const date = new Date(this.date)
            
            if (typeof this.time === 'string') {
                let hours = this.time.match(/^(\d+)/)[1]
                let minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
           
            }
            else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
            }

            return date
            
        },

        showDate() {
            return this.submitDateTime.toString().substring(0,7)
        }
    },

    methods: {
        createMeetup () {
            if (!this.formIsValid) {
                return;
            }
            if (!this.image) {
                return;
            }
            let data = {
                image: this.image,
                id: Math.random().toString(),
                title: this.title,
                date: this.submitDateTime,
                description: this.description,
                location: this.location,
            }
            this.$store.dispatch('createMeetup', data)
            this.$router.push('/meetups')
        },
          onFileUpload () {
            this.$refs.fileInput.click()            
        },

        onFileChange (event) {
            const files = event.target.files
            let filename = files[0].name
            console.log(files[0])

            if (filename.lastIndexOf('.') <= 0) {
                this.uploadMsg = "ERROR WITH UPLOAD"
            }

            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                console.log(fileReader.result)
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]

        }
    }
}
</script>

<style>

</style>
