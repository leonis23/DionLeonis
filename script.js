console.log("JS wurde geladen ✅");

const kartenPaare = ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐨"];
let deck = [...kartenPaare, ...kartenPaare, "🃏"];
deck = mischen(deck);

function mischen(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let spieler1 = [];
let spieler2 = [];

deck.forEach((karte, index) => {
  if (index % 2 === 0) {
    spieler1.push(karte);
  } else {
    spieler2.push(karte);
  }
});

function entfernePaare(hand) {
  let paarCheck = {};
  for (let karte of hand) {
    if (paarCheck[karte]) {
      delete paarCheck[karte];
    } else {
      paarCheck[karte] = true;
    }
  }
  return Object.keys(paarCheck);
}

spieler1 = entfernePaare(spieler1);
spieler2 = entfernePaare(spieler2);

let aktuellerSpieler = 1;

function updateAnzeige() {
  const gameDiv = document.getElementById("game");
  gameDiv.innerHTML = "";

  const spieler1Div = document.createElement("div");
  spieler1Div.innerHTML = "<h2>Spieler 1</h2>";
  spieler1.forEach((k, i) => {
    const card = document.createElement("div");
    card.className = "karte";
    card.innerText = aktuellerSpieler === 1 ? k : "❓";
    if (aktuellerSpieler !== 1) {
      card.addEventListener("click", () => handleKlick(1));
    }
    spieler1Div.appendChild(card);
  });

  const spieler2Div = document.createElement("div");
  spieler2Div.innerHTML = "<h2>Spieler 2</h2>";
  spieler2.forEach((k, i) => {
    const card = document.createElement("div");
    card.className = "karte";
    card.innerText = aktuellerSpieler === 2 ? k : "❓";
    if (aktuellerSpieler !== 2) {
      card.addEventListener("click", () => handleKlick(2));
    }
    spieler2Div.appendChild(card);
  });

  gameDiv.appendChild(spieler1Div);
  gameDiv.appendChild(spieler2Div);
}

function zieheKarte(vonSpieler, zuSpieler) {
  if (vonSpieler.length === 0) return { vonSpieler, zuSpieler };
  const randomIndex = Math.floor(Math.random() * vonSpieler.length);
  const gezogeneKarte = vonSpieler[randomIndex];
  zuSpieler.push(gezogeneKarte);
  vonSpieler.splice(randomIndex, 1);
  zuSpieler = entfernePaare(zuSpieler);
  return { vonSpieler, zuSpieler };
}

function handleKlick(gegnerNummer) {
  let ergebnis;
  if (gegnerNummer === 2 && aktuellerSpieler === 1) {
    ergebnis = zieheKarte(spieler2, spieler1);
    spieler2 = ergebnis.vonSpieler;
    spieler1 = ergebnis.zuSpieler;
    aktuellerSpieler = 2;
  } else if (gegnerNummer === 1 && aktuellerSpieler === 2) {
    ergebnis = zieheKarte(spieler1, spieler2);
    spieler1 = ergebnis.vonSpieler;
    spieler2 = ergebnis.zuSpieler;
    aktuellerSpieler = 1;
  } else {
    return;
  }

  updateAnzeige();

  if (
    (spieler1.length === 1 && spieler1.includes("🃏") && spieler2.length === 0) ||
    (spieler2.length === 1 && spieler2.includes("🃏") && spieler1.length === 0)
  ) {
    setTimeout(() => {
      const verlierer = spieler1.includes("🃏") ? "Spieler 1" : "Spieler 2";
      alert(`Spiel beendet! ${verlierer} hat den 🃏 und verliert!`);
    }, 100);
  }
}

window.onload = () => {
  updateAnzeige();

  const newGameBtn = document.createElement("button");
  newGameBtn.textContent = "Neues Spiel";
  newGameBtn.style.marginTop = "20px";
  newGameBtn.style.padding = "10px 20px";
  newGameBtn.style.fontSize = "16px";
  newGameBtn.addEventListener("click", () => {
    location.reload();
  });
  document.body.appendChild(newGameBtn);
};