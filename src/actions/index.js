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

function action(type, payload = {}) {
  return {type, ...payload}
}

export const keys = {
  request: () => action(KEYS.REQUEST),
  success: response => action(KEYS.SUCCESS, { response }),
  failure: error => action(KEYS.FAILURE, { error }),
}
