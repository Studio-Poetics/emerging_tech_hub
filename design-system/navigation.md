# Navigation System

## Navigation Philosophy

The navigation system is designed to be **unobtrusive yet accessible**, adapting to content context while maintaining consistent functionality across all pages.

### Design Principles

1. **Contextual Adaptation**: Navigation elements change color based on background
2. **Progressive Enhancement**: Mobile-first approach with desktop enhancements
3. **Minimal Footprint**: Collapsed state preserves content space
4. **Clear Hierarchy**: Visual distinction between navigation levels
5. **Accessible Interaction**: Keyboard and screen reader friendly

## Navigation Types

### Left Vertical Navigation
**Purpose:** Primary page navigation and section jumping

#### Structure
```html
<div class="vertical-nav">
    <div class="nav-items">
        <a href="#section" class="nav-link">
            <span class="nav-icon">
                <svg><!-- Icon --></svg>
            </span>
            <span class="nav-text">Label</span>
        </a>
    </div>
</div>
```

#### Visual States
- **Collapsed (60px)**: Icons only, center-aligned
- **Expanded (220px)**: Icons + text, left-aligned
- **Adaptive colors**: Blue on white sections, white on dark sections

#### Behavior
- **Hover expansion**: Smooth width transition (0.3s)
- **Color adaptation**: Automatically adjusts based on scroll position
- **Overflow management**: Hidden text prevents visual spillover
- **Smooth scrolling**: Anchored navigation with eased animation

### Right Vertical Navigation
**Purpose:** Progress indication and contextual information

#### Structure
```html
<div class="vertical-nav-right">
    <span>Context Label</span>
    <div class="progress-indicator-nav">
        <div class="progress-fill-nav"></div>
    </div>
</div>
```

#### Features
- **Dynamic labeling**: Text changes based on scroll progress
- **Visual progress**: Vertical progress bar
- **Hover expansion**: 60px → 250px width
- **Context awareness**: Different content per page type

### Mobile Navigation
**Purpose:** Touch-friendly bottom navigation for mobile devices

#### Structure
```html
<div class="mobile-nav">
    <a href="#section" class="mobile-nav-link">Section</a>
    <a href="#other" class="mobile-nav-link">Other</a>
</div>
```

#### Features
- **Bottom positioning**: Fixed at viewport bottom
- **Large touch targets**: 44px minimum height
- **Horizontal distribution**: Space-around layout
- **Auto-hide**: Hidden on desktop (min-width: 769px)

## Icon System

### SVG Icons
All navigation uses inline SVG icons for:
- **Scalability**: Perfect at any size
- **Performance**: No additional HTTP requests
- **Styling**: Can be colored via CSS
- **Accessibility**: Proper semantic structure

#### Standard Icons
```html
<!-- Book (Learn/Why) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
</svg>

<!-- Play Circle (Start/Practice) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="10,8 16,12 10,16 10,8"></polygon>
</svg>

<!-- Bar Chart (Progress) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 20V10"></path>
    <path d="M12 20V4"></path>
    <path d="M6 20v-6"></path>
</svg>

<!-- Eye (Observe) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
</svg>

<!-- Brain (Think) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.07 2.07 0 0 1-2.44-2.44 1.5 1.5 0 0 1-1.51-2.96A2.5 2.5 0 0 1 9.5 2Z"></path>
</svg>

<!-- Wrench (Apply) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
</svg>

<!-- Back Arrow -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="m15 18-6-6 6-6"></path>
</svg>
```

## Adaptive Color System

### Context Detection
Navigation elements automatically detect the background they're positioned over:

```javascript
function updateNavigationColors() {
    const whiteSections = document.querySelectorAll('.hero-section, .introduction-section, .info-panel');
    const navElement = document.querySelector('.vertical-nav');
    const navRect = navElement.getBoundingClientRect();
    const navCenter = navRect.top + navRect.height / 2;

    let isOverWhiteSection = false;
    whiteSections.forEach(section => {
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top < navCenter && sectionRect.bottom > navCenter) {
            isOverWhiteSection = true;
        }
    });

    // Update colors based on background
    const navLinks = navElement.querySelectorAll('a');
    navLinks.forEach(link => {
        if (isOverWhiteSection) {
            link.style.color = 'rgba(30, 64, 175, 0.7)';
            const svg = link.querySelector('svg');
            if (svg) svg.style.stroke = 'rgba(30, 64, 175, 0.7)';
        } else {
            link.style.color = 'rgba(255, 255, 255, 0.7)';
            const svg = link.querySelector('svg');
            if (svg) svg.style.stroke = 'rgba(255, 255, 255, 0.7)';
        }
    });
}
```

### Color Transitions
```css
.nav-link {
    transition: color 0.3s ease;
}

.nav-icon svg {
    transition: stroke 0.3s ease;
}
```

## Navigation Behavior

### Smooth Scrolling
```javascript
function setupSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-items a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}
```

### Hover Effects
```css
.nav-link:hover {
    color: #1E40AF;
    background: rgba(30, 64, 175, 0.1);
    transform: translateX(5px);
}

.vertical-nav a:hover {
    border-radius: 8px;
}
```

### Active States
```css
.nav-link.active {
    color: #1E40AF;
    background: rgba(30, 64, 175, 0.2);
}
```

## Progress Integration

### Scroll-Based Progress
The right navigation displays learning progress:

```javascript
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const rightNav = document.querySelector('.vertical-nav-right span');
    if (rightNav) {
        if (scrollPercent < 25) {
            rightNav.textContent = 'Beginning';
        } else if (scrollPercent < 50) {
            rightNav.textContent = 'Learning';
        } else if (scrollPercent < 75) {
            rightNav.textContent = 'Exploring';
        } else {
            rightNav.textContent = 'Ready to Start';
        }
    }
}
```

### Activity Progress
On activity pages, shows completion progress:

```javascript
function updateRightNavProgress() {
    const rightNavSpan = document.querySelector('.vertical-nav-right span');
    const completedCount = this.completedActivities.size;
    const progressPercentage = Math.round((completedCount / this.totalActivities) * 100);

    if (completedCount === 0) {
        rightNavSpan.textContent = 'Ready to Start';
    } else if (completedCount === this.totalActivities) {
        rightNavSpan.textContent = 'Complete! 🎉';
    } else {
        rightNavSpan.textContent = `${progressPercentage}% Complete`;
    }
}
```

## Responsive Behavior

### Desktop (min-width: 769px)
- **Fixed navigation**: Left and right vertical bars
- **Hover expansion**: Width increases on hover
- **Full feature set**: All interactions available

### Mobile (max-width: 768px)
- **Hidden vertical navs**: Left and right bars hidden
- **Bottom navigation**: Horizontal mobile nav appears
- **Touch optimization**: Large tap targets, gesture support

### Responsive CSS
```css
@media (max-width: 768px) {
    .vertical-nav,
    .vertical-nav-right {
        display: none;
    }

    .mobile-nav {
        display: flex;
    }

    .main-grid,
    .main-container {
        margin: 0;
        padding-bottom: 80px;
    }
}

@media (min-width: 769px) {
    .mobile-nav {
        display: none;
    }
}
```

## Accessibility Features

### Keyboard Navigation
- **Tab order**: Logical navigation sequence
- **Focus indicators**: Clear visual focus states
- **Skip links**: Quick navigation to main content

### Screen Reader Support
- **Semantic HTML**: Proper nav, ul, li structure
- **ARIA labels**: Descriptive labels for complex interactions
- **Alt text**: Meaningful descriptions for icons

### Motion Sensitivity
```css
@media (prefers-reduced-motion: reduce) {
    .nav-link {
        transition: none;
    }

    .vertical-nav {
        transition: none;
    }
}
```

## Implementation Guidelines

### Setup Requirements
1. **Include shared-nav.css**: Contains all navigation styles
2. **Initialize JavaScript**: Set up scroll listeners and color adaptation
3. **Add data attributes**: Ensure proper section targeting
4. **Test responsiveness**: Verify behavior across screen sizes

### Performance Considerations
- **Debounced scroll events**: Limit color update frequency
- **Efficient selectors**: Use specific selectors for better performance
- **Hardware acceleration**: Use transform for smooth animations
- **Memory management**: Clean up event listeners when needed

### Customization Points
- **Colors**: Modify CSS custom properties
- **Timing**: Adjust transition durations
- **Sizes**: Update collapsed/expanded widths
- **Icons**: Replace SVG icons with brand-specific versions