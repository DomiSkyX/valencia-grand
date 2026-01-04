import { supabase } from './supabase.js'

// Extract numeric rank from "(10) - Boss"
function getRankValue(rankText) {
  if (!rankText) return 0
  const match = rankText.match(/\((\d+)\)/)
  return match ? Number(match[1]) : 0
}

export async function loadMembers() {
  const { data, error } = await supabase
    .from('member_list')
    .select('id, name, rank, status')

  if (error) {
    console.error('Supabase error:', error)
    return
  }

  // ✅ Sort by numeric rank extracted from text
  data.sort((a, b) => getRankValue(b.rank) - getRankValue(a.rank))

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
