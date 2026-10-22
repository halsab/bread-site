import { MediaFrame } from "@/components/media-frame";

const products = [
  {
    name: "Тартин классический",
    description:
      "Пшеничный хлеб на закваске с румяной корочкой и мягким, упругим мякишем. Хорош с маслом, сыром или просто так.",
    ingredients: "пшеничная мука, вода, пшеничная закваска, соль.",
    alt: "Классический тартин.",
  },
  {
    name: "Тартин с семенами льна",
    description:
      "Знакомый тартин с семенами льна. Они добавляют приятную фактуру и мягкий ореховый оттенок вкуса, не заслоняя сам хлеб.",
    ingredients:
      "пшеничная мука, вода, пшеничная закваска, соль, семена льна.",
    alt: "Тартин с семенами льна.",
  },
  {
    name: "Тыквенный хлеб",
    description:
      "Домашняя формовая буханка с тыквенным пюре и тыквенными семечками. Нежный мякиш, лёгкая сладость тыквы и приятный контраст семечек.",
    ingredients:
      "пшеничная мука, вода, пшеничная закваска, соль, тыквенное пюре, тыквенные семечки.",
    alt: "Формовая тыквенная буханка с тыквенными семечками.",
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
          <a aria-label="Bread — в начало страницы" className="wordmark" href="#top">
            Bread
          </a>
          <nav aria-label="Основная навигация" className="site-nav">
            <a href="#bread">Наш хлеб</a>
            <a href="#about">О пекаре</a>
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

          <MediaFrame
            alt="Целый тартин на льняной ткани и деревянном столе."
            className="hero__media"
            preload
            ratio="landscape"
            sizes="(max-width: 760px) 100vw, 48vw"
          />
        </section>

        <section
          aria-labelledby="philosophy-title"
          className="philosophy section-shell"
          id="philosophy"
        >
          <div className="philosophy__copy reveal">
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
            alt="Хлеб и простые ингредиенты в мягком естественном свете."
            className="philosophy__main-media reveal"
            ratio="portrait"
            sizes="(max-width: 760px) 100vw, 42vw"
          />

          <MediaFrame
            alt="Разрез хлеба с выразительной фактурой мякиша."
            className="philosophy__detail-media reveal"
            ratio="landscape"
            sizes="(max-width: 760px) 100vw, 30vw"
          />
        </section>

        <section aria-labelledby="bread-title" className="products section-shell" id="bread">
          <div className="products__intro reveal">
            <h2 className="section-title" id="bread-title">
              Что я пеку
            </h2>
            <p>Три варианта хлеба с одной простой основой — и разным характером.</p>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product reveal" key={product.name}>
                <MediaFrame
                  alt={product.alt}
                  className="product__media"
                  ratio="portrait"
                  sizes="(max-width: 620px) 100vw, (max-width: 980px) 46vw, 30vw"
                />
                <h3>{product.name}</h3>
                <p className="product__description">{product.description}</p>
                <p className="product__ingredients">
                  <span>Предварительный состав:</span> {product.ingredients}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="about-title" className="story section-shell" id="about">
          <div className="story__copy reveal">
            <h2 className="section-title" id="about-title">
              Немного обо мне и моём хлебе
            </h2>
            <p>
              Я пеку хлеб дома. Иногда кухня превращается в маленькую пекарню:
              на столе тесто, рядом мука, а весь день живёт в ожидании готовой
              буханки. Мне нравится этот процесс — от первых движений с тестом
              до момента, когда хлеб остывает после выпечки. Пока в моей
              небольшой коллекции всего несколько видов, но у каждого свой
              характер. Bread — место, где я могу показать свой хлеб и
              поделиться тем, что в нём люблю.
            </p>
          </div>

          <div
            aria-label="Фотографии процесса и пекаря"
            className="story__gallery"
            role="group"
          >
            <MediaFrame
              alt="Портрет пекаря."
              className="story__portrait reveal"
              ratio="portrait"
              sizes="(max-width: 760px) 100vw, 29vw"
            />
            <div className="story__details">
              <MediaFrame
                alt="Руки пекаря в работе с тестом."
                className="reveal"
                ratio="portrait"
                sizes="(max-width: 760px) 46vw, 16vw"
              />
              <MediaFrame
                alt="Заготовки теста до выпечки в корзинках или формах."
                className="reveal"
                ratio="portrait"
                sizes="(max-width: 760px) 46vw, 16vw"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="closing-title" className="closing" id="closing">
          <div className="closing__inner section-shell">
            <div className="closing__copy reveal">
              <h2 className="section-title" id="closing-title">
                До встречи за хлебом.
              </h2>
              <p>
                Иногда для хорошего момента достаточно свежего хлеба и людей,
                с которыми хочется его разделить.
              </p>
            </div>
            <MediaFrame
              alt="Готовая буханка хлеба после выпечки."
              className="closing__media reveal"
              ratio="landscape"
              sizes="(max-width: 760px) 100vw, 46vw"
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner site-shell">
          <div className="site-footer__brand">
            <a className="wordmark" href="#top">
              Bread
            </a>
            <p>Домашний хлеб ручной работы.</p>
          </div>
          <nav aria-label="Навигация в подвале" className="site-nav site-footer__nav">
            <a href="#bread">Наш хлеб</a>
            <a href="#about">О пекаре</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
