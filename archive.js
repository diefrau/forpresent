import { MUSIC_DATABASE } from './data.js';

// ─── State ────────────────────────────────────────────────────────────────
let allTracks = [];
let filteredTracks = [];
let genreRelationMap = {}; // { "GenreA": { "GenreB": count, "GenreC": count } }
const RENDER_BATCH_SIZE = 50;
let currentRenderIndex = 0;

// ─── Initialization ───────────────────────────────────────────────────────
function init() {
  flattenDatabase();
  setupEventListeners();
  renderInitialTracks();
  
  // Custom Cursor Setup (Reusing logic from script.js)
  setupCursor();
}

function flattenDatabase() {
  allTracks = [];
  genreRelationMap = {};
  const countries = new Set();
  const genres = new Set();

  for (const [country, years] of Object.entries(MUSIC_DATABASE)) {
    countries.add(country);
    for (const [year, songs] of Object.entries(years)) {
      const songArray = Array.isArray(songs) ? songs : [songs];
      songArray.forEach(song => {
        const track = { ...song, country, year: Number(year) };
        allTracks.push(track);
        
        const trackGenres = song.genres || [];
        trackGenres.forEach(g => {
          genres.add(g);
          // Build relation map
          if (!genreRelationMap[g]) genreRelationMap[g] = {};
          trackGenres.forEach(otherG => {
            if (g !== otherG) {
              genreRelationMap[g][otherG] = (genreRelationMap[g][otherG] || 0) + 1;
            }
          });
        });
      });
    }
  }

  // Initial sort: Newest first
  allTracks.sort((a, b) => b.year - a.year);
  filteredTracks = [...allTracks];
  
  document.getElementById('total-count').textContent = allTracks.length;

  // Populate filter dropdowns
  populateDropdown('country-filter', Array.from(countries).sort());
  populateDropdown('genre-filter', Array.from(genres).sort());
}

function populateDropdown(id, items) {
  const select = document.getElementById(id);
  items.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item;
    opt.textContent = item;
    select.appendChild(opt);
  });
}

// ─── Rendering ────────────────────────────────────────────────────────────
function renderInitialTracks() {
  const grid = document.getElementById('song-grid');
  grid.innerHTML = '';
  currentRenderIndex = 0;
  renderMoreTracks();
}

function renderMoreTracks() {
  const grid = document.getElementById('song-grid');
  const loading = document.getElementById('archive-loading');
  if (loading) loading.style.display = 'none';

  const end = Math.min(currentRenderIndex + RENDER_BATCH_SIZE, filteredTracks.length);
  const fragment = document.createDocumentFragment();

  for (let i = currentRenderIndex; i < end; i++) {
    fragment.appendChild(createSongCard(filteredTracks[i]));
  }

  grid.appendChild(fragment);
  currentRenderIndex = end;
}

function createSongCard(track) {
  const card = document.createElement('article');
  card.className = 'song-card';
  
  const genresHtml = (track.genres || [])
    .map(g => `<span class="genre-tag">${g}</span>`)
    .join('');

  card.innerHTML = `
    <div class="card-header">
      <span class="card-country">${track.country}</span>
      <span class="card-year">${track.year}</span>
    </div>
    <h2 class="card-title">${track.song || 'Untitled'}</h2>
    <div class="card-artist">${track.artist || 'Unknown Artist'}</div>
    <div class="card-genres">${genresHtml}</div>
    <p class="card-desc">${track.description || 'No description available for this track.'}</p>
  `;

  // Optional: Click to focus on globe (could use localStorage to pass intent)
  card.addEventListener('click', () => {
    // Save selection to localStorage so globe.html can pick it up
    localStorage.setItem('selected_country', track.country);
    localStorage.setItem('selected_year', track.year);
    localStorage.setItem('selected_song', track.song);
    window.location.href = 'globe.html';
  });

  return card;
}

// ─── Filters & Search ─────────────────────────────────────────────────────
function applyFilters() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const countryFilter = document.getElementById('country-filter').value;
  const genreFilter = document.getElementById('genre-filter').value;
  const sortOrder = document.getElementById('sort-order').value;

  filteredTracks = allTracks.filter(t => {
    const matchesSearch = !searchTerm || 
      (t.song && t.song.toLowerCase().includes(searchTerm)) ||
      (t.artist && t.artist.toLowerCase().includes(searchTerm)) ||
      (t.genres && t.genres.some(g => g.toLowerCase().includes(searchTerm)));
    
    const matchesCountry = !countryFilter || t.country === countryFilter;
    const matchesGenre = !genreFilter || (t.genres && t.genres.includes(genreFilter));

    return matchesSearch && matchesCountry && matchesGenre;
  });

  // Apply Sorting
  if (sortOrder === 'year-desc') filteredTracks.sort((a, b) => b.year - a.year);
  else if (sortOrder === 'year-asc') filteredTracks.sort((a, b) => a.year - b.year);
  else if (sortOrder === 'name-asc') filteredTracks.sort((a, b) => (a.song || '').localeCompare(b.song || ''));

  document.getElementById('total-count').textContent = filteredTracks.length;
  
  // Update Related Genres UI
  updateRelatedGenres(genreFilter || searchTerm);
  
  renderInitialTracks();
}

function updateRelatedGenres(keyword) {
  const box = document.getElementById('related-genres-box');
  const tagsContainer = document.getElementById('related-tags');
  
  if (!keyword) {
    box.style.display = 'none';
    return;
  }

  // Find the closest genre match in our map
  const genreKeys = Object.keys(genreRelationMap);
  const matchedGenre = genreKeys.find(g => g.toLowerCase() === keyword.toLowerCase());

  if (matchedGenre && genreRelationMap[matchedGenre]) {
    const relations = genreRelationMap[matchedGenre];
    const sortedRelated = Object.entries(relations)
      .sort((a, b) => b[1] - a[1]) // Sort by frequency
      .slice(0, 5) // Top 5
      .map(entry => entry[0]);

    if (sortedRelated.length > 0) {
      box.style.display = 'flex';
      tagsContainer.innerHTML = '';
      sortedRelated.forEach(g => {
        const tag = document.createElement('div');
        tag.className = 'related-tag';
        tag.textContent = g;
        tag.onclick = () => {
          document.getElementById('genre-filter').value = g;
          document.getElementById('search-input').value = '';
          applyFilters();
        };
        tagsContainer.appendChild(tag);
      });
      return;
    }
  }

  box.style.display = 'none';
}

// ─── Events ───────────────────────────────────────────────────────────────
function setupEventListeners() {
  document.getElementById('search-input').addEventListener('input', debounce(applyFilters, 300));
  document.getElementById('country-filter').addEventListener('change', applyFilters);
  document.getElementById('genre-filter').addEventListener('change', applyFilters);
  document.getElementById('sort-order').addEventListener('change', applyFilters);

  // Infinite Scroll
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      if (currentRenderIndex < filteredTracks.length) {
        renderMoreTracks();
      }
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// ─── Custom Cursor ────────────────────────────────────────────────────────
function setupCursor() {
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });

  // Hover effects for interactive elements
  const interactives = 'a, button, select, input, .song-card';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(interactives)) {
      cursorRing.style.width = '40px';
      cursorRing.style.height = '40px';
      cursorRing.style.borderColor = 'rgba(255, 60, 110, 0.6)';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(interactives)) {
      cursorRing.style.width = '28px';
      cursorRing.style.height = '28px';
      cursorRing.style.borderColor = 'rgba(0, 200, 255, 0.5)';
    }
  });
}

// Start
init();
