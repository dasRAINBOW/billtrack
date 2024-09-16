// Get elements from the DOM by their IDs and store them in variables
const fullScreenPrompt = document.getElementById('fullScreenPrompt'); // Button to toggle full screen
const themeToggle = document.getElementById('theme-toggle'); // Button to toggle theme
const root = document.documentElement; // Root element of the document (HTML)

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

document.getElementById('history').addEventListener('click', () => {
    window.location.href = '../';
})