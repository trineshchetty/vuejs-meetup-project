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
                        <form @submit.prevent="onSignUp">
                              
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
                                    <v-text-field 
                                    name="confirmPassword" 
                                    label="Confirm Password" 
                                    id="confirmPasword" 
                                    v-model="confirmPassword" 
                                    type="password"
                                    :rules="[comparePasswords]">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn type="submit" :disabled="loading" :loading="loading">Sign up
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
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
       
        }
    },

    computed: {
        comparePasswords () {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        errorMsg () {
            return this.$store.getters.getErrorMsg
        },
        success () {
            return this.$store.getters.getSuccess
        },

        getUser () {
            return this.$store.getters.getUser
        },

       

        loading () {
            return this.$store.getters.loading
        },
          hideUnrelatedErrors () {
            if (this.$store.getters.getErrorCode === "auth/wrong-password" || 
                this.$store.getters.getErrorCode === "auth/user-not-found" 
            ){
                this.$store.dispatch('clearError')
            }

        },
      
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
        onSignUp () {
            // Vuex
           this.$store.dispatch('signUserUp', {
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
