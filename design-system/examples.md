# Implementation Examples

## Complete Component Examples

### Activity Card with Progressive Disclosure

#### HTML Structure
```html
<div class="activity-card featured"
     data-activity="1"
     data-module="observe"
     data-prerequisite="none">

    <div class="activity-header">
        <span class="activity-number">01</span>
        <span class="activity-type">Observation</span>
        <span class="activity-time">20 min</span>
    </div>

    <div class="prerequisite-indicator">
        <span class="prerequisite-text">Start Here</span>
    </div>

    <h3>Light Archaeology</h3>
    <p>Spend 20 minutes documenting how light changes in one space throughout different times. Notice not just brightness but color temperature, direction, and quality.</p>

    <div class="learning-objective">
        <strong>Learning Goal:</strong> Develop sensitivity to environmental changes and patterns
    </div>

    <div class="activity-action">
        <button class="start-activity">Begin Activity</button>
    </div>
</div>
```

#### CSS Styling
```css
.activity-card {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    border: 2px solid transparent;
    color: #1E40AF;
}

.activity-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #1E40AF;
}

.activity-card.featured {
    background: #1E40AF;
    color: white;
}

.activity-card.locked {
    opacity: 0.5;
    pointer-events: none;
}

.activity-card.locked::before {
    content: '🔒';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 1.5rem;
    z-index: 10;
}

.activity-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.activity-number {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    padding: 8px 12px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
}

.activity-card:not(.featured) .activity-number {
    background: rgba(30, 64, 175, 0.1);
    color: #1E40AF;
}

.start-activity {
    background: #1E40AF;
    color: white;
    border: 2px solid #1E40AF;
    padding: 12px 30px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.start-activity:hover {
    background: #1D4ED8;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
}
```

#### JavaScript Functionality
```javascript
class ActivityManager {
    constructor() {
        this.completedActivities = new Set();
        this.setupActivityCards();
        this.updateActivityLockStates();
    }

    setupActivityCards() {
        const activityCards = document.querySelectorAll('.activity-card');

        activityCards.forEach(card => {
            const activityNum = parseInt(card.dataset.activity);
            const startButton = card.querySelector('.start-activity');

            if (startButton) {
                startButton.addEventListener('click', (e) => {
                    e.stopPropagation();

                    if (card.classList.contains('locked')) {
                        this.showLockedMessage(activityNum);
                        return;
                    }

                    this.startActivity(activityNum, card);
                });
            }
        });
    }

    updateActivityLockStates() {
        const activityCards = document.querySelectorAll('.activity-card');

        activityCards.forEach(card => {
            const activityNum = parseInt(card.dataset.activity);
            const prerequisite = card.dataset.prerequisite;

            if (prerequisite === 'none') {
                card.classList.remove('locked');
                card.classList.add('unlocked');
            } else {
                const prerequisiteNum = parseInt(prerequisite);
                const isUnlocked = this.completedActivities.has(prerequisiteNum);

                if (isUnlocked) {
                    card.classList.remove('locked');
                    card.classList.add('unlocked');
                } else {
                    card.classList.add('locked');
                    card.classList.remove('unlocked');
                }
            }
        });

        this.updateFeaturedHighlight();
    }

    updateFeaturedHighlight() {
        const activityCards = document.querySelectorAll('.activity-card');

        // Remove featured class from all cards
        activityCards.forEach(card => {
            card.classList.remove('featured');
        });

        // Find next available activity
        for (let i = 1; i <= 12; i++) {
            const card = document.querySelector(`[data-activity="${i}"]`);
            const isCompleted = this.completedActivities.has(i);
            const isUnlocked = card && !card.classList.contains('locked');

            if (isUnlocked && !isCompleted) {
                card.classList.add('featured');
                break;
            }
        }
    }

    completeActivity(activityNum) {
        const activityNumber = parseInt(activityNum);
        this.completedActivities.add(activityNumber);

        // Update visual
        const card = document.querySelector(`[data-activity="${activityNumber}"]`);
        if (card) {
            card.classList.add('completed');
            const button = card.querySelector('.start-activity');
            if (button) {
                button.textContent = 'Completed ✓';
                button.style.background = 'rgba(34, 197, 94, 0.8)';
            }
        }

        // Update lock states after small delay
        setTimeout(() => {
            this.updateActivityLockStates();
        }, 100);
    }
}

// Initialize the system
document.addEventListener('DOMContentLoaded', () => {
    new ActivityManager();
});
```

### Adaptive Navigation Example

#### HTML Structure
```html
<div class="vertical-nav">
    <div class="nav-items">
        <a href="#learn" class="nav-link">
            <span class="nav-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
            </span>
            <span class="nav-text">Why Learn</span>
        </a>
    </div>
</div>
```

#### Adaptive Color JavaScript
```javascript
class AdaptiveNavigation {
    constructor() {
        this.setupScrollBasedColors();
    }

    setupScrollBasedColors() {
        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateNavigationColors();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);
        this.updateNavigationColors(); // Initialize
    }

    updateNavigationColors() {
        const verticalNav = document.querySelector('.vertical-nav');
        if (!verticalNav) return;

        // Define white background sections
        const whiteSections = document.querySelectorAll(
            '.hero-section, .introduction-section, .info-panel, .philosophy-section'
        );

        const navRect = verticalNav.getBoundingClientRect();
        const navCenter = navRect.top + navRect.height / 2;
        let navOverWhiteSection = false;

        // Check if navigation is over a white section
        whiteSections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            if (sectionRect.top < navCenter && sectionRect.bottom > navCenter) {
                navOverWhiteSection = true;
            }
        });

        const navLinks = verticalNav.querySelectorAll('a');

        if (navOverWhiteSection) {
            // Blue text on white background
            navLinks.forEach(link => {
                link.style.color = 'rgba(30, 64, 175, 0.7)';
                const svg = link.querySelector('svg');
                if (svg) {
                    svg.style.stroke = 'rgba(30, 64, 175, 0.7)';
                }
            });
        } else {
            // White text on dark background
            navLinks.forEach(link => {
                link.style.color = 'rgba(255, 255, 255, 0.7)';
                const svg = link.querySelector('svg');
                if (svg) {
                    svg.style.stroke = 'rgba(255, 255, 255, 0.7)';
                }
            });
        }
    }
}

// Initialize adaptive navigation
document.addEventListener('DOMContentLoaded', () => {
    new AdaptiveNavigation();
});
```

### Progress Indicator Example

#### HTML Structure
```html
<div id="progress-indicator">
    <div class="progress-content">
        <span class="progress-text">Learning Progress</span>
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <span class="progress-percentage">0%</span>
    </div>
</div>
```

#### CSS Styling
```css
#progress-indicator {
    position: fixed;
    top: 20px;
    right: 80px;
    background: rgba(30, 64, 175, 0.95);
    color: white;
    padding: 15px 20px;
    border-radius: 25px;
    z-index: 1000;
    font-size: 12px;
    font-weight: 500;
    box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.progress-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.progress-bar {
    width: 100px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: white;
    width: 0%;
    transition: width 0.3s ease;
}
```

#### JavaScript Implementation
```javascript
class ProgressIndicator {
    constructor() {
        this.viewedSections = new Set();
        this.totalSections = 4;
        this.createProgressIndicator();
        this.setupScrollTracking();
    }

    createProgressIndicator() {
        // Progress indicator is created in HTML
        this.updateProgress();
    }

    setupScrollTracking() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id || entry.target.className.split(' ')[0];
                    this.markSectionAsViewed(sectionId);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        const sections = document.querySelectorAll('section, .start-journey');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    markSectionAsViewed(sectionId) {
        if (sectionId && !this.viewedSections.has(sectionId)) {
            this.viewedSections.add(sectionId);
            this.updateProgress();
        }
    }

    updateProgress() {
        const viewedCount = this.viewedSections.size;
        const percentage = Math.round((viewedCount / this.totalSections) * 100);

        const indicator = document.getElementById('progress-indicator');
        if (indicator) {
            const fill = indicator.querySelector('.progress-fill');
            const text = indicator.querySelector('.progress-percentage');

            if (fill) fill.style.width = `${percentage}%`;
            if (text) text.textContent = `${percentage}%`;
        }
    }

    updateFloatingToolColor() {
        const progressIndicator = document.getElementById('progress-indicator');
        if (!progressIndicator) return;

        const whiteSections = document.querySelectorAll(
            '.hero-section, .introduction-section, .info-panel'
        );

        const indicatorRect = progressIndicator.getBoundingClientRect();
        const indicatorCenter = indicatorRect.top + indicatorRect.height / 2;
        let isOverWhiteSection = false;

        whiteSections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            if (sectionRect.top < indicatorCenter && sectionRect.bottom > indicatorCenter) {
                isOverWhiteSection = true;
            }
        });

        if (isOverWhiteSection) {
            progressIndicator.style.background = 'rgba(255, 255, 255, 0.95)';
            progressIndicator.style.color = '#1E40AF';
            progressIndicator.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';

            const progressFill = progressIndicator.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.background = '#1E40AF';
            }
        } else {
            progressIndicator.style.background = 'rgba(30, 64, 175, 0.95)';
            progressIndicator.style.color = 'white';
            progressIndicator.style.boxShadow = '0 4px 20px rgba(30, 64, 175, 0.3)';

            const progressFill = progressIndicator.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.background = 'white';
            }
        }
    }
}

// Initialize progress tracking
document.addEventListener('DOMContentLoaded', () => {
    new ProgressIndicator();
});
```

## CSS Framework Integration

### Using the Design System with CSS Custom Properties

#### Setup Variables
```css
:root {
    /* Colors */
    --primary-blue: #1E40AF;
    --white: #FFFFFF;
    --black: #000000;

    /* Alpha variations */
    --blue-10: rgba(30, 64, 175, 0.1);
    --blue-20: rgba(30, 64, 175, 0.2);
    --blue-70: rgba(30, 64, 175, 0.7);
    --blue-95: rgba(30, 64, 175, 0.95);
    --white-70: rgba(255, 255, 255, 0.7);
    --white-95: rgba(255, 255, 255, 0.95);

    /* Typography */
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-weight-light: 100;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;

    /* Spacing */
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 20px;
    --spacing-lg: 40px;
    --spacing-xl: 80px;
    --spacing-xxl: 120px;

    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-standard: 0.3s ease;
    --transition-slow: 0.6s ease;

    /* Borders */
    --border-radius-sm: 8px;
    --border-radius-md: 15px;
    --border-radius-lg: 25px;

    /* Shadows */
    --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.15);
    --shadow-blue: 0 8px 25px rgba(30, 64, 175, 0.3);
}
```

#### Example Component Using Variables
```css
.custom-activity-card {
    background: var(--white);
    color: var(--primary-blue);
    padding: var(--spacing-lg);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
    transition: var(--transition-standard);
    font-family: var(--font-family);
}

.custom-activity-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-md);
}

.custom-activity-card.featured {
    background: var(--primary-blue);
    color: var(--white);
}

.custom-button {
    background: var(--primary-blue);
    color: var(--white);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-lg);
    font-weight: var(--font-weight-semibold);
    transition: var(--transition-standard);
    border: none;
    cursor: pointer;
}

.custom-button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-blue);
}
```

## Integration Checklist

### Essential Files
- [ ] `shared-nav.css` - Navigation components
- [ ] `colors.css` - Color system variables
- [ ] `typography.css` - Font and text styles
- [ ] `components.css` - Reusable components
- [ ] `animations.css` - Interaction animations

### JavaScript Requirements
- [ ] Adaptive navigation color system
- [ ] Progressive disclosure logic
- [ ] Progress tracking functionality
- [ ] Smooth scrolling implementation
- [ ] Mobile touch optimizations

### Testing Requirements
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
- [ ] Performance optimization
- [ ] Color contrast validation

### Documentation
- [ ] Component usage guidelines
- [ ] Customization instructions
- [ ] Integration examples
- [ ] Performance considerations
- [ ] Accessibility features