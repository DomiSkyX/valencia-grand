import { loadMembers, toggleMemberStatus } from './JavaScript/members.js'


document.addEventListener('DOMContentLoaded', loadMembers)

document.addEventListener('click', async e => {
  if (!e.target.classList.contains('member-status')) return

  const id = Number(e.target.dataset.id)
  const isActive = e.target.dataset.status === 'active'

  await toggleMemberStatus(id, !isActive)
  loadMembers()
})

// Load header
fetch("./components/header.html")
  .then(r => r.text())
  .then(html => document.querySelector("#header").innerHTML = html)

// Load footer
fetch("./components/footer.html")
  .then(r => r.text())
  .then(html => document.querySelector("#footer").innerHTML = html)