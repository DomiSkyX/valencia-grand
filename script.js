fetch("components/header.html")
  .then(r => r.text())
  .then(html => document.querySelector("#header").innerHTML = html);

fetch("components/footer.html")
  .then(r => r.text())
  .then(html => document.querySelector("#footer").innerHTML = html);

document.querySelectorAll('.member-status').forEach(status => {
    status.addEventListener('click', () => {
        if (status.dataset.status === "active") {
            status.dataset.status = "inactive";
        } else {
            status.dataset.status = "active";
        }
    });
});


let { data: members, error } = await supabase
  .from('member-list')
  .select('name, id, rank, status');

if (error) {
    console.error(error);
}

const container = document.querySelector('.member-list');

// alle Member in HTML umwandeln
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
