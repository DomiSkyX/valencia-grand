import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hhpttjceaekmqejzgpcq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhocHR0amNlYWVrbXFlanpncGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NTE3MjYsImV4cCI6MjA4MTEyNzcyNn0.w0sbYO4K5gr1JTNeBtVFqfaU34LaLHeyLT8k-LwRTXE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Fetch members
async function loadMembers() {
    const { data: members, error } = await supabase
        .from('member-list')
        .select('name, id, rank, status');

    if (error) {
        console.error("Supabase error:", error);
        return;
    }

    const container = document.querySelector('.member-list');

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
}

// Toggle listener
document.addEventListener("click", e => {
    if (e.target.classList.contains("member-status")) {
        e.target.dataset.status =
            e.target.dataset.status === "active"
                ? "inactive"
                : "active";
    }
});

loadMembers();
