import { MUSIC_DATABASE } from './data.js';

// ─── YouTube Player ───────────────────────────────────────────────────────
let ytPlayer = null;
let ytReady = false;
let isPlaying = false;
let progressTimer = null;
let isMuted = false;
let currentVolume = 70;
let currentVideoId = null; // 현재 로드된 영상 ID

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-iframe', {
    height: '144',
    width: '256',
    playerVars: { autoplay: 0, controls: 1, rel: 0, modestbranding: 1 },
    events: {
      onReady: (e) => {
        ytReady = true;
        e.target.setVolume(currentVolume);
        document.getElementById('yt-wrap').classList.add('visible');
        if (currentVideoId) {
          document.getElementById('btn-play-pause').disabled = false;
        }
      },
      onStateChange: onYTStateChange,
    }
  });
};

function onYTStateChange(e) {
  if (e.data === YT.PlayerState.PLAYING) {
    setPlayingState(true);
  } else if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
    setPlayingState(false);
  }
}

function setPlayingState(playing) {
  isPlaying = playing;
  const bar = document.getElementById('player-bar');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  if (playing) {
    bar.classList.add('playing');
    iconPlay.style.display = 'none';
    iconPause.style.display = '';
    startProgressTimer();
  } else {
    bar.classList.remove('playing');
    iconPlay.style.display = '';
    iconPause.style.display = 'none';
    stopProgressTimer();
  }
}

function startProgressTimer() {
  stopProgressTimer();
  progressTimer = setInterval(updateProgress, 500);
}
function stopProgressTimer() {
  if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
}

function formatTime(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateProgress() {
  if (!ytPlayer || !ytReady) return;
  const cur = ytPlayer.getCurrentTime() || 0;
  const dur = ytPlayer.getDuration() || 0;
  const pct = dur > 0 ? (cur / dur) * 100 : 0;
  document.getElementById('seekbar-fill').style.width = pct + '%';
  document.getElementById('seekbar-thumb').style.left = pct + '%';
  document.getElementById('time-current').textContent = formatTime(cur);
  document.getElementById('time-total').textContent = formatTime(dur);
}

function loadTrack(info, countryName, year) {
  const btn = document.getElementById('btn-play-pause');
  const noAudio = document.getElementById('player-no-audio');

  document.getElementById('player-country-tag').textContent = countryName;
  document.getElementById('player-year-tag').textContent = year;
  document.getElementById('player-song-name').textContent = info ? (info.song || '—') : '—';
  document.getElementById('player-artist-name').textContent = info ? (info.artist || '—') : '—';

  if (info && info.youtubeId) {
    currentVideoId = info.youtubeId;
    noAudio.style.display = 'none';
    btn.disabled = !ytReady;

    if (ytReady) {
      ytPlayer.loadVideoById(currentVideoId);
      document.getElementById('yt-wrap').classList.add('visible');
    }
    // ytReady가 false면 플레이어 준비 후 사용자가 재생 버튼을 누름
  } else {
    currentVideoId = null;
    btn.disabled = true;
    noAudio.style.display = 'block';
    document.getElementById('yt-wrap').classList.remove('visible');
    setPlayingState(false);
    document.getElementById('seekbar-fill').style.width = '0%';
    document.getElementById('seekbar-thumb').style.left = '0%';
    document.getElementById('time-current').textContent = '0:00';
    document.getElementById('time-total').textContent = '0:00';
  }
}

// Play/pause button
document.getElementById('btn-play-pause').addEventListener('click', () => {
  if (!currentVideoId || !ytPlayer || !ytReady) return;
  if (isPlaying) {
    ytPlayer.pauseVideo();
  } else {
    // 사용자 클릭(제스처) 내에서 loadVideoById 호출 → Autoplay Policy 통과
    ytPlayer.loadVideoById(currentVideoId);
    document.getElementById('yt-wrap').classList.add('visible');
  }
});

// 미니플레이어 닫기
document.getElementById('yt-close').addEventListener('click', () => {
  document.getElementById('yt-wrap').classList.remove('visible');
  if (ytPlayer && ytReady) ytPlayer.pauseVideo();
});

// Seekbar click
document.getElementById('seekbar').addEventListener('click', e => {
  if (!ytPlayer || !ytReady) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const pct = (e.clientX - rect.left) / rect.width;
  const dur = ytPlayer.getDuration() || 0;
  ytPlayer.seekTo(pct * dur, true);
});

// Mute button
document.getElementById('btn-mute').addEventListener('click', () => {
  if (!ytPlayer || !ytReady) return;
  isMuted = !isMuted;
  if (isMuted) ytPlayer.mute();
  else ytPlayer.unMute();
  document.getElementById('icon-vol-on').style.display = isMuted ? 'none' : '';
  document.getElementById('icon-vol-off').style.display = isMuted ? '' : 'none';
});

// Volume slider
document.getElementById('volume-slider').addEventListener('input', e => {
  currentVolume = Number(e.target.value);
  if (ytPlayer && ytReady) {
    ytPlayer.setVolume(currentVolume);
    if (currentVolume > 0 && isMuted) {
      isMuted = false;
      ytPlayer.unMute();
      document.getElementById('icon-vol-on').style.display = '';
      document.getElementById('icon-vol-off').style.display = 'none';
    }
  }
});

// ─── State ────────────────────────────────────────────────────────────────
let currentYear = 1990;
let isDragging = false;
let dragMoved = false;
let prevMouse = { x: 0, y: 0 };
let rotY = 0, rotX = 0;
let autoRotate = true;
let hoveredCountry = null;
let selectedCountryCode = null;
let frame = 0;
let globe; // 이 줄을 반드시 추가하세요!
const AUTO_ROTATE_IDLE_MS = 4000;
let autoRotateResumeTimer = null;

function clearAutoRotateResumeTimer() {
  if (autoRotateResumeTimer) {
    clearTimeout(autoRotateResumeTimer);
    autoRotateResumeTimer = null;
  }
}

function pauseAutoRotate() {
  autoRotate = false;
  clearAutoRotateResumeTimer();
}

function scheduleAutoRotateResume(delay = AUTO_ROTATE_IDLE_MS) {
  clearAutoRotateResumeTimer();
  autoRotateResumeTimer = setTimeout(() => {
    if (!isDragging) {
      autoRotate = true;
    }
  }, delay);
}

function registerInteraction(resumeDelay = AUTO_ROTATE_IDLE_MS) {
  pauseAutoRotate();
  scheduleAutoRotateResume(resumeDelay);
}


// ─── Custom Cursor ────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let cx = 0, cy = 0;
document.addEventListener('mousemove', e => {
  cx = e.clientX; cy = e.clientY;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  cursorRing.style.left = cx + 'px';
  cursorRing.style.top = cy + 'px';
});

// ─── Year Controls ────────────────────────────────────────────────────────
const yearEl = document.getElementById('current-year');
const yearPicker = document.getElementById('year-picker');
const yearGrid = document.getElementById('year-grid');
const yearPickerClose = document.getElementById('year-picker-close');
const MIN_YEAR = 1950;
const MAX_YEAR = 2024;
const YEAR_STEP = 10;

function clampYear(year) {
  return Math.max(MIN_YEAR, Math.min(MAX_YEAR, year));
}

function updateYearDisplay() {
  yearEl.textContent = currentYear;
  document.querySelectorAll('.year-option').forEach(option => {
    option.classList.toggle('active', Number(option.dataset.year) === currentYear);
  });
}

function setYear(nextYear) {
  currentYear = clampYear(nextYear);
  updateYearDisplay();
}

function toggleYearPicker(forceOpen) {
  const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !yearPicker.classList.contains('open');
  yearPicker.classList.toggle('open', shouldOpen);
  yearPicker.setAttribute('aria-hidden', String(!shouldOpen));
  yearEl.setAttribute('aria-expanded', String(shouldOpen));
}

for (let year = MIN_YEAR; year <= MAX_YEAR; year += 1) {
  const option = document.createElement('button');
  option.type = 'button';
  option.className = 'year-option';
  option.dataset.year = String(year);
  option.textContent = String(year);
  option.addEventListener('click', () => {
    setYear(year);
    toggleYearPicker(false);
  });
  yearGrid.appendChild(option);
}

updateYearDisplay();

document.getElementById('prev-year').addEventListener('click', () => {
  setYear(currentYear - YEAR_STEP);
});
document.getElementById('next-year').addEventListener('click', () => {
  setYear(currentYear + YEAR_STEP);
});
yearEl.addEventListener('click', () => {
  toggleYearPicker();
});
yearPickerClose.addEventListener('click', () => {
  toggleYearPicker(false);
});
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    setYear(currentYear - YEAR_STEP);
    registerInteraction();
  }
  if (e.key === 'ArrowRight') {
    setYear(currentYear + YEAR_STEP);
    registerInteraction();
  }
  if (e.key === 'Escape') toggleYearPicker(false);
});
document.addEventListener('click', e => {
  if (!e.target.closest('#year-panel')) {
    toggleYearPicker(false);
  }
});

// ─── Three.js Setup ───────────────────────────────────────────────────────
const canvas = document.getElementById('globe-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2.8;

// 1. 텍스처 로더 생성
const loader = new THREE.TextureLoader();

// 2. 지구 텍스처 이미지 (NASA Blue Marble 소스)
const earthTexture = loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');

// 3. 재질 수정 (빛에 반응하는 MeshPhongMaterial 사용)
const globeMaterial = new THREE.MeshPhongMaterial({
  map: earthTexture,
  specular: new THREE.Color(0x333333),
  shininess: 5
});

// 4. 구체 생성 및 적용
globe = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), globeMaterial);
scene.add(globe);

// Ocean layer
scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(1.01, 64, 64),
  new THREE.MeshPhongMaterial({ color: 0x001d33, transparent: true, opacity: 0.2 })
));

// Atmosphere
scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(1.05, 64, 64),
  new THREE.MeshPhongMaterial({ color: 0x0088cc, transparent: true, opacity: 0.1, side: THREE.BackSide })
));

// Outer haze
scene.add(new THREE.Mesh(
  new THREE.SphereGeometry(1.14, 64, 64),
  new THREE.MeshPhongMaterial({ color: 0x004466, transparent: true, opacity: 0.035, side: THREE.FrontSide })
));

// Lights
scene.add(new THREE.AmbientLight(0x112233, 0.85));
const sun = new THREE.DirectionalLight(0x4499cc, 1.3);
sun.position.set(3, 2, 3);
scene.add(sun);
const dirLight2 = new THREE.DirectionalLight(0xff3c6e, 0.4);
dirLight2.position.set(-3, -1, -2);
scene.add(dirLight2);
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
// Grid lines
const lineMat = new THREE.LineBasicMaterial({ color: 0x003355, transparent: true, opacity: 0.28 });
function addGridLines() {
  const radius = 1.003;
  for (let lat = -80; lat <= 80; lat += 20) {
    const pts = [];
    for (let lon = 0; lon <= 360; lon += 3) {
      const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
      pts.push(new THREE.Vector3(-radius * Math.sin(phi)*Math.cos(th), radius * Math.cos(phi), radius * Math.sin(phi)*Math.sin(th)));
    }
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
  }
  for (let lon = 0; lon < 360; lon += 20) {
    const pts = [];
    for (let lat = -90; lat <= 90; lat += 3) {
      const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
      pts.push(new THREE.Vector3(-radius * Math.sin(phi)*Math.cos(th), radius * Math.cos(phi), radius * Math.sin(phi)*Math.sin(th)));
    }
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
  }
}
addGridLines();

// Stars
const starPos = [];
for (let i = 0; i < 3500; i++) {
  const r = 55 + Math.random() * 120;
  const th = Math.random() * Math.PI * 2;
  const ph = Math.acos(2 * Math.random() - 1);
  starPos.push(r*Math.sin(ph)*Math.cos(th), r*Math.cos(ph), r*Math.sin(ph)*Math.sin(th));
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.55 })));

// ─── Countries ────────────────────────────────────────────────────────────
const countries = [
  { name:"United States",   code:"US", lat:37.09,  lon:-95.71 },
  { name:"United Kingdom",  code:"GB", lat:55.37,  lon:-3.43  },
  { name:"Japan",           code:"JP", lat:36.20,  lon:138.25 },
  { name:"South Korea",     code:"KR", lat:35.90,  lon:127.76 },
  { name:"Brazil",          code:"BR", lat:-14.23, lon:-51.92 },
  { name:"Germany",         code:"DE", lat:51.16,  lon:10.45  },
  { name:"France",          code:"FR", lat:46.22,  lon:2.21   },
  { name:"Sweden",          code:"SE", lat:60.12,  lon:18.64  },
  { name:"Nigeria",         code:"NG", lat:9.08,   lon:8.67   },
  { name:"Jamaica",         code:"JM", lat:18.10,  lon:-77.29 },
  { name:"Argentina",       code:"AR", lat:-38.41, lon:-63.61 },
  { name:"India",           code:"IN", lat:20.59,  lon:78.96  },
  { name:"Cuba",            code:"CU", lat:21.52,  lon:-77.78 },
  { name:"South Africa",    code:"ZA", lat:-30.55, lon:22.93  },
  { name:"Australia",       code:"AU", lat:-25.27, lon:133.77 },
  { name:"Mexico",          code:"MX", lat:23.63,  lon:-102.55},
  { name:"Canada",          code:"CA", lat:56.13,  lon:-106.34},
  { name:"Italy",           code:"IT", lat:41.87,  lon:12.56  },
  { name:"Spain",           code:"ES", lat:40.46,  lon:-3.74  },
  { name:"Russia",          code:"RU", lat:61.52,  lon:105.31 },
  { name:"China",           code:"CN", lat:35.86,  lon:104.19 },
  { name:"Colombia",        code:"CO", lat:4.57,   lon:-74.29 },
  { name:"Iceland",         code:"IS", lat:64.96,  lon:-19.02 },
  { name:"Ethiopia",        code:"ET", lat:9.14,   lon:40.48  },
  { name:"Portugal",        code:"PT", lat:39.39,  lon:-8.22  },
  { name:"Ghana",           code:"GH", lat:7.95,   lon:-1.02  },
  { name:"Norway",          code:"NO", lat:60.47,  lon:8.46   },
  { name:"Ireland",         code:"IE", lat:53.41,  lon:-8.24  },
  { name:"New Zealand",     code:"NZ", lat:-40.90, lon:174.88 },
  { name:"Chile",           code:"CL", lat:-35.67, lon:-71.54 },
];

const navItems = new Map();

function setActiveCountry(code = null) {
  navItems.forEach((item, itemCode) => {
    item.classList.toggle('active', itemCode === code);
  });
}

function focusCountry(country, holdRotationMs = AUTO_ROTATE_IDLE_MS) {
  const phi = (90 - country.lat) * (Math.PI / 180);
  const theta = (country.lon + 180) * (Math.PI / 180);
  pauseAutoRotate();
  rotY = -theta + Math.PI;
  rotX = phi - Math.PI / 2;
  scheduleAutoRotateResume(holdRotationMs);
}


// 국가 리스트 생성
const listEl = document.getElementById('country-list');
countries.sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
  const item = document.createElement('div');
  item.className = 'nav-item';
  item.textContent = c.name;
  item.dataset.code = c.code;
  item.onclick = () => {
    selectedCountryCode = c.code;
    setActiveCountry(c.code);
    focusCountry(c);
    const rect = item.getBoundingClientRect();
    showCard(c, rect.right + 12, rect.top + rect.height / 2);
  };
  navItems.set(c.code, item);
  listEl.appendChild(item);
});

const dotGeo = new THREE.SphereGeometry(0.012, 12, 12);
const hitRadius = window.matchMedia('(pointer: coarse)').matches ? 0.06 : 0.04;
const hitGeo = new THREE.SphereGeometry(hitRadius, 16, 16);
const countryMeshes = [];
const countryHitMeshes = [];
const countryLabels = [];
const labelContainer = document.getElementById('country-labels');

countries.forEach(c => {
  const mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0x00c8ff,
    transparent: true,
    opacity: 0.9,
    shininess: 100
  });
  const dot = new THREE.Mesh(dotGeo, mat);
  const hitMesh = new THREE.Mesh(
    hitGeo,
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
  );

  // 위도/경도를 3D 좌표로 변환 (반지름 1.02)
  const radius = 1.02;
  const phi = (90 - c.lat) * (Math.PI / 180);
  const theta = (c.lon + 180) * (Math.PI / 180);

  dot.position.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
  dot.userData = { country: c };
  hitMesh.position.copy(dot.position);
  hitMesh.userData = { country: c, dot };
  globe.add(dot);
  globe.add(hitMesh);
  countryMeshes.push(dot);
  countryHitMeshes.push(hitMesh);

  // 나라명 레이블 생성
  const label = document.createElement('div');
  label.className = 'country-label';
  label.textContent = c.name;
  labelContainer.appendChild(label);
  countryLabels.push({ el: label, mesh: dot });
});

// ─── Raycasting & Hover ───────────────────────────────────────────────────
const raycaster = new THREE.Raycaster();
const mouse2d = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');

canvas.addEventListener('mousemove', e => {
  if (isDragging) return;
  mouse2d.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse2d.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse2d, camera);
  const hits = raycaster.intersectObjects(countryHitMeshes);

  if (hits.length > 0) {
    const hit = hits[0].object;
    hoveredCountry = hit.userData.country;
    setActiveCountry(hoveredCountry.code);
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX + 18) + 'px';
    tooltip.style.top = (e.clientY - 12) + 'px';
    tooltip.textContent = hoveredCountry.name;
    countryMeshes.forEach(m => {
      const isHit = m === hit.userData.dot;
      m.material.color.setHex(isHit ? 0xff3c6e : 0x00c8ff);
      m.material.emissive.setHex(isHit ? 0x660020 : 0x004466);
    });
    cursorRing.style.width = '40px';
    cursorRing.style.height = '40px';
    cursorRing.style.borderColor = 'rgba(255,60,110,0.65)';
  } else {
    hoveredCountry = null;
    tooltip.style.display = 'none';
    setActiveCountry(selectedCountryCode);

    countryMeshes.forEach(m => {
      m.material.color.setHex(0xffffff);
      m.material.emissive.setHex(0x00c8ff);
    });
    cursorRing.style.width = '28px';
    cursorRing.style.height = '28px';
    cursorRing.style.borderColor = 'rgba(0,200,255,0.5)';
  }
});

canvas.addEventListener('click', e => {
  if (dragMoved) return;
  registerInteraction();
  if (hoveredCountry) showCard(hoveredCountry, e.clientX, e.clientY);
});

// ─── Drag Rotation ────────────────────────────────────────────────────────
canvas.addEventListener('mousedown', e => {
  isDragging = true; dragMoved = false;
  pauseAutoRotate();
  prevMouse = { x: e.clientX, y: e.clientY };
});
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragMoved = true;
  rotY += dx * 0.005;
  rotX = Math.max(-Math.PI/2.4, Math.min(Math.PI/2.4, rotX + dy * 0.005));
  prevMouse = { x: e.clientX, y: e.clientY };
});
window.addEventListener('mouseup', () => {
  isDragging = false;
  scheduleAutoRotateResume();
});

// Touch support
canvas.addEventListener('touchstart', e => {
  isDragging = true; dragMoved = false; pauseAutoRotate();
  prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});
canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  const dx = e.touches[0].clientX - prevMouse.x;
  const dy = e.touches[0].clientY - prevMouse.y;
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragMoved = true;
  rotY += dx * 0.005;
  rotX = Math.max(-Math.PI/2.4, Math.min(Math.PI/2.4, rotX + dy * 0.005));
  prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
}, { passive: false });
canvas.addEventListener('touchend', () => {
  isDragging = false;
  scheduleAutoRotateResume();
});

// 마우스 휠 이벤트 추가
window.addEventListener('wheel', (e) => {
  registerInteraction();
  // 카메라의 z축 값(거리)을 변경하여 확대/축소 구현
  camera.position.z += e.deltaY * 0.005;
  
  // 너무 가깝거나 너무 멀어지지 않게 제한 (최소 3, 최대 10)
  camera.position.z = Math.max(3, Math.min(camera.position.z, 10));
}, { passive: true });

document.addEventListener('click', e => {
  if (!e.target.closest('#globe-canvas') || hoveredCountry === null) {
    registerInteraction();
  }
}, true);


function showCard(country, clickX, clickY) {
  const card = document.getElementById('info-card');
  selectedCountryCode = country.code;
  setActiveCountry(country.code);

  const countryData = MUSIC_DATABASE[country.name];
  const yearData = countryData ? countryData[currentYear] : null;
  const info = Array.isArray(yearData)
    ? yearData[Math.floor(Math.random() * yearData.length)]
    : yearData;

  // 플레이어 즉시 로드 (사용자 제스처 컨텍스트 → Autoplay 허용)
  loadTrack(info, country.name, currentYear);

  // 카드 위치 계산 (화면 밖으로 나가지 않도록 클램프)
  const W = 300, H = 280;
  let x = clickX + 20;
  let y = clickY - H / 2;
  if (x + W > window.innerWidth - 16)  x = clickX - W - 20;
  if (x < 16)                           x = 16;
  if (y < 16)                           y = 16;
  if (y + H > window.innerHeight - 90) y = window.innerHeight - 90 - H;
  card.style.left = x + 'px';
  card.style.top  = y + 'px';

  // 로딩 상태로 카드 표시
  card.classList.add('active');
  document.getElementById('card-body').style.display = 'none';
  document.getElementById('card-loading').style.display = 'flex';
  document.getElementById('loading-text').textContent = `Digging ${country.name}...`;

  setTimeout(() => {
    if (!card.classList.contains('active')) return; // 로딩 중 닫혔을 때
    if (info) {
      document.getElementById('card-country').textContent = country.name;
      document.getElementById('card-year').textContent = currentYear;
      document.getElementById('card-song').textContent = info.song || '—';
      document.getElementById('card-artist').textContent = info.artist || '—';
      document.getElementById('card-album').textContent = info.album || '—';
      document.getElementById('card-release').textContent = info.releaseDate || '—';
      document.getElementById('card-desc').textContent = info.description || '';

      const tagsEl = document.getElementById('card-genres');
      tagsEl.innerHTML = '';
      (info.genres || []).forEach(g => {
        const t = document.createElement('div');
        t.className = 'genre-tag';
        t.textContent = g;
        tagsEl.appendChild(t);
      });
    } else {
      document.getElementById('card-country').textContent = country.name;
      document.getElementById('card-year').textContent = currentYear;
      document.getElementById('card-song').textContent = '데이터 없음';
      document.getElementById('card-artist').textContent = '';
      document.getElementById('card-album').textContent = '—';
      document.getElementById('card-release').textContent = '—';
      document.getElementById('card-genres').innerHTML = '';
      document.getElementById('card-desc').textContent = '이 나라/연도의 음악 정보가 아직 준비되지 않았습니다.';
    }
    document.getElementById('card-loading').style.display = 'none';
    document.getElementById('card-body').style.display = 'block';
  }, 400);
}

function closeCard() {
  document.getElementById('info-card').classList.remove('active');
}

// ─── Random Country ───────────────────────────────────────────────────────
const randomBtn = document.getElementById('random-btn');
randomBtn.addEventListener('click', () => {
  // 현재 연도에 데이터가 있는 나라 우선 선택, 없으면 전체에서 선택
  const withData = countries.filter(c => {
    const d = MUSIC_DATABASE[c.name];
    return d && d[currentYear];
  });
  const pool = withData.length > 0 ? withData : countries;
  const randomCountry = pool[Math.floor(Math.random() * pool.length)];

  // 주사위 애니메이션
  randomBtn.classList.add('spinning');
  setTimeout(() => randomBtn.classList.remove('spinning'), 500);

  // 해당 국가로 지구본 회전
  selectedCountryCode = randomCountry.code;
  setActiveCountry(randomCountry.code);
  focusCountry(randomCountry);

  // 카드: 화면 중앙에 표시 (random은 마우스 위치 없음)
  showCard(randomCountry, window.innerWidth / 2, window.innerHeight / 2);
});

// ─── Card Close ───────────────────────────────────────────────────────────
document.getElementById('card-close').addEventListener('click', closeCard);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCard();
});
document.addEventListener('click', e => {
  const card = document.getElementById('info-card');
  if (card.classList.contains('active') && !card.contains(e.target) && !e.target.closest('#globe-canvas'))
    closeCard();
});

// ─── Animation Loop ───────────────────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  frame++;

  if (autoRotate && !isDragging) rotY += 0.0018;
  globe.rotation.y = rotY;
  globe.rotation.x = rotX;

  // Dot pulsing
  countryMeshes.forEach((m, i) => {
    const s = 1 + 0.18 * Math.sin(frame * 0.045 + i * 0.55);
    m.scale.setScalar(s);
  });

  // 나라명 레이블 위치 업데이트
  const _tmpVec = new THREE.Vector3();
  countryLabels.forEach(({ el, mesh }) => {
    mesh.getWorldPosition(_tmpVec);
    // 카메라 쪽을 향한 면인지 확인 (뒷면은 숨김)
    if (_tmpVec.dot(camera.position) <= 0) {
      el.style.display = 'none';
      return;
    }
    const projected = _tmpVec.clone().project(camera);
    const x = (projected.x + 1) / 2 * window.innerWidth;
    const y = (-projected.y + 1) / 2 * window.innerHeight;
    el.style.display = 'block';
    el.style.left = (x + 9) + 'px';
    el.style.top = (y - 7) + 'px';
  });

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

