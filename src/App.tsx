import { useEffect, useRef, useState } from 'react'
import enUs from './properties/en-us'
import ptBr from './properties/pt-br'

type Language = 'pt-BR' | 'en-US'
type Copy = typeof ptBr

const assets = `${import.meta.env.BASE_URL}assets`
const ultrasoundImages = [
  { file: 'face-colored.jpeg', alt: 'Ultrasound image showing the baby face' },
  { file: 'face-hiding.jpeg', alt: 'Ultrasound image of the baby hiding their face' },
  { file: 'face-yawning.jpeg', alt: 'Ultrasound image of the baby yawning' },
  { file: 'feet.jpeg', alt: 'Ultrasound image showing the baby feet' },
  { file: 'fingers.jpeg', alt: 'Ultrasound image showing the baby fingers' },
  { file: 'foot.jpeg', alt: 'Ultrasound image showing the baby foot' },
  { file: 'im-a-boy.jpeg', alt: 'Ultrasound announcement: it is a boy' },
]

const familyImages = [
  { file: 'belly-close-up.jpeg', alt: 'Close-up photo of the pregnant belly' },
  { file: 'holding-belly.jpeg', alt: 'Photo of hands holding the pregnant belly' },
  { file: 'loving-couple.jpeg', alt: 'Photo of the couple together during pregnancy' },
  { file: 'teddy-bear.jpeg', alt: 'Photo of a teddy bear beside the pregnant belly' },
]

function Header({ copy, language, onLanguageChange }: { copy: Copy; language: Language; onLanguageChange: (language: Language) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="#about" aria-label="Oh Baby home">Oh Baby! <span>♥</span></a>
      <button className="menu-button" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      <nav className={menuOpen ? 'nav nav--open' : 'nav'} aria-label="Primary navigation">
        {copy.navigation.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
            <strong>{item.primary}</strong>
            <em>{item.secondary}</em>
          </a>
        ))}
      </nav>
      <div className="language-toggle" aria-label="Language selector">
        <button className={language === 'pt-BR' ? 'active' : ''} type="button" onClick={() => onLanguageChange('pt-BR')}>PT</button>
        <span>|</span>
        <button className={language === 'en-US' ? 'active' : ''} type="button" onClick={() => onLanguageChange('en-US')}>EN</button>
      </div>
    </header>
  )
}

function Hero({ copy }: { copy: Copy }) {
  const [activePhoto, setActivePhoto] = useState(0)
  const heroPhotoViewport = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  function goToPhoto(photoIndex: number) {
    const viewport = heroPhotoViewport.current
    setActivePhoto(photoIndex)
    isAnimating.current = true
    clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => { isAnimating.current = false }, 500)
    viewport?.scrollTo({ left: photoIndex * viewport.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="hero" id="about">
      <div className="hero-copy">
        <p className="eyebrow">{copy.hero.eyebrow}</p>
        <h1>Nicolas Eli</h1>
        <span className="tiny-heart">♥</span>
        <p>{copy.hero.body}</p>
        <p className="translation">{copy.hero.bodySecondary}</p>
        <a className="primary-button" href="https://docs.google.com/forms/d/e/1FAIpQLScWXn_cvSCdCnxR_NNEImWlCavWC3RsyYwqzCG-Y8wzIdvxDA/viewform?usp=publish-editor" target="_blank" rel="noreferrer">{copy.hero.cta}</a>
      </div>
      <div className="hero-photo-gallery">
        <div
          className="hero-photo-viewport"
          ref={heroPhotoViewport}
          onPointerDown={() => {
            isAnimating.current = false
            clearTimeout(scrollTimeout.current)
          }}
          onScroll={(event) => {
            if (isAnimating.current) return
            const pageWidth = event.currentTarget.clientWidth
            setActivePhoto(Math.round(event.currentTarget.scrollLeft / pageWidth))
          }}
          aria-label="Family photo gallery"
        >
          <div className="hero-photo-pages">
            {familyImages.map((image) => (
              <div className="hero-photo-page" key={image.file}>
                <img src={`${assets}/family/${image.file}`} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
        <div className="gallery-dots hero-photo-dots" aria-label="Choose family photo">
          {familyImages.map((image, photoIndex) => (
            <button
              className={activePhoto === photoIndex ? 'active' : ''}
              key={image.file}
              type="button"
              aria-label={`Show family photo ${photoIndex + 1}`}
              aria-current={activePhoto === photoIndex ? 'page' : undefined}
              onClick={() => goToPhoto(photoIndex)}
            />
          ))}
        </div>
      </div>
      <img className="hero-art" src={`${assets}/hero-wolf.webp`} alt="Watercolor wolf beside an evergreen tree" />
    </section>
  )
}

function EventCard({ event, labels }: { event: Copy['dates']['cards'][number]; labels: Copy['dates']['labels'] }) {
  return (
    <article className="event-card">
      <h3>{event.title}</h3>
      <div className="event-row"><span className="line-icon">▣</span><p><strong>{labels.date}:</strong> {event.date}</p></div>
      <div className="event-row"><span className="line-icon">◷</span><p><strong>{labels.time}:</strong> {event.time}</p></div>
      <div className="event-row"><span className="line-icon">●</span><p><strong>{labels.location}:</strong> {event.location}</p></div>
      <div className="event-actions">
        {event.locationUrl ? <a className="outline-button" href={event.locationUrl} target="_blank" rel="noreferrer">{labels.locationButton}</a> : <button type="button" className="outline-button" data-action="location">{labels.locationButton}</button>}
      </div>
    </article>
  )
}

function DatesSection({ copy }: { copy: Copy }) {
  return (
    <section className="dates-section" id="dates">
      <img className="side-animal side-animal--deer" src={`${assets}/deer-hires.webp`} alt="Watercolor deer" />
      <img className="side-animal side-animal--bear" src={`${assets}/bear-hires.webp`} alt="Watercolor bear" />
      <div className="section-heading">
        <h2><span>❧</span>{copy.dates.title}<span>❧</span></h2>
        <p>{copy.dates.intro}</p>
        <em>{copy.dates.introSecondary}</em>
      </div>
      <div className="event-grid">
        {copy.dates.cards.map((event) => <EventCard key={event.title} event={event} labels={copy.dates.labels} />)}
      </div>
      <span className="heart-divider" aria-hidden="true">♥</span>
    </section>
  )
}

function GamesSection({ copy }: { copy: Copy }) {
  const getItemsPerPage = () => window.innerWidth <= 760 ? 2 : 4
  const [activePage, setActivePage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage)
  const gamesViewport = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const pages = Array.from({ length: Math.ceil(copy.games.items.length / itemsPerPage) }, (_, pageIndex) => (
    copy.games.items.slice(pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage)
  ))

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage())
      setActivePage(0)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    isAnimating.current = false
    gamesViewport.current?.scrollTo({ left: 0, behavior: 'auto' })
  }, [itemsPerPage])

  function goToPage(pageIndex: number) {
    const viewport = gamesViewport.current
    setActivePage(pageIndex)
    isAnimating.current = true
    clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => { isAnimating.current = false }, 500)
    viewport?.scrollTo({ left: pageIndex * viewport.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="games-section" id="games">
      <h2><span>❧</span>{copy.games.title}<span>❧</span></h2>
      <div
        className="games-viewport"
        ref={gamesViewport}
        onPointerDown={() => {
          isAnimating.current = false
          clearTimeout(scrollTimeout.current)
        }}
        onScroll={(event) => {
          if (isAnimating.current) return
          const pageWidth = event.currentTarget.clientWidth
          setActivePage(Math.round(event.currentTarget.scrollLeft / pageWidth))
        }}
        aria-label="Baby shower games"
      >
        <div className="games-pages">
          {pages.map((page, pageIndex) => (
            <div className="games-page" key={pageIndex} style={{ gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }} aria-label={`Games page ${pageIndex + 1}`}>
              {page.map((item, itemIndex) => {
                const image = item.icon === 'baby-blocks'
                  ? 'games/baby-blocks.png'
                  : item.icon === 'how-many-bears'
                    ? 'games/how-many-bears.png'
                    : item.icon === 'baby-food-challenge'
                      ? 'games/baby-food-challenge.png'
                      : `game-${item.icon}-hires.webp`
                const globalIndex = pageIndex * 4 + itemIndex

                return (
                  <article className="game" key={item.title}>
                    <img className="game-icon" src={`${assets}/${image}`} alt="" />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    {globalIndex < copy.games.items.length - 1 && <span className="game-heart">♥</span>}
                  </article>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="gallery-dots games-dots" aria-label="Choose games page">
        {pages.map((_, pageIndex) => (
          <button
            className={activePage === pageIndex ? 'active' : ''}
            key={pageIndex}
            type="button"
            aria-label={`Show games page ${pageIndex + 1}`}
            aria-current={activePage === pageIndex ? 'page' : undefined}
            onClick={() => goToPage(pageIndex)}
          />
        ))}
      </div>
      <p className="games-footer">{copy.games.footer}</p>
    </section>
  )
}

function RaffleSection({ copy }: { copy: Copy }) {
  return (
    <section className="raffle-section" aria-labelledby="raffle-title">
      <div className="raffle-copy">
        <h2 id="raffle-title">{copy.raffle.title}</h2>
        <p>{copy.raffle.description}</p>
      </div>
      <img className="raffle-image" src={`${assets}/diapers-wipes-raffle.png`} alt="Watercolor illustration of diapers, wipes and a gift" />
    </section>
  )
}

function GallerySection({ copy }: { copy: Copy }) {
  const getImagesPerPage = () => window.innerWidth <= 760 ? 2 : 4
  const [activePage, setActivePage] = useState(0)
  const [imagesPerPage, setImagesPerPage] = useState(getImagesPerPage)
  const galleryViewport = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const pages = Array.from({ length: Math.ceil(ultrasoundImages.length / imagesPerPage) }, (_, pageIndex) => (
    ultrasoundImages.slice(pageIndex * imagesPerPage, pageIndex * imagesPerPage + imagesPerPage)
  ))

  useEffect(() => {
    const handleResize = () => {
      setImagesPerPage(getImagesPerPage())
      setActivePage(0)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    isAnimating.current = false
    galleryViewport.current?.scrollTo({ left: 0, behavior: 'auto' })
  }, [imagesPerPage])

  function goToPage(pageIndex: number) {
    const viewport = galleryViewport.current
    setActivePage(pageIndex)
    isAnimating.current = true
    clearTimeout(scrollTimeout.current)
    scrollTimeout.current = setTimeout(() => { isAnimating.current = false }, 500)
    viewport?.scrollTo({ left: pageIndex * viewport.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="gallery-card" aria-labelledby="gallery-title">
      <h2 id="gallery-title">{copy.gallery.title}</h2>
      <div className="mini-flourish">❧</div>
      <div
        className="gallery-viewport"
        ref={galleryViewport}
        onPointerDown={() => {
          isAnimating.current = false
          clearTimeout(scrollTimeout.current)
        }}
        onScroll={(event) => {
          if (isAnimating.current) return
          const pageWidth = event.currentTarget.clientWidth
          setActivePage(Math.round(event.currentTarget.scrollLeft / pageWidth))
        }}
        aria-label="Ultrasound photo gallery"
      >
        <div className="gallery-pages">
          {pages.map((page, pageIndex) => (
            <div className="gallery-page" key={pageIndex} style={{ gridTemplateColumns: `repeat(${imagesPerPage}, minmax(0, 1fr))` }} aria-label={`Gallery page ${pageIndex + 1}`}>
              {page.map((image) => (
                <img
                  className={`ultrasound-image${image.file === 'im-a-boy.jpeg' ? ' ultrasound-image--contain' : ''}`}
                  key={image.file}
                  src={`${assets}/ultrasound/${image.file}`}
                  alt={image.alt}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="gallery-dots" aria-label="Choose ultrasound gallery page">
        {pages.map((_, pageIndex) => (
          <button
            className={activePage === pageIndex ? 'active' : ''}
            key={pageIndex}
            type="button"
            aria-label={`Show gallery page ${pageIndex + 1}`}
            aria-current={activePage === pageIndex ? 'page' : undefined}
            onClick={() => goToPage(pageIndex)}
          />
        ))}
      </div>
      <div className="gallery-animals">
        <img src={`${assets}/fox-hires.webp`} alt="Watercolor fox" />
      </div>
    </section>
  )
}

function QrCode({ label, src }: { label: string; src: string }) {
  return (
    <figure className="qr-item">
      <img className="qr-image" src={`${assets}/${src}`} alt={`${label} QR code`} />
      <figcaption>{label}</figcaption>
    </figure>
  )
}

function GiftsSection({ copy }: { copy: Copy }) {
  return (
    <section className="gifts-card" id="gifts">
      <h2>{copy.gifts.title} <span>/ Gifts</span></h2>
      <p><strong>{copy.gifts.lead}</strong><br />{copy.gifts.body}</p>
      <div className="gift-options">
        <article className="gift-option registry">
          <div className="amazon-mark">a</div>
          <div><h3>{copy.gifts.registryTitle}</h3><p>{copy.gifts.registryText}</p></div>
          <a className="primary-button small" href="https://www.amazon.com/baby-reg/tysonandnara-ostler-december-2026-lehi/6YPDJC8ZY4L1" target="_blank" rel="noreferrer">{copy.gifts.registryButton}</a>
        </article>
        <article className="gift-option fund">
          <h3>{copy.gifts.fundTitle}</h3>
          <p>{copy.gifts.fundText}</p>
          <p className="fund-warning">({copy.gifts.fundWarning})</p>
          <div className="qr-pair">
            <QrCode label="VENMO" src="qr/venmo.png" />
            <QrCode label="PIX" src="qr/nubank-pix.png" />
          </div>
        </article>
      </div>
      <img className="gift-bunny" src={`${assets}/rabbit-hires-fixed.png`} alt="Watercolor rabbit" />
    </section>
  )
}

function DetailsSection({ copy }: { copy: Copy }) {
  return (
    <section className="details-section" id="rsvp">
      <GallerySection copy={copy} />
      <GiftsSection copy={copy} />
    </section>
  )
}

function App() {
  const [language, setLanguage] = useState<Language>('en-US')
  const copy = language === 'pt-BR' ? ptBr : enUs

  return (
    <div className="site-shell">
      <Header copy={copy} language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero copy={copy} />
        <DatesSection copy={copy} />
        <RaffleSection copy={copy} />
        <GamesSection copy={copy} />
        <DetailsSection copy={copy} />
      </main>
      <span id="faq" className="anchor-target" aria-hidden="true" />
    </div>
  )
}

export default App
