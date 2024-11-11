const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Game state variables
let hasWeapon = false;
let isAlive = true;
let hasFriend = false;
let playerName = '';

// Promise wrapper for readline
function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

// Main game functions
async function startGame() {
    console.log("Welcome to a text based adventure game - Sarajevo Shadows");
    console.log("You are a resident of Sarajevo, determined to protect your hometown from hooligans");
    
    playerName = await askQuestion("Please enter your name: ");
    
    console.log(`${playerName} are you ready to play the game?`);
    const choice = await getChoice();
    if (choice === 2) {
        console.log("Go train more, prepare yourself and then come back!");
        rl.close();
        return;
    }
    await marketSquare();
}

async function marketSquare() {
    console.log("\nScene 1: The Market Square");
    console.log("You see some shopkeepers packing up. There's a broom handle nearby.");
    console.log("1. Help the shopkeepers (Gain information on hooligans).");
    console.log("2. Take the broom handle as a weapon.");
    
    const choice = await getChoice();
    if (choice === 1) {
        console.log("The shopkeepers thank you and inform you that the hooligans are gathering at the Latin Bridge.");
    } else if (choice === 2) {
        console.log("You pick up the broom handle as a weapon.");
        hasWeapon = true;
    }
    await latinBridge();
}

async function latinBridge() {
    console.log("\nScene 2: The Latin Bridge");
    console.log("You approach the bridge and hear voices of hooligans nearby.");
    console.log("1. Cross the bridge directly (Risk a confrontation).");
    console.log("2. Take a hidden path along the river Miljacka (Avoid detection).");
    
    const choice = await getChoice();
    if (choice === 1 && !hasWeapon) {
        console.log("You try to cross directly, but the hooligans spot you. Without a weapon, you are overpowered.");
        isAlive = false;
        endGame();
    } else if (choice === 1 && hasWeapon) {
        console.log("Armed with the broom handle, you fight off the hooligans and cross safely.");
    } else if (choice === 2) {
        console.log("You take the hidden path along the river Miljacka, avoiding detection.");
    }
    await oldTownTavern();
}

async function oldTownTavern() {
    console.log("\nScene 3: The Old Town Tavern");
    console.log("You spot your friend Ahmed in the local tavern. He could be useful in a fight.");
    console.log("1. Ask Ahmed for help (Gain an ally).");
    console.log("2. Continue alone through the alleys (Rely on stealth).");
    
    const choice = await getChoice();
    if (choice === 1) {
        console.log("Ahmed agrees to join you. You now have an ally.");
        hasFriend = true;
    } else if (choice === 2) {
        console.log("You decide to continue alone, relying on stealth to stay safe.");
    }
    await cityHall();
}

async function cityHall() {
    console.log("\nScene 4: Sarajevo City Hall (Final Showdown)");
    console.log("You arrive at the City Hall, where hooligans are preparing for a major disturbance.");
    console.log("1. Confront the hooligans directly (Fight them).");
    console.log("2. Signal for police backup (Stall for help).");
    
    const choice = await getChoice();
    if (choice === 1 && !hasFriend) {
        console.log("\nYou face the hooligans alone, but without backup, you are outnumbered and overpowered.");
        isAlive = false;
        endGame();
    } else if (choice === 1 && hasFriend) {
        console.log("\nWith Ahmed by your side, you confront the hooligans and hold them off until they flee.");
        endGame();
    } else if (choice === 2) {
        console.log("\nYou signal for the police, holding the hooligans at bay as best you can.");
        console.log("However, the hooligans become more suspicious of your actions and start closing in on you.");
        console.log("Before the police can arrive, one of the hooligans spots your signal and shouts, alerting the others.");
        console.log("They rush towards you, catching you off guard. You fight back, but you're outnumbered and overwhelmed.");
        isAlive = false;
        endGame();
    }
}

function endGame() {
    if (isAlive) {
        console.log("Congratulations! You defended Sarajevo and survived the night.");
    } else {
        console.log("Game Over!");
        console.log("You fought bravely but was beaten by hooligans!");
    }
    console.log("Thank you for playing Sarajevo Shadows!");
    rl.close();
}

async function getChoice() {
    while (true) {
        const answer = await askQuestion("Enter 1 or 2: ");
        const choice = parseInt(answer);
        if (choice === 1 || choice === 2) {
            return choice;
        }
        console.log("Invalid input. Try again.");
    }
}

// Start the game
startGame();
