import { useState } from "react";
import Icon from "@/components/ui/icon";
type IconName = string;

// ===== ДАННЫЕ =====

const FIRST_AID_TOPICS = [
  {
    id: "general",
    title: "Общие положения",
    icon: "BookOpen",
    color: "blue",
    short: "Основные принципы оказания первой помощи, правовые основы, алгоритм действий на месте происшествия.",
    content: [
      {
        heading: "Что такое первая помощь?",
        text: "Первая помощь — это комплекс срочных мероприятий, проводимых при несчастных случаях, травмах и внезапных заболеваниях до прибытия медицинского персонала. Каждый работник предприятия обязан уметь оказать первую помощь пострадавшему.",
      },
      {
        heading: "Правовые основы",
        text: "Согласно ст. 228 ТК РФ и Приказу Минздрава № 477н, работодатель обязан организовать обучение сотрудников навыкам первой помощи. Лицо, не оказавшее помощь пострадавшему, несёт ответственность по ст. 125 УК РФ.",
      },
      {
        heading: "Универсальный алгоритм действий",
        steps: [
          "Оцените безопасность места происшествия — не подходите, если есть угроза вашей жизни",
          "Вызовите скорую помощь: 103 или 112",
          "Определите признаки жизни пострадавшего (дыхание, пульс, сознание)",
          "Устраните угрожающие жизни состояния: кровотечение, остановка дыхания",
          "Придайте пострадавшему безопасное положение",
          "Не оставляйте пострадавшего одного до приезда скорой",
        ],
      },
      {
        heading: "Что нельзя делать",
        warning: true,
        steps: [
          "Перемещать пострадавшего при подозрении на травму позвоночника",
          "Давать воду или пищу без сознания",
          "Извлекать инородные предметы из ран",
          "Оставлять пострадавшего без контроля дыхания",
        ],
      },
    ],
  },
  {
    id: "reanimation",
    title: "Реанимационные мероприятия",
    icon: "HeartPulse",
    color: "red",
    short: "Сердечно-лёгочная реанимация (СЛР): компрессии грудной клетки и искусственное дыхание.",
    content: [
      {
        heading: "Когда проводить СЛР?",
        text: "СЛР проводится при клинической смерти: отсутствие сознания, дыхания и пульса. Начинайте немедленно — каждая минута промедления снижает шансы на выживание на 10%.",
      },
      {
        heading: "Техника компрессий грудной клетки",
        steps: [
          "Уложите пострадавшего на твёрдую ровную поверхность",
          "Встаньте на колени сбоку от пострадавшего",
          "Положите основание ладони на центр груди (нижняя половина грудины)",
          "Надавливайте прямыми руками, перпендикулярно груди",
          "Глубина компрессий — 5–6 см, частота — 100–120 в минуту",
          "После 30 компрессий — 2 вдоха искусственного дыхания (соотношение 30:2)",
        ],
      },
      {
        heading: "Искусственное дыхание",
        steps: [
          "Запрокиньте голову пострадавшего, подняв подбородок",
          "Зажмите нос пострадавшего",
          "Плотно обхватите рот пострадавшего своими губами",
          "Сделайте равномерный вдох за 1 секунду",
          "Следите за подъёмом грудной клетки",
          "Дайте пассивный выдох и повторите",
        ],
      },
      {
        heading: "Прекращение реанимации",
        text: "Продолжайте СЛР до появления признаков жизни, до прибытия скорой помощи, или до полного физического истощения. Если доступен АЭД (автоматический дефибриллятор) — используйте его сразу.",
      },
    ],
  },
  {
    id: "bleeding",
    title: "Кровотечения и раны",
    icon: "Droplets",
    color: "red",
    short: "Виды кровотечений, способы остановки, правила наложения жгута и повязок.",
    content: [
      {
        heading: "Виды кровотечений",
        text: "Артериальное — алая кровь, бьёт пульсирующей струёй (опасно для жизни). Венозное — тёмная кровь, течёт равномерно. Капиллярное — кровь сочится по всей поверхности раны (наименее опасно).",
      },
      {
        heading: "Остановка артериального кровотечения",
        steps: [
          "Прижмите артерию пальцем выше места ранения",
          "Наложите жгут выше раны на 3–5 см (только на конечности)",
          "Под жгут подложите ткань или одежду",
          "Запишите время наложения жгута (максимум 1 час зимой, 2 часа летом)",
          "Наложите стерильную повязку на рану",
          "Зафиксируйте конечность и транспортируйте пострадавшего",
        ],
      },
      {
        heading: "Остановка венозного и капиллярного кровотечения",
        steps: [
          "Промойте рану чистой водой или антисептиком",
          "Наложите давящую стерильную повязку",
          "Приподнимите повреждённую конечность выше уровня сердца",
          "При промокании повязки — накладывайте новую поверх старой",
        ],
      },
      {
        heading: "Признаки большой кровопотери",
        warning: true,
        steps: [
          "Бледность кожи и слизистых",
          "Холодный липкий пот",
          "Учащённый слабый пульс",
          "Снижение давления, потемнение в глазах",
          "Потеря сознания — немедленно вызовите скорую!",
        ],
      },
    ],
  },
  {
    id: "burns",
    title: "Ожоги",
    icon: "Flame",
    color: "orange",
    short: "Термические, химические и электрические ожоги — степени, первая помощь, чего делать нельзя.",
    content: [
      {
        heading: "Степени ожогов",
        text: "I степень — покраснение и боль. II степень — пузыри с жидкостью. III степень — поражение глубоких тканей, омертвение. IV степень — обугливание. Ожоги III–IV степени требуют немедленной госпитализации.",
      },
      {
        heading: "Первая помощь при термическом ожоге",
        steps: [
          "Немедленно уберите источник тепла",
          "Охлаждайте место ожога холодной (не ледяной!) водой 15–20 минут",
          "Снимите украшения и одежду вокруг ожога (если не прилипла)",
          "Накройте стерильной повязкой или чистой тканью",
          "Дайте обезболивающее (ибупрофен, парацетамол)",
          "При ожогах более 10% тела — вызовите скорую",
        ],
      },
      {
        heading: "Химический ожог",
        steps: [
          "Смойте химическое вещество большим количеством воды (не менее 20 минут)",
          "Не нейтрализуйте кислоты щёлочами и наоборот",
          "При ожоге глаз — промывайте водой от носа к виску",
          "Вызовите скорую и сообщите о химическом агенте",
        ],
      },
      {
        heading: "Чего нельзя делать при ожогах",
        warning: true,
        steps: [
          "Прикладывать лёд — вызывает обморожение тканей",
          "Смазывать маслом, кефиром, зубной пастой",
          "Прокалывать пузыри",
          "Отрывать прилипшую одежду",
          "Туго бинтовать место ожога",
        ],
      },
    ],
  },
  {
    id: "hypothermia",
    title: "Переохлаждение",
    icon: "Snowflake",
    color: "cyan",
    short: "Общее переохлаждение и обморожение — стадии, признаки, алгоритм помощи.",
    content: [
      {
        heading: "Стадии переохлаждения",
        text: "Лёгкая — дрожь, бледность, пульс и дыхание в норме. Средняя — сонливость, замедленные реакции, пульс слабеет. Тяжёлая — потеря сознания, очень редкое дыхание, пульс еле прощупывается. Тяжёлая стадия — угроза жизни!",
      },
      {
        heading: "Первая помощь при переохлаждении",
        steps: [
          "Перенесите пострадавшего в тёплое помещение",
          "Снимите мокрую одежду и укутайте сухими одеялами",
          "Дайте тёплое (не горячее!) питьё — чай, компот",
          "Согревайте постепенно: не горячая ванна, не прямой огонь",
          "Грелки прикладывайте к шее, подмышкам, паху",
          "При потере сознания — вызовите скорую немедленно",
        ],
      },
      {
        heading: "Обморожение конечностей",
        steps: [
          "Занесите пострадавшего в тепло",
          "Снимите обувь и носки с обмороженных конечностей",
          "Поместите конечности в тёплую воду (37–40°C) на 20–30 минут",
          "Наложите стерильную повязку после отогревания",
          "Не растирайте снегом или спиртом — это повреждает сосуды",
        ],
      },
      {
        heading: "Нельзя при переохлаждении",
        warning: true,
        steps: [
          "Давать алкоголь — создаёт ложное ощущение тепла, усугубляет состояние",
          "Растирать обмороженные участки снегом или спиртом",
          "Резко погружать в горячую воду",
          "Оставлять пострадавшего без наблюдения",
        ],
      },
    ],
  },
  {
    id: "choking",
    title: "Человек подавился",
    icon: "Wind",
    color: "purple",
    short: "Инородное тело в дыхательных путях — как распознать и помочь взрослому, ребёнку, беременной.",
    content: [
      {
        heading: "Признаки полной закупорки дыхательных путей",
        text: "Пострадавший не может говорить, кашлять и дышать. Хватается за горло, лицо синеет. Действовать нужно немедленно — без кислорода через 4–6 минут наступает необратимое повреждение мозга.",
      },
      {
        heading: "Приём Геймлиха (взрослый)",
        steps: [
          "Встаньте позади пострадавшего",
          "Наклоните его вперёд, обхватите руками за талию",
          "Сожмите одну руку в кулак, большим пальцем к животу",
          "Положите кулак между пупком и рёбрами",
          "Обхватите кулак второй рукой",
          "Делайте резкие толчки внутрь и вверх до извлечения предмета",
        ],
      },
      {
        heading: "Если пострадавший без сознания",
        steps: [
          "Уложите на твёрдую поверхность на спину",
          "Вызовите скорую (103 / 112)",
          "Запрокиньте голову, осмотрите рот — если виден предмет, извлеките",
          "Если дыхания нет — начните СЛР",
          "Перед каждым вдохом осматривайте рот на наличие предмета",
        ],
      },
      {
        heading: "Особые случаи",
        text: "Беременные и тучные люди: не обхватывайте живот — надавливайте на нижнюю часть грудины. Дети до 1 года: 5 хлопков по спине между лопатками + 5 толчков в грудину. Никогда не трясите ребёнка за ноги вниз головой.",
      },
    ],
  },
  {
    id: "poisoning",
    title: "Отравления",
    icon: "AlertTriangle",
    color: "yellow",
    short: "Пищевые отравления, отравление газом, химическими веществами и алкоголем.",
    content: [
      {
        heading: "Признаки отравления",
        text: "Тошнота, рвота, боли в животе, понос — пищевое отравление. Головная боль, головокружение, потеря сознания — отравление газом. Химические ожоги рта и горла — отравление кислотами/щёлочами.",
      },
      {
        heading: "Пищевое отравление",
        steps: [
          "Вызовите скорую при тяжёлых симптомах",
          "Дайте пить большое количество воды (2–3 литра)",
          "Вызовите рвоту только при сознании и не при отравлении кислотами",
          "Дайте энтеросорбент (активированный уголь, Энтеросгель)",
          "Уложите на бок во избежание аспирации рвотных масс",
          "Согрейте пострадавшего одеялом",
        ],
      },
      {
        heading: "Отравление угарным газом (CO)",
        steps: [
          "Немедленно вынесите (вывезите) пострадавшего на свежий воздух",
          "Расстегните одежду, стесняющую дыхание",
          "Уложите в горизонтальное положение, голова набок",
          "Вызовите скорую (103 / 112)",
          "При остановке дыхания — начните СЛР",
          "Не входите в помещение без защитного средства!",
        ],
      },
      {
        heading: "Нельзя при отравлениях",
        warning: true,
        steps: [
          "Вызывать рвоту при отравлении кислотами, щёлочами, бензином",
          "Давать молоко при отравлении кислотами",
          "Оставлять без сознания пострадавшего лёжа на спине",
          "Самостоятельно промывать желудок при потере сознания",
        ],
      },
    ],
  },
  {
    id: "fractures",
    title: "Травмы конечностей",
    icon: "Bone",
    color: "gray",
    short: "Переломы, вывихи, растяжения — как распознать и правильно иммобилизовать.",
    content: [
      {
        heading: "Как отличить перелом от ушиба?",
        text: "Перелом: сильная боль, деформация конечности, невозможность движения, патологическая подвижность, хруст. Ушиб: боль при движении, отёк, гематома, но форма конечности не изменена. При любом сомнении — действуйте как при переломе.",
      },
      {
        heading: "Иммобилизация при переломе",
        steps: [
          "Вызовите скорую — не пытайтесь вправить перелом самостоятельно",
          "Зафиксируйте конечность в том положении, в котором она находится",
          "Наложите шину (доска, палка, зонт) — она должна фиксировать два соседних сустава",
          "Подложите мягкую ткань под шину",
          "Прибинтуйте шину, не передавливая сосуды",
          "При открытом переломе — сначала остановите кровотечение",
        ],
      },
      {
        heading: "Вывих",
        steps: [
          "Не пытайтесь вправить вывих самостоятельно!",
          "Зафиксируйте конечность в удобном положении",
          "Приложите холод к суставу (лёд в полотенце)",
          "Обеспечьте доставку к врачу",
        ],
      },
      {
        heading: "Растяжение связок",
        steps: [
          "Приложите холод на 15–20 минут (каждый час первые сутки)",
          "Наложите давящую эластичную повязку",
          "Приподнимите конечность выше уровня сердца",
          "Исключите нагрузку на сустав 2–3 дня",
          "При сильной боли и отёке — обратитесь к врачу",
        ],
      },
    ],
  },
];

const SAFETY_TOPICS = [
  {
    id: "basics",
    title: "Основы охраны труда",
    icon: "ShieldCheck",
    color: "navy",
    short: "Законодательная база, права и обязанности работника, СОУТ, инструктажи.",
    content: [
      {
        heading: "Законодательная база",
        text: "Охрана труда в России регулируется разделом X Трудового кодекса РФ, Федеральным законом № 426-ФЗ «О специальной оценке условий труда» и подзаконными актами Минтруда. Основная цель — сохранение жизни и здоровья работников.",
      },
      {
        heading: "Права работника в сфере охраны труда",
        steps: [
          "Рабочее место, соответствующее требованиям охраны труда",
          "Обязательное социальное страхование от несчастных случаев",
          "Получение достоверной информации об условиях труда",
          "Отказ от выполнения работ при угрозе жизни или здоровью",
          "Обеспечение СИЗ (средствами индивидуальной защиты)",
          "Внеплановый медицинский осмотр при ухудшении самочувствия",
        ],
      },
      {
        heading: "Виды инструктажей",
        steps: [
          "Вводный — при приёме на работу, проводит специалист по ОТ",
          "Первичный — на рабочем месте до начала самостоятельной работы",
          "Повторный — не реже 1 раза в 6 месяцев",
          "Внеплановый — при изменении технологии, несчастном случае",
          "Целевой — при выполнении разовых опасных работ",
        ],
      },
      {
        heading: "СОУТ — специальная оценка условий труда",
        text: "СОУТ проводится не реже одного раза в 5 лет. По результатам рабочим местам присваиваются классы: 1 (оптимальные), 2 (допустимые), 3.1–3.4 (вредные), 4 (опасные). Классы 3–4 дают право на доплаты и льготы.",
      },
    ],
  },
  {
    id: "ppe",
    title: "Средства защиты (СИЗ)",
    icon: "HardHat",
    color: "navy",
    short: "Классификация СИЗ, порядок выдачи, правила применения и хранения.",
    content: [
      {
        heading: "Что такое СИЗ?",
        text: "Средства индивидуальной защиты — технические средства, используемые для предотвращения или уменьшения воздействия вредных и опасных производственных факторов. Работодатель обязан выдавать СИЗ бесплатно.",
      },
      {
        heading: "Виды СИЗ на НПЗ",
        steps: [
          "Защита органов дыхания: респираторы, противогазы, самоспасатели",
          "Защита головы: каски, подшлемники",
          "Защита глаз и лица: очки, щитки, маски",
          "Защита рук: перчатки кислотостойкие, теплозащитные, диэлектрические",
          "Защита ног: ботинки с металлическим носком, химзащитные сапоги",
          "Защита тела: комбинезоны, жилеты со световозвращателями, фартуки",
          "Защита от падения: страховочные привязи, канаты, карабины",
        ],
      },
      {
        heading: "Правила использования СИЗ",
        steps: [
          "Применяйте СИЗ строго по назначению и инструкции",
          "Проверяйте исправность перед каждым использованием",
          "Не передавайте СИЗ другим работникам без дезинфекции",
          "Сообщайте о дефектах и неисправностях немедленно",
          "Сдавайте на стирку/замену в установленные сроки",
        ],
      },
    ],
  },
  {
    id: "fire",
    title: "Пожарная безопасность",
    icon: "Flame",
    color: "navy",
    short: "Правила поведения при пожаре, средства пожаротушения, план эвакуации.",
    content: [
      {
        heading: "Действия при обнаружении пожара",
        steps: [
          "Немедленно сообщите в пожарную охрану: 101 или 112",
          "Сообщите руководителю и оповестите сотрудников",
          "Эвакуируйтесь по маршруту, указанному на плане эвакуации",
          "Закройте двери и окна для замедления распространения огня",
          "Не пользуйтесь лифтами при эвакуации",
          "Если есть дым — передвигайтесь на четвереньках (ниже уровня дыма)",
          "Встретьте пожарных и укажите место очага",
        ],
      },
      {
        heading: "Применение огнетушителя",
        steps: [
          "Сорвите пломбу и выдерните чеку",
          "Направьте сопло на основание огня (не на пламя)",
          "Нажмите на рычаг и держите его",
          "Двигайтесь от краёв очага к центру",
          "Не подходите ближе 1 метра к очагу при тушении",
          "Используйте порошковый огнетушитель при горении электроустановок под напряжением",
        ],
      },
      {
        heading: "Что нельзя делать при пожаре",
        warning: true,
        steps: [
          "Открывать окна и двери (усиливает тягу)",
          "Тушить водой электроустановки под напряжением",
          "Пользоваться лифтом",
          "Возвращаться в горящее здание за вещами",
          "Прятаться в шкафах и замкнутых пространствах",
        ],
      },
    ],
  },
  {
    id: "chemicals",
    title: "Химическая безопасность",
    icon: "FlaskConical",
    color: "navy",
    short: "Опасные вещества на НПЗ, маркировка, правила обращения и действия при аварии.",
    content: [
      {
        heading: "Основные опасные вещества на НПЗ",
        text: "На нефтеперерабатывающем заводе работники могут контактировать с: углеводородами (нефть, бензин, мазут), сероводородом H₂S (высокотоксичный газ!), аммиаком, кислотами и щелочами. Сероводород особенно опасен — не имеет цвета, вызывает мгновенный паралич дыхания в высоких концентрациях.",
      },
      {
        heading: "Правила работы с химическими веществами",
        steps: [
          "Работайте только в предусмотренных СИЗ",
          "Изучите паспорт безопасности (MSDS) вещества перед работой",
          "Не принимайте пищу и не курите в рабочей зоне",
          "Проверяйте наличие газоанализатора при работе в замкнутых пространствах",
          "Соблюдайте нормы хранения — не смешивайте несовместимые вещества",
        ],
      },
      {
        heading: "Действия при аварийном разливе",
        steps: [
          "Сообщите об аварии руководителю и диспетчеру",
          "Эвакуируйте людей из зоны аварии против ветра",
          "Наденьте защитные средства органов дыхания",
          "Огородите зону разлива, исключите источники воспламенения",
          "Действуйте согласно плану ликвидации аварий (ПЛАС)",
        ],
      },
    ],
  },
];

// ===== КОМПОНЕНТ =====

type ProgramView =
  | { type: "home" }
  | { type: "section"; section: "safety" | "firstaid" }
  | { type: "topic"; section: "safety" | "firstaid"; topicId: string };

interface ProgramsProps {
  onBack: () => void;
}

export default function Programs({ onBack }: ProgramsProps) {
  const [view, setView] = useState<ProgramView>({ type: "home" });

  const goHome = () => setView({ type: "home" });
  const goSection = (section: "safety" | "firstaid") => setView({ type: "section", section });
  const goTopic = (section: "safety" | "firstaid", topicId: string) =>
    setView({ type: "topic", section, topicId });

  const colorMap: Record<string, string> = {
    red: "bg-red-50 border-red-200 text-red-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700",
    cyan: "bg-cyan-50 border-cyan-200 text-cyan-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    gray: "bg-gray-50 border-gray-200 text-gray-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    navy: "bg-[var(--brand-light)] border-gray-200 text-[var(--brand-navy)]",
  };
  const iconColorMap: Record<string, string> = {
    red: "text-red-500",
    orange: "text-orange-500",
    cyan: "text-cyan-500",
    purple: "text-purple-500",
    yellow: "text-yellow-600",
    gray: "text-gray-500",
    blue: "text-blue-500",
    navy: "text-[var(--brand-steel)]",
  };

  // ===== ГЛАВНАЯ СТРАНИЦА ПРОГРАММ =====
  if (view.type === "home") {
    return (
      <main className="animate-fade-in">
        <div className="bg-[var(--brand-navy)] text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <Icon name="ArrowLeft" size={15} />
              На главную
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[var(--brand-gold)] rounded-lg flex items-center justify-center">
                <Icon name="BookMarked" size={20} className="text-[var(--brand-navy)]" />
              </div>
              <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-white">Программы</h1>
            </div>
            <p className="text-white/70 text-base max-w-2xl leading-relaxed">
              Учебные материалы по охране труда и первой помощи для сотрудников Башнефть-Сервис НПЗ
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Охрана труда */}
            <button
              onClick={() => goSection("safety")}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-left p-8 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-[var(--brand-navy)] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[var(--brand-steel)] transition-colors">
                <Icon name="ShieldCheck" size={28} className="text-[var(--brand-gold)]" />
              </div>
              <h2 className="font-heading font-extrabold text-xl text-[var(--brand-navy)] mb-2">Охрана труда</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Законодательная база, права работников, СИЗ, пожарная безопасность, химическая защита на НПЗ
              </p>
              <div className="flex flex-wrap gap-2">
                {SAFETY_TOPICS.map((t) => (
                  <span key={t.id} className="text-[11px] bg-[var(--brand-light)] text-[var(--brand-steel)] px-2 py-1 rounded font-heading font-semibold">
                    {t.title}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-1 text-[var(--brand-steel)] text-sm font-medium group-hover:gap-2 transition-all">
                Открыть раздел <Icon name="ArrowRight" size={14} />
              </div>
            </button>

            {/* Первая помощь */}
            <button
              onClick={() => goSection("firstaid")}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-left p-8 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center mb-5 group-hover:bg-red-600 transition-colors">
                <Icon name="HeartPulse" size={28} className="text-white" />
              </div>
              <h2 className="font-heading font-extrabold text-xl text-[var(--brand-navy)] mb-2">Первая помощь</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Реанимация, кровотечения, ожоги, переохлаждение, отравления, травмы конечностей и другие неотложные состояния
              </p>
              <div className="flex flex-wrap gap-2">
                {FIRST_AID_TOPICS.map((t) => (
                  <span key={t.id} className="text-[11px] bg-red-50 text-red-700 px-2 py-1 rounded font-heading font-semibold">
                    {t.title}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-1 text-red-600 text-sm font-medium group-hover:gap-2 transition-all">
                Открыть раздел <Icon name="ArrowRight" size={14} />
              </div>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ===== РАЗДЕЛ (список тем) =====
  if (view.type === "section") {
    const isFirstAid = view.section === "firstaid";
    const topics = isFirstAid ? FIRST_AID_TOPICS : SAFETY_TOPICS;
    const title = isFirstAid ? "Первая помощь" : "Охрана труда";
    const headerColor = isFirstAid ? "bg-red-600" : "bg-[var(--brand-navy)]";
    const iconName = isFirstAid ? "HeartPulse" : "ShieldCheck";

    return (
      <main className="animate-fade-in">
        <div className={`${headerColor} text-white py-12 px-4`}>
          <div className="max-w-7xl mx-auto">
            <button onClick={goHome} className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <Icon name="ArrowLeft" size={15} />
              Назад к программам
            </button>
            <div className="flex items-center gap-3 mb-2">
              <Icon name={iconName as IconName} size={28} className="text-white" />
              <h1 className="font-heading font-extrabold text-2xl md:text-4xl text-white">{title}</h1>
            </div>
            <p className="text-white/70 text-sm mt-2">
              {topics.length} {isFirstAid ? "тем" : "раздела"} — выберите нужный
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => goTopic(view.section, topic.id)}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left p-5 flex gap-4 items-start hover:-translate-y-0.5"
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 border ${colorMap[topic.color]}`}>
                  <Icon name={topic.icon as IconName} size={20} className={iconColorMap[topic.color]} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-bold text-base text-[var(--brand-navy)] mb-1">{topic.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{topic.short}</p>
                </div>
                <Icon name="ChevronRight" size={18} className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-1 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ===== ТЕМА (детальная страница) =====
  if (view.type === "topic") {
    const isFirstAid = view.section === "firstaid";
    const topics = isFirstAid ? FIRST_AID_TOPICS : SAFETY_TOPICS;
    const topic = topics.find((t) => t.id === view.topicId);
    if (!topic) return null;

    const topicIndex = topics.findIndex((t) => t.id === view.topicId);
    const prevTopic = topics[topicIndex - 1];
    const nextTopic = topics[topicIndex + 1];

    return (
      <main className="animate-fade-in">
        {/* Header */}
        <div className={`${isFirstAid ? "bg-red-600" : "bg-[var(--brand-navy)]"} text-white py-10 px-4`}>
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => goSection(view.section)}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <Icon name="ArrowLeft" size={15} />
              {isFirstAid ? "Первая помощь" : "Охрана труда"}
            </button>
            <div className={`inline-flex items-center gap-2 border px-3 py-1.5 rounded mb-4 text-xs font-heading font-semibold uppercase tracking-wide ${isFirstAid ? "border-white/30 text-white/80" : "border-[var(--brand-gold)]/40 text-[var(--brand-gold)]"}`}>
              <Icon name={topic.icon as IconName} size={13} />
              {isFirstAid ? "Первая помощь" : "Охрана труда"}
            </div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-white">{topic.title}</h1>
            <p className="text-white/70 text-sm mt-3 max-w-xl leading-relaxed">{topic.short}</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="space-y-8">
            {topic.content.map((block, i) => (
              <div key={i}>
                <h2 className={`font-heading font-bold text-lg mb-4 flex items-center gap-2 ${block.warning ? "text-red-600" : "text-[var(--brand-navy)]"}`}>
                  {block.warning && <Icon name="AlertTriangle" size={18} className="text-red-500" />}
                  {block.heading}
                </h2>

                {block.text && (
                  <p className="text-gray-600 text-base leading-relaxed bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                    {block.text}
                  </p>
                )}

                {block.steps && (
                  <div className={`rounded-xl border p-5 space-y-3 shadow-sm ${block.warning ? "bg-red-50 border-red-200" : "bg-white border-gray-100"}`}>
                    {block.steps.map((step, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-xs mt-0.5 ${block.warning ? "bg-red-500 text-white" : "bg-[var(--brand-gold)] text-[var(--brand-navy)]"}`}>
                          {block.warning ? "!" : j + 1}
                        </div>
                        <span className={`text-sm leading-relaxed ${block.warning ? "text-red-700" : "text-gray-700"}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-12 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
            {prevTopic ? (
              <button
                onClick={() => goTopic(view.section, prevTopic.id)}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all text-left group"
              >
                <Icon name="ChevronLeft" size={18} className="text-gray-400 group-hover:text-[var(--brand-navy)] flex-shrink-0" />
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wide font-heading font-semibold">Назад</div>
                  <div className="font-heading font-bold text-sm text-[var(--brand-navy)]">{prevTopic.title}</div>
                </div>
              </button>
            ) : <div />}

            {nextTopic ? (
              <button
                onClick={() => goTopic(view.section, nextTopic.id)}
                className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all text-right justify-end group"
              >
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wide font-heading font-semibold">Далее</div>
                  <div className="font-heading font-bold text-sm text-[var(--brand-navy)]">{nextTopic.title}</div>
                </div>
                <Icon name="ChevronRight" size={18} className="text-gray-400 group-hover:text-[var(--brand-navy)] flex-shrink-0" />
              </button>
            ) : <div />}
          </div>
        </div>
      </main>
    );
  }

  return null;
}
