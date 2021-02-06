// Helper methods to send requests with headers. Add other functions if you need to send other types of requests.

import browser from 'browserApi'

const apiURL = process.env.API_URL

let token
export const setApiToken = t => { token = t }

export default function (type, route, data) {
  const headers = !token ? {} : {
    'Authorization': `Bearer ${token}`
  }

  if (type === 'post') return fetch(apiURL + route, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
  .then(res => res.json())

  else return fetch(apiURL + route, {
    headers
  })
  .then(res => res.json())
}
