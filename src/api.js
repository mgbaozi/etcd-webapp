import { encode, decode, getPrefixRangeEnd } from './lib/key'

const ETCD_API_PREFIX = '/proxy/etcd'
const API_PREFIX = '/api'

function serialize(params) {
  const keyValue = []

  for (const key of Object.keys(params)) {
    const value = params[key]
    if (value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          keyValue.push(`${key}=${encodeURIComponent(item)}`)
        })
      } else {
        keyValue.push(`${key}=${encodeURIComponent(value)}`)
      }
    }
  }

  return keyValue.join('&')
}

function callEtcdAPI(endpoint, query) {
  const url = `${ETCD_API_PREFIX}${endpoint}`
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

function callAPI(method, endpoint, query) {
  let url = `${API_PREFIX}${endpoint}`
  const fetchOption = {
    method,
    headers: {
      'Accept': 'application/json',
    },
  }

  if (query && Object.keys(query).length) {
    url = `${url}?${serialize(query)}`
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
  return callEtcdAPI('/kv/range', {
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
  return callEtcdAPI('/kv/range', {
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

export const fetchMembers = () => callEtcdAPI('/cluster/member/list', {})

export const fetchMemberStatus = id => callEtcdAPI('/maintenance/status', { ID: id })

export const fetchSnapshots = cluster => callAPI('get', '/snapshots', {})
