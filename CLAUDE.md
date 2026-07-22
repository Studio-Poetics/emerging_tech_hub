# Emerging Tech Hub - Project Documentation

## Project Overview
Static HTML educational platform featuring 11 emerging technology topics with standardized learning pathways. Non-technical learner focus.

## Content Architecture

### Standard Content Structure (7-page model)
Each topic typically includes:
1. **Landing** - Overview & navigation hub (topic-landing.html)
2. **Fundamentals** - Core concepts & foundational knowledge
3. **Activities** - Hands-on exercises & projects
4. **Field Kit** - Tools, resources & reference materials
5. **Flashcards** - Spaced repetition learning
6. **Readings** - Curated articles, essays & case studies
7. **TRL** - Technology Readiness Level visualization

### Topics (11 total) — all 11 now at 7/7 standard coverage ✓
1. **AI** (11 files) - 7/7 standard ✓ + 4 supplementary (basics, ethics, trl-radar, trl-visualization) (completed 2026-07-22: fundamentals, flashcards added)
2. **Blockchain** (8 files) - 7/7 standard ✓ + governance
3. **Smart Textiles** (7 files) - 7/7 standard ✓ (completed 2026-07-22: fundamentals added)
4. **Robotics** (9 files) - 7/7 standard ✓ + applications, design-first (completed 2026-07-22: fundamentals added)
5. **Bio-Robotics** (7 files) - 7/7 standard ✓
6. **Quantum** (7 files) - 7/7 standard ✓
7. **Interfaces** (7 files) - 7/7 standard ✓ (completed 2026-07-22: fundamentals, activities, field-kit, flashcards, readings added)
8. **Metaverse** (13 files) - 7/7 standard ✓ + 6 supplementary (completed 2026-07-22: fundamentals added)
9. **Edge** (7 files) - 7/7 standard ✓
10. **IoT** (8 files) - 7/7 standard ✓ + projects (completed 2026-07-22: flashcards added)
11. **Embodied** (11 files) - 7/7 standard ✓ + 4 essays/frameworks (completed 2026-07-22: fundamentals, activities, field-kit, flashcards, trl added; retains essay-based supplementary content alongside standard pages)

## Key Issues
- **All 6 originally-documented broken links fixed** (2026-07-22): edge-flashcards.html→bioedge-landing.html still open (not yet touched, out of scope this cycle), textiles-flashcards.html→biotextiles-landing.html fixed, embodied-games-essay.html→embodied-essays.html fixed. Remaining known issues: flashcards-experimental.html and flashcards-experimental-old.html still reference non-existent files (low priority, experimental/orphaned pages).
- **4 orphan pages** (unreferenced but existing) — unchanged, low priority cleanup
- **Embodied** now has full 7/7 standard coverage alongside its original essay-based supplementary content (deleuze-essay, frameworks, games-essay, manifesto) — the standard pages complement rather than replace the alternative pedagogy.
- **main-menu-overlay bug pattern**: many landing pages had an incomplete 11-topic menu overlay (missing some topics vs. index.html's canonical list). Fixed across ai-landing, iot-landing, textiles-landing, robotics-landing, metaverse-landing, embodied-landing, interfaces-landing this cycle. Worth spot-checking remaining pages (blockchain, biorobotics, quantum, edge landing pages) if touched in future work.
- **TRL pages** (2026-07-22/23): all 10 radar-based *-trl.html pages (ai, biorobotics, blockchain, edge, interfaces, iot, metaverse, quantum, robotics, textiles) now share ai-trl.html's CSS/interactivity template, have hover tooltips on both the cross-topic dropdown (`title` attrs) and radar tech nodes (`.tech-tooltip` floating div), and include embodied as an 11th dropdown option. embodied-trl.html stays an essay page (by design) but got a reciprocal "Explore Other TRL Radars" dropdown. All 11 topic `-landing.html` hero-actions rows now have a TRL CTA button (embodied's is labeled "Maturity Spectrum" to match its own terminology).

## Content Style Guide (Future Interfaces, and template for future topics)
- Audience: students, designers, artists, journalists — NOT hardcore engineers. Jargon-light, conceptual, concrete examples over technical depth.
- Grounded in 2026 facts: Meta Quest 3 ($499, ~50% XR market share), Apple Vision Pro 2 (Jan 2026, $2,499), Meta Neural Band (EMG wristband), Neuralink (scaling implants, Blindsight trial 2026), Neuracle NEO (first commercial BCI implant, Shanghai, July 2026), mid-air ultrasound haptics (~24% CAGR).
- Page template source: edge-* pages (fundamentals/activities/field-kit/flashcards/readings) — reuse CSS classes and structure exactly, but verify against known bugs before copying (see below).
- **Known bug to avoid replicating**: edge-flashcards.html has an invalid JS function name with an embedded space (`loadSmart TextilesData`), references an undefined variable (`metaverseFlashcardsData`), and has a broken/duplicate main-menu-overlay with a dead link to `bioedge-landing.html`. Not yet fixed upstream — flag if touching that file.

## File Organization
- HTML files in root directory (111 total)
- CSS: experimental-design.css, design-system.css, flashcards.css, etc.
- JSON data: blockchain.json, edge.json
- Design system: design-system/ folder with documentation

## Navigation Pattern
- Index.html = main hub with all topic cards
- Each topic-landing.html = section navigation hub
- Sidebar navigation in experimental-design.css template
- Sticky section navigation on content pages

## Git Info
- Repository: https://github.com/Studio-Poetics/emerging_tech_hub
- Branch: main
- Recent work: Content audit, link validation, supplementary content mapping
