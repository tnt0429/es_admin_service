import defaultSettings from '@/settings';
const KEY_FIRST = 'ES-KEY-' + defaultSettings.appSimpleName + '-';
const TokenKey = KEY_FIRST + 'Cookie-Token';

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
}
