document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. THEME TOGGLE LOGIC
       ========================================= */
    const themeBtn = document.getElementById('theme-toggle');
    
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const element = document.documentElement;
            element.classList.toggle("dark");
            
            const isDark = element.classList.contains("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }

    /* =========================================
       2. MOBILE MENU DRAWER
       ========================================= */
    const mobileBtn = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (mobileBtn && mobileDrawer) {
        mobileBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('hidden');
            
            // Optional: Change icon state could go here if you wanted specific SVG manipulation
        });
    }

    /* =========================================
       3. PROJECT FILTERING (Projects Page)
       ========================================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Update Active State
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter Logic
                projectCards.forEach(card => {
                    const tags = JSON.parse(card.getAttribute('data-tags') || '[]');
                    
                    if (filter === 'all' || tags.includes(filter)) {
                        card.classList.remove('hidden');
                        // Simple Fade In
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    /* =========================================
       4. COPY CODE BUTTONS (Blog Post Page)
       ========================================= */
    const codeBlocks = document.querySelectorAll('pre');

    if (codeBlocks.length > 0) {
        codeBlocks.forEach(pre => {
            // Create Wrapper
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            
            // Create Button
            const button = document.createElement('button');
            button.className = 'copy-btn';
            button.innerText = 'Copy';
            
            // Copy Logic
            button.addEventListener('click', async () => {
                const code = pre.querySelector('code')?.innerText;
                if (code) {
                    try {
                        await navigator.clipboard.writeText(code);
                        button.innerText = 'Copied!';
                        setTimeout(() => button.innerText = 'Copy', 2000);
                    } catch (err) {
                        console.error('Failed to copy!', err);
                    }
                }
            });

            // DOM Insertion
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(pre);
            wrapper.appendChild(button);
        });
    }

    /* =========================================
       5. TAG EXPANSION (More/Less)
       ========================================= */
    const tagToggleBtn = document.getElementById('tag-toggle-btn');
    const hiddenTags = document.getElementById('hidden-tags');
    const tagBtnText = document.getElementById('tag-btn-text');

    if (tagToggleBtn && hiddenTags && tagBtnText) {
        tagToggleBtn.addEventListener('click', () => {
            const isHidden = hiddenTags.classList.contains('hidden');
            
            if (isHidden) {
                // EXPAND
                hiddenTags.classList.remove('hidden');
                tagBtnText.innerText = '- Less';
            } else {
                // CONTRACT
                hiddenTags.classList.add('hidden');
                tagBtnText.innerText = '+ More';
            }
        });
    }
});