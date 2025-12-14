const supabaseUrl = 'https://hhpttjceaekmqejzgpcq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhocHR0amNlYWVrbXFlanpncGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NTE3MjYsImV4cCI6MjA4MTEyNzcyNn0.w0sbYO4K5gr1JTNeBtVFqfaU34LaLHeyLT8k-LwRTXE'

const supabase = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
)

async function loadMembers() {
  const { data, error } = await supabase
    .from('member_list')
    .select('id, name, rank, status')

  if (error) {
    console.error('Supabase error:', error)
    return
  }

  // ✅ Custom rank order (higher = higher rank)
  const rankOrder = {
    Boss: 10,
    Vize: 9,
    Einsatzleitung: 7
  }

  // ✅ Sort by custom rank (descending)
  data.sort((a, b) => {
    const rankA = rankOrder[a.rank] ?? 0
    const rankB = rankOrder[b.rank] ?? 0
    return rankB - rankA
  })

  const container = document.querySelector('.member-list')
  container.innerHTML = ''

  data.forEach(member => {
    const div = document.createElement('div')
    div.className = 'member'

    div.innerHTML = `
      <div>${member.name}</div>
      <div>${member.id}</div>
      <div>${member.rank}</div>
      <div class="member-status"
           data-id="${member.id}"
           data-status="${member.status}">
      </div>
    `

    container.appendChild(div)
  })
}

document.addEventListener('click', async e => {
  if (!e.target.classList.contains('member-status')) return

  const id = e.target.dataset.id
  const newStatus =
    e.target.dataset.status === 'active' ? 'inactive' : 'active'

  e.target.dataset.status = newStatus

  await supabase
    .from('member_list')
    .update({ status: newStatus })
    .eq('id', id)
})

loadMembers()
