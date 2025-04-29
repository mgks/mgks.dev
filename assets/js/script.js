document.addEventListener('DOMContentLoaded', function() {
    // Use event delegation for navigation - single event listener
    document.querySelector('header').addEventListener('click', function(e) {
        // Find closest anchor tag if clicked on a child element
        const link = e.target.closest('a');
        
        // Exit if not a link or if no link found
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Only handle internal hash links that aren't blog posts
        if (href && href.includes('#') && !href.startsWith('/blog')) {
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Use requestAnimationFrame for smoother scrolling
                requestAnimationFrame(function() {
                    // Cache the scroll position once - avoid repeated layout calculations
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
                    });
                });
            }
        }
    });
    
    // Progressive content reveal - stagger reveals for better performance
    const hiddenElements = document.querySelectorAll('.loading-hidden');
    
    if (hiddenElements.length > 0) {
        // Reveal above-fold content immediately
        requestAnimationFrame(function() {
            // Use a small batch size for smoother rendering
            const batchSize = 5;
            let index = 0;
            
            function revealBatch() {
                const end = Math.min(index + batchSize, hiddenElements.length);
                
                for (let i = index; i < end; i++) {
                    hiddenElements[i].classList.remove('loading-hidden');
                }
                
                index = end;
                
                if (index < hiddenElements.length) {
                    // Continue with next batch in next frame
                    requestAnimationFrame(revealBatch);
                }
            }
            
            revealBatch();
        });
    }
});

// Dark mode functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  
  // Check for saved user preference, otherwise respect OS preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = localStorage.getItem('theme');
  
  if (storedTheme === 'dark' || (!storedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  } else {
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  }
  
  themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  });
});