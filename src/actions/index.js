const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

export const KEYS = createRequestTypes('KEYS')
export const KV = createRequestTypes('KV')
export const MEMBERS = createRequestTypes('MEMBERS')
export const SNAPSHOTS= createRequestTypes('SNAPSHOTS')
export const CLUSTERS = createRequestTypes('SNAPSHOTS')
export const STATUS = createRequestTypes('STATUS')

export const FETCH_KEYS = 'FETCH_KEYS'
export const FETCH_KEY = 'FETCH_KEY'

export const FETCH_MEMBERS = 'FETCH_MEMBERS'
export const FETCH_MEMBER_STATUS = 'FETCH_MEMBER_STATUS'

export const FETCH_SNAPSHOTS = 'FETCH_SNAPSHOTS'
export const FETCH_CLUSTERS = 'FETCH_CLUSTERS'

function action(type, payload = {}) {
  return {type, ...payload}
}

export const keys = {
  request: prefix => action(KEYS.REQUEST, { prefix }),
  success: response => action(KEYS.SUCCESS, { response }),
  failure: error => action(KEYS.FAILURE, { error }),
}

export const fetchKeys = prefix => action(FETCH_KEYS, { prefix })

export const kv = {
  request: key => action(KV.REQUEST, { key }),
  success: response => action(KV.SUCCESS, { response }),
  failure: error => action(KV.FAILURE, { error }),
}

export const fetchKey = key => action(FETCH_KEY, { key })

export const members = {
  request: () => action(MEMBERS.REQUEST, {}),
  success: response => action(MEMBERS.SUCCESS, { response }),
  failure: error => action(MEMBERS.FAILURE, { error }),
}

export const fetchMembers = () => action(FETCH_MEMBERS, {})

export const status = {
  request: id => action(STATUS.REQUEST, { id }),
  success: response => action(STATUS.SUCCESS, { response }),
  failure: error => action(STATUS.FAILURE, { error }),
}

export const fetchMemberStatus = id => action(FETCH_MEMBER_STATUS, { id })

export const snapshots = {
  request: cluster => action(SNAPSHOTS.REQUEST, {}),
  success: response => action(SNAPSHOTS.SUCCESS, { response }),
  failure: error => action(SNAPSHOTS.FAILURE, { error }),
}

export const fetchSnapshots = () => action(FETCH_SNAPSHOTS, {})

export const clusters = {
  request: () => action(CLUSTERS.REQUEST, {}),
  success: response => action(CLUSTERS.SUCCESS, { response }),
  failure: error => action(CLUSTERS.FAILURE, { error }),
}

export const fetchClusters = () => action(FETCH_CLUSTERS, {})
