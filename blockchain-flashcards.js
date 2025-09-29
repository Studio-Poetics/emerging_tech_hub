// Blockchain flashcards data
let blockchainCards = [];
let currentCardIndex = 0;
let studiedCards = new Set();
let filteredCards = [];
let isFlipped = false;

// Theme mapping for easier filtering
const themeMapping = {
    'foundations': 'Foundations',
    'infrastructure': 'Infrastructure', 
    'applications': 'Applications',
    'philosophy': 'Philosophy & Futures'
};

// Load blockchain data
async function loadBlockchainData() {
    try {
        const response = await fetch('blockchain.json');
        const data = await response.json();
        blockchainCards = data.cards;
        filteredCards = [...blockchainCards];
        
        // Load progress from localStorage
        const savedProgress = localStorage.getItem('blockchainProgress');
        if (savedProgress) {
            studiedCards = new Set(JSON.parse(savedProgress));
        }
        
        updateProgressDisplay();
        displayCard(currentCardIndex);
        setupEventListeners();
        updateTabCounts();
    } catch (error) {
        console.error('Error loading blockchain data:', error);
    }
}

// Display current card
function displayCard(index) {
    if (filteredCards.length === 0) return;
    
    const card = filteredCards[index];
    const cardNumber = `${index + 1}/${filteredCards.length}`;
    
    // Update front of card
    document.getElementById('cardNumber').textContent = cardNumber;
    document.getElementById('cardNumberBack').textContent = cardNumber;
    document.getElementById('cardCategory').textContent = card.theme;
    document.getElementById('cardTitle').textContent = card.title;
    document.getElementById('cardMeta').textContent = getCardMeta(card);
    
    // Update back of card
    document.getElementById('cardExplanation').textContent = card.text;
    
    // Reset flip state
    isFlipped = false;
    document.getElementById('flashcard').classList.remove('flipped');
    
    // Update studied button state
    const isStudied = studiedCards.has(card.id);
    const markButton = document.getElementById('markStudiedBtn');
    markButton.textContent = isStudied ? '✓ Studied' : '✓ Mark as Studied';
    markButton.classList.toggle('studied', isStudied);
}

// Get card meta description (shortened version for front of card)
function getCardMeta(card) {
    // Create a short teaser from the beginning of the text
    const words = card.text.split(' ');
    if (words.length > 15) {
        return words.slice(0, 15).join(' ') + '...';
    }
    return card.text;
}

// Navigation functions
function nextCard() {
    if (currentCardIndex < filteredCards.length - 1) {
        currentCardIndex++;
        displayCard(currentCardIndex);
    }
}

function prevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        displayCard(currentCardIndex);
    }
}

// Toggle card flip
function flipCard() {
    isFlipped = !isFlipped;
    document.getElementById('flashcard').classList.toggle('flipped', isFlipped);
}

// Mark card as studied
function markAsStudied() {
    const currentCard = filteredCards[currentCardIndex];
    if (studiedCards.has(currentCard.id)) {
        studiedCards.delete(currentCard.id);
    } else {
        studiedCards.add(currentCard.id);
    }
    
    // Save progress
    localStorage.setItem('blockchainProgress', JSON.stringify([...studiedCards]));
    
    // Update displays
    updateProgressDisplay();
    displayCard(currentCardIndex);
}

// Update progress display
function updateProgressDisplay() {
    const totalCards = blockchainCards.length;
    const studiedCount = studiedCards.size;
    
    document.getElementById('cardsStudied').textContent = `${studiedCount}/${totalCards}`;
    
    // Calculate streak (simplified - just show studied count for now)
    document.getElementById('currentStreak').textContent = studiedCount.toString();
}

// Filter cards by category
function filterCards(category) {
    if (category === 'all') {
        filteredCards = [...blockchainCards];
    } else {
        const themeName = themeMapping[category];
        filteredCards = blockchainCards.filter(card => card.theme === themeName);
    }
    
    currentCardIndex = 0;
    displayCard(currentCardIndex);
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
}

// Update tab counts
function updateTabCounts() {
    const counts = {
        all: blockchainCards.length,
        foundations: blockchainCards.filter(card => card.theme === 'Foundations').length,
        infrastructure: blockchainCards.filter(card => card.theme === 'Infrastructure').length,
        applications: blockchainCards.filter(card => card.theme === 'Applications').length,
        philosophy: blockchainCards.filter(card => card.theme === 'Philosophy & Futures').length
    };
    
    document.querySelector('[data-category="all"]').textContent = `All Cards (${counts.all})`;
    document.querySelector('[data-category="foundations"]').textContent = `Foundations (${counts.foundations})`;
    document.querySelector('[data-category="infrastructure"]').textContent = `Infrastructure (${counts.infrastructure})`;
    document.querySelector('[data-category="applications"]').textContent = `Applications (${counts.applications})`;
    document.querySelector('[data-category="philosophy"]').textContent = `Philosophy & Futures (${counts.philosophy})`;
}

// Shuffle cards
function shuffleCards() {
    for (let i = filteredCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredCards[i], filteredCards[j]] = [filteredCards[j], filteredCards[i]];
    }
    currentCardIndex = 0;
    displayCard(currentCardIndex);
}

// Reset progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        studiedCards.clear();
        localStorage.removeItem('blockchainProgress');
        updateProgressDisplay();
        displayCard(currentCardIndex);
    }
}

// Study mode (show only unstudied cards)
function toggleStudyMode() {
    const button = document.getElementById('studyModeBtn');
    const isStudyMode = button.classList.contains('active');
    
    if (isStudyMode) {
        // Exit study mode
        button.classList.remove('active');
        button.textContent = '📚 Study Mode';
        filteredCards = [...blockchainCards];
    } else {
        // Enter study mode
        button.classList.add('active');
        button.textContent = '📚 Exit Study Mode';
        filteredCards = blockchainCards.filter(card => !studiedCards.has(card.id));
    }
    
    currentCardIndex = 0;
    displayCard(currentCardIndex);
}

// Setup event listeners
function setupEventListeners() {
    // Card flip
    document.getElementById('flashcard').addEventListener('click', flipCard);
    
    // Navigation
    document.getElementById('nextBtn').addEventListener('click', nextCard);
    document.getElementById('prevBtn').addEventListener('click', prevCard);
    document.getElementById('markStudiedBtn').addEventListener('click', markAsStudied);
    
    // Controls
    document.getElementById('shuffleBtn').addEventListener('click', shuffleCards);
    document.getElementById('resetBtn').addEventListener('click', resetProgress);
    document.getElementById('studyModeBtn').addEventListener('click', toggleStudyMode);
    
    // Tab filtering
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            filterCards(category);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowLeft':
                prevCard();
                break;
            case 'ArrowRight':
                nextCard();
                break;
            case ' ':
            case 'Enter':
                e.preventDefault();
                flipCard();
                break;
            case 's':
            case 'S':
                markAsStudied();
                break;
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadBlockchainData);