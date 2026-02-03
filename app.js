const input = document.getElementById("search");
const results = document.getElementById("results");

// 👉 use Worker URL later
const API = "https://YOUR-WORKER.yourname.workers.dev/search";

input.addEventListener("input", debounce(handleSearch, 400));

async function handleSearch() {
  const q = input.value.trim();
  if (!q) {
    results.innerHTML = "";
    return;
  }

  const res = await fetch(`${API}?q=${q}`);
  const data = await res.json();

  render(data);
}

function render(packages) {
  results.innerHTML = "";

  packages.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${p.packageName}</h3>
      <div class="price">₹${p.consumerPrice}</div>
      <p>${p.numberOfParameters} parameters</p>
      <p>Includes CBC + more</p>
      <small>Reports in ${p.labTatString}</small>
    `;

    results.appendChild(div);
  });
}

function debounce(fn, d) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), d);
  };
}
