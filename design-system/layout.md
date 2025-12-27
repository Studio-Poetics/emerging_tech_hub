# Layout System

## Grid Philosophy

The layout system prioritizes **linear progression** and **unidirectional flow**, supporting the concept of "an online scroll of text that unfolds in one direction."

### Layout Principles

1. **Vertical Flow**: Content flows top to bottom with clear section divisions
2. **Adaptive Margins**: Content adjusts for navigation element expansion
3. **Progressive Disclosure**: Layout reveals content as users advance
4. **Mobile-First**: Responsive design starts with mobile constraints
5. **Breathing Room**: Generous whitespace for learning comfort

## Container System

### Main Grid (.main-grid)
**Purpose:** Primary content container for home page

```css
.main-grid {
    margin-left: 60px;   /* Space for left navigation */
    margin-right: 60px;  /* Space for right navigation */
    min-height: 100vh;
    transition: margin 0.3s ease;
}
```

**Responsive Behavior:**
```css
/* Navigation hover expansion */
.vertical-nav:hover ~ .main-grid {
    margin-left: 220px;
}

.vertical-nav-right:hover ~ .main-grid {
    margin-right: 250px;
}

/* Mobile adjustments */
@media (max-width: 768px) {
    .main-grid {
        margin: 0;
        padding-bottom: 80px; /* Space for mobile nav */
    }
}
```

### Main Container (.main-container)
**Purpose:** Content container for activity pages

```css
.main-container {
    margin-left: 60px;
    margin-right: 60px;
    min-height: 100vh;
    transition: margin 0.3s ease;
}
```

**Same responsive behavior as main-grid**

## Section Layouts

### Hero Section
**Purpose:** Full-viewport introduction with split layout

```css
.hero-section {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 0 80px;
}

/* Mobile: Single column */
@media (max-width: 768px) {
    .hero-section {
        grid-template-columns: 1fr;
        height: auto;
        min-height: 100vh;
        padding: 40px 20px;
        gap: 40px;
    }
}
```

### Two-Column Content
**Purpose:** Text + visual content pairing

```css
.introduction-section {
    padding: 120px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 100px;
    align-items: center;
}

/* Mobile: Stack vertically */
@media (max-width: 768px) {
    .introduction-section {
        grid-template-columns: 1fr;
        gap: 40px;
        padding: 60px 20px;
    }
}
```

### Activities Grid
**Purpose:** Progressive learning activity layout

```css
.activities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
    padding: 40px 80px;
}

/* Mobile: Single column */
@media (max-width: 768px) {
    .activities-grid {
        grid-template-columns: 1fr;
        padding: 20px;
        gap: 20px;
    }
}
```

## Spacing System

### Vertical Spacing (Padding/Margins)

#### Large Sections
- **120px**: Major section padding (desktop)
- **80px**: Standard section padding
- **60px**: Reduced section padding (tablet)
- **40px**: Mobile section padding
- **20px**: Minimal mobile padding

#### Content Spacing
- **100px**: Large content gaps
- **60px**: Medium content gaps
- **40px**: Standard content gaps
- **25px**: Small content gaps
- **15px**: Minimal spacing

#### Component Spacing
- **30px**: Between major elements
- **20px**: Between related elements
- **15px**: Between close elements
- **8px**: Internal component spacing

### Horizontal Spacing

#### Grid Gaps
- **100px**: Large content separation
- **60px**: Medium content separation
- **30px**: Standard grid gaps
- **20px**: Mobile grid gaps

#### Content Padding
- **80px**: Desktop content padding
- **40px**: Tablet content padding
- **20px**: Mobile content padding

## Responsive Breakpoints

### Primary Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
    /* Stack grids, reduce padding, show mobile nav */
}

/* Tablet */
@media (max-width: 1200px) {
    /* Reduce margins, adjust grid gaps */
}

/* Desktop */
@media (min-width: 1201px) {
    /* Full layout with all features */
}

/* Navigation-specific */
@media (min-width: 769px) {
    .mobile-nav { display: none; }
}

@media (max-width: 768px) {
    .vertical-nav,
    .vertical-nav-right { display: none; }
}
```

### Responsive Patterns

#### Content Stacking
- **Desktop**: Side-by-side layouts
- **Mobile**: Vertical stacking with reduced gaps

#### Navigation Adaptation
- **Desktop**: Fixed left/right navigation bars
- **Mobile**: Bottom navigation bar

#### Typography Scaling
- **Large screens**: Fluid typography with clamp()
- **Small screens**: Fixed, readable sizes

## Navigation Layout

### Left Navigation
```css
.vertical-nav {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 60px;
    transition: width 0.3s ease;
}

.vertical-nav:hover {
    width: 220px;
}
```

### Right Navigation
```css
.vertical-nav-right {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 60px;
    transition: width 0.3s ease;
}

.vertical-nav-right:hover {
    width: 250px;
}
```

### Mobile Navigation
```css
.mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
```

## Layout Guidelines

### Content Flow
1. **Hero section**: Full viewport introduction
2. **Context section**: Why/what information
3. **Action section**: How to proceed
4. **Details section**: Additional information

### Spacing Hierarchy
1. **Section separation**: 120px+ vertical spacing
2. **Content blocks**: 60-80px separation
3. **Related elements**: 20-40px separation
4. **Component internals**: 8-20px separation

### Responsive Strategy
1. **Mobile first**: Design for smallest screen
2. **Progressive enhancement**: Add features for larger screens
3. **Content priority**: Most important content remains accessible
4. **Touch targets**: Maintain usable tap areas

## Performance Considerations

### Layout Shift Prevention
- **Fixed dimensions**: Navigation elements have defined sizes
- **Smooth transitions**: All layout changes are animated
- **Stable positioning**: Content doesn't jump during interactions

### Efficient Animations
- **Transform-based**: Use transform properties for performance
- **Hardware acceleration**: GPU-accelerated animations
- **Debounced events**: Scroll and resize handlers are optimized

### Mobile Optimizations
- **Touch-friendly**: Large tap targets (44px minimum)
- **Gesture support**: Swipe and scroll behaviors
- **Viewport optimization**: Prevents zoom on input focus