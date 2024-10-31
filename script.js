// Array med möjliga ord att gissa på
const words = ["programmering", "javascript", "html", "datalogi"];

// Slumpa ett ord från arrayen att gissa på
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Lista för lagrade bokstäver som användaren har gissat
let guessedLetters = [];

// Räknare för antalet felaktiga gissningar
let wrongGuesses = 0;

// HTML-element för att visa spelet och meddelanden
const wordDisplay = document.getElementById("word-display");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

// Array av delar av gubben som visas vid felaktiga gissningar
// Ordningen är justerad så att ground och scaffold visas först, och head sist
const parts = ["ground", "scaffold", "head", "body", "arms", "legs"];

// Döljer alla delar av gubben från början
parts.forEach(part => document.getElementById(part).style.display = "none");

// Funktion för att visa det aktuella ordet med gissade bokstäver och "_" för de ogissade
function displayWord() {
    wordDisplay.textContent = selectedWord
        .split("") // Dela upp ordet i en array av bokstäver
        .map(letter => (guessedLetters.includes(letter) ? letter : "_")) // Visa gissade bokstäver, annars "_"
        .join(" "); // Sätt ihop till en sträng med mellanrum mellan bokstäverna
}

// Kontrollera om användaren har vunnit genom att se om alla bokstäver är gissade
function checkWin() {
    if (!wordDisplay.textContent.includes("_")) { // Om inga "_" finns, har användaren vunnit
        message.textContent = "Du vann! Vill du spela igen?"; // Visa vinstmeddelande
        restartButton.style.display = "block"; // Visa knapp för att starta om spelet
    }
}

// Kontrollera om användaren har förlorat genom att räkna antalet felaktiga gissningar
function checkLoss() {
    if (wrongGuesses >= parts.length) { // Om antalet felaktiga gissningar är lika med antalet kroppsdelar
        message.textContent = `Du förlorade! Ordet var "${selectedWord}". Vill du spela igen?`; // Visa förlustmeddelande
        restartButton.style.display = "block"; // Visa knapp för att starta om spelet
    }
}

// Funktion som hanterar gissningen från användaren
function handleGuess() {
    const guess = guessInput.value.toLowerCase(); // Hämta och konvertera gissningen till små bokstäver
    guessInput.value = ""; // Rensa input-fältet efter gissning

    if (guess && !guessedLetters.includes(guess)) { // Kontrollera att gissningen inte är tom och inte redan gissad
        guessedLetters.push(guess); // Lägg till gissningen i listan över gissade bokstäver

        if (selectedWord.includes(guess)) { // Om gissningen är korrekt
            displayWord(); // Uppdatera ordet som visas med rätt gissning
            checkWin(); // Kontrollera om användaren har vunnit
        } else { // Om gissningen är fel
            document.getElementById(parts[wrongGuesses]).style.display = "block"; // Visa nästa kroppsdel på gubben
            wrongGuesses++; // Öka räknaren för felaktiga gissningar
            checkLoss(); // Kontrollera om användaren har förlorat
        }
    }
}

// Lägg till en händelselyssnare för klick på knappen "Gissa"
guessButton.addEventListener("click", handleGuess);

// Lägg till en händelselyssnare för Enter-knappen i input-fältet
guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { // Kontrollera om Enter har tryckts
        handleGuess(); // Anropa funktionen för att hantera gissningen
    }
});

// Funktion för att starta om spelet
restartButton.addEventListener("click", () => {
    selectedWord = words[Math.floor(Math.random() * words.length)]; // Välj ett nytt slumpmässigt ord
    guessedLetters = []; // Töm listan över gissade bokstäver
    wrongGuesses = 0; // Återställ räknaren för felaktiga gissningar
    parts.forEach(part => document.getElementById(part).style.display = "none"); // Döljer alla delar av gubben
    displayWord(); // Visa det nya ordet med "_" för alla bokstäver
    message.textContent = ""; // Rensa meddelandefältet
    restartButton.style.display = "none"; // Dölj knappen för att starta om spelet
});

// Visa ordet med "_" i början av spelet
displayWord();
