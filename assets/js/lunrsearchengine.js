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

function lunr_search(term) {
    document.querySelector('#lunrsearchresults').style.display = 'block';
    document.querySelector('#lunrsearchresults').classList.add('visible');
    document.querySelector("body").classList.add("modal-open");
    
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Close"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button></div></div> </div></div>';
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Search results for '" + term + "'</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                // Fix double URL issue by checking for duplication
                if (url.indexOf('https://mgks.dev') === 0 && url.indexOf('https://mgks.devhttps') === 0) {
                    url = url.replace('https://mgks.devhttps', 'https');
                }
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span></small></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found, try a different keyword!</li>";
        }
    }
    return false;
}

// Initialize live search when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add keyup listener for live search with 300ms debounce
    const searchInput = document.getElementById('lunrsearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', debounce(function() {
            if (this.value.length > 2) { // Only search if at least 3 characters
                lunr_search(this.value);
            } else if (this.value.length === 0) {
                // Hide results if search is cleared
                document.querySelector('#lunrsearchresults').style.display = 'none';
                document.querySelector("body").classList.remove("modal-open");
            }
        }, 300));
    }
    
    // Add click handler for search button to focus on input
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchInput = document.getElementById('lunrsearch');
            if (searchInput) {
                searchInput.focus();
            }
        });
    }
    
    // Close button event handler
    document.querySelector('#lunrsearchresults').addEventListener('click', function(event) {
        if (event.target.id === 'btnx') {
            document.querySelector('#lunrsearchresults').style.display = 'none';
            document.querySelector("body").classList.remove("modal-open");
        }
    });

    // Handle click events for search box and results
    document.addEventListener('click', function(event) {
        const searchBox = document.querySelector('.search-box');
        const searchResults = document.querySelector('#lunrsearchresults');
        const searchInput = document.getElementById('lunrsearch');
        
        // If click is inside search box and input is not empty, show the results
        if (searchBox.contains(event.target) && 
            searchInput && 
            searchInput.value.trim().length > 2) {
            
            // Only perform search if results aren't already visible
            if (searchResults.style.display !== 'block') {
                lunr_search(searchInput.value);
            }
        }
        // If click is outside of search box and search results, hide the results
        else if (searchResults.style.display !== 'none' && 
                !searchBox.contains(event.target) && 
                !searchResults.contains(event.target)) {
            
            searchResults.style.display = 'none';
            document.querySelector("body").classList.remove("modal-open");
        }
    });
});