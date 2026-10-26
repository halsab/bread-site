import { MediaFrame } from "@/components/media-frame";

export const dynamic = "force-static";

const TELEGRAM_URL = "https://t.me/alisa_sabr";
const MAX_URL =
  "https://max.ru/u/f9LHodD0cOIDSkO42jaZH-QksI9MMg-0iqhx4QJPqQkv3KChCeO60u-ov9M";

const contacts = [
  {
    label: "Telegram",
    href: TELEGRAM_URL,
  },
  {
    label: "MAX",
    href: MAX_URL,
  },
];
type Product = {
  name: string;
  description?: string;
  ingredients?: string;
  alt: string;
  src: string;
};

const products: Product[] = [
  {
    name: "Тартин классический",
    description:
      "Пшеничный хлеб на закваске с румяной корочкой и мягким, упругим мякишем. Хорош с маслом, сыром или просто так.",
    ingredients: "пшеничная мука, вода, пшеничная закваска, соль.",
    alt: "Классический тартин с румяной корочкой.",
    src: "/images/classic-tartine.webp",
  },
  {
    name: "Тартин с семенами льна",
    description:
      "Знакомый тартин с семенами льна. Они добавляют приятную фактуру и мягкий ореховый оттенок вкуса, не заслоняя сам хлеб.",
    ingredients:
      "пшеничная мука, вода, пшеничная закваска, соль, семена льна.",
    alt: "Тартин с семенами льна на корочке.",
    src: "/images/flaxseed-tartine.webp",
  },
  {
    name: "Тыквенный хлеб",
    description:
      "Домашняя формовая буханка с тыквенным пюре и тыквенными семечками. Нежный мякиш, лёгкая сладость тыквы и приятный контраст семечек.",
    ingredients:
      "пшеничная мука, вода, пшеничная закваска, соль, тыквенное пюре, тыквенные семечки.",
    alt: "Формовая тыквенная буханка с тыквенными семечками.",
    src: "/images/pumpkin-loaf.webp",
  },
  {
    name: "Ржаной хлеб на закваске",
    description:
      "Ржаной хлеб на закваске с тёмной корочкой и пористым мякишем. Хорош к супу, сыру или просто так.",
    ingredients: "ржаная мука, вода, ржаная закваска, соль.",
    alt: "Разрезанная буханка ржаного хлеба и ломтики на деревянной доске.",
    src: "/images/rye-sourdough.webp",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>

      <header className="site-header">
        <div className="site-header__inner site-shell">
          <a aria-label="MoolYort Bakery — в начало страницы" className="wordmark" href="#top">
            MoolYort Bakery
          </a>
          <nav aria-label="Основная навигация" className="site-nav">
            <a href="#bread">Наш хлеб</a>
            <a href="#about">О пекаре</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="hero-title" className="hero site-shell" id="top">
          <div className="hero__copy">
            <p className="eyebrow">ДОМАШНИЙ ХЛЕБ РУЧНОЙ РАБОТЫ</p>
            <h1 id="hero-title">Хлеб, которым хочется делиться.</h1>
            <p className="hero__description">
              Домашний тартин и хлеб на закваске — с хрустящей корочкой,
              мягким мякишем и вниманием к каждой детали.
            </p>
            <a className="text-link hero__link" href="#bread">
              Посмотреть хлеб
              <svg aria-hidden="true" viewBox="0 0 22 18">
                <path d="M1 9h18M12 2l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div aria-label="Хлеб крупным планом" className="hero__photographs" role="group">
            <MediaFrame
              alt="Целый тартин на льняной ткани и деревянном столе."
              className="photo-transition"
              motion="full-bleed"
              preload
              ratio="landscape"
              sizes="100vw"
              src="/images/hero-tartine.webp"
            />
          </div>
        </section>

        <section
          aria-labelledby="philosophy-title"
          className="philosophy section-shell"
          id="philosophy"
        >
          <div className="philosophy__copy">
            <h2 className="section-title" id="philosophy-title">
              Всё начинается с простого.
            </h2>
            <p>
              Мука, вода, закваска и соль. Знакомые ингредиенты, из которых
              каждый раз получается немного разный хлеб. Я люблю этот неспешный
              процесс: наблюдать за тестом, ждать нужного момента и вынимать из
              печи тёплую буханку. А потом — отрезать первый ломтик и делиться
              им.
            </p>
          </div>

          <MediaFrame
            alt="Тартин рядом с мукой, водой и закваской."
            className="philosophy__main-media"
            motion="vertical"
            ratio="portrait"
            sizes="(max-width: 760px) 90vw, 48vw"
            src="/images/philosophy-ingredients.webp"
          />
        </section>

        <MediaFrame
          alt="Разрезанный хлеб с воздушным мякишем."
          className="photo-transition"
          motion="full-bleed"
          ratio="landscape"
          sizes="100vw"
          src="/images/bread-crumb-detail.webp"
        />

        <section aria-labelledby="bread-title" className="products section-shell">
          <div className="products__intro" id="bread">
            <h2 className="section-title" id="bread-title">
              Что я пеку
            </h2>
            <p>Четыре вида хлеба, объединённые вниманием к процессу.</p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product" key={product.name}>
                <MediaFrame
                  alt={product.alt}
                  className="product__media"
                  motion="gentle"
                  ratio="portrait"
                  sizes="(max-width: 640px) 90vw, (max-width: 1279px) 44vw, 16rem"
                  src={product.src}
                />
                <h3>{product.name}</h3>
                {product.description ? (
                  <p className="product__description">{product.description}</p>
                ) : null}
                {product.ingredients ? (
                  <p className="product__ingredients">
                    <span>Состав:</span> {product.ingredients}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-title" className="story section-shell">
          <div className="story__copy" id="about">
            <h2 className="section-title" id="about-title">
              Немного обо мне и моём хлебе
            </h2>
            <p>
              Я пеку хлеб дома. Иногда кухня превращается в маленькую пекарню:
              на столе тесто, рядом мука, а весь день живёт в ожидании готовой
              буханки. Мне нравится этот процесс — от первых движений с тестом
              до момента, когда хлеб остывает после выпечки. Пока в моей
              небольшой коллекции всего несколько видов, но у каждого свой
              характер. MoolYort Bakery — место, где я могу показать свой хлеб и
              поделиться тем, что в нём люблю.
            </p>
          </div>

          <div
            aria-label="Фотографии процесса и пекаря"
            className="story__gallery"
            role="group"
          >
            <MediaFrame
              alt="Фигура пекаря со спины за рабочим столом; лицо не видно."
              className="story__portrait"
              motion="vertical"
              ratio="portrait"
              sizes="(max-width: 760px) 50vw, 25vw"
              src="/images/baker-silhouette.webp"
            />
            <div className="story__details">
              <MediaFrame
                alt="Руки формуют тесто на посыпанном мукой столе."
                motion="horizontal"
                ratio="portrait"
                sizes="(max-width: 760px) 38vw, 18vw"
                src="/images/baker-hands-dough.webp"
              />
              <MediaFrame
                alt="Заготовки теста расстаиваются в плетёных корзинах."
                ratio="portrait"
                sizes="(max-width: 760px) 38vw, 18vw"
                src="/images/dough-before-baking.webp"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="closing-title" className="closing">
          <MediaFrame
            alt="Свежевыпеченный тартин остывает на решётке."
            className="photo-transition"
            motion="full-bleed"
            ratio="landscape"
            sizes="100vw"
            src="/images/freshly-baked-loaf.webp"
          />
          <div className="closing__inner section-shell">
            <div className="closing__copy">
              <h2 className="section-title" id="closing-title">
                До встречи за хлебом.
              </h2>
              <p>
                Иногда для хорошего момента достаточно свежего хлеба и людей,
                с которыми хочется его разделить.
              </p>
            </div>
            <div className="closing__contacts">
              <h3 className="contact-heading" id="contacts" tabIndex={-1}>
                Хотите заказать хлеб? Напишите мне
              </h3>
              <nav aria-label="Связаться с пекарем" className="contact-links">
                {contacts.map((contact) => (
                  <a
                    href={contact.href}
                    key={contact.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="contact-link__name">{contact.label}</span>
                    <span className="sr-only"> — откроется в новой вкладке</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner site-shell">
          <div className="site-footer__brand">
            <a className="wordmark" href="#top">
              MoolYort Bakery
            </a>
            <p>Домашний хлеб ручной работы.</p>
          </div>
          <nav aria-label="Навигация в подвале" className="site-nav site-footer__nav">
            <a href="#bread">Наш хлеб</a>
            <a href="#about">О пекаре</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
