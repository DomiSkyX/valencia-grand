import { supabase } from './JavaScript/supabase.js'

const form = document.querySelector('#loginForm')
const input = document.querySelector('#loginCode')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const code = Number(input.value)

  const { data: member, error } = await supabase
    .from('member_list')
    .select('id, name, status')
    .eq('id', code)
    .single()

  if (error || !member) {
    alert('Invalid code')
    return
  }

  const { error: loginError } = await supabase
    .from('logins')
    .insert({
      code: member.id,
      name: member.name
    })

  if (loginError) {
    console.error(loginError)
    alert('Login failed')
    return
  }

  // ✅ SAVE LOGIN SESSION
  localStorage.setItem('loggedInUser', JSON.stringify({
    id: member.id,
    name: member.name
  }))

  // ✅ REDIRECT
  window.location.href = 'https://domiskyx.github.io/valencia-grand/home'
})
