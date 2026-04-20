# Change Log

## 2026-04-21
- Reorganized project entry points: renamed `landing.html` to `index.html` and the original `index.html` to `globe.html`.
- Updated all internal links in the new `index.html` to navigate to `globe.html`.
- Updated `scripts/create-backup.ps1` to support the new file structure.

## 2026-04-20
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
