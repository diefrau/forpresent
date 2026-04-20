// data.js
// 구조: { "국가명": { "연도": [ ...곡 배열 ] } }
// 나라를 클릭하면 해당 연도 배열에서 랜덤으로 한 곡을 선택합니다.
export const MUSIC_DATABASE = {
  "South Korea": {
  "1950": [
    {
      "song": "전선야곡",
      "artist": "신세영",
      "album": "전선야곡 (Single)",
      "releaseDate": "1950",
      "genres": ["Trot"],
      "description": "한국전쟁 당시 고향에 계신 어머니를 그리워하는 병사의 마음을 담아 전 국민적인 심금을 울린 곡입니다.",
      "youtubeId": "I87i1F8t6vU"
    },
    {
      "song": "전우야 잘자라",
      "artist": "현인",
      "album": "전우야 잘자라 (Single)",
      "releaseDate": "1950",
      "genres": ["Military Song", "Trot"],
      "description": "전쟁의 포화 속에서 전우애를 다지는 가사로 당시 군인과 민간인 모두에게 널리 불린 진중가요입니다.",
      "youtubeId": "zX6Ew-6_M84"
    },
    {
      "song": "아내의 노래",
      "artist": "심연옥",
      "album": "아내의 노래 (Single)",
      "releaseDate": "1950",
      "genres": ["Trot"],
      "description": "남편을 전쟁터로 보낸 아내의 애절한 기다림을 담은 곡으로 심연옥의 데뷔작이자 대표곡입니다.",
      "youtubeId": "VwGZqQvj9r8"
    }
  ],
  "1951": [
    {
      "song": "굳세어라 금순아",
      "artist": "현인",
      "album": "굳세어라 금순아 (Single)",
      "releaseDate": "1951",
      "genres": ["Trot"],
      "description": "흥남 철수 작전과 피난민의 애환을 상징하는 곡으로, 전쟁 시기 가장 상징적인 대중가요 중 하나입니다.",
      "youtubeId": "u6iLOfB9hic"
    },
    {
      "song": "신라의 달밤",
      "artist": "현인",
      "album": "신라의 달밤 (Single)",
      "releaseDate": "1951",
      "genres": ["Trot"],
      "description": "작곡가 박시춘과 가수 현인의 콤비가 만들어낸 곡으로, 독특한 창법과 이국적인 분위기로 큰 인기를 끌었습니다.",
      "youtubeId": "MOnm89574Q8"
    },
    {
      "song": "고향만리",
      "artist": "현인",
      "album": "고향만리 (Single)",
      "releaseDate": "1951",
      "genres": ["Trot"],
      "description": "피난길에 오른 대중들이 고향을 그리워하며 불렀던 곡으로, 현인의 전성기를 증명하는 곡입니다.",
      "youtubeId": "n8_H_7e0R6U"
    }
  ],
  "1952": [
    {
      "song": "경상도 아가씨",
      "artist": "박재홍",
      "album": "경상도 아가씨 (Single)",
      "releaseDate": "1952",
      "genres": ["Trot"],
      "description": "피난지 부산에서의 삶과 만남을 그린 곡으로, 당시 영도다리 주변 피난민들의 풍경을 생생히 묘사했습니다.",
      "youtubeId": "6m9H1o0y6e4"
    },
    {
      "song": "봄날은 간다",
      "artist": "백설희",
      "album": "봄날은 간다 (Single)",
      "releaseDate": "1952",
      "genres": ["Trot"],
      "description": "한국 대중음악사상 가장 아름다운 노랫말 중 하나로 꼽히며, 전쟁 중에도 꽃은 피고 지는 인생의 허무를 노래했습니다.",
      "youtubeId": "pB6mZ8Wn8E4"
    },
    {
      "song": "홍도야 우지마라",
      "artist": "박재홍",
      "album": "홍도야 우지마라 (Single)",
      "releaseDate": "1952",
      "genres": ["Trot"],
      "description": "일제강점기 신파극 주제가를 1950년대에 박재홍이 다시 불러 전후 대중들에게 다시 한번 큰 사랑을 받았습니다.",
      "youtubeId": "Y3zL99jA0W8"
    }
  ],
  "1953": [
    {
      "song": "이별의 부산정거장",
      "artist": "남인수",
      "album": "이별의 부산정거장 (Single)",
      "releaseDate": "1953",
      "genres": ["Trot"],
      "description": "휴전 직후 부산을 떠나 상경하는 피난민들의 이별 풍경을 경쾌하면서도 슬프게 담아낸 명곡입니다.",
      "youtubeId": "hWq6uF4XjYo"
    },
    {
      "song": "추억의 소야곡",
      "artist": "남인수",
      "album": "추억의 소야곡 (Single)",
      "releaseDate": "1953",
      "genres": ["Trot"],
      "description": "남인수 특유의 미성이 돋보이는 곡으로, 미련 어린 사랑을 세련된 가창으로 표현하여 큰 인기를 누렸습니다.",
      "youtubeId": "u06MvL0E_4c"
    },
    {
      "song": "물방아 도는 내력",
      "artist": "박재홍",
      "album": "물방아 도는 내력 (Single)",
      "releaseDate": "1953",
      "genres": ["Trot"],
      "description": "고향의 평화로운 풍경을 그리워하는 가사로 전쟁 후 안정을 찾고 싶어 하던 대중들의 마음을 사로잡았습니다.",
      "youtubeId": "Dq8p2U8_3uY"
    }
  ],
  "1954": [
    {
      "song": "샌프란시스코",
      "artist": "백설희",
      "album": "샌프란시스코 (Single)",
      "releaseDate": "1954",
      "genres": ["Traditional Pop", "Jazz Pop"],
      "description": "미국적인 정취와 세련된 멜로디를 통해 전후 한국 사회에 불어온 서구 문화의 동경을 보여주는 곡입니다.",
      "youtubeId": "hE_W9h-F08I"
    },
    {
      "song": "단장의 미아리고개",
      "artist": "이해연",
      "album": "단장의 미아리고개 (Single)",
      "releaseDate": "1954",
      "genres": ["Trot"],
      "description": "전쟁 중 납북된 남편을 그리워하는 처절한 가사로, 미아리고개라는 장소성을 통해 전쟁의 비극을 증언합니다.",
      "youtubeId": "rS_3Ww4wz7M"
    },
    {
      "song": "청춘 고백",
      "artist": "남인수",
      "album": "청춘 고백 (Single)",
      "releaseDate": "1954",
      "genres": ["Trot"],
      "description": "전쟁의 상흔에서 벗어나 다시 사랑과 인생을 이야기하기 시작한 청년들의 마음을 대변하며 히트했습니다.",
      "youtubeId": "qWp9v6I9m6Y"
    }
  ],
  "1955": [
    {
      "song": "나하나의 사랑",
      "artist": "송민도",
      "album": "나하나의 사랑 (Single)",
      "releaseDate": "1955",
      "genres": ["Traditional Pop"],
      "description": "트로트의 틀을 벗어나 스탠다드 팝 스타일의 세련된 감성을 선보이며 한국 발라드의 원형을 제시했습니다.",
      "youtubeId": "7A4r5p9kYm8"
    },
    {
      "song": "청춘 등대",
      "artist": "손인호",
      "album": "청춘 등대 (Single)",
      "releaseDate": "1955",
      "genres": ["Trot"],
      "description": "손인호의 묵직하면서도 따뜻한 음색이 돋보이는 곡으로 50년대 중반 대중적인 큰 인기를 얻었습니다.",
      "youtubeId": "f-z1E6gBvM0"
    },
    {
      "song": "미사의 노래",
      "artist": "이인권",
      "album": "미사의 노래 (Single)",
      "releaseDate": "1955",
      "genres": ["Trot"],
      "description": "종교적인 분위기와 슬픈 멜로디가 결합되어 당시 많은 사람들에게 위로를 주었던 명곡입니다.",
      "youtubeId": "m_yW-L596_E"
    }
  ],
  "1956": [
    {
      "song": "산유화",
      "artist": "남인수",
      "album": "산유화 (Single)",
      "releaseDate": "1956",
      "genres": ["Trot"],
      "description": "자연의 섭리를 인간의 삶과 비유한 철학적인 가사와 남인수의 절정기 가창력을 감상할 수 있는 곡입니다.",
      "youtubeId": "S3n-K6pP8x0"
    },
    {
      "song": "비 내리는 호남선",
      "artist": "손인호",
      "album": "비 내리는 호남선 (Single)",
      "releaseDate": "1956",
      "genres": ["Trot"],
      "description": "당시 정치적 상황과 맞물려 '해공 신익희'의 죽음을 애도하는 노래로 오해받으며 전국적인 신드롬을 일으켰습니다.",
      "youtubeId": "8z_D-kYy1D8"
    },
    {
      "song": "아리조나 카우보이",
      "artist": "명국환",
      "album": "아리조나 카우보이 (Single)",
      "releaseDate": "1956",
      "genres": ["Western Pop", "Trot"],
      "description": "미국 서부 영화의 영향을 받은 경쾌한 리듬의 곡으로, 당시 한국 사회에 유행하던 '미제' 문화를 반영합니다.",
      "youtubeId": "Nf-E2_5-F5s"
    }
  ],
  "1957": [
    {
      "song": "무너진 사랑탑",
      "artist": "남인수",
      "album": "무너진 사랑탑 (Single)",
      "releaseDate": "1957",
      "genres": ["Trot"],
      "description": "남인수의 후기 커리어에서 가장 큰 성공을 거둔 곡 중 하나로, 실연의 아픔을 장중하게 그려냈습니다.",
      "youtubeId": "hWq6uF4XjYo"
    },
    {
      "song": "대전 부르스",
      "artist": "안정애",
      "album": "대전 부르스 (Single)",
      "releaseDate": "1957",
      "genres": ["Blues", "Trot"],
      "description": "대전역을 배경으로 한 이별의 정서를 블루스 리듬에 담아내어 밤차를 타는 이들의 감수성을 자극했습니다.",
      "youtubeId": "Z7S8v7O_7mY"
    },
    {
      "song": "백치 아다다",
      "artist": "나애심",
      "album": "영화 '백치 아다다' 주제가",
      "releaseDate": "1957",
      "genres": ["Trot"],
      "description": "동명 소설을 영화화한 작품의 주제가로, 나애심의 허스키하고 매력적인 목소리가 큰 화제가 되었습니다.",
      "youtubeId": "pE_NInGv0j8"
    }
  ],
  "1958": [
    {
      "song": "단벌 신사",
      "artist": "김희갑",
      "album": "단벌 신사 (Single)",
      "releaseDate": "1958",
      "genres": ["Comedy Song", "Swing Jazz"],
      "description": "가난하지만 낙천적인 태도를 잃지 않는 당시 서민들의 모습을 재치 있게 묘사한 유행가입니다.",
      "youtubeId": "v8Y4Z6Q-JjQ"
    },
    {
      "song": "꿈에 본 내 고향",
      "artist": "한정무",
      "album": "꿈에 본 내 고향 (Single)",
      "releaseDate": "1958",
      "genres": ["Trot"],
      "description": "실향민들의 고통을 정면으로 다룬 곡으로, 한정무의 처절한 가창이 돋보이는 시대의 비가입니다.",
      "youtubeId": "L-SshG7PAnM"
    },
    {
      "song": "울어라 기타줄",
      "artist": "손인호",
      "album": "울어라 기타줄 (Single)",
      "releaseDate": "1958",
      "genres": ["Trot"],
      "description": "기타 선율에 실린 애수 어린 멜로디가 대중들의 고독감을 달래주며 큰 인기를 끌었습니다.",
      "youtubeId": "7A4r5p9kYm8"
    }
  ],
  "1959": [
    {
      "song": "유정천리",
      "artist": "박재홍",
      "album": "영화 '유정천리' 주제가",
      "releaseDate": "1959",
      "genres": ["Trot"],
      "description": "영화와 함께 엄청난 히트를 기록했으며, 1950년대를 마무리하는 가장 대표적인 가요로 꼽힙니다.",
      "youtubeId": "AetZ0YAhgE8"
    },
    {
      "song": "Roses in the Snow",
      "artist": "김시스터즈",
      "album": "The Kim Sisters: Their First Album",
      "releaseDate": "1959",
      "genres": ["Traditional Pop", "Vocal Group"],
      "description": "한국 가수 최초로 미국 시장에 진출하여 성공을 거둔 김시스터즈의 대표적인 퍼포먼스 곡입니다.",
      "youtubeId": "pB_O_39S8vU"
    },
    {
      "song": "꿈은 사라지고",
      "artist": "최무룡",
      "album": "영화 '꿈은 사라지고' 주제가",
      "releaseDate": "1959",
      "genres": ["Traditional Pop"],
      "description": "당대 최고의 영화 스타 최무룡이 부른 곡으로, 50년대 말의 낭만적인 분위기를 잘 담고 있습니다.",
      "youtubeId": "_AY4sPDNzy8"
    }
  ],
  "1960": [
    {
      "song": "외나무 다리",
      "artist": "최무룡",
      "album": "영화 '외나무 다리' 주제가",
      "releaseDate": "1960",
      "genres": ["Trot", "Traditional Pop"],
      "description": "영화배우 최무룡이 부른 서정적인 곡으로, 당시 전후 복구 시기 사람들의 감수성을 자극하며 큰 인기를 끌었습니다.",
      "youtubeId": "m-p1-yK6XW0"
    },
    {
      "song": "울어라 열풍아",
      "artist": "이미자",
      "album": "울어라 열풍아 (Single)",
      "releaseDate": "1960",
      "genres": ["Trot"],
      "description": "이미자 초기 커리어의 히트곡으로, 한국적 애환이 서린 목소리가 대중들의 마음을 사로잡기 시작한 시점의 곡입니다.",
      "youtubeId": "8z_D-kYy1D8"
    },
    {
      "song": "지평선은 말이 없다",
      "artist": "기주희",
      "album": "영화 '지평선은 말이 없다' 주제가",
      "releaseDate": "1960",
      "genres": ["Trot"],
      "description": "만주를 배경으로 한 영화의 주제가로, 웅장하면서도 애수 어린 멜로디가 60년대 초반 큰 반향을 일으켰습니다.",
      "youtubeId": "zX6Ew-6_M84"
    }
  ],
  "1961": [
    {
      "song": "노란 샤쓰의 사나이",
      "artist": "한명숙",
      "album": "한명숙 히트곡집",
      "releaseDate": "1961",
      "genres": ["Swing", "Country Pop"],
      "description": "한국 가요사에서 '팝 스타일'의 전성기를 연 곡으로, 동남아시아를 비롯해 일본까지 번안될 정도로 범아시아적 히트를 기록했습니다.",
      "youtubeId": "rS_3Ww4wz7M"
    },
    {
      "song": "우리 애인은 올드미스",
      "artist": "최희준",
      "album": "최희준 히트곡집",
      "releaseDate": "1961",
      "genres": ["Jazz Pop", "Swing"],
      "description": "미국 유학파 출신의 엘리트 가수 최희준이 부른 경쾌한 재즈 스타일의 곡으로, 현대적인 남성상을 제시했습니다.",
      "youtubeId": "Nf-E2_5-F5s"
    },
    {
      "song": "해운대 엘레지",
      "artist": "손인호",
      "album": "해운대 엘레지 (Single)",
      "releaseDate": "1961",
      "genres": ["Trot"],
      "description": "손인호의 차분하고 깊은 가창력이 돋보이는 곡으로, 부산 해운대를 배경으로 한 이별 노래의 고전입니다.",
      "youtubeId": "u6iLOfB9hic"
    }
  ],
  "1962": [
    {
      "song": "님은 먼 곳에 (초판)",
      "artist": "김치캣",
      "album": "김치캣 히트집",
      "releaseDate": "1962",
      "genres": ["Traditional Pop", "Jazz"],
      "description": "미국 무대에서도 활동한 걸그룹 김치캣의 세련된 화음이 돋보이는 곡으로, 60년대 초반의 모던한 분위기를 담고 있습니다.",
      "youtubeId": "pB_O_39S8vU"
    },
    {
      "song": "진고개 신사",
      "artist": "최희준",
      "album": "진고개 신사 / 맨발의 청춘",
      "releaseDate": "1962",
      "genres": ["Traditional Pop"],
      "description": "당시 서울의 풍경과 낭만을 노래한 최희준의 대표곡으로, 중후한 저음이 돋보이는 스탠다드 팝입니다.",
      "youtubeId": "MOnm89574Q8"
    },
    {
      "song": "눈물 젖은 두만강 (재발표)",
      "artist": "김정구",
      "album": "김정구 걸작집",
      "releaseDate": "1962",
      "genres": ["Trot"],
      "description": "일제강점기 곡이나 60년대 초반 다시 대대적으로 유행하며 국민 가요로 자리 잡았습니다.",
      "youtubeId": "n8_H_7e0R6U"
    }
  ],
  "1963": [
    {
      "song": "동백아가씨",
      "artist": "이미자",
      "album": "영화 '동백아가씨' 주제가",
      "releaseDate": "1963",
      "genres": ["Trot"],
      "description": "한국 대중음악 역사상 최고의 베스트셀러 중 하나로, 이미자를 '엘레지의 여왕'으로 등극시킨 결정적인 곡입니다.",
      "youtubeId": "I87i1F8t6vU"
    },
    {
      "song": "맨발의 청춘",
      "artist": "최희준",
      "album": "영화 '맨발의 청춘' 주제가",
      "releaseDate": "1963",
      "genres": ["Jazz Pop", "Swing"],
      "description": "청춘 영화의 금자탑인 '맨발의 청춘' 주제가로, 당시 젊은 세대의 반항과 낭만을 상징하는 찬가였습니다.",
      "youtubeId": "6m9H1o0y6e4"
    },
    {
      "song": "빨간 구두 아가씨",
      "artist": "남일해",
      "album": "남일해 히트곡집",
      "releaseDate": "1963",
      "genres": ["Traditional Pop", "Swing"],
      "description": "남일해의 매력적인 저음과 경쾌한 리듬이 어우러져 도시적인 세련미를 뽐냈던 히트곡입니다.",
      "youtubeId": "Y3zL99jA0W8"
    }
  ],
  "1964": [
    {
      "song": "떠날 때는 말없이",
      "artist": "현미",
      "album": "영화 '떠날 때는 말없이' 주제가",
      "releaseDate": "1964",
      "genres": ["Traditional Pop", "Jazz Pop"],
      "description": "허스키 보이스의 대명사 현미의 대표곡으로, 이봉조 작곡가의 세련된 편곡이 돋보이는 명곡입니다.",
      "youtubeId": "Dq8p2U8_3uY"
    },
    {
      "song": "빗속의 여인",
      "artist": "에드훠 (Add 4)",
      "album": "The Add 4: First Album",
      "releaseDate": "1964",
      "genres": ["Rock", "Psych-Rock"],
      "description": "한국 록의 대부 신중현이 결성한 에드훠의 곡으로, 한국 그룹 사운드의 역사적인 시작점을 알린 곡입니다.",
      "youtubeId": "hE_W9h-F08I"
    },
    {
      "song": "단골손님",
      "artist": "조미미",
      "album": "조미미 히트집",
      "releaseDate": "1964",
      "genres": ["Trot"],
      "description": "신선한 가창력으로 60년대 중반 트로트계에 활력을 불어넣은 조미미의 초기 히트작입니다.",
      "youtubeId": "qWp9v6I9m6Y"
    }
  ],
  "1965": [
    {
      "song": "님아",
      "artist": "펄 시스터즈",
      "album": "펄 시스터즈 데뷔 앨범",
      "releaseDate": "1965",
      "genres": ["Soul", "Rock"],
      "description": "신중현 사운드와 만나 파격적인 댄스와 소울풀한 창법을 선보이며 가요계에 큰 충격을 주었습니다.",
      "youtubeId": "u06MvL0E_4c"
    },
    {
      "song": "하숙생",
      "artist": "최희준",
      "album": "라디오 드라마 '하숙생' 주제가",
      "releaseDate": "1965",
      "genres": ["Traditional Pop"],
      "description": "인생을 '나그네 길'에 비유한 철학적인 가사로 남녀노소 불문하고 엄청난 사랑을 받은 곡입니다.",
      "youtubeId": "m_yW-L596_E"
    },
    {
      "song": "흑맥주",
      "artist": "최양숙",
      "album": "최양숙 가요 앨범",
      "releaseDate": "1965",
      "genres": ["Traditional Pop", "Chanson Style"],
      "description": "샹송적인 분위기를 풍기는 최양숙의 우아한 가창력이 돋보이는 곡으로 60년대 지성인들 사이에서 인기였습니다.",
      "youtubeId": "f-z1E6gBvM0"
    }
  ],
  "1966": [
    {
      "song": "안개",
      "artist": "정훈희",
      "album": "영화 '안개' 주제가",
      "releaseDate": "1966",
      "genres": ["Jazz Pop", "Soul"],
      "description": "당시 17세였던 정훈희의 청아한 목소리와 몽환적인 분위기가 결합되어 한국 팝의 수준을 높인 명곡입니다.",
      "youtubeId": "Z7S8v7O_7mY"
    },
    {
      "song": "가슴 아프게",
      "artist": "남진",
      "album": "남진 히트곡집",
      "releaseDate": "1966",
      "genres": ["Trot"],
      "description": "남진을 당대 최고의 스타로 만든 곡으로, '오빠 부대'의 시초격인 폭발적인 인기를 끌었습니다.",
      "youtubeId": "S3n-K6pP8x0"
    },
    {
      "song": "월남에서 돌아온 김상사",
      "artist": "김추자",
      "album": "늦기 전에 / 월남에서 돌아온 김상사",
      "releaseDate": "1966",
      "genres": ["Soul", "Psychedelic Rock"],
      "description": "신중현 사운드의 뮤즈 김추자의 등장을 알린 곡으로, 파격적인 율동과 창법으로 큰 화제가 되었습니다.",
      "youtubeId": "L-SshG7PAnM"
    }
  ],
  "1967": [
    {
      "song": "사랑은 차가운 유혹",
      "artist": "양미란",
      "album": "양미란 히트집",
      "releaseDate": "1967",
      "genres": ["Soul", "Pop Rock"],
      "description": "강렬한 비트와 허스키한 창법이 돋보이는 곡으로, 60년대 후반 소울 음악의 유행을 선도했습니다.",
      "youtubeId": "v8Y4Z6Q-JjQ"
    },
    {
      "song": "대머리 총각",
      "artist": "김상희",
      "album": "김상희 히트집",
      "releaseDate": "1967",
      "genres": ["Traditional Pop"],
      "description": "밝고 경쾌한 이미지의 김상희를 상징하는 곡으로, 유머러스한 가사와 멜로디가 대중적인 사랑을 받았습니다.",
      "youtubeId": "7A4r5p9kYm8"
    },
    {
      "song": "빨간 마후라",
      "artist": "쟈니 브라더스",
      "album": "영화 '빨간 마후라' 주제가",
      "releaseDate": "1967",
      "genres": ["Military Song", "Chorus"],
      "description": "한국 공군을 상징하는 곡이기도 하며, 영화의 대히트와 함께 사중창단의 힘찬 화음이 큰 인기를 얻었습니다.",
      "youtubeId": "VwGZqQvj9r8"
    }
  ],
  "1968": [
    {
      "song": "커피 한 잔",
      "artist": "펄 시스터즈",
      "album": "님아 / 커피 한 잔",
      "releaseDate": "1968",
      "genres": ["Soul", "Psychedelic Rock"],
      "description": "신중현이 작곡한 곡으로, 사이키델릭한 기타 사운드와 두 자매의 완벽한 호흡이 돋보이는 60년대 록의 정수입니다.",
      "youtubeId": "AetZ0YAhgE8"
    },
    {
      "song": "돌아와요 부산항에 (초판)",
      "artist": "김해일",
      "album": "돌아와요 부산항에 / 추억의 길",
      "releaseDate": "1968",
      "genres": ["Trot"],
      "description": "후에 조용필이 불러 국민 가요가 된 곡의 원곡 버전으로, 당시에도 부산 지역을 중심으로 입소문을 탔습니다.",
      "youtubeId": "pE_NInGv0j8"
    },
    {
      "song": "님은 먼 곳에",
      "artist": "김추자",
      "album": "님은 먼 곳에 / 월남에서 돌아온 김상사",
      "releaseDate": "1968",
      "genres": ["Soul", "Ballad"],
      "description": "김추자의 폭발적인 가창력과 신중현의 소울풀한 작곡이 만난 한국 소울 발라드의 기념비적인 작품입니다.",
      "youtubeId": "hWq6uF4XjYo"
    }
  ],
  "1969": [
    {
      "song": "님아",
      "artist": "김추자",
      "album": "늦기 전에 / 월남에서 돌아온 김상사",
      "releaseDate": "1969",
      "genres": ["Soul", "Rock"],
      "description": "김추자의 데뷔와 동시에 그녀를 시대의 아이콘으로 만든 곡으로, 강렬한 샤우팅이 인상적입니다.",
      "youtubeId": "_AY4sPDNzy8"
    },
    {
      "song": "사랑하고 있어요",
      "artist": "나훈아",
      "album": "나훈아 정규 1집",
      "releaseDate": "1969",
      "genres": ["Trot"],
      "description": "나훈아의 초기 히트작으로, 남진과 함께 70년대 가요계 양대 산맥의 탄생을 알린 곡입니다.",
      "youtubeId": "u06MvL0E_4c"
    },
    {
      "song": "봄비",
      "artist": "박인수",
      "album": "신중현과 덩키스",
      "releaseDate": "1969",
      "genres": ["Soul", "Blues"],
      "description": "한국 소울의 전설 박인수가 부른 곡으로, 신중현의 사이키델릭한 편곡과 박인수의 절규하는 듯한 보컬이 압권입니다.",
      "youtubeId": "qWp9v6I9m6Y"
    }
  ],

    "1992": [
      {
        song: "난 알아요",
        artist: "서태지와 아이들",
        album: "서태지와 아이들 1집",
        releaseDate: "1992.03",
        genres: ["K-Pop", "New Jack Swing", "Rap"],
        description: "한국 대중음악의 역사를 바꾼 기념비적인 데뷔곡. 랩과 댄스를 결합해 K-Pop의 원형을 만들었습니다."
      }
    ],
    "2012": [
      {
        song: "강남스타일",
        artist: "싸이 (PSY)",
        album: "싸이6甲 Part 1",
        releaseDate: "2012.07.15",
        genres: ["K-Pop", "Dance-pop"],
        description: "전 세계적으로 말춤 열풍을 일으키며 유튜브 최초 10억 뷰를 돌파한 역사적인 곡입니다.",
        youtubeId: "9bZkp7q19f0"
      },
      {
        song: "Fantastic Baby",
        artist: "BIGBANG",
        album: "Still Alive",
        releaseDate: "2012.03.21",
        genres: ["K-Pop", "Electronic", "Hip-hop"],
        description: "BIGBANG의 파워풀한 퍼포먼스와 강렬한 사운드로 전 세계 K-Pop 팬들을 사로잡은 곡입니다."
      },
      {
        song: "I Love You",
        artist: "2NE1",
        album: "2NE1 2집",
        releaseDate: "2012.07.01",
        genres: ["K-Pop", "Dance-pop", "R&B"],
        description: "2NE1의 걸크러시 매력이 담긴 곡으로, 강렬한 보컬과 세련된 프로덕션이 돋보입니다."
      }
    ],
    "2020": [
      {
        song: "Dynamite",
        artist: "BTS",
        album: "Dynamite",
        releaseDate: "2020.08.21",
        genres: ["K-Pop", "Disco-pop", "Funk"],
        description: "BTS 최초의 영어 싱글로, 빌보드 핫100 1위를 차지하며 K-Pop 역사를 새로 썼습니다.",
        youtubeId: "gdZLi9oWNZg"
      },
      {
        song: "How You Like That",
        artist: "BLACKPINK",
        album: "How You Like That",
        releaseDate: "2020.06.26",
        genres: ["K-Pop", "Dance-pop", "Trap"],
        description: "24시간 최다 조회수 기록을 세운 BLACKPINK의 컴백 싱글. 강렬한 훅과 퍼포먼스가 인상적입니다."
      }
    ]
  },
  "United States": {
    "1950": [
      {
        "song": "Mona Lisa",
        "artist": "Nat King Cole",
        "album": "Mona Lisa (Single)",
        "releaseDate": "1950.05",
        "genres": ["Traditional Pop", "Vocal Jazz"],
        "description": "부드러운 바리톤 음색이 돋보이는 냇 킹 콜의 대표곡으로, 빌보드 차트 8주 연속 1위를 기록하며 50년대 팝의 정수를 보여줍니다.",
        "youtubeId": "NUXSntPFTSI"
      },
      {
        "song": "If I Knew You Were Comin' I'd've Baked a Cake",
        "artist": "Eileen Barton",
        "album": "If I Knew You Were Comin' I'd've Baked a Cake (Single)",
        "releaseDate": "1950.01",
        "genres": ["Traditional Pop", "Novelty"],
        "description": "50년대 초반 미국에서 선풍적인 인기를 끌었던 경쾌한 노블티 송으로, 당시의 낙천적인 사회 분위기를 잘 반영하고 있습니다.",
        "youtubeId": "L-SshG7PAnM"
      },
      {
        "song": "Tennessee Waltz",
        "artist": "Patti Page",
        "album": "Tennessee Waltz (Single)",
        "releaseDate": "1950.11",
        "genres": ["Traditional Pop", "Country"],
        "description": "패티 페이지의 가장 성공적인 싱글로, 팝과 컨트리 장르의 경계를 허물며 전 세계적으로 수백만 장의 판매고를 올린 클래식입니다.",
        "youtubeId": "2_8T9nd0Zew"
      },
      {
        "song": "Long Gone Lonesome Blues",
        "artist": "Hank Williams",
        "album": "Long Gone Lonesome Blues (Single)",
        "releaseDate": "1950.03",
        "genres": ["Country", "Honky Tonk"],
        "description": "컨트리 음악의 전설 행크 윌리엄스의 곡으로, 요들 창법과 애절한 블루스 감성이 결합된 초기 컨트리의 걸작입니다.",
        "youtubeId": "T9_VunpY_xQ"
      },
      {
        "song": "Teardrops from My Eyes",
        "artist": "Ruth Brown",
        "album": "Teardrops from My Eyes (Single)",
        "releaseDate": "1950.10",
        "genres": ["Rhythm & Blues", "Jump Blues"],
        "description": "루스 브라운에게 '미스 리듬'이라는 별명을 안겨준 곡으로, 초기 R&B 차트를 석권하며 락앤롤의 탄생에 큰 영향을 주었습니다.",
        "youtubeId": "E6v-C2pXIn0"
      },
      {
        "song": "Please Send Me Someone to Love",
        "artist": "Percy Mayfield",
        "album": "Please Send Me Someone to Love (Single)",
        "releaseDate": "1950.09",
        "genres": ["Rhythm & Blues", "West Coast Blues"],
        "description": "부드럽고 세련된 블루스 스타일의 곡으로, 인종 차별에 대한 은유적인 가사와 평화를 갈구하는 메시지로 깊은 울림을 줍니다.",
        "youtubeId": "O_S8v7O_7mY"
      }
    ],
    "1977": [
      {
        song: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        releaseDate: "1977.02.22",
        genres: ["Rock", "Soft Rock", "Country Rock"],
        description: "미국 록 역사상 가장 상징적인 곡 중 하나. 기타 솔로와 신비로운 가사로 시대를 초월한 명곡입니다."
      },
      {
        song: "Dreams",
        artist: "Fleetwood Mac",
        album: "Rumours",
        releaseDate: "1977.02.04",
        genres: ["Soft Rock", "Pop Rock"],
        description: "Fleetwood Mac의 전설적인 앨범 Rumours에 수록된 곡으로, TikTok을 통해 2020년에 재유행했습니다."
      }
    ],
    "1991": [
      {
        song: "Smells Like Teen Spirit",
        artist: "Nirvana",
        album: "Nevermind",
        releaseDate: "1991.09.10",
        genres: ["Grunge", "Alternative Rock"],
        description: "90년대 얼터너티브 록의 상징과도 같은 곡으로 대중음악의 판도를 바꿨습니다.",
        youtubeId: "hTWKbfoikeg"
      },
      {
        song: "Under the Bridge",
        artist: "Red Hot Chili Peppers",
        album: "Blood Sugar Sex Magik",
        releaseDate: "1991.09.24",
        genres: ["Alternative Rock", "Funk Rock"],
        description: "RHCP의 대표곡으로, 개인적인 고독과 LA에 대한 애정을 담은 감성적인 록 발라드입니다."
      },
      {
        song: "November Rain",
        artist: "Guns N' Roses",
        album: "Use Your Illusion I",
        releaseDate: "1991.08.28",
        genres: ["Hard Rock", "Power Ballad"],
        description: "9분에 달하는 거대한 스케일의 록 발라드. 슬래시의 기타 솔로는 역사상 최고로 꼽힙니다."
      }
    ],
    "2003": [
      {
        song: "Crazy in Love",
        artist: "Beyoncé ft. Jay-Z",
        album: "Dangerously in Love",
        releaseDate: "2003.05.18",
        genres: ["R&B", "Pop", "Hip-hop"],
        description: "비욘세의 솔로 데뷔를 알린 기념비적인 곡. 중독성 강한 호른 리프와 강렬한 퍼포먼스가 특징입니다."
      },
      {
        song: "In Da Club",
        artist: "50 Cent",
        album: "Get Rich or Die Tryin'",
        releaseDate: "2003.01.07",
        genres: ["Hip-hop", "Gangsta Rap"],
        description: "2003년 힙합 씬을 평정한 50 Cent의 데뷔 싱글. Dr. Dre와 Eminem이 프로듀싱에 참여했습니다."
      }
    ]
  },
  "United Kingdom": {
    "1967": [
      {
        song: "A Whiter Shade of Pale",
        artist: "Procol Harum",
        album: "Single",
        releaseDate: "1967.05.12",
        genres: ["Psychedelic Rock", "Baroque Pop"],
        description: "바흐의 선율을 차용한 몽환적인 명곡. 영국 역사상 가장 많이 방송된 곡 중 하나입니다."
      },
      {
        song: "Waterloo Sunset",
        artist: "The Kinks",
        album: "Something Else",
        releaseDate: "1967.05.05",
        genres: ["Rock", "British Invasion"],
        description: "레이 데이비스가 런던 템스강 풍경을 담아낸 시적인 곡으로 영국 팝의 정수로 꼽힙니다."
      }
    ],
    "1975": [
      {
        song: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        releaseDate: "1975.10.31",
        genres: ["Progressive Rock", "Hard Rock", "Opera"],
        description: "록 역사상 가장 야심찬 곡. 오페라·발라드·헤비메탈을 하나로 엮은 6분짜리 걸작입니다."
      },
      {
        song: "Space Oddity",
        artist: "David Bowie",
        album: "Space Oddity",
        releaseDate: "1975 (재발매)",
        genres: ["Art Rock", "Glam Rock"],
        description: "Major Tom이라는 우주비행사를 통해 소외와 자유를 노래한 보위의 대표곡입니다."
      }
    ]
  },
  "Japan": {
    "1980": [
      {
        song: "ルビーの指環",
        artist: "寺尾聰",
        album: "Reflections",
        releaseDate: "1981.01.21",
        genres: ["J-Pop", "City Pop", "AOR"],
        description: "일본 시티팝의 정수를 보여주는 명곡. 1981년 오리콘 연간 1위를 차지했습니다."
      },
      {
        song: "TOKIO",
        artist: "沢田研二",
        album: "Single",
        releaseDate: "1980.03.21",
        genres: ["J-Pop", "New Wave", "Glam Rock"],
        description: "줄리(沢田研二)의 대표곡으로 일본 뉴웨이브 팝의 선구자적 작품입니다."
      }
    ],
    "1989": [
      {
        song: "人魚",
        artist: "岡村靖幸",
        album: "DATE",
        releaseDate: "1989.06.01",
        genres: ["J-Pop", "Funk", "R&B"],
        description: "일본 펑크 팝의 기인 오카무라 야스유키의 대표작. 독특한 세계관과 중독성 강한 그루브가 특징입니다."
      },
      {
        song: "True Blue",
        artist: "Wink",
        album: "Especially for You",
        releaseDate: "1989",
        genres: ["J-Pop", "Eurobeat", "Synth-pop"],
        description: "Wink의 유로비트 팝. 1989년 일본 아이돌 씬을 대표하는 그룹의 인기곡입니다."
      }
    ]
  },
  "Brazil": {
    "1962": [
      {
        song: "Garota de Ipanema",
        artist: "Astrud Gilberto & João Gilberto",
        album: "Getz/Gilberto",
        releaseDate: "1964.03.25",
        genres: ["Bossa Nova", "Jazz"],
        description: "세상에서 가장 많이 커버된 곡 중 하나. 이파네마 해변의 아름다운 여인을 노래한 보사노바의 정수입니다."
      }
    ],
    "1993": [
      {
        song: "Zombies",
        artist: "Sepultura",
        album: "Chaos A.D.",
        releaseDate: "1993.09.21",
        genres: ["Thrash Metal", "Groove Metal"],
        description: "브라질을 대표하는 메탈 밴드 Sepultura의 걸작. 브라질 원주민 음악을 금속 사운드와 융합했습니다."
      }
    ]
  },
  "Jamaica": {
    "1973": [
      {
        song: "No Woman No Cry",
        artist: "Bob Marley & The Wailers",
        album: "Natty Dread",
        releaseDate: "1974.10.25",
        genres: ["Reggae", "Roots Reggae"],
        description: "밥 말리의 가장 사랑받는 곡 중 하나. 고난 속에서도 희망을 노래하는 레게의 영혼을 담았습니다."
      },
      {
        song: "Pressure Drop",
        artist: "Toots and the Maytals",
        album: "Funky Kingston",
        releaseDate: "1969 (재수록 1973)",
        genres: ["Reggae", "Ska", "Rocksteady"],
        description: "레게를 세계에 알린 선구자 Toots Hibbert의 대표작. 경쾌한 리듬과 강렬한 보컬이 특징입니다."
      }
    ]
  },
  "Nigeria": {
    "1977": [
      {
        song: "Zombie",
        artist: "Fela Kuti",
        album: "Zombie",
        releaseDate: "1977",
        genres: ["Afrobeat", "Funk", "Jazz"],
        description: "아프로비트의 창시자 펠라 쿠티가 나이지리아 군부를 신랄하게 비판한 정치적 걸작입니다."
      },
      {
        song: "Johnny Just Drop",
        artist: "Fela Kuti",
        album: "Confusion",
        releaseDate: "1975",
        genres: ["Afrobeat", "Funk"],
        description: "라고스 도시 생활의 혼란을 담은 펠라 쿠티의 곡. 길게 뻗은 그루브가 특징입니다."
      }
    ]
  }
};
