# Change Log

## 2026-04-21 (Gemini)
- **File Reorganization**:
    - Renamed `landing.html` to `index.html` (Main Entry).
    - Renamed the original `index.html` to `globe.html` (Globe Experience).
    - Updated all internal navigation links and the logo to support this new structure.
- **Landing Page (index.html) Visual Overhaul**:
    - **Background Globe**: Repositioned `globe-frame` as a background layer (`z-index: 1`) occupying the right 2/3 of the hero section for a more immersive feel.
    - **Irregular Animation**: Added `irregular-rotate` to the globe core and grid for a dynamic, living world effect.
    - **Advanced Orbitals**: Implemented multi-directional (CW/CCW) and multi-speed rotations for all orbitals to emphasize the "3D" depth.
    - **Scanning GlowDots**: Added complex "Stop-and-Go" irregular movement to GlowDots to mimic AI scanning patterns.
    - **Card Transitions**: Added `ease-in-dissolve` entrance animations for floating cards to create a premium initial landing experience.
- **Typography & UI**:
    - Integrated **Black Han Sans** font for Korean song titles in the player bar and info cards for visual consistency with the landing page.
    - Updated button styles in the landing page's story section to match the secondary neon accent color.
- **Maintenance**:
    - Updated `scripts/create-backup.ps1` to include `globe.html` and `landing.css` in the automated snapshot workflow.

## 2026-04-20 (Gemini)
- Added a local backup workflow for safer edits.
- Added `scripts/create-backup.ps1` to snapshot the main project files into `backups/`.
- Created the `backups/` directory for timestamped edit snapshots.
- Established this log file to track future changes made during assistant-led edits.
- Removed unused API panel styles after confirming the API feature is no longer part of the project.
- Restored active country highlighting in the country list for direct selection, hover, and random picks.
- Improved responsive behavior for touch devices and mobile layouts, including the header, country list, info card, player bar, and video widget.
- Pre-initialized the YouTube player on first load so country clicks can trigger direct playback only after the player is ready.
- Reworked the year selector to jump by decade and added a direct year picker panel for faster browsing.
- Unified globe auto-rotation into an inactivity timer so clicks and drags pause rotation, then resume only after a few idle seconds.
- Added larger invisible hit areas for each country marker so hover and click are much easier without changing the visible globe design.
- Added a separate landing page prototype with a matching neon-globe visual tone in landing.html and landing.css.
- Swapped landing page Korean display headings from Bebas Neue to Black Han Sans for proper Hangul rendering.
