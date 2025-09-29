// Enhanced Website Content Search
class WebsiteSearch {
    constructor() {
        this.searchIndex = {};
        this.currentPage = this.detectCurrentPage();
        this.searchInput = null;
        this.searchResults = null;
        
        this.initializeSearch();
        this.buildSearchIndex();
    }
    
    // Detect which page we're on
    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        if (filename.includes('flashcard')) return 'flashcards';
        if (filename.includes('workshop')) return 'workshops';
        if (filename.includes('toolkit')) return 'toolkits';
        if (filename.includes('foundation')) return 'foundations';
        return 'index';
    }
    
    // Initialize search functionality
    initializeSearch() {
        // Find existing search input or create one
        this.searchInput = document.querySelector('.search-input');
        
        if (!this.searchInput) {
            this.createSearchInput();
        }
        
        // Add enhanced search functionality
        this.setupSearchListener();
        this.createSearchResults();
    }
    
    // Create search input if it doesn't exist
    createSearchInput() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search AI learning content...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 2px solid var(--border-color);
            background: var(--accent-secondary);
            color: var(--text-primary);
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875rem;
            border-radius: 4px;
        `;
        
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            const pageHeader = mainContent.querySelector('.page-header');
            if (pageHeader) {
                pageHeader.after(searchInput);
            } else {
                mainContent.insertBefore(searchInput, mainContent.firstChild);
            }
        }
        
        this.searchInput = searchInput;
    }
    
    // Create search results container
    createSearchResults() {
        this.searchResults = document.createElement('div');
        this.searchResults.className = 'search-results';
        this.searchResults.style.cssText = `
            display: none;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            max-height: 400px;
            overflow-y: auto;
            margin-bottom: 1rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        
        if (this.searchInput) {
            this.searchInput.after(this.searchResults);
        }
    }
    
    // Setup search event listener
    setupSearchListener() {
        if (!this.searchInput) return;
        
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                this.hideSearchResults();
                this.showAllContent();
                return;
            }
            
            // Debounce search
            searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.hideSearchResults();
            }
        });
    }
    
    // Build search index from page content
    buildSearchIndex() {
        this.searchIndex = {};
        
        // Index flash cards
        this.indexFlashCards();
        
        // Index workshops
        this.indexWorkshops();
        
        // Index toolkits
        this.indexToolkits();
        
        // Index foundation cards
        this.indexFoundationCards();
        
        console.log('Search index built:', Object.keys(this.searchIndex).length, 'items');
    }
    
    // Index flash cards content
    indexFlashCards() {
        // Get flash cards data if available
        if (window.flashcardsData) {
            window.flashcardsData.forEach((card, index) => {
                const id = `flashcard-${index}`;
                this.searchIndex[id] = {
                    type: 'flashcard',
                    title: card.title,
                    category: card.category,
                    meta: card.meta,
                    core: card.core,
                    explanation: card.explanation,
                    example: card.example,
                    extra: card.extra || '',
                    url: 'flashcards.html',
                    searchText: `${card.title} ${card.meta} ${card.core} ${card.explanation} ${card.example} ${card.category}`.toLowerCase()
                };
            });
        }
        
        // Also index visible flash card elements
        const flashCards = document.querySelectorAll('.flashcard, .foundation-card');
        flashCards.forEach((card, index) => {
            const title = card.querySelector('.card-title-display, .card-name')?.textContent || '';
            const meta = card.querySelector('.card-meta-display, .card-meta')?.textContent || '';
            const content = card.querySelector('.card-content-back, .card-explanation')?.textContent || '';
            
            if (title) {
                const id = `card-${index}`;
                this.searchIndex[id] = {
                    type: 'card',
                    title: title,
                    meta: meta,
                    content: content,
                    element: card,
                    searchText: `${title} ${meta} ${content}`.toLowerCase()
                };
            }
        });
    }
    
    // Index workshops content
    indexWorkshops() {
        const workshops = document.querySelectorAll('.workshop-card');
        workshops.forEach((workshop, index) => {
            const title = workshop.querySelector('.workshop-name')?.textContent || '';
            const series = workshop.querySelector('.workshop-series')?.textContent || '';
            const description = workshop.querySelector('.workshop-description')?.textContent || '';
            const level = workshop.querySelector('.workshop-level')?.textContent || '';
            const features = Array.from(workshop.querySelectorAll('.workshop-features li')).map(li => li.textContent).join(' ');
            
            if (title) {
                const id = `workshop-${index}`;
                this.searchIndex[id] = {
                    type: 'workshop',
                    title: title,
                    series: series,
                    description: description,
                    level: level,
                    features: features,
                    element: workshop,
                    url: 'workshops.html',
                    searchText: `${title} ${series} ${description} ${level} ${features}`.toLowerCase()
                };
            }
        });
    }
    
    // Index toolkits content
    indexToolkits() {
        const toolkits = document.querySelectorAll('.toolkit-card');
        toolkits.forEach((toolkit, index) => {
            const title = toolkit.querySelector('.toolkit-name')?.textContent || '';
            const series = toolkit.querySelector('.toolkit-series')?.textContent || '';
            const description = toolkit.querySelector('.toolkit-description')?.textContent || '';
            const type = toolkit.querySelector('.toolkit-type')?.textContent || '';
            const features = Array.from(toolkit.querySelectorAll('.toolkit-features li')).map(li => li.textContent).join(' ');
            
            if (title) {
                const id = `toolkit-${index}`;
                this.searchIndex[id] = {
                    type: 'toolkit',
                    title: title,
                    series: series,
                    description: description,
                    toolkitType: type,
                    features: features,
                    element: toolkit,
                    url: 'toolkits.html',
                    searchText: `${title} ${series} ${description} ${type} ${features}`.toLowerCase()
                };
            }
        });
    }
    
    // Index foundation cards
    indexFoundationCards() {
        const foundationCards = document.querySelectorAll('.foundation-card');
        foundationCards.forEach((card, index) => {
            const title = card.querySelector('.card-name')?.textContent || '';
            const meta = card.querySelector('.card-meta')?.textContent || '';
            const core = card.querySelector('.card-core')?.textContent || '';
            const explanation = card.querySelector('.card-explanation')?.textContent || '';
            const example = card.querySelector('.card-example')?.textContent || '';
            
            if (title) {
                const id = `foundation-${index}`;
                this.searchIndex[id] = {
                    type: 'foundation',
                    title: title,
                    meta: meta,
                    core: core,
                    explanation: explanation,
                    example: example,
                    element: card,
                    url: 'foundations.html',
                    searchText: `${title} ${meta} ${core} ${explanation} ${example}`.toLowerCase()
                };
            }
        });
    }
    
    // Perform search across all content
    performSearch(query) {
        const searchTerm = query.toLowerCase();
        const results = [];
        
        // Search through index
        Object.keys(this.searchIndex).forEach(id => {
            const item = this.searchIndex[id];
            if (item.searchText.includes(searchTerm)) {
                // Calculate relevance score
                let score = 0;
                if (item.title.toLowerCase().includes(searchTerm)) score += 10;
                if (item.meta && item.meta.toLowerCase().includes(searchTerm)) score += 5;
                if (item.searchText.includes(searchTerm)) score += 1;
                
                results.push({
                    ...item,
                    id: id,
                    score: score
                });
            }
        });
        
        // Sort by relevance
        results.sort((a, b) => b.score - a.score);
        
        // Display results
        this.displaySearchResults(results, query);
        
        // Filter current page content
        this.filterCurrentPageContent(searchTerm);
    }
    
    // Display search results
    displaySearchResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div style="padding: 1rem; text-align: center; color: var(--text-secondary);">
                    No results found for "${query}"
                </div>
            `;
        } else {
            const maxResults = 10; // Limit results
            const limitedResults = results.slice(0, maxResults);
            
            this.searchResults.innerHTML = `
                <div style="padding: 0.5rem; background: var(--accent-secondary); font-size: 0.8rem; font-weight: 500;">
                    Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"
                </div>
                ${limitedResults.map(result => this.createSearchResultItem(result)).join('')}
                ${results.length > maxResults ? `
                    <div style="padding: 0.5rem; text-align: center; color: var(--text-secondary); font-size: 0.8rem;">
                        ... and ${results.length - maxResults} more results
                    </div>
                ` : ''}
            `;
        }
        
        this.showSearchResults();
    }
    
    // Create individual search result item
    createSearchResultItem(result) {
        const isCurrentPage = !result.url || result.url === window.location.pathname.split('/').pop();
        
        return `
            <div class="search-result-item" style="
                padding: 0.75rem;
                border-bottom: 1px solid var(--border-color);
                cursor: pointer;
                transition: background-color 0.2s ease;
            " onclick="websiteSearch.handleResultClick('${result.id}', '${result.url || ''}')">
                <div style="display: flex; justify-content: between; align-items: start; gap: 0.5rem;">
                    <div style="flex: 1;">
                        <div style="font-weight: 500; margin-bottom: 0.25rem;">
                            ${result.title}
                        </div>
                        <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
                            ${result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            ${result.series ? ` • ${result.series}` : ''}
                            ${result.category ? ` • ${result.category}` : ''}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-primary); line-height: 1.4;">
                            ${this.truncateText(result.description || result.explanation || result.meta || '', 100)}
                        </div>
                    </div>
                    <div style="font-size: 0.7rem; color: var(--text-secondary);">
                        ${isCurrentPage ? 'This page' : result.url || ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Handle search result click
    handleResultClick(resultId, url) {
        const result = this.searchIndex[resultId];
        
        if (url && url !== window.location.pathname.split('/').pop()) {
            // Navigate to different page
            window.location.href = url + '#search=' + encodeURIComponent(this.searchInput.value);
        } else if (result.element) {
            // Scroll to element on current page
            result.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight the element briefly
            this.highlightElement(result.element);
            
            // Hide search results
            this.hideSearchResults();
        }
    }
    
    // Highlight an element briefly
    highlightElement(element) {
        const originalStyle = element.style.cssText;
        element.style.cssText += `
            outline: 3px solid var(--accent-primary);
            background: var(--accent-secondary);
            transition: all 0.3s ease;
        `;
        
        setTimeout(() => {
            element.style.cssText = originalStyle;
        }, 2000);
    }
    
    // Filter content on current page
    filterCurrentPageContent(searchTerm) {
        // Hide non-matching content on current page
        Object.keys(this.searchIndex).forEach(id => {
            const item = this.searchIndex[id];
            if (item.element) {
                const matches = item.searchText.includes(searchTerm);
                item.element.style.display = matches ? 'block' : 'none';
            }
        });
    }
    
    // Show all content (clear filters)
    showAllContent() {
        Object.keys(this.searchIndex).forEach(id => {
            const item = this.searchIndex[id];
            if (item.element) {
                item.element.style.display = 'block';
            }
        });
    }
    
    // Utility functions
    showSearchResults() {
        this.searchResults.style.display = 'block';
    }
    
    hideSearchResults() {
        this.searchResults.style.display = 'none';
    }
    
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
}

// Add CSS for search result hover effects
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-result-item:hover {
        background: var(--accent-secondary) !important;
    }
    
    .search-input:focus {
        outline: none;
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 2px rgba(100, 116, 139, 0.2);
    }
`;
document.head.appendChild(searchStyles);

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.websiteSearch = new WebsiteSearch();
});

// Handle search from URL hash (when navigating from search results)
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#search=')) {
        const searchTerm = decodeURIComponent(hash.replace('#search=', ''));
        if (window.websiteSearch && window.websiteSearch.searchInput) {
            window.websiteSearch.searchInput.value = searchTerm;
            window.websiteSearch.performSearch(searchTerm);
        }
    }
});