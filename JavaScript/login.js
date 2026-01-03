import { supabase } from './supabase.js'

const form = document.querySelector('#loginForm')
const input = document.querySelector('#loginCode')

form.addEventListener('submit', async e => {
  e.preventDefault()

  // ✅ Keep code as string to match Supabase column type
  const code = input.value.trim()

  // ✅ Lookup member
  const { data: member, error } = await supabase
    .from('member_list')
    .select('id, name')
    .eq('id', code)
    .single()

  console.log({ member, error }) // debug: see response

  if (error || !member) {
    alert('Invalid code')
    return
  }

  // ✅ Insert login record
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

  // ✅ Save session
  localStorage.setItem('loggedInUser', JSON.stringify({
    id: member.id,
    name: member.name
  }))

  // ✅ Redirect to home
  window.location.href = 'https://domiskyx.github.io/valencia-grand/home/'
})
