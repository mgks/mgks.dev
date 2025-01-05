document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tabs a');
    const sections = document.querySelectorAll('.content section');
    const themeToggle = document.getElementById('theme-toggle');

    // Handle theme switching
    themeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    });

    // Set initial theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // Handle tab clicks and URL updates
    function activateTab(hash) {
        // Remove active class from all tabs
        tabs.forEach(tab => tab.classList.remove('active'));

        // Add active class to the clicked tab
        const activeTab = document.querySelector(`.tabs a[href="${hash}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Scroll to the corresponding section
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle initial URL hash
    if (window.location.hash) {
        activateTab(window.location.hash);
    }

    // Handle tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const hash = this.getAttribute('href');

            // Update URL hash
            history.pushState(null, null, hash);

            activateTab(hash);
        });
    });

    // Handle URL hash changes (e.g., when using back/forward buttons)
    window.addEventListener('popstate', function(event) {
        if (window.location.hash) {
            activateTab(window.location.hash);
        }
    });
});