---
layout: null
sitemap: false
---

{% assign counter = 0 %}
var documents = [{% for page in site.posts %}{
    "id": {{ counter }},
    "url": "{{site.baseurl}}{{ page.url }}",
    "title": "{{ page.title }}",
    "body": "{{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}"{% assign counter = counter | plus: 1 %}
    }{% if forloop.last %}{% else %}, {% endif %}{% endfor %}];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});

// Debounce function to limit how often search runs while typing
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Initialize DOM elements once
let searchResults, searchResultsList, searchModal, searchModalTitle, bodyElement;

function lunr_search(term) {
    // Use cached elements instead of querying DOM repeatedly
    searchResults.style.display = 'block';
    searchResults.classList.add('visible');
    bodyElement.classList.add("modal-open");
    
    // Only set modal HTML if it hasn't been initialized
    if (!searchResults.querySelector('#resultsmodal')) {
        searchResults.innerHTML = '<div id="resultsmodal" class="modal show d-block" tabindex="-1" role="dialog" aria-labelledby="resultsmodal"><div class="modal-dialog shadow-lg" role="document"><div class="modal-content"><div class="modal-header" id="modtit"></div><div class="modal-body"><ul class="mb-0"></ul></div><div class="modal-footer"></div></div></div></div>';
        // Re-initialize references after creating modal
        searchModal = searchResults.querySelector('#resultsmodal');
        searchModalTitle = searchResults.querySelector('#modtit');
        searchResultsList = searchResults.querySelector('ul');
    } else {
        // Clear previous results instead of recreating HTML
        searchResultsList.innerHTML = '';
        searchModalTitle.innerHTML = '';
    }
    
    if(term) {
        searchModalTitle.innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>";
        
        // Get search results
        var results = idx.search(term);
        
        // Build results HTML (use document fragment for better performance)
        var fragment = document.createDocumentFragment();
        
        if(results.length > 0) {
            for (var i = 0; i < results.length; i++) {
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                // Fix double URL issue by checking for duplication
                if (url.indexOf('https://mgks.dev') === 0 && url.indexOf('https://mgks.devhttps') === 0) {
                    url = url.replace('https://mgks.devhttps', 'https');
                }
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                
                var li = document.createElement('li');
                li.className = 'lunrsearchresult';
                li.innerHTML = "<a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span></a>";
                fragment.appendChild(li);
            }
        } else {
            var li = document.createElement('li');
            li.className = 'lunrsearchresult';
            li.textContent = "No results found, try a different keyword!";
            fragment.appendChild(li);
        }
        
        // Add all results at once (single DOM update)
        searchResultsList.appendChild(fragment);
    }
    
    return false;
}

// Initialize live search when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    searchResults = document.querySelector('#lunrsearchresults');
    searchResultsList = searchResults.querySelector('ul');
    bodyElement = document.querySelector("body");
    
    // Track the last search term to avoid redundant searches
    let lastSearchTerm = '';
    
    // Add keyup listener for live search with 300ms debounce
    const searchInput = document.getElementById('lunrsearch');
    const searchBox = document.querySelector('.search-box');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput) {
        // Use a higher debounce value for better performance
        searchInput.addEventListener('keyup', debounce(function() {
            const currentSearchTerm = this.value.trim();
            
            // Only search if term is different and has at least 3 characters
            if (currentSearchTerm.length > 2 && currentSearchTerm !== lastSearchTerm) {
                lastSearchTerm = currentSearchTerm;
                // Use requestAnimationFrame to align with browser rendering cycle
                requestAnimationFrame(() => {
                    lunr_search(currentSearchTerm);
                });
            } else if (currentSearchTerm.length === 0 && lastSearchTerm !== '') {
                // Reset when search is cleared
                lastSearchTerm = '';
                searchResults.style.display = 'none';
                bodyElement.classList.remove("modal-open");
            }
        }, 400)); // Increased debounce time
    }
    
    // Add click handler for search button
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            if (searchInput) {
                searchInput.focus();
            }
        });
    }
    
    // Use event delegation for click handling
    document.addEventListener('click', function(event) {
        // If search results are visible
        if (searchResults.style.display === 'block') {
            // Click outside search area should close results
            if (!searchBox.contains(event.target) && !searchResults.contains(event.target)) {
                searchResults.style.display = 'none';
                bodyElement.classList.remove("modal-open");
            }
        } else if (searchBox.contains(event.target) && 
                  searchInput && 
                  searchInput.value.trim().length > 2) {
            // Show results when clicking in search box with valid query
            lunr_search(searchInput.value);
        }
    });
});