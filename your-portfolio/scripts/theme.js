const themeToggle = document.querySelector('.theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
    document.body.className = `${theme}-theme`;
    localStorage.setItem('theme', theme);
    
    // Update particle colors
    const color = theme === 'dark' ? 0x00f3ff : 0x0066cc;
    if(particles) particles.material.color.setHex(color);
}

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(currentTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize
setTheme(currentTheme);
updateThemeIcon();