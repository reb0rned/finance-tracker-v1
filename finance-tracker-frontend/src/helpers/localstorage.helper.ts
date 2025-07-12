export function getTokenFromStorage(): string {
  const data = localStorage.getItem('token')
  const token = data ? JSON.parse(data) : ''

  return token
}

export function setTokenToStorage(token: string): void {
  localStorage.setItem('token', JSON.stringify(token))
}

export function removeTokenFromStorage(): void {
  localStorage.removeItem('token')
}