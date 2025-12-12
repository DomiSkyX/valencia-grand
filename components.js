// Header und Footer laden
fetch("components/header.html")
  .then(r => r.text())
  .then(html => document.querySelector("#header").innerHTML = html);

fetch("components/footer.html")
  .then(r => r.text())
  .then(html => document.querySelector("#footer").innerHTML = html);
