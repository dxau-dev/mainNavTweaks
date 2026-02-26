const hamburger = document.getElementById('hamburger');
const menuContainer = document.getElementById('menu-container');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const allLinks = document.querySelectorAll('.menu-container a');

// 1. Toggle Hamburger and Dropdown Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menuContainer.classList.toggle('active');
});

// 2. Toggle Multi-level Sub-menus
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();

        // Find the adjacent sub-menu inside the DOM
        const subMenu = toggle.parentElement.nextElementSibling;

        // Toggle active classes for rotation and expanding
        toggle.classList.toggle('open');
        if (subMenu) {
            subMenu.classList.toggle('active');
        }
    });
});

// 3. Close menu BEFORE navigating to chosen link
allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetUrl = this.getAttribute('href');

        // Ensure it's a real link being clicked
        if (targetUrl && targetUrl !== '#') {
            e.preventDefault(); // Pause immediate navigation

            // Close the main menu and animate the X back to a hamburger
            hamburger.classList.remove('active');
            menuContainer.classList.remove('active');

            // Optionally close all sub-menus to reset state for next time
            document.querySelectorAll('.sub-menu.active').forEach(menu => menu.classList.remove('active'));
            document.querySelectorAll('.dropdown-toggle.open').forEach(btn => btn.classList.remove('open'));

            // Wait 400ms (matching the CSS transition time) before routing
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 400);
        }
    });
});
