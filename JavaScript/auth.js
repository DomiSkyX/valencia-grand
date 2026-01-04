// JavaScript/auth.js
export function requireAuth() {
  const user = localStorage.getItem('loggedInUser')

  if (!user) {
    window.location.href = 'https://domiskyx.github.io/valencia-grand/index.html'
  }
}

export function logout() {
  localStorage.removeItem('loggedInUser')
  window.location.href = 'https://domiskyx.github.io/valencia-grand/index.html'
}
