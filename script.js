const fullScreenPrompt = document.getElementById('fullScreenPrompt');
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

fullScreenPrompt.addEventListener('click', () => {
        const requestFullscreen = root.requestFullscreen || root.webkitRequestFullscreen || root.msRequestFullscreen;
        if (requestFullscreen) requestFullscreen.call(root);
        fullScreenPrompt.style.display = 'none';
    },
    { once: true }
);

themeToggle.addEventListener('click', function () {
    const isLightTheme = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLightTheme ? 'dark' : 'light');
    this.textContent = isLightTheme ? '☀' : '☽';
});

function checkTheme() {
    root.setAttribute('data-theme', 'dark');
}