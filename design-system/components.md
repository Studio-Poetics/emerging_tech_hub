# Component System

## Navigation Components

### Vertical Navigation (Left)
**Purpose:** Primary navigation for page sections and actions

```html
<div class="vertical-nav">
    <div class="nav-items">
        <a href="#section" class="nav-link">
            <span class="nav-icon">
                <svg><!-- Icon SVG --></svg>
            </span>
            <span class="nav-text">Label</span>
        </a>
    </div>
</div>
```

**Features:**
- **Adaptive width**: 60px collapsed, 220px expanded on hover
- **Color adaptation**: Changes color based on background context
- **Smooth transitions**: 0.3s ease for all properties
- **Overflow control**: Hidden text when collapsed
- **Icon + text pattern**: SVG icons with descriptive labels

**States:**
- **Collapsed**: Icons only, centered alignment
- **Expanded**: Icons + text, left alignment
- **Hover**: Color change based on background

### Vertical Navigation (Right)
**Purpose:** Progress indicator and contextual information

```html
<div class="vertical-nav-right">
    <span>Context Label</span>
    <div class="progress-indicator-nav">
        <div class="progress-fill-nav"></div>
    </div>
</div>
```

**Features:**
- **Fixed position**: Right side of viewport
- **Progress visualization**: Vertical progress bar
- **Context labels**: Dynamic text based on scroll position
- **Background color**: Uses primary blue (#1E40AF)

### Mobile Navigation
**Purpose:** Bottom navigation for mobile devices

```html
<div class="mobile-nav">
    <a href="#section" class="mobile-nav-link">Label</a>
</div>
```

**Features:**
- **Bottom positioning**: Fixed at bottom of viewport
- **Horizontal layout**: Space-around distribution
- **Touch-friendly**: Large tap targets
- **Auto-hide**: Hidden on desktop (min-width: 769px)

## Activity Components

### Activity Card
**Purpose:** Interactive learning activity container

```html
<div class="activity-card [featured|purple|bridge]"
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

    <h3>Activity Title</h3>
    <p>Activity description...</p>

    <div class="learning-objective">
        <strong>Learning Goal:</strong> Objective description
    </div>

    <div class="activity-action">
        <button class="start-activity">Begin Activity</button>
    </div>
</div>
```

**Variants:**
- **Default**: White background, blue text
- **Featured**: Blue background, white text (current activity)
- **Purple**: Blue background, white text (think module)
- **Bridge**: Blue background, white text (apply module)

**States:**
- **Unlocked**: Interactive, full opacity
- **Locked**: Reduced opacity, disabled interaction, lock icon
- **Completed**: Green button, checkmark indicator

**Features:**
- **Progressive disclosure**: Locked/unlocked based on prerequisites
- **Hover effects**: Lift animation, border highlight
- **Responsive design**: Stacks on mobile
- **Data attributes**: Support JavaScript functionality

### Section Divider
**Purpose:** Visual separation between activity modules

```html
<div class="section-divider">
    <h2>Section Title</h2>
    <p>Section description</p>
    <div class="module-info">
        <span class="module-prerequisite">Prerequisites</span>
        <span class="module-duration">Duration</span>
    </div>
</div>
```

## Interactive Components

### Progress Indicator (Floating)
**Purpose:** Learning progress visualization that adapts to scroll context

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

**Features:**
- **Adaptive colors**: Changes background/text based on scroll position
- **Backdrop blur**: Modern glass morphism effect
- **Auto-positioning**: Fixed position with smart placement
- **Smooth updates**: Animated progress changes

### Modal Components

#### Activity Modal
**Purpose:** Detailed activity instructions and completion flow

```html
<div class="activity-modal">
    <div class="activity-modal-content">
        <span class="close-modal">&times;</span>
        <h2>Activity Title</h2>

        <div class="activity-details">
            <div class="time-estimate">
                <span>Estimated time: 20 minutes</span>
            </div>
            <div class="activity-description">
                <p>Detailed instructions...</p>
            </div>
        </div>

        <div class="activity-controls">
            <button class="close-activity">Close</button>
            <button class="complete-activity">Mark Complete</button>
        </div>
    </div>
</div>
```

### Button Components

#### Primary Button
```css
.start-activity {
    background: #1E40AF;
    color: white;
    border: 2px solid #1E40AF;
    padding: 12px 30px;
    border-radius: 25px;
    font-weight: 600;
    transition: all 0.3s ease;
}

.start-activity:hover {
    background: #1D4ED8;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3);
}
```

#### Secondary Button
```css
.secondary-button {
    background: transparent;
    color: #1E40AF;
    border: 2px solid #1E40AF;
    /* ... other styles */
}
```

## Layout Components

### Main Grid
**Purpose:** Primary content container with navigation margins

```html
<div class="main-grid">
    <!-- Page content -->
</div>
```

**Features:**
- **Adaptive margins**: Adjusts for navigation width
- **Responsive**: Full width on mobile
- **Smooth transitions**: Margin changes on navigation hover

### Hero Section
**Purpose:** Page introduction with large typography

```html
<div class="hero-section">
    <div class="title-block">
        <h1>Large Title</h1>
        <div class="date-range">Subtitle text</div>
    </div>
    <div class="hero-visual">
        <div class="abstract-shape"></div>
        <div class="floating-elements"></div>
    </div>
</div>
```

## Visual Elements

### Abstract Shapes
**Purpose:** Visual interest without distraction

```css
.abstract-shape {
    width: 400px;
    height: 400px;
    background: #1E40AF;
    border-radius: 50% 30% 60% 40%;
    animation: morphShape 8s ease-in-out infinite;
}
```

**Animations:**
- **morphShape**: Continuous subtle morphing
- **float**: Gentle up/down movement
- **particle effects**: Ambient background animation

## Component Guidelines

### Spacing System
- **Small gaps**: 8px, 12px, 15px
- **Medium gaps**: 20px, 25px, 30px
- **Large gaps**: 40px, 60px, 80px
- **Section spacing**: 100px, 120px

### Border Radius
- **Small**: 6px, 8px (buttons, inputs)
- **Medium**: 15px, 20px (cards, modals)
- **Large**: 25px (primary buttons)

### Box Shadows
- **Subtle**: `0 4px 20px rgba(0, 0, 0, 0.1)`
- **Medium**: `0 10px 30px rgba(0, 0, 0, 0.15)`
- **Prominent**: `0 20px 40px rgba(30, 64, 175, 0.3)`

### Transitions
- **Fast**: 0.2s ease (small changes)
- **Standard**: 0.3s ease (most animations)
- **Slow**: 0.6s ease (large movements, fade-ins)

## Accessibility Features

### Focus Management
- **Visible focus**: Clear outline for keyboard navigation
- **Skip links**: Quick navigation for screen readers
- **ARIA labels**: Descriptive labels for interactive elements

### Color Independence
- **No color-only information**: Always paired with text/icons
- **High contrast**: Meets WCAG AA standards
- **Alternative indicators**: Shape, position, text for state changes

### Touch Targets
- **Minimum size**: 44px x 44px for interactive elements
- **Spacing**: Adequate space between touch targets
- **Hover states**: Clear feedback for interactions