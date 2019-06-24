import firebase from '../firebase/firebaseConf'
// import 'firebase/auth'
import router from '../router';

const state = {
    loading: false,
    errorMsg: '',
    errorCode: '',
    success: '',
    user: null,
    uid: ''
};

const mutations = {
    setUser (state, payload) {
        state.user = payload
    },
    setUID (state, payload) {
        state.uid = payload
    },
    setError (state, payload) {
        state.errorMsg = payload
    },
    setSuccess (state, payload) {
        state.success = payload
    },
    setLoading (state, payload) {
        state.loading = payload
    },
    clearError (state) {
        state.errorMsg = ''
    },
    setErrorCode (state, payload) {
        state.errorCode = payload
        console.log(state.errorCode)
    }

}

const actions = {
    signUserUp({commit}, payload) {
        // Loading
        commit('setLoading', true)
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(result => {
            let newUser = {
                id: result.user.uid,
                email: result.user.email,
                registeredMeetups: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }

            // add new user to firestore
            firebase.firestore().collection('user').doc(newUser.id).set(newUser)
            commit('setUser', newUser)
            if (result.additionalUserInfo.isNewUser === true) {
                commit('setLoading', false)
                commit('setSuccess', 'You have been successfully signed up!')
            }
        })
        .catch(err => {
            console.log(err) 
            if (err) {      
            commit('setLoading', false)
            commit('setError', err.message)
            commit('setErrorCode', err.code)
            commit('setSuccess', '')
            }
        })
    },
    // User sign in
    signUserin({commit}, payload) {
 
        commit('setLoading', true)
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(result => {
            commit('setLoading', false)
            let signUpUser = {
                id: result.user.uid,
                registeredMeetups: []
            }
            commit('setUID', signUpUser.id)
            commit('setUser', signUpUser)
        })
      
        .catch (err => {
            console.log(err) 
            if (err) {
                commit('setLoading', false)
                commit('setError', err.message)
                commit('setErrorCode', err.code)
            }
    
        })       
    },

    autoSignIn ({commit}) {
        firebase.auth().onAuthStateChanged((firebaseUser) => {
            let user = {
                id: firebaseUser.uid,
                email: firebaseUser.email
            }
            commit('setUser', user)
        })
    },
    clearError ({commit}) {
        commit('clearError')
    },
    
    userSignout({commit}) {
        firebase.auth().signOut()
        commit('setUser', null)
        router.push('/')
    }
}

const getters = {
    getErrorMsg (state) {
        return state.errorMsg || ""        
    },

    getUID (state) {
        return state.uid
    },

    getSuccess (state) {
        return state.success || ""
    },

    getUser (state) {
        return state.user
    },


    loading (state) {
        return state.loading || false
    },
    getErrorCode (state) {
        return state.errorCode || ""
    }

}

export default {
    namespaced: false,
    state,
    mutations,
    actions,
    getters
}




