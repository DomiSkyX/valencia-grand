import { createClient } from '@supabase/supabase-js'

// ✅ Initialize Supabase ONCE
const supabaseUrl = 'https://hhpttjceaekmqejzgpcq.supabase.co'
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// ✅ Load members
async function loadMembers() {
  const { data: members, error } = await supabase
    .from('member-list')
    .select('id, name, rank, status')

  if (error) {
    console.error('Supabase error:', error)
    return
  }

  const container = document.querySelector('.member-list')
  container.innerHTML = ''

  members.forEach(member => {
    const div = document.createElement('div')
    div.classList.add('member')

    div.innerHTML = `
      <div class="member-name">${member.name}</div>
      <div class="member-id">${member.id}</div>
      <div class="member-rank">${member.rank}</div>
      <div class="member-status"
           data-id="${member.id}"
           data-status="${member.status.toLowerCase()}">
      </div>
    `

    container.appendChild(div)
  })
}

// ✅ Toggle + save to Supabase
document.addEventListener('click', async e => {
  if (!e.target.classList.contains('member-status')) return

  const id = e.target.dataset.id
  const newStatus =
    e.target.dataset.status === 'active' ? 'inactive' : 'active'

  // Update UI immediately
  e.target.dataset.status = newStatus

  // Persist to Supabase
  const { error } = await supabase
    .from('member-list')
    .update({ status: newStatus })
    .eq('id', id)

  if (error) {
    console.error('Update failed:', error)
  }
})

// ✅ Run on load
loadMembers()
