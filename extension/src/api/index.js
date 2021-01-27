import browser from 'browserApi'

// Simple example of an API interface for REST endpoints

const apiURL = process.env.API_URL

// Helper method to send GET request with headers.
const GET = (route) => {
  return fetch(apiURL + route, {
    headers: !synonymsApi.authToken ? {} : {
      'Authorization': `Bearer ${api.idToken}`
    }
  })
  .then(res => res.json())
}

const api = {
  authToken: null,
  getExample () { // returns result of GET request to apiURL/get-some-data
    return GET(`get-some-data`) 
  }
}

browser.storage.local.get(['authToken'], ({ authToken: t }) => {
  api.authToken = t
})

export default api
