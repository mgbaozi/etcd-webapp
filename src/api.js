const API_PREFIX = 'http://localhost:2379/v3alpha'

function callAPI(endpoint, query) {
  const url = `${API_PREFIX}${endpoint}`
  const fetchOption = {
  }
  fetchOption.headers = {}
  fetchOption.headers.Accept = 'application/json'
  fetchOption.headers['Content-Type'] = 'application/json'
  fetchOption.body = JSON.stringify(query)

  fetchOption.headers = new Headers(fetchOption.headers)

  return fetch(url)
    .then(response =>
      response.json().then(json => ({json, response}))
      ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message })
    )
}

export const fetchKeys = () => callAPI('/kv/range', { key: 'AA==', range_end: 'AA==' })
