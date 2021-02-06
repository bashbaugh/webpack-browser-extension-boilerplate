// TODO Write auth util functions for signin/signout flows

import firebase from 'firebase/app'
import 'firebase/auth'
import browser from 'browserApi'
import { setApiToken } from '../api'

chrome.runtime.onMessage.addListener((msg, sender, respond) => {
  switch (msg.action) {
    case 'signIn':
      // TODO developer
      break
    case 'getIdToken':
      if (!firebase.auth().currentUser) return null
      firebase.auth().currentUser.getIdToken()
        ?.then(t => {
          chrome.storage.local.set({ idToken: t })
          respond(t)
        })
      break
    case 'signOut':
      // TODO developer
      break
  }
  return true
})

export default function initializeAuth () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Store token so it can be used by other scripts
      user.getIdToken()
        .then(t => {
          chrome.storage.local.set({idToken: t})
          setApiToken(t)
        })
    } else {
      chrome.storage.local.remove(['idToken'])
    }
  })
}
