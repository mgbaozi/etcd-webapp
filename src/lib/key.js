const NO_PREFIX_END = String.fromCharCode(0)

export function encode(key) {
  return window.btoa(key || NO_PREFIX_END)
}

export function decode(key) {
  const result = window.atob(key)
  if (result === NO_PREFIX_END) {
    return ''
  }
  return result
}

export function getPrefixRangeEnd(prefix) {
  const splited = prefix.split('')
  for (var i = splited.length - 1; i >= 0; i--) {
    let code = prefix.charCodeAt(i)
    if (code < 0xff) {
      splited[i] = String.fromCharCode(code+1)
      return splited.join('')
    }
  }
  return String.fromCharCode(0)
}
