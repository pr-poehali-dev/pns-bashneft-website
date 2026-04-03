import { useState } from "react";
import Icon from "@/components/ui/icon";
import Programs from "./Programs";
type IconName = string;

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d44eeebf-530b-4d7c-a8ce-0864c510d37c/files/b0efb88f-46f0-458f-9290-d0d12dbc8468.jpg";

const MONTHS_RU = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const NAV_ITEMS = ["Главная", "Новости", "События", "Программы", "О нас"];

const NEWS = [
  {
    id: 1,
    date: "28 марта 2026",
    category: "Профсоюз",
    title: "Подписано соглашение об индексации заработной платы на 2026 год",
    excerpt: "Профсоюзный комитет успешно завершил переговоры с администрацией предприятия. Индексация составит 8,5% с 1 апреля 2026 года.",
    body: "Профсоюзный комитет Башнефть-Сервис НПЗ завершил многоэтапные переговоры с администрацией предприятия по вопросу индексации заработной платы на 2026 год. Соглашение подписано 28 марта в присутствии представителей обеих сторон.\n\nСогласно достигнутым договорённостям, индексация составит 8,5% с 1 апреля 2026 года. Это выше уровня официальной инфляции и является значимой победой профсоюза в интересах работников.\n\nПредседатель профкома отметил, что переговоры велись в конструктивном ключе, и администрация предприятия проявила готовность к диалогу. Итоговые цифры отражают реальный рост стоимости жизни и позволяют сохранить покупательную способность сотрудников.",
    image: HERO_IMAGE,
    gallery: [HERO_IMAGE, HERO_IMAGE, HERO_IMAGE],
  },
  {
    id: 2,
    date: "20 марта 2026",
    category: "Охрана труда",
    title: "Проведён плановый инструктаж по пожарной безопасности",
    excerpt: "В марте прошли обязательные инструктажи для всех подразделений. Особое внимание уделено правилам эвакуации.",
    body: "В течение марта 2026 года на предприятии проведены плановые инструктажи по пожарной безопасности для всех структурных подразделений. Мероприятия охватили более 800 сотрудников.\n\nОсобое внимание уделено практической отработке правил эвакуации, расположению первичных средств пожаротушения и алгоритму вызова пожарных служб. Все участники прошли тестирование и получили памятки.\n\nСледующий плановый инструктаж запланирован на сентябрь 2026 года.",
    image: HERO_IMAGE,
    gallery: [HERO_IMAGE, HERO_IMAGE],
  },
  {
    id: 3,
    date: "12 марта 2026",
    category: "Спорт",
    title: "Команда НПЗ заняла второе место в корпоративном волейбольном турнире",
    excerpt: "Спортсмены нашего предприятия достойно выступили на турнире «Башнефть-Спорт 2026» и вышли в финал.",
    body: "12 марта завершился корпоративный волейбольный турнир «Башнефть-Спорт 2026», в котором приняли участие команды семи подразделений компании. Сборная НПЗ уверенно прошла групповой этап и вышла в финал.\n\nВ финальном матче наша команда встретилась с командой Управления буровых работ и уступила в пяти сетах. Второе место — достойный результат, отражающий высокий уровень подготовки наших спортсменов.\n\nПрофком благодарит всех участников и болельщиков, а также выражает признательность тренерскому составу за подготовку команды.",
    image: HERO_IMAGE,
    gallery: [HERO_IMAGE, HERO_IMAGE, HERO_IMAGE, HERO_IMAGE],
  },
];

const EVENTS = [
  { id: 1, date: { day: "05", month: "АПР" }, title: "Тренировка по волейболу", time: "18:00", place: "Спортзал №2", type: "sport" },
  { id: 2, date: { day: "10", month: "АПР" }, title: "Инструктаж: первая помощь", time: "10:00", place: "Конференц-зал А", type: "safety" },
  { id: 3, date: { day: "15", month: "АПР" }, title: "Соревнования по мини-футболу", time: "15:00", place: "Стадион НПЗ", type: "sport" },
  { id: 4, date: { day: "22", month: "АПР" }, title: "Профком — открытый приём", time: "09:00", place: "Кабинет профкома", type: "org" },
  { id: 5, date: { day: "30", month: "АПР" }, title: "Субботник — День труда", time: "08:00", place: "Территория НПЗ", type: "org" },
];

const ABOUT_SECTIONS = [
  {
    id: "safety",
    icon: "ShieldCheck",
    title: "Охрана труда",
    description: "Контроль условий труда, проверки рабочих мест, взаимодействие с инспекцией.",
    items: [
      "Плановые и внеплановые проверки рабочих мест",
      "Участие в расследовании несчастных случаев",
      "Контроль выдачи СИЗ (средств индивидуальной защиты)",
      "Инструктажи и обучение персонала",
      "Мониторинг вредных факторов производства",
    ],
  },
  {
    id: "firstaid",
    icon: "HeartPulse",
    title: "Первая помощь",
    description: "Обучение сотрудников навыкам первой помощи и действиям при ЧС.",
    items: [
      "Базовый курс первой медицинской помощи",
      "Проведение сердечно-лёгочной реанимации (СЛР)",
      "Действия при травмах и ожогах",
      "Помощь при отравлениях химическими веществами",
      "Эвакуация пострадавших с территории НПЗ",
    ],
  },
  {
    id: "rights",
    icon: "Scale",
    title: "Трудовые права",
    description: "Защита прав работников, консультации по трудовым спорам.",
    items: [
      "Правовые консультации по трудовым вопросам",
      "Помощь при незаконном увольнении",
      "Контроль соблюдения коллективного договора",
      "Представление интересов в суде",
      "Разъяснение изменений в трудовом законодательстве",
    ],
  },
  {
    id: "social",
    icon: "Users",
    title: "Социальная поддержка",
    description: "Льготы, путёвки, материальная помощь членам профсоюза.",
    items: [
      "Путёвки в санатории и дома отдыха",
      "Материальная помощь в трудных ситуациях",
      "Новогодние подарки для детей членов профсоюза",
      "Скидки на услуги партнёрских организаций",
      "Оздоровительные программы",
    ],
  },
];

type Section = "Главная" | "Новости" | "События" | "Программы" | "О нас";
type NewsItem = typeof NEWS[number];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("Главная");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAbout, setActiveAbout] = useState(ABOUT_SECTIONS[0].id);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [calendarDate, setCalendarDate] = useState({ year: 2026, month: 3 }); // month 0-indexed

  const navigate = (s: Section) => {
    setActiveSection(s);
    setMobileMenuOpen(false);
    setSelectedNews(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openNews = (news: NewsItem) => {
    setSelectedNews(news);
    setGalleryIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeNews = () => {
    setSelectedNews(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevMonth = () => {
    setCalendarDate((d) => {
      if (d.month === 0) return { year: d.year - 1, month: 11 };
      return { ...d, month: d.month - 1 };
    });
  };

  const nextMonth = () => {
    setCalendarDate((d) => {
      if (d.month === 11) return { year: d.year + 1, month: 0 };
      return { ...d, month: d.month + 1 };
    });
  };

  const calDaysInMonth = new Date(calendarDate.year, calendarDate.month + 1, 0).getDate();
  const calFirstDow = (new Date(calendarDate.year, calendarDate.month, 1).getDay() + 6) % 7; // 0=Mon

  const eventDays = EVENTS.map((e) => parseInt(e.date.day));

  return (
    <div className="min-h-screen bg-[var(--brand-light)]">
      {/* Header */}
      <header className="bg-[var(--brand-navy)] text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("Главная")}>
              <div className="w-9 h-9 bg-[var(--brand-gold)] rounded flex items-center justify-center flex-shrink-0">
                <Icon name="Landmark" size={18} className="text-[var(--brand-navy)]" />
              </div>
              <div>
                <div className="font-heading font-bold text-[13px] leading-tight uppercase tracking-wide">Профсоюз</div>
                <div className="font-heading font-extrabold text-[11px] leading-tight text-[var(--brand-gold)] uppercase tracking-widest">Башнефть-Сервис НПЗ</div>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item as Section)}
                  className={`px-4 py-2 text-[13px] font-medium rounded transition-all duration-200 ${
                    activeSection === item
                      ? "bg-[var(--brand-gold)] text-[var(--brand-navy)] font-semibold"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-3 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => navigate(item as Section)}
                  className={`text-left px-4 py-2.5 text-sm rounded transition-all ${
                    activeSection === item
                      ? "bg-[var(--brand-gold)] text-[var(--brand-navy)] font-semibold"
                      : "text-white/80 hover:bg-white/10"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ===== СТРАНИЦА НОВОСТИ ===== */}
      {selectedNews && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
          <button
            onClick={closeNews}
            className="flex items-center gap-2 text-[var(--brand-steel)] text-sm font-medium mb-6 hover:gap-3 transition-all"
          >
            <Icon name="ArrowLeft" size={16} />
            Назад к новостям
          </button>

          {/* Main image */}
          <div className="relative rounded-xl overflow-hidden mb-6 shadow-lg h-64 md:h-96">
            <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)]/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-[var(--brand-gold)] text-[var(--brand-navy)] text-xs font-heading font-bold uppercase tracking-wide px-3 py-1.5 rounded">
                {selectedNews.category}
              </span>
            </div>
          </div>

          {/* Meta + Title */}
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Calendar" size={14} className="text-gray-400" />
            <span className="text-gray-400 text-sm">{selectedNews.date}</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-[var(--brand-navy)] leading-tight mb-6">
            {selectedNews.title}
          </h1>

          {/* Body */}
          <div className="prose max-w-none mb-10">
            {selectedNews.body.split("\n\n").map((p, i) => (
              <p key={i} className="text-gray-600 text-base leading-relaxed mb-4">{p}</p>
            ))}
          </div>

          {/* Gallery */}
          {selectedNews.gallery && selectedNews.gallery.length > 0 && (
            <div>
              <h2 className="font-heading font-bold text-lg text-[var(--brand-navy)] mb-4 flex items-center gap-2">
                <Icon name="Images" size={18} className="text-[var(--brand-gold)]" />
                Фотогалерея
              </h2>

              {/* Large selected photo */}
              <div className="relative rounded-xl overflow-hidden mb-3 h-64 md:h-80 shadow-md">
                <img
                  src={selectedNews.gallery[galleryIndex]}
                  alt={`Фото ${galleryIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {selectedNews.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setGalleryIndex((i) => (i - 1 + selectedNews.gallery.length) % selectedNews.gallery.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-all"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={() => setGalleryIndex((i) => (i + 1) % selectedNews.gallery.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-all"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {galleryIndex + 1} / {selectedNews.gallery.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 flex-wrap">
                {selectedNews.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      i === galleryIndex ? "border-[var(--brand-gold)] shadow-md" : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img src={img} alt={`Фото ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* ===== ГЛАВНАЯ ===== */}
      {!selectedNews && activeSection === "Главная" && (
        <main>
          {/* Hero */}
          <section className="relative h-[480px] md:h-[560px] overflow-hidden">
            <img src={HERO_IMAGE} alt="Профсоюз" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-navy)]/92 via-[var(--brand-navy)]/65 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
                <div className="max-w-xl animate-fade-in">
                  <div className="inline-flex items-center gap-2 bg-[var(--brand-gold)]/20 border border-[var(--brand-gold)]/40 text-[var(--brand-gold)] text-xs font-heading font-semibold uppercase tracking-widest px-3 py-1.5 rounded mb-4">
                    <Icon name="Shield" size={12} />
                    Первичная профсоюзная организация
                  </div>
                  <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white leading-tight mb-4">
                    Башнефть-Сервис<br />
                    <span className="text-[var(--brand-gold)]">НПЗ</span>
                  </h1>
                  <p className="text-white/75 text-base md:text-lg leading-relaxed mb-6">
                    Защищаем права работников, обеспечиваем безопасность труда и объединяем коллектив предприятия.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate("О нас")}
                      className="bg-[var(--brand-gold)] text-[var(--brand-navy)] font-heading font-bold text-sm px-5 py-2.5 rounded hover:brightness-110 transition-all"
                    >
                      О профсоюзе
                    </button>
                    <button
                      onClick={() => navigate("Новости")}
                      className="border border-white/40 text-white font-heading font-semibold text-sm px-5 py-2.5 rounded hover:bg-white/10 transition-all"
                    >
                      Последние новости
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats strip */}
          <section className="bg-[var(--brand-blue)] text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: "Users", value: "1 200+", label: "Членов профсоюза" },
                  { icon: "Calendar", value: "28 лет", label: "На страже прав" },
                  { icon: "ShieldCheck", value: "340", label: "Проверок в год" },
                  { icon: "Trophy", value: "15", label: "Побед в турнирах" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                      <Icon name={s.icon as IconName} size={18} className="text-[var(--brand-gold)]" />
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-xl text-white">{s.value}</div>
                      <div className="text-xs text-white/60">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* News + Sidebar */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div className="gold-line">
                  <h2 className="section-title text-xl text-[var(--brand-navy)]">Последние новости</h2>
                </div>
                <button
                  onClick={() => navigate("Новости")}
                  className="text-[var(--brand-steel)] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Все новости <Icon name="ArrowRight" size={14} />
                </button>
              </div>
              <div className="flex flex-col gap-5">
                {NEWS.map((n) => (
                  <article
                    key={n.id}
                    onClick={() => openNews(n)}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <img src={n.image} alt={n.title} className="w-28 md:w-36 h-28 md:h-32 object-cover flex-shrink-0" />
                    <div className="py-4 pr-4 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="bg-[var(--brand-light)] text-[var(--brand-steel)] text-[11px] font-heading font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                        <span className="text-gray-400 text-[11px]">{n.date}</span>
                      </div>
                      <h3 className="font-heading font-bold text-sm md:text-base text-[var(--brand-navy)] leading-snug mb-1">{n.title}</h3>
                      <p className="text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-2">{n.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              {/* Mini calendar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[var(--brand-navy)] text-white px-4 py-3 flex items-center justify-between">
                  <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
                    <Icon name="ChevronLeft" size={16} className="text-[var(--brand-gold)]" />
                  </button>
                  <span className="font-heading font-bold text-sm uppercase tracking-wide">
                    {MONTHS_RU[calendarDate.month]} {calendarDate.year}
                  </span>
                  <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
                    <Icon name="ChevronRight" size={16} className="text-[var(--brand-gold)]" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                      <div key={d} className="text-center text-[10px] font-heading font-semibold text-gray-400 uppercase">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: calFirstDow }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: calDaysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const isApril2026 = calendarDate.month === 3 && calendarDate.year === 2026;
                      const hasEvent = isApril2026 && eventDays.includes(day);
                      return (
                        <div
                          key={day}
                          className={`h-7 w-7 mx-auto flex items-center justify-center rounded text-xs font-medium ${
                            hasEvent
                              ? "bg-[var(--brand-gold)] text-[var(--brand-navy)] font-bold cursor-pointer hover:brightness-110"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-gray-400">
                    <div className="w-3 h-3 bg-[var(--brand-gold)] rounded-sm" />
                    <span>— дата события</span>
                  </div>
                </div>
              </div>

              {/* Upcoming events */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-[var(--brand-navy)] text-white px-4 py-3 flex items-center justify-between">
                  <span className="font-heading font-bold text-sm uppercase tracking-wide">Ближайшие события</span>
                  <Icon name="Zap" size={16} className="text-[var(--brand-gold)]" />
                </div>
                <div className="divide-y divide-gray-50">
                  {EVENTS.slice(0, 4).map((ev) => (
                    <div key={ev.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex-shrink-0 w-10 text-center">
                        <div className="font-heading font-extrabold text-lg text-[var(--brand-navy)] leading-none">{ev.date.day}</div>
                        <div className="font-heading font-semibold text-[10px] text-[var(--brand-gold)] uppercase tracking-wide">{ev.date.month}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-sm text-gray-800 leading-snug">{ev.title}</div>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <Icon name="Clock" size={10} className="text-gray-400" />
                          <span className="text-[11px] text-gray-400">{ev.time}</span>
                          <span className="text-[11px] text-gray-300">·</span>
                          <Icon name="MapPin" size={10} className="text-gray-400" />
                          <span className="text-[11px] text-gray-400 truncate">{ev.place}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate("События")}
                    className="w-full text-center text-[var(--brand-steel)] text-xs font-medium hover:underline"
                  >
                    Все события →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ===== НОВОСТИ ===== */}
      {!selectedNews && activeSection === "Новости" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="gold-line mb-8">
            <h1 className="section-title text-2xl md:text-3xl text-[var(--brand-navy)]">Новости профсоюза</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS.map((n) => (
              <article
                key={n.id}
                onClick={() => openNews(n)}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="h-44 overflow-hidden">
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[var(--brand-light)] text-[var(--brand-steel)] text-[11px] font-heading font-semibold uppercase tracking-wide px-2 py-0.5 rounded">
                      {n.category}
                    </span>
                    <span className="text-gray-400 text-[11px]">{n.date}</span>
                  </div>
                  <h2 className="font-heading font-bold text-base text-[var(--brand-navy)] leading-snug mb-2">{n.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{n.excerpt}</p>
                  <div className="mt-4 text-[var(--brand-steel)] text-sm font-medium flex items-center gap-1">
                    Читать далее <Icon name="ArrowRight" size={13} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

      {/* ===== СОБЫТИЯ ===== */}
      {!selectedNews && activeSection === "События" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="gold-line mb-8">
            <h1 className="section-title text-2xl md:text-3xl text-[var(--brand-navy)]">События и мероприятия</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {EVENTS.map((ev) => {
                const typeColors: Record<string, string> = {
                  sport: "bg-emerald-50 border-emerald-200 text-emerald-700",
                  safety: "bg-amber-50 border-amber-200 text-amber-700",
                  org: "bg-blue-50 border-blue-200 text-blue-700",
                };
                const typeLabels: Record<string, string> = {
                  sport: "Спорт",
                  safety: "Охрана труда",
                  org: "Организация",
                };
                const typeIcons: Record<string, string> = {
                  sport: "Dumbbell",
                  safety: "ShieldCheck",
                  org: "Landmark",
                };
                return (
                  <div key={ev.id} className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 flex gap-5 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-14 text-center bg-[var(--brand-light)] rounded-lg py-2">
                      <div className="font-heading font-extrabold text-2xl text-[var(--brand-navy)] leading-none">{ev.date.day}</div>
                      <div className="font-heading font-bold text-[11px] text-[var(--brand-gold)] uppercase tracking-widest">{ev.date.month}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[11px] font-heading font-semibold uppercase tracking-wide px-2 py-0.5 rounded border ${typeColors[ev.type]}`}>
                          {typeLabels[ev.type]}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[var(--brand-navy)] mb-2">{ev.title}</h3>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                          <Icon name="Clock" size={14} className="text-[var(--brand-steel)]" />
                          {ev.time}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                          <Icon name="MapPin" size={14} className="text-[var(--brand-steel)]" />
                          {ev.place}
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 hidden sm:flex items-center">
                      <div className="w-10 h-10 bg-[var(--brand-light)] rounded-full flex items-center justify-center">
                        <Icon name={typeIcons[ev.type] as IconName} size={18} className="text-[var(--brand-steel)]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                <div className="bg-[var(--brand-navy)] text-white px-4 py-3 flex items-center justify-between">
                  <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
                    <Icon name="ChevronLeft" size={16} className="text-[var(--brand-gold)]" />
                  </button>
                  <span className="font-heading font-bold text-sm uppercase tracking-wide">
                    {MONTHS_RU[calendarDate.month]} {calendarDate.year}
                  </span>
                  <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded transition-colors">
                    <Icon name="ChevronRight" size={16} className="text-[var(--brand-gold)]" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                      <div key={d} className="text-center text-[10px] font-heading font-semibold text-gray-400 uppercase">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: calFirstDow }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: calDaysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const isApril2026 = calendarDate.month === 3 && calendarDate.year === 2026;
                      const hasEvent = isApril2026 && eventDays.includes(day);
                      return (
                        <div
                          key={day}
                          className={`h-8 w-8 mx-auto flex items-center justify-center rounded text-xs font-medium ${
                            hasEvent
                              ? "bg-[var(--brand-gold)] text-[var(--brand-navy)] font-bold cursor-pointer hover:brightness-110"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="font-heading font-bold text-xs text-[var(--brand-navy)] uppercase tracking-wide mb-3">Типы событий</div>
                    {[
                      { label: "Спорт", color: "bg-emerald-500" },
                      { label: "Охрана труда", color: "bg-amber-500" },
                      { label: "Организация", color: "bg-blue-500" },
                    ].map((t) => (
                      <div key={t.label} className="flex items-center gap-2 mb-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                        <span className="text-xs text-gray-600">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ===== ПРОГРАММЫ ===== */}
      {!selectedNews && activeSection === "Программы" && (
        <Programs onBack={() => navigate("Главная")} />
      )}

      {/* ===== О НАС ===== */}
      {!selectedNews && activeSection === "О нас" && (
        <main>
          <div className="bg-[var(--brand-navy)] text-white py-14 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="gold-line">
                <h1 className="section-title text-2xl md:text-4xl text-white">О профсоюзной организации</h1>
              </div>
              <p className="text-white/70 text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
                Первичная профсоюзная организация Башнефть-Сервис НПЗ основана в 1998 году. Мы объединяем более 1200 работников предприятия и защищаем их интересы во всех сферах трудовых отношений.
              </p>
            </div>
          </div>

          <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
              {ABOUT_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveAbout(s.id)}
                  className={`flex items-center gap-2 px-4 py-3.5 text-sm font-heading font-semibold border-b-2 whitespace-nowrap transition-all ${
                    activeAbout === s.id
                      ? "border-[var(--brand-gold)] text-[var(--brand-navy)]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon name={s.icon as IconName} size={15} />
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {ABOUT_SECTIONS.filter((s) => s.id === activeAbout).map((section) => (
            <div key={section.id} className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[var(--brand-blue)] rounded-lg flex items-center justify-center">
                      <Icon name={section.icon as IconName} size={22} className="text-[var(--brand-gold)]" />
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-[var(--brand-navy)]">{section.title}</h2>
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">{section.description}</p>
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-[var(--brand-light)] rounded-lg border border-gray-100">
                        <div className="w-5 h-5 bg-[var(--brand-gold)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name="Check" size={11} className="text-[var(--brand-navy)]" />
                        </div>
                        <span className="text-sm text-gray-700 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[var(--brand-navy)] text-white rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Phone" size={16} className="text-[var(--brand-gold)]" />
                      <span className="font-heading font-bold text-sm uppercase tracking-wide">Контакты профкома</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { icon: "User", label: "Председатель", value: "Иванов Иван Иванович" },
                        { icon: "Phone", label: "Телефон профкома", value: "+7 (347) 000-00-00" },
                        { icon: "Mail", label: "Электронная почта", value: "profkom@bashneft-npz.ru" },
                        { icon: "MapPin", label: "Адрес", value: "г. Уфа, ул. Промышленная, 1" },
                        { icon: "Clock", label: "Приём членов", value: "Пн–Пт, 9:00 – 17:00" },
                      ].map((c) => (
                        <div key={c.label} className="flex items-start gap-3">
                          <div className="w-7 h-7 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
                            <Icon name={c.icon as IconName} size={13} className="text-[var(--brand-gold)]" />
                          </div>
                          <div>
                            <div className="text-white/50 text-[11px]">{c.label}</div>
                            <div className="text-white text-sm font-medium">{c.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-heading font-bold text-sm text-amber-800 mb-1">Как вступить в профсоюз?</div>
                        <p className="text-amber-700 text-sm leading-relaxed">
                          Обратитесь в профком с паспортом и заявлением. Взнос составляет 1% от заработной платы. Члены профсоюза получают полный объём социальных льгот и правовой защиты.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      )}

      {/* Footer */}
      <footer className="bg-[var(--brand-navy)] text-white mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[var(--brand-gold)] rounded flex items-center justify-center">
                  <Icon name="Landmark" size={14} className="text-[var(--brand-navy)]" />
                </div>
                <div>
                  <div className="font-heading font-bold text-sm uppercase">Профсоюз</div>
                  <div className="font-heading font-semibold text-[10px] text-[var(--brand-gold)] uppercase tracking-widest">Башнефть-Сервис НПЗ</div>
                </div>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                Защищаем права и интересы работников с 1998 года.
              </p>
            </div>
            <div>
              <div className="font-heading font-bold text-xs uppercase tracking-widest text-white/50 mb-3">Разделы</div>
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <button key={item} onClick={() => navigate(item as Section)} className="text-left text-sm text-white/70 hover:text-[var(--brand-gold)] transition-colors">
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-heading font-bold text-xs uppercase tracking-widest text-white/50 mb-3">Контакты</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon name="Phone" size={13} className="text-[var(--brand-gold)]" />
                  +7 (347) 000-00-00
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon name="Mail" size={13} className="text-[var(--brand-gold)]" />
                  profkom@bashneft-npz.ru
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Icon name="MapPin" size={13} className="text-[var(--brand-gold)]" />
                  г. Уфа, ул. Промышленная, 1
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs">© 2026 ППО Башнефть-Сервис НПЗ. Все права защищены.</p>
            <p className="text-white/30 text-xs">РОСНП · ФНПР</p>
          </div>
        </div>
      </footer>
    </div>
  );
}