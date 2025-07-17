// Menü-Daten: Liste aller verfügbaren Speisen mit Namen und Preis
const menu = [
  { name: "Schnitzel", price: 4.2 },
  { name: "Veggie Pasta", price: 3.8 },
  { name: "Lachs mit Reis", price: 5.5 },
  { name: "Vegane Bowl", price: 3.2 },
  { name: "Kaffee", price: 2.5 },
  { name: "Backwaren", price: 1.2 }
];

// Warenkorb (dynamisch befüllte Liste)
let cart = [];

/**
 * Funktion zum Erzeugen des Menübereichs im HTML
 * Fügt für jedes Gericht eine Karte ins DOM ein
 */
function renderMenu() {
  const menuContainer = document.getElementById('menu');

  menu.forEach((item, i) => {
    const col = document.createElement('div');

    // HTML-Struktur für ein Gericht (mit Button)
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

    // Karte wird ins Menü-Grid eingefügt
    menuContainer.appendChild(col);
  });
}

/**
 * Funktion zum Hinzufügen eines Artikels zum Warenkorb
 * @param {number} index - Index des Artikels im Menü
 */
function addToCart(index) {
  cart.push(menu[index]); // Gericht dem Warenkorb hinzufügen
  updateCart();           // Warenkorb aktualisieren
}

/**
 * Aktualisiert die Anzeige des Warenkorbs im DOM
 */
function updateCart() {
  const list = document.getElementById('cart-list');
  const total = document.getElementById('total');

  list.innerHTML = ""; // Liste leeren
  let sum = 0;

  // Jeden Artikel im Warenkorb anzeigen
  cart.forEach((item, i) => {
    sum += item.price;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // Eintrag mit Name, Preis und Entfernen-Button
    li.innerHTML = `
      ${item.name}
      <span>
        ${item.price.toFixed(2)}€
        <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${i})">×</button>
      </span>
    `;

    list.appendChild(li);
  });

  // Wenn der Warenkorb leer ist, Text anzeigen
  if (cart.length === 0) {
    list.innerHTML = '<li class="list-group-item text-muted text-center">Keine Artikel</li>';
  }

  // Gesamtpreis aktualisieren
  total.innerText = `Gesamt: ${sum.toFixed(2)}€`;
}

/**
 * Entfernt einen Artikel aus dem Warenkorb
 * @param {number} index - Index des zu entfernenden Artikels
 */
function removeFromCart(index) {
  cart.splice(index, 1); // Artikel entfernen
  updateCart();          // Warenkorb aktualisieren
}

/**
 * Simuliert den Bestellabschluss (mit alert-Fenster)
 */
function checkout() {
  if (cart.length === 0) {
    alert("Warenkorb ist leer!");
    return;
  }

  // Übersicht der Bestellung vorbereiten
  let summary = cart.map(item => `• ${item.name} - ${item.price.toFixed(2)}€`).join('\n');
  let total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // Zufällige 4-stellige Abholnummer generieren
  const abholnummer = Math.floor(1000 + Math.random() * 9000);

  alert(`Ihre Bestellung:\n\n${summary}\n\nGesamt: ${total}€\n\n🧾 Abholnummer: ${abholnummer}`);

  // Warenkorb leeren
  cart = [];
  updateCart();
}

// Initialer Aufruf: Menü anzeigen
renderMenu();

// Zugangsdaten (diese kannst du anpassen)
const validUsername = "markus";
const validPassword = "markus123";

/**
 * Login-Funktion prüft Zugangsdaten und zeigt bei Erfolg die App
 */
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

