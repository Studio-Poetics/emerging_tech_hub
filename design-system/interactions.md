# Interaction & Animation System

## Philosophy

Interactions prioritize **meaningful feedback** and **learning progression**. Every animation serves a purpose: guiding attention, providing feedback, or indicating system state changes.

### Core Principles

1. **Purpose-Driven**: Every animation has a clear functional purpose
2. **Smooth Transitions**: All state changes are visually smooth
3. **Context-Aware**: Interactions adapt to user context and progress
4. **Performance-First**: Animations use efficient CSS transforms
5. **Accessible**: Respect user motion preferences

## Animation Timing

### Standard Durations
```css
:root {
    --transition-fast: 0.2s;
    --transition-standard: 0.3s;
    --transition-slow: 0.6s;
    --easing-standard: ease;
    --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Usage Guidelines
- **0.2s**: Micro-interactions, hover states, color changes
- **0.3s**: Standard UI transitions, navigation changes
- **0.6s**: Major state changes, modal appearances, page transitions

## Hover & Focus States

### Navigation Links
```css
.nav-link {
    transition: all 0.3s ease;
}

.nav-link:hover {
    color: #1E40AF;
    background: rgba(30, 64, 175, 0.1);
    transform: translateX(5px);
}
```

### Activity Cards
```css
.activity-card {
    transition: all 0.3s ease;
    cursor: pointer;
}

.activity-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #1E40AF;
}
```

### Buttons
```css
.start-activity {
    transition: all 0.3s ease;
}

.start-activity:hover {
    background: #1D4ED8;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
}
```

## Progressive Disclosure Animations

### Activity Unlocking
```css
.activity-card.unlocked {
    animation: unlockPulse 1s ease-in-out;
}

@keyframes unlockPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}
```

### Content Reveal
```css
.activity-card {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.activity-card.visible {
    opacity: 1;
    transform: translateY(0);
}
```

## Scroll-Based Interactions

### Adaptive Color Changes
**Implementation:** JavaScript-driven color transitions based on scroll position

```javascript
// Smooth color transitions as elements pass over different backgrounds
element.style.transition = 'color 0.3s ease';
element.style.color = isOverWhiteSection
    ? 'rgba(30, 64, 175, 0.7)'
    : 'rgba(255, 255, 255, 0.7)';
```

### Parallax Effects
```css
.abstract-shape {
    transition: transform 0.1s ease;
}

/* JavaScript updates transform based on scroll */
.abstract-shape {
    transform: translateY(calc(var(--scroll-offset) * -0.5px));
}
```

### Progress Indicators
```css
.progress-line {
    width: 0%;
    transition: width 0.1s ease;
}

/* JavaScript updates width based on scroll percentage */
.progress-line {
    width: calc(var(--scroll-percentage) * 1%);
}
```

## Modal & Overlay Animations

### Modal Entrance
```css
.modal {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal.visible {
    opacity: 1;
}

.modal-content {
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.modal.visible .modal-content {
    transform: scale(1);
}
```

### Notification Animations
```css
.notification {
    opacity: 0;
    transform: translateX(100px);
    transition: all 0.3s ease;
}

.notification.visible {
    opacity: 1;
    transform: translateX(0);
}
```

## Ambient Animations

### Morphing Shapes
```css
@keyframes morphShape {
    0%, 100% {
        border-radius: 50% 30% 60% 40%;
        transform: rotate(0deg) scale(1);
    }
    25% {
        border-radius: 30% 60% 40% 50%;
        transform: rotate(90deg) scale(1.1);
    }
    50% {
        border-radius: 60% 40% 50% 30%;
        transform: rotate(180deg) scale(0.9);
    }
    75% {
        border-radius: 40% 50% 30% 60%;
        transform: rotate(270deg) scale(1.05);
    }
}

.abstract-shape {
    animation: morphShape 8s ease-in-out infinite;
}
```

### Floating Elements
```css
@keyframes float {
    0%, 100% {
        transform: translateY(0) scale(1);
        opacity: 0.3;
    }
    50% {
        transform: translateY(-40px) scale(1.2);
        opacity: 0.8;
    }
}

.floating-element {
    animation: float 6s ease-in-out infinite;
}
```

### Particle System
```css
@keyframes particleFloat {
    0% {
        transform: translateY(0) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
        transform: scale(1);
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-200px) scale(0);
        opacity: 0;
    }
}

.particle {
    animation: particleFloat 4s linear infinite;
}
```

## Navigation Animations

### Expansion/Collapse
```css
.vertical-nav {
    width: 60px;
    transition: width 0.3s ease;
}

.vertical-nav:hover {
    width: 220px;
}

.nav-text {
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
}

.vertical-nav:hover .nav-text {
    opacity: 1;
    transform: translateX(0);
}
```

### Page Loading
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.activity-card {
    animation: fadeInUp 0.6s ease-out forwards;
}

/* Staggered animations */
.activity-card:nth-child(1) { animation-delay: 0.1s; }
.activity-card:nth-child(2) { animation-delay: 0.2s; }
.activity-card:nth-child(3) { animation-delay: 0.3s; }
```

## Touch Interactions

### Mobile Feedback
```css
.activity-card {
    touch-action: manipulation;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

.activity-card:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
}
```

### Scroll Hints
```css
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

.scroll-hint {
    animation: bounce 2s ease-in-out infinite;
}
```

## State Management Animations

### Activity Completion
```javascript
// Visual feedback for completing an activity
function completeActivity(activityNum) {
    const card = document.querySelector(`[data-activity="${activityNum}"]`);

    // Add completion animation
    card.classList.add('completed');

    // Update button with smooth transition
    const button = card.querySelector('.start-activity');
    button.style.transition = 'all 0.3s ease';
    button.textContent = 'Completed ✓';
    button.style.background = 'rgba(34, 197, 94, 0.8)';
}
```

### Progressive Unlocking
```javascript
// Smooth unlock animation with notification
function unlockActivity(activityNum) {
    const card = document.querySelector(`[data-activity="${activityNum}"]`);

    card.classList.remove('locked');
    card.classList.add('unlocked');

    // Show unlock notification
    showNotification(`Activity ${activityNum} unlocked! 🎉`);

    // Scroll to newly unlocked activity
    setTimeout(() => {
        card.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 300);
}
```

## Performance Optimization

### Hardware Acceleration
```css
.accelerated {
    transform: translateZ(0);
    will-change: transform;
}
```

### Efficient Animations
- **Use transform**: Instead of changing layout properties
- **Avoid animating**: width, height, top, left
- **Prefer**: transform, opacity, filter
- **Batch updates**: Use requestAnimationFrame for scroll events

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

## Interaction Guidelines

### Do ✅
- Provide immediate visual feedback for all interactions
- Use consistent timing and easing across similar interactions
- Animate state changes to help users understand what happened
- Test animations on slower devices
- Respect user motion preferences

### Don't ❌
- Create animations longer than 0.6s for UI interactions
- Animate multiple properties simultaneously without purpose
- Use complex easing functions for subtle interactions
- Forget to handle animation completion states
- Override user accessibility preferences

### Performance Tips
- **Debounce scroll events**: Limit frequency of scroll-based updates
- **Use CSS transitions**: When possible, prefer CSS over JavaScript
- **Clean up animations**: Remove event listeners and clear timeouts
- **Test on devices**: Verify performance on various screen sizes and capabilities