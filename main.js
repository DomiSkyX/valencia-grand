import { loadMembers, toggleMemberStatus } from './JavaScript/members.js'

// ===== Protect page =====
document.addEventListener('DOMContentLoaded', async () => {
  const user = localStorage.getItem('loggedInUser')
  if (!user) {
    // Not logged in → redirect to login page
    window.location.href = 'https://domiskyx.github.io/valencia-grand/index.html'
  } else {
    // Load members once on page load
    await loadMembers()
  }
})

// ===== Handle clicks on member-status toggles =====
document.addEventListener('click', async e => {
  if (!e.target.classList.contains('member-status')) return

  const id = Number(e.target.dataset.id)
  const isActive = e.target.dataset.status === 'active'
  const newStatus = isActive ? 'inactive' : 'active'

  // Update status in Supabase
  await toggleMemberStatus(id, newStatus)

  // Reload members to update UI
  await loadMembers()
})

// ===== Load header =====
fetch("./components/header.html")
  .then(r => r.text())
  .then(html => document.querySelector("#header").innerHTML = html)
  .catch(err => console.error('Failed to load header:', err))

// ===== Load footer =====
fetch("./components/footer.html")
  .then(r => r.text())
  .then(html => document.querySelector("#footer").innerHTML = html)
  .catch(err => console.error('Failed to load footer:', err))
