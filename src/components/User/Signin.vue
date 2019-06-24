<template>
<v-container>
     {{hideUnrelatedErrors}}
      <v-layout row v-if="errorMsg">
        <v-flex xs12 sm6 offset-sm3>
            <app-alerts @dismissed="onDismissed"></app-alerts>
        </v-flex>
    </v-layout>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card> 
                <v-card-text>
                    <v-container>
                        <form @submit.prevent="onSignIn">
                            <v-layout row>
                                <v-flex xs12>
                                     <v-text-field 
                                     name="email" 
                                     label="Email" 
                                     id="email" 
                                     v-model="email" 
                                     type="email" 
                                     required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field 
                                    name="password" 
                                    label="Password" 
                                    id="password" 
                                    v-model="password" 
                                    type="password"
                                    required></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                     <v-btn type="submit" :disabled="loading" :loading="loading">Sign In
                                         <template v-slot:loader>
                                        <span class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                         </template>
                                    </v-btn><br>
                                    <span>{{success}}</span>
                                   
                                   
                                </v-flex>
                            </v-layout>
                     
                        </form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>

</template>

<script>
export default {
    name: "signUp",

    data () {
        return {
            email: '',
            password: '',
        }
    },

    computed: {
        getUser () {
            return this.$store.getters.getUser
        },
        isAuthenticated () {
            return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
        },
           errorMsg () {
            return this.$store.getters.getErrorMsg
        },
            loading () {
            return this.$store.getters.loading
        },

            success () {
            return this.$store.getters.getSuccess
        },
            hideUnrelatedErrors () {
            if (this.$store.getters.getErrorCode === "auth/weak-password" || 
                this.$store.getters.getErrorCode === "auth/email-already-in-use" ||
                this.$store.getters.getErrorCode === "auth/invalid-email" 
            ){
                this.$store.dispatch('clearError')
            }

        }
    },

    watch: {
        // watch if user state changes, currently set to null, once signed up user data injected into user property
        getUser (value) {
            console.log(value)
            if (value !== null && value !== undefined) {
                this.$router.push('/')
            }
        }
    },
    methods: {
        onSignIn () {
            // Vuex
           this.$store.dispatch('signUserin', {
               email:  this.email,
               password: this.password
           })
        },
         onDismissed () {
            this.$store.dispatch('clearError')
        }
    }

}
</script>
<style>

</style>
