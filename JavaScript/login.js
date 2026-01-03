import { supabase } from './supabase.js'

const form = document.querySelector('#loginForm')
const input = document.querySelector('#loginCode')

// ===== LOGIN FORM =====
form.addEventListener('submit', async e => {
  e.preventDefault()

  const code = Number(input.value) // Website code (numeric)

  // 1️⃣ Check member_list for valid code
  const { data: member, error } = await supabase
    .from('member_list')
    .select('code, name')
    .eq('code', code)
    .single()

  if (error || !member) {
    alert('Invalid code')
    return
  }

  // 2️⃣ Insert login record into logins table
  const { error: loginError } = await supabase
    .from('logins')
    .insert({
      code: member.code,
      name: member.name
    })

  if (loginError) {
    console.error(loginError)
    alert('Failed to record login')
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
