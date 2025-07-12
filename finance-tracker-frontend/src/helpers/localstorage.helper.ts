export function getTokenFromStorage(): string {
  const data = localStorage.get('token')
  const token = data ? JSON.parse(data) : ''

  return token
}

export function setTokenToStorage(key: string = 'token', token: string): void {
  localStorage.setItem(key, JSON.stringify(token))
}

export function removeTokenFromStorage(key: string = 'token'): void {
  localStorage.removeItem(key)
}