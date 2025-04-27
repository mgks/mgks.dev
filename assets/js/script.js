document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation
    const links = document.querySelectorAll('header a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').includes('#') && !this.getAttribute('href').startsWith('/blog')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Show content after loading
    setTimeout(function() {
        document.querySelectorAll('.loading-hidden').forEach(el => {
            el.classList.remove('loading-hidden');
        });
    }, 200);
});