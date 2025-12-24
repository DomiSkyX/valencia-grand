import { supabase } from './JavaScript/supabase.js'

const form = document.querySelector('#loginForm')
const input = document.querySelector('#loginCode')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const code = Number(input.value)

  // 1️⃣ Find member by code
  const { data: member, error } = await supabase
    .from('member_list')
    .select('id, name, status')
    .eq('id', code)
    .single()

  if (error || !member) {
    alert('Invalid code')
    return
  }

  // 2️⃣ Insert login record
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

  // 4️⃣ Redirect to home page
  window.location.href = 'https://domiskyx.github.io/valencia-grand/home'
})
