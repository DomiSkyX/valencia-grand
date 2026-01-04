import { loadMembers, toggleMemberStatus } from './JavaScript/members.js'

// ===== Protect page =====
document.addEventListener('DOMContentLoaded', async () => {
  const user = localStorage.getItem('loggedInUser')

  if (!user) {
    window.location.href = 'https://domiskyx.github.io/valencia-grand/index.html'
    return
  }

  // ✅ Load members ONLY if member list exists
  if (document.querySelector('.member-list')) {
    await loadMembers()
  }
})

// ===== Handle clicks on member-status toggles =====
document.addEventListener('click', async e => {
  if (!e.target.classList.contains('member-status')) return

  const id = Number(e.target.dataset.id)
  const isActive = e.target.dataset.status === 'active'
  const newStatus = isActive ? 'inactive' : 'active'

  await toggleMemberStatus(id, newStatus)

  if (document.querySelector('.member-list')) {
    await loadMembers()
  }
})

// ===== Load header =====
fetch("./components/header.html")
  .then(r => r.text())
  .then(html => {
    document.querySelector("#header").innerHTML = html

    // ✅ Set username AFTER header is loaded
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    if (user) {
      const nameEl = document.querySelector('#userName')
      if (nameEl) nameEl.textContent = user.name
    }

    // ✅ Logout button
    const logoutBtn = document.querySelector('#logoutBtn')
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser')
        window.location.href =
          'https://domiskyx.github.io/valencia-grand/index.html'
      })
    }
  })
  .catch(err => console.error('Failed to load header:', err))

// ===== Load footer =====
fetch("./components/footer.html")
  .then(r => r.text())
  .then(html => document.querySelector("#footer").innerHTML = html)
  .catch(err => console.error('Failed to load footer:', err))
