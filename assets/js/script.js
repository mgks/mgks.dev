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