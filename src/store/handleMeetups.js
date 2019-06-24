import firebase from '../firebase/firebaseConf'
// import { url } from 'inspector';

const state = {
    meetups: [],
    meetupID: ''
      
}
const mutations = {
    createMeetup (state, payload) {
        state.meetups.push(payload)     
    },

    getMeetups (state, payload) {
        state.meetups = payload 
    },
    updateMeetupData(state, payload) {
        const meetup = state.meetups.find(meetup => {
            return meetup.meetup_id === payload.id
        })

        if (payload.description) {
            meetup.description = payload.description
        }
        if (payload.title) {
            meetup.title = payload.title
        }
        if (payload.date) {
            meetup.date =  payload.date
        }       

    }
}


const actions  = {
    getLoadedMeetups ({commit}) {
    commit('setLoading', true)
    let meetups = []
      firebase.firestore().collection("meetups").get().then((snapshot) => {
            snapshot.docs.filter((result) => {
                let props = result.data()
                console.log(props)
                meetups.push({
                    meetup_id: props.meetup_id,
                    meetupCreatorUID: props.meetupCreatorUID,
                    title: props.title,
                    description: props.description,
                    location: props.location,
                    date: props.date,
                    imageUrl: props.imageUrl

                })
                // Meetups holds new array of meetups. Essentially overwrote the meetup state.             
         
            })  
            commit('getMeetups', meetups)
            commit('setLoading', false)     
            
          
      })
      .catch(err => {
        console.log(err)
        commit('setLoading', true)
    
      })
    },
    
    createMeetup ({commit}, payload) {    
        let imageUrl;    
        firebase.auth().onAuthStateChanged((firebaseUser) => {           
            const meetup = {        
                meetup_id: payload.id,
                title: payload.title,
                date: payload.date.toISOString(),
                description: payload.description,
                location: payload.location,     
                meetupCreatorUID: firebaseUser.uid
            }
            if (firebaseUser) {
                firebase.firestore().collection('meetups').doc(meetup.meetup_id).set(meetup)
                .then(result => {
                    console.log(result)
                   
                })
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                return firebase.storage().ref('meetups/' + meetup.meetup_id + ext).put(payload.image)
                .then (fileData => {
                    fileData.ref.getDownloadURL()
                    .then(urls => {
                        imageUrl = urls

                        firebase.firestore().collection("meetups").doc(meetup.meetup_id)
                        .update({
                            imageUrl: imageUrl
                        })
                        .then(() => {
                            commit('createMeetup', {
                                ...meetup,
                                imageUrl: imageUrl
                            })
                        })    
                        .catch(err => {
                            console.log(err)
                        })
                        .then(() => {
                            console.log("image url successfully added to assosiated meetup")
                        })
                        .catch(err => {
                            console.log(err)
                        })

                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                       
                .catch(err => {
                    console.log(err)
                })            
            }
        })
    },

    updateMeetups ({commit}, payload) {
        commit('setLoading', true)

        let meetupData = {}
        if (payload.title) {
            meetupData.title = payload.title
        }
        if (payload.description) {
            meetupData.description = payload.description
        }
        if (payload.date) {
            meetupData.date = payload.date 
        }

        let meetupCollection = firebase.firestore().collection("meetups").doc(payload.id)
        meetupCollection.update(meetupData)
        .then(() => {
            commit('setLoading', false)
            commit('updateMeetupData', payload)
        })
        .catch(err => {
            commit('setLoading', false)
            console.log(err)
        })
    }
}
const getters = {
    loadedMeetups (state) {
        return state.meetups.sort((A, B) => {
          return A.date > B.date
        })
      },
      
      loadedMeetup (state) {
        return (meetupID) => {
          return state.meetups.find((meetup) => {
            return meetup.meetup_id === meetupID
          })
        }
      },
}

export default {
    namespaced: false,
    state,
    mutations,
    actions,
    getters
}