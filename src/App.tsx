import { useState } from 'react'
import enUs from './properties/en-us'
import ptBr from './properties/pt-br'

type Language = 'pt-BR' | 'en-US'
type Copy = typeof ptBr

const assets = '/assets'

function CameraPlaceholder({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div className={`photo-placeholder${compact ? ' photo-placeholder--compact' : ''}`} aria-label={label}>
      <span className="camera-icon" aria-hidden="true"><i /></span>
      <span>{label}</span>
    </div>
  )
}

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
  return (
    <section className="hero" id="about">
      <div className="hero-copy">
        <p className="eyebrow">{copy.hero.eyebrow}</p>
        <h1>Nicholas Eli</h1>
        <span className="tiny-heart">♥</span>
        <p>{copy.hero.body}</p>
        <p className="translation">{copy.hero.bodySecondary}</p>
        <button className="primary-button" type="button" data-action="rsvp">{copy.hero.cta}</button>
      </div>
      <CameraPlaceholder label={`${copy.hero.photo}\n${copy.hero.photoHint}`} />
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
        <button type="button" className="outline-button" data-action="location">{labels.locationButton}</button>
        <button type="button" className="primary-button small" data-action="date-rsvp">{labels.rsvpButton}</button>
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
  return (
    <section className="games-section" id="games">
      <h2><span>❧</span>{copy.games.title}<span>❧</span></h2>
      <div className="games-grid">
        {copy.games.items.map((item, index) => (
          <article className="game" key={item.title}>
            <img className="game-icon" src={`${assets}/game-${item.icon}-hires.webp`} alt="" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {index < copy.games.items.length - 1 && <span className="game-heart">♥</span>}
          </article>
        ))}
      </div>
      <p className="games-footer">{copy.games.footer}</p>
    </section>
  )
}

function GallerySection({ copy }: { copy: Copy }) {
  return (
    <section className="gallery-card" aria-labelledby="gallery-title">
      <h2 id="gallery-title">{copy.gallery.title}</h2>
      <div className="mini-flourish">❧</div>
      <div className="gallery-grid">
        {copy.gallery.photos.map((photo) => <CameraPlaceholder key={photo} label={photo} compact />)}
        <div className="announcement-placeholder" aria-label="Temporary ultrasound image placeholder">
          <span className="scan-lines" />
          <strong>{copy.gallery.announcement}</strong>
          <small>♥</small>
        </div>
      </div>
      <div className="gallery-dots"><span className="active" /><span /><span /><span /></div>
      <div className="gallery-animals">
        <img src={`${assets}/fox-hires.webp`} alt="Watercolor fox" />
      </div>
    </section>
  )
}

function QrPlaceholder({ label }: { label: string }) {
  return <div className="qr-placeholder" aria-label={`${label} QR placeholder`}><span>{label}</span></div>
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
          <button className="primary-button small" type="button" data-action="registry">{copy.gifts.registryButton}</button>
        </article>
        <article className="gift-option fund">
          <h3>{copy.gifts.fundTitle}</h3>
          <p>{copy.gifts.fundText}</p>
          <div className="qr-pair"><QrPlaceholder label="VENMO" /><QrPlaceholder label="PIX" /></div>
        </article>
      </div>
      <img className="gift-bunny" src={`${assets}/rabbit-hires.webp`} alt="Watercolor rabbit" />
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
  const [language, setLanguage] = useState<Language>('pt-BR')
  const copy = language === 'pt-BR' ? ptBr : enUs

  return (
    <div className="site-shell">
      <Header copy={copy} language={language} onLanguageChange={setLanguage} />
      <main>
        <Hero copy={copy} />
        <DatesSection copy={copy} />
        <GamesSection copy={copy} />
        <DetailsSection copy={copy} />
      </main>
      <span id="faq" className="anchor-target" aria-hidden="true" />
    </div>
  )
}

export default App
