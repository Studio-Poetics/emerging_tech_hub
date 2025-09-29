# Typography System

## Font Family

### Primary Font: Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Rationale:**
- **High readability** at all sizes
- **Excellent web performance** with variable font support
- **Modern, clean appearance** that doesn't compete with content
- **Wide character set** supporting multiple languages
- **Optimized for screens** with good hinting

### Fallback Stack
The system gracefully falls back to system fonts for performance and reliability:
1. `Inter` - Primary web font
2. `-apple-system` - macOS system font
3. `BlinkMacSystemFont` - Chrome on macOS
4. `sans-serif` - Generic fallback

## Type Scale

### Headings

#### H1 - Hero Titles
```css
font-size: clamp(3rem, 8vw, 8rem);
font-weight: 100; /* Ultra Light */
letter-spacing: -0.05em;
line-height: 0.9;
```
**Usage:** Main page titles, hero sections
**Example:** "Learn Making Hardware & Software"

#### H2 - Section Headers
```css
font-size: clamp(3rem, 6vw, 6rem);
font-weight: 100; /* Ultra Light */
letter-spacing: -0.03em;
line-height: 0.9;
```
**Usage:** Major section headings
**Example:** "WHY LEARN MAKING?"

#### H3 - Activity Titles
```css
font-size: 1.8rem;
font-weight: 500; /* Medium */
letter-spacing: -0.02em;
margin-bottom: 20px;
```
**Usage:** Activity card titles, modal headings

#### H4 - Subsection Titles
```css
font-size: 1.3rem;
font-weight: 500; /* Medium */
margin-bottom: 5px;
letter-spacing: -0.01em;
```

#### H5 - Small Headers
```css
font-size: 1rem;
font-weight: 600; /* Semi Bold */
text-transform: uppercase;
letter-spacing: 1px;
```
**Usage:** Form labels, small section headers

### Body Text

#### Primary Body
```css
font-size: 1.2rem;
line-height: 1.6;
font-weight: 400; /* Regular */
margin-bottom: 25px;
```
**Usage:** Main content paragraphs, activity descriptions

#### Secondary Body
```css
font-size: 1rem;
line-height: 1.6;
font-weight: 400; /* Regular */
opacity: 0.9;
```
**Usage:** Supporting text, descriptions

#### Small Text
```css
font-size: 0.9rem;
font-weight: 500; /* Medium */
opacity: 0.8;
```
**Usage:** Metadata, time estimates, helper text

### Navigation & UI Text

#### Navigation Links
```css
font-size: 12px; /* Collapsed state */
font-size: 14px; /* Expanded state */
font-weight: 500; /* Medium */
letter-spacing: 1px;
```

#### Button Text
```css
font-size: 1rem;
font-weight: 600; /* Semi Bold */
letter-spacing: 0.5px;
```

#### Navigation Labels
```css
font-size: 14px;
font-weight: 600; /* Semi Bold */
letter-spacing: 2px;
text-transform: uppercase;
```

## Font Weights

The system uses a limited set of font weights for consistency:

- **100 (Ultra Light)**: Large display headings only
- **300 (Light)**: Subtitle text, date ranges
- **400 (Regular)**: Body text, paragraphs
- **500 (Medium)**: Navigation, small headings, emphasis
- **600 (Semi Bold)**: Buttons, labels, strong emphasis

## Responsive Typography

### Fluid Font Scaling
Large headings use `clamp()` for responsive scaling:

```css
/* Scales from 3rem (48px) to 8rem (128px) based on viewport */
font-size: clamp(3rem, 8vw, 8rem);

/* Scales from 3rem (48px) to 6rem (96px) based on viewport */
font-size: clamp(3rem, 6vw, 6rem);
```

### Mobile Adjustments
```css
@media (max-width: 768px) {
    /* Reduce large heading sizes */
    .hero-title {
        font-size: clamp(2rem, 6vw, 4rem);
    }

    /* Adjust body text for mobile readability */
    .body-text {
        font-size: 1rem;
        line-height: 1.5;
    }
}
```

## Letter Spacing

Strategic use of letter spacing enhances readability and creates visual hierarchy:

- **Tight spacing (-0.05em to -0.02em)**: Large headings to prevent excessive width
- **Normal spacing (0)**: Body text for optimal readability
- **Loose spacing (1px to 2px)**: Small UI text, navigation, labels

## Line Height

Optimized for different text purposes:

- **0.9**: Large display headings (tight for visual impact)
- **1.2**: Default for UI elements
- **1.4**: Compact lists, navigation
- **1.6**: Body text (optimal for reading comfort)

## Text Colors

Typography colors adapt to background context:

### On White Backgrounds
- **Primary text**: #1E40AF (blue)
- **Secondary text**: rgba(30, 64, 175, 0.7)
- **Metadata**: rgba(30, 64, 175, 0.6)

### On Dark Backgrounds
- **Primary text**: #FFFFFF (white)
- **Secondary text**: rgba(255, 255, 255, 0.9)
- **Metadata**: rgba(255, 255, 255, 0.7)

## Implementation Guidelines

### CSS Classes
```css
/* Heading styles */
.hero-title { /* H1 styles */ }
.section-title { /* H2 styles */ }
.activity-title { /* H3 styles */ }

/* Body text styles */
.body-large { /* Primary body */ }
.body-regular { /* Secondary body */ }
.body-small { /* Small text */ }

/* UI text styles */
.nav-text { /* Navigation links */ }
.button-text { /* Button labels */ }
.label-text { /* Form labels */ }
```

### Best Practices

#### Do ✅
- Use established font weights and sizes
- Maintain consistent line heights within content sections
- Apply appropriate letter spacing for text size
- Test readability on both light and dark backgrounds
- Use fluid typography for responsive design

#### Don't ❌
- Create custom font sizes outside the scale
- Use more than 3 font weights in a single component
- Apply tight letter spacing to body text
- Use ultra-light weights for small text
- Override the adaptive color system

### Performance Considerations
- **Font loading**: Inter is loaded with `font-display: swap` for immediate text rendering
- **Subset loading**: Only necessary character sets are loaded
- **Variable fonts**: Uses Inter variable font for optimal file size
- **System fallbacks**: Graceful degradation to system fonts during loading