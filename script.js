import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/supabase.es.js';

const supabaseUrl = 'https://YOUR_PROJECT.supabase.co';
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);


// -----------------------------
// MEMBER → aus Supabase laden
// -----------------------------
let { data: members, error } = await supabase
  .from('member-list')
  .select('name, id, rank, status');

if (error) {
    console.error(error);
}

const container = document.querySelector('.member-list');

// Member in HTML einfügen
members.forEach(member => {
    const div = document.createElement('div');
    div.classList.add('member');

    div.innerHTML = `
        <div class="member-name">${member.name}</div>
        <div class="member-id">${member.id}</div>
        <div class="member-rank">${member.rank}</div>
        <div class="member-status" data-status="${member.status.toLowerCase()}"></div>
    `;

    container.appendChild(div);
});


// -------------------------------------
// TOGGLE FUNKTION (Event Delegation)
// -------------------------------------
document.addEventListener("click", e => {
    if (e.target.classList.contains("member-status")) {
        let el = e.target;
        el.dataset.status = el.dataset.status === "active" ? "inactive" : "active";
    }
});
