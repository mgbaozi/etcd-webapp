import { encode, getPrefixRangeEnd } from './lib/key'

const API_PREFIX = '/v3alpha'

function callAPI(endpoint, query) {
  const url = `${API_PREFIX}${endpoint}`
  const fetchOption = {
  }
  fetchOption.method = 'post'
  fetchOption.headers = {}
  fetchOption.headers.Accept = 'application/json'
  fetchOption.headers['Content-Type'] = 'application/json'
  fetchOption.body = JSON.stringify(query)

  fetchOption.headers = new Headers(fetchOption.headers)

  return fetch(url, fetchOption)
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

export const fetchKeys = () => callAPI('/kv/range', { key: 'AA==', range_end: 'AA==', keys_only: true , limit: 100})

export const rangeKeys = prefix => {
  console.log(prefix)
  return callAPI('/kv/range', { key: encode(prefix), range_end: encode(getPrefixRangeEnd(prefix)), keys_only: true , limit: 100})
}
