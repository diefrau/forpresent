# 🌍 SONIC GLOBE — Dig the World's Music

**SONIC GLOBE**는 전 세계 각국의 음악 역사를 3D 지구본을 통해 탐험하고 감상할 수 있는 인터랙티브 웹 애플리케이션입니다. 시공간을 초월하여 시대를 풍미했던 소리들을 발견해 보세요.

---

## ✨ 주요 기능 (Key Features)

### 1. 3D 인터랙티브 글로브 (3D Exploration)
- **Three.js** 기반의 몰입감 있는 3D 지구 구현.
- 마우스 드래그 및 휠을 이용한 자유로운 회전 및 확대/축소.
- 주요 국가별 데이터 포인트(Pulsing Dots)를 클릭하여 해당 국가의 음악 정보 카드 호출.

### 2. 타임머신 내비게이션 (Temporal Navigation)
- 1950년부터 현재까지 연도별 음악 데이터 탐색.
- 연도 선택기(Year Picker)를 통해 특정 시점의 전 세계 음악 차트나 유행곡 확인 가능.

### 3. 통합 미니 플레이어 (Integrated Audio)
- **YouTube IFrame API**를 연동하여 실제 곡을 감상할 수 있는 플레이어 탑재.
- 곡 정보 카드 호출 시 자동으로 관련 영상 로드 및 재생 준비.

### 4. 방대한 음악 아카이브 (Music Archive)
- 국가별, 장르별, 검색어별 필터링이 가능한 리스트 뷰 제공.
- 아카이브에서 곡을 클릭하면 지구본이 해당 국가로 자동 회전하며 즉시 정보를 표시하는 연동 기능.

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend:** Vanilla HTML5, CSS3 (Modern Neon/Dark Aesthetic)
- **JavaScript:** ES6+ Modules
- **3D Graphics:** Three.js
- **Media:** YouTube IFrame Player API
- **Data:** JavaScript-based static database (`data.js`)
- **State Management:** LocalStorage (페이지 간 탐색 상태 유지)

---

## 📂 프로젝트 구조 (Project Structure)

```text
SONIC GLOBE/
├── index.html          # 랜딩 페이지 (인트로 및 스토리 안내)
├── globe.html          # 메인 3D 탐험 페이지
├── archive.html        # 전체 음악 리스트 및 검색 페이지
├── script.js           # 3D 글로브 로직 및 플레이어 컨트롤러
├── archive.js          # 아카이브 필터링 및 렌더링 로직
├── data.js             # 4,500+ 라인 이상의 방대한 음악 데이터베이스
├── stylesheet.css      # 공통 디자인 시스템 및 UI 컴포넌트
├── archive.css         # 아카이브 페이지 전용 스타일
└── landing.css         # 랜딩 페이지 전용 스타일
```

---

## 🚀 주요 기술적 성취 (Technical Highlights)

- **심리스한 페이지 전환:** `localStorage`를 활용하여 아카이브에서 선택한 특정 곡의 정보(국가, 연도, 곡명)를 지구본 페이지로 전달하고, 페이지 로드 시 해당 위치로 자동 포커싱되는 기능을 구현했습니다.
- **반응형 UI/UX:** 모바일과 데스크톱 환경을 모두 고려한 Floating Action Button(FAB)과 커스텀 커서 시스템을 통해 일관된 사용자 경험을 제공합니다.
- **데이터 시각화:** 위도와 경도 데이터를 3D 벡터 좌표로 변환하여 구체 위에 정확히 배치하고, 카메라 거리와 각도에 따른 레이블 가시성 로직을 적용했습니다.

---

## 🎧 이용 방법

1. `index.html`을 실행하여 프로젝트의 컨셉을 확인합니다.
2. **Launch Globe**를 클릭하여 3D 탐험을 시작합니다.
3. 지구본의 점을 클릭하거나 하단의 연도를 변경하여 음악을 발굴합니다.
4. 더 자세한 리스트를 원하면 우측 하단의 **ARCHIVE** 버튼을 누릅니다.
