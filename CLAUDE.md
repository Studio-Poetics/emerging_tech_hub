# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the "Emerging Tech Hub" - an educational platform for learning emerging technologies including AI, blockchain, robotics, quantum computing, and more. The project consists of interactive learning modules with flashcards, activities, readings, and field kits for each technology domain.

## Architecture

### Core Structure
- **Main Hub**: `index-experimental.html` serves as the central navigation hub
- **Technology Landing Pages**: Individual domain pages (`ai-landing.html`, `blockchain-landing.html`, etc.)
- **Interactive Learning**: Dedicated flashcard systems and activities for each domain
- **Design System**: Comprehensive styling through `experimental-design.css`

### Key Page Types
1. **Hub Page** (`index-experimental.html`): Central navigation with technology grid
2. **Landing Pages** (`*-landing.html`): Domain-specific learning hubs with 5 sections each:
   - Fundamentals (core concepts)
   - Readings (research papers and materials)
   - Flashcards (interactive learning)
   - Field Kit (tools and hardware)
   - Activities (hands-on projects)
3. **Flashcard Systems** (`flashcards-experimental.html`, `blockchain-flashcards.html`): Interactive learning tools
4. **Specialized Tools**: Cursor-inspired interfaces in `/cursor/` directory

### Design System
- **Primary Stylesheet**: `experimental-design.css` - Comprehensive design system with CSS custom properties
- **Color Scheme**: Black/white/gray with electric blue (`#4040ff`) accent
- **Typography**: Inter for UI, JetBrains Mono for code/technical content
- **Layout**: Experimental sidebar + main content pattern
- **Components**: Modal overlays, feature grids, interactive cards

## Technology Stack

### Frontend Only
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern CSS with custom properties, grid, flexbox
- **Vanilla JavaScript**: No frameworks - pure JS for interactions

### Key JavaScript Modules
- **Modal System**: `showInteractiveContent()` functions for educational content overlays
- **Flashcard Engine**: Card flipping, progress tracking, category management
- **Audio Integration**: Spotify Web Playback SDK integration (requires premium)
- **Navigation**: Smooth scrolling, keyboard shortcuts, responsive menus

## Development Workflow

### No Build Process
This is a static site with no build tools or package managers. All development is direct file editing.

### File Organization
```
/
├── index-experimental.html          # Main hub page
├── experimental-design.css          # Core design system
├── *-landing.html                  # Technology domain pages
├── flashcards-experimental.html    # Main flashcard system
├── *-flashcards.html               # Domain-specific flashcards
├── cursor/                         # Cursor-inspired tools
├── design-system/                  # Alternative design explorations
└── *.js                           # Standalone JavaScript modules
```

### Page Templates
All landing pages follow consistent structure:
- Experimental sidebar with brand, navigation, info boxes
- Main content area with hero section
- 5 standardized content sections with grid layouts
- Vertical menu for mobile navigation
- Modal overlay system for interactive content

## Content Management

### Adding New Technology Domains
1. Create `{domain}-landing.html` following existing template structure
2. Update navigation links in `index-experimental.html` and other landing pages
3. Add domain-specific flashcard system if needed
4. Ensure consistent styling using existing CSS classes

### Content Sections
Each technology domain has 5 standard sections:
- **Fundamentals**: 4-6 feature cards explaining core concepts
- **Readings**: Research papers, articles, case studies
- **Flashcards**: Interactive learning system
- **Field Kit**: Tools, hardware, development platforms
- **Activities**: Hands-on projects and experiments

### Status Management
- **Available**: Fully functional sections with interactive content
- **Coming Soon**: Placeholder sections with badges
- Section status controlled via CSS classes and JavaScript conditionals

## Interactive Features

### Modal System
- `showInteractiveContent(section, subsection)` displays detailed educational content
- Content mapping in JavaScript objects for each domain
- Keyboard navigation (Escape to close)
- Scroll lock during modal display

### Flashcard System
- Card flipping animations with CSS transforms
- Progress tracking and category filtering
- Keyboard navigation (Space to flip, arrows to navigate)
- Local storage for progress persistence

### Spotify Integration
- Web Playback SDK for ambient study music
- Requires Spotify Premium account
- Configuration in `spotify-config.js`
- See `SPOTIFY_SETUP.md` for setup instructions

## Styling Guidelines

### CSS Architecture
- **Design Tokens**: CSS custom properties in `:root`
- **Component Classes**: `.experimental-*` prefix for main components
- **Layout Classes**: Grid and flexbox utilities
- **State Classes**: `.active`, `.flipped`, `.coming-soon`

### Color Usage
- **Primary**: Black text on white background
- **Accent**: Electric blue (`--color-electric-blue`) for interactions
- **Secondary**: Gray scale for hierarchy and subtle elements
- **Hover States**: Blue background with white text

### Typography Scale
- **Headers**: Large, bold typography for impact
- **Body**: 16px base with 1.6 line height for readability
- **UI Elements**: Consistent sizing using design tokens

## Accessibility

### Keyboard Navigation
- Tab navigation through all interactive elements
- Escape key closes modals and overlays
- Arrow keys and space for flashcard navigation
- Enter/space for button activation

### Screen Readers
- Semantic HTML structure with proper heading hierarchy
- Alt text for images and icons
- ARIA labels for interactive elements
- Focus management for modal systems

### Color Contrast
- High contrast ratios meeting WCAG guidelines
- Clear visual hierarchy without relying solely on color
- Focus indicators for keyboard navigation

## Performance

### Optimization Strategies
- Minimal JavaScript - no frameworks or heavy libraries
- CSS custom properties for efficient theming
- Lazy loading considerations for large content sections
- Optimized animations using transform and opacity

### Browser Support
- Modern browsers supporting CSS Grid and custom properties
- Graceful degradation for older browsers
- Progressive enhancement approach

## Maintenance

### Common Tasks
- **Adding Content**: Update JavaScript content objects and HTML structure
- **Styling Updates**: Modify CSS custom properties in `experimental-design.css`
- **New Features**: Follow existing modal and interaction patterns
- **Cross-Domain Updates**: Update navigation links across all landing pages

### Code Quality
- Consistent indentation and formatting
- Semantic HTML structure
- Modular CSS with clear component boundaries
- Commented JavaScript for complex interactions

### Testing
- Cross-browser compatibility testing
- Keyboard navigation verification
- Responsive design across device sizes
- Accessibility auditing with screen readers

## Special Considerations

### Spotify Integration
- Requires valid Client ID in `spotify-config.js`
- Premium account needed for playback functionality
- Redirect URIs must be configured in Spotify Developer Dashboard
- See `SPOTIFY_SETUP.md` for complete setup guide

### Content Updates
- Technology domains can be marked "Available" vs "Coming Soon"
- Interactive content requires both HTML structure and JavaScript mapping
- Consistent feature card counts (4-6 per section) for visual balance

### Mobile Responsiveness
- Sidebar collapses to overlay menu on mobile
- Grid layouts adapt to single column
- Touch-friendly button and link sizing
- Optimized spacing for mobile interactions