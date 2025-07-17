const menu = [
  { name: "Spaghetti Napoli (vegan)", price: 3.60 },
  { name: "Rahmgemüse mit Rösti", price: 3.90 },
  { name: "Schweinebraten mit Dunkelbiersoße, Kartoffelknödel", price: 5.70 },
  { name: "Chili sin Carne (vegan)", price: 3.80 },
  { name: "Hähnchensteak mit Reis und Gemüse", price: 5.20 },
  { name: "Kartoffelsuppe mit Brot (vegan)", price: 2.90 },
  { name: "Kaiserschmarrn mit Apfelmus", price: 3.50 }
];

let cart = [];

function renderMenu() {
  const menuContainer = document.getElementById('menu');

  menu.forEach((item, i) => {
    const col = document.createElement('div');
    
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">
            ${item.name} 
            <span class="menu-price">${item.price.toFixed(2)}€</span>
          </h5>
          <p class="card-text text-muted">Leckeres Gericht aus frischen Zutaten.</p>
          <button class="btn btn-primary w-100" onclick="addToCart(${i})">
            <i class="fas fa-plus"></i> Hinzufügen
          </button>
        </div>
      </div>
    `;

    menuContainer.appendChild(col);
  });
}

function addToCart(index) {
  cart.push(menu[index]); // Gericht dem Warenkorb hinzufügen
  updateCart();           // Warenkorb aktualisieren
}

function updateCart() {
  const list = document.getElementById('cart-list');
  const total = document.getElementById('total');

  list.innerHTML = ""; 
  let sum = 0;

  cart.forEach((item, i) => {
    sum += item.price;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
      ${item.name}
      <span>
        ${item.price.toFixed(2)}€
        <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${i})">×</button>
      </span>
    `;

    list.appendChild(li);
  });

  if (cart.length === 0) {
    list.innerHTML = '<li class="list-group-item text-muted text-center">Keine Artikel</li>';
  }

  total.innerText = `Gesamt: ${sum.toFixed(2)}€`;
}

function removeFromCart(index) {
  cart.splice(index, 1); // Artikel entfernen
  updateCart();          // Warenkorb aktualisieren
}

function checkout() {
  if (cart.length === 0) {
    alert("Warenkorb ist leer!");
    return;
  }

  let summary = cart.map(item => `• ${item.name} - ${item.price.toFixed(2)}€`).join('\n');
  let total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // Zufällige 4-stellige Abholnummer generieren
  const abholnummer = Math.floor(1000 + Math.random() * 9000);

  alert(`Ihre Bestellung:\n\n${summary}\n\nGesamt: ${total}€\n\n🧾 Abholnummer: ${abholnummer}`);

  cart = [];
  updateCart();
}

renderMenu();

const validUsername = "markus";
const validPassword = "markus123";

function login() {
  const enteredUser = document.getElementById("username").value;
  const enteredPass = document.getElementById("password").value;

  if (enteredUser === validUsername && enteredPass === validPassword) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("app").style.display = "block";
    renderMenu(); // App erst nach Login starten
  } else {
    document.getElementById("login-error").style.display = "block";
  }
}

