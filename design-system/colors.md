# Color System

## Philosophy
The learning tool uses a **single bold color approach** instead of gradients or multiple accent colors. This creates focus and reduces visual complexity that could distract from learning content.

## Primary Palette

### Blue - #1E40AF
**Primary interactive color**
- Hex: `#1E40AF`
- RGB: `rgb(30, 64, 175)`
- HSL: `hsl(218, 70%, 40%)`

**Usage:**
- Text on white backgrounds
- Primary buttons and interactive elements
- Activity highlights and progress indicators
- SVG icon strokes
- Border colors for focused states

### White - #FFFFFF
**Primary background and text color**
- Hex: `#FFFFFF`
- RGB: `rgb(255, 255, 255)`

**Usage:**
- Main background color for content areas
- Text on dark backgrounds
- Button text on blue backgrounds
- Progress indicator fill on dark backgrounds

### Black - #000000
**High contrast and navigation**
- Hex: `#000000`
- RGB: `rgb(0, 0, 0)`

**Usage:**
- Navigation backgrounds
- High contrast sections
- Text when maximum contrast is needed
- Separator lines and borders

## Secondary Colors

### Blue Variations (Alpha Transparency)
- `rgba(30, 64, 175, 0.1)` - Light background tints
- `rgba(30, 64, 175, 0.2)` - Hover states
- `rgba(30, 64, 175, 0.3)` - Box shadows
- `rgba(30, 64, 175, 0.7)` - Semi-transparent text
- `rgba(30, 64, 175, 0.9)` - High opacity overlays
- `rgba(30, 64, 175, 0.95)` - Floating element backgrounds

### White Variations (Alpha Transparency)
- `rgba(255, 255, 255, 0.1)` - Subtle overlays on dark backgrounds
- `rgba(255, 255, 255, 0.7)` - Semi-transparent text on dark backgrounds
- `rgba(255, 255, 255, 0.95)` - Floating element backgrounds over white sections

## Adaptive Color System

### Context-Aware Colors
The system automatically adapts element colors based on background context:

**On White Backgrounds:**
- Text: Blue (#1E40AF)
- Icons: Blue stroke
- Interactive elements: Blue with white text

**On Dark Backgrounds:**
- Text: White (#FFFFFF)
- Icons: White stroke
- Interactive elements: White/transparent with dark text

**Implementation:**
```css
/* Base styles */
.nav-link {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
}

/* JavaScript dynamically updates based on scroll position */
// When over white sections
link.style.color = 'rgba(30, 64, 175, 0.7)';

// When over dark sections
link.style.color = 'rgba(255, 255, 255, 0.7)';
```

## Accessibility

### Contrast Ratios
All color combinations meet WCAG AA standards:

- **Blue on White**: Contrast ratio 8.2:1 (AAA)
- **White on Blue**: Contrast ratio 8.2:1 (AAA)
- **White on Black**: Contrast ratio 21:1 (AAA)
- **Blue on Light Gray**: Minimum 4.5:1 (AA)

### Color Blind Friendly
The high contrast, single-color approach works well for all types of color vision:
- No reliance on color alone for information
- High luminance contrast between elements
- Clear visual hierarchy through size and spacing

## Usage Guidelines

### Do ✅
- Use blue (#1E40AF) for all interactive elements on white backgrounds
- Use white text on blue or black backgrounds
- Maintain high contrast ratios
- Use alpha variations for subtle effects
- Let the adaptive system handle color changes

### Don't ❌
- Add additional accent colors
- Use gradients or color transitions
- Use blue text on blue backgrounds
- Create low contrast combinations
- Override the adaptive color system

## Implementation Notes

### CSS Custom Properties
```css
:root {
    --primary-blue: #1E40AF;
    --white: #FFFFFF;
    --black: #000000;
    --blue-10: rgba(30, 64, 175, 0.1);
    --blue-70: rgba(30, 64, 175, 0.7);
    --white-70: rgba(255, 255, 255, 0.7);
    --white-95: rgba(255, 255, 255, 0.95);
}
```

### Scroll-Based Color Adaptation
The navigation and floating elements automatically change color based on the background they're positioned over, ensuring optimal readability at all scroll positions.