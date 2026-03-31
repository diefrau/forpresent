# 🌍 SONIC GLOBE

> 3D 지구 위에서 연도별 각국의 음악을 탐색하는 뮤직 디깅 사이트

---

## 파일 구성

---

## 배포 방법

### 1. Netlify (가장 쉬움, 드래그앤드롭)
1. https://netlify.com 접속 → 로그인
2. `index.html` 파일을 대시보드에 드래그앤드롭
3. 바로 URL 생성됨 (예: `https://sonic-globe-xxx.netlify.app`)

### 2. GitHub Pages (CLI)
```bash
# 저장소 생성 후
git init
git add index.html
git commit -m "init: SONIC GLOBE"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sonic-globe.git
git push -u origin main

# GitHub 저장소 → Settings → Pages → Branch: main → Save
# URL: https://YOUR_USERNAME.github.io/sonic-globe
```

### 3. Vercel (CLI)
```bash
npm i -g vercel
vercel --yes
# 안내에 따르면 바로 URL 생성
```

### 4. GitHub Pages (gh-pages CLI)
```bash
npm i -g gh-pages
gh-pages -d . -f index.html
```

---

## 사용 방법

2. 좌우 화살표 버튼 (또는 키보드 ←→)으로 연도 선택 (1950 ~ 2024)

3. 3D 지구를 드래그해서 회전

4. 파란 점으로 표시된 나라를 클릭하면 해당 연도의 음악 정보 팝업

---

## 포함된 국가 (30개)

United States, United Kingdom, Japan, South Korea, Brazil, Germany,
France, Sweden, Nigeria, Jamaica, Argentina, India, Cuba, South Africa,
Australia, Mexico, Canada, Italy, Spain, Russia, China, Colombia,
Iceland, Ethiopia, Portugal, Ghana, Norway, Ireland, New Zealand, Chile

---

## 기술 스택

- **Three.js r128** — 3D 지구 렌더링
- **Google Fonts** — Bebas Neue, Space Mono, Noto Sans KR

---

## 주의사항

---

*SONIC GLOBE — Dig the world's music through time*
