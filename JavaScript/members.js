import { supabase } from './supabase.js'

export async function loadMembers() {
  const { data, error } = await supabase
    .from('member_list')
    .select('id, name, rank, status')

  if (error) {
    console.error('Supabase error:', error)
    return
  }

  const rankOrder = { Boss: 10, Vize: 9, Einsatzleitung: 7 }
  data.sort((a, b) => (rankOrder[b.rank] ?? 0) - (rankOrder[a.rank] ?? 0))

  const container = document.querySelector('.member-list')
  container.innerHTML = ''

  const statusToString = (status) => (status ? 'active' : 'inactive')

  data.forEach(member => {
    const div = document.createElement('div')
    div.className = 'member'

    div.innerHTML = `
      <div>${member.name}</div>
      <div>${member.id}</div>
      <div>${member.rank}</div>
      <div class="member-status ${statusToString(member.status)}"
           data-id="${member.id}"
           data-status="${statusToString(member.status)}">
      </div>
    `
    container.appendChild(div)
  })
}

export async function toggleMemberStatus(id, newStatus) {
  await supabase
    .from('member_list')
    .update({ status: newStatus === 'active' })
    .eq('id', id)
}
