import Vue from 'vue'
import Router from 'vue-router'
import firebase from "./firebase/firebaseConf"



let routePaths =  [
  {component: 'home', path: '/', name: 'Home'},
  {component: 'Meetups/Meetups', path: '/meetups', name: 'Meetups'},
  {component: "Meetups/CreateMeetups", path: '/meetups/new', name: 'CreateMeetup',  meta: {requiresAuth: true}},   
  {component: "Meetups/Meetup", path: '/meetups/:id', name: 'Meetup', props: true},
  {component: "User/Profile", path: '/profile', name: 'Profile', meta: {requiresAuth: true}},
  {component: "User/Signup", path: '/signup', name: 'SignUp',  meta: {requiresGuest: true}},
  {component: "User/Signin", path: '/signin', name: 'SignIn', meta: {requiresGuest: true}},
]

const routes = routePaths.map(route => {
  return {
    ...route,
    component: () => import(`./components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

// Route Protection
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser

  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  }
  else if (requiresGuest && isAuthenticated) {
    next("/home")
  }
  else {
    next()
  }
})


export default router