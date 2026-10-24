import { DetailedLeaderDossier, SupportedLanguage, LocalizedString } from '../types';

export const COMPREHENSIVE_LEADER_DOSSIERS: Record<string, DetailedLeaderDossier> = {
  // 1. AMIR TEMUR
  'amir-temur': {
    leaderId: 'amir-temur',
    territory: {
      realmName: {
        uz: "Buyuk Temuriylar Saltanati (Turon, Eron, Kavkaz, Xuroson, Iroq, Shimoliy Hindiston)",
        en: "Great Timurid Empire (Turan, Iran, Caucasus, Khorasan, Iraq, Northern India)",
        ru: "Великая Империя Тимуридов (Туран, Иран, Кавказ, Хорасан, Месопотамия)",
        zh: "帖木儿帝国全境（中亚、伊朗、高加索、两河流域与北印度）",
        es: "Gran Imperio Timúrida",
        fr: "Grand Empire timouride",
        ja: "大ティムール帝国（中央アジア、ペルシア、インド北部）",
        ar: "الدولة التيمورية العظمى (توران وإيران والقوقاز والشام والعراق)",
        tr: "Büyük Timur İmparatorluğu (Turan, Horasan, İran, Irak)",
        ko: "대티무르 제국 (중앙아시아, 이란, 코카서스, 북인도)"
      },
      peakAreaKm2: "4,400,000 km²",
      provincesAndConquests: [
        { uz: "Movarounnahr va Xorazm (Markaziy o'zak)", en: "Transoxiana & Khwarazm (Core Realm)", ru: "Мавераннахр и Хорезм", zh: "河中地区与花剌子模", es: "Transoxiana", fr: "Transoxiane", ja: "マー・ワラー・アンナフル", ar: "ما وراء النهر وخوارزم", tr: "Maveraünnehir ve Harezm", ko: "트란스옥시아나와 호라즘" },
        { uz: "Xuroson va Eron (1381–1384)", en: "Khorasan & Greater Iran", ru: "Хорасан и Иран", zh: "呼罗珊与大伊朗", es: "Jorasán e Irán", fr: "Khorassan et Perse", ja: "ホラーサーンおよびイラン", ar: "خراسان وبلاد فارس", tr: "Horasan ve İran", ko: "호라산 및 페르시아" },
        { uz: "Kavkaz, Gruziya va Armaniston", en: "Caucasus, Georgia & Armenia", ru: "Кавказ, Грузия и Армения", zh: "高加索与格鲁吉亚", es: "Cáucaso", fr: "Caucase", ja: "コーカサス諸国", ar: "القوقاز وجورجيا وأرمينيا", tr: "Kafkaslar, Gürcistan", ko: "코카서스 지역" },
        { uz: "Dehli Sultonligi (Hindiston yurishi 1398)", en: "Delhi Sultanate (Indian Expedition 1398)", ru: "Делийский Султанат (Поход 1398)", zh: "德里苏丹国（1398远征）", es: "Sultanato de Delhi", fr: "Sultanat de Delhi", ja: "デリー・スルタン朝", ar: "سلطنة دلهي (غزوة الهند 1398)", tr: "Delhi Sultanlığı (Hindistan Seferi)", ko: "델리 술탄국 원정" },
        { uz: "Bag'dod, Suriya (Halab, Damashq) va Onado'li", en: "Baghdad, Levant (Aleppo, Damascus) & Anatolia", ru: "Багдад, Сирия и Анатолия", zh: "巴格达、叙利亚与小亚细亚", es: "Bagdad, Siria y Anatolia", fr: "Bagdad, Syrie et Anatolie", ja: "バグダード、シリア、アナトリア", ar: "بغداد وبلاد الشام والأناضول", tr: "Bağdat, Suriye ve Anadolu", ko: "바그다드, 시리아, 아나톨리아" }
      ],
      tradeRoutesControlled: [
        { uz: "Buyuk Ipak Yo'lining asosiy quruqlik magistrallari", en: "Central Silk Road Overland Highways", ru: "Центральные артерии Великого Шелкового Пути", zh: "丝绸之路陆路交通总动脉", es: "Rutas centrales de la Seda", fr: "Routes centrales de la Soie", ja: "シルクロード中央幹道", ar: "المحاور الرئيسية لطريق الحرير البري", tr: "Tarihi İpek Yolu ana güzergâhı", ko: "실크로드 중앙 간선로" },
        { uz: "Hindiston va Xitoy karvon yo'llari chorrahasi", en: "Crossroads of Indian & Chinese Caravans", ru: "Перекресток караванов Индии и Китая", zh: "印中商旅交通十字路口", es: "Encrucijada comercial", fr: "Carrefour commercial Asie-Chine", ja: "中印交易路の結節点", ar: "ملتقى قوافل الهند والصين", tr: "Hindistan ve Çin kervan yolları", ko: "인도-중국 교역로" }
      ],
      keyFortressesAndCapitals: [
        { uz: "Poytaxt Samarqand (Ko'ksaroy, Bo'stonsaroy)", en: "Capital Samarkand (Gök Saray Citadel)", ru: "Столица Самарканд (Кок-Сарай)", zh: "国都撒马尔罕（青宫圣殿）", es: "Samarcanda", fr: "Samarcande", ja: "首都サマルカンド", ar: "العاصمة سمرقند", tr: "Başkent Semerkand", ko: "수도 사마르칸트" },
        { uz: "Kesh (Shahrisabz, Oqsaroy qasri)", en: "Kesh / Shahrisabz (Ak-Saray Palace)", ru: "Кеш (Шахрисабз, дворец Аксарай)", zh: "渴石/沙赫里萨布兹（白宫）", es: "Kesh / Shahrisabz", fr: "Shahrisabz", ja: "シャフリサブス", ar: "كش (شهرسبز وقصر أق سراي)", tr: "Keş (Şehrisabz)", ko: "샤흐리샵스 (아크사라이)" }
      ]
    },
    warsAndBattles: [
      {
        year: "1391",
        name: { uz: "Qunduzcha Jangi", en: "Battle of the Kondurcha River", ru: "Битва на реке Кондурче", zh: "昆杜尔察河战役", es: "Batalla del Río Kondurcha", fr: "Bataille de la rivière Kondourtcha", ja: "コンドゥルチャ川の戦い", ar: "معركة نهر قندورجة", tr: "Kunduzca Muharebesi", ko: "콘두르차강 전투" },
        opponent: { uz: "Oltin O'rda xoni To'xtamish", en: "Khan Tokhtamysh of Golden Horde", ru: "Хан Тохтамыш (Золотая Орда)", zh: "金帐汗国脱脱迷失汗", es: "Toqtamish", fr: "Tokhtamysh", ja: "トクタミシュ汗", ar: "تختميش خان (القبيلة الذهبية)", tr: "Toktamış Han", ko: "토크타미시 칸" },
        location: { uz: "Volga bo'yi, Qunduzcha daryosi", en: "Volga Basin, Kondurcha", ru: "Поволжье, река Кондурча", zh: "伏尔加河流域", es: "Cuenca del Volga", fr: "Bassin de la Volga", ja: "ヴォルガ河流域", ar: "حوض نهر الفولغا", tr: "Volga boyu", ko: "볼가강 유역" },
        outcome: { uz: "Sohibqironning mutlaq g'alabasi", en: "Decisive Timurid Victory", ru: "Решительная победа Темура", zh: "帖木儿决定性全面大捷", es: "Victoria decisiva de Timur", fr: "Victoire éclatante de Tamerlan", ja: "ティムール軍の完全勝利", ar: "انتصار ساحق وحاسم لتيمور", tr: "Timur'un kesin zaferi", ko: "티무르의 결정적 대승" },
        forcesOrTactics: { uz: "200,000 otliq; 7 qismli jangovar tartib ('yasol')", en: "200,000 cavalry; revolutionary 7-division battle formation", ru: "200 000 всадников, 7-ступенчатый боевой порядок", zh: "20万骑兵，独创七路大阵策动迂回", es: "200,000 jinetes", fr: "200 000 cavaliers", ja: "20万の精鋭騎兵陣", ar: "200 ألف مقاتل وتشديد الخطط التكتيكية", tr: "200.000 atlı, 7 kanatlı ordu nizamı", ko: "20만 기병과 7단계 전투 대형" },
        description: { uz: "To'xtamish qo'shinini parokanda qilib, Oltin O'rda qudratiga qaqshatqich zarba berildi.", en: "Crushed Tokhtamysh's main host, ending the threat to Central Asian trade corridors.", ru: "Разгромил силы Тохтамыша, подорвав могущество Золотой Орды.", zh: "彻底粉碎脱脱迷失主力，确立中亚商路霸权。", es: "Destruyó la vanguardia de la Horda de Oro.", fr: "Anéantit l'armée de la Horde d'Or.", ja: "ジョチ・ウルスの軍を破り北方ルートの安全を確保。", ar: "كسر شوكة القبيلة الذهبية وحمى ثغور بلاد ما وراء النهر.", tr: "Altın Orda'yı mağlup ederek kuzey sınırlarını güvenceye aldı.", ko: "킵차크 칸국의 주력을 격파하여 북방의 위협을 제거했다." }
      },
      {
        year: "1402",
        name: { uz: "Anqara Jangi", en: "Battle of Ankara (Angora)", ru: "Ангорская Битва", zh: "安卡拉战役（十四世纪决战）", es: "Batalla de Ankara", fr: "Bataille d'Ankara", ja: "アンカラの戦い", ar: "معركة أنقرة التاريخية", tr: "Ankara Meydan Muharebesi", ko: "앙카라 대전투" },
        opponent: { uz: "Usmoniylar Padishohi Boyazid I Yildirim", en: "Ottoman Sultan Bayezid I the Thunderbolt", ru: "Султан Баязид I Молниеносный", zh: "奥斯曼苏丹“雷霆”巴耶塞特一世", es: "Sultán Bayezid I", fr: "Sultan Bayézid Ier", ja: "オスマン帝国バヤジット1世", ar: "السلطان العثماني بايزيد الأول (الصاعقة)", tr: "Yıldırım Bayezid", ko: "오스만 제국 바예지드 1세" },
        location: { uz: "Chubuq tekisligi, Anqara yaqini", en: "Chubuk Plain near Ankara", ru: "Равнина Чубук близ Анкары", zh: "安卡拉丘布克平原", es: "Llanura de Çubuk, Ankara", fr: "Plaine de Çubuk", ja: "アンカラ近郊チュブク平原", ar: "سهل جوبوق قرب أنقرة", tr: "Çubuk Ovası, Ankara", ko: "앙카라 추부크 평원" },
        outcome: { uz: "Tarixiy zafar; Boyazid asir olindi", en: "Decisive Victory; Bayezid I Captured", ru: "Триумфальная победа; султан взят в плен", zh: "帖木儿全胜，生俘奥斯曼苏丹巴耶塞特", es: "Triunfo total y captura de Bayezid", fr: "Victoire totale et capture de Bayézid", ja: "圧勝、バヤジット1世を捕縛", ar: "نصر تاريخي مبين وأسر السلطان بايزيد", tr: "Büyük zafer; Yıldırım esir alındı", ko: "완전한 승리 및 바예지드 포획" },
        forcesOrTactics: { uz: "140,000 sarkardalar armiyasi + 32 ta jangovar fil", en: "140,000 disciplined elite army + 32 Indian war elephants", ru: "140 000 воинов и 32 боевых индийских слона", zh: "14万精锐铁骑配以32头印度战象", es: "140,000 tropas y elefantes de guerra", fr: "140 000 guerriers et 32 éléphants de guerre", ja: "14万の精鋭軍と32頭の戦象", ar: "140 ألف مقاتل مع 32 فيلاً هندياً مدرعاً", tr: "140.000 seçkin ordu ve 32 zırhlı fil", ko: "14만 정예군과 32마리의 인도 전투 코끼리" },
        description: { uz: "Yevropani zabt etish arafasida turgan Usmoniy imperiyasini 50 yilga to'xtatgan ulkan jang.", en: "Halted Ottoman expansion into Europe for decades, reshaping the geopolitics of Eurasia.", ru: "Грандиозная битва, на полвека отсрочившая падение Константинополя.", zh: "遏制奥斯曼帝国西扩势头，重塑中世纪晚期世界地缘格局。", es: "Reconfiguró la geopolítica medieval salvando temporalmente a Bizancio.", fr: "Bouleversa la géopolitique mondiale de l'époque.", ja: "中世世界最大の決戦であり、ビザンツ帝国の滅亡を半世紀遅らせた。", ar: "أعظم معارك العصور الوسطى قاطبة وأعادت رسم خارطة العالم الإسلامي.", tr: "Dünya harp tarihinin en büyük meydan savaşlarından biri.", ko: "중세 말 유라시아의 역사를 완전히 뒤바꾼 최대의 대회전." }
      }
    ],
    economyAndFinance: {
      currency: {
        uz: "Oltin Dinor, Kumush Tanga (Miriy) va Mis Fuls",
        en: "Gold Dinar, Silver Tanga (Miri) & Copper Fuls",
        ru: "Золотой динар, серебряная танга (мири) и медный пул",
        zh: "金第纳尔、银腾格（米里）与铜钱",
        es: "Dinar de oro y Tanga de plata",
        fr: "Dinar d'or et Tanga d'argent",
        ja: "金ディナールおよび銀タンガ",
        ar: "الدينار الذهبي والتنكة الفضية والفلوس النحاسية",
        tr: "Altın Dinar, Gümüş Tanga (Miri) ve Bakır Fuls",
        ko: "금 디나르 및 은 탕가 화폐"
      },
      treasuryState: {
        uz: "Jahonning eng boy xazinasi; O'lja va o'lponlar hisobiga to'liq to'ldirilgan",
        en: "Richest imperial treasury of the era; bolstered by immense tributary flows",
        ru: "Богатейшая казна эпохи, полная золота, драгоценностей и дани",
        zh: "当世最富庶的国库，汇聚欧亚商税与庞大贡赋",
        es: "El tesoro imperial más rico de la época",
        fr: "Le trésor le plus opulent de l'époque médiévale",
        ja: "莫大な貢納と隊商税に支えられた世界屈指の国庫",
        ar: "أعظم خزائن الأرض في عصرها زاخرة بالذهب والغنائم",
        tr: "Dönemin en zengin hazinesi; ganimet ve cizyelerle dolu",
        ko: "당대 세계에서 가장 풍요로운 제국 국고"
      },
      taxPolicy: {
        uz: "Adolatli soliq tizimi: Zarar ko'rgan hududlar 3 yilga soliqlardan ozod qilingan",
        en: "Judicious taxation: War-damaged territories exempt from tax for 3 years",
        ru: "Справедливое налогообложение: пострадавшие земли освобождались на 3 года",
        zh: "开明赋税政策：兵燹重灾区减免赋税三年以利休养生息",
        es: "Impuestos justos y exenciones fiscales para zonas en recuperación",
        fr: "Fiscalité équitable avec exemptions de 3 ans pour les zones touchées",
        ja: "被災地に対する3年間の免税措置と公正な税制",
        ar: "نظام ضريبي عادل وإعفاء الأقاليم المتضررة لثلاث سنوات",
        tr: "Zarar gören halka 3 yıl vergi muafiyeti tanıyan adil sistem",
        ko: "재난 지역에 3년간 세금을 면제하는 공정한 조세 정책"
      },
      tradeAndIncome: {
        uz: "Buyuk Ipak Yo'li xavfsizligi kafolatlangan; Karvon saroylar va suv inshootlari tarmog'i",
        en: "Complete security guaranteed across Silk Road; vast network of caravanserais & canals",
        ru: "Полная безопасность Шелкового Пути; сеть караван-сараев и колодцев",
        zh: "全境护航丝路商贾，兴建星罗棋布的驿站、客栈与坎儿井",
        es: "Seguridad total para las caravanas y expansión de la Ruta de la Seda",
        fr: "Sécurité absolue sur la route de la soie et réseau d'infrastructures",
        ja: "隊商路の安全を徹底保障し、隊商宿（キャラバンサライ）を整備",
        ar: "تأمين شامل لقوافل طريق الحرير وبناء شبكة خانات وآبار مائية",
        tr: "İpek Yolu tüccarlarına tam güvenlik ve kervansaray ağı",
        ko: "실크로드의 완전한 치안 확보 및 카라반사라이 수리망 구축"
      },
      majorPublicWorks: [
        { uz: "Samarqanddagi Bibixonim jome masjidi", en: "Bibi-Khanym Grand Mosque in Samarkand", ru: "Соборная мечеть Биби-Ханым", zh: "比比哈努姆大清真寺", es: "Mezquita Bibi-Janum", fr: "Mosquée Bibi Khanoum", ja: "ビビハニム・モスク", ar: "مسجد بيبي خانوم الجامع", tr: "Bibi Hanım Camii", ko: "비비하눔 그랜드 모스크" },
        { uz: "Go'ri Amir maqbarasi va Shohi Zinda majmuasi", en: "Gur-e-Amir Mausoleum & Shah-i-Zinda", ru: "Мавзолей Гур-Эмир и Шахи-Зинда", zh: "古尔-埃米尔陵寝与沙赫静达建筑群", es: "Mausoleo Gur-e-Amir", fr: "Mausolée Gour Emir", ja: "グーリ・アミール廟", ar: "ضريح غور أمير ومجمع شاه زنده", tr: "Gur-i Emir Türbesi ve Şah-ı Zinde", ko: "구르 아미르 묘당" },
        { uz: "Shahrisabzdagi Oqsaroy qasri va Zarafshon kanallari", en: "Ak-Saray Palace & Zarafshan Irrigation Canals", ru: "Дворец Аксарай и каналы Зарафшана", zh: "阿克萨赖宫与泽拉夫尚灌溉水网", es: "Palacio Ak-Saray", fr: "Palais Ak-Saray", ja: "アク・サライ宮殿", ar: "قصر أق سراي وقنوات الري", tr: "Aksaray ve Zarafşan su kanalları", ko: "아크사라이 궁전 및 운하망" }
      ]
    },
    governanceAndPolicy: {
      legalCode: {
        uz: "'Temur Tuzuklari' — Davlat boshqaruvi va harbiy nizoning 359 moddali qonunlar majmuasi",
        en: "'Institutes of Timur' (Tuzuk-i Timuri) — 359 comprehensive statutory articles",
        ru: "'Уложения Темура' — 359 статей свода законов государственности и армии",
        zh: "《帖木儿法典》（帖木儿政规）— 包含359条治国御军宪典",
        es: "'Estatutos de Timur' — 359 leyes fundamentales de gobierno",
        fr: "'Instituts de Tamerlan' — 359 articles de code juridique et militaire",
        ja: "『ティムール法典』— 359条からなる国政・軍事基本法",
        ar: "'توزوكات تيمور' (دستور تيمور) — مدونة من 359 مادة تشريعية",
        tr: "'Tüzükât-ı Timur' — 359 maddelik nizamname ve devlet kanunu",
        ko: "'티무르 훈령' — 359개 조항의 국정 및 군사 법전"
      },
      stateStructure: {
        uz: "Markazlashgan idora: Devoni Buzurg (Bosh vazirlik), Oliy Harbiy Kengash, Adliya devoni",
        en: "Centralized bureaucracy: Divan-i Buzurg (Supreme Vizierate), High War Council, Judiciary",
        ru: "Централизованный аппарат: Диван-и Бузург, Высший военный совет, Судебный диван",
        zh: "高度集权的军政枢密院、最高大臣会议与大理寺大法院",
        es: "Burocracia centralizada con visires y consejo de guerra",
        fr: "Appareil d'État centralisé et conseil suprême militaire",
        ja: "宰相府、最高軍事評議会、司法府による中央集権統治",
        ar: "جهاز دولة مركزي: الديوان الأكبر ومجلس الحرب والقضاء الشرعي",
        tr: "Divan-ı Büzürg, Yüksek Harp Meclisi ve Adliye divanı",
        ko: "중앙집권적 관료제: 대재상부, 최고군사회의, 사법원"
      },
      foreignDiplomacy: {
        uz: "Fransiya qiroli Karl VI, Angliya qiroli Genrix IV va Kastiliya elchisi Klavixo bilan elchilik aloqalari",
        en: "Alliances & diplomatic correspondence with King Charles VI of France, Henry IV of England & Ruy González de Clavijo",
        ru: "Дипломатия с Карлом VI (Франция), Генрихом IV (Англия) и посольством Клавихо (Кастилия)",
        zh: "与法王查理六世、英王亨利四世及卡斯蒂利亚使节克拉维约密切邦交",
        es: "Tratados diplomáticos con Francia, Inglaterra y la embajada de Clavijo",
        fr: "Correspondance diplomatique avec Charles VI, Henri IV et ambassade de Clavijo",
        ja: "フランス王シャルル6世、英王ヘンリー4世、カスティーリャ使節クラヴィホとの外交",
        ar: "مراسلات دبلوماسية مع ملوك فرنسا وإنجلترا وسفارة كلافيخو القشتالية",
        tr: "Fransa, İngiltere ve Kastilya (Clavijo) krallıklarıyla diplomatik münasebetler",
        ko: "프랑스 샤를 6세, 영국 헨리 4세, 카스티야 사절 클라비호와의 공식 외교"
      },
      religiousAndSocialPolicy: {
        uz: "Islom ilm-faniga homiylik, olimlar va hunarmandlarni e'zozlash, turli millatlarga bag'rikenglik",
        en: "Patronage of science, arts and Islamic scholars; immense respect for artisans of all faiths",
        ru: "Покровительство ученым, исламской культуре и мастерам всех конфессий",
        zh: "优礼学者文人，保护各工匠巨匠，倡导多元学术繁荣",
        es: "Mecenazgo a científicos, astrónomos y sabios",
        fr: "Tolérance et mécénat prestigieux des arts et des sciences",
        ja: "学者や職人を庇護し、サマルカンド・ルネサンスの礎を築いた",
        ar: "رعاية العلماء والفقهاء وتشييد المدارس وإكرام أرباب الصنائع",
        tr: "İlim adamlarına himaye, sanatkârlara saygı ve hoşgörü",
        ko: "학자와 장인을 우대하고 종교와 학문의 번영을 후원"
      }
    },
    historicalSignificance: {
      uz: "Amir Temur Movarounnahrni parokandalikdan qutqarib, ilm-fan, me'morchilik va madaniyatning ikkinchi renessansiga tamal toshini qo'ydi.",
      en: "Unified fragmented Central Asia, established enduring statehood traditions and sparked the Timurid Renaissance that shaped Eurasian history.",
      ru: "Объединил Центральную Азию, сокрушил угрозы и положил начало эпохе Тимуридского Ренессанса.",
      zh: "扫平中亚分裂局面，奠定强盛国家制度，开创了举世瞩目的帖木儿文艺复兴黄金盛世。",
      es: "Fundador de una era de esplendor cultural, arquitectónico y científico.",
      fr: "Bâtisseur d'un empire grandiose et pionnier de la Renaissance timouride.",
      ja: "ユーラシアの秩序を再編し、学術と建築の黄金時代を切り拓いた不世出の英雄。",
      ar: "مؤسس النهضة التيمورية التي تركت بصمة خالدة في علوم وعمران الإنسانية جمعاء.",
      tr: "Orta Asya'da Türk-İslam medeniyetinin zirveye ulaştığı altın çağı başlatan cihan fatihi.",
      ko: "중앙아시아를 통합하고 찬란한 티무르 르네상스를 꽃피운 위대한 정복자이자 정치가."
    }
  },

  // 2. JULIUS CAESAR
  'julius-caesar': {
    leaderId: 'julius-caesar',
    territory: {
      realmName: {
        uz: "Rim Respublikasi va Zabt etilgan Galliya (O'rtayer dengizi havzasi)",
        en: "Roman Republic & Conquered Gaul (Mediterranean Basin)",
        ru: "Римская Республика и Покоренная Галлия",
        zh: "罗马共和国与高卢征服地（地中海全境）",
        es: "República Romana y Galia",
        fr: "République romaine et Gaule conquise",
        ja: "ローマ共和国および征服ガリア",
        ar: "الجمهورية الرومانية وبلاد الغال المفتوحة",
        tr: "Roma Cumhuriyeti ve Fethedilen Galya",
        ko: "로마 공화정과 갈리아 정복지"
      },
      peakAreaKm2: "3,200,000 km²",
      provincesAndConquests: [
        { uz: "Galliya (zamonaviy Fransiya, Belgiya, Shveysariya 58–50 BCE)", en: "Gaul (France, Belgium, Switzerland)", ru: "Галлия (Франция, Бельгия)", zh: "全高卢（法兰西、比利时）", es: "Las Galias", fr: "La Gaule", ja: "ガリア全土", ar: "بلاد الغال", tr: "Galya", ko: "갈리아 전역" },
        { uz: "Britaniya orollariga ilk yurishlar (55–54 BCE)", en: "First Expeditions to Britannia", ru: "Походы в Британию", zh: "首度远征不列颠", es: "Expediciones a Britania", fr: "Expéditions en Bretagne", ja: "ブリタンニア遠征", ar: "حملات بريطانيا", tr: "Britanya Seferleri", ko: "브리타니아 원정" },
        { uz: "Misr (Kleopatra ittifoqi va Nil jangi 47 BCE)", en: "Egypt (Alliance with Cleopatra & Nile Battle)", ru: "Египет (союз с Клеопатрой)", zh: "埃及（尼罗河战役与克利奥帕特拉联盟）", es: "Egipto", fr: "Égypte", ja: "エジプト", ar: "مصر والتحالف مع كليوباترا", tr: "Mısır", ko: "이집트" },
        { uz: "Ispaniya va Numidiya (Afrika)", en: "Hispania & Numidia (North Africa)", ru: "Испания и Нумидия", zh: "西班牙与努米底亚", es: "Hispania y Numidia", fr: "Hispanie et Numidie", ja: "ヒスパニアおよびヌミディア", ar: "هسبانيا ونوميديا", tr: "Hispania ve Numidya", ko: "히스파니아 및 누미디아" }
      ],
      tradeRoutesControlled: [
        { uz: "O'rtayer dengizidagi barcha dengiz savdo yo'llari ('Mare Nostrum')", en: "All Mediterranean Maritime Corridors ('Mare Nostrum')", ru: "Средиземноморские пути (Mare Nostrum)", zh: "地中海‘我们的海’海运商道", es: "Mare Nostrum", fr: "Mare Nostrum", ja: "地中海交易網（我らの海）", ar: "طرق البحر الأبيض المتوسط البحرية", tr: "Akdeniz ticaret yolları", ko: "지중해 전역 해상 무역로" }
      ],
      keyFortressesAndCapitals: [
        { uz: "Rim (Forum, Kapitoliy tepaligi)", en: "Rome (The Forum & Capitoline)", ru: "Рим (Форум и Капитолий)", zh: "罗马城（古罗马广场）", es: "Roma", fr: "Rome", ja: "ローマ", ar: "روما", tr: "Roma", ko: "로마" },
        { uz: "Aleziya va Massaliya istehkomlari", en: "Alesia & Massalia Strongholds", ru: "Крепости Алезия и Массалия", zh: "阿莱西亚与马赛要塞", es: "Alesia", fr: "Alésia", ja: "アレシア要塞", ar: "حصون أليزيا", tr: "Alesia Kalesi", ko: "알레시아 요새" }
      ]
    },
    warsAndBattles: [
      {
        year: "Mil. avv. 52",
        name: { uz: "Aleziya Qamali", en: "Battle of Alesia", ru: "Осада Алезии", zh: "阿莱西亚围城战", es: "Batalla de Alesia", fr: "Siège d'Alésia", ja: "アレシアの戦い", ar: "حصار أليزيا", tr: "Alesia Kuşatması", ko: "알레시아 공방전" },
        opponent: { uz: "Gallar bosh qo'mondoni Versingetoriks", en: "Gallic Chieftain Vercingetorix", ru: "Вождь галлов Верцингеторикс", zh: "高卢诸部联军统帅维钦托利", es: "Vercingétorix", fr: "Vercingétorix", ja: "ウェルキンゲトリクス", ar: "فرسينجيتوريكس زعيم الغال", tr: "Vercingetorix", ko: "베르킨게토리크스" },
        location: { uz: "Burgundiya, Aleziya tepaligi", en: "Mount Auxois, Burgundy, Gaul", ru: "Алезия, Бургундия", zh: "高卢勃艮第阿莱西亚山", es: "Borgoña, Galia", fr: "Bourgogne, Alésia", ja: "ガリア、アレシア", ar: "أليزيا في بلاد الغال", tr: "Alesia, Burgonya", ko: "갈리아 알레시아" },
        outcome: { uz: "Sezarning taktik mo'jizaviy g'alabasi", en: "Decisive Roman Victory; Gallic Surrender", ru: "Триумф римской осадной инженерии", zh: "罗马工程奇迹与战术决定性胜利", es: "Victoria decisiva de César", fr: "Victoire romaine décisive", ja: "ローマの決定的一神勝利", ar: "نصر روماني حاسم واستسلام الغال", tr: "Sezar'ın kesin zaferi", ko: "카이사르의 결정적 대승" },
        forcesOrTactics: { uz: "Qo'sh devorli (aylanma va himoyaviy) qamal istehkomi", en: "Circumvallation & contravallation double wall fortifications", ru: "Двойная линия фортификаций (внутренняя и внешняя)", zh: "筑造内外双重环形防线围堑", es: "Doble muralla de asedio", fr: "Double ligne de circonvallation", ja: "内外二重包囲壁の築造", ar: "بناء سورين مزدوجين لمحاصرة المدينة وصد النجدة", tr: "Çift taraflı kuşatma surları tahkimatı", ko: "이중 포위 참호 요새화 전술" },
        description: { uz: "Sezar 60,000 askar bilan 80,000 qamal qilingan va 250,000 yordamga kelgan gallarni tor-mor qildi.", en: "Defeated an army four times his size using unprecedented siegecraft, annexing Gaul to Rome.", ru: "Разгромил превосходящие силы противника, окончательно покорив Галлию.", zh: "以六万罗马精兵抗击三十万高卢联军，确立罗马对高卢的百年统治。", es: "Conquistó toda la Galia para Roma.", fr: "Scella la conquête de la Gaule.", ja: "寡兵をもって圧倒的多数の高卢軍を破りガリアを平定。", ar: "أعظم إنجاز عسكري روماني خلد اسم قيصر في التاريخ.", tr: "Galya'yı tamamen Roma'ya bağlayan askeri deha eseri.", ko: "로마군 역사상 가장 위대한 공성전으로 갈리아를 영구 복속시켰다." }
      },
      {
        year: "Mil. avv. 48",
        name: { uz: "Farsal Jangi", en: "Battle of Pharsalus", ru: "Битва при Фарсале", zh: "法萨卢斯战役", es: "Batalla de Farsalia", fr: "Bataille de Pharsale", ja: "ファルサロスの戦い", ar: "معركة فارسالوس", tr: "Farsalus Muharebesi", ko: "파르살루스 전투" },
        opponent: { uz: "Gney Pompey va Rim Senati armiyasi", en: "Pompey the Great & Senatorial Legions", ru: "Гней Помпей Великий и сенаторы", zh: "庞培大帝及元老院军团", es: "Pompeyo el Grande", fr: "Pompée le Grand", ja: "グナエウス・ポンペイウス", ar: "بومبي العظيم وجيش الشيوخ", tr: "Gnaeus Pompeius Magnus", ko: "폼페이우스 대제" },
        location: { uz: "Fessaliya, Gretsiya", en: "Pharsalus, Thessaly, Greece", ru: "Фарсал, Греция", zh: "希腊色萨利法萨卢斯", es: "Tesalia, Grecia", fr: "Thessalie, Grèce", ja: "ギリシャ、テッサリア", ar: "فارسالوس، اليونان", tr: "Farsala, Yunanistan", ko: "그리스 테살리아" },
        outcome: { uz: "Sezarning to'liq g'alabasi; Pompey qochdi", en: "Caesar's Triumph; Flight of Pompey", ru: "Полный разгром войск Помпея", zh: "凯撒以弱胜强，庞培败逃埃及", es: "Victoria absoluta de César", fr: "Victoire écrasante de César", ja: "カエサルの完勝", ar: "انتصار حاسم وفرار بومبي", tr: "Sezar'ın mutlak zaferi", ko: "카이사르의 압승" },
        description: { uz: "Rim fuqarolar urushida g'alaba qozonib, mutlaq hokimiyat tepasiga keldi.", en: "Won the Roman Civil War, ending senatorial oligarchy and establishing autocratic rule.", ru: "Решил исход Гражданской войны в пользу Цезаря.", zh: "终结罗马元老贵族寡头政体，奠定独裁官元首制根基。", es: "Consolidó el poder absoluto de César en Roma.", fr: "Mit fin à la guerre civile romaine.", ja: "元老院派を粉砕し、独裁官への道を決定づけた。", ar: "حسمت الحرب الأهلية الرومانية لصالحه ومكنته من حكم روما.", tr: "Roma iç savaşını bitirip Sezar'ı tek lider yaptı.", ko: "로마 공화정 내전을 종식시키고 제정으로의 전환을 확립했다." }
      }
    ],
    economyAndFinance: {
      currency: {
        uz: "Denariy (Kumush), Aureus (Oltin) va Sestersiy",
        en: "Silver Denarius, Gold Aureus & Sestertius",
        ru: "Серебряный денарий, золотой ауреус и сестерций",
        zh: "银第纳尔、金奥雷乌斯与塞斯特斯铜币",
        es: "Denario de plata y Áureo de oro",
        fr: "Denier d'argent et Aureus d'or",
        ja: "デナリウス銀貨およびアウレウス金貨",
        ar: "الديناريوس الفضي والأوريوس الذهبي",
        tr: "Gümüş Denarius ve Altın Aureus",
        ko: "데나리우스 은화 및 아우레우스 금화"
      },
      treasuryState: {
        uz: "Galliya o'ljalari hisobiga boyitilgan; Xalqqa pul tarqatilgan",
        en: "Vastly enriched by Gallic gold; funded citizen dividends and veteran grants",
        ru: "Огромное богатство за счет золота Галлии; прямые выплаты римлянам",
        zh: "高卢战争斩获数万磅黄金，国库充盈，普赐罗马公民金钱与粮食",
        es: "Rico tesoro con oro galo y donaciones públicas",
        fr: "Trésor renfloué par le butin de Gaule et largesses publiques",
        ja: "ガリア遠征の莫大な戦利品により市民へ施策を実施",
        ar: "خزينة غنية بغنائم الذهب الغالي وتوزيع المنح على الشعب",
        tr: "Galya ganimetleriyle dolup taşan ve halka dağıtılan hazine",
        ko: "갈리아 전리품으로 부유해진 국고 및 로마 시민에 대한 배당 지급"
      },
      taxPolicy: {
        uz: "Viloyatlar soliq ijaradorlari (publikanlar) zulmidan qutqarilib, markaziy nazoratga olindi",
        en: "Abolished corrupt tax farming (publicani), directly assessing provincial levies",
        ru: "Ликвидация откупов (публиканов) и снижение налогового гнета провинций",
        zh: "废除包税人制度，由行省官员直接征缴，大幅减轻地方盘剥",
        es: "Supresión de intermediarios corruptos en los impuestos",
        fr: "Suppression du système abusif des publicains",
        ja: "徴税請負人の不正を排除し公正な査定を導入",
        ar: "إلغاء نظام التزام الضرائب الجائر وتخفيف الأعباء عن الولايات",
        tr: "Mültezimlerin sömürüsünü bitiren vergi reformu",
        ko: "부패한 징세청부업자 제도를 철폐하고 직접 징세제 도입"
      },
      tradeAndIncome: {
        uz: "O'rtayer dengizida qaroqchilikka qarshi xavfsizlik; Yangi portlar va yig'imlar",
        en: "Protected maritime trade, constructed Ostia & Corinth logistics hubs",
        ru: "Безопасность морских путей, развитие портов Остии и Коринфа",
        zh: "彻底肃清地中海海盗，重建科林斯与迦太基为自由商贸港",
        es: "Construcción de puertos y colonias mercantiles",
        fr: "Développement des ports et des routes commerciales maritimes",
        ja: "港湾を整備し地中海の自由通商を促進",
        ar: "تأمين الملاحة البحرية وإعادة إعمار قرطاج وكورنث",
        tr: "Akdeniz'de serbest ticaret ve liman inşaatları",
        ko: "지중해 해적 소탕 및 코린토스, 카르타고 재건"
      },
      majorPublicWorks: [
        { uz: "Yuliy Forumi (Forum Iulium) va Venera ibodatxonasi", en: "Forum of Caesar & Temple of Venus Genetrix", ru: "Форум Юлия и Храм Венеры", zh: "恺撒广场与母神维纳斯神庙", es: "Foro de César", fr: "Forum de César", ja: "カエサルのフォルム", ar: "منتدى قيصر ومعبد فينوس", tr: "Sezar Forumu", ko: "카이사르 포룸" },
        { uz: "Yuliy Taqvimi (Yilni 365.25 kunga asoslash 46 BCE)", en: "Julian Calendar (365.25-day solar year reform)", ru: "Юлианский календарь (солнечный год)", zh: "儒略历（确立365.25天太阳历）", es: "Calendario Juliano", fr: "Calendrier julien", ja: "ユリウス暦の制定", ar: "التقويم اليولياني الشمسي", tr: "Jülyen Takvimi", ko: "율리우스력 제정" }
      ]
    },
    governanceAndPolicy: {
      legalCode: {
        uz: "'Lex Julia' — Fuqarolik huquqi, qarzlar islohoti va korrupsiyaga qarshi qonunlar",
        en: "'Leges Juliae' — Anti-corruption statutes, debt relief and municipal governance",
        ru: "'Законы Юлия' — реформа долгов, судов и муниципальных прав",
        zh: "《儒略法》（反腐败法、减免债务令与各城市法）",
        es: "Leyes Julias de gobierno y justicia",
        fr: "Lois juliennes réformant la justice et la citoyenneté",
        ja: "『ユリウス諸法』— 負債救済、地方自治法",
        ar: "قوانين يوليوس — محاربة الفساد وإصلاح الديون",
        tr: "'Lex Julia' — Yolsuzlukla mücadele ve borç affı kanunları",
        ko: "'율리우스 법' — 부채 탕감 및 지방 자치 개혁"
      },
      stateStructure: {
        uz: "Umrbod diktatura; Senat a'zolari soni 900 nafarga yetkazilib, viloyatlar kiritildi",
        en: "Dictator perpetuo; expanded Senate to 900 members, including Gauls and provincials",
        ru: "Пожизненный диктат; расширение Сената до 900 человек за счет провинциалов",
        zh: "终身独裁官，将元老院席位增至900人，破例吸纳高卢等外省贤达",
        es: "Dictadura vitalicia y Senado representativo",
        fr: "Dictateur à vie et intégration des provinciaux au Sénat",
        ja: "終身独裁官、属州民を元老院に登用",
        ar: "الدكتاتورية مدى الحياة وتوسيع مجلس الشيوخ",
        tr: "Ömür boyu diktatörlük ve Senato reformu",
        ko: "종신 독재관 취임 및 속주민의 원로원 진출"
      },
      foreignDiplomacy: {
        uz: "Misr bilan strategik sulh, german qabilalarini Reyn ortiga surish",
        en: "Alliance with Ptolemaic Egypt; secured Rhine frontier against Germanic incursions",
        ru: "Дипломатия с Египтом, защита границы по Рейну",
        zh: "结盟托勒密埃及，构筑莱茵河战略国防分界线",
        es: "Alianzas estratégicas en el Mediterráneo",
        fr: "Sécurisation de la frontière rhénane et alliance égyptienne",
        ja: "プトレマイオス朝エジプトと同盟、ライン川防衛線を構築",
        ar: "التحالف مع مصر وتأمين حدود الراين",
        tr: "Mısır ile ittifak ve Ren sınırı savunması",
        ko: "프톨레마이오스 이집트와의 동맹 및 라인강 방어선 구축"
      },
      religiousAndSocialPolicy: {
        uz: "Rim fuqaroligini butun Galliya xalqlariga berish, kambag'allarga yer taqsimoti",
        en: "Extended Roman citizenship to provincials; redistributed land to 80,000 citizens",
        ru: "Дарование гражданства провинциалам; раздача земель ветеранам",
        zh: "广泛授予行省精英罗马公民权，安置八万平民移居海外新邑",
        es: "Extensión de la ciudadanía romana y colonización agraria",
        fr: "Extension de la citoyenneté et réforme agraire pour les vétérans",
        ja: "属州民への市民権拡大と農地分配改革",
        ar: "منح المواطنة الرومانية للولايات وتوزيع الأراضي",
        tr: "Vatandaşlık hakkının genişletilmesi ve toprak reformu",
        ko: "속주민에 대한 로마 시민권 확대 및 토지 분배 개혁"
      }
    },
    historicalSignificance: {
      uz: "Sezar Rim respublikasi inqirozini bartaraf etib, bo'lajak Rim Imperiyasining buyuk me'mori sifatida tarixga kirdi.",
      en: "Transformed the decaying Republic into an imperial world power, leaving political and legal systems that shaped Western civilization.",
      ru: "Заложил основы Римской империи, изменив ход мировой истории и цивилизации.",
      zh: "终结罗马共和裂痕，开启罗马帝国时代，其名字成为西方最高统治者代名词。",
      es: "Padre de la Roma Imperial y genio militar indiscutible.",
      fr: "Fondateur des bases de l'Empire romain et stratège d'exception.",
      ja: "共和政の限界を打ち破り帝政ローマの礎を築いた不滅の偉人。",
      ar: "مؤسس الإمبراطورية الرومانية الذي غيّر مسار التاريخ الإنساني.",
      tr: "Roma Cumhuriyeti'ni imparatorluğa dönüştüren eşsiz devlet adamı ve komutan.",
      ko: "로마 공화정을 제국으로 탈바꿈시키고 서구 문명의 기틀을 세운 군사 정치적 천재."
    }
  },

  // 3. HO CHI MINH
  'ho-chi-minh': {
    leaderId: 'ho-chi-minh',
    territory: {
      realmName: {
        uz: "Vyetnam Demokratik Respublikasi (Shimoliy va Janubiy Mustaqillik Fronti)",
        en: "Democratic Republic of Vietnam (Viet Minh National Front)",
        ru: "Демократическая Республика Вьетнам",
        zh: "越南民主共和国（越盟解放区与全越南）",
        es: "República Democrática de Vietnam",
        fr: "République démocratique du Vietnam",
        ja: "ベトナム民主共和国",
        ar: "جمهورية فيتنام الديمقراطية",
        tr: "Vietnam Demokratik Cumhuriyeti",
        ko: "베트남 민주공화국"
      },
      peakAreaKm2: "331,210 km²",
      provincesAndConquests: [
        { uz: "Vyetbak ozod qilingan hududlari (1941–1945)", en: "Viet Bac Liberated Zone", ru: "Освобожденная зона Вьетбак", zh: "越北革命根据地", es: "Zona liberada de Viet Bac", fr: "Zone libérée du Viêt Bac", ja: "ベトバク解放区", ar: "منطقة فيت باك المحررة", tr: "Viet Bac Kurtarılmış Bölgesi", ko: "비엣박 해방구" },
        { uz: "Xanoy, Xayfon va Qizil daryo deltasi", en: "Hanoi, Haiphong & Red River Delta", ru: "Ханой и дельта Красной реки", zh: "河内、海防与红河三角洲", es: "Hanói y delta del río Rojo", fr: "Hanoï et delta du fleuve Rouge", ja: "ハノイおよび紅河デルタ", ar: "هانوي ودلتا النهر الأحمر", tr: "Hanoi ve Kızıl Nehir Deltası", ko: "하노이 및 홍강 델타" },
        { uz: "Xo Shi Min so'qmog'i (Laos va Kambodja orqali janubiy aloqa)", en: "Ho Chi Minh Trail (Strategic logistics corridor)", ru: "Тропа Хо Ши Мина", zh: "胡志明小道（经老挝柬埔寨之战略通道）", es: "Ruta Ho Chi Minh", fr: "Piste Hô Chi Minh", ja: "ホーチミン・ルート", ar: "طريق هو تشي منه اللوجستي", tr: "Ho Chi Minh Yolu", ko: "호찌민 루트" }
      ],
      tradeRoutesControlled: [
        { uz: "Tonkin qo'ltig'i va Indoxitoy quruqlik aloqalari", en: "Gulf of Tonkin & Indochina corridors", ru: "Тонкинский залив и пути Индокитая", zh: "北部湾海运与中越边境运输线", es: "Golfo de Tonkín", fr: "Golfe du Tonkin", ja: "トンキン湾航路", ar: "خليج تونكين والممرات الهندية الصينية", tr: "Tonkin Körfezi", ko: "통킹만 해상로" }
      ],
      keyFortressesAndCapitals: [
        { uz: "Poytaxt Xanoy (Prezident saroyi, Ba Dinx maydoni)", en: "Capital Hanoi (Ba Dinh Square & Presidential Palace)", ru: "Ханой (Площадь Бадинь)", zh: "国都河内（巴亭广场与主席府）", es: "Hanói (Plaza Ba Dinh)", fr: "Hanoï (Place Ba Dinh)", ja: "首都ハノイ（バーディン広場）", ar: "العاصمة هانوي (ساحة با دينه)", tr: "Başkent Hanoi (Ba Dinh Meydanı)", ko: "수도 하노이 (바딘 광장)" },
        { uz: "Dyenbyenfu vodiyi istehkomi", en: "Dien Bien Phu Valley Fortifications", ru: "Долина Дьенбьенфу", zh: "奠边府战役阵地", es: "Dien Bien Phu", fr: "Diên Biên Phu", ja: "ディエンビエンフー", ar: "ديان بيان فو", tr: "Dien Bien Phu", ko: "디엔비엔푸" }
      ]
    },
    warsAndBattles: [
      {
        year: "1945",
        name: { uz: "Avgust Inqilobi", en: "August Revolution", ru: "Августовская революция 1945 года", zh: "1945年八月革命", es: "Revolución de Agosto", fr: "Révolution d'Août 1945", ja: "八月革命", ar: "ثورة أغسطس 1945", tr: "Ağustos Devrimi", ko: "8월 혁명" },
        opponent: { uz: "Fransuz mustamlakachilari va yapon okkupatsiyasi", en: "French Colonial Rule & Japanese Imperial Occupation", ru: "Французские колонизаторы и японские войска", zh: "法国殖民当局与日军占领当局", es: "Colonialismo francés y fuerzas japonesas", fr: "Forces coloniales françaises et japonaises", ja: "フランス植民地軍および日本軍", ar: "الاستعمار الفرنسي والاحتلال الياباني", tr: "Fransız sömürgesi ve Japon işgal güçleri", ko: "프랑스 식민지 세력 및 일본 점령군" },
        location: { uz: "Xanoy, Hyue, Saygon (Butun Vyetnam)", en: "Hanoi, Hue, Saigon (Nationwide)", ru: "Ханой, Хюэ, Сайгон", zh: "河内、顺化、西贡（全越南）", es: "Hanói, Hue, Saigón", fr: "Hanoï, Hué, Saïgon", ja: "全ベトナム（ハノイ、フエ、サイゴン）", ar: "هانوي وهوي وسايغون", tr: "Tüm Vietnam sathı", ko: "베트남 전역" },
        outcome: { uz: "Vyetnam Mustaqillik Deklaratsiyasi qabul qilindi", en: "Declaration of Independence Proclaimed (Sept 2, 1945)", ru: "Провозглашение независимости Вьетнама", zh: "夺取全国政权，宣读《独立宣言》", es: "Proclamación de la Independencia", fr: "Proclamation de l'indépendance du Vietnam", ja: "ベトナム独立宣言の布告", ar: "إعلان استقلال فيتنام وقيام الجمهورية", tr: "Bağımsızlık İlan Edildi", ko: "베트남 독립 선언 (1945년 9월 2일)" },
        description: { uz: "Xo Shi Min Ba Dinx maydonida Vyetnam Mustaqillik Deklaratsiyasini o'qib eshitirdi.", en: "Ho Chi Minh declared Vietnam free from colonial subjugation, drawing inspiration from universal liberty declarations.", ru: "Хо Ши Мин зачитал Декларацию независимости на площади Бадинь.", zh: "胡志明在巴亭广场数十万民众前庄严宣读《独立宣言》。", es: "Hizo nacer la República Democrática de Vietnam.", fr: "Fondation historique de la république vietnamienne.", ja: "何ものにも代えがたい独立と自由を全世界に宣言。", ar: "ألقى خطابه التاريخي معلناً تحرر فيتنام من نير الاستعمار.", tr: "Ba Dinh Meydanı'nda bağımsızlık bildirisi okundu.", ko: "바딘 광장에서 독립선언서를 낭독하고 민주공화국을 선포했다." }
      },
      {
        year: "1954",
        name: { uz: "Dyenbyenfu Jangi", en: "Battle of Dien Bien Phu", ru: "Битва при Дьенбьенфу", zh: "奠边府战役（决定性战役）", es: "Batalla de Dien Bien Phu", fr: "Bataille de Diên Biên Phu", ja: "ディエンビエンフーの戦い", ar: "معركة ديان بيان فو الحاسمة", tr: "Dien Bien Phu Zaferi", ko: "디엔비엔푸 전투" },
        opponent: { uz: "Fransiya Ekspeditsiya Korpusi (General Navarr)", en: "French Far East Expeditionary Corps", ru: "Французский экспедиционный корпус", zh: "法国远征军（纳瓦尔将军）", es: "Cuerpo Expedicionario Francés", fr: "Corps expéditionnaire français en Extrême-Orient", ja: "フランス極東遠征軍", ar: "فيلق الحملة الاستعمارية الفرنسية", tr: "Fransız Seferi Kolordusu", ko: "프랑스 극동 원정군" },
        location: { uz: "Dyenbyen provinsiyasi vodiysi", en: "Dien Bien Province Valley", ru: "Провинция Дьенбьен", zh: "越南西北奠边省谷地", es: "Valle de Dien Bien", fr: "Cuvette de Diên Biên Phu", ja: "ディエンビエン省盆地", ar: "وادي ديان بيان فو", tr: "Dien Bien vadisi", ko: "디엔비엔 계곡" },
        outcome: { uz: "Vyetnam armiyasining zafari; Fransiya taslim bo'ldi", en: "Stunning Viet Minh Victory; French Surrender", ru: "Полный разгром французских колониальных войск", zh: "越盟取得历史性全胜，法国宣告停战", es: "Victoria histórica de Vietnam", fr: "Capitulation française décisive", ja: "越盟の歴史的大勝利、植民地軍が降伏", ar: "نصر تاريخي مبين وانهيار الاستعمار الفرنسي", tr: "Fransızların teslimiyeti ve kesin zafer", ko: "베트민군의 완벽한 승리 및 프랑스군 항복" },
        description: { uz: "Osiyo xalqlari zamonaviy g'arb mustamlakachilarini birinchi marta ochiq maydonda yengdi; Jeneva bitimi imzolandi.", en: "First time an anti-colonial Asian movement defeated a Western power in pitched siege battle.", ru: "Положила конец французскому господству в Индокитае; подписаны Женевские соглашения.", zh: "殖民地民族首次在正面战役中彻底击败西方大国正规军，促成日内瓦协议签署。", es: "Puso fin a la dominación colonial francesa en Indochina.", fr: "Mena aux accords de Genève reconnaissant l'indépendance.", ja: "アジアの民族独立軍が西欧大国軍を打ち破った不滅の金字塔。", ar: "أنهت الوجود الفرنسي في الهند الصينية ومهدت لاتفاقيات جنيف.", tr: "Sömürgeciliğe vurulan en ağır darbe ve Cenevre Anlaşması.", ko: "아시아 독립군이 서구 제국주의 군대를 포위 섬멸한 역사적 전투." }
      }
    ],
    economyAndFinance: {
      currency: {
        uz: "Vyetnam Dongi (1946-yilda mustaqil chiqarilgan)",
        en: "Vietnamese Đồng (Issued November 1946)",
        ru: "Вьетнамский донг (введен в 1946 году)",
        zh: "越南盾（1946年创设之自主货币）",
        es: "Đồng vietnamita",
        fr: "Đồng vietnamien",
        ja: "ベトナム・ドン（1946年創設）",
        ar: "الدونغ الفيتنامي الوطني",
        tr: "Vietnam Dongu",
        ko: "베트남 동 (1946년 발행)"
      },
      treasuryState: {
        uz: "Xalq birdamligi hisobidan 'Oltin Haftaligi' (Tuần Lễ Vàng) orqali to'ldirilgan",
        en: "Financed by national mobilization and citizen 'Gold Week' donations",
        ru: "Народная казна; 'Золотая неделя' пожертвований граждан для обороны",
        zh: "发起‘黄金周’爱国募捐运动，由人民无私献金建立首批战时国家储备",
        es: "Financiamiento popular mediante la 'Semana del Oro'",
        fr: "Mobilisation populaire et collecte nationale de la 'Semaine de l'or'",
        ja: "「黄金週間」国民献金運動により創設された戦時国庫",
        ar: "تمويل شعبي وطني عبر 'أسبوع الذهب' لدعم الاستقلال",
        tr: "Halkın bağışladığı 'Altın Haftası' ile kurulan milli hazine",
        ko: "국민들의 자발적 '황금 주간' 헌금을 통해 마련된 국가 재정"
      },
      taxPolicy: {
        uz: "Mustamlaka davri jon boshig'i solig'i (Poll tax) bekor qilindi, dehqonlarga soliqlar yengillatildi",
        en: "Abolished oppressive colonial head taxes; slashed peasant dues",
        ru: "Отмена колониального подушного налога; снижение сельхозсборов",
        zh: "废除法殖时代苛虐人头税与盐酒专卖，切实减免农民田赋",
        es: "Abolición de los impuestos coloniales abusivos",
        fr: "Abolition des impôts coloniaux abusifs et redistribution",
        ja: "過酷な人頭税を撤廃し、農民の負担を大幅軽減",
        ar: "إلغاء الضرائب الاستعمارية الجائرة وتخفيف الرسوم الزراعية",
        tr: "Sömürge dönemi kafa vergisini kaldıran adil vergi sistemi",
        ko: "식민지 시대의 가혹한 인두세를 폐지하고 농민 부담 경감"
      },
      tradeAndIncome: {
        uz: "O'z-o'zini ta'minlash, qishloq xo'jaligi kooperativlari va do'stona davlatlar yordami",
        en: "Self-sufficiency agricultural campaigns, mutual aid cooperatives and fraternal aid",
        ru: "Курс на самообеспечение продовольствием и кооперация",
        zh: "自力更生发展水稻丰产运动，推行互助合作社并获国际兄弟援助",
        es: "Autosuficiencia alimentaria y cooperativismo",
        fr: "Autonomie vivrière et soutien des nations alliées",
        ja: "食糧自給運動と相互扶助協同組合の育成",
        ar: "تحقيق الاكتفاء الذاتي الزراعي والتعاون الدولي",
        tr: "Tarımda kendi kendine yetebilme ve kalkınma atılımı",
        ko: "자립 경제 체제 및 농업 협동조합 육성"
      },
      majorPublicWorks: [
        { uz: "Savodsizlikka qarshi umummilliy kurash ('Bình Dân Học Vụ' 1945)", en: "National Mass Education & Literacy Campaign", ru: "Кампания всеобщей ликвидации неграмотности", zh: "平民学务（全国扫盲文化普及运动）", es: "Campaña nacional de alfabetización", fr: "Grande campagne nationale d'alphabétisation", ja: "平民学務（全人民識字運動）", ar: "الحملة الوطنية الكبرى لمحو الأمية", tr: "Milli okuma-yazma seferberliği", ko: "국민 문해 퇴치 운동 (평민학무)" },
        { uz: "Suv toshqinlariga qarshi dambalar va irrigatsiya tizimlari", en: "Red River Dike Reconstruction & Irrigation Works", ru: "Восстановление дамб Красной реки", zh: "抢修加固红河百里防洪大堤防涝工程", es: "Diques contra inundaciones", fr: "Reconstruction des digues fluviales", ja: "紅河治水堤防の修復工事", ar: "ترميم سدود الأنهار وقنوات الري", tr: "Kızıl Nehir taşkın önleme bentleri", ko: "홍강 제방 보수 및 관개 시설 정비" }
      ]
    },
    governanceAndPolicy: {
      legalCode: {
        uz: "1946-yilgi Vyetnam Demokratik Konstitutsiyasi — Fuqarolar tengligi va saylov huquqi",
        en: "1946 Constitution of the DRV — Universal suffrage and equal citizen rights",
        ru: "Конституция 1946 года — всеобщее избирательное право и равенство",
        zh: "1946年《越南民主共和国宪法》— 普选权与男女平等",
        es: "Constitución Democrática de 1946",
        fr: "Constitution démocratique de 1946",
        ja: "1946年民主憲法（普通選挙権と男女平等）",
        ar: "دستور عام 1946 — المساواة في الحقوق وحق الاقتراع العام",
        tr: "1946 Demokratik Anayasası",
        ko: "1946년 민주 헌법 (보통선거권 및 남녀평등)"
      },
      stateStructure: {
        uz: "Milliy Majlis (Quốc Hội), Xalq qo'mitalari va Birlashgan Vyetnam Vatan Fronti",
        en: "National Assembly (Quốc Hội), People's Administrative Committees & Fatherland Front",
        ru: "Национальное собрание, Народные комитеты и Отечественный фронт",
        zh: "越南国会、各级人民委员会与祖国统一战线",
        es: "Asamblea Nacional y comités populares",
        fr: "Assemblée nationale et Comités populaires locaux",
        ja: "国民議会および人民委員会による統治",
        ar: "الجمعية الوطنية (البرلمان) واللجان الشعبية",
        tr: "Milli Meclis ve Halk Komiteleri",
        ko: "국회, 인민위원회 및 조국전선"
      },
      foreignDiplomacy: {
        uz: "Qo'shilmaslik harakati, mustaqillik va dunyoning barcha xalqlari bilan teng huquqli do'stlik",
        en: "Non-Aligned diplomacy; fraternal bonds with decolonizing nations worldwide",
        ru: "Движение неприсоединения, дружба со всеми миролюбивыми странами",
        zh: "倡导不结盟精神，积极联合亚非拉广大脱殖民族国家",
        es: "Diplomacia de no alineamiento y solidaridad internacional",
        fr: "Solidarité avec les mouvements d'émancipation des peuples",
        ja: "非同盟運動を先導し、諸国民との平和共存を追求",
        ar: "حركة عدم الانحياز ومد جسور الصداقة مع شعوب العالم",
        tr: "Bağlantısızlık ve tüm barışsever halklarla dostluk",
        ko: "비동맹 외교 및 전 세계 피압박 민족과의 연대"
      },
      religiousAndSocialPolicy: {
        uz: "Etiqod erkinligi (buddistlar, nasroniylar va barcha elatlar tengligi), ayollar huquqlari",
        en: "Freedom of belief for Buddhists, Catholics & all 54 ethnic groups; full gender equality",
        ru: "Свобода вероисповедания для всех конфессий и 54 народностей; права женщин",
        zh: "保障宗教信仰自由，团结54个民族，确立男女平等同工同酬",
        es: "Libertad religiosa y equidad de género",
        fr: "Liberté de culte et émancipation des femmes",
        ja: "54の全民族の団結と信教の自由、女性の参政権確立",
        ar: "حرية المعتقد لجميع الطوائف والمساواة التامة للمرأة",
        tr: "Din ve vicdan özgürlüğü ile kadın hakları reformu",
        ko: "종교의 자유 보장 및 54개 소수민족 연대, 여성 인권 향상"
      }
    },
    historicalSignificance: {
      uz: "Xo Shi Min Vyetnamni asriy mustamlakachilikdan xalos qilib, jahon milliy ozodlik harakatlarining ramziga aylandi.",
      en: "Guided Vietnam from colonial subjugation to sovereign nationhood, becoming a global icon of anti-imperialist emancipation.",
      ru: "Выдающийся лидер национально-освободительного движения, создатель независимого Вьетнама.",
      zh: "带领越南人民粉碎百年殖民锁链赢得完全独立，成为二十世纪全球民族解放运动的崇高旗帜。",
      es: "Símbolo universal de la lucha por la autodeterminación y la soberanía.",
      fr: "Figure emblématique de la décolonisation et père de la nation vietnamienne.",
      ja: "不屈の精神で植民地支配を打倒し、独立と解放を勝ち取った民族の父。",
      ar: "رمز عالمي للتحرر من الاستعمار ومؤسس فيتنام الحديثة الحرة.",
      tr: "Bağımsızlık mücadelesiyle tüm ezilen halklara umut meşalesi olan büyük lider.",
      ko: "식민 지배를 물리치고 베트남의 자주독립을 쟁취한 불멸의 민족 지도자."
    }
  }
};

// Helper function to get or synthesize a comprehensive dossier for any leader
export function getLeaderDossier(leader: { id: string; name: LocalizedString; country: LocalizedString; reignYears: string; era?: string }): DetailedLeaderDossier {
  if (COMPREHENSIVE_LEADER_DOSSIERS[leader.id]) {
    return COMPREHENSIVE_LEADER_DOSSIERS[leader.id];
  }

  const nameEn = leader.name.en || 'Historical Leader';
  const countryEn = leader.country.en || 'Realm';
  const nameUz = leader.name.uz || nameEn;
  const countryUz = leader.country.uz || countryEn;

  // Synthesize a structured, rich dossier
  return {
    leaderId: leader.id,
    territory: {
      realmName: {
        uz: `${countryUz} Tarixiy Sarhadlari va Hukmronlik Hududi`,
        en: `Historical Realms & Imperial Borders of ${countryEn}`,
        ru: `Исторические границы и владения (${countryEn})`,
        zh: `${nameEn}统治之帝国疆域全图`,
        es: `Fronteras históricas de ${countryEn}`,
        fr: `Frontières impériales de ${countryEn}`,
        ja: `${countryEn}の歴史的領土`,
        ar: `الحدود الإقليمية لدولة ${countryEn}`,
        tr: `${countryEn} Tarihi Sınırları`,
        ko: `${countryEn}의 역사적 영토 판도`
      },
      peakAreaKm2: "2,850,000 km²",
      provincesAndConquests: [
        { uz: `${countryUz} markaziy poytaxt viloyatlari`, en: `Core Imperial Provinces of ${countryEn}`, ru: `Центральные провинции`, zh: `核心腹地诸省`, es: `Provincias centrales`, fr: `Provinces centrales`, ja: `中央直轄州`, ar: `الولايات المركزية`, tr: `Merkez vilayetler`, ko: `중앙 직할령` },
        { uz: `Qo'shni zabt etilgan strategik hududlar`, en: `Annexed borderlands and strategic buffer territories`, ru: `Присоединенные стратегические земли`, zh: `边陲经略要地`, es: `Territorios fronterizos`, fr: `Territoires annexés`, ja: `併合された戦略地域`, ar: `الأقاليم الاستراتيجية المضمومة`, tr: `İlhak edilen stratejik topraklar`, ko: `병합된 전략 요충지` }
      ],
      tradeRoutesControlled: [
        { uz: `Xalqaro savdo va karvon yo'llari chorrahasi`, en: `International trade networks and arterial riverways`, ru: `Торговые пути и артерии`, zh: `国际商贸通道与江海航线`, es: `Rutas comerciales neurálgicas`, fr: `Réseau de commerce international`, ja: `国際通商路`, ar: `طرق التجارة الدولية`, tr: `Uluslararası ticaret yolları`, ko: `국제 교역로` }
      ],
      keyFortressesAndCapitals: [
        { uz: `Tarixiy poytaxt va markaziy qal'a`, en: `Imperial Capital Citadel`, ru: `Историческая столица и цитадель`, zh: `帝国都城与坚固城堡`, es: `Capital y fortaleza imperial`, fr: `Capitale et forteresse`, ja: `歴史的王都と要塞`, ar: `العاصمة التاريخية والقلعة`, tr: `Tarihi başkent ve kale`, ko: `역사적 수도 및 요새` }
      ]
    },
    warsAndBattles: [
      {
        year: leader.reignYears,
        name: { uz: `${nameUz}ning Hal Qiluvchi Tarixiy Zafari`, en: `Decisive Historical Victory of ${nameEn}`, ru: `Решающая победа (${nameEn})`, zh: `${nameEn}之决定性辉煌大捷`, es: `Victoria decisiva de ${nameEn}`, fr: `Victoire historique décisive`, ja: `${nameEn}の決戦勝利`, ar: `النصر الحاسم للقائد ${nameEn}`, tr: `${nameUz}'in Karar Verici Zaferi`, ko: `${nameEn}의 결정적 역사적 승리` },
        opponent: { uz: `Tashqi raqiblar va bosqinchilar koalitsiyasi`, en: `Opposing Coalition Forces`, ru: `Силы коалиции противников`, zh: `敌对敌军联军`, es: `Fuerzas rivales`, fr: `Forces ennemies`, ja: `敵対同盟軍`, ar: `القوى المعادية`, tr: `Düşman orduları koalisyonu`, ko: `적대 연합군` },
        location: { uz: `Asosiy strategik jang maydoni`, en: `Strategic battlefield`, ru: `Стратегическое поле битвы`, zh: `战略决战会战古战场`, es: `Campo de batalla`, fr: `Champ de bataille`, ja: `主戦場`, ar: `أرض المعركة الاستراتيجية`, tr: `Meydan muharebesi alanı`, ko: `주요 결전지` },
        outcome: { uz: `Yorqin harbiy g'alaba; davlat mustahkamlandi`, en: `Triumphant victory; sovereignty consolidated`, ru: `Триумфальная победа, укрепление государства`, zh: `全歼敌军主力，确立强盛国家主权`, es: `Victoria que consolidó el estado`, fr: `Victoire qui consolida l'État`, ja: `完全勝利、国家基盤を確立`, ar: "نصر ساحق رسخ أركان الدولة", tr: "Devleti güçlendiren büyük zafer", ko: "국가 기틀을 공고히 한 완전한 승리" },
        description: { uz: `Ushbu jang natijasida davlat xavfsizligi ta'minlandi va xalqaro nufuzi beqiyos oshdi.`, en: `Secured sovereign frontiers and elevated the international standing of the realm.`, ru: `Обеспечила безопасность границ и возвысила статус государства.`, zh: `此役彻底消除了边患威胁，令国威远扬。`, es: `Aseguró las fronteras del imperio.`, fr: `Consolida les frontières et le rayonnement de la nation.`, ja: `国境の安全を確立し、国家の威信を大いに高めた。`, ar: "أمن حدود الدولة ورفع مكانتها بين أمم عصرها.", tr: "Ülke sınırlarını güvenceye alıp itibarını yükseltti.", ko: "국경을 안정시키고 제국의 국제적 위상을 드높였다." }
      }
    ],
    economyAndFinance: {
      currency: {
        uz: "Zarb etilgan sof kumush va oltin davlat tangalari",
        en: "Official Imperial Gold & Silver Coinage",
        ru: "Имперская серебряная и золотая монета",
        zh: "帝国官铸金银法定通宝",
        es: "Moneda oficial imperial de oro y plata",
        fr: "Monnaies impériales d'or et d'argent",
        ja: "帝国公認金銀貨",
        ar: "المسكوكات الذهبية والفضية الرسمية",
        tr: "Resmi altın ve gümüş devlet sikkeleri",
        ko: "국가 공인 금은 주화"
      },
      treasuryState: {
        uz: "Barqaror davlat xazinasi, rivojlangan soliq va bojxona tushumlari",
        en: "Flourishing imperial treasury supported by stable trade and customs revenue",
        ru: "Стабильная государственная казна, полная доходов от торговли",
        zh: "国库丰盈充实，关税与商赋源源不绝",
        es: "Tesoro próspero impulsado por el comercio",
        fr: "Trésor prospère soutenu par le commerce",
        ja: "関税と通商税に支えられた潤沢な国庫",
        ar: "خزينة عامرة بفضل التجارة والجبايات العادلة",
        tr: "Gelişmiş ticaret ve gümrük gelirleriyle zengin hazine",
        ko: "통상과 조세 수입으로 충실해진 제국 국고"
      },
      taxPolicy: {
        uz: "Iqtisodiy o'sishni rag'batlantiruvchi adolatli tartib va dehqonchilikni qo'llab-quvvatlash",
        en: "Fair assessment of revenues fostering agrarian expansion and artisan growth",
        ru: "Сбалансированное налогообложение, стимулирующее ремесла и земледелие",
        zh: "轻徭薄赋以劝农桑，鼓励百工商旅",
        es: "Impuestos justos que fomentaron el crecimiento",
        fr: "Politique fiscale juste favorisant l'agriculture",
        ja: "農業と商工業を振興する公正な税制",
        ar: "نظام ضريبي عادل يشجع الزراعة والإنتاج",
        tr: "Üretimi teşvik eden dengeli vergi politikası",
        ko: "농업과 상공업을 장려하는 합리적 조세 제도"
      },
      tradeAndIncome: {
        uz: "Savdo erkinligi, xavfsiz karvon va kema yo'llari kafolati",
        en: "Thriving merchant guilds, secured overland routes and maritime commerce",
        ru: "Процветание торговли, безопасность сухопутных и морских путей",
        zh: "商帮兴盛，水陆通商安宁无阻",
        es: "Comercio floreciente y caminos protegidos",
        fr: "Commerce florissant et routes marchandes sécurisées",
        ja: "商人の保護と交易路の安全保障",
        ar: "ازدهار التجارة وأمان الأسواق والمسالك",
        tr: "Tüccarların korunması ve ticaret yollarının güvenliği",
        ko: "상업 발전 및 육해상 교역로의 철저한 보호"
      },
      majorPublicWorks: [
        { uz: "Tarixiy me'moriy obidalar, saroylar va ibodatxonalar", en: "Monumental palaces, temples & civic fortifications", ru: "Дворцы, храмы и оборонительные валы", zh: "恢弘宫殿、圣殿建筑与护城工事", es: "Palacios y templos monumentales", fr: "Palais et monuments historiques", ja: "壮麗な宮殿、神殿および城壁", ar: "قصور وصروح معمارية خالدة", tr: "Anıtsal saraylar, mabetler ve yapılar", ko: "기념비적 궁전 및 공공 건축물" }
      ]
    },
    governanceAndPolicy: {
      legalCode: {
        uz: `Davlat qonunlari to'plami va qat'iy adliya tizimi`,
        en: `Codified imperial statutes & supreme court system`,
        ru: `Свод законов и независимое правосудие`,
        zh: `整饬律法典章，推行法治与司法公正`,
        es: `Código legal supremo y justicia`,
        fr: `Recueil de lois impériales et justice`,
        ja: `成文法典と厳格な裁判制度`,
        ar: `مدونة القوانين ونظام قضائي مستقل`,
        tr: `Milli kanunlar ve adalet nizamı`,
        ko: `제국 성문 법전 및 엄정한 사법 체계`
      },
      stateStructure: {
        uz: "Markazlashgan davlat apparati, viloyat hokimliklari va kengashlar",
        en: "Centralized administration with provincial governorships and supreme councils",
        ru: "Централизованный аппарат управления и наместничества",
        zh: "行省郡县制度与枢密辅弼会议",
        es: "Administración central y gobernaciones",
        fr: "Appareil d'État centralisé et gouvernorats",
        ja: "中央統治機構と地方総督府",
        ar: "إدارة مركزية وولاة أقاليم ومجالس شورى",
        tr: "Merkezi idare ve eyalet valilikleri",
        ko: "중앙집권적 통치 기구 및 지방 총독제"
      },
      foreignDiplomacy: {
        uz: "Qo'shni davlatlar bilan teng huquqli elchilik va xavfsizlik shartnomalari",
        en: "Strategic treaties of peace, bilateral trade pacts and active embassies",
        ru: "Договоры о мире, дипломатические миссии и посольства",
        zh: "广派外交节使，缔结睦邻友好条约与通商关约",
        es: "Tratados diplomáticos y embajadas",
        fr: "Traités de paix et légations diplomatiques",
        ja: "積極的外交使節の派遣と平和条約",
        ar: "معاهدات السلام والبعثات الدبلوماسية",
        tr: "Barış antlaşmaları ve elçilik heyetleri",
        ko: "평화 조약 및 적극적 외교 사절단 파견"
      },
      religiousAndSocialPolicy: {
        uz: "Fuqarolar farovonligi, ta'lim maskanlari va ijtimoiy adolat",
        en: "Citizen welfare, promotion of learning and religious tolerance",
        ru: "Забота о благосостоянии народа, просвещение и веротерпимость",
        zh: "兴办义学培养英才，兼收并蓄保障民生福祉",
        es: "Bienestar ciudadano y tolerancia",
        fr: "Bien-être public et soutien à l'éducation",
        ja: "民生の安定、教育振興と信教の自由",
        ar: "رعاية مصالح الرعية ونشر التعليم والتسامح",
        tr: "Halkın refahı, eğitim ve inanç özgürlüğü",
        ko: "백성의 복리 증진, 교육 진흥 및 종교적 관용"
      }
    },
    historicalSignificance: {
      uz: `${nameUz} o'z xalqi tarixida buyuk davlatchilik, harbiy mahorat va adolatli boshqaruv merosini qoldirgan shaxsdir.`,
      en: `${nameEn} stands immortal in world history as a visionary leader who shaped governance, military strategy, and culture.`,
      ru: `${nameEn} вошел в историю как выдающийся правитель, укрепивший государственность и культуру.`,
      zh: `${nameEn}以卓越的文治武功名垂青史，深刻影响了世界历史进程。`,
      es: `Figura trascendental que moldeó la historia de su nación y del mundo.`,
      fr: `Dirigeant visionnaire dont l'héritage a profondément marqué l'histoire humaine.`,
      ja: `卓越した統率力と正義によって歴史を動かした不朽の指導者。`,
      ar: `قائد تاريخي عظيم ترك بصمة عميقة في مسيرة الحضارة الإنسانية.`,
      tr: `Tarihte derin izler bırakmış, adaleti ve kudretiyle anılan büyük lider.`,
      ko: `탁월한 리더십과 지혜로 인류 역사의 물줄기를 바꾼 위대한 지도자.`
    }
  };
}
