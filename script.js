document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const learningCards = document.querySelectorAll('.learning-card');
    
    // Tab filtering functionality
    tabButtons.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.dataset.category;
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            learningCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'slideIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Start Learning button functionality
    const startButtons = document.querySelectorAll('.card-actions .btn-primary');
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const learningCard = this.closest('.learning-card');
            const cardName = learningCard.querySelector('.card-name').textContent;
            const cardCount = learningCard.querySelector('.card-count').textContent;
            
            const confirmed = confirm(`Start learning ${cardName} with ${cardCount}?`);
            if (confirmed) {
                this.textContent = 'Starting...';
                this.style.background = 'rgba(0, 0, 0, 0.5)';
                this.disabled = true;
                
                // Simulate loading
                setTimeout(() => {
                    this.textContent = 'Continue Learning';
                    this.style.background = '';
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Preview button functionality
    const previewButtons = document.querySelectorAll('.card-actions .btn:not(.btn-primary)');
    previewButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Preview')) {
                const learningCard = this.closest('.learning-card');
                const cardName = learningCard.querySelector('.card-name').textContent;
                const cardCollection = learningCard.querySelector('.card-collection').textContent;
                
                // Create preview modal
                showPreviewModal(cardName, cardCollection);
            } else if (this.textContent.includes('Study Notes')) {
                const learningCard = this.closest('.learning-card');
                const cardName = learningCard.querySelector('.card-name').textContent;
                alert(`Study notes for ${cardName} would open here. This would include key concepts, formulas, and quick reference materials.`);
            }
        });
    });
    
    // Keyboard shortcuts for tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === '1') tabButtons[0]?.click();
        if (e.key === '2') tabButtons[1]?.click();
        if (e.key === '3') tabButtons[2]?.click();
        if (e.key === '4') tabButtons[3]?.click();
        if (e.key === '5') tabButtons[4]?.click();
        if (e.key === '6') tabButtons[5]?.click();
        if (e.key === '7') tabButtons[6]?.click();
    });
    
    // Card icon hover effects
    const cardIcons = document.querySelectorAll('.card-icon');
    cardIcons.forEach(svg => {
        svg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        svg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Animated stat bars on scroll
    const statBars = document.querySelectorAll('.stat-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    statBars.forEach(bar => observer.observe(bar));

    // Theme switching functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Load saved theme or default
    const savedTheme = localStorage.getItem('aiLearningTheme') || 'default';
    if (savedTheme !== 'default') {
        body.setAttribute('data-theme', savedTheme);
    }
    
    // Update active button
    themeButtons.forEach(btn => {
        const btnTheme = btn.dataset.theme;
        if (btnTheme === savedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    themeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const theme = this.dataset.theme;
            
            // Remove active class from all buttons
            themeButtons.forEach(button => button.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply theme
            if (theme === 'default') {
                body.removeAttribute('data-theme');
                localStorage.setItem('aiLearningTheme', 'default');
            } else {
                body.setAttribute('data-theme', theme);
                localStorage.setItem('aiLearningTheme', theme);
            }
        });
    });

    // Progress tracking simulation
    function updateLearningProgress(cardName) {
        const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
        progress[cardName] = (progress[cardName] || 0) + 1;
        localStorage.setItem('learningProgress', JSON.stringify(progress));
    }

    // Search functionality (basic)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search learning materials...';
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
        `;
        
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(searchInput, mainContent.firstChild);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            learningCards.forEach(card => {
                const cardName = card.querySelector('.card-name').textContent.toLowerCase();
                const cardCollection = card.querySelector('.card-collection').textContent.toLowerCase();
                
                if (cardName.includes(searchTerm) || cardCollection.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Add search functionality
    addSearchFunctionality();
});

// Preview modal functionality
function showPreviewModal(cardName, cardCollection) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'preview-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 2rem;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
        border: 3px solid var(--border-color);
        padding: 2rem;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
            <div>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem 0; text-transform: uppercase; letter-spacing: 0.05em;">${cardName}</h2>
                <p style="font-size: 0.875rem; opacity: 0.8; margin: 0;">${cardCollection}</p>
            </div>
            <button class="close-modal" style="background: none; border: none; font-size: 2rem; color: var(--text-primary); cursor: pointer; font-family: 'JetBrains Mono', monospace;">&times;</button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div>
                <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem 0; text-transform: uppercase; letter-spacing: 0.05em;">Sample Flash Cards</h3>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="border: 1px solid var(--border-color); padding: 1rem; background: var(--accent-secondary);">
                        <div style="font-weight: 700; margin-bottom: 0.5rem;">Q: What is the primary goal of machine learning?</div>
                        <div style="opacity: 0.8; font-size: 0.875rem;">A: To enable computers to learn and make decisions from data without being explicitly programmed for every scenario.</div>
                    </div>
                    <div style="border: 1px solid var(--border-color); padding: 1rem; background: var(--accent-secondary);">
                        <div style="font-weight: 700; margin-bottom: 0.5rem;">Q: Name three types of machine learning paradigms</div>
                        <div style="opacity: 0.8; font-size: 0.875rem;">A: Supervised Learning, Unsupervised Learning, and Reinforcement Learning.</div>
                    </div>
                </div>
            </div>
            
            <div>
                <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem 0; text-transform: uppercase; letter-spacing: 0.05em;">Learning Objectives</h3>
                <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.6;">
                    <li>Understand core concepts and terminology</li>
                    <li>Apply algorithms to real-world problems</li>
                    <li>Analyze model performance and optimization</li>
                    <li>Implement solutions using popular frameworks</li>
                </ul>
            </div>
            
            <div>
                <h3 style="font-size: 1rem; font-weight: 700; margin: 0 0 1rem 0; text-transform: uppercase; letter-spacing: 0.05em;">Prerequisites</h3>
                <p style="margin: 0; opacity: 0.8; line-height: 1.6;">Basic programming knowledge, linear algebra fundamentals, and statistical concepts recommended.</p>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modalContent.querySelector('.close-modal');
    function closeModal() {
        document.body.removeChild(modal);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// Add additional animations
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .learning-card {
        transition: all 0.3s ease, border 0.2s ease;
    }
    
    .card-icon {
        transition: all 0.3s ease;
    }
    
    .stat-fill {
        transition: width 0.8s ease-out;
    }
    
    .preview-modal {
        animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .search-input:focus {
        outline: none;
        background: var(--overlay-color);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(additionalStyle);