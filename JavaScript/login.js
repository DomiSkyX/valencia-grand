import { supabase } from './supabase.js'

const form = document.querySelector('#loginForm')
const input = document.querySelector('#loginCode')

// ===== LOGIN FORM =====
form.addEventListener('submit', async e => {
  e.preventDefault()

  const code = Number(input.value) // website code (numeric)

  // 1️⃣ Check whitelist: member_list
  const { data: member, error } = await supabase
    .from('member_list')
    .select('code, name')
    .eq('code', code)
    .single()

  if (error || !member) {
    alert('Invalid code')
    return
  }

  // 2️⃣ Record login in logins table
  const { error: loginError } = await supabase
    .from('logins')
    .insert({
      code: member.code,
      name: member.name
    })

  if (loginError) {
    console.error(loginError)
    alert('Login failed')
    return
  }

  // 3️⃣ Save session
  localStorage.setItem('loggedInUser', JSON.stringify({
    code: member.code,
    name: member.name
  }))

  // 4️⃣ Redirect to home
  window.location.href = 'https://domiskyx.github.io/valencia-grand/home/'
})
