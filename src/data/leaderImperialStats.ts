import { LocalizedString } from '../types';

export interface LeaderImperialStats {
  territoryArea: string;
  population: LocalizedString;
  stateWealth: LocalizedString;
  capital: LocalizedString;
  militaryStrength: LocalizedString;
  supremeLaw: LocalizedString;
  nationalCurrency: LocalizedString;
}

export const LEADER_IMPERIAL_STATS_REGISTRY: Record<string, LeaderImperialStats> = {
  // 1. CHINGIZXON
  'genghis-khan': {
    territoryArea: "24,000,000 km²",
    population: {
      uz: "100+ million (Yer yuzi aholisining 25%)",
      en: "100+ million (25% of world population)",
      ru: "100+ миллионов (25% населения Земли)",
      zh: "逾1亿（当时全球总人口的25%）",
      es: "100+ millones (25% de la población mundial)",
      fr: "100+ millions (25% de la population mondiale)",
      ja: "1億人以上（世界人口の約25％）",
      ar: "أكثر من 100 مليون نسمة (25% من سكان الأرض)",
      tr: "100+ milyon (Dünya nüfusunun %25'i)",
      ko: "1억 명 이상 (당시 세계 인구의 25%)"
    },
    stateWealth: {
      uz: "Buyuk Ipak Yo'li bojxonalari, Qoraqurum oltin va kumush zaxiralari",
      en: "Silk Road customs tolls, vast gold and silver reserves of Karakorum",
      ru: "Таможенные пошлины Шелкового Пути, золотая казна Каракорума",
      zh: "掌控丝绸之路总商赋，哈拉和林万国金银库藏",
      es: "Tributos de la Ruta de la Seda y tesoros de Karakorum",
      fr: "Péages de la Route de la Soie et trésor impérial de Karakorum",
      ja: "シルクロードの関税収入とカラコルムの莫大な金銀財宝",
      ar: "مكوس طريق الحرير وخزائن قراقورم الهائلة من الذهب والفضة",
      tr: "İpek Yolu gümrük gelirleri ve Karakurum hazineleri",
      ko: "실크로드 무역 관세 독점 및 카라코룸의 막대한 금은 국고"
    },
    capital: {
      uz: "Qoraqurum (Orxon vodiysi)",
      en: "Karakorum (Orkhon Valley)",
      ru: "Каракорум (долина Орхона)",
      zh: "哈拉和林（鄂尔浑河谷）",
      es: "Karakorum",
      fr: "Karakorum",
      ja: "カラコルム（オルホン渓谷）",
      ar: "قراقورم (وادي أورخون)",
      tr: "Karakurum (Orhun Vadisi)",
      ko: "카라코룸 (오르혼 계곡)"
    },
    militaryStrength: {
      uz: "129,000 saralangan otliq tumanlar (intizomli armiya)",
      en: "129,000 elite horse archer Tumens (undefeated army)",
      ru: "129 000 отборных всадников (тумены)",
      zh: "12.9万精锐铁骑图们（无敌战阵）",
      es: "129,000 jinetes arqueros de élite",
      fr: "129 000 cavaliers d'élite (Tumens)",
      ja: "12万9千の精鋭騎馬軍団（万人隊トゥメン）",
      ar: "129 ألف مقاتل من نخبة الفرسان (أفواج التومان)",
      tr: "129.000 seçkin atlı tümen (yenilmez ordu)",
      ko: "12만 9천 명의 정예 기마 투멘 군단"
    },
    supremeLaw: {
      uz: "Buyuk Yasa kodeksi (Elchilar daxlsizligi va temir intizom)",
      en: "The Great Yassa Code (Diplomatic immunity & absolute law)",
      ru: "Великая Яса (неприкосновенность послов и закон)",
      zh: "《大扎撒》成文法典（确立使节不可侵犯神圣原则）",
      es: "Código Yassa (Inmunidad diplomática)",
      fr: "Grande Yassa (Immunité diplomatique et justice)",
      ja: "成文法『大ヤサ』（使節不可侵権と鉄の規律）",
      ar: "شريعة الياسا العظمى (حصانة الرسل والنظام الصارم)",
      tr: "Büyük Yasa Kanunnamesi (Elçi dokunulmazlığı)",
      ko: "대자사크(Yassa) 법전 (외교관 불가침 및 엄격한 법치)"
    },
    nationalCurrency: {
      uz: "Oltin va Kumush Bolish (quyma tangalar) hamda ipak pullar",
      en: "Gold & Silver Balish ingots and imperial silk notes",
      ru: "Золотые и серебряные балиши (слитки), шелковые деньги",
      zh: "定重金银铤锭（锭银锭金）与官造通商币",
      es: "Lingotes Balish de oro y plata",
      fr: "Lingots Balish d'or et d'argent",
      ja: "金銀の秤量地金（バーリシュ）および布貨",
      ar: "سبائك الباليش الذهبية والفضية",
      tr: "Altın ve Gümüş Baloş (külçe para)",
      ko: "금은 발리시 주괴 및 제국 견화 화폐"
    }
  },

  // 2. AMIR TEMUR
  'amir-temur': {
    territoryArea: "4,400,000 km²",
    population: {
      uz: "30+ million (Markaziy va Yaqin Sharq aholisi)",
      en: "30+ million (Central & Near East)",
      ru: "30+ миллионов (Средний и Ближний Восток)",
      zh: "逾3000万（中亚、西亚与北印度）",
      es: "30+ millones (Oriente Próximo y Asia Central)",
      fr: "30+ millions (Asie centrale et Proche-Orient)",
      ja: "3,000万人以上（中央アジア・西アジア）",
      ar: "أكثر من 30 مليون نسمة",
      tr: "30+ milyon (Turan, Horasan, İran)",
      ko: "3,000만 명 이상 (중앙아시아 및 서아시아)"
    },
    stateWealth: {
      uz: "Samarqand xazinasi: 35+ tonna sof oltin va javohirlar, Ipak Yo'li bojlari",
      en: "Samarkand Treasury: 35+ tons of gold, jewels & central Silk Road dues",
      ru: "Казна Самарканда: 35+ тонн золота, драгоценности и доходы Шелкового Пути",
      zh: "国库储金逾35吨，统揽中亚丝路过境巨税与四方朝贡",
      es: "Tesoro de Samarcanda: 35+ toneladas de oro y joyas",
      fr: "Trésor de Samarcande : 35+ tonnes d'or et joyaux de la Route de la Soie",
      ja: "サマルカンドの国庫：35トン以上の純金とシルクロードの莫大な関税",
      ar: "خزينة سمرقند: 35 طناً من الذهب الخالص وجواهر طريق الحرير",
      tr: "Semerkand hazinesi: 35+ ton saf altın, mücevherat ve İpek Yolu gelirleri",
      ko: "사마르칸트 국고: 35톤 이상의 순금 및 실크로드 무역 관세"
    },
    capital: {
      uz: "Samarqand (Ko'ksaroy va Bo'stonsaroy)",
      en: "Samarkand (Gök Saray & Bostan Saray)",
      ru: "Самарканд (Кок-Сарай и Бостан-Сарай)",
      zh: "国都撒马尔罕（青宫圣殿）",
      es: "Samarcanda",
      fr: "Samarcande (Palais Gök Saray)",
      ja: "サマルカンド（ギョク・サライ宮殿）",
      ar: "سمرقند (قصر كوك سراي)",
      tr: "Semerkand (Köksaray)",
      ko: "사마르칸트 (곡 사라이)"
    },
    militaryStrength: {
      uz: "200,000 sara otliq armiya (7 qismli jangovar yasol)",
      en: "200,000 elite horse cavalry (revolutionary 7-tier formation)",
      ru: "200 000 отборных воинов (7-ступенчатый боевой порядок)",
      zh: "20万铁骑劲旅（独创七路大阵与象军）",
      es: "200,000 tropas de élite",
      fr: "200 000 cavaliers d'élite (formation à 7 échelons)",
      ja: "20万の精鋭騎兵（7段階戦闘陣形「ヤソル」）",
      ar: "200 ألف مقاتل مع 32 فيلاً هندياً مدرعاً",
      tr: "200.000 seçkin ordu (7 kanatlı yasol düzeni)",
      ko: "20만 정예 기병 군단 (혁신적 7단계 야솔 대형)"
    },
    supremeLaw: {
      uz: "Temur tuzuklari ('Kuch — adolatdadir')",
      en: "Timur's Institutes ('Strength is in Justice')",
      ru: "Уложение Темура ('Сила — в справедливости')",
      zh: "《帖木儿法典》（主张“力量源于正义”）",
      es: "Estatutos de Timur ('La fuerza está en la justicia')",
      fr: "Instituts de Tamerlan ('La force est dans la justice')",
      ja: "『ティムール法典』（「力は正義にあり」）",
      ar: "توزوك تيمور ('القوة في العدالة')",
      tr: "Timur Tüzükleri ('Güç adalettedir')",
      ko: "티무르 법전 ('힘은 정의에 있다')"
    },
    nationalCurrency: {
      uz: "Oltin Dinor, Kumush Tanga (Miriy) va Mis Fuls",
      en: "Gold Dinar, Silver Tanga (Miri) & Copper Fuls",
      ru: "Золотой динар, серебряная танга (мири) и пул",
      zh: "金第纳尔、银腾格（米里）与铜钱",
      es: "Dinar de oro y Tanga de plata",
      fr: "Dinar d'or et Tanga d'argent",
      ja: "金ディナールおよび銀タンガ",
      ar: "الدينار الذهبي والتنكة الفضية",
      tr: "Altın Dinar, Gümüş Tanga (Miri)",
      ko: "금 디나르 및 은 탕가(미리)"
    }
  },

  // 3. YULIY SEZAR
  'julius-caesar': {
    territoryArea: "5,000,000 km²",
    population: {
      uz: "56+ million (Rim Respublikasi va provinsiyalari)",
      en: "56+ million (Roman Republic & provinces)",
      ru: "56+ миллионов (Римская республика)",
      zh: "逾5600万（罗马行省与同盟国）",
      es: "56+ millones",
      fr: "56+ millions",
      ja: "5,600万人以上",
      ar: "أكثر من 56 مليون نسمة",
      tr: "56+ milyon",
      ko: "5,600만 명 이상"
    },
    stateWealth: {
      uz: "Rim xazinasi (Aerarium), Galliya o'ljalari va Ispaniya oltin konlari",
      en: "Roman Treasury (Aerarium), Gallic spoils & Iberian gold mines",
      ru: "Римская казна (Aerarium), галльская дань и рудники Иберии",
      zh: "罗马国库（萨图尔努斯金库），高卢岁贡与西班牙金矿",
      es: "Tesoro romano (Aerarium) y botines de las Galias",
      fr: "Trésor public (Aerarium) et tributs des Gaules",
      ja: "ローマ国家金庫（アエラリウム）とガリア・イベリアの金鉱",
      ar: "خزينة روما (إيراريوم) وغنائم بلاد الغال ومناجم الذهب",
      tr: "Roma hazinesi (Aerarium) ve Galya ganimetleri",
      ko: "로마 공화정 국고(아이라리움) 및 갈리아 전리품"
    },
    capital: {
      uz: "Rim (Forum Romanum, Kapitoliy)",
      en: "Rome (Forum Romanum & Capitoline)",
      ru: "Рим (Римский Форум)",
      zh: "元老院之都罗马（古罗马广场）",
      es: "Roma",
      fr: "Rome (Forum romain)",
      ja: "ローマ（フォロ・ロマーノ）",
      ar: "روما (المنتدى الروماني)",
      tr: "Roma (Forum)",
      ko: "로마 (포룸 로마눔)"
    },
    militaryStrength: {
      uz: "32 ta legion (160,000 saralangan intizomli legioner)",
      en: "32 Roman Legions (160,000 highly disciplined legionaries)",
      ru: "32 легиона (160 000 дисциплинированных легионеров)",
      zh: "32个精锐罗马军团（16万全副武装重装步兵）",
      es: "32 legiones romanas (160,000 legionarios)",
      fr: "32 légions romaines (160 000 légionnaires)",
      ja: "32個ローマ軍団（16万の鉄の規律を誇る重装歩兵）",
      ar: "32 فيلقاً رومانياً (160 ألف مقاتل مدرع)",
      tr: "32 Roma lejyonu (160.000 disiplinli lejyoner)",
      ko: "32개 로마 군단 (16만 명의 정예 군단병)"
    },
    supremeLaw: {
      uz: "Rim huquqi va Yuliy qonunlari (Lex Iulia)",
      en: "Roman Law & Julian Statutes (Lex Iulia)",
      ru: "Римское право и Законы Юлия (Lex Iulia)",
      zh: "罗马法大系与尤利乌斯改革法（《尤利乌斯法》）",
      es: "Derecho Romano y Leyes Julias",
      fr: "Droit romain et lois juliennes",
      ja: "ローマ法およびユリウス法（Lex Iulia）",
      ar: "القانون الروماني وقوانين يوليوس القيصرية",
      tr: "Roma Hukuku ve Jül Kanunları",
      ko: "로마법 체계 및 율리우스 법 (Lex Iulia)"
    },
    nationalCurrency: {
      uz: "Oltin Aureus va Kumush Denariy",
      en: "Gold Aureus & Silver Denarius",
      ru: "Золотой ауреус и серебряный денарий",
      zh: "金奥里斯与银第纳里乌斯",
      es: "Áureo de oro y Denario de plata",
      fr: "Aureus d'or et Denier d'argent",
      ja: "金アウレウス貨および銀デナリウス貨",
      ar: "الأوريوس الذهبي والديناريوس الفضي",
      tr: "Altın Aureus ve Gümüş Denarius",
      ko: "금 아우레우스 및 은 데나리우스"
    }
  },

  // 4. ALEKSANDR MAKEDONSKIY
  'alexander-the-great': {
    territoryArea: "5,200,000 km²",
    population: {
      uz: "35+ million (Yunoniston, Misr, Fors va Hindiston)",
      en: "35+ million (Greece, Egypt, Persia & Indus)",
      ru: "35+ миллионов (Греция, Египет, Персия, Инд)",
      zh: "逾3500万（横跨欧亚非希腊化疆域）",
      es: "35+ millones",
      fr: "35+ millions",
      ja: "3,500万人以上",
      ar: "أكثر من 35 مليون نسمة",
      tr: "35+ milyon",
      ko: "3,500만 명 이상"
    },
    stateWealth: {
      uz: "Persepol va Bobil shohona xazinalari (120,000 talant oltin)",
      en: "Imperial treasuries of Persepolis & Babylon (120,000 gold talents)",
      ru: "Казна Персеполя и Вавилона (120 000 золотых талантов)",
      zh: "波斯波利斯与巴比伦波斯王库（12万塔兰同黄金）",
      es: "Tesoros reales de Persépolis y Babilonia",
      fr: "Trésors royaux de Persépolis et Babylone",
      ja: "ペルセポリスおよびバビロンの王室金庫（12万タラントン）",
      ar: "خزائن برسيبوليس وبابل الملكية (120 ألف تالنت من الذهب)",
      tr: "Persepolis ve Babil kraliyet hazineleri",
      ko: "페르세폴리스 및 바빌론 왕실 국고 (12만 달란트)"
    },
    capital: {
      uz: "Pella / Bobil / Aleksandriya",
      en: "Pella / Babylon / Alexandria",
      ru: "Пелла / Вавилон / Александрия",
      zh: "佩拉 / 巴比伦 / 亚历山大里亚",
      es: "Pella / Babilonia",
      fr: "Pella / Babylone",
      ja: "ペラ / バビロン",
      ar: "بيلا / بابل",
      tr: "Pella / Babil",
      ko: "펠라 / 바빌론"
    },
    militaryStrength: {
      uz: "48,000 sarkardalar falanqasi va getayrlar otliq armiyasi",
      en: "48,000 Macedonian Phalanx & Companion Heavy Cavalry",
      ru: "48 000 непобедимая фаланга и гетайры",
      zh: "4.8万马其顿方阵与伙伴重骑兵",
      es: "48,000 falangistas y caballería de compañeros",
      fr: "48 000 soldats de la Phalange macédonienne",
      ja: "4万8千のマケドニア重装ファランクスとヘタイロイ騎兵",
      ar: "48 ألف مقاتل من كتائب الفلانكس والفرسان النخبة",
      tr: "48.000 Makedon falanksı ve Hetairoi atlıları",
      ko: "4만 8천 명의 마케도니아 팔랑크스 및 헤타이로이 중기병"
    },
    supremeLaw: {
      uz: "Makedoniya harbiy nizomi va umumyunon ittifoq qonunlari",
      en: "Macedonian Royal Decrees & Pan-Hellenic League Charter",
      ru: "Македонские царские эдикты и законы Эллинского союза",
      zh: "马其顿王国御诏与科林斯同盟盟约",
      es: "Edictos reales macedonios",
      fr: "Édicts royaux macédoniens",
      ja: "マケドニア王令およびコリントス同盟規約",
      ar: "المراسيم الملكية المقدونية وميثاق الحلف الهيليني",
      tr: "Makedonya Krallık fermanları ve Helenik nizam",
      ko: "마케도니아 왕실 칙령 및 코린토스 동맹 조약"
    },
    nationalCurrency: {
      uz: "Kumush Tetradraxma va Oltin Stater",
      en: "Silver Tetradrachm & Gold Stater",
      ru: "Серебряная тетрадрахма и золотой статер",
      zh: "银四德拉克马与金斯塔特",
      es: "Tetradracma de plata y Estatero de oro",
      fr: "Tétradrachme d'argent et Statère d'or",
      ja: "銀テトラドラクマ貨および金スタテル貨",
      ar: "التترادراخما الفضية والستاتير الذهبي",
      tr: "Gümüş Tetradrahmi ve Altın Stater",
      ko: "은 테트라드라크마 및 금 스타테르"
    }
  },

  // 5. NAPOLEON BONAPARTE
  'napoleon-bonaparte': {
    territoryArea: "2,500,000 km²",
    population: {
      uz: "44+ million (Fransiya Imperiyasi va Yevropa vassalari)",
      en: "44+ million (French Empire & vassals)",
      ru: "44+ миллиона (Французская империя)",
      zh: "逾4400万（法兰西大帝国本土及附庸）",
      es: "44+ millones",
      fr: "44+ millions (Empire français)",
      ja: "4,400万人以上",
      ar: "أكثر من 44 مليون نسمة",
      tr: "44+ milyon",
      ko: "4,400만 명 이상"
    },
    stateWealth: {
      uz: "Banque de France xazinasi, Yevropa tovonlari va oltin Frank zaxirasi",
      en: "Banque de France gold reserves, war indemnities & gold Franc",
      ru: "Золотой запас Банка Франции и контрибуции Европы",
      zh: "法兰西银行黄金储备、大陆封锁贸易税与战争关税",
      es: "Reservas de oro del Banco de Francia",
      fr: "Réserves d'or de la Banque de France et franc Germinal",
      ja: "フランス銀行の金準備と大陸封鎖下の税収",
      ar: "احتياطيات بنك فرنسا الذهبية والفرنك الذهبي",
      tr: "Fransa Bankası altın rezervleri",
      ko: "프랑스 은행 금 보유고 및 대륙 봉쇄 세입"
    },
    capital: {
      uz: "Parij (Tyuilri va Versal)",
      en: "Paris (Tuileries Palace)",
      ru: "Париж (Тюильри)",
      zh: "巴黎（杜伊勒里宫）",
      es: "París",
      fr: "Paris",
      ja: "パリ（テュイルリー宮殿）",
      ar: "باريس",
      tr: "Paris",
      ko: "파리"
    },
    militaryStrength: {
      uz: "680,000 Buyuk Armiya (Grande Armée, faxriy gvardiya)",
      en: "680,000 Grande Armée (elite Imperial Guard & artillery)",
      ru: "680 000 Великая Армия (Grande Armée, Старая Гвардия)",
      zh: "68万大军团（近卫军与精良炮兵炮列）",
      es: "680,000 Grande Armée",
      fr: "680 000 Grande Armée (Vieille Garde)",
      ja: "68万の大陸軍（グランダルメ、親衛隊）",
      ar: "680 ألف جندي (الجيش العظيم والحرس الإمبراطوري)",
      tr: "680.000 Grande Armée (Büyük Ordu)",
      ko: "68만 명의 그랑드 아르메 (황실 근위대)"
    },
    supremeLaw: {
      uz: "Fuqarolik Kodeksi (Code Civil des Français)",
      en: "Napoleonic Code (Code Civil)",
      ru: "Кодекс Наполеона (Гражданский кодекс)",
      zh: "《拿破仑法典》（奠定近现代欧美民法典基石）",
      es: "Código Napoleónico",
      fr: "Code Civil (Code Napoléon)",
      ja: "『ナポレオン民法典』",
      ar: "قانون نابليون المدني",
      tr: "Napolyon Kanunnamesi (Medeni Kanun)",
      ko: "나폴레옹 민법전 (Code Civil)"
    },
    nationalCurrency: {
      uz: "Oltin Frank Germinal va Kumush tangalar",
      en: "Gold Franc Germinal & Silver coins",
      ru: "Золотой франк жерминаль",
      zh: "金法郎（热米纳尔法郎）",
      es: "Franco de oro",
      fr: "Franc Germinal",
      ja: "金フラン（ジェルミナル・フラン）",
      ar: "الفرنك الذهبي",
      tr: "Altın Fransız Frangı",
      ko: "금 제르미날 프랑"
    }
  }
};

// Universal fallback synthesizer for any leader
export function getLeaderImperialStats(leader: { id: string; name: LocalizedString; country: LocalizedString; era?: string }): LeaderImperialStats {
  if (LEADER_IMPERIAL_STATS_REGISTRY[leader.id]) {
    return LEADER_IMPERIAL_STATS_REGISTRY[leader.id];
  }

  const nameEn = leader.name.en || 'Leader';
  const countryEn = leader.country.en || 'State';
  const nameUz = leader.name.uz || nameEn;
  const countryUz = leader.country.uz || countryEn;

  const defaultArea = leader.era === 'ancient' ? "3,200,000 km²" : leader.era === 'medieval' ? "2,800,000 km²" : "1,950,000 km²";
  const defaultPop = leader.era === 'ancient' ? "20+ million" : leader.era === 'medieval' ? "25+ million" : "40+ million";

  return {
    territoryArea: defaultArea,
    population: {
      uz: `${defaultPop} (${countryUz} fuqarolari)`,
      en: `${defaultPop} citizens of ${countryEn}`,
      ru: `${defaultPop} жителей (${countryEn})`,
      zh: `逾${defaultPop}人口`,
      es: `${defaultPop} habitantes`,
      fr: `${defaultPop} habitants`,
      ja: `${defaultPop}人`,
      ar: `${defaultPop} نسمة`,
      tr: `${defaultPop} nüfus`,
      ko: `${defaultPop} 인구`
    },
    stateWealth: {
      uz: `Barqaror davlat g'aznasi, bojxona va savdo soliqlari tushumi`,
      en: `Flourishing state treasury, customs revenue & trade tariffs`,
      ru: `Стабильная казна, доходы от торговли и таможни`,
      zh: `充盈国库，依托贸易关税与国家金银储备`,
      es: `Tesoro estatal próspero y aranceles comerciales`,
      fr: `Trésor public florissant et revenus commerciaux`,
      ja: `関税収入と潤沢な国家金銀財政`,
      ar: `خزينة دولة مزدهرة وإيرادات التجارة والجمارك`,
      tr: `İstikrarlı devlet hazinesi ve ticaret gelirleri`,
      ko: `안정된 국가 재정 및 관세 무역 수입`
    },
    capital: {
      uz: `${countryUz} Bosh Poytaxti va Qasri`,
      en: `Imperial Capital of ${countryEn}`,
      ru: `Столица государства (${countryEn})`,
      zh: `${countryEn}主都与皇宫`,
      es: `Capital imperial de ${countryEn}`,
      fr: `Capitale impériale de ${countryEn}`,
      ja: `${countryEn}の首都王宮`,
      ar: `عاصمة ${countryEn} الملكية`,
      tr: `${countryEn} Başkenti`,
      ko: `${countryEn}의 제국 수도`
    },
    militaryStrength: {
      uz: `Qat'iy intizomli saralangan armiya va himoya qal'alari`,
      en: `Disciplined national army and fortified garrisons`,
      ru: `Регулярная армия и пограничные гарнизоны`,
      zh: `精锐国防兵团与要塞防御体系`,
      es: `Ejército nacional disciplinado`,
      fr: `Armée nationale disciplinée`,
      ja: `厳格な規律を誇る精鋭常備軍`,
      ar: `جيش نظامي منضبط وحصون منيعة`,
      tr: `Disiplinli ordu ve sınır kaleleri`,
      ko: `엄정한 규율의 정규 군단 및 국경 요새`
    },
    supremeLaw: {
      uz: `Davlat qonunlari to'plami va oliy adolat mezonlari`,
      en: `Supreme codified legal statutes and justice system`,
      ru: `Свод государственных законов и правосудие`,
      zh: `国家法典典章与最高司法审判制度`,
      es: `Código legal supremo`,
      fr: `Code suprême de lois et justice`,
      ja: `成文法典と最高司法制度`,
      ar: `مدونة القوانين وموازين العدالة`,
      tr: `Devlet kanunnamesi ve adalet nizamı`,
      ko: `국가 성문 법전 및 사법 체계`
    },
    nationalCurrency: {
      uz: `Zarb etilgan sof oltin va kumush davlat tangalari`,
      en: `Official imperial minted gold & silver currency`,
      ru: `Государственная золотая и серебряная монета`,
      zh: `帝国官铸足金足银货币`,
      es: `Moneda oficial de oro y plata`,
      fr: `Monnaie officielle d'or et d'argent`,
      ja: `帝国公認金銀法定通貨`,
      ar: `العملة الرسمية المسكوكة من الذهب والفضة`,
      tr: `Resmi altın ve gümüş devlet sikkeleri`,
      ko: `국가 공인 금은 주화 화폐`
    }
  };
}
