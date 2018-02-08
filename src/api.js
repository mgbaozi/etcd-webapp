import { encode, decode, getPrefixRangeEnd } from './lib/key'

const API_PREFIX = '/v3alpha'

function callAPI(endpoint, query) {
  const url = `${API_PREFIX}${endpoint}`
  const fetchOption = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  }

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

export const fetchKeys = prefix => {
  return callAPI('/kv/range', {
    key: encode(prefix),
    range_end: encode(getPrefixRangeEnd(prefix)),
    keys_only: true ,
    limit: 50000,
  }).then(
    action => {
      if (action.response) {
        action.response.kvs = action.response.kvs.map(item => decode(item.key))
      }
      return action
    }
  )
}

export const fetchKey = key => {
  return callAPI('/kv/range', {
    key: encode(key),
  }).then(
    action => {
      if (action.response) {
        const { key, value } = action.response.kvs[0]
        action.response.kvs[0].key = decode(key)
        action.response.kvs[0].value = decode(value)
      }
      return action
    }
  )
}
