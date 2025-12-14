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

  console.log('Supabase returned:', data)  // 🔍 add this line


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
    .from('member-list')
    .update({ status: newStatus })
    .eq('rank', rank)
})

loadMembers()
