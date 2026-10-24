import { LocalizedString } from '../types';

export interface LeaderGeoMeta {
  lat: number;
  lng: number;
  reignStartYear: number;
  reignEndYear: number;
  capital: LocalizedString;
  territoryName: LocalizedString;
}

export const LEADER_GEO_REGISTRY: Record<string, LeaderGeoMeta> = {
  // 1. ANCIENT
  'julius-caesar': {
    lat: 41.9028,
    lng: 12.4964,
    reignStartYear: -49,
    reignEndYear: -44,
    capital: { uz: "Rim", en: "Rome", ru: "Рим", zh: "罗马", es: "Roma", fr: "Rome", ja: "ローマ", ar: "روما", tr: "Roma", ko: "로마" },
    territoryName: { uz: "Rim Respublikasi va O'rtayer Dengizi", en: "Roman Republic & Mediterranean", ru: "Римская Республика", zh: "罗马共和国与地中海疆域", es: "República Romana", fr: "République romaine", ja: "ローマ共和国", ar: "الجمهورية الرومانية وحوض المتوسط", tr: "Roma Cumhuriyeti ve Akdeniz", ko: "로마 공화정과 지중해" }
  },
  'alexander-the-great': {
    lat: 40.7583,
    lng: 22.5222,
    reignStartYear: -336,
    reignEndYear: -323,
    capital: { uz: "Pella / Bobil", en: "Pella / Babylon", ru: "Пелла / Вавилон", zh: "佩拉 / 巴比伦", es: "Pella / Babilonia", fr: "Pella / Babylone", ja: "ペラ / バビロン", ar: "بيلا / بابل", tr: "Pella / Babil", ko: "펠라 / 바빌론" },
    territoryName: { uz: "Makedoniya Imperiyasi (Yunonistondan Hindistongacha)", en: "Macedonian Empire (Greece to India)", ru: "Македонская Империя", zh: "马其顿帝国（横跨欧亚非）", es: "Imperio Macedonio", fr: "Empire macédonien", ja: "マケドニア帝国", ar: "الإمبراطورية المقدونية العظمى", tr: "Büyük Makedonya İmparatorluğu", ko: "마케도니아 제국" }
  },
  'cyrus-the-great': {
    lat: 30.1983,
    lng: 53.1783,
    reignStartYear: -559,
    reignEndYear: -530,
    capital: { uz: "Pasargad", en: "Pasargadae", ru: "Пасаргады", zh: "帕萨尔加德", es: "Pasargada", fr: "Pasargades", ja: "パサルガダエ", ar: "باسارغاد", tr: "Pasargad", ko: "파사르가다에" },
    territoryName: { uz: "Ahamoniylar Saltanati (Fors)", en: "Achaemenid Persian Empire", ru: "Держава Ахеменидов", zh: "阿契美尼德波斯帝国", es: "Imperio Persa Aqueménida", fr: "Empire perse achéménide", ja: "アケメネス朝ペルシア", ar: "الإمبراطورية الفارسية الأخمينية", tr: "Ahameniş Pers İmparatorluğu", ko: "아케메네스 페르시아 제국" }
  },
  'qin-shi-huang': {
    lat: 34.3416,
    lng: 108.7075,
    reignStartYear: -221,
    reignEndYear: -210,
    capital: { uz: "Syan'yan", en: "Xianyang", ru: "Сяньян", zh: "咸阳", es: "Xianyang", fr: "Xianyang", ja: "咸陽", ar: "شيانيانغ", tr: "Xianyang", ko: "셴양" },
    territoryName: { uz: "Sin Imperiyasi (Birlashgan Xitoy)", en: "Qin Dynasty (Unified China)", ru: "Империя Цинь (Единый Китай)", zh: "大秦帝国（统一华夏）", es: "Imperio Qin (China Unificada)", fr: "Empire Qin (Chine unifiée)", ja: "秦朝（統一中国）", ar: "إمبراطورية تشين (الصين الموحدة)", tr: "Qin İmparatorluğu (Birleşik Çin)", ko: "진나라 (통일 제국)" }
  },
  'ashoka-the-great': {
    lat: 25.6093,
    lng: 85.1235,
    reignStartYear: -268,
    reignEndYear: -232,
    capital: { uz: "Pataliputra", en: "Pataliputra", ru: "Паталипутра", zh: "华氏城", es: "Pataliputra", fr: "Pataliputra", ja: "パータリプトラ", ar: "باتاليبوترا", tr: "Pataliputra", ko: "파탈리푸트라" },
    territoryName: { uz: "Maurya Imperiyasi (Hindiston)", en: "Maurya Empire (India)", ru: "Империя Маурьев", zh: "孔雀帝国（全印度）", es: "Imperio Maurya", fr: "Empire Maurya", ja: "マウリヤ朝インド", ar: "إمبراطورية موريا الهندية", tr: "Maurya İmparatorluğu", ko: "마우리아 제국" }
  },
  'ramesses-ii': {
    lat: 25.7206,
    lng: 32.6105,
    reignStartYear: -1279,
    reignEndYear: -1213,
    capital: { uz: "Pi-Ramzes / Fiva", en: "Pi-Ramesses / Thebes", ru: "Пер-Рамсес / Фивы", zh: "培尔-拉美西斯 / 底比斯", es: "Pi-Ramsés / Tebas", fr: "Pi-Ramsès / Thèbes", ja: "ペル・ラムセス / テーベ", ar: "بر-رمسيس / طيبة", tr: "Pi-Ramses / Teb", ko: "피라메세스 / 테베" },
    territoryName: { uz: "Qadimgi Misr Yangi Podsholigi", en: "New Kingdom of Ancient Egypt", ru: "Новое царство Древнего Египта", zh: "古埃及新王国时期", es: "Imperio Nuevo de Egipto", fr: "Nouvel Empire égyptien", ja: "古代エジプト新王国", ar: "المملكة المصرية الحديثة", tr: "Yeni Mısır Krallığı", ko: "고대 이집트 신왕국" }
  },
  'pericles': {
    lat: 37.9838,
    lng: 23.7275,
    reignStartYear: -461,
    reignEndYear: -429,
    capital: { uz: "Afina", en: "Athens", ru: "Афины", zh: "雅典", es: "Atenas", fr: "Athènes", ja: "アテネ", ar: "أثينا", tr: "Atina", ko: "아테네" },
    territoryName: { uz: "Afina Demokratiyasi va Delos Ittifoqi", en: "Athenian Democracy & Delian League", ru: "Афинская Демократия и Делосский союз", zh: "雅典民主国与提洛同盟", es: "Democracia Ateniense", fr: "Démocratie athénienne", ja: "アテネ民主政", ar: "الديمقراطية الأثينية وحلف ديلوس", tr: "Atina Demokrasisi ve Delos Birliği", ko: "아테네 민주정과 델로스 동맹" }
  },
  'hammurabi': {
    lat: 32.5364,
    lng: 44.4208,
    reignStartYear: -1792,
    reignEndYear: -1750,
    capital: { uz: "Bobil", en: "Babylon", ru: "Вавилон", zh: "巴比伦", es: "Babilonia", fr: "Babylone", ja: "バビロン", ar: "بابل", tr: "Babil", ko: "바빌론" },
    territoryName: { uz: "Qadimgi Bobil Saltanati (Mesopotamiya)", en: "Old Babylonian Empire (Mesopotamia)", ru: "Древний Вавилон (Месопотамия)", zh: "古巴比伦王国（美索不达米亚）", es: "Imperio Paleobabilónico", fr: "Empire paléo-babylonien", ja: "古バビロニア帝国", ar: "الإمبراطورية البابلية القديمة (بلاد الرافدين)", tr: "Eski Babil İmparatorluğu (Mezopotamya)", ko: "고바빌로니아 제국" }
  },
  'augustus-caesar': {
    lat: 41.8902,
    lng: 12.4922,
    reignStartYear: -27,
    reignEndYear: 14,
    capital: { uz: "Rim", en: "Rome", ru: "Рим", zh: "罗马", es: "Roma", fr: "Rome", ja: "ローマ", ar: "روما", tr: "Roma", ko: "로마" },
    territoryName: { uz: "Rim Imperiyasi (Pax Romana)", en: "Roman Empire (Pax Romana)", ru: "Римская Империя (Pax Romana)", zh: "罗马帝国（罗马和平）", es: "Imperio Romano", fr: "Empire romain", ja: "ローマ帝国（パクス・ロマーナ）", ar: "الإمبراطورية الرومانية الذهبية", tr: "Roma İmparatorluğu (Pax Romana)", ko: "로마 제국 (팍스 로마나)" }
  },
  'xerxes-i': {
    lat: 29.9354,
    lng: 52.8914,
    reignStartYear: -486,
    reignEndYear: -465,
    capital: { uz: "Persepol / Suza", en: "Persepolis / Susa", ru: "Персеполь / Сузы", zh: "波斯波利斯 / 苏萨", es: "Persépolis / Susa", fr: "Persépolis / Suse", ja: "ペルセポリス / スサ", ar: "برسيبوليس / سوسة", tr: "Persepolis / Susa", ko: "페르세폴리스 / 수사" },
    territoryName: { uz: "Buyuk Fors Imperiyasi", en: "Greater Persian Empire", ru: "Великая Персидская Держава", zh: "大波斯帝国", es: "Gran Imperio Persa", fr: "Grand Empire perse", ja: "ペルシア大帝国", ar: "الإمبراطورية الفارسية العظمى", tr: "Büyük Pers İmparatorluğu", ko: "대페르시아 제국" }
  },

  // 2. MEDIEVAL
  'amir-temur': {
    lat: 39.6542,
    lng: 66.9597,
    reignStartYear: 1370,
    reignEndYear: 1405,
    capital: { uz: "Samarqand", en: "Samarkand", ru: "Самарканд", zh: "撒马尔罕", es: "Samarcanda", fr: "Samarcande", ja: "サマルカンド", ar: "سمرقند", tr: "Semerkand", ko: "사마르칸트" },
    territoryName: { uz: "Temuriylar Saltanati (Turon, Eron, Kavkaz, Xuroson)", en: "Timurid Empire (Turan, Iran, Caucasus)", ru: "Империя Тимуридов (Туран, Иран, Кавказ)", zh: "帖木儿帝国（中亚与西亚）", es: "Imperio Timúrida", fr: "Empire timouride", ja: "ティムール朝（中央アジア・西アジア）", ar: "الدولة التيمورية العظمى (توران وبلاد فارس)", tr: "Timur İmparatorluğu (Turan, Horasan)", ko: "티무르 제국 (투란, 페르시아)" }
  },
  'genghis-khan': {
    lat: 47.1997,
    lng: 102.8425,
    reignStartYear: 1206,
    reignEndYear: 1227,
    capital: { uz: "Qoraqurum", en: "Karakorum", ru: "Каракорум", zh: "哈拉和林", es: "Karakorum", fr: "Karakorum", ja: "カラコルム", ar: "قراقورم", tr: "Karakurum", ko: "카라코룸" },
    territoryName: { uz: "Buyuk Mo'g'ullar Saltanati (Yevrosiyo)", en: "Mongol Empire (Eurasia)", ru: "Великая Монгольская Империя", zh: "大蒙古国（横贯欧亚大陆）", es: "Imperio Mongol (Eurasia)", fr: "Empire mongol (Eurasie)", ja: "モンゴル帝国（ユーラシア）", ar: "الإمبراطورية المغولية العظمى", tr: "Büyük Moğol İmparatorluğu", ko: "몽골 제국 (유라시아)" }
  },
  'mehmed-ii': {
    lat: 41.0082,
    lng: 28.9784,
    reignStartYear: 1451,
    reignEndYear: 1481,
    capital: { uz: "Istanbul (Konstantinopol)", en: "Istanbul (Constantinople)", ru: "Стамбул (Константинополь)", zh: "伊斯坦布尔（君士坦丁堡）", es: "Estambul (Constantinopla)", fr: "Istanbul (Constantinople)", ja: "イスタンブール", ar: "إسطنبول (القسطنطينية)", tr: "İstanbul (Kostantiniyye)", ko: "이스탄불 (콘스탄티노플)" },
    territoryName: { uz: "Usmoniylar Saltanati (Bolqon va Anadolu)", en: "Ottoman Empire (Balkans & Anatolia)", ru: "Османская Империя (Балканы и Анатолия)", zh: "奥斯曼帝国（巴尔干与小亚细亚）", es: "Imperio Otomano", fr: "Empire ottoman", ja: "オスマン帝国", ar: "الدولة العثمانية (البلقان والأناضول)", tr: "Osmanlı Devleti (Balkanlar ve Anadolu)", ko: "오스만 제국" }
  },
  'suleiman-the-magnificent': {
    lat: 41.0122,
    lng: 28.9760,
    reignStartYear: 1520,
    reignEndYear: 1566,
    capital: { uz: "Istanbul", en: "Istanbul", ru: "Стамбул", zh: "伊斯坦布尔", es: "Estambul", fr: "Istanbul", ja: "イスタンブール", ar: "إسطنبول", tr: "İstanbul", ko: "이스탄불" },
    territoryName: { uz: "Usmoniylar Saltanati Oltin Davri (3 Qit'a)", en: "Ottoman Empire (Golden Age of 3 Continents)", ru: "Османская Империя (Зенит могущества)", zh: "奥斯曼帝国鼎盛期（跨越欧亚非三洲）", es: "Imperio Otomano (Tres Continentes)", fr: "Empire ottoman à son apogée", ja: "オスマン帝国最盛期", ar: "الدولة العثمانية في أوج مجدها (سلطنة القارات الثلاث)", tr: "Osmanlı İmparatorluğu (Üç Kıta Hâkimiyeti)", ko: "오스만 제국 황금기 (3대륙)" }
  },
  'saladin': {
    lat: 31.7683,
    lng: 35.2137,
    reignStartYear: 1174,
    reignEndYear: 1193,
    capital: { uz: "Qohira / Damashq / Quddus", en: "Cairo / Damascus / Jerusalem", ru: "Каир / Дамаск / Иерусалим", zh: "开罗 / 大马士革 / 耶路撒冷", es: "El Cairo / Damasco / Jerusalén", fr: "Le Caire / Damas / Jérusalem", ja: "カイロ / ダマスカス / エルサレム", ar: "القاهرة / دمشق / القدس الشريف", tr: "Kahire / Şam / Kudüs", ko: "카이로 / 다마스쿠스 / 예루살렘" },
    territoryName: { uz: "Ayyubiylar Saltanati (Misr, Shom, Hijoz)", en: "Ayyubid Sultanate (Egypt, Levant, Hejaz)", ru: "Султанат Аюбидов (Египет, Сирия, Палестина)", zh: "阿尤布王朝（埃及、叙利亚与黎凡特）", es: "Sultanato Ayubí", fr: "Sultanat ayyoubide", ja: "アイユーブ朝", ar: "الدولة الأيوبية (مصر والشام والحجاز)", tr: "Eyyubi Sultanlığı (Mısır, Şam, Hicaz)", ko: "아이유브 왕조" }
  },
  'babur': {
    lat: 27.1767,
    lng: 78.0081,
    reignStartYear: 1526,
    reignEndYear: 1530,
    capital: { uz: "Agra / Kobul", en: "Agra / Kabul", ru: "Агра / Кабул", zh: "阿格拉 / 喀布尔", es: "Agra / Kabul", fr: "Agra / Kaboul", ja: "アーグラ / カーブル", ar: "أغرا / كابل", tr: "Agra / Kabil", ko: "아그라 / 카불" },
    territoryName: { uz: "Boburiylar Saltanati (Shimoliy Hindiston)", en: "Mughal Empire (Northern India)", ru: "Империя Великих Моголов", zh: "莫卧儿帝国（北印度）", es: "Imperio Mogol", fr: "Empire moghol", ja: "ムガル帝国（北インド）", ar: "الدولة المغولية في شبه القارة الهندية", tr: "Babür İmparatorluğu (Kuzey Hindistan)", ko: "무굴 제국 (인도)" }
  },
  'jaloliddin-manguberdi': {
    lat: 42.3167,
    lng: 59.1500,
    reignStartYear: 1220,
    reignEndYear: 1231,
    capital: { uz: "Gurgonj (Urganch) / G'azna", en: "Gurganj (Urgench) / Ghazni", ru: "Гургандж (Ургенч) / Газни", zh: "玉龙杰赤 / 加兹尼", es: "Urgench / Ghazni", fr: "Ourguentch / Ghazni", ja: "ウルゲンチ / ガズナ", ar: "جرجانية / غزنة", tr: "Gürgenç (Ürgenç) / Gazne", ko: "우르겐치 / 가즈니" },
    territoryName: { uz: "Xorazmshohlar Saltanati va Ozodlik Maydoni", en: "Khwarazmian Empire & Resistance Front", ru: "Хорезмское Государство", zh: "花剌子模王朝与抗蒙疆土", es: "Imperio Corasmio", fr: "Empire khwârezmien", ja: "ホラズム帝国", ar: "الدولة الخوارزمية وجبهة المقاومة", tr: "Harezmşahlar Devleti", ko: "호라즘 제국" }
  },
  'charlemagne': {
    lat: 50.7753,
    lng: 6.0839,
    reignStartYear: 768,
    reignEndYear: 814,
    capital: { uz: "Axen", en: "Aachen", ru: "Аахен", zh: "亚琛", es: "Aquisgrán", fr: "Aix-la-Chapelle", ja: "アーヘン", ar: "آخن", tr: "Aachen", ko: "아헨" },
    territoryName: { uz: "Franklar Imperiyasi (G'arbiy Yevropa)", en: "Carolingian Frankish Empire", ru: "Франкская Империя (Западная Европа)", zh: "法兰克加洛林帝国（西欧大陆）", es: "Imperio Carolingio", fr: "Empire carolingien", ja: "カロリング朝フランク王国", ar: "إمبراطورية الفرنجة الكارولنجية", tr: "Frank İmparatorluğu (Batı Avrupa)", ko: "카롤링거 프랑크 제국" }
  },
  'harun-al-rashid': {
    lat: 33.3152,
    lng: 44.3661,
    reignStartYear: 786,
    reignEndYear: 809,
    capital: { uz: "Bag'dod", en: "Baghdad", ru: "Багдад", zh: "巴格达", es: "Bagdad", fr: "Bagdad", ja: "バグダード", ar: "بغداد دار السلام", tr: "Bağdat", ko: "바그다드" },
    territoryName: { uz: "Abbosiylar Xalifaligi (Atlantikadan Hindistongacha)", en: "Abbasid Caliphate (Atlantic to Indus)", ru: "Аббасидский Халифат", zh: "阿拔斯哈里发帝国（横跨亚非大半）", es: "Califato Abasí", fr: "Califat abbasside", ja: "アッバース朝カリフ帝国", ar: "الخلافة العباسية (دار السلام)", tr: "Abbasi Hilafeti", ko: "아바스 칼리프국" }
  },
  'justinian-i': {
    lat: 41.0055,
    lng: 28.9768,
    reignStartYear: 527,
    reignEndYear: 565,
    capital: { uz: "Konstantinopol", en: "Constantinople", ru: "Константинополь", zh: "君士坦丁堡", es: "Constantinopla", fr: "Constantinople", ja: "コンスタンティノープル", ar: "القسطنطينية", tr: "Konstantinopolis", ko: "콘스탄티노플" },
    territoryName: { uz: "Vizantiya Imperiyasi (Sharqiy Rim)", en: "Byzantine Empire (Eastern Roman)", ru: "Византийская Империя", zh: "拜占庭帝国（东罗马）", es: "Imperio Bizantino", fr: "Empire byzantin", ja: "東ローマ（ビザンツ）帝国", ar: "الإمبراطورية البيزنطية (الرومانية الشرقية)", tr: "Bizans İmparatorluğu (Doğu Roma)", ko: "동로마 비잔티움 제국" }
  },
  'richard-the-lionheart': {
    lat: 51.5074,
    lng: -0.1278,
    reignStartYear: 1189,
    reignEndYear: 1199,
    capital: { uz: "London / Ruan", en: "London / Rouen", ru: "Лондон / Руан", zh: "伦敦 / 鲁昂", es: "Londres / Ruán", fr: "Londres / Rouen", ja: "ロンドン / ルーアン", ar: "لندن / روان", tr: "Londra / Rouen", ko: "런던 / 루앙" },
    territoryName: { uz: "Anju Imperiyasi (Angliya va G'arbiy Fransiya)", en: "Angevin Empire (England & West France)", ru: "Анжуйская Империя", zh: "金雀花安茹帝国（英格兰与西法）", es: "Imperio Angevino", fr: "Empire Plantagenêt (Angevin)", ja: "アンジュー帝国", ar: "إمبراطورية أنجو (إنجلترا وغرب فرنسا)", tr: "Anju İmparatorluğu (İngiltere)", ko: "앙주 제국 (잉글랜드와 프랑스 서부)" }
  },

  // 3. MODERN
  'ho-chi-minh': {
    lat: 21.0285,
    lng: 105.8542,
    reignStartYear: 1945,
    reignEndYear: 1969,
    capital: { uz: "Xanoy", en: "Hanoi", ru: "Ханой", zh: "河内", es: "Hanói", fr: "Hanoï", ja: "ハノイ", ar: "هانوي", tr: "Hanoi", ko: "하노이" },
    territoryName: { uz: "Vyetnam Demokratik Respublikasi", en: "Democratic Republic of Vietnam", ru: "Демократическая Республика Вьетнам", zh: "越南民主共和国", es: "República Democrática de Vietnam", fr: "République démocratique du Vietnam", ja: "ベトナム民主共和国", ar: "جمهورية فيتنام الديمقراطية", tr: "Vietnam Demokratik Cumhuriyeti", ko: "베트남 민주공화국" }
  },
  'napoleon': {
    lat: 48.8566,
    lng: 2.3522,
    reignStartYear: 1804,
    reignEndYear: 1815,
    capital: { uz: "Parij", en: "Paris", ru: "Париж", zh: "巴黎", es: "París", fr: "Paris", ja: "パリ", ar: "باريس", tr: "Paris", ko: "파리" },
    territoryName: { uz: "Birinchi Fransiya Imperiyasi", en: "First French Empire", ru: "Первая Французская Империя", zh: "法兰西第一帝国", es: "Primer Imperio Francés", fr: "Premier Empire français", ja: "フランス第一帝政", ar: "الإمبراطورية الفرنسية الأولى", tr: "Birinci Fransız İmparatorluğu", ko: "프랑스 제1제국" }
  },
  'george-washington': {
    lat: 38.9072,
    lng: -77.0369,
    reignStartYear: 1789,
    reignEndYear: 1797,
    capital: { uz: "Filadelfiya / Nyu-York / Vashington", en: "Philadelphia / New York / Washington", ru: "Филадельфия / Вашингтон", zh: "费城 / 纽约 / 华盛顿", es: "Filadelfia / Washington D.C.", fr: "Philadelphie / Washington", ja: "フィラデルフィア / ワシントン", ar: "فيلادلفيا / واشنطن العاصمة", tr: "Philadelphia / Washington", ko: "필라델피아 / 워싱턴 D.C." },
    territoryName: { uz: "Amerika Qo'shma Shtatlari (13 Shtat)", en: "United States of America (13 States)", ru: "Соединенные Штаты Америки (13 штатов)", zh: "美利坚合众国（建国十三州）", es: "Estados Unidos de América", fr: "États-Unis d'Amérique (13 États fondateurs)", ja: "アメリカ合衆国（建国13州）", ar: "الولايات المتحدة الأمريكية (المستعمرات الـ13)", tr: "Amerika Birleşik Devletleri (Kurucu 13 Eyalet)", ko: "미합중국 (건국 13개 주)" }
  },
  'abraham-lincoln': {
    lat: 38.8899,
    lng: -77.0090,
    reignStartYear: 1861,
    reignEndYear: 1865,
    capital: { uz: "Vashington", en: "Washington D.C.", ru: "Вашингтон", zh: "华盛顿哥伦比亚特区", es: "Washington D.C.", fr: "Washington D.C.", ja: "ワシントンD.C.", ar: "واشنطن العاصمة", tr: "Washington D.C.", ko: "워싱턴 D.C." },
    territoryName: { uz: "AQSh Ittifoqi (Fuqarolar Urushi Davri)", en: "The Union (American Civil War)", ru: "Союз (Гражданская война в США)", zh: "美利坚合众国（南北战争时期联邦）", es: "La Unión (Guerra Civil)", fr: "L'Union américaine", ja: "アメリカ連邦（南北戦争期）", ar: "الاتحاد الأمريكي (حقبة الحرب الأهلية)", tr: "Birleşik Devletler (İç Savaş Dönemi)", ko: "미국 연방 (남북전쟁기)" }
  },
  'ataturk': {
    lat: 39.9334,
    lng: 32.8597,
    reignStartYear: 1923,
    reignEndYear: 1938,
    capital: { uz: "Anqara", en: "Ankara", ru: "Анкара", zh: "安卡拉", es: "Ankara", fr: "Ankara", ja: "アンカラ", ar: "أنقرة", tr: "Ankara", ko: "앙카라" },
    territoryName: { uz: "Turkiya Respublikasi", en: "Republic of Turkey", ru: "Турецкая Республика", zh: "土耳其共和国", es: "República de Turquía", fr: "République de Turquie", ja: "トルコ共和国", ar: "الجمهورية التركية", tr: "Türkiye Cumhuriyeti", ko: "튀르키예 공화국" }
  },
  'churchill': {
    lat: 51.5034,
    lng: -0.1276,
    reignStartYear: 1940,
    reignEndYear: 1955,
    capital: { uz: "London", en: "London", ru: "Лондон", zh: "伦敦", es: "Londres", fr: "Londres", ja: "ロンドン", ar: "لندن", tr: "Londra", ko: "런던" },
    territoryName: { uz: "Birlashgan Qirollik va Hamdo'stlik", en: "United Kingdom & Commonwealth", ru: "Соединенное Королевство и Содружество", zh: "联合王国与大英帝国同盟", es: "Reino Unido y la Mancomunidad", fr: "Royaume-Uni et le Commonwealth", ja: "英国および連邦", ar: "المملكة المتحدة والكومنولث البريطاني", tr: "Birleşik Krallık ve Milletler Topluluğu", ko: "영국 및 영연방" }
  },
  'charles-de-gaulle': {
    lat: 48.8600,
    lng: 2.3300,
    reignStartYear: 1944,
    reignEndYear: 1969,
    capital: { uz: "Parij", en: "Paris", ru: "Париж", zh: "巴黎", es: "París", fr: "Paris", ja: "パリ", ar: "باريس", tr: "Paris", ko: "파리" },
    territoryName: { uz: "Fransiya Beshinchi Respublikasi", en: "French Fifth Republic", ru: "Французская Республика", zh: "法兰西第五共和国", es: "Quinta República Francesa", fr: "Cinquième République française", ja: "フランス第五共和政", ar: "الجمهورية الفرنسية الخامسة", tr: "Fransa Beşinci Cumhuriyeti", ko: "프랑스 제5공화국" }
  },
  'mahatma-gandhi': {
    lat: 28.6139,
    lng: 77.2090,
    reignStartYear: 1915,
    reignEndYear: 1948,
    capital: { uz: "Yangi Dehli", en: "New Delhi", ru: "Нью-Дели", zh: "新德里", es: "Nueva Delhi", fr: "New Delhi", ja: "ニューデリー", ar: "نيودلهي", tr: "Yeni Delhi", ko: "뉴델리" },
    territoryName: { uz: "Mustaqil Hindiston", en: "Independent India", ru: "Независимая Индия", zh: "独立印度", es: "India Independiente", fr: "Inde indépendante", ja: "インド連邦", ar: "الهند المستقلة", tr: "Bağımsız Hindistan", ko: "독립 인도" }
  },
  'otto-von-bismarck': {
    lat: 52.5200,
    lng: 13.4050,
    reignStartYear: 1871,
    reignEndYear: 1890,
    capital: { uz: "Berlin", en: "Berlin", ru: "Берлин", zh: "柏林", es: "Berlín", fr: "Berlin", ja: "ベルリン", ar: "برلين", tr: "Berlin", ko: "베를린" },
    territoryName: { uz: "Birlashgan Germaniya Imperiyasi", en: "German Empire (Deutsches Kaiserreich)", ru: "Германская Империя", zh: "德意志帝国", es: "Imperio Alemán", fr: "Empire allemand", ja: "ドイツ帝国", ar: "الإمبراطورية الألمانية الموحدة", tr: "Alman İmparatorluğu", ko: "독일 제국" }
  },
  'nelson-mandela': {
    lat: -25.7479,
    lng: 28.2293,
    reignStartYear: 1994,
    reignEndYear: 1999,
    capital: { uz: "Pretoriya / Keyptaun", en: "Pretoria / Cape Town", ru: "Претория / Кейптаун", zh: "比勒陀利亚 / 开普敦", es: "Pretoria / Ciudad del Cabo", fr: "Pretoria / Le Cap", ja: "プレトリア / ケープタウン", ar: "بريتوريا / كيب تاون", tr: "Pretoria / Cape Town", ko: "프리토리아 / 케이프타운" },
    territoryName: { uz: "Janubiy Afrika Respublikasi (Kamalak Xalqi)", en: "Republic of South Africa (Rainbow Nation)", ru: "Южно-Африканская Республика", zh: "南非共和国（彩虹之国）", es: "República de Sudáfrica", fr: "République d'Afrique du Sud", ja: "南アフリカ共和国（虹の国）", ar: "جمهورية جنوب أفريقيا الديمقراطية", tr: "Güney Afrika Cumhuriyeti (Gökkuşağı Ulusu)", ko: "남아프리카 공화국 (무지개 나라)" }
  }
};

// Helper function to enrich any leader with coordinates & historical years
export function enrichLeaderWithGeo<T extends { id: string; era?: string }>(leader: T): T & Partial<LeaderGeoMeta> {
  const geo = LEADER_GEO_REGISTRY[leader.id];
  if (geo) {
    return {
      ...leader,
      lat: geo.lat,
      lng: geo.lng,
      reignStartYear: geo.reignStartYear,
      reignEndYear: geo.reignEndYear,
      capital: geo.capital,
      territoryName: geo.territoryName,
    };
  }

  // Fallback defaults based on era
  const fallbackYear = leader.era === 'ancient' ? -300 : leader.era === 'medieval' ? 1200 : 1900;
  return {
    ...leader,
    lat: 30 + (leader.id.length * 3) % 25,
    lng: 40 + (leader.id.length * 7) % 50,
    reignStartYear: fallbackYear,
    reignEndYear: fallbackYear + 30,
  };
}
