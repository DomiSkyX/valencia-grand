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
