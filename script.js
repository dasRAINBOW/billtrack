// Get elements from the DOM by their IDs and store them in variables
const fullScreenPrompt = document.getElementById('fullScreenPrompt'); // Button to toggle full screen
const themeToggle = document.getElementById('theme-toggle'); // Button to toggle theme
const root = document.documentElement; // Root element of the document (HTML)
const pl1_name = document.getElementById('pl1_name'); // Player 1 name element
const pl2_name = document.getElementById('pl2_name'); // Player 2 name element
const pl1_ball = document.getElementById('pl1_ball'); // Player 1 decision display
const pl2_ball = document.getElementById('pl2_ball'); // Player 2 decision display
const pl1_score = document.getElementById('pl1_score'); // Player 1 score display
const pl2_score = document.getElementById('pl2_score'); // Player 2 score display
const pl1_foul1 = document.getElementById('pl1_foul1'); // Player 1 first foul indicator
const pl1_foul2 = document.getElementById('pl1_foul2'); // Player 1 second foul indicator
const pl1_foul3 = document.getElementById('pl1_foul3'); // Player 1 third foul indicator
const pl2_foul1 = document.getElementById('pl2_foul1'); // Player 2 first foul indicator
const pl2_foul2 = document.getElementById('pl2_foul2'); // Player 2 second foul indicator
const pl2_foul3 = document.getElementById('pl2_foul3'); // Player 2 third foul indicator
const pl1_foul = document.getElementById('pl1_foul'); // Player 1 foul button
const pl2_foul = document.getElementById('pl2_foul'); // Player 2 foul button
const elements = document.getElementsByClassName('pl_decideHalf'); // Elements that decide half/full play

// Initialize foul counters for each player
let pl1_fouls = 0; // Player 1 foul count
let pl2_fouls = 0; // Player 2 foul count

// Add click event listener to the theme toggle button
themeToggle.addEventListener('click', function () {
    // Check the current theme; if light, change to dark and vice versa
    const isLightTheme = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLightTheme ? 'dark' : 'light');
    
    // Update the button text to reflect the current theme
    this.textContent = isLightTheme ? '☀' : '☽';
});

// Set the initial theme to dark
function checkTheme() {
    root.setAttribute('data-theme', 'dark');
}

// Function to set the player's name using a prompt
function setPlayerName(playerNameElement, defaultName) {
    const name = prompt(`Please enter name of ${defaultName}`, defaultName) || defaultName;
    playerNameElement.innerHTML = name; // Update the name element with the input or default name
}

// Add event listeners to player name elements to allow updating names on click
pl1_name.addEventListener('click', () => setPlayerName(pl1_name, "Player 1"));
pl2_name.addEventListener('click', () => setPlayerName(pl2_name, "Player 2"));

// Function to handle half/full decision and update the display accordingly
function decideHalfOrFull(pl1Decision, pl2Decision) {
    if (confirm('Are you sure?')) { // Confirm the decision with the user
        pl1_ball.innerHTML = pl1Decision; // Update Player 1 decision display
        pl2_ball.innerHTML = pl2Decision; // Update Player 2 decision display
        
        // Hide decision elements after a decision is made
        Array.from(elements).forEach(el => el.classList.add('beGone'));
    }
}

// Add event listeners to decision buttons to decide half/full play
document.getElementById('pl1_decideHalf').addEventListener('click', () => decideHalfOrFull('Half', 'Full'));
document.getElementById('pl1_decideFull').addEventListener('click', () => decideHalfOrFull('Full', 'Half'));
document.getElementById('pl2_decideHalf').addEventListener('click', () => decideHalfOrFull('Full', 'Half'));
document.getElementById('pl2_decideFull').addEventListener('click', () => decideHalfOrFull('Half', 'Full'));

// Function to update the score for a player
function updateScore(scoreElement, increment) {
    let score = parseInt(scoreElement.innerHTML); // Get current score
    scoreElement.innerHTML = score + increment; // Update score by increment
}

// Add event listeners to score buttons to increase or decrease scores
document.getElementById('pl1_countUp').addEventListener('click', () => updateScore(pl1_score, 1));
document.getElementById('pl1_countDown').addEventListener('click', () => updateScore(pl1_score, -1));
document.getElementById('pl2_countUp').addEventListener('click', () => updateScore(pl2_score, 1));
document.getElementById('pl2_countDown').addEventListener('click', () => updateScore(pl2_score, -1));

// Function to handle fouls for each player and update the opponent's score if necessary
function handleFoul(playerFouls, enemyPlayerFouls, foulElements, enemyFoulElements, opponentScoreElement) {
    playerFouls += 1; // Increment foul count for the player
    foulElements.slice(0, playerFouls).forEach(el => el.style.backgroundColor = "#f00"); // Mark fouls in red

    // If three fouls, reset and award a point to the opponent
    if (playerFouls === 3) {
        foulElements.forEach(el => el.style.backgroundColor = "var(--empty)"); // Reset fouls indicators
        enemyFoulElements.forEach(el => el.style.backgroundColor = "var(--empty)"); // Reset enemy fouls indicators
        updateScore(opponentScoreElement, 1); // Increment opponent's score by 1
        
        // Show decision elements again after fouls reset
        Array.from(elements).forEach(el => el.classList.remove('beGone'));
        pl1_ball.innerHTML = 'Half / Full'; // Reset decision displays
        pl2_ball.innerHTML = 'Half / Full'; // Reset decision displays
        
        alert("Three fouls! Enemy scored a game!"); // Alert user
        playerFouls = 0; // Reset foul count
        enemyPlayerFouls = 0; // Reset enemy foul count
    }

    return [playerFouls, enemyPlayerFouls]; // Return updated foul counts
}

// Add event listeners for foul buttons to handle fouls and update scores
pl1_foul.addEventListener('click', () => {
    fCall = handleFoul(pl1_fouls, pl2_fouls, [pl1_foul1, pl1_foul2, pl1_foul3], [pl2_foul1, pl2_foul2, pl2_foul3], pl2_score);
    pl1_fouls = fCall[0];
    pl2_fouls = fCall[1];
});
pl2_foul.addEventListener('click', () => {
    fCall = handleFoul(pl2_fouls, pl1_fouls, [pl2_foul1, pl2_foul2, pl2_foul3], [pl1_foul1, pl1_foul2, pl1_foul3], pl1_score);
    pl2_fouls = fCall[0];
    pl1_fouls = fCall[1];
});

// Add event listener for the full screen toggle button
fullScreenPrompt.addEventListener('click', () => {
    if (document.fullscreenElement) { // Check if full screen is currently active
        document.exitFullscreen(); // Exit full screen mode
    } else {
        // Enter full screen mode using the appropriate method for the browser
        const requestFullscreen = root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen;
        requestFullscreen.call(root);
    }
});
