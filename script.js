import { MUSIC_DATABASE } from './data.js';
// ─── State ────────────────────────────────────────────────────────────────
let currentYear = 1990;
let isDragging = false;
let dragMoved = false;
let prevMouse = { x: 0, y: 0 };
let rotY = 0, rotX = 0;
let autoRotate = true;
let hoveredCountry = null;
let frame = 0;
let globe; // 이 줄을 반드시 추가하세요!


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
document.getElementById('prev-year').addEventListener('click', () => {
  if (currentYear > 1950) yearEl.textContent = --currentYear;
});
document.getElementById('next-year').addEventListener('click', () => {
  if (currentYear < 2024) yearEl.textContent = ++currentYear;
});
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' && currentYear > 1950) yearEl.textContent = --currentYear;
  if (e.key === 'ArrowRight' && currentYear < 2024) yearEl.textContent = ++currentYear;
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


// 국가 리스트 생성
const listEl = document.getElementById('country-list');
countries.sort((a, b) => a.name.localeCompare(b.name)).forEach(c => {
  const item = document.createElement('div');
  item.className = 'nav-item';
  item.textContent = c.name;
  item.dataset.code = c.code;
  item.onclick = () => {
    // 해당 국가로 회전
    const phi = (90 - c.lat) * (Math.PI / 180);
    const theta = (c.lon + 180) * (Math.PI / 180);
    autoRotate = false;
    // 부드러운 회전을 위해 목표값 설정 (간단히 구현)
    rotY = -theta + Math.PI;
    rotX = phi - Math.PI / 2;
    setTimeout(() => autoRotate = true, 5000);
    openModal(c);
  };
  listEl.appendChild(item);
});

const dotGeo = new THREE.SphereGeometry(0.012, 12, 12);
const countryMeshes = [];
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
  globe.add(dot);
  countryMeshes.push(dot);

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
  const hits = raycaster.intersectObjects(countryMeshes);

  if (hits.length > 0) {
    const hit = hits[0].object;
    hoveredCountry = hit.userData.country;
    tooltip.style.display = 'block';
    tooltip.style.left = (e.clientX + 18) + 'px';
    tooltip.style.top = (e.clientY - 12) + 'px';
    tooltip.textContent = hoveredCountry.name;
    countryMeshes.forEach(m => {
      const isHit = m === hit;
      m.material.color.setHex(isHit ? 0xff3c6e : 0x00c8ff);
      m.material.emissive.setHex(isHit ? 0x660020 : 0x004466);
    });
    cursorRing.style.width = '40px';
    cursorRing.style.height = '40px';
    cursorRing.style.borderColor = 'rgba(255,60,110,0.65)';
  } else {
    hoveredCountry = null;
    tooltip.style.display = 'none';
    
    // 리스트 하이라이트 제거
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    countryMeshes.forEach(m => {
      m.material.color.setHex(0xffffff);
      m.material.emissive.setHex(0x00c8ff);
    });
    cursorRing.style.width = '28px';
    cursorRing.style.height = '28px';
    cursorRing.style.borderColor = 'rgba(0,200,255,0.5)';
  }
});

canvas.addEventListener('click', () => {
  if (dragMoved) return;
  if (hoveredCountry) openModal(hoveredCountry);
});

// ─── Drag Rotation ────────────────────────────────────────────────────────
canvas.addEventListener('mousedown', e => {
  isDragging = true; dragMoved = false;
  autoRotate = false;
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
  setTimeout(() => autoRotate = true, 2500);
});

// Touch support
canvas.addEventListener('touchstart', e => {
  isDragging = true; dragMoved = false; autoRotate = false;
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
  setTimeout(() => autoRotate = true, 2500);
});

// 마우스 휠 이벤트 추가
window.addEventListener('wheel', (e) => {
  // 카메라의 z축 값(거리)을 변경하여 확대/축소 구현
  camera.position.z += e.deltaY * 0.005;
  
  // 너무 가깝거나 너무 멀어지지 않게 제한 (최소 3, 최대 10)
  camera.position.z = Math.max(3, Math.min(camera.position.z, 10));
}, { passive: true });


// 2. 수정된 openModal 함수 (API 호출 없이 로컬 데이터 사용)
function openModal(country) {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('active');
  document.getElementById('modal-body').style.display = 'none';
  document.getElementById('modal-loading').style.display = 'block';
  document.getElementById('loading-text').textContent = `Digging ${country.name} ${currentYear}...`;

  // 데이터 조회 (0.5초 뒤에 결과 표시 - 로딩 효과)
  setTimeout(() => {
    const countryData = MUSIC_DATABASE[country.name];
    const info = countryData ? countryData[currentYear] : null;

    if (info) {
      document.getElementById('modal-country-badge').textContent = country.name;
      document.getElementById('modal-year-badge').textContent = currentYear;
      document.getElementById('modal-song-title').textContent = info.song || '—';
      document.getElementById('modal-artist').textContent = info.artist || '—';
      document.getElementById('meta-album').textContent = info.album || '—';
      document.getElementById('meta-release').textContent = info.releaseDate || '—';
      document.getElementById('modal-desc').textContent = info.description || '—';

      const tagsEl = document.getElementById('modal-genres');
      tagsEl.innerHTML = '';
      (info.genres || []).forEach(g => {
        const t = document.createElement('div');
        t.className = 'genre-tag';
        t.textContent = g;
        tagsEl.appendChild(t);
      });

      document.getElementById('modal-loading').style.display = 'none';
      document.getElementById('modal-body').style.display = 'block';
    } else {
      // 데이터가 없는 경우 표시할 메시지
      showError(`${country.name}의 ${currentYear}년 데이터가 준비되지 않았습니다.`);
    }
  }, 500);
}
function showError(msg) {
  document.getElementById('modal-loading').style.display = 'none';
  document.getElementById('modal-body').style.display = 'block';
  document.getElementById('modal-song-title').textContent = 'Error';
  document.getElementById('modal-artist').textContent = '';
  document.getElementById('meta-album').textContent = '—';
  document.getElementById('meta-release').textContent = '—';
  document.getElementById('modal-genres').innerHTML = '';
  document.getElementById('modal-desc').textContent = msg;
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
  const phi = (90 - randomCountry.lat) * (Math.PI / 180);
  const theta = (randomCountry.lon + 180) * (Math.PI / 180);
  autoRotate = false;
  rotY = -theta + Math.PI;
  rotX = phi - Math.PI / 2;
  setTimeout(() => autoRotate = true, 5000);

  // 모달 오픈
  openModal(randomCountry);
});

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.remove('active');
});
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay'))
    document.getElementById('modal-overlay').classList.remove('active');
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('modal-overlay').classList.remove('active');
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