export function getToken() {
  return window.location.hash && window.location.hash.split('=')[1].split('&token')[0]
}